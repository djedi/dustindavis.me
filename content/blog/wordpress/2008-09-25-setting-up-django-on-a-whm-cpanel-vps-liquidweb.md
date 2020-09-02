---
author: Dustin Davis
comments: true
date: 2008-09-25 12:55:44+00:00
link: https://dustindavis.me/setting-up-django-on-a-whm-cpanel-vps-liquidweb/
slug: setting-up-django-on-a-whm-cpanel-vps-liquidweb
title: Setting up Django on a WHM/cPanel VPS (LiquidWeb)
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - cpanel
  - Django
  - python
  - whm
---

I ordered a new VPS from [LiquidWeb](http://www.liquidweb.com/?RID=redseam) for
the purpose of using it to host our company's new product that I'm currently
writing in Django. I have another VPS with LiquidWeb and I
[highly recommend them](/liquidweb-rocks.html)!

I got Django up and running on my other server with some help of LiquidWeb
support. This time I'm going to attempt to do it on my own and document the
process as I'm sure this won't be the last time I need to set this up.
Hopefully, it can help someone else out there looking to do the same.

Python 2.4.3 is installed by default. My original plan was to use Python 2.5.2,
but I had problems compiling database bindings with 2.5, so I finally gave up
and decided to stick with 2.4.

# Install PostgreSQL & Python Database Bindings

I'm quite familiar with MySQL, but knowing that Django creators have a fondness
for PostgreSQL, I thought I might attempt to use it for this project. (My
development so far has been using SQLIte, but I don't think that it will be
adequate for this project). I didn't have PostgreSQL installed, but installing
it was pretty straight forward. cPanal has an installer script (thanks LiquidWeb
support for the tip):

`# /scripts/installpostgres`

After installation, I set the password in WHM and now the database options
appeared in cPanel:

[![image](https://dustindavis.me/wp-content/uploads/2008/09/image-thumb2.png)](https://dustindavis.me/wp-content/uploads/2008/09/image2.png)

Just follow the wizard to create your database.

Next, I installed psycopg to bind python to PostgreSQL.

```bash
cd /usr/local/src
wget http://initd.org/pub/software/psycopg/psycopg2-2.0.8.tar.gz
tar xzvf psycopg2-2.0.8.tar.gz
cd psycopg2-2.0.8
python setup.py build
python setup.py install
```

# Build and Install WSGI

Basically, here are the commands I ran to download and complie wsgi:

`cd /usr/local/src/ wget [http://modwsgi.googlecode.com/files/mod_wsgi-2.3.tar.gz](http://modwsgi.googlecode.com/files/mod_wsgi-2.3.tar.gz) gzip -dc mod_wsgi-2.3.tar.gz | tar xf - cd mod_wsgi-2.3 ./configure make && make install`

After compiling the module, I was given the path to where it was located
(/usr/lib/httpd/modules/mod_wsgi.so).

I logged in to WHM -> Server Configuration -> Apache Setup -> Include Editor to
add the following line to load the module:
[![image](https://dustindavis.me/wp-content/uploads/2008/09/image-thumb3.png)](https://dustindavis.me/wp-content/uploads/2008/09/image3.png)

`LoadModule wsgi_module /usr/lib/httpd/modules/mod_wsgi.so `AddHandler
wsgi-script .wsgi

[![image](https://dustindavis.me/wp-content/uploads/2008/09/image-thumb4.png)](https://dustindavis.me/wp-content/uploads/2008/09/image4.png)

If it works for you... Lucky you. Unfortunately I got this error:

Configuration problem detected on line 220 of file
/usr/local/apache/conf/httpd.conf: : Syntax error on line 1 of
/usr/local/apache/conf/includes/pre_virtualhost_2.conf: API module structure
'wsgi_module' in file /usr/lib/httpd/modules/mod_wsgi.so is garbled - expected
signature 41503232 but saw 41503230 - perhaps this is not an Apache module DSO,
or was compiled for a different Apache version? ---
/usr/local/apache/conf/httpd.conf --- 214 215 216 217# SUEXEC is supported 218
219Include "/usr/local/apache/conf/includes/pre_virtualhost_global.conf" 220
===> Include "/usr/local/apache/conf/includes/pre_virtualhost_2.conf" <=== 221
222# DO NOT EDIT. AUTOMATICALLY GENERATED. IF YOU NEED TO MAKE A CHANGE PLEASE
USE THE INCLUDE FILES. 223NameVirtualHost \* 224 225# Default vhost for unbound
IPs 226 --- /usr/local/apache/conf/httpd.conf ---

My first thought was that I had two versions of Apache installed, but I noticed
my ./configure command said it found Apache 2.2.9. I asked LiquidWeb Support and
they said that it was likely because I needed FastCGI installed.

So in WHM again, I went to Software -> Apache Update and reinstalled Apache and
added fastcgi support.

That didn't help either.

So I posted to the modwsgi google group and
[got help from the modwsgi author himself](http://groups.google.com/group/modwsgi/browse_thread/thread/552489e6a15f8f3d/4d60b064956433f1),
Graham Dumpleton and was able to install the correct version by specifying the
apxs file located in /usr/local/apache/bin/. So back in
/usr/local/src/mod_wsgi-2.3, I ran the following commands to rebuild modwsgi:

```bash
make distclean
./configure --with-apxs=/usr/local/apache/bin/apxs
make && make install
```

The output was more concise this time. Then I when back into WHM -> Server
Configuration -> Apache Setup -> Include Editor and loaded the module and
restarted apache and it all worked this time! Thank you Graham!

I followed the
[Quick Configuration Guide](http://code.google.com/p/modwsgi/wiki/QuickConfigurationGuide)
to test WSGI to make sure it was working and learn a bit more about how it
works. I recommend that you do too. Everything worked by the way. Well come back
to modwsgi setup in a moment, but first we need to install Django.

# Install Django

[Download and installation](http://www.djangoproject.com/download/) of Django
1.0 was quite simple really - the easiest part of the gig.

```bash
cd /usr/local/src
wget http://www.djangoproject.com/download/1.0/tarball/
tar xzvf Django-1.0.tar.gz
cd Django-1.0
python setup.py install
```

# Run Baby, Run

Now, we attempt to put it all together!

This set up will need to be run per domain/account. First, lets create our wsgi
app that will call the Django application.

I already have my account set up on WHM where I will run my Django app. It is
fcabi.net and the username is fcabi, so where every you see this, be mindful to
replace it with your specifics.

Create a file in /home/fcabi/public_html with the following python code (I named
it django.wsgi):

```python
import os, sys
sys.path.append('/home/fcabi/public_html')
sys.path.append('/home/fcabi/public_html/fcabinet')
os.environ['DJANGO_SETTINGS_MODULE'] = 'fcabinet.settings'

import django.core.handlers.wsgi

application = django.core.handlers.wsgi.WSGIHandler()
```

Next I create a file to add my virtual host directives in.

```bash
mkdir -p /usr/local/apache/conf/userdata/std/2/fcabi/fcabi.net/
vi /usr/local/apache/conf/userdata/std/2/fcabi/fcabi.net/wsgi.conf
```

I enter the following:

```text

    <IfModule mod_alias.c>
    Alias /robots.txt /home/fcabi/public_html/fcabinet/media/robots.txt
    Alias /favicon.ico /home/fcabi/public_html/fcabinet/media/favicon.ico
    Alias /media /home/fcabi/public_html/fcabinet/media
    Alias /adminmedia /home/fcabi/public_html/fcabinet/media/adminmedia
    </IfModule>

    <IfModule mod_wsgi.c>
    WSGIScriptAlias / /home/fcabi/public_html/django.wsgi
    WSGIDaemonProcess fcabi.net threads=15 display-name=%{GROUP}
    WSGIProcessGroup fcabi.net
    WSGIApplicationGroup %{GLOBAL}
    </IfModule>

```

Next I run the cPanel script to add the include file to the main httpd.conf file
and make sure the changes stick, then I restart apache.

`# /usr/local/cpanel/bin/build_apache_conf`

After running this command, I should see the Include to the file I just created:

```text
<VirtualHost 67.227.189.54:80>
ServerName fcabi.net
ServerAlias www.fcabi.net
DocumentRoot /home/fcabi/public_html
ServerAdmin webmaster@fcabi.net
UseCanonicalName Off
CustomLog /usr/local/apache/domlogs/fcabi.net combined
CustomLog /usr/local/apache/domlogs/fcabi.net-bytes_log "%{%s}t %I .\n%{%s}t %O ."
## User fcabi # Needed for Cpanel::ApacheConf
<IfModule !mod_disable_suexec.c>
SuexecUserGroup fcabi fcabi
</IfModule>

Include “/usr/local/apache/conf/userdata/std/2/fcabi/fcabi.net/*.conf”

</VirtualHost>
```

It's there, so I restart apache.

`# /usr/sbin/apachectl restart`

Notice that I added an alias to adminmedia. To get this to work, I also had to
add a symbolic link to to the contrib/admin/media files:

`# ln -s /usr/local/lib/python2.4/site-packages/django/contrib/admin/media/ /home/fcabi/public_html/fcabinet/media/adminmedia`

# Bonus: Wildcard Subdomains

My application makes use of wildcard sub-domains, so I also needed this to work
as well. This was fairly easy to implement.

Log in to cPanel and click on Subdomains:
[![image](https://dustindavis.me/wp-content/uploads/2008/09/image-thumb5.png)](https://dustindavis.me/wp-content/uploads/2008/09/image5.png)

For the subdomain, enter "\*" and click create (Document Root may autopopulate
with "/public_html", this is normal).

Now, set up virtual host directives for this subdomain like you did with your
original domain.

```bash
mkdir -p /usr/local/apache/conf/userdata/std/2/fcabi/wildcard_safe.fcabi.net/
vi /usr/local/apache/conf/userdata/std/2/fcabi/wildcard_safe.fcabi.net/wsgi.conf
```

Enter the following:

```text
<IfModule mod_alias.c> Alias /robots.txt /home/fcabi/public_html/fcabinet/media/robots.txt Alias /favicon.ico /home/fcabi/public_html/fcabinet/media/favicon.ico Alias /media /home/fcabi/public_html/fcabinet/media </IfModule>`

<IfModule mod_wsgi.c> WSGIScriptAlias / /home/fcabi/public_html/django.wsgi WSGIDaemonProcess django-sub threads=15 display-name=%{GROUP} WSGIProcessGroup django-sub WSGIApplicationGroup %{GLOBAL} </IfModule>
```

- Notice the the WSGIDaemonProcess name is must be different.

Rebuild the config file and restart apache.

```bash
/usr/local/cpanel/bin/build_apache_conf
/usr/sbin/apachectl restart
```

PS. If you're using sub-domains, you might find my
[sub-domain middleware](http://www.djangosnippets.org/snippets/1119/) useful.
