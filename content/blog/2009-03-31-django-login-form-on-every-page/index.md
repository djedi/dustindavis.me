---
author: Dustin Davis
comments: true
date: 2009-03-31 22:16:00+00:00

slug: django-login-form-on-every-page
title: 'Django: Login Form on Every Page'
description: How to include a login form on every page of a Django app
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Forian Berger](https://unsplash.com/@bergerteam) on
  [Unsplash](https://unsplash.com)'
categories:
  - Django
  - python
tags:
  - Django
  - python
---

Up to the point, when it has come to Django user authentication and
registrations, I've used django-registration as a plug and play solution.
Authentication was frankly something I didn't want to dive into, until now.

It turns out it is not scary at all. For my latest project, I had some space to
fill in a free template I found and liked, so I decided to put a login form on
every page if the user was not logged in. This is something I have done before
in a PHP/Smarty project, but have yet to attempt in Django. It wasn't totally
straight forward, so I decided to document it here.

First of all, I put my login form in my base template. I just hand coded the
form because I didn't want to message with passing a form object to every single
page. My login form code looked something like this:

```html
{% if user.is_authenticated %}
<!-- Authenticate account menu -->
{% else %}
<h3>Login</h3>
<form action="/login/" method="post" accept-charset="utf-8">
  <label for="username">Username</label
  ><input type="text" name="username" value="" id="username" />
  <label for="password">Password</label
  ><input type="password" name="password" value="" id="password" />
  <p><input type="submit" value="Login ->" /></p>
</form>
{% endif %}
```

I created my own login and logout views as follows:

```python
def mylogin(request):
  if request.method == 'POST':
    user = authenticate(username=request.POST['username'], password=request.POST['password'])
    if user is not None:
      if user.is_active:
        login(request, user)
        # success
        return HttpResponseRedirect('/')
      else:
        # disabled account
        return direct_to_template(request, 'inactive_account.html')
    else:
      # invalid login
      return direct_to_template(request, 'invalid_login.html')

def mylogout(request):
  logout(request)
  return direct_to_template(request, 'logged_out.html')
```

And the URL patterns to go with them:

```python
(r'^login/$', 'minisitetracker.sites.views.mylogin'),
(r'^logout/$', 'minisitetracker.sites.views.mylogout'),
```

This all worked fine, except when I wanted to use the @login_requied decorator,
which redirected to /accounts/login/?next=(page I was on). So I created a simple
redirect which basically told them to use the login form to login.

```python
urlpatterns += patterns('django.views.generic.simple',
  (r'^accounts/login/$', 'direct_to_template', {'template': 'login_required.html'}),
)
```

Notice the "next" variable that gets passed in though. This is a handy feature
that sends the user to the page they were trying to access after they log in.
Initially I thought it would be nice to have them stay on the page they were on
once logging in, but I didn't want to mess with figuring it out so I ignored it.
But I just couldn't ignore the "next" feature. It's not in my nature.

So in PHP and Smarty, it is very easy to get POST and GET variables passed into
the page from within the template such as {
$smarty.post.var } or { $smarty.get.var }. These variables are not passed to
Django automatically. So, for the first time, I wrote my own context processor:

```python
def login(request):
  if 'next' in request.GET:
    return { 'NEXT': request.GET['next'] }
  else:
    return { 'NEXT': request.path }
```

Notice the else statement. Return the request.path by default also allowed me to
keep the user on the same screen that he logged in on. Notice the slight update
to my login form and function:

```html
{% if user.is_authenticated %}
<!-- Authenticate account menu -->
{% else %}
<h3>Login</h3>
<form action="/login/" method="post" accept-charset="utf-8">
  <label for="username">Username</label
  ><input type="text" name="username" value="" id="username" />
  <label for="password">Password</label
  ><input type="password" name="password" value="" id="password" />
  <input type="hidden" name="next" value="{{ NEXT }}" />
  <p><input type="submit" value="Login →" /></p>
</form>
{% endif %}}
```

```python
def mylogin(request):
  if request.method == 'POST':
    user = authenticate(username=request.POST['username'], password=request.POST['password'])
    if user is not None:
      if user.is_active:
        login(request, user)
        # success
        if request.POST['next']:
          return HttpResponseRedirect(request.POST['next'])
        else:
          return HttpResponseRedirect('/')
      else:
        # disabled account
        return direct_to_template(request, 'inactive_account.html')
    else:
      # invalid login
      return direct_to_template(request, 'invalid_login.html')
```
