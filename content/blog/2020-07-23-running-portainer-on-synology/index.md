---
author: Dustin Davis
comments: true
date: 2020-07-23 20:39:35+00:00

slug: running-portainer-on-synology
title: Running Portainer on Synology
banner: ./images/banner.png
categories:
  - Synology
  - Docker
description:
  Portainer offers more features and control over docker containers. Here are
  two simple steps to get it up and running on your Synology NAS
---

For whatever reason, using the docker UI in Synology to set up Portainer was not
working for me. It would run, but it wouldn't connect to my endpoint. Finally I
found that if I ran the docker command from the CLI it would work.

So, to get Portainer running, log in via SSH to your Synology and `sudo` to
`su`.

```bash
sudo su -
```

Then run the following docker command:

```bash
docker run -d -p 8000:8000 -p 9000:9000 --name=portainer --restart=always -v /var/run/docker.sock:/var/run/docker.sock -v /volume1/docker/portainer:/data portainer/portainer:latest
```

Updating the image also a problem. If you use the UI it will have the same issue
of not connecting to the endpoint. So it is better to just delete the container
and run through the steps above again if you want to update.
