---
author: Dustin Davis
comments: true
date: 2011-02-03 23:31:06+00:00

slug: modifying-other-sites-with-kynetx
title: Modifying Other Sites with Kynetx
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

When I wrote [House Sheet,](http://www.housesheet.com) the biggest downside of
using it was entering all the data for a house on a form. It wasn't a big deal
since we started by entering all that data in a spreadsheet, but it was a pain
in the butt because I figured there had to be an easier way.

So I wrote a very simple API that basically allows you to pass all the form
variables in a query string to the form to pre-populate them. My hope was that
the service would get popular and people could add a button to their site. I
even went as far as emailing my favorite real estate site -
[UtahRealEstate.com](http://www.utahrealestate.com) and asking if they would
consider adding a button to their listing that would call my API. It was a long
shot and as I expected I didn't get any type of response from them. They later
added their own favorites feature.

I first heard of [Kynetx](http://www.kynetx.com) at a
[LauchUp event](http://www.launchup.org/?s=kynetx). Immediatly this problem came
to mind as a use for there tool. But, I had already moved and didn't really have
much motivation to work on housesheet since I was in the thick of developing &
promoting [Inzolo](http://inzolo.com).

Well, we are house hunting again. I still prefer to use housesheet.com over the
favorite feature at UtahRealEstate. House Sheet provides a better overall view
which I can sort and add notes and other personal data. Since we started using
it again I gained the a greater motivation to look into learning Kynetx.

After some trial & error and a bit of help from the Kynetx staff, I've developed
plugins for chrome & firefox that will put a link to add a property to House
Sheet. I'm sure I didn't make the most of the features Kynetx has to offer. I
all needed was to figure out how to run some [jQuery](http://www.jquery.com) and
I had what I needed. Kynetx supports jQuery beautifully.

[![](https://nerdydork.com/wp-content/uploads/2011/02/Selection_0011-300x202.png)](https://nerdydork.com/wp-content/uploads/2011/02/Selection_0011.png)

Now I don't need any help from the webmasters at UtahRealEstate. I'll just hack
their site and make it useful to suit my needs! Thanks Kynetx!

If you are looking for a house in Utah and want to try out House Sheet, download
the plugin for your favorite browser:

[![](/images/cr.png)](/files/HouseSheet.crx)
[![](/images/ff.png)](/files/HouseSheet.xpi) ![](/images/ie.png)

**UPDATE:**

Thanks to some
[help](http://stackoverflow.com/questions/4889309/working-with-krl-ajax/4901439)
from [Mike Grace](http://twitter.com/MikeGrace), a link will now also show up on
the pop-up view of a property listing:

[![](https://nerdydork.com/wp-content/uploads/2011/02/Selection_002-300x123.png)](https://nerdydork.com/wp-content/uploads/2011/02/Selection_002.png)

Don't worry, if you have the plugin installed, no re-install or upgrade is
necessary. It Just Worksâ„¢!
