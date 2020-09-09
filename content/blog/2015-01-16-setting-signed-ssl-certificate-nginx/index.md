---
author: Dustin Davis
comments: true
date: 2015-01-16T19:23:40.000Z
link: https://dustindavis.me/setting-signed-ssl-certificate-nginx/
slug: setting-signed-ssl-certificate-nginx
title: Setting up a Signed SSL Certificate on Nginx
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Jason Blackeye](https://unsplash.com/@jeisblack) on
  [Unsplash](https://unsplash.com)
categories:
  - nginx
tags:
  - http
  - nginx
  - ssl
description: How to add an SSL to a website running on nginx
---

I recently needed to update the SSL certificate on
[EnvelopeBudget.com]("https://envelopebudget.com"). Below are the notes I took
in the process for when I need to do it again in 5 years.

## Step 1

Purchase an SSL certificate. I bought a cheap one from namecheap.com.

## Step 2

Create CSR (certificate signing request)

```bash
openssl req -newkey rsa:2048 -nodes -keyout envelopebudget.com.key -out envelopebudget.com.csr
```

Then print it out and copy it to your clipboard.

```bash
cat envelopebudget.csr
```

Paste CSR into the namecheap admin area

Wait for approval email... submit approval.

SSL cert will be emailed to you in zip file `envelopebudget_com.zip`

## Step 3

Upload the zip file to your server using scp.

```bash
scp envelopebudget_com.zip envelope@envelopebudget.com:~
```

Unzip the file on your server.

```bash
unzip envelopebudget_com.zip
```

Concatenate the primary certificates.

```bash
cat envelopebudget_com.crt COMODORSADomainValidationSecureServerCA.crt COMODORSAAddTrustCA.crt AddTrustExternalCARoot.crt >> ssl-bundle.crt
```

Move all certs to /etc/ssl/localcerts.

```bash
sudo mkdir /etc/ssl/localcerts
sudo mv *.crt *.key *.csr *.zip /etc/ssl/localcerts
```

Make sure the following is in nginx. (See
[Setting up a Django Server with PostgreSQL, Nginx, Celery & RabbitMQ]("http://dustindavis.me/django-server-postgresql-nginx-celery-rabbitmq/"))

```text
ssl on;
ssl_certificate /etc/ssl/localcerts/ssl-bundle.crt;
ssl_certificate_key /etc/ssl/localcerts/envelopebudget.com.key;
ssl_protocols        SSLv3 TLSv1 TLSv1.1 TLSv1.2;
```

Restart nginx.
