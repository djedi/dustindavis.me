---
author: Dustin Davis
comments: true
date: 2009-05-15 15:29:24+00:00
link: https://dustindavis.me/webfaction-review/
slug: webfaction-review
title: Webfaction Review
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
  - Web Sites
tags:
  - cpanel
  - directadmin
  - django
  - Ruby on Rails
  - webfaction
  - wordpress
---

I was looking at my web stats and noticed I was getting a lot of traffic to my
[limited review of Webfaction](http://www.nerdydork.com/webfaction-limited-review.html).
To recap, I tried out there account then decided to cancel, and they were prompt
and friendly at delivering a refund.

Since that time, I have set up two
[Webfaction](http://www.webfaction.com?affiliate=redseam) accounts. When I
started developing [Inzolo.com](http://inzolo.com), I wanted to set it up faster
and keep it separated from my VPS accounts mainly so I could keep cost separate
with this business as I was going to be working on it with friends. Setting up
[Django](http://www.djangoproject.com) was ridiculously simple compared to the
steps I had to go through with
[cPanel](http://www.nerdydork.com/setting-up-django-on-a-whm-cpanel-vps-liquidweb.html).
I was able to set up the latest version of Django and the latest version of
Python with a few clicks of a button. As far as access goes, I still had SSH to
go in and work directly on the server, just as I can with my VPS account.

[Webfaction](http://www.webfaction.com?affiliate=redseam) has a method of
breaking things down by domains, applications, and websites. Once you understand
how it works, you will fall in love with the simplicity of the system! You can
set up multiple domains. Then you can create various applications, such as:

- Django on WSGI
- Django on mod_python
- Static/CGI/PHP
- Subversion (What?! I just saw this, I'll have to check it out!)
- Ruby on Rails
- Symbolic links (perfect for Django's admin media)
- Wordpress
- AWStats
- Drupal
- Joomla
- â€¦ and a number of others

Once you have a domain and an application, you specify how you want to access
that application on your domain.

Let me give you an example with my latest project - Mini Site Tracker. I
originally set this up on my inzolo account, but again, I wanted to keep
expenses separate so I ordered another
[Webfaction](http://www.webfaction.com?affiliate=redseam) account. I set up a
domain, minisitetracker.com. I then added two subdomains:

- www - points to minisitetracker.com
- - - wildcard subdomain so I can use any subdomain for accounts in my web
      application

I then set up the following applications:

- admin_media - points to Django's admin media for the built in admin control
  panel
- minisitetracker - Django 1.0.2 running on mod_wsgi 2.0 and Python 2.5
- mst_media - Static/CGI/PHP for storing all my media files associated with my
  Django application (images, javascript, css)
- osticket - Static/CGI/PHP for installing [osTicket](http://www.osticket.com)
  on
- wordpress - Wordpress 2.7.1

[![image](http://www.nerdydork.com/wp-content/uploads/2009/05/image-thumb.png)](http://www.nerdydork.com/wp-content/uploads/2009/05/image.png)

I then map my application to my website like so:

[![image](http://www.nerdydork.com/wp-content/uploads/2009/05/image-thumb1.png)](http://www.nerdydork.com/wp-content/uploads/2009/05/image1.png)

It's really that simple. Databases are equally easy to set up - you can set up
MySQL or PostgreSQL. I haven't found that anything missing with Webfaction that
I used in cPanel or DirectAdmin VPS accounts.

That about sums it up really. I love
[Webfaction](http://www.webfaction.com?affiliate=redseam).
[Webfaction rocks!](http://sucks-rocks.com/rate/webfaction/mediatemple/cpanel)
Really, for what they do, I don't think they have any real competitors that I
know of.

If you find this review helpful, please
[sign up using my referral link](http://www.webfaction.com?affiliate=redseam).
