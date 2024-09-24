---
author: Dustin Davis
comments: true
date: 2020-07-09 23:14:51+00:00

slug: audible-to-plex
title: Audible to Plex
description:
  How and why I migrated all my Audible audiobooks to my Plex server and how I
  consume them.
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Lena Kudryavtseva](https://medium.com/@lenakuld) on
  [Unsplash](https://unsplash.com)'
categories:
  - Plex
  - audiobooks
---

## Why

Before doing this you might ask, "Why? What is the point?" Yes, the audible
player is great. But, there are a few reasons why I prefer to move them to Plex.

1. With Plex I can stream the audios to my iPhone with the great
   [Prologue app](https://prologue-app.com/). This way I can listen to
   audiobooks without having to download them (but I can download them if I
   want). This saves a lot of storage on my phone and I don't have to wait for a
   book to download before I start listening.
2. This makes my books more easily available to my family. My wife once
   accidentally purchased an audiobook on her account. It was such a pain to try
   to figure out how to share it with me on Audible. Now my wife and kids all
   have access to the audiobooks I buy through their Plex account.
3. There is just something gratifying about buying an audiobook and FEELING like
   you actually own it.
4. Sometimes I purchase audiobooks that are not on Audible. This allows me to
   keep them all in one place so I don't have to have multiple audiobook apps on
   my phone.

## Downloading Audiobooks

Go to [Audible.com](https://amzn.to/3oyWUTI) and then browse to your library.
This will show all the books you have purchased. There is a download button next
to each title to download the book in .aax format.

## Convert the book to M4B

I am just going to point you to the
[AAXtoMP3](https://github.com/KrumpetPirate/AAXtoMP3) project on Github. Follow
instructions there to get the tool set up.

This is the command I run to convert books to the format I want.

```bash
bash AAXtoMP3 --aac -e:m4b AUDIOBOOK.aax
```

## Clip file (optional)

Since I'm not listening on Audible, like to remove the beginning and ending of
the clips that says "This is Audible" and "Audible hopes you have enjoyed this
program".

This is a little more tricky and requires a few tools to do so, so if you don't
want to go to the work of all this, just skip this step.

You'll need to install [ffmpeg](https://ffmpeg.org/) to clip the file and
`mp4art` from the [mp4v2](https://github.com/TechSmith/mp4v2) package to put the
cover art back on since FFmpeg doesn't support cover art.

On the mac, both can be installed with brew.

```bash
brew install ffmpeg mp4v2
```

I have the following script that will do strip the intro and outro and keep the
cover art intact.

```bash
# get cover art
ffmpeg -i "$1" -an -codec:v copy cover.jpg

# calculate duration to trim audible end clip
dur=$(ffprobe -i "$1" -show_entries format=duration -v quiet -of csv="p=0")
dur=$(echo $dur | cut -d "." -f 1 | cut -d "," -f 1)
trim=$((dur - 6))

# main work to copy and trim
ffmpeg -hide_banner -i "$1" -ss 2 -t $trim -map 0:a -c copy output.m4b

# add the cover art back on
mp4art -q --add cover.jpg output.m4b

# housekeeping
rm cover.jpg
rm "$1"
mv output.m4b "$1"
```

You would just pass the name of the m4b file to this script like so:

```bash
clip.sh AUDIOBOOK.m4b
```

## Serve from Plex

Now, just move this audiobook file to your plex server. I recommend this
[guide](https://github.com/seanap/Plex-Audiobook-Guide) for configuring your
Audiobook library on Plex.

## Automate

Here is a script I wrote that will do all of the above. You would just run
`aax2m4b ebookfilename.aax`:

```bash
# Remove DRM and clip Audible intro and outro
function aax2m4b() {
   local PLEX_DIR=/Volumes/Media/Audiobooks
   local AAXtoMP3_DIR=~/src/p/AAXtoMP3
   local TARGET_DIR=~/Downloads/m4b
   local AUTHCODE=`cat $AAXtoMP3_DIR/.authcode`
   rm -rf $TARGET_DIR
   mkdir -p $TARGET_DIR

   # Remove DRM
   $AAXtoMP3_DIR/AAXtoMP3 --aac -e:m4b --authcode $AUTHCODE --target_dir $TARGET_DIR -D 'converted' -F '$title by $artist' "$1"

   local NEWFILE=`ls $TARGET_DIR/converted/*.m4b`
   local BASENAME=`basename -a $TARGET_DIR/converted/*.m4b`
   echo $NEWFILE

   # Cut Audible intro/outro
   # calculate duration to trim audible end clip
   dur=$(ffprobe -i "$NEWFILE" -show_entries format=duration -v quiet -of csv="p=0")
   dur=$(echo $dur | cut -d "." -f 1 | cut -d "," -f 1)
   trim=$((dur - 6))

   # main work to copy and trim
   ffmpeg -hide_banner -i "$NEWFILE" -ss 2 -t $trim -map 0:a -c copy output.m4b

   # add the cover art back on
   mp4art -q --add $TARGET_DIR/converted/cover.jpg output.m4b

   # move file
   mv output.m4b "$BASENAME"
   cp "$BASENAME" "$PLEX_DIR"
   echo "Copied to $PLEX_DIR"
}
```

I have all this automated with [Hazel](https://www.noodlesoft.com/) so the only
step I really need to do is download the .aax file and automation takes care of
the rest of it! But I won't go into the details here. That would make for a much
longer tutorial.
