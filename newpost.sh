#!/bin/bash

# Prompt for post title
read -p "Enter the post title: " post_title

# Generate the current date and post-title-slug
current_date=$(date +%Y-%m-%d)
post_title_slug=$(echo "$post_title" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9' '-' | sed 's/-$//')

# Create the new directory
new_blog_dir="blog/${current_date}-${post_title_slug}"
echo "📂 New blog post directory: $new_blog_dir"
mkdir -p "$new_blog_dir/images"

# Create index.md with front matter
index_file="$new_blog_dir/index.md"
cat <<EOF > "$index_file"
---
slug: $post_title_slug
title: $post_title
date: $current_date
author: Dustin Davis
description:
categories:
  - yada
banner: ./images/banner.jpg
bannerCredit:
---
EOF

# Copy the banner image
cp ./blog/banner.jpg "$new_blog_dir/images/banner.jpg"

# Confirmation message
echo "New blog post created at $new_blog_dir"

# Open the new file in VS Code
code "$new_blog_dir/index.md"
