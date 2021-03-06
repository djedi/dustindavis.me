---
author: Dustin Davis
comments: true
date: 2009-07-31T12:18:06.000Z
slug: django-cron-on-webfaction
title: Django cron on Webfaction
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Glenn Carstens-Peters](https://unsplash.com/@glenncarstenspeters) on
  [Unsplash](https://unsplash.com)
categories:
  - Django
tags:
  - cron
  - django
  - Python
  - webfaction
description: How to adjust the python path to run Django scripts in cron
---

[James Bennett addresses](http://www.b-list.org/weblog/2007/sep/22/standalone-django-scripts/)
one of the most frequently asked questions in Django "How do I write a
standalone script which makes use of Django components?"

That is what I needed to do. I'm still learning Python so I wasn't sure why the
methods he described in his article didn't work for me. (OK, I have an idea, but
for the fear of looking stupid I'm not going to try to explain it.)

I'm using [Webfaction](/blog/webfaction-review) to host
[my site](http://inzolo.com/), so I turned to their forum for assistance and
found [this topic](http://forum.webfaction.com/viewtopic.php?pid=10911). Still,
the examples didn't quite work for me either. Finally, I found a clue in my WSGI
script. Adding the following lines to my python file is what I needed to get me
going:

```python
import sys, os

sys.path = ['/home/mylogin/webapps/mysite', '/home/mylogin/webapps/mysite/lib/python2.5'] + sys.path
os.environ['DJANGO_SETTINGS_MODULE'] = 'mysite.settings'
```
