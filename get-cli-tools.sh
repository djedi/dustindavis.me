#!/bin/bash

source .env

# 📂 Create directories to store JSON file
JSON_DIR="./_data"
JSON_FILE="$JSON_DIR/cli_tools.json"
BACKUP_FILE="$JSON_DIR/cli_tools_backup.json"
mkdir -p "$JSON_DIR"

# Backup existing JSON file
if [ -f "$JSON_FILE" ]; then
  cp "$JSON_FILE" "$BACKUP_FILE"
  echo "✅ Backed up existing cli-tools.json"
fi

# Get the current date
CURRENT_DATE=$(date +"%Y-%m-%d")

# Initialize JSON with the date
cat <<EOF > "$JSON_FILE"
{
  "lastUpdated": "$CURRENT_DATE",
  "tools": [
EOF

# Function to get cached CLI tool info
get_cached_tool_info() {
  TOOL_NAME=$1
  if [ -f "$BACKUP_FILE" ]; then
    # Check if the tools array exists in the backup file
    CLI_TOOLS_EXIST=$(jq -r 'has("tools")' "$BACKUP_FILE")
    
    if [ "$CLI_TOOLS_EXIST" = "true" ]; then
      CACHED_INFO=$(jq -r --arg name "$TOOL_NAME" '.tools[]? | select(.name == $name) | {description, url}' "$BACKUP_FILE")
      if [ "$CACHED_INFO" != "" ]; then
        echo "$CACHED_INFO"
        return 0
      fi
    fi
  fi
  return 1
}

# Function to get description and URL from OpenAI API
get_tool_info_from_openai() {
  TOOL_NAME=$1
  
  CACHED_INFO=$(get_cached_tool_info "$TOOL_NAME")
  if [ $? -eq 0 ]; then
    echo "$CACHED_INFO"
    return
  fi
  
  RESPONSE=$(curl -s -H "Authorization: Bearer $OPEN_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "model": "gpt-3.5-turbo",
      "messages": [{"role": "user", "content": "Provide a brief description and official website URL for the CLI tool '"$TOOL_NAME"'. Format the response as JSON with keys \"description\" and \"url\"."}]
    }' \
  https://api.openai.com/v1/chat/completions)
  
  echo "$RESPONSE" | jq -r '.choices[0].message.content'
}

# 🛠️ Function to add CLI tool entry to JSON
add_tool_to_json() {
  TOOL_NAME=$1
  
  # Get tool info from cache or OpenAI
  TOOL_INFO=$(get_tool_info_from_openai "$TOOL_NAME")
  DESCRIPTION=$(echo "$TOOL_INFO" | jq -r '.description')
  URL=$(echo "$TOOL_INFO" | jq -r '.url')
  
  # Add entry to JSON file with description and URL
  cat <<EOF >> "$JSON_FILE"
{
    "name": "$TOOL_NAME",
    "description": "$DESCRIPTION",
    "url": "$URL"
},
EOF
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
sed -i '' '$ s/,$//' "$JSON_FILE"  # Remove last comma
echo "  ]" >> "$JSON_FILE"         # Close tools array
echo "}" >> "$JSON_FILE"           # Close main JSON object

# 📋 Sort CLI tools by name
jq '.tools |= sort_by(.name)' "$JSON_FILE" > "${JSON_FILE}.tmp" && mv "${JSON_FILE}.tmp" "$JSON_FILE"

echo "🎉 All done! CLI tools JSON saved in $JSON_FILE"
