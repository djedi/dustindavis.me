#!/bin/bash

source .env

# 📂 Create directories to store icons and the JSON file
ICON_DIR="./app-icons"
JSON_DIR="./_data"
JSON_FILE="$JSON_DIR/applications.json"
BACKUP_FILE="$JSON_DIR/applications_backup.json"
mkdir -p "$ICON_DIR" "$JSON_DIR"

# Backup existing JSON file
if [ -f "$JSON_FILE" ]; then
  cp "$JSON_FILE" "$BACKUP_FILE"
  echo "✅ Backed up existing applications.json"
fi

# Get the current date
CURRENT_DATE=$(date +"%Y-%m-%d")

# Initialize JSON with the date
cat <<EOF > "$JSON_FILE"
{
  "lastUpdated": "$CURRENT_DATE",
  "applications": [
EOF

# Function to get cached app info
get_cached_app_info() {
  APP_NAME=$1
  if [ -f "$BACKUP_FILE" ]; then
    CACHED_INFO=$(jq -r --arg name "$APP_NAME" '.applications[] | select(.appName == $name) | {description, url}' "$BACKUP_FILE")
    if [ "$CACHED_INFO" != "" ]; then
      echo "$CACHED_INFO"
      return 0
    fi
  fi
  return 1
}

# New function to get description and URL from OpenAI API
get_app_info_from_openai() {
  APP_NAME=$1
  
  CACHED_INFO=$(get_cached_app_info "$APP_NAME")
  if [ $? -eq 0 ]; then
    echo "$CACHED_INFO"
    return
  fi
  
  RESPONSE=$(curl -s -H "Authorization: Bearer $OPEN_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": "Provide a brief description and official website URL for the application '"$APP_NAME"'. Format the response as JSON with keys \"description\" and \"url\"."}]
    }' \
  https://api.openai.com/v1/chat/completions)
  
  echo "$RESPONSE" | jq -r '.choices[0].message.content'
}

# 🖼️ Function to extract icon from .app bundle and add entry to JSON
extract_icon_and_add_to_json() {
  APP_PATH=$1
  ICON_NAME=$(basename "$APP_PATH" .app)
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
    
    # Get app info from cache or OpenAI
    APP_INFO=$(get_app_info_from_openai "$ICON_NAME")
    DESCRIPTION=$(echo "$APP_INFO" | jq -r '.description')
    URL=$(echo "$APP_INFO" | jq -r '.url')
    
    # Add entry to JSON file with description and URL
    cat <<EOF >> "$JSON_FILE"
{
    "appName": "$ICON_NAME",
    "iconPath": "${OUTPUT_ICON_PATH#.}",
    "description": "$DESCRIPTION",
    "url": "$URL"
},
EOF
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
sed -i '' '$ s/,$//' "$JSON_FILE"  # Remove last comma
echo "  ]" >> "$JSON_FILE"         # Close applications array
echo "}" >> "$JSON_FILE"           # Close main JSON object

# 📋 Sort applications by name
jq '.applications |= sort_by(.appName)' "$JSON_FILE" > "${JSON_FILE}.tmp" && mv "${JSON_FILE}.tmp" "$JSON_FILE"

echo "🎉 All done! Icons saved in $ICON_DIR and applications JSON saved in $JSON_FILE"
