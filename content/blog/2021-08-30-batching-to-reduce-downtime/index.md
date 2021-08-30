---
slug: batching-to-reduce-downtime
title: Batching to Reduce Downtime
date: 2021-08-30
author: Dustin Davis
description: Adjusting the flow of your process can make good routines better.
categories:
  - automation
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Bernard Hermant](https://unsplash.com/@bernardhermant) on
  [Unsplash](https://unsplash.com)
---

Sometimes a good process can be improved by breaking it down into smaller
processes. Let me give you an example.

I have a process that has worked well for me for a long time. That is how I
manage mail and bills. May years ago I purchased an expensive scanner. I don't
regret it. I have the Fujitsu ScanSnap iX500. I think I paid about \$500 for it
when I got it about 10 years ago.

I use it in combination with Evernote and it has eliminated the need for a
filing cabinet. I have been "paperless" since I purchased it.

When I started, my process went something like this.

1. Receive mail
1. Open mail
1. If a bill then pay the bill, write "paid" on the bill
1. Scan main into Evernote
1. Edit Evernote clip with titles, tags, etc.
1. Throw away paper

I found ways to improve the process by batching certain processes. For a long
time, it worked more like this

Process 1

1. Recieve mail
1. Put mail in an inbox

Process 2

1. Open mail all mail (sort what needs to be scanned or just thrown away)
1. Scan all mail
1. Edit Evernote clip with titles, tags, etc.
1. If a bill, then add a Reminder on the Evernote clip
1. Throw away paper

Process 3

1. Go through each Evernote reminder and pay bills
1. Clear reminder after the bill is paid

Writing it out, the process looks longer, but it isn't really. It is mostly the
same.

Recently I modified Process 2 to try to make it more efficient.

When I scan notes, I like to turn on the OCR so that I can search for all the
text in the PDF documents. Doing this greatly slows down the process of
scanning. So really between the "Scan mail" and "Edit Evernote" there is a long
pause to wait for OCR before scanning the next document.

It is frustrating enough, that I have turned it off in the past so I could get
through the scanning process faster. But that led to the problem of having
difficulty finding certain documents because I don't have all the text of the
documents indexed to search against.

I recently adjusted my process to address this specific problem. I have edited
my ScanSnap to scan to a folder directly rather than into Evernote and I have
turned off OCR. Now I can scan everything very quickly. Once I'm done, I run a
script that I wrote that will OCR each PDF and import it into Evernote. I've set
this up so that multiple PDFs can be processed at once. This essentially does
two things: 1) It processes the OCR faster as I can use my CPU cores to
multitask and 2) It puts all the waiting time into 1 bucket so I'm not stopping
my process and getting distracted between each scan.

Here are the contents of my script. I make use of the nice open-source software
[OCRmyPDF](https://github.com/jbarlow83/OCRmyPDF).

```shell
#!/bin/bash

SCANS_DIR='/Users/dustin/Documents/PreEvernote'
SEARCHABLE_SCANS_DIR='/Users/dustin/Documents/SearchableScans'


mkdir -p $SEARCHABLE_SCANS_DIR
open $SEARCHABLE_SCANS_DIR

open -a Evernote

for filename in $SCANS_DIR/*.pdf; do
    basename=`basename -a "$filename"`
    echo "Converting $basename"
    newpath="$SEARCHABLE_SCANS_DIR/$basename"
    ocrmypdf --skip-text "$filename" "$newpath" &
done

wait

for newpath in $SEARCHABLE_SCANS_DIR/*.pdf; do
    open -a Evernote "$newpath"
done

# clean up
sleep 1
trash $SCANS_DIR/*.pdf
trash $SEARCHABLE_SCANS_DIR
```

A couple of other things I do to speed up this process are:

1. I make use of [Alfred](https://www.alfredapp.com/) and
   [a plugin that will quickly add reminders](https://github.com/heyflorin/alfred-evernote-reminders)
   for me. I use
   [Evernote Legacy](https://help.evernote.com/hc/en-us/articles/360052560314-Install-an-older-version-of-Evernote)
   because the Alfred plugin doesn't work with the new version of Evernote and
   the new version of Evernote makes using Reminders a lot harder and a many
   more clicks. It is not good.
2. I use [FastScripts](https://redsweater.com/fastscripts/) to map a hotkey to
   my script above. Once I'm done scanning I can just press the hotkey to start
   processing all my scans.

Hopefully, this gives you some ideas to look for ways to improve some of your
workflows. If you see areas for improvement in mine, I'm always open to
suggestions!
