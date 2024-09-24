---
slug: create-your-own-dynamic-dns-service
title: Create Your Own Dynamic DNS Service
date: 2021-10-19
author: Dustin Davis
description:
  Don't pay for an expensive service when you can code it yourself in two lines.
categories:
  - DNS
  - automation
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Alex Cheung](https://unsplash.com/@alexcpl) on
  [Unsplash](https://unsplash.com)
---

The more services I add to my NAS, the more I rely on it working. I recently
moved my daughter's [nightscout](http://www.nightscout.info/) app to our server
rather than hosting it on Heroku or some other service. It was actually working
quite well... until my public IP address changed on me.

I'm not paying for a dedicated IP, but it has only changed once or twice in the
past 5 years so I don't really worry about it changing. But recently it has
changed twice in a week. The second time I was out of town, so fixing it
involved a little more work. Because nightscout affects my daughter's health I
want it up as much as possible.

I looked into some dynamic DNS services. But once I understood how they worked,
I figured I could automate something simple myself. It turns out it was very
simple.

Here is my shell script:

```bash
MYIP=$(dig +short myip.opendns.com @resolver1.opendns.com)
curl -u "$IWMN_USERNAME:$IWMN_PASSWORD" "https://iwantmyname.com/basicauth/ddns?hostname=$HOME_DOMAIN&myip=$MYIP&ttl=60"
```

What is it doing? The first line uses the `dig` command to get my public IP
address and saves it as a variable. I then use that variable to call a simple
API provided by my domain registrar (iwantmyname.com) to update my A record for
that domain.

I then set up a cron job to run this script every night. If my IP address
changes, things won't be broken for any more than 24 hours. Of course, I could
run this more often if I want to ensure it is up to date.

Note that Synology does not have `dig` install by default. The quickest
workaround for me was to install the DNSServer package. I then call dig via
`/var/packages/DNSServer/target/bin/dig`.
