---
slug: starting-the-front-end-and-back-end-scripts-at-the-same-time
title: Starting the Front-End and Back-End Scripts at the Same Time
date: 2020-10-15
author: Dustin Davis
description:
  When you need to start a backend and transpile your front-end code from
  development purposes, here is a hand script to do both.
categories:
  - Django
  - python
  - bash
  - JavaScript
  - Aurelia
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Tim Gouw](https://unsplash.com/@punttim) on
  [Unsplash](https://unsplash.com)
---

I recently starting playing with a new project where I have decided to use
[Aurelia](http://aurelia.io/) as a single page application and power the backend
with [Django](https://www.djangoproject.com/).

In order to start things up, I generally will have two terminal windows - one
for running the backend (Django) and on for running the front-end (Aurelia).

As I was pondering ideas on how to be more efficient when starting up my dev
environment, my first thought was to use [docker](https://www.docker.com/). I've
done this in the past and it works well enough. But I wanted to skip docker and
just run them natively on my machine.

I've often used [tmux](https://en.wikipedia.org/wiki/Tmux) to run multiple
terminals, so I thought maybe I could create a script to start these processes
in tmux.

I created a file named `dev` with the following contents:

```bash
#!/bin/bash

tmux kill-server
tmux new-session -d zsh
tmux new-session -d zsh
tmux split-window -h zsh
tmux send -t 0:0.0 'sleep 10 ; open http://localhost:8084 ; open http://localhost:8085 ; exit' C-m
tmux send -t 1:0.0 "poetry run ./backend/manage.py runserver 8084" C-m
tmux send -t 1:0.1 "npm start" C-m
tmux -2 attach-session -d
```

Now, to get started developing, I just run `./dev`. This will open tmux with a
split window - one running Django and one that transpiles and runs my Aurelia
project. Notice the first command will just sleep for 10 seconds, then open two
browser tabs pointing to my front-end and backend homepages.

To kill it, I simply detach from tmux (Ctrl + b, d) and then run
`tmux kill-server`
