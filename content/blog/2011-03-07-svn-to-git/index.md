---
author: Dustin Davis
comments: true
date: 2011-03-07T23:01:42.000Z
slug: svn-to-git
title: SVN to Git
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Jeffrey Hamilton](https://unsplash.com/@pistos) on
  [Unsplash](https://unsplash.com)
categories:
  - Git
tags:
  - git
  - svn
  - unfuddle
description: How to migrate a subversion repo to Git
---

I've been using Git now for over two years. Previously, all my source control
was handled with subversion (SVN). To be honest, I can't even remember how to
use SVN. To be more honest, I cheated and used TortoiseSVN most of the time
anyway.

Every so often I want to update an old website, but my repo is in SVN. I don't
even have it installed anymore. So what do I do? I quickly convert it to Git.

Most of my important repos are stored on my [Unfuddle](http://unfuddle.com)
account. Fortunately, they support both SVN & Git. I recently converted an SVN
repo to Git. Here were the steps I took (I'm using Ubuntu).

```bash
mkdir svntemp
cd svntemp
git svn init http://myusername.unfuddle.com/svn/myusername_myrepo/ --no-metadata
git svn fetch
```

... wait for fetching ...

```bash
cd ..
mkdir newgitrepo
cd newgitrepoÂ
git init
git remote add origin git@myusername.unfuddle.com:myusername/myrepo.git
cp -R ../svntemp/trunk/* .
git add *
git commit -am "initial commit"
git push origin master
```

And I think we're done here. Now, back to coding!
