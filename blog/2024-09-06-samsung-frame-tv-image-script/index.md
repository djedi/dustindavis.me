---
slug: samsung-frame-tv-image-script
title: Resizing Classic Art for the Samsung Frame TV Without the Mat
date: 2024-09-06
author: Dustin Davis
description:
  A guide to using a custom script to resize and crop images for perfect display
  on a Samsung Frame TV.
categories:
  - automation
  - bash
  - cli
banner: ./images/banner.jpg
bannerCredit: ''
---

One of the things I love about my Samsung Frame TV is how it blends into the
room like a piece of artwork. But there's one thing that always bugged me—when
an image doesn't perfectly match the screen's dimensions, the TV adds a mat
around the image, which takes away from the seamless look of a framed piece of
art.

To solve this problem, I wrote a simple shell script that resizes and crops any
image to fit the exact dimensions of my Samsung Frame TV (3840x2160). I mainly
use it to download classic artwork, resize it, and then display it without any
distracting matting. The result is a cleaner, more immersive look on the screen.

## What This Script Does

This script takes an image file as input, adjusts its resolution to 300 DPI, and
then resizes and crops the image to perfectly fit the 3840x2160 dimensions of
the Samsung Frame TV. It works for both macOS and Linux users.

### Features

- Resizes images to match the TV's resolution (3840x2160).
- Crops the image to maintain the correct aspect ratio.
- Automatically adjusts resolution to 300 DPI for the best quality display.
- Supports macOS and Linux installations of ImageMagick.

## How to Use the Script

Here's how you can use this script to prepare your own art for display on the
Frame TV:

### Step 1: Install ImageMagick

This script requires ImageMagick, a powerful tool for image manipulation. If
it's not installed on your system, the script will try to install it for you
using Homebrew (macOS) or apt (Linux). To manually install ImageMagick, you can
run:

**macOS:**

```bash
brew install imagemagick
```

**Linux (Ubuntu/Debian-based):**

```bash
sudo apt-get update
sudo apt-get install imagemagick
```

### Step 2: Run the Script

You can either provide the image file name as an argument when running the
script, or the script will prompt you to enter the file name.

```bash
./frame-tv-image-resize.sh your_image.jpg
```

Alternatively, you can run the script without any parameters, and it will ask
you for the image name:

```bash
./frame-tv-image-resize.sh
📁 Please enter the name of the image file to be framed:
```

### Step 3: Let the Script Work

Once the script runs, it will create a new image file with `-framed.jpg`
appended to the original name. This new image is perfectly sized for the Samsung
Frame TV. No more fake matting!

The script uses ImageMagick to:

1. Detect the current dimensions and aspect ratio of the input image.
2. Resize the image to either 3840 pixels wide or 2160 pixels tall, depending on
   its original aspect ratio.
3. Crop the image to match the TV’s exact dimensions.

## The Script

Here's the script I use:

```bash
#!/bin/bash

# This script takes an image file as an input parameter and generates a new image sized to properly fit the Samsung Frame TV.

CONVERT=$(which magick)

# If there is no input parameter, prompt for the file name
if [ -z "$1" ]; then
  echo "📁 Please enter the name of the image file to be framed: "
  read FILENAME
else
  FILENAME=$1
fi

# Check if imagemagick is installed
if ! command -v $CONVERT &> /dev/null; then
  if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "🍎 ImageMagick not found. Installing with Homebrew..."
    brew install imagemagick
  elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    echo "🐧 ImageMagick not found. Installing with apt..."
    sudo apt-get update
    sudo apt-get install imagemagick
  else
    echo "❌ Unsupported OS. Please install ImageMagick manually."
    exit 1
  fi
  CONVERT=$(which magick)
fi

# Set new file name to the old file name with "-framed.jpg" appended to it
NEW_FILENAME=$(echo "$FILENAME" | sed 's/\.[^.]*$//')"-framed.jpg"

# Get the current image dimensions
WIDTH=$($CONVERT "$FILENAME" -format "%w" info:)
HEIGHT=$($CONVERT "$FILENAME" -format "%h" info:)
ASPECT_RATIO=$(echo "scale=4; $WIDTH / $HEIGHT * 10000" | bc)
ASPECT_RATIO_INT=$(echo "$ASPECT_RATIO" | cut -d'.' -f1)

# Set to 300 pixels per inch
$CONVERT "$FILENAME" -units PixelsPerInch -density 300 "$NEW_FILENAME"

# Set target Frame TV dimensions
TARGET_WIDTH=3840
TARGET_HEIGHT=2160
TARGET_ASPECT_RATIO=$(echo "scale=4; $TARGET_WIDTH / $TARGET_HEIGHT * 10000" | bc)
TARGET_ASPECT_RATIO_INT=$(echo "$TARGET_ASPECT_RATIO" | cut -d'.' -f1)

# Resize image based on aspect ratio
if [ "$ASPECT_RATIO_INT" -lt "$TARGET_ASPECT_RATIO_INT" ]; then
  echo "🖼️ Resizing image to width $TARGET_WIDTH pixels..."
  $CONVERT "$NEW_FILENAME" -resize "$TARGET_WIDTH" "$NEW_FILENAME"
else
  echo "🖼️ Resizing image to height $TARGET_HEIGHT pixels..."
  $CONVERT "$NEW_FILENAME" -resize "x$TARGET_HEIGHT" "$NEW_FILENAME"
fi

# Crop to target aspect ratio
echo "✂️ Cropping image to target dimensions ${TARGET_WIDTH}x${TARGET_HEIGHT}..."
$CONVERT "$NEW_FILENAME" -gravity center -crop "${TARGET_WIDTH}x${TARGET_HEIGHT}+0+0" "$NEW_FILENAME"

echo "✅ Image processing complete. New file: $NEW_FILENAME"
```

### Step 4: Upload to Your Samsung Frame TV

Once you have your resized image, you can upload it to your Samsung Frame TV
using the SmartThings app or a USB drive, depending on how you prefer to manage
your TV's gallery.

## Example Use Case

I often download high-resolution classic art pieces from public domain sites
like [Wikimedia Commons](https://commons.wikimedia.org/) and use this script to
ensure they display perfectly on my Frame TV. Whether it's Van Gogh's **Starry
Night** or **The Great Wave off Kanagawa**, this script ensures it looks like it
was made for the space.

## Final Thoughts

This script is a simple solution for those who want to customize their Samsung
Frame TV experience and avoid those fake mat borders. Plus, it's fun to see your
TV truly blend in with the decor, especially when displaying your favorite
classic art pieces. Feel free to fork it, modify it, and make it your own!

Happy framing!
