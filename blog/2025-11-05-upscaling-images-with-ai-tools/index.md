---
slug: upscaling-images-with-ai-tools
title: Upscaling Images with AI Tools
date: 2025-11-05
author: Dustin Davis
description:
categories:
  - yada
banner: ./images/banner.png
bannerCredit:
---

My wife loves to decorate. She has a keen eye and knows exactly what she wants.
Generally that means scouring the internet for something she can hang on our
wall somewhere.

If I can buy a hi-res image, then great. If not, then I'm left to figuring out
how to make it the right size and scale it big enough to print.

Here is today's example that she found on
[Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Priscilla_and_John_Alden_%2871565%29.jpg):

![Priscilla and John Alden](./images/alden.jpg 'Priscilla and John Alden')

She is a descendant of John and Priscilla Alden so she would like an 8x10 image
printed for Thanksgiving decor.

The challenge is that if you were to crop it to 8x10, you would have to cut off
their feet. She wanted it expanded. Years ago this was an impossible task to
make it look decent. Now with AI, we have more options.

I used Photoshop to do this. I also used it to crop the image and remove the
writing. I then had this image that I used in the next step:

![Cropped and Edited](./images/8x10.png)

I tried various tools: Midjourney, ChatGPT, Grok, and finally got a decent
result with Google Gemini. But I first had to expand it to 4:5 (8:10) ratio and
tell it to fill in the white areas.

Here is what Gemini created:

![Gemini Generated](./images/gemini.jpg 'Gemini')

I removed the Gemini watermark, then I ran it through Topaz Gigapixel to upscale
it to a higher resolution (I have an old version because I use it sporadically -
not enough to keep paying regularly for a subscription).

Here is the final image ready to send to print:

[![Priscilla and John Alden 4x](./images/PriscillaandJohnAlden4x.jpg)](./images/PriscillaandJohnAlden4x.jpg)
