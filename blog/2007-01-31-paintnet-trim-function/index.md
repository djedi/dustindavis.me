---
author: Dustin Davis
comments: true
date: 2007-01-31 18:15:17+00:00

slug: paintnet-trim-function
title: Paint.net Trim Function
description: How to trim an image like you would in Photoshop
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Peter Beukema](https://unsplash.com/@peterbeukema) on
  [Unsplash](https://unsplash.com)'
categories:
  - images
---

I'm really liking [Paint.net](http://www.getpaint.net). I can't afford Photoshop
and so I resorted to using free alternatives such as
[GIMP](http://www.gimp.org/windows/) and [Paint.net](http://www.getpaint.net).
There has been a slight learning curve though as I've had to get used to these
free tools.

One thing I found missing that I would often use in Photoshop is the trim
function. This essentially allows you to remove the extra blank space or white
(or whatever color you choose) space around an image.

I've found a simple workaround to do what I need though.

Here it is, step-by-step:

Use the magic want to select the outside portion you want to trim.  
{% responsiveImage "images/magic-wand.gif", "magic wand", "", 720, "" %}  
{% responsiveImage "images/wand-select.thumbnail.gif", "wand selected", "", 720, "" %}

Invert your selection:  
{% responsiveImage "images/invert.thumbnail.gif", "invert", "", 720, "" %}  
{% responsiveImage "images/inverted.thumbnail.gif", "inverted", "", 720, "" %}

And finally, crop to selection:  
{% responsiveImage "images/crop.thumbnail.gif", "crop", "", 720, "" %}  
{% responsiveImage "images/cropped.thumbnail.gif", "cropped", "", 720, "" %}
