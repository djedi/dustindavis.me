---
author: Dustin Davis
comments: true
date: 2011-03-28 21:13:38+00:00
link: https://dustindavis.me/the-problem-with-buying-templates/
slug: the-problem-with-buying-templates
title: The Problem with Buying Templates
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - meta
  - nofollow
  - noindex
  - robots
  - templates
---

A while back I bought a template from
[themeforest.net](http://themeforest.net/). After modifying it and implementing
it on my site, my search engine rankings started to drop. I didn't think much of
it as first, but then I noticed that even searching from my domain name didn't
show my main page, instead, it would link to somewhere in my blog.

I checked to see if I had a robots file something blocking it but now. Then I
finally found it - a meta tag in the header:
`<meta name='robots' content='noindex,nofollow' />`

Moral of the story... check your meta tags CAREFULLY if you are going to use a
template you don't write from scratch!
