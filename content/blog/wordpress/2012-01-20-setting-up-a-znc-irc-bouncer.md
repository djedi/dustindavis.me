---
author: Dustin Davis
comments: true
date: 2012-01-20 17:22:37+00:00
link: https://dustindavis.me/setting-up-a-znc-irc-bouncer/
slug: setting-up-a-znc-irc-bouncer
title: Setting Up a ZNC IRC Bouncer
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Technology
tags:
  - irc
  - irssi
  - linode
  - tmux
  - ubuntu
  - znc
---

First of all, I\'ll skip the discussion on what [ZNC]("http://wiki.znc.in/ZNC")
and [IRC]("http://en.wikipedia.org/wiki/Internet_Relay_Chat") are, as you likely
know if you are reading this post. I use IRC with my development team at work.
It\'s helpful to stay logged in 24/7 to keep up on pertinent discussions. I
could stay logged in 24/7 with any IRC client at work, but some days (and
perhaps some evenings) I may be working and chatting from home. To solve this
problem I was using [tmux]("http://tmux.sourceforge.net/") and
[irssi]("http://irssi.org/") running on my work computer. If I ever needed to
log in from home, I would just ssh into my work computer and connect to tmux.

Since switching jobs, I got a laptop. Obviously it is not connect 24/7. So I
switched to using my home computer. In this process of changing, I decided to
try out ZNC. The main benefit to ZNC over irssi to me is that I can use other
IRC clients that have more features. So I\'m going to explain how I set up ZNC
and Limechat (OS X).

I was running ZNC on my home computer - currently a Mac Pro. But I find either
my 1 yr old or 4 yr old keeps getting into my office and turning off my
computer. So, just to try it out, I set up a Linode running Ubuntu. Here are the
step by step instructions that took me all of 10 minutes to get set up.

If you don\'t have a
[Linode]("http://www.linode.com/?r=0e672eb6d53973f0ac51b6d8e95a067f55a676bb")
account, create one. Please feel free to use my
[affiliate link]("http://www.linode.com/?r=0e672eb6d53973f0ac51b6d8e95a067f55a676bb").
(**Note**: I now use
[DigitalOcean]("https://www.digitalocean.com/?refcode=f1688368903d") as you can
get a droplet for only \$5 per month. I have it running on my
[Sentry]("http://dustindavis.me/setting-up-your-own-sentry-server.html") server,
so 2 for the price of one!)

1. Add a Linode. I selected the cheapest one, which is a Linode 512 for
   $19.95 per month. (I understand that paying $20 is likely a waste of money
   just for an IRC bouncer, but I\'ll talk about this later...)

2. Create an instance of Ubuntu on your Linode. I used Ubuntu 11.10. Make note
   of your new IP address for your server. You may want to create an entry in
   your hosts file so you can reference it by name instead of remembering the IP
   address.

3. Boot your Linode

4. ssh into your Linode

5. Create a new user:


    * adduser <username>

6. Create an admin group


    * addgroup admin

7. Add yourself to the admin group (so you can use sudo)


    * adduser <username> admin

8. Log in to your user account


    * su <username>

9. Install ZNC


    * sudo apt-get install znc

10. Make a ZNC config file


    * znc --makeconf


    * Here are the options I selected:


      * listen on port 6667


      * SSL? no


      * ipv6? no


      * Listen host - left blank for all


      * No global modules


      * Username and password - I used the same as my IRC nick & password so it is easy to remember


      * Blind host - left blank


      * Number of lines to buffer per channel - 5000 (why not?)


      * Keep buffers after replay? no


      * Default channel modes - went with default [+stn]


      * yes on on modules


      * IRC server: irc.freenode.net, port 6667, no password


      * I added one IRC channel (#utahdjango), I\'ll join the others later


      * I added my IRC user and password.


      * Then I started IRC at the end of the script. (If you don\'t, just type \'znc\' to start the znc server)

11. Connect to your new server. I used Limechat with the following settings:


    * Network name: Linode ZNC


    * Server: Name I mapped to my linode IP address in my hosts file. You could just enter your IP address.


    * Port: 6667


    * Server Password: passoword I entered on my IRC makeconf script


    * Nickname: irc nick


    * Login name: irc nick (remember I used the same nick & password for znc that I use for freenode)


    * Real Name: Dustin Davis ;)


    * Nickserv Passoword: same as above

That was it! I was connected and up and running just like that. Now, I\'m by far
NOT an expert on this stuff, but if you have any questions on what I did, leave
a comment below.

As I mentioned, paying \$20 per month for an IRC bouncer doesn\'t seem like a
great idea. So here are some things to consider...

- Use your home computer. If you keep your computer on 24/7 and basically have a
  static IP this shouldn\'t be a problem. If you have a router, you will have to
  set up port forwarding as well.
- If you don\'t want to leave your main computer or, or use you main computer in
  this manner, consider buying another computer. I have a friend that uses a
  plug computer for this purpose. This is actually very tempting for me. Paying
  for a linode for 5 months is about the same as buying a
  [\$99 plug computer]("http://www.globalscaletechnologies.com/p-22-sheevaplug-dev-kit-us.aspx").
  You would then have a small server running 24/7 on minimal power and it could
  also be used for a media server by plugging in an external hard drive among
  other uses. Another options is [Tonido Plug]("http://www.tonidoplug.com/"),
  but these always seem to sell out so fast.
- User your work computer. This may not be easy. At my old job I was given a
  static IP and subdomain to connect to my computer.
- If you are paying for hosting elsewhere, consider moving your hosting to your
  new Linode server. This would save you money from hosting elsewhere, but you
  should be comfortable managing your own hosting server.

## Update

I purchased a
[GuruPlug]("http://www.globalscaletechnologies.com/t-guruplugdetails.aspx") and
got it set up. I\'m now running ZNC from it. The set up was pretty much the
same, so I won\'t bother documenting it. No more monthly fees and its only
consuming 2 watts of power from home!

## Update 2

My GuruPlug got fried in a lightening storm :( . I replaced it with a Mac Mini.
Setting up ZNC on a mac is essentially the same except that I install ZNC with
[Homebrew]("http://mxcl.github.com/homebrew/"). Just replace step 9.1 with
\"brew install znc\"

Also after owning a mac mini for about a month, I swapped out the hard drive
with an SSD so I had to reinstall. For some reason I couldn\'t get it to work. I
kept getting the error: \"Cannot connect to IRC (No route to host).
Retrying...\". I
[found a tip]("http://wiki.amahi.org/index.php/ZNC#Can.27t_connect_to_server_.28No_route_to_host.29")
that suggesting using the IP address instead of the server name and that
resolved the issue.

## Update 3

I now use [DigitalOcean]("https://www.digitalocean.com/?refcode=f1688368903d")
as you can get a droplet for only \$5 per month. I have it running on my
[Sentry]("http://dustindavis.me/setting-up-your-own-sentry-server.html") server,
so 2 for the price of one!
