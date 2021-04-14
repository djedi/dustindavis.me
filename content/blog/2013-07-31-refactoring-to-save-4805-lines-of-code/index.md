---
author: Dustin Davis
comments: true
date: 2013-07-31T17:29:14.000Z

slug: refactoring-to-save-4805-lines-of-code
title: Refactoring to Save 4805 Lines of Code
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Stefan Steinbauer](https://unsplash.com/@usinglight) on
  [Unsplash](https://unsplash.com)
categories:
  - Python
  - Django
tags:
  - django
  - Python
  - refactor
description: Using Python magic to save a lot of lines of code.
---

Even after coding in Python for the past five years I've never really considered
myself an expert in the language because I find the more I know, the more I know
I don't know. I generally keep my code simple on purpose until I have a good
reason to be complex - which for most django sites, I haven't had a good reason
to be complex.

Today I had good reason. I'm currently building a number of key performance
indicator (KPI) stats for [Neutron](http://www.neutroninteractive.com). There
are currently 46 different stats that I need to calculate for 5 different time
periods.

For each state I need:

- Stats for start of current day to current time with a comparison to yesterday
  start of day to the current time.
- This week compared to last week delta
- This month compared to last month delta
- This quarter compare to last quarter delta
- This year compared to last year delta

I will be building a view for each stat and associated time period to return
these values in JSON format. So as it stand there will be 230 views. I needed to
come up with something clever to save myself some lines of code. I opted for
class based views.

First I built a base class that will return the JSON data in a consistent
format:

```python
class StatWithDelta(BaseDetailView): start = None end = None
delta_start = None delta_end = None title = None subtitle = None

    def __init__(self):
        super(StatWithDelta, self).__init__()
        self.end = djtz.localtime(djtz.now())

    def value(self):
        raise NotImplementedError

    def delta(self):
        raise NotImplementedError

    def get(self, request, *args, **kwargs):
        value = self.value()
        delta_value = self.delta()
        try:
            delta_percent = round((((delta_value - value) / value) * 100), 2)
        except ZeroDivisionError:
            delta_percent = 0
        payload = {
            'value': value,
            'delta': delta_percent,
            'title': self.title,
            'subtitle': self.subtitle,
        }
        return self.render_to_response(payload)

    def render_to_response(self, context):
        return self.get_json_response(self.convert_context_to_json(context))

    def get_json_response(self, content, **httpresponse_kwargs):
        return http.HttpResponse(content,
                                 content_type='application/json',
                                 **httpresponse_kwargs)

    def convert_context_to_json(self, context):
        return json.dumps(context)
```

Next I built classes for each required time range. Here is my class for today
compared to yesterday:

```python
class TodayYesterday(StatWithDelta): subtitle = 'Today vs. Yesterday'

    def __init__(self):
        super(TodayYesterday, self).__init__()
        self.start = self.end.replace(hour=0, minute=0, second=0, microsecond=0)
        self.delta_start = self.start - datetime.timedelta(days=1)
        self.delta_end = self.end - datetime.timedelta(days=1)
```

Now for each stat I create a class that gets the main value and its delta value.
Here is one example:

```python
class GrossMarginPercent(StatWithDelta): title = 'Gross Margin Percent'

    def value(self):
        return functions.gross_margin_percent_within(self.start, self.end)

    def delta(self):
        return functions.gross_margin_percent_within(
            self.delta_start, self.delta_end)
```

I thought this was clever, but then I found myself writing a lot of similar
code. I would create a class based view for each stat class and time period,
then an associated url mapping. So for the stat class above I would have these
five classes:

```python
class GrossMarginPercentDay(GrossMarginPercent, TodayYesterday): pass
class GrossMarginPercentWeek(GrossMarginPercent, ThisWeekLastWeek): pass
class GrossMarginPercentMonth(GrossMarginPercent, ThisMonthLastMonth): pass
class GrossMarginPercentQuarter(GrossMarginPercent, ThisQuarterLastQuarter): pass
class GrossMarginPercentYear(GrossMarginPercent, ThisYearLastYear): pass
```

... and these urls:

```python
url(r'^edu/gmp-dtd/$', GrossMarginPercentDay.as_view()),
url(r'^edu/gmp-wtd/$', GrossMarginPercentWeek.as_view()),
url(r'^edu/gmp-mtd/$', GrossMarginPercentMonth.as_view()),
url(r'^edu/gmp-qtd/$', GrossMarginPercentQuarter.as_view()),
url(r'^edu/gmp-ytd/\$', GrossMarginPercentYear.as_view()),
```

You can see the lines of code adding up. I was going to add 230+ lines of code
to my urls.py file and 4600 lines of code to my views.py file (20 \* 230)
following PEP8 guidelines.

So I decided to use one url pattern to send to one view function to dynamically
create each of the stat-period classes. Here is my new url pattern:

```python
url(r'^(?P<category>[\w\-]+)/(?P<period>day|week|month|quarter|year)/'
r'(?P<base_class_name>\w+)/\$', 'magic_view'),
```

And here is my "magic*view" function that where the \_magic* happens:

```python
def magic_view(request, category, period, base_class_name):
    """
    Builds a dynamic class subclassing the base class name passed in and a time period class. It will return its as_view() method.

    URL structure: /category/period/KPI_Class/

    category: KPI category (edu, conversion, etc.) not really used at this point
    period: day, week, month, quarter, year
    KPI Class: One of the class names in this file
    """
    class_name = '{}{}'.format(base_class_name, period.capitalize())
    _module = sys.modules[__name__]
    base_cls = getattr(_module, base_class_name)
    if period == 'day':
        period_name = 'TodayYesterday'
    else:
        period_name = 'This{0}Last{0}'.format(period.capitalize())
    period_cls = getattr(_module, period_name)

    # Create a dynamic class based on the base class and time period class
    cls = type(class_name, (base_cls, period_cls), dict())
    return cls.as_view()(request)
```

So if you include all the comments lines to explain why I did, I'm only using 25
lines of code to save 4830 lines. That's a lot of typing. Python, my fingers
thank you!
