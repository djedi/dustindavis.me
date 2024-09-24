---
author: Dustin Davis
comments: true
date: 2010-01-28T19:16:48.000Z
slug: django-programmingerror-cant-adapt
title: "Django: ProgrammingError: Can't Adapt"
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Balaji Malliswamy](https://unsplash.com/@blahji) on
  [Unsplash](https://unsplash.com)
categories:
  - Django
tags:
  - django
description: An error I got often while learning Python and the simple fix.
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

```python
person = Person.objects.get_or_create(first_name="Dustin", last_name="Davis")
print person.first_name
```

And now for the correction:

```python
person, created = Person.objects.get_or_create(first_name="Dustin", last_name="Davis")
print person.first_name
```
