---
author: Dustin Davis
comments: true
date: 2008-08-11 18:58:06+00:00
link: https://dustindavis.me/django-model-style-guide/
slug: django-model-style-guide
title: Django Model Style Guide
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - Django
---

(This post is mostly for my own reference)

James Bennett mentions a Django style guide in his book
[Practical Django Projects](http://www.amazon.com/gp/product/1590599969?ie=UTF8&tag=nerdydork-20&linkCode=as2&camp=1789&creative=9325&creativeASIN=1590599969)![](http://www.assoc-amazon.com/e/ir?t=nerdydork-20&l=as2&o=1&a=1590599969).
I couldn't find reference to it, but the following is the order of things when
it comes to models:

1. Any constants and/or lists of choices
2. The full list of fields
3. The Meta class if present
4. The Admin class if present
5. The **unicode**() method
6. The save() method, if its being overridden
7. The get_absolute_url() method, if present
8. Any additional custom methods
