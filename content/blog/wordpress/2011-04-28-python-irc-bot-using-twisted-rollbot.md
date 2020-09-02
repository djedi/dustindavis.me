---
author: Dustin Davis
comments: true
date: 2011-04-28 22:38:14+00:00
link: https://dustindavis.me/python-irc-bot-using-twisted-rollbot/
slug: python-irc-bot-using-twisted-rollbot
title: Python IRC Bot Using Twisted (Rollbot)
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - BeautifulSoup
  - Friday
  - irc
  - python
  - Rebecca Black
  - RickRoll'd
  - twisted
---

I wrote my first IRC bot recently. It turned out to be a simpler task than I
thought it would be.

Here's the back story: At work, our programming team uses an IRC channel for all
our internal communication throughout the day. What more would you expect from a
bunch of programmers?

Recently I've been taking delight in Rebecca Rolling (worse than being
[Rick Roll'd](http://www.youtube.com/watch?v=oHg5SJYRHA0)) every each Friday.
Someone made a comment that it would be nice to have a bot to detect such
things. I had been looking for an excuse to try and write an IRC bot, so I took
the challenge.

Basically, the majority of the script was created following
[Eric Florenzano's blog post](http://www.eflorenzano.com/blog/post/writing-markov-chain-irc-bot-twisted-and-python/),
so I won't cover all that again. Just go check it out yourself.

Basically, the part I modified was the privmsg function:

        def privmsg(self, user, channel, msg):
            # use regex to find posted URLs
            matches = re.findall(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\(\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', msg)
            if matches:
                for url in matches:
                    u = urllib.urlopen(url)
                    # get the mime type
                    urltype = u.headers.gettype()
                    #print urltype
                    try:
                        # use BeautifulSoup to get the page title
                        soup = BeautifulSoup.BeautifulSoup(u)
                        title = re.sub("\s+", ' ', soup.title.string).strip()
                        self.msg(self.factory.channel, "Title: %s" % str(title))
                    except (AttributeError, HTMLParseError):
                        # if we have an error getting the title, show the mime type
                        self.msg(self.factory.channel, \
                            "NO TITLE FOUND (%s)" % urltype)

Comments in the code above should explain what is going on. If you want the full
source to the Rollbot,
[check it out on github](https://github.com/redseam/Rollbot).

Hackers: Note that it is entirely possible to hack this. Just create a basic
html page, set your own title, and redirect with JavaScript. My co-workers still
don't trust me...
