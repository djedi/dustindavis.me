---
author: Dustin Davis
comments: true
date: 2014-06-12T17:33:01.000Z

slug: django-pluralize-outside-templates
title: Django Pluralize Outside of Templates
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Sam Dan Truong](https://unsplash.com/@sam_truong) on
  [Unsplash](https://unsplash.com)
categories:
  - Python
  - Django
tags:
  - django
description: How to use the pluralize filter directly in python
---

The
[pluralize ](https://docs.djangoproject.com/en/dev/ref/templates/builtins/#pluralize)
filter is great for humanizing text in templates. But what if you want to use
the same function inside of your python code. For example, let's say you are
sending back a message via ajax.

It is simple enough to make use of the same pluralize filter function in your
python code:

```python
from django.template.defaultfilters import pluralize

def message(count):
    return '{} item{} {} updated.'.format( count, pluralize(count), pluralize(count, 'was,were'))
```

Testing this would produce the following results:

```text
In [3]: message(1) Out[3]: '1 item was updated.'

In [4]: message(2) Out[4]: '2 items were updated.'

In [5]: message(0) Out[5]: '0 items were updated.'
```
