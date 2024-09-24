---
slug: updating-lets-encrypt-ssl-cert-remotely
title: Updating LetsEncrypt SSL Cert Remotely
date: 2021-08-04
author: Dustin Davis
description:
  When you can't get things to run properly on your server, do it on your dev
  machine!
categories:
  - Docker
  - Nginx
  - hosting
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Tim Gouw](https://unsplash.com/@punttim) on
  [Unsplash](https://unsplash.com)
---

I have a certain website application that I have not properly maintained. It is
running Django 1.something on Python 2.7. It also using WordPress on PHP5. I'm
sure the Postgres and MySQL DBs are out of date as well.

Frankly, it should be updated or taken down, but I keep it up for nostalgia
really.

I recently noticed it has been unresponsive for a while because my LetsEncrypt
cert had expired and was not auto-renewing.

When I tried to run the `certbot-auto` command I used to use to renew, it wasn't
working. It is no longer supported. I'm also hosting on an Ubuntu 12.02 release
which also is no longer being supported.

Sure, I should move to a supported version of Ubuntu. Sure I should upgrade
everything. Sure I should move to Docker. Well, I don't want to spend the time
doing all that. I just wanted a new cert!

So here is what I did. I ran certbot auto locally with Docker to get a new cert.
I had to use the DNS method for validating the domain.

```shell
docker run -it --rm --name certbot \
    --mount "type=bind,src=$(pwd)/certs,dst=/etc/letsencrypt" \
    -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
    certbot/certbot certonly --manual --preferred-challenges dns -d "example.com"
```

Once this completes I will have my certs stored in `./certs/live/example.com` I
then move them to the server and replace the old ones. I use the method below
because I require `sudo` so I can't just use `scp`. I also need to restart nginx
once they have been copied.

```shell
for filename in ./certs/live/example.com/*; do
    bname=$(basename -a $filename)
    cat $filename | ssh user@example.com "sudo tee -a /etc/letsencrypt/live/example.com/$bname"
done
ssh user@example.com "sudo service nginx restart"
```

🧞‍♂️

Now I just have to remember to do this every three months or automate it.
