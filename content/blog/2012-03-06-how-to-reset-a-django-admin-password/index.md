---
author: Dustin Davis
comments: true
date: 2012-03-06T18:11:05.000Z
slug: how-to-reset-a-django-admin-password
title: How to Reset a Django Admin Password
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Mr TT](https://unsplash.com/@mrtt) on
  [Unsplash](https://unsplash.com)
categories:
  - Django
tags:
  - django
  - password
  - shell
description:
  The most efficient way to change your admin password on a Django site.
---

This is just a quick post to give a tip on how to recover or reset your Django
admin username and/or password.

Use your django shell to query the User model.

```bash
python manage.py shell
```

```python
from django.contrib.auth.models import User
```

If you can't remember your username, you can view all users in the system.

```python
for u in User.objects.all(): print u.username
```

Once you know your username, you can simply reset the password:

```python
u = User.objects.get(username='dustin')
u.set_password('secret') u.save()
```
