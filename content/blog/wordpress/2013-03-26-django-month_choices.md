---
author: Dustin Davis
comments: true
date: 2013-03-26 16:10:17+00:00
link: https://dustindavis.me/django-month_choices/
slug: django-month_choices
title: Django MONTH_CHOICES
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - choices
  - django
  - model
  - months
---

Have you ever wanted to give your model some month choices relating to integers
1-12. I would guess it's pretty common - common enough to be included in
django.contrib. Well, it is. Here is a quick tip on how to include it in a
model:

[python highlight="2,6"] from django.db import models from django.utils.dates
import MONTHS

class RevenueGoal(models.Model): month =
models.PositiveSmallIntegerField(choices=MONTHS.items()) year =
models.PositiveIntegerField() goal = models.DecimalField('Revenue Goal',
max_digits=8, decimal_places=2) [/python]
