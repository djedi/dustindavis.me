---
author: Dustin Davis
comments: true
date: 2010-01-12 00:21:05+00:00
link: https://dustindavis.me/basic-authentication-on-mod_wsgi/
slug: basic-authentication-on-mod_wsgi
title: Basic Authentication on mod_wsgi
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - api
  - authentication
  - basic auth
  - django
  - mod_wsgi
  - piston
  - wapi
  - webfaction
  - wsgi
---

I'm currently in the process of creating an iPhone app for
[Inzolo](http://inzolo.com). This requires an API of course. I wanted to take
advantage of what was currently available for Django and I came across
[wapi](http://fi.am/entry/building-a-website-api-with-django-part-1-api-func/).
Time is of the essence so I decided to take the easiest route and use basic
authentication for now. (I'm still learning about API best practices).

I got some basic API calls working in my local machine running "manage.py
runserver". Once I pushed it live, the basic authentication would not work. I'm
hosting with [Webfaction](http://www.nerdydork.com/webfaction-review.html) so I
[posted to the forum](http://forum.webfaction.com/viewtopic.php?id=3752) for
help and continued to look.

I wasn't making progress at all so I started looking for another API framework
and learned of [Piston](http://bitbucket.org/jespern/django-piston/wiki/Home).
In hindsight I would have started here because it was developed by
[bitbucket.org](http://bitbucket.org) and it seems it will have much longer
longevity.

In any case, while reading the docs for Piston I saw this note:

<blockquote>**Note**: that using `piston.authentication.HttpBasicAuthentication` with apache and mod_wsgi requires you to add the `WSGIPassAuthorization On` directive to the server or vhost config, otherwise django-piston cannot read the authentication data from `HTTP_AUTHORIZATION` in `request.META`. See: [http://code.google.com/p/modwsgi/wiki/ConfigurationDirectives#WSGIPassAuthorization](http://code.google.com/p/modwsgi/wiki/ConfigurationDirectives#WSGIPassAuthorization).</blockquote>

That was the clue I needed! I added this one-liner to apache config and... still
didn't work. :(

I then went through the process of upgrading. I was running Django
(1.0.2)/mod_wsgi (2.0)/Python (2.5), I upgraded to Django (1.1.1)/mod_wsgi
(2.5)/Python (2.5). Now, with the "WSGIPassAuthorization On" it works.
