---
author: Dustin Davis
comments: true
date: 2011-03-11 22:59:33+00:00
link: https://dustindavis.me/django-smart_unicode/
slug: django-smart_unicode
title: Django smart_unicode
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - django
  - encoding
  - python
  - unicode
  - utf8
---

So my QA guy is putting an app through the ringer and presented me with the
following error on a page:

    Caught UnicodeEncodeError while rendering: ('ascii', u'Utf8-\u010a\u010e\ufffd"\u0117', 5, 8, 'ordinal not in range(128)')

For some reason I thought UTF8 characters Just Worked™ in Django, but that was a
bad assumption. The problem came from my model's **unicode** def:

[python]def **unicode**(self): return " ".join([self.first_name,
self.last_name])[/python]

Luckily Django provides a simple fix for this problem.

[python] from django.utils.encoding import smart_unicode ... def
**unicode**(self): return smart_unicode(" ".join([self.first_name,
self.last_name]))[/python]
