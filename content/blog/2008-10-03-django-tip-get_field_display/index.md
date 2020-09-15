---
author: Dustin Davis
comments: true
date: 2008-10-03T22:45:44.000Z
slug: django-tip-get_field_display
title: 'Django Tip: get_FIELD_display()'
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Aaron Burden](https://unsplash.com/@aaronburden) on
  [Unsplash](https://unsplash.com)
categories:
  - Django
description: Magic template functions in Django
---

I'm posting this because it seems rather simple, but it took me a while to
find - even with some tips from some helpful people in the #django IRC channel.

Let's say you have a ChoiceField set up like the
[documents describe](http://docs.djangoproject.com/en/dev/ref/models/fields/#choices):

```python
class Foo(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
```

Now, you want to display the gender field in a template. If you use the
`{{ person.gender }}` variable, you would get "M" or "F" to display on your
page. But what if you want "Male" or "Female"? Then you would use
`{{ person.get_gender_display }}`.

Nifty.
