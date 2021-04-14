---
author: Dustin Davis
comments: true
date: 2017-01-12T17:01:11.000Z

slug: internet-pause-button-with-dd-wrt
title: Internet Pause Button with DD-WRT
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Nick Fewings](https://unsplash.com/@jannerboy62) on
  [Unsplash](https://unsplash.com)
categories:
  - Family
description:
  How to set up DD-WRT on a Nighthawk router to allow you to pause your home
  wifi from your phone.
---

I love the idea of [Disney Circle](https://meetcircle.com/circle/pause/),
[Torch](https://mytorch.com), and [Luma](https://lumahome.com) where you can get
on your phone and pause the internet for certain devices at home.

But Circle being the cheapest, I didn't really want to shell out
$99 for yet another device when I just paid $155 for a new
[Nighthawk R7000 router](http://amzn.to/2jAaF2K) and took the time to set up
[DD-WRT](http://dd-wrt.com/) on it so I could put time-based internet access on
my kids' devices. I have [OpenDNS](https://www.opendns.com) for filtering
already, so the only thing I was really missing was the internet pause button.

And to be honest, I don't know exactly how those services work. Can you tie
multiple devices to one person or group and pause them all at once? Because that
is what I wanted to do.

After playing around with some ideas I think I have found a decent working
solution.

## Step 1: Create Static Leases

For each device you want to control, you need to create a static IP address. You
do this by going to Services -> Services. Then under `Static Leases` you click
the `Add` button to add a row. Enter the MAC address of your device, a hostname,
IP address and client lease time.

I have 3 TV ares in my home: Living Room, Basement, Master Bedroom. I put all
the devices in each area in their own IP range. For example:

- Living Room: 192.168.1.150 ~ 192.168.1.159
  - Samsung TV: 192.168.1.150
  - Apple TV: 192.168.1.151
  - Chromecast: 192.168.1.152
- Basement: 192.168.1.160 ~ 192.168.1.169
  - Amazon FireTV: 192.168.1.160
  - Roku: 192.168.1.161
  - Wii: 192.168.1.162
- Master Bedroom: 192.168.1.170 ~ 192.168.1.179
  - HiSense TV: 192.168.1.170
  - Apple TV: 192.168.1.171
  - Chromecast: 192.168.1.172
  - Roku: 192.168.1.173

Finding and entering MAC addresses can be time consuming. If you Status -> LAN
you can see the list of clients you have connected to your router along with
their IP address. Some Hostnames are not very readable or may just show `*`. If
you click on the MAC address it will give you some information that may help you
figure out what the device is that is connecting.

For example, one Hostname might be `*` and the MAC address starts with
`74:C2:46`, this link will tell you that the device was made by Amazon
Technologies Inc. That might be my FireTV.

If you still are not sure, you can generally go to your various devices and go
to the settings options to find your MAC address.

**Pro Tip:** Also, because the MAC address is a link, it can make it difficult
to copy/paste those MAC addresses. I copied the whole table of DHCP Clients and
pasted into a text editor. That way I could copy the MAC address easier and also
I don't have to keep switching between tabs in the the dd-wrt interface.

## Step 2: Create Access Restrictions

On the dd-wrt control panel, go to Access Restrictions -> WAN Access. Under
Access Policy, select an open policy. Give it a name and edit the list of
clients.

So, for example, say I select Policy `1 ( )`. I name it `Living Room TV`. I
would then click on `Edit List of Clients`. A new window opens. At the bottom of
that screen for IP Range 01 I enter `192.168.1.150 ~ 192.168.1.159` and then
click `Apply Settings`, then click `Close`.

I set the policy to `Deny` `Everyday`, but I leave it `Disabled` then apply
settings.

Now, whenever I want to disable all my living room TVs I can come back to this
setting and change the Status to `Enable` and then click `Apply Settings` -
Boom! No internet to the Living Room TVs.

You can also get creative with these access restrictions. The other night, my 6
year old woke up at 1 AM and decided to turn on the TV. You can put time based
access restrictions so that they can't watch TV during certain hours of the day
(or night) and leave these restrictions always on.

## Step 3: Enable Access Restrictions from your Phone

The biggest appeal of the hardware I mentioned above is that you can pause the
internet from your phone.

If you are connected to your wifi, you can access this web interface from your
phone using the same IP you use on your computer (generally 192.168.1.1). But
what if you leave the home and put your kids to bed and you arrive at the movie
theater with your spouse and you realize there is no way your little angels are
going to obey you and leave the TV off and go to bed.

Wouldn't it be nice to open your phone and disable things remotely?

On your dd-wrt control panel, go to Administration -> Management. Under Web
Access enable the `HTTPS` protocol. Under Remote Access, select `Enable` and
`Use HTTPS`. Select a Web GUI Port. Default is 8080. You can leave all the other
settings. Click `Apply Settings`

Now you should be able to access your router's control panel from anywhere if
you have a static IP to your home. I have Comcast Business and while I don't pay
for a static IP, I've noticed my IP has never changed in all the years I've had
Comcast.

To get your home's IP address you can go to
[myIPaddress.com](http://www.myipaddress.com/show-my-ip-address/). So, let's say
your IP address was 174.52.104.111. You would then go to
https://174.52.104.111:8080 on your phone to access the control panel (You may
want to bookmark this page).

The interface isn't the greatest from a phone browser there are a few clicks to
get there, but the effects are the same, you can pause the internet on certain
devices from anywhere!

BTW: There is a
[dd-wrt app in the iTunes store](https://itunes.apple.com/us/app/dd-wrt/id556621431?mt=8)
that you can enter your connection and login details so you don't have to login
via a browser if you prefer.
