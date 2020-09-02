---
author: Dustin Davis
comments: true
date: 2013-07-30 17:33:16+00:00
link: https://dustindavis.me/python-twisted-irc-bot-lazy-coder/
slug: python-twisted-irc-bot-lazy-coder
title: 'Python Twisted IRC Bot: Lazy Coder'
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

A friend pointed me to this
[simple yet humorous website](http://developerexcuses.com/) yesterday which
essentially gives a new lazy coder excuse whenever the page is refreshed.

I couldn't help but whip out a bot to plug in to our IRC channel. My lazy coder
bot will give a random excuse whenever someone mentions the word "why".

I used my
[Rollbot script](https://dustindavis.me/python-irc-bot-using-twisted-rollbot.html)
as a base to write this up quickly.

requirements.txt

[text]Twisted==13.1.0 beautifulsoup4==4.2.1 requests==1.2.3[/text]

because.py

[python]from bs4 import BeautifulSoup import requests from
twisted.words.protocols import irc from twisted.internet import protocol,
reactor

NICK = '_lazy_coder_' CHANNEL = '#yourchannel' PASSWORD = 'channel_password'

class MyBot(irc.IRCClient): def \_get_nickname(self): return
self.factory.nickname nickname = property(\_get_nickname)

    def signedOn(self):
        self.join(self.factory.channel)
        print "Signed on as {}.".format(self.nickname)

    def joined(self, channel):
        print "Joined %s." % channel

    def privmsg(self, user, channel, msg):
        """
        Whenever someone says "why" give a lazy programmer response
        """
        if 'why' in msg.lower():
            # get lazy response
            because = self._get_because()

            # post message
            self.msg(CHANNEL, because)

    def _get_because(self):
        req = requests.get('http://developerexcuses.com/')
        soup = BeautifulSoup(req.text)
        elem = soup.find('a')
        return elem.text.encode('ascii', 'ignore')

class MyBotFactory(protocol.ClientFactory): protocol = MyBot

    def __init__(self, channel, nickname=NICK):
        self.channel = channel
        self.nickname = nickname

    def clientConnectionLost(self, connector, reason):
        print "Lost connection (%s), reconnecting." % reason
        connector.connect()

    def clientConnectionFailed(self, connector, reason):
        print "Could not connect: %s" % reason

if **name** == "**main**": channel = CHANNEL if PASSWORD: channel += '
{}'.format(PASSWORD) reactor.connectTCP('irc.freenode.net', 6667,
MyBotFactory(channel)) reactor.run() [/python]

\*UPDATE: I've made some minor modifications and
[posted the project on Github](https://github.com/djedi/LazyCoderIrcBot)
