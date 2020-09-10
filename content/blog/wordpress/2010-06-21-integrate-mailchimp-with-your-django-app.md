---
author: Dustin Davis
comments: true
date: 2010-06-21 18:05:33+00:00
link: https://dustindavis.me/integrate-mailchimp-with-your-django-app/
slug: integrate-mailchimp-with-your-django-app
title: Integrate MailChimp with your Django App
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - django
  - mailchimp
---

**_ Updated. For some reason, [greatape](http://pypi.python.org/pypi/greatape/)
hasÂ disappeared. I've updated this post to use MailSnake _**

Here's a quick & easy method for integrating MailChimp into your next Django
application.

1. Sign up for [MailChimp](http://eepurl.com/yKuv) <-- this is an affiliate
   link. Sign up is free, but if you decide to upgrade to a paid account you
   will get a `$30` credit by using this link.

2. Install [MailSnake](https://github.com/themartorana/mailsnake)

   sudo pip install -e
   git://github.com/bradwhittington/mailsnake.git#egg=mailsnake

3. Create a MailChimp API key by going to
   [Account -> API Keys & Info](https://us1.admin.mailchimp.com/account/api/)

4. Use the MailChimp API for your emailing needs! Here is some example code to
   add a subscriber to your default list:

   from mailsnake import MailSnake

   ms = MailSnake('yourlongapikey-us1') lists = ms.lists() ms.listSubscribe( id
   = lists['data'][0]['id'], email_address = 'user@sample.com', merge_vars = {
   'FNAME': 'John', 'LNAME': 'Doe', }, update_existing = True, double_optin =
   False, )

Find more information and to see available API calls, check out the
[MailChimp API documentation](http://www.mailchimp.com/api/rtfm/).

Why use MailChimp? You certainly don't need to. You can roll your own email
system in Django. But I highly recommend checking them out to make use of their
awesome tools. They make it easy to set up templates, campaigns,
auto-responders, etc. Plus, you can track statistics on the emails you send.
