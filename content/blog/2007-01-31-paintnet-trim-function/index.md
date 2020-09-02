---
author: Dustin Davis
comments: true
date: 2007-01-31 18:15:17+00:00
link: https://dustindavis.me/paintnet-trim-function/
slug: paintnet-trim-function
title: Paint.net Trim Function
description: How to trim an image like you would in Photoshop
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Peter Beukema](https://unsplash.com/@peterbeukema) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
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
![magic wand](images/magic-wand.gif)  
![wand selected](images/wand-select.thumbnail.gif)

Invert your selection:  
![invert](images/invert.thumbnail.gif)  
![inverted](images/inverted.thumbnail.gif)

And finally, crop to selection:  
![crop](images/crop.thumbnail.gif)  
![cropped](images/cropped.thumbnail.gif)
