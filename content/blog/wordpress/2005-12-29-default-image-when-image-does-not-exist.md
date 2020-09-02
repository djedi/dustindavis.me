---
author: Dustin Davis
comments: true
date: 2005-12-29 21:45:23+00:00
link: https://dustindavis.me/default-image-when-image-does-not-exist/
slug: default-image-when-image-does-not-exist
title: Default Image When Image Does Not Exist
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

Here's a problem I came to recently. I developing a site in PHP & using Smarty
Templating. I wanted to display thumbnail images for property listings. If the
listing didn't have a thumbnail, I wanted to display a generic image of a house
and message that the image was not available.

Among other ideas, the following options came to mind:

1. With PHP, check to see if the thumbnail existed before displaying it, if it
   did not, display the generic image.

2. Write a Smarty function to check if file exists.

3. Create a new field in the database to store the thumbnail name.

4. Use PHP code in the smarty template.

For reasons I won't go into, none of these were GOOD solutions. I wanted to
specify a name like "6_thumb.png" and if it didn't exist, display "\_thumb.png"

The only way I could think of do this with was to somehow make use of Apache. So
this was the simple but effective solution I came up with, with the help of
[a friend](http://brandonpearce.com).

I created an .htaccess file with the following line of code:
`ErrorDocument 404 /404.php`

I then created a file named 404.php with this code snippet:
`if (preg_match("/[0-9]*_thumb\.png/", $_SERVER[REQUEST_URI])) { header("Location: /house_images/_thumb.png"); exit; }`

It worked like a charm!
