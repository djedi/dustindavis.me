---
author: Dustin Davis
comments: true
date: 2009-05-15 16:22:55+00:00
link: https://dustindavis.me/one-click-django-project-publishing/
slug: one-click-django-project-publishing
title: One Click Django Project Publishing
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - django
  - plink
  - putty
  - ssh
  - subversion
  - webfaction
  - windows
---

I was reading
[The Joel Test](http://www.joelonsoftware.com/articles/fog0000000043.html) and I
got to number #2 which says "Can you make a build in one step?" My initial
thought was that there aren't really builds per se in web applications (unless
you use ASP.NET). But then I thought, I wonder if I could make publishing my
Django application a one step process. So that's what I set out to do.

Here are the manual steps I go through to publish my Django App:

1. Commit my code changes to [Subversion](http://subversion.tigris.org/) (I use
   [TortoiseSVN](http://tortoisesvn.tigris.org/) â€“ Yes, I'm running
   [Windows](https://dustindavis.me/my-applications.html))

2. Log in to my [Webfaction](https://dustindavis.me/webfaction-review.html)
   account via SSH using
   [PuTTy](http://www.chiark.greenend.org.uk/~sgtatham/putty/).

3. Run a subversion update on media folder

4. Back up my settings.py file for good measure

5. Run a subversion update on my Django application folder

6. If there were model additions, run manage.py syncdb

7. Restart apache for good measure

Ok, so maybe the title of this post is a bit misleading because I did not
automate step one. Let me explain why though. When I commit code, I sometimes
leave debug code in where I don't want to. I live to verify that I'm not
committing changes that shouldn't be there so I often look at diff files in
TortoiseSVN before I commit. That's just one step that I prefer to keep my eyes
on. I suppose you could say that it's not really part of the publishing process
and we assume that publishing comes after committing code changes then yeah,
it's still one step.

My solution is actually a combination of two scripts. I found this app called
[Plink](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html) that is
basically PuTTy for your command line. Inside my Django project folder I've
created a batch script called publish.bat which contains the following:

`@echo off plink -ssh _MYDOMAIN_.com -l _MYLOGIN_ -pw _MYPASSWORD_ ./update.sh pause`

This essentially logs in to my server via SSH and runs a shell script. Here are
the contents of that shell script:

`cd webapps/media svn update cd ../_myapp_/_myapp_ cp settings.py settings.backup.py svn update python2.5 manage.py syncdb ../apache2/bin/restart`

That's basically it. Now I just commit my code and when I want to publish I just
double-click on publish.bat and I'm done.
