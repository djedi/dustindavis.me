---
author: Dustin Davis
comments: true
date: 2009-11-05T22:41:27.000Z
slug: copy-model-object-in-django
title: Copy Model Object in Django
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Adam Nieścioruk](https://unsplash.com/@adamsky1973) on
  [Unsplash](https://unsplash.com)
categories:
  - Programming & Internet
tags:
  - django
description: How to copy a database record in Django
---

I ran into a situation where I wanted to created a new database record from an
existing record (model object). I figured there should be a fairly simple
solution. It turns out there is and I want to thank `Seveas` on IRC #django for
pointing it out for me. This is essentially what I did:

```python
from copy import deepcopy
old_obj = deepcopy(obj)
old_obj.id = None
old_obj.save()
```

Voila!
