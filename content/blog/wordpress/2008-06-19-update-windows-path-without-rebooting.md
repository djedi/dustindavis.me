---
author: Dustin Davis
comments: true
date: 2008-06-19 11:38:06+00:00
link: https://dustindavis.me/update-windows-path-without-rebooting/
slug: update-windows-path-without-rebooting
title: Update Windows Path Without Rebooting
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - cmd
  - command
  - path
  - windows
---

\***\* UPDATE \*\***

\*\*\*\*I switched to linux & later to mac so I really don't spend any time in
Windows anymore, but it seems I get a lot of traffic and the most useful
information is in
[this comment below...](https://dustindavis.me/update-windows-path-without-rebooting.html#comment-336634369)

--

I find it quite annoying that whenever I read instructions that include adding
an environment path variable you are asked to reboot your machine for changes to
take effect. I know there has GOT to be a way to do it. Well, I know a way, but
it's someway kludgy.

Here is how I do it (I'm really hoping someone will comment and tell me a better
way)

<!-- more -->

1. Open your system properties window. Screenshots below are for Vista:
   [![](https://dustindavis.me/wp-content/uploads/2008/06/computer-properties-150x150.png) ![](https://dustindavis.me/wp-content/uploads/2008/06/computer-properties2-150x150.png)](https://dustindavis.me/wp-content/uploads/2008/06/computer-properties2.png)

2. Open you Environment Variables Window.
   [![](https://dustindavis.me/wp-content/uploads/2008/06/system-properties-150x150.png)](https://dustindavis.me/wp-content/uploads/2008/06/system-properties.png)

3. Double Click on you Path (if you want to just change you path for your login,
   use the top one, if you want to change it for all logins, use the bottom one)
   [![](https://dustindavis.me/wp-content/uploads/2008/06/path-variables-150x150.png)](https://dustindavis.me/wp-content/uploads/2008/06/path-variables.png)

4. Append the path you would like to add, separated with a semi-colon. Below, I
   am adding C:\CmdShortcuts
   [![](https://dustindavis.me/wp-content/uploads/2008/06/variable-value-150x150.png) ](https://dustindavis.me/wp-content/uploads/2008/06/variable-value.png)

...

Now, reboot your computer! Argh! J/K

Here is the kludgy hack that I use so I don't have to reboot. (But it will not
work in all cases, which is why I don't like it, so please, if you know of a
batch script or something I can run that will apply the changes made to the
environment variables without reboot, please post a comment.)

Open a comment window and type SET PATH=%PATH%;C:\CmdShortcuts

You can type PATH again to see your path variables. Your new path should be
added. The problem with this is that this new path variable is only good inside
this command window. If you are doing command line stuff this works, but if you
close your cmd window the change is lost.
