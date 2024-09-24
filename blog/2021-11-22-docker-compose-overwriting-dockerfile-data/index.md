---
slug: docker-compose-overwriting-dockerfile-data
title: Docker-Compose Overwriting Dockerfile Data
date: 2021-11-22
author: Dustin Davis
description: How to keep docker-compose volumes from overwriting container data.
categories:
  - Docker
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Bernard Hermant](https://unsplash.com/@bernardhermant) on
  [Unsplash](https://unsplash.com)
---

This little challenge took me longer than I had hoped to figure out, so I
figured I would blog about it in case I run into the problem again.

Here was the problem. I dockerized a small coding assignment project. It has a
backend server in python/bottle.py and frontend running Aurelia. This is what my
frontend dockerfile looked like:

```dockerfile
  # use latest version of nodejs
  FROM node:lts-alpine

  # install aurelia-cli to build the app & http-server to serve static contents
  RUN npm i -g aurelia-cli@0.16.0

  # set working directory to app
  # henceforth all commands will run inside this folder
  WORKDIR /app

  # copy package.json related files first and install all required dependencies
  COPY ./frontend/package*.json ./
  RUN npm install
```

This was my docker-compose file:

```yaml
version: '3.9'

services:
  backend:
    build:
      context: .
      dockerfile: Dockerfile.backend
    command: python api.py
    volumes:
      - ./backend:/backend
    ports:
      - '8085:8085'
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    command: au run --watch
    volumes:
      - ./frontend:/app
    ports:
      - '3001:3001'
      - '9000:9000'
```

## The Problem

The dockerfile was installing all the front-end requirements in
`/app/node_modules`. Docker compose was mounting my local `./frontend` directory
to my container's app directory. For me it was working fine because I had a
`node_modules` directory in my `./frontend` directory from running `npm install`
locally. When someone else would check out the project and run
`docker-compose up` they were getting errors because they were missing modules.
Their host `./frontend` directory did not contain `node_modules` so it wasn't
work.

## The Fix

The easiest fix I found was to add the add another volume which essentially
keeps the `node_modules` directory on the server. It is a one-line fix in my
docker compose file.

```yaml
frontend:
  build:
    context: .
    dockerfile: Dockerfile.frontend
  command: au run --watch
  volumes:
    - ./frontend:/app
    - /app/node_modules
  ports:
    - '3001:3001'
    - '9000:9000'
```
