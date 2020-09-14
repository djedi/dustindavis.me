---
author: Dustin Davis
comments: true
date: 2007-03-28 15:53:00+00:00

slug: word-wrap-reflow-in-firefox-table-cell
title: Word Wrap / Reflow in Firefox Table Cell
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

OK, this bug is just insane. I've got a table cell displaying very long URLs.
Oddly, there is no CSS style that allows Firefox to "reflow" or wrap the text
based on a given width.

This bit of CSS solves the problem for virtually every other popular browser:

`td { width: 450px; white-space: pre-wrap; /* css-3 */ white-space: -moz-pre-wrap; /* Mozilla, since 1999 */ white-space: -pre-wrap; /* Opera 4-6 */ white-space: -o-pre-wrap; /* Opera 7 */ word-wrap: break-word; /* Internet Explorer 5.5+ */ }`

... but it does nothing for Firefox.

That led me to find a programmable solution to my problem. What I did was use
regular expression to add a zero-width character after any character that is not
a letter or number. The character will wrap when it reaches a "barrier".

Here's the code in php:

`$url = preg_replace('/([^a-zA-Z0-9])/', "$1&#8203;â€‹â€‹â€‹", $url);`

Or, for you smarty fans:

`{$url|regex_replace:"/([^a-zA-Z0-9])/":"\$1â€‹â€‹â€‹&#8203;"}`
