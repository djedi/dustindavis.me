---
author: Dustin Davis
comments: true
date: 2013-02-26 16:19:33+00:00
link: https://dustindavis.me/setting-up-your-own-sentry-server/
slug: setting-up-your-own-sentry-server
title: Setting Up Your Own Sentry Server
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - digitalocean
  - django
  - sentry
  - znc
---

[![sentry](http://www.nerdydork.com/wp-content/uploads/2013/02/sentry.png)](http://www.nerdydork.com/wp-content/uploads/2013/02/sentry.png)If
you are hosting a Django site, Sentry will make your life easier.

After my
[review of various hosting companies](http://www.nerdydork.com/digitalocean-heroku-linode-webfaction-hosting-showdown.html)
I decided to put [EnvelopeBudget.com](https://envelopebudget.com) on
[Webfaction](http://www.webfaction.com/?affiliate=redseam). But, I was still
impressed with
[Digital Ocean](https://www.digitalocean.com/?refcode=f1688368903d) so I kept my
virtual server. Why not? It's only \$5 per month for full root access! Because
all their servers have SSD's I'ver never seen a virtual server boot so fast.
Soon will be the day when you will hear someone say, "remember when computers
had moving parts?" I kept it because I figured I'd find a use for it eventually.
Well, I found a use for it.

I love [Sentry](https://github.com/getsentry/sentry). We used it at
[SendOutCards](https://www.sendoutcards.com/) to help us better manage our
server errors. I think we were running a pre 1.0 release when it was just called
[django-sentry](https://github.com/dcramer/django-sentry). It has come a long
way. I set up an account on [GetSentry.com](https://getsentry.com) and loved it.
Since I'm bootstrapping a start-up, I decided to set up my own sentry server on
my Digital Ocean account.

I documented the process I went through setting up the server.

Create Ubuntu 12.10 X32 Server droplet & ssh into it as root

```bash

# add non-root user

adduser sentry

# add to sudoers

adduser sentry sudo

# log out of root and log in as sentry

exit

# update the local package index

sudo apt-get update

# actually upgrade all packages that can be upgraded

sudo apt-get dist-upgrade

# remove any packages that are no longer needed

sudo apt-get autoremove

# reboot the machine, which is only necessary for some updates

sudo reboot

# install python-dev

sudo apt-get install build-essential python-dev

# download distribute

curl -O http://python-distribute.org/distribute_setup.py

# install distribute

sudo python distribute_setup.py

# remove installation files

rm distribute\*

# use distribute to install pip

sudo easy_install pip

# install virtualenv and virtualenvwrapper

sudo pip install virtualenv virtualenvwrapper

# to enable virtualenvwrapper add this line to the end of the .bashrc file

echo "" &gt;&gt; .bashrc echo "source /usr/local/bin/virtualenvwrapper.sh"
&gt;&gt; .bashrc

# exit and log back in to restart your shell

exit

# make virtualenv

mkvirtualenv sentry_env

# install sentry

pip install sentry

# create settings file (file will be located in ~/.sentry/sentry.conf.py)

sentry init

# install postgres

sudo apt-get install postgresql postgresql-contrib libpq-dev

# install postgres adminpack

sudo -u postgres psql CREATE EXTENSION "adminpack"; q

# change postgres password &amp; create database

sudo passwd postgres sudo su - postgres psql -d template1 -c "ALTER USER
postgres WITH PASSWORD '<span class="highlight">changeme</span>';" createdb
<span class="highlight">your_sentry_db_name</span> createuser
<span class="highlight">your_sentry_user</span> --pwprompt psql -d template1 -U
postgres GRANT ALL PRIVILEGES ON DATABASE
<span class="highlight">your_sentry_db_name</span> to
<span class="highlight">your_sentry_user</span>; q exit

# update config file to use postgres &amp; host (with vim or your editor of choice)

sudo apt-get install vim vim .sentry/sentry.conf.py</pre>

<p>The following are the contents of my sentry.conf.py file</p>

<pre>DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': '<span class="highlight">your_sentry_db_name</span>',
        'USER': '<span class="highlight">your_sentry_user</span>',
        'PASSWORD': '<span class="highlight">your_password</span>',
        'HOST': 'localhost',
    }
}
```

You will also want to configure your SMTP mail account. I just used my gmail
account.

```bash
# going to need psycopg2
workon sentry_env
pip install psycopg2

# set up databse
sentry upgrade

# let's try it out!
sentry start

# install nginx
sudo apt-get install nginx

# remove the default symbolic link
sudo rm /etc/nginx/sites-enabled/default

# create a new blank config, and make a symlink to it
sudo touch /etc/nginx/sites-available/sentry
cd /etc/nginx/sites-enabled
sudo ln -s ../sites-available/sentry

# edit the nginx configuration file
sudo vim /etc/nginx/sites-available/sentry
```

Here are the contents of my nginx file:

```text
server {
    # listen on port 80
    listen 80;

    # for requests to these domains
    server_name <span class="highlight">yourdomain.com www.yourdomain.com</span>;

    # keep logs in these files
    access_log /var/log/nginx/sentry.access.log;
    error_log /var/log/nginx/sentry.error.log;

    # You need this to allow users to upload large files
    # See http://wiki.nginx.org/HttpCoreModule#client_max_body_size
    # I'm not sure where it goes, so I put it in twice. It works.
    client_max_body_size 0;

    location / {
        proxy_pass http://localhost:9000;
        proxy_redirect off;

        proxy_read_timeout 5m;

        # make sure these HTTP headers are set properly
        proxy_set_header Host            $host;
        proxy_set_header X-Real-IP       $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

That's about it.

```bash
# restart nginx
sudo service nginx restart
```

I set up supervisor as recommend in the comments and
[the docs](http://sentry.readthedocs.org/en/latest/quickstart/index.html#running-sentry-as-a-service)
to keep sentry runny (though it has never crashed, it does make restarting
easier)

```bash
sudo apt-get install supervisor
sudo vim /etc/supervisor/conf.d/sentry.conf
```

Add the following to the sentry.conf file:

```text
[program:sentry-web]
directory=/home/sentry/
command=/home/sentry/.virtualenvs/sentry_env/bin/sentry start http
autostart=true
autorestart=true
redirect_stderr=true
```

Restart supervidord

```bash
sudo killall supervisord
sudo supervisord
```

**Upgrading Sentry:**

I've upgraded twice. It was a painless process...

```bash
workon sentry_env
pip install sentry --upgrade
sentry upgrade
sudo supervisorctl restart sentry-web
```
