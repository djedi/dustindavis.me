---
author: Dustin Davis
comments: true
date: 2013-03-02 07:29:19+00:00
link: https://dustindavis.me/django-textile-template-caching/
slug: django-textile-template-caching
title: Django Textile/Markdown Template Caching Speedup
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - cache
  - django
  - textile
---

I've been putting some time into updating an old site this weekend. I noticed
that the homepage was taking a long time to load - around 5 to 8 seconds. Not
good.

I tried caching queries but it didn't help at all. Then I realized it was most
likely due to my decision long ago to use
[textile](<http://en.wikipedia.org/wiki/Textile_(markup_language)>) to render
text to html.

The site is located at [direct-vs-dish.com](http://direct-vs-dish.com/). It
essentially compares DIRECTV to DISH Network. On the home page is a number of
features. Each feature represents a database record. Here is my original model
for the features:

[python] class Feature(models.Model): category =
models.CharField(max_length=255) slug = models.SlugField() overview =
models.TextField(blank=True, null=True) dish = models.TextField(blank=True,
null=True) directv = models.TextField(blank=True, null=True) dish_link =
models.URLField(blank=True, null=True) directv_link =
models.URLField(blank=True, null=True) order =
models.PositiveSmallIntegerField()

    def __unicode__(self):
        return self.category

    class Meta:
        ordering = ['order']

[/python]

Three of the above fields use textile: overview, dish, & directv. I currently
have 14 feature records. So that is a potential of 42 textile conversions for
the home page.

In order to cache these textile conversions, I added three new fields. I then
added a save method to populate the cached html fields. My model now looks like
this:

[python highlight="1,8,10,12,20-24"] from
django.contrib.markup.templatetags.markup import textile

class Feature(models.Model): category = models.CharField(max_length=255) slug =
models.SlugField() overview = models.TextField(blank=True, null=True)
overview_html = models.TextField(blank=True) dish = models.TextField(blank=True,
null=True) dish_html = models.TextField(blank=True) directv =
models.TextField(blank=True, null=True) directv_html =
models.TextField(blank=True) dish_link = models.URLField(blank=True, null=True)
directv_link = models.URLField(blank=True, null=True) order =
models.PositiveSmallIntegerField()

    def __unicode__(self):
        return self.category

    def save(self, **kwargs):
        self.overview_html = textile(self.overview)
        self.dish_html = textile(self.dish)
        self.directv_html = textile(self.directv)
        return super(Feature, self).save(kwargs)

    class Meta:
        ordering = ['order']

[/python]

I use the Django admin to edit features so I added some styling to hide the
cached html fields with an option to show them if you want to see what has been
converted and cached.

[python highlight=",4-13"] class FeatureAdmin(admin.ModelAdmin): list_display =
('category', 'order') prepopulated_fields = {"slug": ("category",)} fieldsets =
( (None, { 'fields': ('category', 'slug', 'overview', 'dish', 'dish_link',
'directv', 'directv_link', 'order') }), ('Auto Generated', { 'classes':
('collapse',), 'fields': ('overview_html', 'dish_html', 'directv_html'), }), )
admin.site.register(Feature, FeatureAdmin) [/python]

My template tags went from this:

[html] {{ feature.overview|textile }} [/html]

To this:

[html] {{ feature.overview_html|safe }} [/html]

This has dropped my homepage rending time to about 750ms. This is without any
caching of queries. Huge win!
