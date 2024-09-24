---
author: Dustin Davis
comments: true
date: 2020-06-30 20:15:13+00:00

slug: keep-webmin-running
title: Keep Webmin Running
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Andrea Leopardi](https://unsplash.com/@whatyouhide) on
  [Unsplash](https://unsplash.com)'
categories:
  - Apache
  - bash
  - cron
  - MySQL
  - Virtualmin
  - Webmin
tags:
  - apache
  - bash
  - cron
  - mysql
  - virtualmin
  - webmin
description:
  A simple bash script to check if services are running and start them if not.
---

I have a Webmin/Virtualmin server where I host a few personal sites and lately
certain services have been crashing. I don't want to upgrade to a larger server
as these sites are not really critical to be up 24x7, but it is annoying.

After doing some searching I have found a simple script to run to check certain
services statuses to see if they are still running, and, if not, start them back
up.

There may be a better way to do this without the copy/paste code, but I'm not a
bash scripting expert so this fits my needs.

I created a file at `/etc/services.chk` with the following content:

```bash
#!/bin/bash

STATUS="$(systemctl is-active webmin)"
if [ "${STATUS}" != "active" ]; then
        echo "Webmin is stopped. Restarting..."
        /usr/sbin/service webmin start
else
        echo "Webmin is running."
fi

STATUS="$(systemctl is-active apache2)"
if [ "${STATUS}" != "active" ]; then
        echo "Apache is stopped. Restarting..."
        /usr/sbin/service apache2 start
else
        echo "Apache is running."
fi

STATUS="$(systemctl is-active mysql)"
if [ "${STATUS}" != "active" ]; then
        echo "MySQL is stopped. Restarting..."
        /usr/sbin/service mysql start
else
        echo "MySql is running."
fi
```

I gave this script executable permissions:

```bash
sudo chmod +x /etc/services.chk
```

I then did a bit of testing...

```
$ sudo ./services.chk
Webmin is running.
Apache is running.
MySql is running.
$ sudo service webmin stop
$ sudo ./services.chk
Webmin is stopped. Restarting...
Apache is running.
MySql is running.
```

Finally, I added the following to my cron:

```crontab
*/30 * * * * /etc/services.chk >/dev/null 2>&1
```
