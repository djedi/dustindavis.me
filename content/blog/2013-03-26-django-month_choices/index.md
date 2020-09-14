---
author: Dustin Davis
comments: true
date: 2013-03-26T16:10:17.000Z

slug: django-month_choices
title: Django MONTH_CHOICES
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Faisal M](https://unsplash.com/@heyfaisal) on
  [Unsplash](https://unsplash.com)
categories:
  - Django
tags:
  - choices
  - django
  - model
  - months
description: Short tip on getting month choices from django.contrib
---

Have you ever wanted to give your model some month choices relating to integers
1-12. I would guess it's pretty common - common enough to be included in
`django.contrib`. Well, it is. Here is a quick tip on how to include it in a
model:

```python
from django.db import models
from django.utils.dates import MONTHS


class RevenueGoal(models.Model):
    month = models.PositiveSmallIntegerField(choices=MONTHS.items())
    year = models.PositiveIntegerField()
    goal = models.DecimalField('Revenue Goal', max_digits=8, decimal_places=2)
```
