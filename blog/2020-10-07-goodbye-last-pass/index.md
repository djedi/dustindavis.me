---
slug: goodbye-lastpass-hello-bitwarden
title: Goodbye LastPass, Hello Bitwarden
date: 2020-10-07
author: Dustin Davis
description: LastPass is a great tool, but I've found a solution I like more.
categories:
  - Synology
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Jan Tinneberg](https://unsplash.com/@craft_ear) on
  [Unsplash](https://unsplash.com)
---

### TL;DR

Try [Bitwarden](https://bitwarden.com/)

{% responsiveImage "./images/bitwarden.jpg", "Try Bitwarden", "", 720, "" %}

---

I noticed an event on my calendar called "Cancel LastPass". I had put it here
months ago. Tomorrow my yearly registration fee gets deducted from my PayPal
account. Today I canceled it. Let me explain why...

Our company has purchased a site-wide license to
[LastPass](https://www.lastpass.com/) and has been encouraging employees to use
it for better security. I've been using my personal LastPass account for over 10
years. I had thousands of passwords in there. Yeah, it could probably use some
cleaning.

A discussion arose on slack about LastPass vs
[1Password](https://1password.com/). I've never tried 1Password because I've
been perfectly happy with LastPass. Plus, I've had my account for so long that
my subscription was super cheap. Along the line, someone mentioned that because
I have Synology I should just use a self-hosted version of Bitwarden.

I'd never heard of Bitwarden. I like the idea of self-hosting all my passwords,
but I worried that Bitwarden would be a cheap, open-source knock-off of LastPass
and I would hate it. But I decided to try it.

I was quite impressed with the whole process. I installed it using a
[docker container](https://hub.docker.com/r/bitwardenrs/server) and set up a
[secure](wildcard-lets-encrypt-ssl-cert-on-synology-nas) subdomain pointing to
my Bitwarden server. I then did an export of all my LastPass passwords and
imported them into Bitwarden.
[Bitwarden had instructions](https://bitwarden.com/help/article/import-from-lastpass/)
for everything.

I then installed the
[iOS app](https://apps.apple.com/us/app/bitwarden-password-manager/id1137397744)
on my phone and the
[Chrome extension](https://chrome.google.com/webstore/detail/bitwarden-free-password-m/nngceckbapebfimnlniiiahkandclblb)
on [my browser](https://brave.com/) and gave it a try. I added a calendar item
for when my LastPass renewal came due to see if I would be ready to cancel or
not.

Well, that day has arrived. I've been completely impressed with Bitwarden. I
haven't had any desire to go back to LastPass in all this time.

**Update:** The Bitwarden Server image I was using has been
[renamed](https://libredd.it/r/selfhosted/comments/n0m6pu/looks_like_bitwarden_rs_is_being_renamed_to/)
to [Vaultwarden](https://hub.docker.com/r/vaultwarden/server). I'm adding this
snippet to help me remember the quickest way to upgrade my docker image on
Synology.

```shell
sudo su -
docker run -d --name vaultwarden -v /volume1/docker/bitwarden:/data -p 8085:80 vaultwarden/server:latest
```
