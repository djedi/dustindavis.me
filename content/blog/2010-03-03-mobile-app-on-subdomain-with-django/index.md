---
author: Dustin Davis
comments: true
date: 2010-03-03T17:07:48.000Z
slug: mobile-app-on-subdomain-with-django
title: Mobile App on Subdomain with Django
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Steve Johnson](https://unsplash.com/@steve_j) on
  [Unsplash](https://unsplash.com)
categories:
  - Django
tags:
  - django
  - iphone
  - mobile
  - Python
description: Using an alternate settings file for a mobile version of my site.
---

I've noticed a fairly common pattern arising with mobile and iPhone versions of
websites using sub-domains. [Clicky](http://www.getclicky.com) is an excellent
example of this. They provide an iPhone version of their site at i.getclicky.com
and a generic mobile version at m.getclicky.com.

I want to create something similar for Inzolo.com. I assumed that Django, with
all its awesomeness could handle this without much fuss. But I really wasn't
sure how to put all the pieces together. Essentially, I need to create new sites
on sub-domains that use the same models with different views and templates. My
initial search of Google returned various results of simply creating mobile
versions of existing websites by providing alternate templates, but that is not
what I need to do (well, I suppose I ought to, but that's not on the priority
list yet). I don't want my sales & info pages at the root of the site, I want
the actual app that users log in to budget with - only a dumbed-down version
without all the ajax.

Creating a new project is one solution, but it is not ideal. I could have my
settings point to the same database and copy or symlink my model, but it seems a
bit kludgy.

So I went to where I normally go to get quick tips on Django - the #django IRC
channel. _jumpa_ was particularly helpful in providing the tip I needed.

Since I am using mod_wsgi, I can create an alternate settings file for my mobile
sub-domains. That works great on my live site, but for my testing environment I
don't use mod_wsgi. I simply use `manage.py runserver`. I learned that is not
much of an issue either as I can call
`manage.py runserver --settings=mobile_settings 0.0.0.0:8001`.

So now, I have the preliminary info I need, I can start building. Just one last
thing. I figure I can use most of the existing settings in my main settings
file, so I plan to just extend it to `mobile_settings.py`. At the top of
`mobile_settings.py` I would just add the following, then proceed to
overwrite/add the necessary settings:

```python
    from settings import *
```

## UPDATE

As I suspected there wasn't much to it. I created a new app in my project name
mobile. I also created a new template directory for my mobile templates. Here is
an example of what my `mobile_settings.py` file looks like:

```python
from settings import *

ROOT_URLCONF = 'mysite.mobile_urls'

TEMPLATE_DIRS += (
  "/path/to/my/mobile/templates",
)

INSTALLED_APPS += (
  'mysite.mobile',
)
```
