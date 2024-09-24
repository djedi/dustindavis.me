---
slug: scripting-mac-os-configuration
title: Scripting MacOS Configuration
date: 2021-04-28
author: Dustin Davis
description: Tips for scripting your mac setup.
categories:
  - MacOS
  - cli
  - bash
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Sigmund](https://unsplash.com/@sigmund) on
  [Unsplash](https://unsplash.com)
---

Recently, I deleted my hard drive and re-installed MacOS. Before I did that, I
spent a lot of time building out some scripts to make sure I had everything
backed up and that I could get everything set up quickly.

For
[my `.macos` setup script](https://github.com/djedi/dotfiles/blob/master/.macos),
I used https://mths.be/macos as a starting point. It was a huge help. I just
went through and made changes to fit my personal preferences.

But what about things that are not on that script? How do you figure out what
`defaults` keys to edit?

Here is how I went about it...

1. Read all `defaults` values and save them to a file.

   ```shell
   defaults read > before.json
   ```

2. Make a change. For example, I went into System Preferences -> Mouse ->
   enabled Secondary click
3. Read all `defaults` again and save them to a different file.

   ```shell
   defaults read > after.json
   ```

4. Use your favorite diff tool to compare `before.json` to `after.json` to see
   what has changed.

This should help you figure what your command is to edit. For my example above,
I added the following to my setup script:

```bash
# Mouse: enable right-click
defaults write com.apple.AppleMultitouchMouse MouseButtonMode TwoButton
```
