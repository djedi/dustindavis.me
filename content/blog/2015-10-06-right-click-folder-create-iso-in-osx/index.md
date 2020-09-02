---
author: Dustin Davis
comments: true
date: 2015-10-06 20:55:50+00:00
link: https://dustindavis.me/right-click-folder-create-iso-in-osx/
slug: right-click-folder-create-iso-in-osx
title: Right Click Folder & Create ISO in OSX
description:
  How to set up a right-click menu option to create an ISO file from a folder.
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Chris Yates](https://500px.com/p/chrjy) on
  [Unsplash](https://unsplash.com)'
categories:
  - automation
  - MacOS
---

Thanks to
[Matt Berther](https://matt.berther.io/2008/12/14/creating-iso-images-from-a-folder-in-osx/)
for this nice little command to create an iso image from a directory in OS X.

```bash
hdiutil makehybrid -o ~/image.iso ~/path/to/folder -iso -joliet
```

Let's be honest, I'm not going to remember this command in 6 months when I need
to run it again. So I created a service. I'll show you how simple it was.

### Open Automator & create a new service

![Automator - Service](images/Untitled_1BC46798.png)

### Add the action to Run Shell Script

![Run Shell Script](images/Untitled_1BC4680A.png)

### The service receives selected **folders** in **Finder**. Set the shell to **/usr/bin/python** and pass input **as arguments**. Add the following 3 lines of python:

```python
import sys from subprocess import call

call('hdiutil makehybrid -o "{0}.iso" "{0}" -iso -joliet'.format(sys.argv[1]),
shell=True)
```

![Python Script](images/Untitled_and_2015-10_GC_1BC46964.png)

### Save the service and give it a name such as "Create .iso"

Now you can right-click on a directory to create an iso image.
![Create .iso service](images/Fullscreen_10_6_15__2_43_PM_1BC46A0D.png)
