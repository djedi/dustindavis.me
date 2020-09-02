---
author: Dustin Davis
comments: true
date: 2006-01-13 15:49:31+00:00
link: https://dustindavis.me/html-files-parsed-through-php/
slug: html-files-parsed-through-php
title: HTML Files Parsed Through PHP
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

In the past I have used mod_rewrite to redirect .html file request to the
equivalent .php file names. For example:

`RewriteRule (.+)\.html? $1.php`

The above code would redirect any page name page.htm or page.html to page.php.

But what if you had .html or .htm file that you actually wanted to run through
the php processor? Try this in your .htaccess file:

`AddType application/x-httpd-php .php .htm .html`
