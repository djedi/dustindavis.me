---
author: Dustin Davis
comments: true
date: 2009-05-21T21:04:23.000Z
slug: django-djson-er-json
title: Django & Djson… er, JSON
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Luca Bravo](https://unsplash.com/@lucabravo) on
  [Unsplash](https://unsplash.com)
categories:
  - Django
tags:
  - django
  - jquery
  - json
  - Python
  - simplejson
description: Converting a DB object to JSON format
---

I must admin this is my first attempt at even using JSON. I wanted to produce
some data that I could consume with jQuery and I figured JSON was the best
format for the job.

I found Django has a
[method for serializing](http://docs.djangoproject.com/en/dev/topics/serialization/#id1)
Model query sets easily and it seemed to work just fine.

The problem I was having was that I needed information from two different
models. I have Envelopes that Belong to EnvelopeCategories. I wanted to return
each category with all the envelopes that belonged in that category.

I kept running into errors when I would try to serialize with Django's
serializer function. Basically, if I created a dictionary with what I needed, it
was serialized. If I used a query set it wouldn't add the parent fields, or any
additional fields I wanted to add. But finally, after browsing around the net
and piecing things together I cam up with a solution:

```python
from django.utils import simplejson
from django.http import HttpResponse
from mysite.myapp.models import EnvelopeCategory, Envelope

def json_envelopes(request):
    categories = EnvelopeCategory.objects.filter(user=request.user)
    # Create dict with information to create JSON feed
    catenvs = []
    for cat in categories:
        cat.envelopes = Envelope.objects.filter(category=cat)
        envs = []
        for env in cat.envelopes:
            envs.append({'id': env.id, 'name': env.title, 'order': env.order})
        catenvs.append({'id': cat.id, 'name': cat.title, 'envelopes': envs, 'order': cat.order})
    # Use simplejson to serialize dict
    data = simplejson.dumps(catenvs, indent=4)
    return HttpResponse(data, mimetype='application/javascript')
```

Now, on to figuring out how to consume it for me needs. 😁
