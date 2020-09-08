---
author: Dustin Davis
comments: true
date: 2016-09-14T21:03:45.000Z
link: https://dustindavis.me/daily-passwords-for-kids-computer/
slug: daily-passwords-for-kids-computer
title: Daily Passwords for Kids' Computer
banner: ./images/banner.jpg
bannerCredit:
  Photo by [marcos mayer](https://unsplash.com/@mmayyer) on
  [Unsplash](https://unsplash.com)
categories:
  - family
  - MacOS
  - Python
tags:
  - cron
  - kids
  - osx
  - python
description:
  How I change the logins everyday on the computer to make sure they get their
  jobs done before zoning out on the computer.
---

In our home we have an old iMac for the kids to use. They each have their own
login. Each login has a parental control that logs them out after one hour. This
has been helpful to prevent fights over who has been on too long and limits
their screen time.

The problem I've had lately is that we ask them to do homework and chores before
getting on the computer, yet they get on anyway.

So I had this idea to change their passwords every day and email the new
passwords to my wife and I each morning. This way they we can make sure they
have their jobs done before they get on the computer. I know, it sucks to be a
nerd's child.

Here is the python script that makes the magic happen...

```python
#!/usr/bin/env python
import random
import smtplib

from subprocess import call
from email.mime.text import MIMEText


FROM_EMAIL = ''
SMTP_HOST = ''
SMTP_PORT = 587
SMTP_USERNAME = ''
SMTP_PASSWORD = ''
USE_TLS = True
TO = ''
LOGINS = 'child1 child2 child3 etc'.split()
ADMIN_USERNAME = ''
ADMIN_PASSWORD = ''


passwords = {}
for login in LOGINS:
    # get 4 digit random number for the new password
    password = random.randint(1000, 9999)
    command = 'dscl -u {0} -P {1} . -passwd /Users/{2} {3}'.format(
        ADMIN_USERNAME, ADMIN_PASSWORD, login, password)
    call(command.split())
    passwords[login] = password

msg = '';
for key, val in passwords.iteritems():
    msg += '{0}: {1}\n'.format(key.title(), val)
msg = MIMEText(msg)
msg['Subject'] = 'Today\'s passwords';
msg['From'] = FROM_EMAIL
msg['To'] = TO

s = smtplib.SMTP(SMTP_HOST, SMTP_PORT)
s.ehlo()
if USE_TLS:
    s.starttls()
s.login(SMTP_USERNAME, SMTP_PASSWORD)
s.sendmail(FROM_EMAIL, TO.split(), msg.as_string())
s.quit()
```

If you'd like to use this, just enter all the GLOBAL variables at the top. I
named this file `daily.py` and set it to run at 6 am every day with the
following crontab setting:

```text
0 6 \* \* \* python /Users/dustin/daily.py
```

I set up a free account on [Mailjet](https://www.mailjet.com) to use as an SMTP
server. Thanks Mailjet.

As soon as I ran the script for the first time, my wife got a Gmail notification
in the other room and said, "Thank you!" #winning
