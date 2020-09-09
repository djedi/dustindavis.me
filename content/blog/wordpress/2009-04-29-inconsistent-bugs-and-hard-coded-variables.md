---
author: Dustin Davis
comments: true
date: 2009-04-29 21:31:24+00:00
link: https://dustindavis.me/inconsistent-bugs-and-hard-coded-variables/
slug: inconsistent-bugs-and-hard-coded-variables
title: Inconsistent Bugs and Hard Coded Variables
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

[![image](https://nerdydork.com/wp-content/uploads/2009/04/image-thumb2.png)](https://nerdydork.com/wp-content/uploads/2009/04/image2.png)Part
of the joys of being a one man development team (sarcastically speaking) is that
I get to be designer, developer, and QA. Recently I had the joy of having
working on a bug report that security rules were not working right. When I would
test it it worked sometimes. I did find it to be broken, but not as described
and I could never quite replicate the brokenness. The bug reports where saying
"allow rules" were not working but "deny rules" were working fine. When I would
test it "allow rules" worked fine, but "deny rules" were broken. Finally after
going through the code I noticed the culprit. Often as I'm developing I'll write
queries inside of SQLyog or MySQL-Front where I can test them. Then I copy/paste
them into the code and replace variable where needed. It looks as though in this
case I forgot to replace some variables. Oops! So, if you get these kind of bugs
where sometimes things work and sometimes they don't, do a quick scan for some
hard coded variables!
