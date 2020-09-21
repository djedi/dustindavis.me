---
slug: wildcard-lets-encrypt-ssl-cert-on-synology-nas
title: Wildcard Let's Encrypt SSL Cert on Synology NAS
date: 2020-09-21
author: Dustin Davis
description: How to set up a wildcard cert and auto-renew on Synology NAS
categories:
  - Synology
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Matteo Bernardis](https://unsplash.com/@matt_dtd) on
  [Unsplash](https://unsplash.com)
---

Thanks to
[this post on vdr.one](https://vdr.one/how-to-create-a-lets-encrypt-wildcard-certificate-on-a-synology-nas/)
I was able to set up a wildcard Let's Encrypt Cert on my Synology NAS.

The problem is I have to manually renew every 3 months which involves setting a
new TXT record on my DNS and remembering the steps to renew.

After more research, I found a way to automate the renewal of my wildcard DNS.
It does require a DNS server with API access. It turns out there are lots of
options on the
[acme.sh wiki](https://github.com/acmesh-official/acme.sh/wiki/dnsapi).

It would be nice if I could use GoDaddy or NameCheap, where I have most of my
domains, but this particular domain is hosted with iwantmyname. It looks like
there is no support in `acme.sh` for iwantmyname, but
[iwantmyname does have an API for adding a TXT record](https://iwantmyname.com/developer/domain-dns-api).

Luckily, `acme.sh` has provided a solution to use my own API, so that is what
I'll do!

<!-- > **Pro tip**: If you'd like to just copy and paste commands in your terminal, I
> recommend using the
> [regex replace chrome extension](https://chrome.google.com/webstore/detail/regex-replace/eggkcpojddgjkakokkdhocbjebhgkonb)
> to swap out the following variables:
>
> - letsencryptemail@sample.com
> - mydomain.tld
> - iwantmynameemail@sample.com
> - iwantmyname-password
> - /path/to/save/acmeconfigs/ -->

First, let's log into the NAS via ssh and install `acme.sh`

```bash
sudo -i
wget https://github.com/Neilpang/acme.sh/archive/master.tar.gz
tar xvf master.tar.gz
cd acme.sh-master/
./acme.sh --install --nocron --home /usr/local/share/acme.sh --accountemail "letsencryptemail@sample.com"
```

Now we'll create the script that will created our TXT record on iwantmyname. (If
you use some other DNS service that is already supported, you can skip this step
and replace `dns_iwmn` with whatever DNS service you are using.)

```bash
touch /usr/local/share/acme.sh/dnsapi/dns_iwmn.sh
chmod +x /usr/local/share/acme.sh/dnsapi/dns_iwmn.sh
vim /usr/local/share/acme.sh/dnsapi/dns_iwmn.sh
```

I added the following to this script:

```bash
#!/usr/bin/env sh

# Guide: https://github.com/acmesh-official/acme.sh/wiki/DNS-API-Dev-Guide

#Usage: dns_iwmn_add _acme-challenge.www.domain.com "XKrxpRBosdIKFzxW_CT3KLZNf6q0HG9i01zxXp5CPBs"
dns_iwmn_add() {
  local fulldomain=$1
  local txtvalue=$2
  _info "Using iwantmyname"
  _debug fulldomain "$fulldomain"
  _debug txtvalue "$txtvalue"
  curl -u "$IWMN_EMAIL:$IWMN_PASSWORD" "https://iwantmyname.com/basicauth/ddns?hostname=$fulldomain&type=txt&value=$txtvalue"
}

#Usage: fulldomain
#Remove the txt record after validation.
dns_iwmn_rm() {
  local fulldomain=$1
  _info "Using iwantmyname"
  _debug fulldomain "$fulldomain"
  curl -u "$IWMN_EMAIL:$IWMN_PASSWORD" "https://iwantmyname.com/basicauth/ddns?hostname=$fulldomain&type=txt&value=delete"
}
```

Now, let's run the following the command to issue the wildcard cert:

```bash
export CERT_DOMAIN="*.mydomain.tld"
export IWMN_EMAIL="iwantmynameemail@sample.com"
export IWMN_PASSWORD="iwantmyname-password"
/usr/local/share/acme.sh/acme.sh --issue -d $CERT_DOMAIN --dns dns_iwmn \
  --certpath /usr/syno/etc/certificate/system/default/cert.pem \
  --keypath /usr/syno/etc/certificate/system/default/privkey.pem \
  --fullchainpath /usr/syno/etc/certificate/system/default/fullchain.pem \
  --capath /usr/syno/etc/certificate/system/default/chain.pem \
  --dnssleep 20 \
  --config-home "/path/to/save/acmeconfigs/"
```

Now add the following to `/etc/crontab` to keep the cert renewed:

```text
0 10 2 * *  root  /usr/local/share/acme.sh/acme.sh --cron --home /path/to/save/acmeconfigs/
```

💥👊
