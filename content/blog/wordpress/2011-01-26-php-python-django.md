---
author: Dustin Davis
comments: true
date: 2011-01-26 20:41:29+00:00

slug: php-python-django
title: PHP, Python & Django
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

When I started learning Python & Django I was alone. I didn't personally know
anyone using it. I had actually started learning Ruby on Rails due to all the
hype surrounding it. I had been developing PHP apps for 8 years. I liked PHP,
but it got to a point where maintaining very large projects became a schlep to
say the least.

I was laughing at Rals vs PHP Rails Envy videos when I saw this
[Ruby on Rails vs Django](http://www.youtube.com/watch?v=PLUS00QrYWw) video.
Honestly I thought many Rails guys where pretty smug & self righteous. When they
had nothing bad to say about Django (other than they were saying Django badly) I
decided to check out that framework also.

Off the bat, there were things I immediately like better about it:

1. The website theme was green, not red. I like green better than red.
2. Python seemed to have a better history and community than Ruby.
3. Their template syntax was similar to PHP's Smarty template engine, which I
   really liked.
4. Their description of Model/View/Template made more sense to me than every
   Model/View/Controller explaination I have heard or read.
5. I saw a blog post comparing an app written in Django, PHP, & Ruby and Django
   performed the best.

I'll admit, learning Django was tough coming from the PHP paradigm. I sense that
C/C++ developers might go through something similar when they start using C#.
You feel a little constrained by the framework. Although it makes hard things
easy, it makes many easy things hard. But, I think that was more of a function
of moving from anarchy that is PHP to a framework. Truthfully, it made me feel
like an old dog trying to learn new tricks.

Looking back, what made it more difficult is that I was learning Python and the
Django framework at the same time and I couldn't always differenciate the two. I
didn't know what was Python magic & what was Django magic.

I worked on a few projects to help me learn Django. I then got a job doing
Django full-time (along with some legacy perl). It has been VERY helpful working
with a team and seeing different styles of programming. Some programmers make
great use of the Python magicness. I still keep things relatively simple.

One of the greatest ah-ha moments for me was when I learned how to use functions
inside of model classes. That opened up so much for me and made referencing
values in templates so much easier. Here is an very simple example:

    class Person(models.Model):
        first_name = models.CharField()
        last_name = models.CharField()

        @property
        def full_name(self):
            return "%s %s" % (self.first_name, self.last_name)

Now, in my template I can use the full_name function...

{{ person.full_name }}

Obviously, you don't gain much from this example, but I hope you can see the
benefit of throwing in function to create the output you need in a template.

Lately I'm finding just how powerful forms and other Django tools can be if you
take the time to learn to do them properly.

I still often consider myself a newbie, but I have got to say Django keeps
getting better & better.

On a side note, I would likely still do a small project in PHP, because nothing
scales down like PHP. In fact, I recently made a sign-up form for our ultimate
frisbee group. It is a one page PHP script. It uses sqlite for data & pulls
weather from Google's api. Using Django for something like that would have been
overkill. Setting up the hosting would have been a bigger pain still. So yes,
there is still room in my world for PHP.
