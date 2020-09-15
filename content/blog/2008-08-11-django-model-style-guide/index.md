---
author: Dustin Davis
comments: true
date: 2008-08-11T18:58:06.000Z
slug: django-model-style-guide
title: Django Model Style Guide
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Héctor J. Rivas](https://unsplash.com/@hjrc33) on
  [Unsplash](https://unsplash.com)
categories:
  - Django
tags:
  - Django
description: The preferred order of Model classes and methods
---

(This post is mostly for my own reference)

James Bennett mentions a Django style guide in his book
[Practical Django Projects](https://amzn.to/2RwomCS).

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
