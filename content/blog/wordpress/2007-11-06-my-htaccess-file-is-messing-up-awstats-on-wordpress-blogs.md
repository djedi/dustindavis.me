---
author: Dustin Davis
comments: true
date: 2007-11-06 00:04:04+00:00
link: https://dustindavis.me/my-htaccess-file-is-messing-up-awstats-on-wordpress-blogs/
slug: my-htaccess-file-is-messing-up-awstats-on-wordpress-blogs
title: My .htaccess File is Messing Up awstats on Wordpress Blogs
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

I use DirectAdmin for my hosting control panel. There is a nice plugin to add
awstats, but I've found they don't work on sites where I have WordPress set up
(such as this site) because I'm using permalinks. No worries though. I found a
way to fix it. Just put the bolded line below in your .htaccess:

`# BEGIN WordPress

RewriteEngine On RewriteBase / **RewriteCond %{REQUEST_URI} !^/awstats.\*\$ [NC]
[L]** RewriteCond %{REQUEST_FILENAME} !-f RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.php [L]

# END WordPress`

\*Note: Replace "awstats" with the name of your stats location
