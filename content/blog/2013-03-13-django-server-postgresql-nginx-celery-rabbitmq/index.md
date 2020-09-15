---
author: Dustin Davis
comments: true
date: 2013-03-13T17:51:57.000Z

slug: django-server-postgresql-nginx-celery-rabbitmq
title: Setting up a Django Server with PostgreSQL, Nginx, Celery & RabbitMQ
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Kevin Horvat](https://unsplash.com/@hidd3n) on
  [Unsplash](https://unsplash.com)
categories:
  - Django
  - Nginx
  - PostgreSQL
tags:
  - celery
  - celerycam
  - django
  - nginx
  - postgres
  - postgresql
  - rabbitmq
  - supervisor
  - ubuntu
description:
  Step-by-step guide to setting up a Django server with all the works.
---

**Disclaimer: I am not a sysadmin. I'm just a developer. I welcome and encourage
comments to improve this process!**

I have set up a couple of Django servers lately and taken copious notes that I
have extracted from various sources. Below are the commands I issue to a fresh
Ubuntu server install to get Django up and running. This puts everything on one
server (PostgreSQL, Celery, RabbitMQ, etc) so it's nice for a small starter
project but don't expect it to scale.

Log in as root and add a non-root user. Add the user to the sudoers group. Log
out and log back in as 'username'.

```bash
adduser username
adduser username sudo
exit
```

Update the local package index. Upgrade all the packages that can be upgraded.
Remove packages that are no longer needed and then reboot for good measure.

```bash
sudo apt-get update
sudo apt-get dist-upgrade
sudo apt-get autoremove
sudo reboot
```

Install libraries for Python, PIP, PIL/Pillow, PostgreSQL, libevent for gevent,
memcached server and library, RabbitMQ, git, nginx, & supervisor

```bash
sudo apt-get install build-essential python-dev python-pip libjpeg8-dev \
  libfreetype6-dev zlib1g-dev postgresql postgresql-contrib libpq-dev \
  libevent-dev memcached libmemcached-dev rabbitmq-server git nginx supervisor
```

Install virtualenv and virtualenvwrapper. To enable it, we need to add a line to
our .bashrc file and log out and back in.

```bash
sudo pip install virtualenv virtualenvwrapper
echo "" >> .bashrc
echo "source /usr/local/bin/virtualenvwrapper.sh" >> .bashrc
source .bashrc
```

Make a virtualenv

```bash
mkvirtualenv project_env
```

Install postgres adminpack

```bash
sudo -u postgres psql
CREATE EXTENSION "adminpack";
q
```

Change postgres password & create database

```bash
sudo passwd postgres
sudo su - postgres
psql -d template1 -c "ALTER USER postgres WITH PASSWORD 'changeme';"
createdb projectdb
createuser username --pwprompt
psql -d template1 -U postgres
GRANT ALL PRIVILEGES ON DATABASE projectdb to username;
q
exit
```

Install RabbitMQ

```bash
sudo rabbitmqctl add_user username username_pw
sudo rabbitmqctl add_vhost username_vhost
sudo rabbitmqctl set_permissions -p username_vhost username ".<em>" ".</em>" ".*"
sudo rabbitmqctl clear_permissions -p username_vhost guest
```

Generate ssh key to upload to Github, Bitbucket, or wherever you host your code.

```bash
ssh-keygen -t rsa -C you@sample.com
cat ~/.ssh/id_rsa.pub
```

Create some `/var/www` dirs & set permissions on these directories.

```bash
sudo mkdir -p /var/www/static
sudo mkdir /var/www/media
sudo chown -R username:www-data /var/www
```

Clone your repository to your home directory and install the packages in your
requirements file.

```bash
git clone git@bitbucket.org:yourusername/project.git
cd project/requirements
pip install -r prod.txt
```

Remove the default symbolic link for Nginx. Create a new blank config, and make
a symlink to it. Edit the new configuration file.

```bash
sudo rm /etc/nginx/sites-enabled/default
sudo touch /etc/nginx/sites-available/project
cd /etc/nginx/sites-enabled
sudo ln -s ../sites-available/project
sudo vim /etc/nginx/sites-available/project
```

Add the following content to nginx config:

define an upstream server named gunicorn on localhost port 8000

```text
upstream gunicorn { server localhost:8000; }
```

make an nginx server

```text
server {
# listen on port 80
listen 80;

# for requests to these domains
server_name yourdomain.com www.yourdomain.com;

# look in this directory for files to serve
root /var/www/;

# keep logs in these files
access_log /var/log/nginx/project.access.log;
error_log /var/log/nginx/project.error.log;

# You need this to allow users to upload large files
# See http://wiki.nginx.org/HttpCoreModule#client_max_body_size
# I'm not sure where it goes, so I put it in twice. It works.
client_max_body_size 0;

# THIS IS THE IMPORTANT LINE
# this tries to serve a static file at the requested url
# if no static file is found, it passes the url to gunicorn
try_files $uri @gunicorn;

# define rules for gunicorn
location @gunicorn {
    # repeated just in case
    client_max_body_size 0;

    # proxy to the gunicorn upstream defined above
    proxy_pass http://gunicorn;

    # makes sure the URLs don't actually say http://gunicorn
    proxy_redirect off;

    # If gunicorn takes > 5 minutes to respond, give up
    # Feel free to change the time on this
    proxy_read_timeout 5m;

    # make sure these HTTP headers are set properly
    proxy_set_header Host            $host;
    proxy_set_header X-Real-IP       $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}

} server {
listen 443 ssl;
# start mine
ssl on;
ssl_certificate /etc/ssl/localcerts/yourdomain_com.crt;
ssl_certificate_key /etc/ssl/localcerts/yourdomain.com.key;
ssl_protocols        SSLv3 TLSv1 TLSv1.1 TLSv1.2;
ssl_ciphers          HIGH:!aNULL:!MD5:!kEDH;
server_name  yourdomain.com www.yourdomain.com;

# look in this directory for files to serve
root /var/www/;

# keep logs in these files
access_log /var/log/nginx/project.access.log;
error_log /var/log/nginx/project.error.log;

# You need this to allow users to upload large files
# See http://wiki.nginx.org/HttpCoreModule#client_max_body_size
# I'm not sure where it goes, so I put it in twice. It works.
client_max_body_size 0;

# THIS IS THE IMPORTANT LINE
# this tries to serve a static file at the requested url
# if no static file is found, it passes the url to gunicorn
try_files $uri @gunicorn;

# define rules for gunicorn
location @gunicorn {
    # repeated just in case
    client_max_body_size 0;

    # proxy to the gunicorn upstream defined above
    proxy_pass http://gunicorn;

    # makes sure the URLs don't actually say http://gunicorn
    proxy_redirect off;

    # If gunicorn takes > 5 minutes to respond, give up
    # Feel free to change the time on this
    proxy_read_timeout 5m;

    # make sure these HTTP headers are set properly
    proxy_set_header Host            $host;
    proxy_set_header X-Real-IP       $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
}
```

Restart nginx

```bash
sudo service nginx restart
```

Set up database

```bash
cd /home/username/project
python manage.py syncdb --settings=project.settings.prod
python manage.py migrate --settings=project.settings.prod
```

Run collectstatic command

```bash
python manage.py collectstatic -l --noinput --settings=project.settings.prod
sudo /etc/init.d/nginx restart
```

Configure supervisor

Add the following contents to `/etc/supervisor/conf.d/celeryd.conf`

```bash
sudo vim /etc/supervisor/conf.d/celeryd.conf
```

Contents:

```text
# the name of this service as far as supervisor is concerned</h1>
[program:celeryd]

# the command to start celery
command = /home/username/.virtualenvs/project_env/bin/python /home/username/project/manage.py celeryd -B -E --settings=project.settings.prod</pre>
# the directory to be in while running this
directory = /home/username/project</pre>

# the user to run this service as
user = username</pre>

# start this at boot, and restart it if it fails
autostart = true autorestart = true<

# take stdout and stderr of celery and write to these log files
stdout_logfile = /var/log/supervisor/celeryd.log stderr_logfile =
/var/log/supervisor/celeryd_err.log
```

Now we will create CeleryCam in /etc/supervisor/conf.d/celerycam.conf

```bash
sudo vim /etc/supervisor/conf.d/celerycam.conf
```

Contents:

```text
[program:celerycam]
command = /home/username/.virtualenvs/project_env/bin/python /home/username/project/manage.py celerycam --settings=project.settings.prod
directory = /home/username/project
user = username
autostart = true
autorestart = true
stdout_logfile = /var/log/supervisor/celerycam.log
stderr_logfile = /var/log/supervisor/celerycam_err.log
```

Create Gunicorn script in /etc/supervisor/conf.d/gunicorn.conf

```bash
sudo vim /etc/supervisor/conf.d/gunicorn.conf
```

Contents:

```text
[program:gunicorn]
command = /home/username/.virtualenvs/project_env/bin/python /home/username/project/manage.py run_gunicorn -w 4 -k gevent --settings=project.settings.prod
directory = /home/username/project
user = username
autostart = true
autorestart = true
stdout_logfile = /var/log/supervisor/gunicorn.log
stderr_logfile = /var/log/supervisor/gunicorn_err.log
```

Restart supervisor

```bash
sudo service supervisor restart
```

Restart/stop/start all services managed by supervisor

```bash
sudo supervisorctl restart all sudo supervisorctl stop all sudo
supervisorctl start all
```

Or restart just celeryd

```bash
sudo supervisorctl restart celeryd
```

Or, start just gunicorn

```bash
sudo supervisorctl start gunicorn
```

Reboot and make sure everything starts up

```bash
sudo reboot
```

## Bonus: set up ssl

```bash
sudo mkdir /etc/ssl/localcerts
cd /etc/ssl/localcerts
sudo openssl req -new -nodes -days 365 -keyout yourdomain.com.key -out yourdomain.com.csr
sudo chmod 400 /etc/ssl/localcerts/yourdomain.com.key
sudo chmod 400 /etc/ssl/localcerts/yourdomain.com.crt
```

A little extra...

Use vim as the default editor:

```bash
sudo update-alternatives --config editor
```

Don't require password for sudo user:

```bash
sudo visudo
```

Add the following line at the bottom of sudoers file:

```text
username ALL=(ALL) NOPASSWD: ALL
```
