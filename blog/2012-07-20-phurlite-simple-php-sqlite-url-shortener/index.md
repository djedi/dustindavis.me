---
author: Dustin Davis
comments: true
date: 2012-07-20T22:29:31.000Z
slug: phurlite-simple-php-sqlite-url-shortener
title: 'Phurlite: Simple PHP SQLite URL Shortener'
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Morning Brew](https://unsplash.com/@morningbrew) on
  [Unsplash](https://unsplash.com)
categories:
  - PHP
description:
  A simple URL shortener contained in one PHP file and .htaccess file for Apache
  with support for Tweetbot
---

After reading
[Phil Windley's post yesterday about his short & simple URL shortener](http://www.windley.com/archives/2012/07/my_own_url_shortener.shtml),
I thought it would be fun to write my own. You can see from my comments on his
post that I prefer a URL shortener to use a server-side redirect approach. I had
a few features and goals in mind:

1. It had to be simple. I wanted a self-contained script and I didn't want to
   spend a lot of time on it.
2. I wanted it to work on any cheap hosting provider with no extra setup
   required.
3. Back-up abilities - in case I ever wanted to switch services.
4. Shorter short link. I wanted 3 or 4 characters for the short link. I doubt
   I'll ever have enough links to need 6 characters. The shorter the better.
5. I wanted it to integrate with my favorite twitter client - currently
   [Tweetbot](http://tapbots.com/software/tweetbot/).

Although Python has become my language of choice lately, I decided to write this
in PHP because I think nothing scales down better than PHP and pretty much every
cheap hosting provider supports PHP. It also allows me to write this in one
self-contained script. It does require you to use mod_rewrite in a `.htacess`
file, but it is just two lines and also supported by most hosting providers. It
only took me about an hour to write and test this script.

All the data is stored in a SQLite file, so it makes backups very easy - you
just back up one file. I LOVE SQLite!

I used a very simple algorithm to generate the short link codes using the
[str_shuffle](http://us2.php.net/str_shuffle) function.

I found that Tweetbot allows you to use your custom URL shortener. You just
specify a URL for an API endpoint and your script has four options for returning
the shortened URL. I went with the first option which was the simplest.

{% responsiveImage "./images/tweetbot.png", "Tweetbot custom URL shortener", "", 720, "" %}

Obviously, it's not perfect. I didn't really account for security so I will
likely add security features before I use it in production.

If you want to see or download the source you can get it
[here on Github](https://github.com/djedi/phurlite).
