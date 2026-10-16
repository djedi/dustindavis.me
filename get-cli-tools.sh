#!/bin/bash

# Descriptions come from the Claude CLI, so make sure it's installed.
command -v claude >/dev/null 2>&1 || { echo "❌ The claude CLI is required (https://claude.com/claude-code)"; exit 1; }

# 📂 Create directories to store JSON file
JSON_DIR="./_data"
JSON_FILE="$JSON_DIR/cli_tools.json"
BACKUP_FILE="$JSON_DIR/cli_tools_backup.json"
mkdir -p "$JSON_DIR"

# Build the JSON in a temp file and move it into place at the end, so the dev
# server never reads a half-written cli_tools.json.
WORK_FILE=$(mktemp)
trap 'rm -f "$WORK_FILE"' EXIT

# Tools to leave off the Uses page.
EXCLUDE_TOOLS=(
)

is_excluded() {
  local name
  for name in "${EXCLUDE_TOOLS[@]}"; do
    [ "$name" = "$1" ] && return 0
  done
  return 1
}

# Backup existing JSON file
if [ -f "$JSON_FILE" ]; then
  cp "$JSON_FILE" "$BACKUP_FILE"
  echo "✅ Backed up existing cli_tools.json"
fi

# Get the current date
CURRENT_DATE=$(date +"%Y-%m-%d")

# Initialize JSON with the date
cat <<EOF > "$WORK_FILE"
{
  "lastUpdated": "$CURRENT_DATE",
  "tools": [
EOF

# Return cached {description, url} for a tool, skipping entries that never got
# a real description (failed lookups used to be saved as "null").
get_cached_tool_info() {
  TOOL_NAME=$1
  [ -f "$BACKUP_FILE" ] || return 1
  CACHED_INFO=$(jq -c --arg name "$TOOL_NAME" '
    .tools[]?
    | select(.name == $name and .description != null and .description != "" and .description != "null")
    | {description, url}' "$BACKUP_FILE" 2>/dev/null | head -1)
  [ -n "$CACHED_INFO" ] || return 1
  echo "$CACHED_INFO"
}

TOOL_INFO_SCHEMA='{"type":"object","properties":{"description":{"type":"string"},"url":{"type":"string"}},"required":["description","url"]}'

# Get {description, url} from the cache, or ask Claude (latest Sonnet) via the CLI.
get_tool_info() {
  TOOL_NAME=$1

  if get_cached_tool_info "$TOOL_NAME"; then
    return 0
  fi

  RESPONSE=$(claude -p --model sonnet --tools "" --strict-mcp-config --no-session-persistence \
    --output-format json --json-schema "$TOOL_INFO_SCHEMA" \
    "Give a brief one-sentence description and the official website URL for the command-line tool installed with Homebrew as \"$TOOL_NAME\". If there is no official website, use its source repository URL." \
    </dev/null 2>/dev/null)

  INFO=$(echo "$RESPONSE" | jq -c '.structured_output // empty' 2>/dev/null)
  if [ -z "$INFO" ]; then
    echo "⚠️ Claude lookup failed for $TOOL_NAME" >&2
    return 1
  fi
  echo "$INFO"
}

# 🛠️ Function to add CLI tool entry to JSON
add_tool_to_json() {
  TOOL_NAME=$1

  if is_excluded "$TOOL_NAME"; then
    echo "⏭️ Skipping excluded tool $TOOL_NAME"
    return
  fi

  # Get tool info from cache or Claude; a failed lookup leaves the fields empty
  # so the next run tries again.
  TOOL_INFO=$(get_tool_info "$TOOL_NAME") || TOOL_INFO='{"description":"","url":""}'

  # Build the entry with jq so quotes in descriptions stay valid JSON.
  jq -n --arg name "$TOOL_NAME" --argjson info "$TOOL_INFO" \
    '{name: $name, description: $info.description, url: $info.url}' >> "$WORK_FILE"
  echo "," >> "$WORK_FILE"
  echo "✅ Added $TOOL_NAME with description and URL to JSON"
}

# 📝 Process Homebrew-installed CLI tools (excluding dependencies)
process_brew_tools() {
  echo "Processing Homebrew-installed CLI tools (excluding dependencies)..."

  brew leaves | while read -r tool; do
    add_tool_to_json "$tool"
  done
}

# Process CLI tools
process_brew_tools

# Remove trailing comma and close the JSON array and object
sed -i '' '$ s/,$//' "$WORK_FILE"  # Remove last comma
echo "  ]" >> "$WORK_FILE"         # Close tools array
echo "}" >> "$WORK_FILE"           # Close main JSON object

# 📋 Sort CLI tools by name and publish the finished file in one step
jq '.tools |= sort_by(.name)' "$WORK_FILE" > "${JSON_FILE}.tmp" && mv "${JSON_FILE}.tmp" "$JSON_FILE"

echo "🎉 All done! CLI tools JSON saved in $JSON_FILE"
