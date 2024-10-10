---
slug: use-ai-to-write-you-git-commit-messages
title: Use AI to Write You Git Commit Messages
date: 2024-10-10
author: Dustin Davis
description:
  Discover how to leverage AI to generate informative git commit messages
  automatically. Learn to implement a bash script that uses OpenAI's GPT-4 to
  create consistent, detailed commit messages, saving time and improving your
  project's documentation.
categories:
  - Git
  - AI
  - DevOps
  - Productivity
  - Automation
  - OpenAI
  - Bash
banner: ./images/ai-bot-git-commit.png
bannerCredit:
---

How much would you pay a person to write better git commit messages than you are
willing to write?

That is a question I asked myself this morning as I was creating a series of git
commits for a new feature. Sure, writing a messaage describing what you did when
you commit a change is not terribly difficult. But, as laziness is my
superpower, I wanted to see if I could get a computer to do it for me.

Here is the script I came up with:

```bash
#!/bin/bash

# source .env to get the OPENAI_API_KEY
source "$(dirname "$0")/.env"

# 📝 Get only the diff of what has already been staged
git_diff_output=$(git diff --cached)

# 🛑 Check if there are any staged changes to commit
if [ -z "$git_diff_output" ]; then
  echo "⚠️  No staged changes detected. Aborting."
  exit 1
fi

# 🗜️ Limit the number of lines sent to AI to avoid overwhelming it
git_diff_output_limited=$(echo "$git_diff_output" | head -n 100)

# 📦 Prepare the AI prompt for the chat model
messages=$(jq -n --arg diff "$git_diff_output_limited" '[
  {"role": "system", "content": "You are an AI assistant that helps generate git commit messages based on code changes."},
  {"role": "user", "content": ("Suggest an informative commit message by summarizing code changes from the shared command output. The commit message should follow the conventional commit format and provide meaningful context for future readers.\n\nChanges:\n" + $diff)}
]')

# 🚀 Send the request to OpenAI API using the correct chat endpoint
response=$(curl -s -X POST https://api.openai.com/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d "$(jq -n \
        --argjson messages "$messages" \
        '{
          model: "gpt-4",
          messages: $messages,
          temperature: 0.5,
          max_tokens: 100
        }'
)")

# 🔄 Extract the AI-generated commit message
commit_message=$(echo "$response" | jq -r '.choices[0].message.content' | sed 's/^ *//g')

# 🛑 Check if we got a valid commit message from the AI
if [ -z "$commit_message" ] || [[ "$commit_message" == "null" ]]; then
  echo "🚫 Failed to generate a commit message from OpenAI."
  echo "⚠️ API Response: $response"
  exit 1
fi

# 📋 Show the suggested commit message and ask for confirmation
echo "🤖 Suggested commit message:"
echo "$commit_message"
read -p "Do you want to use this message? (y/n) " choice

if [[ "$choice" != "y" ]]; then
  echo "🛑 Commit aborted by the user."
  exit 1
fi

# 🛑 Option to dry run
if [[ $1 == "--dry-run" ]]; then
  echo "✅ Dry run: Commit message generated, but no commit was made."
  exit 0
fi

# 🔐 Commit only staged changes with the AI-generated message
if ! git commit -m "$commit_message"; then
  echo "❌ Commit failed. Aborting."
  exit 1
fi

# 🎉 Success message
echo "✅ Committed with message: $commit_message"
```

In a nutshell, this script does the following:

1. Gets the diff of staged changes
1. Sends the diff to OpenAI's GPT-4 model
1. Receives a suggested commit message
1. Asks for user confirmation
1. Commits the changes with the AI-generated message

To use this script, you'll need to:

1. Save it as a file (e.g., `gitcommit`)
1. Make it executable (`chmod +x gitcommit`)
1. Put the script in an executable directory (e.g., `/usr/local/bin`)
1. Create a `.env` file in the same directory with your OpenAI API key:

```bash
OPENAI_API_KEY=your_api_key_here
```

Run the script after staging your changes: `gitcommit`

This approach leverages AI to generate more descriptive and consistent commit
messages, potentially improving your project's documentation and making it
easier for team members to understand changes.

Some benefits of using AI for commit messages include:

- Consistency in message format
- More detailed descriptions of changes
- Time-saving for developers
- Potential for better code review processes

While this method can be helpful, it's important to review the generated
messages to ensure they accurately represent your changes. You may also want to
customize the prompt or fine-tune the AI model to better suit your project's
specific needs.

Also, I have not idea how much this is going to cost me. I assume less than a
dollar per month. That is is why I asked my initial question of how much would I
pay someone to write better git commit messages than I am willing to write.

By incorporating AI into your git workflow, you're not only saving time but also
potentially improving the overall quality of your project's version history.
Give it a try and see how it enhances your development process!
