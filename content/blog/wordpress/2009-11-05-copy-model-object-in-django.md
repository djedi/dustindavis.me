---
author: Dustin Davis
comments: true
date: 2009-11-05 22:41:27+00:00
link: https://dustindavis.me/copy-model-object-in-django/
slug: copy-model-object-in-django
title: Copy Model Object in Django
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - django
---

I ran into a situation where I wanted to created a new database record from an
existing record (model object). I figured there should be a fairly simple
solution. It turns out there is and I want to thank Seveas on IRC #django for
pointing it out for me. This is essentially what I did:

from copy import deepcopy old_obj = deepcopy(obj) old_obj.id = None
old_obj.save()

Voila!
