---
author: Dustin Davis
comments: true
date: 2006-10-02 15:00:31+00:00
link: https://dustindavis.me/installer-problems/
slug: installer-problems
title: Installer Problems
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

I've come across a few installers that simply won't install on my laptop (Dell
Latitude D820). When I extract a zip file and double click on the executable
(usually setup.exe) then I will get the following message:

<blockquote>---------------------------
>     <em>(PATH)</em>\SETUP.EXE
>     ---------------------------
>     <em>(PATH)</em>\SETUP.EXE
>     
>     The specified path does not exist.
>     
>     
>     
>     Check the path, and then try again.
>     ---------------------------
>     OK   
>     ---------------------------
> 
> </blockquote>

It didn't matter what path I unzipped to, I would get this error. After browsing
the net for a while I found the solution:

1. Right-click on SETUP.EXE and "Create Shortcut"
2. Right-click on new "Shortcut to SETUP.EXE" and select "Properties"
3. From the Shortcut tab, click the Advanced... button
4. Select the option to "Run in separate memory space"
5. Close the properties windows and double click the shortcut and viola, it
   runs!

Hope this helps any other frustrated users.
