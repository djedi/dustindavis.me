---
author: Dustin Davis
comments: true
date: 2007-03-29 16:36:50+00:00
link: https://dustindavis.me/sorting-an-html-table/
slug: sorting-an-html-table
title: Sorting an HTML Table
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

Oh, sometimes I really LOVE the web 2.0 javascript features. Take for example
sorting tables. Now the old school method of doing this is to programatically
send the column you want to sort by and whether you will be sorting ascending or
descending and pass it to the page in a get variable. It is really a pain in the
butt to code.

Well, thanks to
[Stuart Langridge](http://kryogenix.org/code/browser/sorttable/), making tables
sortable is a breeze. And it doesn't require you do a page refresh to sort the
table.

The downside is that it doesn't work on browsers that don't support Javascript,
but unless you are trying to support pocket pc's or something, this is pretty
much a non-issue.

- One thing to watch out for, notice the name of the javascript file is
  sort**t**able.js (extra 't' - the script makes a "sort-table") and the class
  you need for your table is "sortable" (no extra 't' - the table is now
  "sortable"). I sort _(no pun intended)_ of missed this and it had me boggled
  for couple minutes.
