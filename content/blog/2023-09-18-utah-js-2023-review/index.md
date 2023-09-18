---
slug: utah-js-2023-review
title: UtahJS 2023 Conference Review
date: 2023-09-18
author: Dustin Davis
description:
  A review of the 2023 UtahJS conference - summaries of the talks attended
  including caching strategies, codemods, SvelteKit, debugging, the importance
  of side projects, and key takeaways.
categories:
  - JavaScript
  - TypeScript
banner: ./images/banner.jpg
bannerCredit: Photo by []() on [Unsplash](https://unsplash.com)
---

I attended the UtahJS conference last week. I went in with only my phone in my
pocket - just ready to listen and not worry about taking notes.

First of all, I loved the venue. It was held at the Megaplex theaters in Sandy.
They reserved 3 theaters. One was larger than the others, but each theater room
came standard with plush recliners for every seat. They also had unlimited soft
drinks to stay hydrated.

I got there about an hour early so it was nice to just take a seat and get a
short power nap in.

The conference consisted of 3 tracks. I don't know if there was any rhyme or
reason to these tracks. I assume they tried to determine which would be the most
popular and put them in the largest room.

I will go over each of the talks I attended along with my takeaways.

## Caching for Cach 🤑 by Kent C. Dodds

I first met Kent several years ago when our company took an AngularJS training
the day before an ngconf. He was our trainer. Now he seems to be a superstar in
the programming world and I'd be surprised if you have not heard of him or used
any of his projects.

He talked all about caching and cache invalidation strategies.

My biggest takeaways from the talk were two things.

First, this blog is a rip-off of his old blog. I still hate JSX so I have never
bothered using React for anything. But this site uses Gatsby. I don't like it.
I'd much rather move to 11ty, but I've never taken the time to migrate it. Kent
has a new site now and as he stated, it is way overkill for a basic blog. But,
one thing he has done that I thought would be cool is how he is caching his blog
content. From what I understand, when he commits a change to a blog post, he has
a GitHub Action that will do cache invalidation on the associated blog post. It
will then trigger his site to download the MDX file from GitHub and generate a
new page and put it in cache. This way, for content changes, it takes only about
8 seconds to deploy rather than rebuilding and re-uploading his whole site. I
like this idea.

Second, he mentioned that he replaced Postgres and Redis with SQLite. That is a
fascinating idea as it would simplify development greatly. I don't have a
database associated with my blog so at the moment it is not really relevant, but
I would certainly look into it for some bigger projects. It seems like backing
up a SQLite DB would be a lot easier too as it is just a file!

## Skills for debugging complex problems by Nick Humrich

Nick took a real world example of trying to fix his wife's sewing machine and
applied it to debugging software. To be honest, I didn't get much out of this
one other than realizing I've developed skills and talents over the years that
I've never tried to put into words and haven't thought about much. One thing I
often tell my wife and kids is to "TRY IT". The main takeaway is that you learn
the fastest by trying to figure out what doesn't work. I can get frustrated when
I get a call asking me what cables go where in the back of a computer. Have you
tried it? There are only so many holes a certain cable can go into. So TRY IT.
If it doesn't work, try again until it does. You are not going to break it!

## Decentralizing with QR Codes by Cody Zushlag

The coolest part of this talk was his interactive slideshow. I believe he
created [slidr.app](https://slidr.app). Honestly, from the description of his
talk, I was expecting to hear more about QR codes and how machines could
generate and read them without human interactivity. Instead, it was more about a
customer loyalty app he created for his local bar. It uses QR codes if you
hadn't guessed.

## Manage large refactors with JSCodeShift by Clint Goodman

This one was probably the most interesting to me. I had not heard of codemods
before. In this talk he described what codemods were and how they were using
them at Adobe to migrate from one library to another. This is definitely
relevant to my team now as we are in the process of migrating our component
library. The gist of it is that writing codemods is not trivial and not
something we do regularly so to get the most out of your time, have ChatGPT help
you write them.

There was actually a lightning talk where someone basically gave the same take
and same examples of getting help from ChatGPT to write a codemod.

## Bring development closer to production with valid HTTPS certificate by Linda Ikechukwu

I've felt it would be nice to use HTTPS for local dev to make it more like live,
but I've never taken the time to look into it. I thought this talk would be a
cool tool that makes it easier, but it still seems like quite a process. It
quickly became apparent that this was a talk by a developer advocate pushing for
people to try out their service - step-ca. From what I can tell, that service is
not really needed but could help large dev teams with the signing of
certificates.

## The Declarative Mindset by Michael Pearson

This talk was all about thinking declaratively in the way we program. For me,
the talk was flat and felt a bit elitist. The code examples were not that
compelling. I feel if I were a declarative snob I would hate my job. That was my
honest takeaway. Probably not the intent of the talk.

## Hydration, Islands, Streaming, and Resumability by Matheus Albuquerque

I was going to attend a talk about MySQL Document Store, but changed my mind
when I saw it was another developer advocate. Honestly MySQL would be 4th on my
list of databases to use on a project if I had a choice so I jumped over to this
other one. Frankly I didn't know what he was talking about. When I've talked
about hydration in the past it has been more around API data. I'd never heard of
islands before. It took me a while to understand he was talking about
components. Frankly I was lost and uninterested from the beginning because he
was mostly talking about React and like I said, I'm not interested in using
React.

## Get Your App Development in Shape with SvelteKit by Brian Rinaldi

This talk looked the most interesting to me because I've been intrigued by
Svelte. I've done sample projects on Pluralsight, but it has been a while. He
mentioned that SvelteKit is to Svelte as NextJS is to React. I'm not sure what
that means but I am assuming you can do server-side with SvelteKit where Svelte
is mainly front-end or SPA? I didn't see enough code or examples to clarify that
so I'm not sure what the real takeaway from the talk was other than I need to
clarify this information.

## Understanding Dependencies in JavaScript to Create a More Performant App by Tyler Hawkins

This one was pretty interesting. He was basically using webpack-bundle-analyzer
to show package sizes and then using different methods to improve app
performance. It is not really a problem I feel we need to solve with our app,
but it felt like good information to know.

## All about AI - Lightning talks

Honestly, I didn't get anything out of these talks. There were various talks.
There was a good one about codemods that was similar to the one I mentioned
earlier. This one was shorter and more entertaining. One talk was pretty decent
about using AI to help you learn a new programming language. The last talk was
just cringe.

## Instant Enterprise by Matt Wood

Matt tried to live code a project into existence following a
[documentation site he put together](https://instant-enterprise.vercel.app) that
would help someone get up and running fast with an ecommerce site. I think I get
what he is trying to do, but there were so many steps and it was so human error
prone that I couldn't help but think, why not just make a starter project that
puts all this together, or write a bash script that does it for you to avoid all
the human error. If it is to learn in the process what you are doing, that makes
sense, but if it is to get an "Instant Enterprise" app up and running, there are
better ways.

## Let's go live by Dano Gillette

Dan deployed an app using AWS. It was simple enough but I think the meat of his
talk was the advice he gives to programmers at various stages of their career. I
wish I had my daughter with me at this talk. His advice to her (and the advice I
have given her) is to build something.

In fact, this gave me a major paradigm shift. I've created several projects and
websites over the years. None of them really turned out as big or profitable as
I had hoped. In fact I've felt like a failure that my EnvelopeBudget.com never
really earned me much money. But then I realized as I was driving home, that it
has earned me a lot of money.

I don't interview very well when it comes to programming jobs. I can't code on a
whiteboard to save my life. The job that I have now pays me very well and I've
had lots of opportunities to learn and grow. I had one lunch interview and then
I got an offer. It wasn't my interview that led to the offer though. They asked
if I had any code I could show them. I gave them access to my EnvelopeBudget.com
and Inzolo.com repos. That was all it took.

I got another job in a similar manner. I was told that the team was on the fence
after my interview and the lead developer said, "I've seen his stuff and I feel
like he can help us".

My personal projects took me down many paths to learn new skills to add the
features I wanted to add. It was the evidence left behind that led to my full
time jobs that have provided the income I have earned throughout my life.

## Wrap

So to wrap things up, I am glad I went to this conference. I learned new things
and it gave me a lot to think about.
