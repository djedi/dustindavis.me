---
author: Dustin Davis
comments: true
date: 2006-12-14 16:47:49+00:00
link: https://dustindavis.me/fun-with-hot-linking/
slug: fun-with-hot-linking
title: Fun With Hot Linking
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

There is a term out there known to webmasters as "hot linking", "inline
linking", "leeching", "direct linking", etc. where site will directly link to
images on your own sites. The problem with this is that the server in which the
image resides may be giving up lots of bandwidth without having any real
visitors.

I've seen various methods to deny access to images. Honestly, it has never
really bothered me so I've never done anything about it.

This morning though, I was checking my stats on one of my sites and noticed that
one of my images was showing up in a lot of eBay listings. eBay is a lot more
popular than your run of the mill blog. I was thinking that maybe I should block
this image.

Then I got an idea. Why not have more fun with this? As long as they are linking
to me, I can change the image! :)

My initial thought was I could just replace the image then update my blog entry
to point to wherever I moved the old image to. That sounded like too much work
and not enough fun.

So this was my plan. Why not sabotage those that are leeching my images? The fun
part still sounded fun, but I didn't want to update my blog, that was the boring
part. I decided to make it more dynamic. So here is what I did.

I wrote this PHP script that will determine whether the image was linked from my
site, or another based on the HTTP_REFERER. Based on who is linking will
determine which image I display.

`if (strpos($_SERVER['HTTP_REFERER'], "latterdayblog.com")) { $file = "wp-content/images/little_people_nativity.jpg"; } else { $file = "little_people_nativity.jpg"; } $fp = fopen($file, 'r'); $buffer = fread($fp, filesize($file)); fclose($fp); header('Content-Type: image/jpeg'); echo $buffer;`

Then I added this mod_rewrite line to my .htaccess file:
`RewriteRule wp-content/images/little_people_nativity.jpg lp.php`

So basically what this does is when the image is requested, instead of the web
server just dishing out the image, it goes to my lp.php script which checks the
referrer. If the referrer address is my own site, then it will display the image
expected, if not, it will display this other image I created.

What is the other image I created? I had lots of ideas. Basically they are
selling a Fisher Price Little People Nativity set. So what I did was set up a
plain boring eBay affiliate page that list all the latest auctions for this
product and wrote a message on the image to visit that page.

The results are thus, before:
[![before](http://www.nerdydork.com/wp-content/images/_before.gif)](http://www.nerdydork.com/wp-content/images/before.gif)

And after:
[![After!](http://www.nerdydork.com/wp-content/images/_after.gif)](http://www.nerdydork.com/wp-content/images/after.gif)

And my blog images still work fine! :D

[tags]hotlinking, hot linking, leeching, inline linking, image bandwidth, image
stealing, direct linking[/tags]
