---
slug: markdown-to-pdf-converter
title: "Markdown to PDF Magic: Create a One-Command Converter for macOS"
date: 2024-09-05
author: Dustin Davis
description:
  Learn how to streamline your documentation workflow by building a custom script that transforms Markdown files into professionally formatted PDFs with a single command. This step-by-step guide covers everything from installing prerequisites to creating and using your own mdtopdf tool on macOS.
categories:
  - automation
  - MacOS
  - cli
  - bash
  - PDF
banner: ./images/banner.png
---

# How to Convert Markdown to PDF with a Custom Script

As a developer, I often find myself writing documentation in Markdown. While Markdown is great for version control and easy editing, sometimes I need to share my docs as PDFs. For example, I may want to read and mark up a document on my e-ink reader or iPad. Today, I'm going to show you how to create a simple script that converts Markdown files to PDFs with just one command.

## Prerequisites

Before we dive into the script, make sure you have the following installed on your macOS system:

1. **Homebrew**: If you don't have it, install it with:

   ```bash
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```

2. **MacTeX**: Install it using Homebrew:

   ```bash
   brew install --cask mactex
   ```

3. **Pandoc**: Install it using Homebrew:

   ```bash
   brew install pandoc
   ```

After installing MacTeX, you need to add it to your PATH. Add this line to your `~/.zshrc` file:

```bash
export PATH="/usr/local/texlive/2024/bin/universal-darwin:$PATH"
```

Make sure to replace "2024" with the actual year of your TeX Live installation if it's different.

## Creating the Script

Now, let's create our `mdtopdf` script. Here's the complete script:

```bash
#!/bin/bash

# Check if a filename was provided
if [ $# -eq 0 ]; then
    echo "❌ Error: No filename provided."
    echo "ℹ️  Usage: mdtopdf <filename.md>"
    exit 1
fi

# Get the input filename
input_file="$1"

# Check if the input file exists
if [ ! -f "$input_file" ]; then
    echo "❌ Error: File '$input_file' not found."
    exit 1
fi

# Check if the input file has a .md extension
if [[ "$input_file" != *.md ]]; then
    echo "❌ Error: Input file must have a .md extension."
    exit 1
fi

# Generate the output filename by replacing .md with .pdf
output_file="${input_file%.md}.pdf"

# Run pandoc with xelatex and custom margin settings
pandoc "$input_file" -o "$output_file" \
    --pdf-engine=xelatex \
    -V geometry:"top=2cm, bottom=2cm, left=2cm, right=2cm" \
    -V papersize=a4

# Check if pandoc was successful
if [ $? -eq 0 ]; then
    echo "✅ Conversion successful. Output saved as '$output_file'"
else
    echo "❌ Error: Conversion failed."
    exit 1
fi
```

To set up this script:

1. Create a new file named `mdtopdf` (without any extension) in a text editor.
2. Copy and paste the above script into the file.
3. Save the file and make it executable:

   ```bash
   chmod +x mdtopdf
   ```

4. Move the script to a directory in your PATH, for example:

   ```bash
   sudo mv mdtopdf /usr/local/bin/
   ```

## Using the Script

Now you can use the script from anywhere in your terminal by running:

```bash
mdtopdf your_markdown_file.md
```

The script will create a PDF with the same name as your Markdown file, but with a .pdf extension.

## What the Script Does

1. It checks if you've provided a filename as an argument.
2. It verifies that the input file exists and has a .md extension.
3. It generates the output filename by replacing the .md extension with .pdf.
4. It runs pandoc with the xelatex PDF engine and some custom settings:
   - It sets all margins (top, bottom, left, right) to 2cm.
   - It sets the paper size to A4.
5. It checks if the conversion was successful and provides appropriate output.

The script also includes some error handling and uses emojis in the output messages to make them more visually appealing and easier to read at a glance.

## Conclusion

With this script, converting your Markdown files to PDFs becomes a breeze. No more fiddling with pandoc options every time you need a PDF - just run `mdtopdf` and you're done! Feel free to modify the script to suit your needs, such as changing the margin sizes or paper format.

Happy converting!
