---
author: Dustin Davis
comments: true
date: 2008-12-18T16:51:31.000Z

slug: download-pop3imap-email-attachments-with-php
title: Download POP3/IMAP Email Attachments with PHP
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Dan-Cristian Pădureț](https://unsplash.com/@dancristianp) on
  [Unsplash](https://unsplash.com)
categories:
  - PHP
description: How to download email attachments via PHP
---

I found this niftly little class on
[phpclasses.org](http://www.phpclasses.org/browse/package/2964.html). Basically,
it logs in to an email server and downloads all email attachments and saves them
as files. That's basically it, no more, no less.

This was exactly what I needed though. I wanted to run some daily reports in
Google AdWords and Google AdSense, to a specific email address, then process
those reports on a daily basis to customize my own reports... in a nutshell.

I did make a few updates to this class.

1. The `$savedirpath` variable was not utilized. It simply saved the files in
   the same location as the script. I had it implement this parameter.
2. I added another parameter to delete emails after downloading the attachments.
   Luckily for me, when I went to add the code, I found it was already there,
   just commented out.
3. Tidied up the code a bit to make it more readable for me.

You can download the original files
[here](http://www.phpclasses.org/browse/package/2964.html) and get my updates
[here](./classemailattachment.zip).
