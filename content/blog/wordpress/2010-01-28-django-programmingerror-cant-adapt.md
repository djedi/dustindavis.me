---
author: Dustin Davis
comments: true
date: 2010-01-28 19:16:48+00:00

slug: django-programmingerror-cant-adapt
title: "Django: ProgrammingError: Can't Adapt"
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - django
---

I find I get an error like this far too often, but not often enough to remember
why I got the problem the previous time. For my own sanity, I'm blogging about
it for reference. The error itself is not very descriptive:

**Exception Type:** ProgrammingError **Exception Value:** can't adapt

Unless there is something I'm forgetting, it seems 100% of the time it has been
a simple error. I use the get_or_create function to retrieve a model, but I
don't account for the "created" variable. So then I try to use the tuple as a
model object somewhere and it throws this error.

For example, here is the wrong way:

    person = Person.objects.get_or_create(first_name="Dustin", last_name="Davis")
    print person.first_name

And now for the correction:

    person, created = Person.objects.get_or_create(first_name="Dustin", last_name="Davis")
    print person.first_name
