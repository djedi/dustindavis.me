---
author: Dustin Davis
comments: true
date: 2008-06-19T17:34:08.000Z
slug: remember-trbl
title: Remember TRBL
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Sharon McCutcheon](https://unsplash.com/@sharonmccutcheon) on
  [Unsplash](https://unsplash.com)
categories:
  - CSS
description: The TROUBLE remembering the order of things in CSS
---

This post (like many I write) is mainly for myself.

When using CSS padding or margin, I generally will write margin-top,
margin-bottom, margin-left, etc. I know there is easier syntax where I can
specify all for with one line such as

```css
margin: 0 10px 88px 10px;
```

The problem is, I can never remember which one is where. Know I'm not going to
forget. It's simply top, right, bottom, left... TRBL, TRouBLe, trouble. Who can
forget trouble?

Sometime I want the top and bottom the same and the left and right the same. It
is also a one-liner:

```css
margin: 10px 20px; /_ top-bottom, right-left _/
```

No, I'm not going to remember TBRL, that would be stupid. I'll just remember to
start at Top. See, no TRouBLe at all!
