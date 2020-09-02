---
author: Dustin Davis
comments: true
date: 2012-03-06 18:11:05+00:00
link: https://dustindavis.me/how-to-reset-a-django-admin-password/
slug: how-to-reset-a-django-admin-password
title: How to Reset a Django Admin Password
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - django
  - password
  - shell
---

This is just a quick post to give a tip on how to recover or reset your Django
admin username and/or password.

Use your django shell to query the User model.

`$ python manage.py shell`

`>>> from django.contrib.auth.models import User`

If you can't remember your username, you can view all users in the system.

`>>> for u in User.objects.all():

> > > print u.username `

Once you know your username, you can simply reset the password:

`>>> u = User.objects.get(username='dustin')

> > > u.set_password('secret') u.save()`
