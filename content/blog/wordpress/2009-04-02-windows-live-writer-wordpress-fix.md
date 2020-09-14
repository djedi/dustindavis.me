---
author: Dustin Davis
comments: true
date: 2009-04-02 19:45:22+00:00

slug: windows-live-writer-wordpress-fix
title: Windows Live Writer Wordpress Fix
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

So when I first tried Windows Live Writer, it seemed to post fine. But lately it
always strips out all the HTML tags and makes a mess of things. For example, if
I were to post:

<p>Hello World!</p>

It would come across more like:

pHello World!/p

This
[post](http://techtites.com/2009/01/14/fix-the-windows-live-writer-and-wordpress-stripping-tags-issue/)
describes the problem and how to fix it, but really I was in no mood to update
my PHP and libXml install. So, after a bit more searching I found this
[plugin](http://wordpress.org/extend/plugins/libxml2-fix/) that worked like a
charm! Thank you Joseph Scott.
