#!/bin/bash

# Descriptions come from the Claude CLI, so make sure it's installed.
command -v claude >/dev/null 2>&1 || { echo "❌ The claude CLI is required (https://claude.com/claude-code)"; exit 1; }

# 📂 Create directories to store icons and the JSON file
ICON_DIR="./app-icons"
JSON_DIR="./_data"
JSON_FILE="$JSON_DIR/applications.json"
BACKUP_FILE="$JSON_DIR/applications_backup.json"

# Build the JSON in a temp file and move it into place at the end, so the dev
# server never reads a half-written applications.json.
WORK_FILE=$(mktemp)
trap 'rm -f "$WORK_FILE"' EXIT
mkdir -p "$ICON_DIR" "$JSON_DIR"

# Backup existing JSON file
if [ -f "$JSON_FILE" ]; then
  cp "$JSON_FILE" "$BACKUP_FILE"
  echo "✅ Backed up existing applications.json"
fi

# Get the current date
CURRENT_DATE=$(date +"%Y-%m-%d")

# Initialize JSON with the date
cat <<EOF > "$WORK_FILE"
{
  "lastUpdated": "$CURRENT_DATE",
  "applications": [
EOF

# Apps to leave off the Uses page (e.g. ones I wrote myself).
EXCLUDE_APPS=(
  "Burn Journal"
)

is_excluded() {
  local name
  for name in "${EXCLUDE_APPS[@]}"; do
    [ "$name" = "$1" ] && return 0
  done
  return 1
}

# Return cached {description, url} for an app, skipping entries that never got a
# real description (failed lookups used to be saved as "null").
get_cached_app_info() {
  APP_NAME=$1
  [ -f "$BACKUP_FILE" ] || return 1
  CACHED_INFO=$(jq -c --arg name "$APP_NAME" '
    .applications[]
    | select(.appName == $name and .description != null and .description != "" and .description != "null")
    | {description, url}' "$BACKUP_FILE" | head -1)
  [ -n "$CACHED_INFO" ] || return 1
  echo "$CACHED_INFO"
}

APP_INFO_SCHEMA='{"type":"object","properties":{"description":{"type":"string"},"url":{"type":"string"}},"required":["description","url"]}'

# Get {description, url} from the cache, or ask Claude (latest Sonnet) via the CLI.
get_app_info() {
  APP_NAME=$1

  if get_cached_app_info "$APP_NAME"; then
    return 0
  fi

  RESPONSE=$(claude -p --model sonnet --tools "" --strict-mcp-config --no-session-persistence \
    --output-format json --json-schema "$APP_INFO_SCHEMA" \
    "Give a brief one-sentence description and the official website URL for the macOS application \"$APP_NAME\". If there is no official website, use an empty string for url." \
    </dev/null 2>/dev/null)

  INFO=$(echo "$RESPONSE" | jq -c '.structured_output // empty' 2>/dev/null)
  if [ -z "$INFO" ]; then
    echo "⚠️ Claude lookup failed for $APP_NAME" >&2
    return 1
  fi
  echo "$INFO"
}

# 🖼️ Function to extract icon from .app bundle and add entry to JSON
extract_icon_and_add_to_json() {
  APP_PATH=$1
  ICON_NAME=$(basename "$APP_PATH" .app)

  if is_excluded "$ICON_NAME"; then
    echo "⏭️ Skipping excluded app $ICON_NAME"
    return
  fi

  ICON_PATH=$(defaults read "$APP_PATH/Contents/Info" CFBundleIconFile 2>/dev/null)
  
  if [ -z "$ICON_PATH" ]; then
    echo "⚠️ No icon found for $ICON_NAME"
    return
  fi
  
  # Check for .icns extension
  if [[ "$ICON_PATH" != *.icns ]]; then
    ICON_PATH="$ICON_PATH.icns"
  fi
  
  FULL_ICON_PATH="$APP_PATH/Contents/Resources/$ICON_PATH"
  
  if [ -f "$FULL_ICON_PATH" ]; then
    # Save the icon as PNG using sips
    OUTPUT_ICON_PATH="$ICON_DIR/${ICON_NAME}.png"
    sips -s format png "$FULL_ICON_PATH" --out "$OUTPUT_ICON_PATH" >/dev/null 2>&1
    echo "✅ Saved icon for $ICON_NAME"
    
    # Get app info from cache or Claude; a failed lookup leaves the fields empty
    # so the next run tries again.
    APP_INFO=$(get_app_info "$ICON_NAME") || APP_INFO='{"description":"","url":""}'

    # Build the entry with jq so quotes in descriptions stay valid JSON.
    jq -n --arg name "$ICON_NAME" --arg icon "${OUTPUT_ICON_PATH#.}" --argjson info "$APP_INFO" \
      '{appName: $name, iconPath: $icon, description: $info.description, url: $info.url}' >> "$WORK_FILE"
    echo "," >> "$WORK_FILE"
    echo "✅ Added $ICON_NAME with description and URL to JSON"
  else
    echo "⚠️ Icon file not found for $ICON_NAME"
  fi
}

# 📋 Function to process applications
process_apps() {
  APP_DIR=$1
  echo "Processing applications in $APP_DIR..."
  
  # Find all .app directories and extract their icons
  find "$APP_DIR" -maxdepth 1 -name "*.app" -type d | while read -r app; do
    extract_icon_and_add_to_json "$app"
  done
}

# 🖥️ Process system-wide applications
process_apps "/Applications"

# 📂 Process user-specific applications
process_apps "$HOME/Applications"

# Remove trailing comma and close the JSON array and object
sed -i '' '$ s/,$//' "$WORK_FILE"  # Remove last comma
echo "  ]" >> "$WORK_FILE"         # Close applications array
echo "}" >> "$WORK_FILE"           # Close main JSON object

# 📋 Sort applications by name and publish the finished file in one step
jq ".applications |= sort_by(.appName)" "$WORK_FILE" > "${JSON_FILE}.tmp" && mv "${JSON_FILE}.tmp" "$JSON_FILE"

echo "🎉 All done! Icons saved in $ICON_DIR and applications JSON saved in $JSON_FILE"
