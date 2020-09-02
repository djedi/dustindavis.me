---
author: Dustin Davis
comments: true
date: 2005-11-09 14:01:10+00:00
link: https://dustindavis.me/stay-clear-of-godaddy-hosting/
slug: stay-clear-of-godaddy-hosting
title: Stay Clear of Godaddy Hosting
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Products
  - Programming & Internet
---

I do freelance work. Recently I was asked to install some php scripts for
someone who had orderd GoDaddy Hosting. Ahhhh the frustrations were endless!
Let's forget the fact that they have their own crappy control panel and that it
takes forever to log in and get to the control panel. Let's forget the fact that
your username is assigned and it is a mile long. Here are my two biggest gripes
with my limited experience:

1. It takes about 10-15 minutes to see the affects of changing an .htaccess
   file. This is really frustrating. If you want to write some mod_rewrite stuff
   you'd better be good because you can't immediately test it. You must wait for
   their server to recognize the changes, then come back and test it. If you
   happened to mistype someting your whole site could go down with a 400 or 500
   error.

2. Even though they have PHP 4.3 installed, HTTP authentication with PHP doesn't
   work. http://us2.php.net/features.http-auth . I don't know if they've
   disabled it for security reasons or what but frustrating none the less.

I'm sure if given the opportunity to work with their servers longer I could
produce a greater list, but I hope not to have the opportunity.

Sure they offer lots of storage and lots of bandwidth, but do users really need
all that. I tried to explain to my client that I could give him better hosting
while not offering such high amounts of storage & transfer. As an example, I
used my site, [DVD Anthology](http://www.dvdanthology.com). That site has over
800 members, over 85,000 movies in the database, thousands of images, and yet
I've only used less than 75 mg of storage and my transfer has only one moth
exceeded 10 gb. I think my client was **very** optimistic to order a plan with
10,000 mb storage and 500 gb transfer. I think he'll be lucky to get 100 hits in
a month...

Anyway, I really don't think Godaddy is setting aside all these resources for
users like this. As an owner of VPS (Virtual Private Server) I know how easy it
is to oversell resources. They'll simply set all these accounts up on one server
and if anyone even gets close to using all this storage and transfer they can
move them to a new server.

And that's my 2 cents for the day.
