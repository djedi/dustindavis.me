---
author: Dustin Davis
comments: true
date: 2009-06-22 16:44:45+00:00

slug: django-filter-model-on-date-range
title: 'Django: Filter Model on Date Range'
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - date
  - django
  - range
---

I'm sure this is in the documentation _somewhere_ but it wasn't totally obvious
to me and I knew there had to be an easy way to filter a model based on a date
range. I'm in the process of filtering transactions for
[Inzolo](http://inzolo.com) and giving the user options for the following date
filters:

- Month to date

- Last month

- Past week

- Past 2 weeks

- Last 30 days

- Last 60 days

- Last 90 days

- All transactions

There really is easy ways to do all of these, but they are slightly different.
What I got hung up on was the range. My assumption would be to do something like
.filter(date >= begin_date, date <= today) but that obviously won't work. I
finally found what I needed with the
[range function](http://docs.djangoproject.com/en/dev/ref/models/querysets/#range).

So to get each of the filters to work, I created a filter function that looks
like this (I'll let you read between the lines to figure out what it is doing):

    def filter_trans(request, trans):
    	today = date.today()
    	if 'filter' in request.POST:
    		fltr = request.POST['filter']
    		if fltr == 'this_month':
    			trans = trans.filter(date__year=today.year, date__month=today.month)
    		elif fltr == 'last_month':
    			year = today.year
    			month = today.month - 1
    			if month == 0:
    				month = 12
    				year = year - 1
    			trans = trans.filter(date__year=year, date__month=month)
    		elif fltr[:4] == 'last':
    			days = int(fltr[4:])
    			trans = filter_trans_days(trans, today, days)
    		elif fltr == 'all':
    			return trans
    	else:
    		trans = trans.filter(date__year=today.year, date__month=today.month)
    	return trans

    def filter_trans_days(trans, today, days):
    	days = timedelta(days=days)
    	begin = today - days
    	return trans.filter(date__range=(begin, today))
