---
author: Dustin Davis
comments: true
date: 2013-03-12T19:08:39.000Z

slug: python-django-google-adsense-api
title: Python, Django & the Google Adsense API
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Chester Alvarez](https://unsplash.com/@chesteralvarez) on
  [Unsplash](https://unsplash.com)
categories:
  - Django
  - Python
tags:
  - adsense
  - api
  - django
  - Google
  - Python
description: How to talk to the Google Adsense API with Django/Python
---

I have been tasked with updating our real-time revenue stats at
[Neutron](http://neutroninteractive.com). After spending about a week going
though and updating our PHP scripts I finally decided it would be worth my time
and sanity to start from scratch with Python. I'm building a Django application
that will store revenue stats from different sources, which I can then use to
build views and an API for stat tools.

So for the past few days I've been writing scripts that log in to other websites
and scrape data, or accessing the site's API's if they have one. I've learned a
few things.

1. [requests](http://docs.python-requests.org/en/latest/) >
   [httplib2](https://code.google.com/p/httplib2/)
2. SOAP is the suck, but at least its an API.
   [Suds](https://fedorahosted.org/suds/) makes SOAP suck less. I get it that
   SOAP is basically all .net developers know as far as APIs. ;)
3. [Beautiful Soup](http://www.crummy.com/software/BeautifulSoup/) is a nice
   last resort.
4. I've actually been surprised how many businesses can survive on such crappy
   technology.

I saved Google Adsense for last, figuring they would have the best API and it
would therefore be the easiest to implement. It turned out more challenging than
I anticipated. Apparently you can't just plug in a username/password or API key,
you have to go through the whole Oauth2 handshake to gain access to the API.

I found documentation was not as easy to find as I had hoped unfortunately. I
found many broken links to documentation. Of all people I thought Google would
be better at this. For example, on their most
[up to date developer docs](https://developers.google.com/adsense/host/v4.1/accounts/reports/generate#auth)
I could find they point to this
[broken link to read more about authentication and authorization](https://developers.google.com/adsense/host/getting_started#auth).
(OK, that was weird, as soon as I posted it here, the link started working - I
guess you can all thank me for that ;))

So this blog post is an attempt to document the process of getting reports out
of Adsense and into my Django application.

In order to use Google's API for accessing Adsense reports, you need to use the
[Adsense Management API](https://developers.google.com/adsense/management/).
This API only support OAuth so you have to do the authentication flow in the
browser at least once in order to get your credentials, then you can save these
credentials so you have access going forward. To be honest, while I've heard
about OAuth many times, I have never actually had a need to use it until now. So
I'm learning as I go and feel free to leave a comment and point any
misunderstandings I might have.

As I understand it, Google has one large API for their various products. Before
you can talk to Adsense, you have to register your application through the
[Google API console](https://code.google.com/apis/console#access). I registered
my application. Since I don't have a live URL yet, I used my development URL for
now (localhost:8000). It seemed to work just fine. Download the JSON file with
the link provided.

Also, while your managing your APIs. You will need to go to the services tab and
turn on AdSense Management API if you have not already done so. Otherwise, when
you try to make a request you will just get an error message that says "Access
Not Configured".

Google has created a
[client library for Python](https://developers.google.com/adsense/management/api-lib/python),
which is easily installed with pip. They also have a Django sample project that
uses this library to go through the OAuth2 handshake. I think it was written in
Django 1.1 (Django 1.5 was just released as of this writing) so it is a bit out
of date, but helps greatly as a starting point.

My app is simple. I just want to read in the amount of revenue on a given day
and store it in my local database.

I created a new app in my django project called `adsense`. I created a
`models.py` file to store credentials.

```python
from django.contrib.auth.models import User from django.db import
models from oauth2client.django_orm import CredentialsField

class Credential(models.Model): id = models.ForeignKey(User, primary_key=True)
credential = CredentialsField()

class Revenue(models.Model): date = models.DateField(unique=True) revenue =
models.DecimalField(max_digits=7, decimal_places=2)

    def __unicode__(self):
        return '{0} ${1}'.format(self.date, self.revenue)
```

I put the JSON file I downloaded from the API console in my app folder and
created a the following `views.py`.

```python
import os

from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.sites.models import Site
from django.http import HttpResponseBadRequest, HttpResponse
from django.http import HttpResponseRedirect
from oauth2client import xsrfutil
from oauth2client.client import flow_from_clientsecrets
from oauth2client.django_orm import Storage

from .models import Credential


CLIENT_SECRETS = os.path.join(os.path.dirname(__file__), 'client_secrets.json')

FLOW = flow_from_clientsecrets(
    CLIENT_SECRETS,
    scope='https://www.googleapis.com/auth/adsense.readonly',
    redirect_uri='http://{0}/adsense/oauth2callback/'.format(
        Site.objects.get_current().domain))


@login_required
def index(request):
    storage = Storage(Credential, 'id', request.user, 'credential')
    credential = storage.get()
    if credential is None or credential.invalid is True:
        FLOW.params['state'] = xsrfutil.generate_token(
            settings.SECRET_KEY, request.user)
        # force approval prompt in order to get refresh_token
        FLOW.params['approval_prompt'] = 'force'
        authorize_url = FLOW.step1_get_authorize_url()
        return HttpResponseRedirect(authorize_url)
    else:
        return HttpResponse('Validated.')


@login_required
def auth_return(request):
    if not xsrfutil.validate_token(
            settings.SECRET_KEY, request.REQUEST['state'], request.user):
        return  HttpResponseBadRequest()
    credential = FLOW.step2_exchange(request.REQUEST)
    storage = Storage(Credential, 'id', request.user, 'credential')
    storage.put(credential)
    return HttpResponseRedirect("/adsense/")
```

**Note that on line 32 I added a parameter to force the approval prompt.** I was
having problems getting "invalid_grant" errors because it seemed my credentials
would expire. I'd have to go through the OAuth2 handshake every morning. I
learned after much research that I wasn't getting a refresh_token back. I found
[this tip on StackOverflow](http://stackoverflow.com/questions/10827920/google-oauth-refresh-token-is-not-being-received)
explaining how to get it. This line seemed to fix that problem.

In my main urls.py file I include a link to my app urls file:

main urls.py:

```python
from django.conf.urls import patterns, include, url
from django.contrib import admin

admin.autodiscover()

urlpatterns = patterns(
    '',
    url(r'^adsense/', include('adsense.urls', namespace='adsense')),

    url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^admin/', include(admin.site.urls)),
)
```

adsense/urls.py:

```python
from django.conf.urls import patterns, url

urlpatterns = patterns(
    'adsense.views',
    url(r'^$', 'index', name='index'),
    url(r'^oauth2callback/$', 'auth_return', name='auth_return'),
)
```

Lastly, I have a class that makes the call to the API to get revenue for given
dates. This is located in adsense/tasks.py as I will likely hook this up soon to
run as a task with
[Celery](http://www.celeryproject.org/)/[RabbitMQ](http://www.rabbitmq.com/).

```python
import datetime
import httplib2

from apiclient.discovery import build
from celery.task import PeriodicTask
from django.contrib.auth.models import User
from oauth2client.django_orm import Storage

from .models import Credential, Revenue


TODAY = datetime.date.today()
YESTERDAY = TODAY - datetime.timedelta(days=1)


class GetReportTask(PeriodicTask):
    run_every = datetime.timedelta(minutes=2)

    def run(self, *args, **kwargs):
        scraper = Scraper()
        scraper.get_report()


class Scraper(object):
    def get_report(self, start_date=YESTERDAY, end_date=TODAY):
        user = User.objects.get(pk=1)
        storage = Storage(Credential, 'id', user, 'credential')
        credential = storage.get()
        if not credential is None and credential.invalid is False:
            http = httplib2.Http()
            http = credential.authorize(http)
            service = build('adsense', 'v1.2', http=http)
            reports = service.reports()
            report = reports.generate(
                startDate=start_date.strftime('%Y-%m-%d'),
                endDate=end_date.strftime('%Y-%m-%d'),
                dimension='DATE',
                metric='EARNINGS',
            )
            data = report.execute()
            for row in data['rows']:
                date = row[0]
                revenue = row[1]

                try:
                    record = Revenue.objects.get(date=date)
                except Revenue.DoesNotExist:
                    record = Revenue()
                record.date = date
                record.revenue = revenue
                record.save()
        else:
            print 'Invalid Adsense Credentials'
```

To make it work, I got to http://localhost:8000/adsense/. I'm then prompted to
log in to my Google account. I authorize my app to allow Adsense access. The
credentials are then stored in my local database and I can call my Scraper
`get_report()` method. Congratulations to me, it worked!
