---
author: Dustin Davis
comments: true
date: 2008-10-03 22:45:44+00:00
link: https://dustindavis.me/django-tip-get_field_display/
slug: django-tip-get_field_display
title: 'Django Tip: get_FIELD_display()'
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Yada
---

I'm posting this because it seems rather simple, but it took me a while to
find - even with some tips from some helpful people in the #django IRC channel.

Let's say you have a ChoiceField set up like the
[documents describe](http://docs.djangoproject.com/en/dev/ref/models/fields/#choices):

Â

    <span class="k">class</span> <span class="nc">Foo</span><span class="p">(</span><span class="n">models</span><span class="o">.</span><span class="n">Model</span><span class="p">):</span>
        <span class="n">GENDER_CHOICES</span> <span class="o">=</span> <span class="p">(</span>
            <span class="p">(</span><span class="s">'M'</span><span class="p">,</span> <span class="s">'Male'</span><span class="p">),</span>
            <span class="p">(</span><span class="s">'F'</span><span class="p">,</span> <span class="s">'Female'</span><span class="p">),</span>
        <span class="p">)</span>
        <span class="n">gender</span> <span class="o">=</span> <span class="n">models</span><span class="o">.</span><span class="n">CharField</span><span class="p">(</span><span class="n">max_length</span><span class="o">=</span><span class="mf">1</span><span class="p">,</span> <span class="n">choices</span><span class="o">=</span><span class="n">GENDER_CHOICES</span><span class="p">)</span>

Now, you want to display the gender field in a template. If you use the
{{ person.gender }} variable, you would get "M" or "F" to display on your page.
But what if you want "Male" or "Female"? Then you would use
{{ person.get_gender_display }}.

Nifty.
