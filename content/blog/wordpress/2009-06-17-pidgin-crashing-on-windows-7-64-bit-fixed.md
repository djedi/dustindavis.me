---
author: Dustin Davis
comments: true
date: 2009-06-17 16:28:26+00:00

slug: pidgin-crashing-on-windows-7-64-bit-fixed
title: Pidgin Crashing on Windows 7 64-bit – Fixed
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Technology
tags:
  - pidgin
  - windows 7
  - xampp
---

Ever since installing Windows 7 RC, I have not been able to run
[Pidgin](http://www.pidgin.im). It would put an icon in the tray, then
disappear. Finally after searching the net high and low and found
[this comment](http://finicity.uservoice.com/pages/general/suggestions/11731) on
an open pidgin ticket that seemed to resolve the problem.

<blockquote>  
> 
> I have XAMPP installed and the PHP subdirectory is in the path. I renamed the aspell-15.dll in this directory and the crash went away. Renaming the file back caused the crash. Seems to be a conflict between these two files.
> 
> </blockquote>

I also had the same issue with XAMPP installed. Thanks Chowarmaan, whoever you
are!
