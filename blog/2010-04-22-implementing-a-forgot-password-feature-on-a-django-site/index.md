---
author: Dustin Davis
comments: true
date: 2010-04-22T11:24:11.000Z
slug: implementing-a-forgot-password-feature-on-a-django-site
title: Implementing a Forgot Password Feature on a Django Site
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Peter Pryharski](https://unsplash.com/@meteorphoto) on
  [Unsplash](https://unsplash.com)
categories:
  - Django
tags:
  - django
  - forgot password
  - password reset
description: Everyone forgets their password, help customers get it back.
---

Here is something that seems to be quite common on any type of membership site
-- members forget their password.

This morning I was about to write this and I though surely there must be
something build in. Surely.

It's turns out it is built in quite nicely and very easy to use. Start with a
simple link on your template:

<a href="{% raw %}{% url django.contrib.auth.views.password_reset %}{% endraw %}"
  >Forgot your password?</a
>

Then, create the following five templates:

<template_dir>/registration/password_reset_confirm.html
<template_dir>/registration/password_reset_form.html
<template_dir>/registration/password_reset_done.html
<template_dir>/registration/password_reset_complete.html
<template_dir>/registration/password_reset_email.html

Note that you don't even need to create these templates for the feature to work.
If you don't create them you will see the forms using the default Django admin
template. Obviously, you'll want to create them and extend your base template.

If you get a `NoReverseMatch` error, add the following line to your main urls.py
file:

```python
url(r'^account/', include('django.contrib.auth.urls')),
```

Check out the
[auth built-in views docs](http://docs.djangoproject.com/en/dev/topics/auth/#other-built-in-views)
for more info.
