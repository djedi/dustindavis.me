---
author: Dustin Davis
comments: true
date: 2013-01-17T22:23:05.000Z

slug: digitalocean-heroku-linode-webfaction-hosting-showdown
title: 'DigitalOcean, Heroku, Linode & Webfaction: Hosting Showdown'
banner: ./images/hosting.png

categories:
  - Hosting
tags:
  - celery
  - digitalocean
  - django
  - heroku
  - linode
  - memcached
  - rabbitmq
  - webfaction
description:
  I tried out four different web hosts to determine where I want to host my next
  site.
---

Note: Since writing this I have become more comfortable with managing my own
servers. The pricing point of DigitalOcean moved me in that direction to be
honest. Since writing this, DO has created a referral program that allows you to
get a
$10 credit when you sign up and I in turn get a referral credit. Use [this link](https://www.digitalocean.com/?refcode=f1688368903d) to sign up at DigitalOcean and get a $10
credit.

Where do you fit on this scale?

Sysadmin -> DBA -> Backend Programmer -> Frontend Programmer -> Designer

I have a range in the middle, but lack on each end of the spectrum. So when it
comes to setting up a hosting server, I'd rather turn it over to someone more
experienced in the sysadmin realm. But, when bootstrapping a startup, you find
yourself becoming a jack of all trades (and master of none).

I've been in the process of re-writing [Inzolo](http://inzolo.com) and
re-launching as [Envelope Budget](https://envelopebudget.com). It recently came
time to launch (ready or not). I spent way more time than I intended setting up
a hosting account. I have been hosting Inzolo on
[Webfaction](http://www.webfaction.com/?affiliate=redseam) since its inception.
Overall I've been quite pleased. I don't really have any performance or downtime
issues that I can remember, Webfaction has a nice interface to set up everything
I need. I've actually been pleasantly surprised in how it has met my needs.

I've been hearing a lot of buzz about [Heroku](http://www.heroku.com/) though.
And so, I thought I'd try deploying there before I went live. First of all, let
me explain my stack. EnvelopeBudget.com is written in
[Django](https://www.djangoproject.com/) and I'm using PostgreSQL as my
database. I'm making use of
[johnny-cache](http://packages.python.org/johnny-cache/) and using Memcached to
speed up the site a bit. I wrote a utility to import Inzolo accounts into
Envelope Budget and found that I finally had a real _need_ for asynchronous
processing, so I implemented [Celery](http://celeryproject.org/) and
[RabbitMQ](http://www.rabbitmq.com/) to process the import and return status
updates to the browser.

I was impressed after doing the
[Getting Started with Django tutorial](https://devcenter.heroku.com/articles/django)
on Heroku. What kind of magic is this? So I attempted to get my EnvelopeBudget
stack up and running next. I modified my
[django project structure](http://www.deploydjango.com/django_project_structure/index.html)
to be more Heroku friendly. I probably spend a good 8 hours leaning how Heroku
makes deployment so simple though it never really seemed simple. I got it up and
running but in the end I decided it wasn't for me (at least for this project)
mainly due to the price. Minimally it would cost me
$55 per month because I needed two dynos (one web and one worker), and the [SSL add-on](https://addons.heroku.com/ssl). Seriously, why do they charge $20
per month to use SSL? SSL set up is free on the other 3 hosting plans I'm
reviewing here. That was probably the biggest deal-breaker. Also, this price was
for using the dev
[PostgreSQL add-on](https://addons.heroku.com/heroku-postgresql) which wouldn't
last long. Soon I'd need to upgrade to the Basic ($9/mo) or Crane ($50/mo)
package. So, now my hosting was looking more like `$105` per month. On top of
that, you deploy by pushing to git ('git push Heroku master'). This is cool, but
it seemed to take forever each time. It was annoying since I had to keep
committing and pushing to troubleshoot problems. Deploying with fabric is much
faster for me on the other three servers. Time to move on.

So at this point I've decided I'll just go back to Webfaction. As I'm riding the
train home from work and reading through my twitter feed I come across a link to
a
[Complete Single Server Django Stack Tutorial](http://www.stumbleupon.com/su/2E3lEq/www.apreche.net/complete-single-server-django-stack-tutorial/).
I read through it and it suddenly didn't seem so scary setting my up own server.
I've don't pretty much all of this before on my own development environment. So,
I go to the best place I know to spin up a new server fast -
[Linode](http://www.linode.com/?r=0e672eb6d53973f0ac51b6d8e95a067f55a676bb). It
probably took me about 2 hours to get everything up and running. I took copious
notes along the way though. After getting it to work on the 512 plan
($20 per month), I destroyed that Linode and set it up again on a 1 GB plan ($40/month).
It took about 40 minutes the second time (setting it up twice was faster than
figuring out Heroku). I was surprised at how much faster the performance was on
Linode. Webfaction & Heroku felt about the same, but Linode felt significantly
faster.

After getting it all set up I got a
[tweet from a friend](https://twitter.com/cliftonite/status/291612158268153856)
recommending I try out
[DigitalOcean](https://www.digitalocean.com/?refcode=f1688368903d) while I'm at
it. After looking at the prices and specs, I could get a 1 GB server for half
the price and it had an SSD to make it faster - but only one core instead of 4.
I took the time to set it up. The process was pretty much the same as with
Linode. It only took about 30 minutes this time. Overall the site felt slower
than Linode though. I'm guessing it was due to having only one core and because
I'm located in Utah, my Linode was in Texas and DigitalOcean is New York. Still,
installing packages seemed to take a lot longer so I'm thinking it was their
data center's internet speed that was the source of slower speeds. Sorry, I
don't have any benchmarks so I can't really give real numbers. One thing that
really impressed me though was the reboot time of the server. It seemed about 5
times faster than my Linode likely due to the SSD.

So, now it was time to make a choice. I had a launch counter ticking down on my
homepage and I had to decide NOW. I had already spent 3 days making a decision.
I finally decided to go with Webfaction's 1 GB plan which is
$40 per month (or $30 per month if paid yearly). I like the idea of having a
managed plan. The biggest downside for me is that I don't have root or `sudo`
access. They don't use `virtualenv` for their application setup and setting up
projects is a bit kludgy felling because of it. Also, setting up Celery &
RabbitMQ doesn't feel as painless, but I managed it thanks to
[Mark Liu's tutorial](http://www.markliu.me/2011/sep/29/django-celery-on-webfaction-using-rabbitmq/).
I know there is a way to use `virtualenv` and `gunicorn` on Webfaction, but I
doubt I'll take the time to set my project up that way.

There was a snag though. I had originally set up my account on their most basic
account with only has 256 MB of RAM. My site was already killed for running 2x
that amount. I needed to upgrade ASAP but I need someone there to set up the new
account and migrate my existing account. So I actually ended up launching on
Linode. The site is up now and hosting performance is great, but I will likely
move back to Webfaction because I soon started to realize there is always
something else to set up. I have a git repo, a [Trac](http://trac.edgewall.org/)
system, email, & FTP already set up on Webfaction. I would likely want to put
aWordPresss blog at /blog. All of this is so easy with Webfaction and its more I
have to research to do all of this on Linode.

## TL;DR

So here is my tl;dr version in alphabetical order:

[DigitalOcean](https://www.digitalocean.com/?refcode=f1688368903d): I love their
pricing. For as little as `$5` per month I can spin up a Linux server. This
would be great for a [ZNC IRC bouncer](/blog/setting-up-a-znc-irc-bouncer) for
example. They seem fairly new still so time will tell how they compete with
Linode. Their internet connection seemed a bit slow, but for root access to a
server, it can be overlooked.

[Heroku](http://www.heroku.com/): If I were a hipster I'd bite the bullet and
host here to get in with the cool crowd. Overall it was just too expensive for a
bootstrapped startup project. The biggest benefit I see with Heroku is the
ability to scale fast, both forwards and backward when you need to. Scaling is a
good problem to have. If I get to that point, money won't be an issue and I will
revisit Heroku. I would probably also use it if I built a very small site where
the specs fit within their free model or if I was in the middle of a hack-a-thon
and needed to get online fast.

[Linode](http://www.linode.com/?r=0e672eb6d53973f0ac51b6d8e95a067f55a676bb):
This seems to be the standard for spinning up your own dedicated server with
root access. If I root access, performance and a history of good support, I'll
go here.

[Webfaction](http://www.webfaction.com/?affiliate=redseam): I've been around the
block and learned that the grass is not really greener on the other side.
Although I don't have root access and it's hosted on CentOS rather than
Debian/Ubuntu which I'm more familiar with, it has so many features for making
it easy to set up email, multiple domains, SSL, different types of apps
(Django + PHP + Ruby on Rails anyone?), Trac, Git, etc. The price is
competitive, the support is good, the uptime and performance is good - I haven't
found sufficient reason to leave.

## UPDATE

After doing a number of installs at work I got more comfortable with deploying
on `gunicorn` & Nginx, so I ended up switching to
[DigitalOcean](https://www.digitalocean.com/?refcode=f1688368903d). This is
where EnvelopeBudget.com is currently hosted and a have a couple other droplets
hosting [YouTrack](http://www.jetbrains.com/youtrack/) &
[Sentry](http://dustindavis.me/setting-up-your-own-sentry-server.html). The main
reason I left Webfaction was that I needed to update my SSL certificate ASAP and
there is a slight lag time with Webfaction because you have to submit a ticket
to complete your SSL setup.

### Reasons for leaving Webfaction:

- Total control of SSL setup
- Performance - I wanted SD drives
- Price - more computing power for the price
- Virtualenv - Upgrading is a lot easier when using virtualenv

#### Things to consider before leaving Webfaction

- Webfaction comes with email. I'm now using [Zoho](http://www.zoho.com/) for
  free email.
- Easier to configure - It took a while to figure out how to run Wordpress on
  /blog with nginx. Also, I had to learn the whole process of configuring an SSL
  certificate.
- I didn't bother migrating Trac. Webfaction had a nice one click installer.
  I've moved to [YouTrack](http://www.jetbrains.com/youtrack/) instead.
- There are a number of other one-click install solutions available on
  Webfaction. Be sure you know what you are leaving.
