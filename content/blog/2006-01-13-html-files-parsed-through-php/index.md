---
author: Dustin Davis
comments: true
date: 2006-01-13T15:49:31.000Z

slug: html-files-parsed-through-php
title: HTML Files Parsed Through PHP
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Chris Lao](https://unsplash.com/@chrislao) on
  [Unsplash](https://unsplash.com)
categories:
  - PHP
  - Apache
description: How to pass .html files through the PHP parser with Apache
---

In the past I have used mod_rewrite to redirect .html file request to the
equivalent .php file names. For example:

```text
RewriteRule (.+)\.html? $1.php
```

The above code would redirect any page name page.htm or page.html to page.php.

But what if you had .html or .htm file that you actually wanted to run through
the php processor? Try this in your .htaccess file:

```text
AddType application/x-httpd-php .php .htm .html
```
