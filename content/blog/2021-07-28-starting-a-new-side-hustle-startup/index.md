---
slug: starting-a-new-side-hustle-startup
title: Starting a New Side Hustle Startup
date: 2021-07-28
author: Dustin Davis
description:
  Follow me on a journey to create a new side hustle startup with some friends.
categories:
  - SideHustle
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Jukan Tateisi](https://unsplash.com/@tateisimikito) on
  [Unsplash](https://unsplash.com)
---

This isn’t my first rodeo. But rodeos have changed a lot since I last… rode.
Sorry, I don’t know rodeo analogies well.

My last big side hustle startup was [Inzolo.com](https://inzolo.com) - which was
an online envelope-based budgeting system. I’ve always had an interest in
personal finance - mostly because I’ve been broke a lot.

Here is how that all started… I had written some simple tools in JavaScript and
PHP/MySQL. One day my friend called me and said he wanted to work with me on a
side project so he could learn some new things and he asked if I had any ideas.
He wanted me to teach him PHP/MySQL along the way. I think this was around 2006
or 2007.

I told him I had an idea for a budgeting site, and that I wanted to try using a
new framework and programming language I had been learning -
[Django](/blog/?q=Django) and [Python](/blog/?q=Python). I went to work on a
proof of concept.

Django was great. It was quite a learning curve coming from PHP. At the time, it
wasn’t yet to version 1.0, so documentation and help were kind of scarce. I
remember getting a lot of help on an IRC channel.

Along the way, I learned a lot about Python, Django, PostgreSQL, banking,
marketing, and lots of other things. At one point I acquired the domain name
[EnvelopeBudget.com](https://envelopebudget.com). Rather than rebrand
Inzolo.com, I decided to rewrite the whole thing to improve upon the
architecture decisions I made with Inzolo. In hindsight, that was a big mistake
since I never really retired Inzolo and spent a lot of time maintaining and
trying to market two budgeting sites.

I hired freelancers in the Philippines to work for me full-time. One of them in
particular was awesome. I had to teach her Django. She picked it up quickly and
eventually I gave her the freedom to do what she thought was best as I was more
focused on my main career.

Unfortunately, EnvelopeBudget.com went off the rails as she added more and more
features that people asked for that I would have said no to. While she continued
to build, I didn’t do a good job of marketing, so we didn’t have many customers
knocking at our door.

At the same time, I had a big corporation sending me cease-and-desist letters
claiming I was infringing on their patent.

In the meantime, I was having a lot of fun with my day job and making good
money, so the motivation to maintain EnvelopeBudget.com and Inzolo dried up
completely. Also, the banking industry changed. I could no longer use OFX direct
connect to quickly import transactions from banks. No, you have to use 3rd party
integrations such as Plaid, that charge a fee for the service.

Over the years I’ve kicked around ideas, but I’ve never been motivated enough to
get them off the ground.

My friends at work and I often talk about doing something on the side. I like
side hustle gigs because it helps keep you sharp and lets you work on something
interesting and has the potential to bring in some extra money if you are
successful. To me, it is a hobby and it beats spending time playing video games.
I enjoy the learning process.

For over a year we have talked about doing something and we decided to build a
site for pickleball leagues. My friend plays in a friendly league which he has
created a site for using [Meteor](https://www.meteor.com). He wants to take it
to the next level. So we have decided to work on it together.

# Where We Have Been

It has been difficult getting this project off the ground. While in the past, I
think I made an excellent decision using Django for my other startups, so much
has changed and there are a lot more great options to choose from.

One of my favorite new technologies that I’ve been wanting to use is GraphQL.
[Hasura](https://hasura.io) is a great platform to create GraphQL APIs easily
with a nice console.

But like all things, there is a big learning curve involved. As we got into it,
I changed my mind and decided to go back to Django because I missed the ORM and
the built-in admin, authentication, etc. It also gave us more features. I had
questions around how we were going transactional emails and do other things you
would do with a full backend service.

After spending time re-writing things in Django and Django REST Framework, I got
tired of writing so many classes and API endpoints that I wouldn’t have to worry
about if I had stuck with Hasura. On top of all that, I hadn't used Django in 7
years, so while I felt like an expert 7 years ago, I felt like a complete newb
starting over. One thing I still don't know about is whether Django
authentication has all the bells and whistles that users have become accustomed
to today such as two-factor auto, social login, etc.

There are pros and cons to any framework or language you choose, but ultimately,
I decided to go back to Hasura.

In the process, we have decided to expand the scope of our project to create a
better pickleball tournament app. So we are starting over from scratch with a
new name and going back to Hasura.

# Current State of Things

So we know we are going to use Hasura, but as I mentioned earlier, it is not a
full backend solution. So we have some other decisions to make.

On the other site, we were using Aurelia as our front-end framework. Aurelia has
been good to us at work, but sadly, the community has not grown over the years
as we had hoped. So we will likely choose to go another route on our front-end
framework. React and Vue seems to be the most popular, so we will likely start
there.

We have also discussed mobile frameworks. I think we have decided to use
Flutter. We can’t use the same code base as our web app, but it seems to have
better performance than other mobile frameworks while allowing us to have one
code base for mobile.

There are other decisions to make as well. A big change today as opposed to 10
years ago is user authentication and authorization. This is so much more complex
now. The first go-around with Hasura, we got things working with Auth0. While
the service is nice, I’m hesitant to be tied to an external service for
authentication. I wonder how much we will end up paying if our service gets big.
This is one reason we switch to Django. We wanted to use built-in
authentication.

Now that we are back to Hasura, the issue has come up again. I’ve been looking
at various options and I’ve decided to go with an open-source service called
[KeyCloak](https://www.keycloak.org).

We will still need a backend for things like transactional emails, image
uploads, and other things. We haven’t made the decision yet as to stick with
Python that we all know and love, or use node/express, which is faster and would
be less context switching if it was full-stack JS/TypeScript. We will decide
when we get there.

So right now, I’m working on building a docker-compose file that will spin up 4
containers:

1. Hasura
2. Postgres for Hasura
3. KeyCloak
4. Postgres for KeyCloak

Originally I was using one container for Postgres that could be used by KeyCloak
and Hasura. That way I could simply add GraphQL endpoints to the KeyCloak data,
but I changed my mind on that and decided to keep them separate. I guess time
will tell if that is the right decision.

That is the hard part of all this. You never know for sure if you are choosing
the best path. Sometimes you have to walk a few miles down the path to know it
is the wrong path. At least then you know. You feel dumb for wasting all that
time and effort, but you learn along the way and know what is down that path at
least.

So that is where I am at today. I plan to share my experience along the way of
getting this side hustle startup off the ground! Feel free to subscribe and stay
tuned!
