---
author: Dustin Davis
comments: true
date: 2008-09-11 18:33:13+00:00

slug: django-accounts-on-subdomains
title: Django Accounts on Subdomains
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - Django
---

_\*Disclaimer: I'm a Django and Python newbie. Your mileage may vary following
my advice._

My Goal is to create an accounts system similar to
[Unfuddle](http://unfuddle.com/), where to register for a new account, a user
will enter a subdomain and admin login (see
[Unfuddle registration](https://secure.unfuddle.com/accounts/new?plan=private)).

Users can't really log in from the home page - only from their subdomain. Once
they are logged in, administrators can add more users that only have access to
that subdomain.

<blockquote>___FYI, I'm not competing against Unfuddle. I'm just very familiar with their system as I am a happy paying user. There are a number of other sites using this kind of accounting system. I'm sure I could implement it in PHP, but I really want to learn Django so I'm sticking with it on this project.  
  
I would like to give props to the developers of Unfuddle as they have been more than helpful in reguards to sharing the structure of their application and the way they do things. Thanks guys! I'm sure if I were writing this in Ruby on Rails they would be even more helpful as their application is written in Rails._  
</blockquote>

Now, back to the show.

I'm trying to use as much pre-existing code as possible so I can take advantage
of others knowledge and so I don't have to reinvent any wheels.

I'm doing my development and testing on Windows. So in order to test this, I've
edited my hosts files (C:\WINDOWS\system32\drivers\etc\hosts) with my main
domain and a few subdomains that I want to test. When I go live, I will likely
remove these from the hosts files and set up
[wildcard dns & subdomains](/blog/setting-up-wildcard-dns-subdomains-on-cpanel)
on the server.

Here is an example of my hosts file entries used to test:

127.0.0.1 sample.com  
127.0.0.1 www.sample.com  
127.0.0.1 test.sample.com  
127.0.0.1 company.sample.com  
127.0.0.1 django.sample.com  
127.0.0.1 nerd.sample.com  
127.0.0.1 dork.sample.com

So far, this is what I've done to implement:

1. Install
   [django-registration](http://code.google.com/p/django-registration/) - I just
   checked out the latest source and plugged the registration folder into my
   project. Once I got it set up, I added a field to the form.

_This is still a work in progress so I'll have to come update later. Basically
my goal is to have a registration form that also asks for the subdomain and
title of the user or company. Then I will append the subdomain to the username
before saving it to the Users table so that username can be unique within
sub-domains._

2. I created a simple middleware inside my application. This basically reads the
   HTTP_HOST and sets request.domain and request.subdomain. If there is no
   subdomain, or the subdomain is 'www', then it returns and empty string.

3. My main template will have a link to log in. If they are on their subdomain
   they will see the login screen (I'm using django.contrib.auth for
   authentication and login forms). If they are on the main site, they will
   first be asked for their subdomain. After entering their subdomain, they will
   be redirected.

Here are the contents of my app's login function.  
The subdomain form and template are quite trivial to create.

I hope this helps someone. I hope to expand this post when I get further into
it.
