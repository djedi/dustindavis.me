---
author: Dustin Davis
comments: true
date: 2009-09-17 16:18:08+00:00

slug: ie-json-caching-bug
title: IE & JSON Caching Bug
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - cache
  - IE
  - jquery
  - json
---

I came across a weird bug. It seems that IE is the only browser that<strike> has
a tendency</strike> insists on caching JSON results. I created a little api call
that returned a list of users â€œfavoritesâ€. I use jQuery to retrieve this list
and make updates to my site.

Well apparently IE caches the JSON file, so any changes are not reflected.
Firefox and Safari seem to work fine. I tried a number of mime types (as I
understand it, the defacto standard is application/json), but the only one that
seemed to keep IE from caching it was text/plain. Go figure. And people wonder
why developers hate IE so muchâ€¦
