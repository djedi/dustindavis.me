---
author: Dustin Davis
comments: true
date: 2008-06-06 16:14:26+00:00
link: https://dustindavis.me/null-is-null-or-not-an-object/
slug: null-is-null-or-not-an-object
title: "'null' is null or not an object"
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - IE
  - javascript
  - 'null'
---

After writing my [fuel trip calculator](trip-fuel-cost-calculator.html), I
learned there was a bug in IE. I got it to work but I get getting 'meters' is
null or not an object or even worse, 'null' is null or not an object. I tried
everything I could think of in the javascript code to get rid of that message in
IE.

I realized that the function was being called twice for some reason, and that is
where I finally found the culprit. The error wasn't in the javascript, it was in
the html.

When I first wrote the tool, I just called the javascript function using a
button and onclick method. Then I changed it to a form so you could just hit
enter in any field. But, I forgot to take out the onclick method from the submit
button. So therein lied the problem. Once I removed that the error went away.
