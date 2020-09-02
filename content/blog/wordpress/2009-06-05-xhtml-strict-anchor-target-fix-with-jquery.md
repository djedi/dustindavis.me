---
author: Dustin Davis
comments: true
date: 2009-06-05 22:55:10+00:00
link: https://dustindavis.me/xhtml-strict-anchor-target-fix-with-jquery/
slug: xhtml-strict-anchor-target-fix-with-jquery
title: XHTML Strict Anchor Target Fix with jQuery
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - jquery
  - xhtml
---

Since switching from HTML to XHTML, one of the things that kills my HTML
Validator most is when I get lazy and put a target="\_new" or target="\_blank"
in an anchor tag. So then I have to go back and fix them and find the old
[sitepoint article](http://www.sitepoint.com/article/standards-compliant-world/3/)
that describes how to fix the problem with a little javascript snippet. I was
about about to do than when the thought occurred to me, why not just use jquery?
I'm including the jquery library on every page anyway. It turns out to be rather
simple.

I replace any target="\_blank" with class="external", so my link would look
something like this:

<a class="external" href="http://inzolo.com">Inzolo</a>

Then I write a little jquery snippet like so:

$(document).ready(function(){       
$('a.external').attr('target', '\_blank');  
});

That's it!
