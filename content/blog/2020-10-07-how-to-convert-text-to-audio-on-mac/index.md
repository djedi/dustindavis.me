---
slug: how-to-convert-ebook-to-audiobook
title: How to Convert an eBook to an Audiobook
date: 2020-10-08
author: Dustin Davis
description:
  Use text-to-speech and FFmpeg to generate an audiobook from an eBook on MacOS.
categories:
  - audiobooks
  - Python
  - MacOS
  - automation
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Tomasz Gawłowski](https://unsplash.com/@gawlowski) on
  [Unsplash](https://unsplash.com)
---

### TL;DR

[Download and run my python script](https://github.com/djedi/ebook2audiobook).

---

Recently I've been reading a fictional book that I've really enjoyed. Sometimes
I'm in the car and I wish I could read while driving. That is what I love about
audiobooks. Driving and listening to a book is one area where I can actually
multi-task.

Unfortunately, this particular book I'm reading doesn't have an audiobook
available. I've found that I can use Kybook 3 and it has the best text-to-speech
option I have found.

It made me wonder though. Would it be possible to convert a whole eBook to an
audiobook that I could play in my favorite audiobook player? Certainly, the
tools are all there, I just need to put them together.

## Step 1: Getting a text-only version of the book

I won't go into details on this step other than to simply say that I used
[Calibre](https://calibre-ebook.com/) to convert my DRM protected book to a
text-only version. That is not really the focus of this post, so I'll leave it
to you to do some research if you have not used Calibre before. If you want to
find some free books to try this out with, you can find many on
[Project Gutenberg](https://www.gutenberg.org/).

## Step 2: Break the book down into chaptered files

Here a little tip. I had a book with 30 chapters. I ran this command for file
placeholders:

```bash
for i in {01..30}; do touch "Chapter $i.txt"; done
```

Then I just cut and paste chapters into those files.

Be sure to remove characters that you don't want read. For example, one book I
was converting would use underscores to separate sections. So after converting
the audiobook had parts that would say "underscore, underscore, underscore,
underscore, underscore, underscore, underscore, underscore."

Note that chapter files will be compiled in alphabetical order and chapter
bookmarks will be named after the file name. So if you have named chapters such
as `Introduction`, `Prologue`, etc., then you will need to prefix these with
numbers like `00 Introduction`, `01 Prologue`, etc.

## Step 3: Find or create a cover image for your book

Find a cover for your book. For audiobooks, these are generally square, but it
doesn't really matter. I prefer square for consistency in my audiobook player.
Name the cover image `cover.jpg` and put it in the same directory as all your
chapter files.

## Step 4: Run this python script

**Note: I've put
[this script on github, so check here](https://github.com/djedi/ebook2audiobook)
for the latest version**

Wait! Before running the script, you will need to have
[FFmpeg](https://ffmpeg.org/) and [mp4v2](https://github.com/TechSmith/mp4v2)
installed. You can install with [brew](https://brew.sh/).

```bash
brew install ffmpeg mp4v2
```

Run the script and pass in the directory containing your chapter files and cover
as the first argument.

```bash
./ebook2audiobook.py "Name of your directory"
```

You will be prompted for the title and author.

## What is happening

Here is a basic rundown of what the script is doing:

For each text file in the folder, it will run the say command to convert the
text file to an audio file. If you want to try this will a simple text file,
run:

```bash
say -f filenmame.txt -o output.aiff
```

If you want to change the voice, pass in the `-v` option. If you want to see the
voices available, run:

```bash
say -v ?
```

This is probably the longest process of the script.

Next, the script will run through all of the `.aiff` files and compress and
convert them to `.m4a` files using FFmpeg. This is essentiall what is being for
each file:

```bash
ffmpeg -i inputfile.aiff -c:a libfdk_aac -b:a 64k -f mp4 outputfile.m4a
```

Once all the audio conversions are complete, the script will loop through the
`.m4a` files and generate a file called `FILES` that contains a list of all
these files to use for concatenation. It will then use `ffprobe` to get the
duration of each of these files. It will use this information to build a
`METADATA` file that FFmpeg will use to create the chapter bookmarks and set
other metadata information such as the title, author, and album (album is the
same as the title).

Here is the `ffprobe` command that gets the duration:

```bash
ffprobe inputfile.m4a -show_entries format=duration -v quiet -of csv="p=0"
```

Here is the `FFmpeg` command that will do the concatenation:

```bash
ffmpeg -f concat -safe 0 -i PATH_TO_FILES_LIST -i PATH_TO_METADATA_FILE -map_metadata 1 -vn -y -acodec copy outputfile.m4b
```

The script will then call FFmpeg one more time to concatenate all the `m4a`
files into an `m4b` file and create all the chapter makers and add the metadata.

Finally, the script will call `mp4art` (part of `mp4v2`) to add the album cover
image to the `m4b` file which looks like this:

```bash
mp4art -q --add cover.jpg outputfile.m4b
```
