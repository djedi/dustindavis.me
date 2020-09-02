---
author: Dustin Davis
comments: true
date: 2007-09-24 17:47:39+00:00
link: https://dustindavis.me/password-protecting-a-zip-file-using-php/
slug: password-protecting-a-zip-file-using-php
title: Password Protecting a Zip File Using PHP
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

I needed a way to add a password to zip files I was creating in PHP, but it
seems support for that is lacking. So I resorted to using
[Info-ZIP](http://www.info-zip.org/Zip.html). This particular site I was running
PHP on a Windows IIS server. Info-ZIP is free and supported on multiple
platforms. I downloaded the Windows binary file and put zip.exe in my C:\WINDOWS
folder. I then had to give the Internet User Execute permission on
C:\WINDOWS\System32\cmd.exe in order for me to call the
[system() function](http://php.net/system) in php.

Then I wrote a quick test script that seemed to work:

`<?php $filename = "filename.zip"; $pdf = "document.pdf"; echo system("zip -P 1234 -j $filename \"$pdf\""); `
