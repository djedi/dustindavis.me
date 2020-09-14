---
author: Dustin Davis
comments: true
date: 2015-04-10 14:41:25+00:00

slug: using-gmail-for-support
title: Using Gmail for Support
description: How and why I prefer to simply use Gmail for customer support.
banner: ./images/banner.jpg
bannerCredit:
  'Photo by [Stephen Phillips](https://hostreviews.co.uk/) on
  [Unsplash](https://unsplash.com)'
categories:
  - gmail
  - support
tags:
  - atext
  - gmail
  - support
---

I've been using django-helpdesk for my support software on my Django powered
site. It works well enough, but I didn't really like it.

I started looking around for "better" support tools. I actually found an article
that tried to rank 76 support tools! Everything I tried I didn't really
**love**.

Then one day I as I was listening to a [MicroConf](http://www.microconf.com/)
from [HIten Shah](http://hitenism.com/), in the Q&A someone asked him about
support and he said he still prefers to use Gmail.

That settled it for me. Here are the reasons why I prefer to use Gmail for
customer support.

## It is how customers prefer to communicate

I hate using support ticket systems. They are all slightly different and all
annoying. They are even more annoying when not integrated well and I have to
create a new account just for the support system and knowledge base. I prefer to
just email support. So, I assume most of my customers prefer the same.

## Canned Responses

I've heard a lot of people use canned responses, but I prefer
[aText](https://www.trankynam.com/atext/). It has more features (labels, cursor
placement) and its faster.

You can also add lots of extra shortcuts you can use while communicating with
your customers. Shortcuts could include sub canned responses and links.

For example, I could type _eb.faq.banks_ which would then automatically change
to a url to the FAQ page on banks for
[Envelope Budget](http://envelopebudget.com).

## Add Forms to your App to Give Yourself More Context

Creating a form in your SaaS app for customers to use to send you a support
email has a few benefits. You can add text to the subject line or in the body of
the email to make things even easier. Here are some examples:

- **Username**: If you use usernames you can append this to the message so you
  don't have to look it up manually.
- **Category**: Sometimes you will see help desk software have you select a
  category. You could do the same and prepend it to your subject line. Then
  create a Gmail filter to auto-assign it to the matching label.
- **Priority**: Likewise if you want priorities you could do something similar
  and star the email that comes in.
- **Link to customer profile** You could append a link to the customer's profile
  so you can go right to it and learn more about the customer if applicable.
  Alternatively, you could just append all the info you need in the ticket.

Here are the items I like to see for each customer when they contact me:

1. Username
2. Plan type
3. Date Joined

## You can get more information about your customers

Reparative can give you more details about your customer. I often find myself
relating better to customers when I know more about them. For example, if I see
a link to their twitter or LinkedIn profile and see they are also a programmer,
I can be more technical and use a bit more brevity in technical responses.

## Context & History

One of my favorite features when Gmail was first released was how it group
replied & forwarded conversation. This is really handy.

Often customers will open an old email and reply to it when they have a new
question. I have no problem with this. In fact, I prefer it because then I can
see our past conversations as well and have some context when working with the
customer.

## Undo Send

Ever hit the send button and then immediately thought, "oh wait, I forgot
something!" It happens occasionally. Undo send give you about 10 seconds to
change your mind after hitting send.

## GrexIt

I recently came across [this tool](http://grexit.com/) that looks helpful when
working with others in support. As I grow I may look into it. But as a one-man
support team, it is just not needed right now. At least I know there are tools
to help me in the future.

## Stars & Labels

Right now, my support volume is so low I maintain inbox zero with ease. I know
that will not always be the case and I'll want a way to prioritize. Having
multiple stars and labels will help keep me organized.

## Mailbox & Boomerang

I often use the [Mailbox app](http://www.mailboxapp.com/) on my Mac or iPhone,
or [Boomerang](http://www.boomeranggmail.com/) in Gmail to archive message and
have them return to my inbox and a certain time.

Sometimes when a but report comes in I tell a person I will get back to them
when it is fixed. I can then boomerang it for when I think it should be fix.
When it shows up in the inbox again I can reply and let them know it is fixed,
or remember to hurry and fix the bug so I can reply!

## Stats

I heard someone share their **first response time** for support tickets. I
thought, "I wish I had a way to track this." Wouldn't you know, there already
is. Check out [Gmail Meter](http://gmailmeter.com/). It actually has this stat
and builds it for you - along with other interest email stats. And, like Gmail,
its free.

## Mobile

I don't need a special app on my iPhone or iPad. I can use the default mail
client or the Gmail app (or Mailbox or a myriad of other apps I'm sure).

## Chat

Sometimes a customer may also use Gmail and may be online. You can quickly pull
up a Google Hangouts or chat session with them.

## Offline Mode

Want to go to lunch and answer all your support emails? You don't have wifi or
tethering? Just use Gmail's offline mode to read and reply to all your emails
and have them all synced and sent when you get back online.
