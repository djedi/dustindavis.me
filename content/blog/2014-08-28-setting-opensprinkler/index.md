---
author: Dustin Davis
comments: true
date: 2014-08-28T17:37:32.000Z
link: https://dustindavis.me/setting-opensprinkler/
slug: setting-opensprinkler
title: Setting up OpenSprinkler
banner: ./images/opensprinkler.jpg
categories:
  - Home
description: How I set up OpenSprinkler
---

I set up my OpenSprinkler last night. It was a pretty painless endeavor. I'll
walk through it in this post so I can explain what I did.

## The Purchase

There are a few different models and options to choose from on
[RaysHobby.net](http://rayshobby.net/cart/). Time seems to be my greatest
commodity at this stage in life so I opted to get the
[fully assembled model](http://rayshobby.net/cart/os) for `$149.99`. It seemed a
bit expensive. I paid the same price for a
[12 station remote control system](http://www.amazon.com/Orbit-Watermaster-91922-Twelve-Station-Sprinkler/dp/B001PQGLRY/ref=sr_1_1?ie=UTF8&qid=1409240934&sr=8-1&keywords=remote+sprinklers)
at my old home a few years ago. But that system, while very nice, didn't allow
me the customization I knew I would get with this system. Also, I didn't have to
worry about my kids walking off with the remote. I could just use my phone or
computer.

## Additional Purchases

Once the system arrived, I realized I didn't have everything I needed to set up
the sprinkler. Specifically, I needed a power source and something to get the
internet to this thing.

### Power Supply

The instructions said I needed a 24VAC transformer. Honestly I had no idea what
this was. I did a little research and ended up buying
[this one](http://www.amazon.com/gp/product/B000DCN8LS/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B000DCN8LS&linkCode=as2&tag=randomlinks-20&linkId=DLVRB6K3JAIY4YS7)
on Amazon for `$14.96`. It has a plug for Rain Bird devices at the end of it. I
just cut it off and trimmed the wires to attach to my power terminal block on
the OpenSprinkler. I learned that each of this blocks pull out with makes it
easy to attach wires.

In hindsight, I didn't really need to purchase this. When I took down my cheap
sprinkler controller that the landscapers set up I noticed it uses a 24VAC
transformer and I just had to loosen some screws to detach it and it would have
been easier to use -- no trimming of wires required.

### Internet Connection

Unfortunately there is no wireless adapter built into this thing so I had to
find a wireless bridge. I found
[this one](http://www.amazon.com/gp/product/B00FTV114Y/ref=as_li_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00FTV114Y&linkCode=as2&tag=randomlinks-20&linkId=YZL24PZA6GAN3FKM)
on Amazon which I purchased for `$25.99`.

It was a pretty simple setup to get it configured:

1. Plug in it.
2. Connect to it as if it were your wireless rounder.
3. Go to http://192.168.10.253 in your browser to access to admin config.
4. Put it in repeater mode, connecting to you main wireless router.

That's basically it. Then I just ran a Cat5 cable (which came included in the
package) to the OpenSprinkler.

## Managing Open Sprinkler

Once it connects to your home network, if you push the top button on the right
side of the device it will display it's IP address. In my case it was 10.0.1.30.
I then went to this IP in my browser (http://10.0.1.30) and was propted to log
in. The default password is printed on the OpenSprinkler instructions. From here
you can change settings, set up stations and watering times etc.

Wiring up the sprinkler wires was also simple. I just moved the wires from my
old system to the new OpenSprinkler. There wasn't much to it.

I downloaded the
[Sprinklers App](https://itunes.apple.com/us/app/sprinklers/id830988967?mt=8) on
my iPhone. Because my iPhone was connected to my home network as well it was
able to easily detect my OpenSpinkler automatically.

I installed the app on my wife's phone so now she doesn't have to ask me to turn
on sprinklers on random occasions.

## Conclusion

All in all this project cost me around `$190` and about 2 hours of time. You
could save some money if you went with a DIY kit and didn't need to buy the
24VAC transformer or wireless bridge. But I am sure going to love the ability to
manage my sprinklers on a web page rather than a tiny black & white display.
Also I have the ability to control my sprinkler from anywhere. (I could put it
on a public IP but I haven't done this yet since I work from home and don't
really see the need to control my sprinklers from out of town. But who knows,
that could change.)
