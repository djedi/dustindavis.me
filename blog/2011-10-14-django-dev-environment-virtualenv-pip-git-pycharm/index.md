---
author: Dustin Davis
comments: true
date: 2011-10-14T17:00:11.000Z
slug: django-dev-environment-virtualenv-pip-git-pycharm
title: 'My Django Dev Environment: Virtualenv, pip, git, & PyCharm'
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Luca Bravo](https://unsplash.com/@lucabravo) on
  [Unsplash](https://unsplash.com)
categories:
  - Django
tags:
  - django
  - git
  - pip
  - pycharm
  - Python
  - virtualenv
description:
  How I use virtualenv and pip to manager my python dependencies per project
---

Even though I've heard how wonderful virtualenv & pip are for managing Django
development environments, I didn't think I needed to bother learning it. But one
bored day I did. I'm so glad I did. Truth is, it is just as simple and awesome
as everyone says it is. And it's been so helpful with all the computer and OS
switching I've done lately.

Here is a brief tutorial on how I use virtualenv, pip, git, &
[PyCharm](http://www.jetbrains.com/pycharm/) to manage & develop
[Inzolo.com](https://inzolo.com). I won't cover installing any of these. See
basic instructions
for [installing virtualenv & pip](http://www.pip-installer.org/en/latest/installing.html#using-the-installer).

To create a virtualenv that does not use any global site-packages:

```bash
virtualenv --no-site-packages env_inzolo
```

Then activate your virtualenv:

```bash
source env_inzolo/bin/activate
```

To get out of your virtualenv:

```bash
deactivate
```

Tip: many tutorials I have seen would name their environment inzolo*env, but I
put `env*` first for consistency in tab autocompletion convenience. I was using
just env, but the virtualenv you are using will show up on your command line and
it is helpful to see which one you have activated if you have multiple projects.

When you first create your virtualenv, you will need to activate it and install
all the requirements in that virtualenv for your project:

```bash
pip install django
pip install south
```

Once you have all your packages installed, create a requirements file:

```bash
pip freeze > requirements.txt
```

Now, if you're using git, add env_inzolo to your `.gitignore` file and add
requirements.txt to your repository.

That's it for the set up. Next time your need to recreate your development
environment, it will be simple. Just clone your repository and run these
commands:

```bash
virtualenv --no-site-packages env_inzolo
source env_inzolo/bin/activate
pip install -r requirements.txt
```

That's it!

If you use PyCharm you'll want to set up your virtualenv there for your project.

Edit your project settings. Select Python Interpreter -> Add -> Specify Other...

{% responsiveImage "./images/Add-Python-Interpreter.png", "python inspector", "", 720, "" %}

Add python from your virtual_env (`env_inzolo/bin/python`)

Click Apply to save.

Then click on Django Support and make sure your Django project root, settings
file, manage script & template directories are all in order. then you will
experience the full goodness of PyCharm!
