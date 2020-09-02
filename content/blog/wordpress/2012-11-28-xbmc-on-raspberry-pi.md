---
author: Dustin Davis
comments: true
date: 2012-11-28 06:43:30+00:00
link: https://dustindavis.me/xbmc-on-raspberry-pi/
slug: xbmc-on-raspberry-pi
title: XBMC on Raspberry Pi
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

I bought a Raspberry Pi after my GuruPlug died. I figured I'd use it for a ZNC
bouncer. But then I bought a Mac Mini and starting using it instead. The
Raspberry Pi just sat on my desk as I couldn't think of a good enough reason to
find time to tinker with it. Then I thought of one...

I've dropped cable/satellite TV. I'm using SickBeard to download a couple of
shows I can't get on Hulu Plus, Amazon Prime, or Netflix. I have a Roku (with
Roxbox) on one TV and an Apple TV connected to another. The problem is that
SickBeard downloads my shows in .mkv format. I then have to use HandBrake to
convert them to .mp4 (H.264) to get them to play on either device. It often
takes longer to convert them that id does just to find a torrent offering the
H.264 version. Either way, it's not as automated as I would like it to be.

I tried once to play an mkv file through Roxbox. It messed up my Roku so it
wouldn't connect to the internet anymore. I had to do a factory reset to get it
working again. It just happened again. This time though, I decided to spend some
time seeing what I could do with the Raspberry Pi that has been sitting on my
desk for months.

I quickly found [Raspbmc](http://www.raspbmc.com/). Wow! I found an 8GB SD card,
borred the charger for my Kindle Fire, and followed the instructions for setting
it up. Everything went smoothly and I had a media center up and running in short
time. Out of the box, it's pretty cool. It has a nice user interface, though not
as simple as Roku or Apple TV, but like most open source software, much more
robust & configurable.

### The Problems

Of course it can't all be THAT easy - at least with me. I set this up on a TV
upstairs. My router is on the main floor in my office. There is no wireless on
the Raspberry PI, so I have to have it wired. Luckily, I have an extra Airport
Extreme that got fried in a lightening storm. The incoming port doesn't work,
but it still works as an access point and so I could use it to plug an ethernet
cable into my Raspberry Pi. On my main Airport Extreme I have and external hard
drive. This was the tricky part getting it mounted on my guru plug, and proved
to be a challenge with the Raspberry Pi as well.

I got a bee in my bonnet trying to get this to work and I finally found the
solution.

I had to ssh into my Raspberry Pi and install cifs-utils because apparently
Raspbmc doesn't come with it.

    sudo apt-get install cifs-utils

Then I could mount my hard drive (Elements is the name of my HDD):

    sudo mount -t cifs //10.0.1.1/Elements/ -o username=MYUSERNAME,password=MYPASSWORD /home/pi/Elements/

XBMC plays the mkv files perfectly, so now I just need to add a few automated
tools to put my files in the right place on my network drive and this whole
thing will be so much more hands-off :)
