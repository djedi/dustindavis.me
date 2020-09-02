---
author: Dustin Davis
comments: true
date: 2007-02-12 21:32:20+00:00
link: https://dustindavis.me/crop-an-image-bitmap-in-c-or-vbnet/
slug: crop-an-image-bitmap-in-c-or-vbnet
title: Crop An Image (Bitmap) in C# or VB.NET
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

I looked all over the net for some sort of function and what I ended up with
seemed rather simple function to crop an bitmap.

Here is the function in C#
`public Bitmap CropBitmap(Bitmap bitmap, int cropX, int cropY, int cropWidth, int cropHeight) { Rectangle rect = new Rectangle(cropX, cropY, cropWidth, cropHeight); Bitmap cropped = bitmap.Clone(rect, bitmap.PixelFormat); return cropped; }`

And the same 3-liner in [VB.NET](http://en.wikipedia.org/wiki/Visual_Basic_.NET)
`Private Function CropBitmap(ByRef bmp As Bitmap, ByVal cropX As Integer, ByVal cropY As Integer, ByVal cropWidth As Integer, ByVal cropHeight As Integer) As Bitmap Dim rect As New Rectangle(cropX, cropY, cropWidth, cropHeight) Dim cropped As Bitmap = bmp.Clone(rect, bmp.PixelFormat) Return cropped End Function`

(Sorry the format is not that great on my blog here.)

[tags]vb.net, c#, crop, image, bitmap, visual studio[/tags]
