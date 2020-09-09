---
author: Dustin Davis
comments: true
date: 2015-12-16T00:43:29.000Z
link: https://dustindavis.me/why-aurelia-over-angular-react-ember-meteor/
slug: why-aurelia-over-angular-react-ember-meteor
title: Why Aurelia over Angular, React, Ember or Meteor
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Tony Reid](https://unsplash.com/@togna_bologna) on
  [Unsplash](https://unsplash.com)
categories:
  - Programming & Internet
tags:
  - django
  - Ruby on Rails
description:
  After looking at the path of migrating from AngularJS to Angular 2, I'm
  changing lanes.
---

**TL;DR - After analyzing the current state of Angular 1, Angular 2,
React/Redux, Aurelia, Ember & Meteor, I'm using Aurelia for my next project.**

Since attending [ng-conf](http://www.ng-conf.org/) 2015, and the announcement of
[Angular 2](http://angular.io/), I felt 2015 would be the year the internet
stood still to wait for Angular 2.

It turns out that wasn't the case at all. Instead, it seems
[React](https://facebook.github.io/react/) became the new hot thing. I haven't
done anything serious in React, I've done a few tutorials. It seems pretty
straight forward. I know there are people that really like it.

But for whatever reason, I just can't seem to take the React plunge. I can't
really put my finger on it. Maybe it is because it is not a full framework, but
rather just a tool to make components. I haven't really looked into
[Flux](https://facebook.github.io/flux/) or
[Redux](https://github.com/rackt/redux) either.

Perhaps it is jsx that just feels weird to me. I don't really mind jsx either.
But, one thing that I think would annoy me often enough is to remember to use
`className` instead of `class` in my elements. And I'm sure `className` would
end up in some of my html where I don't intend it to be.

As Angular 2 has neared its beta release, I decided to give it a try. I was
excited. I REALLY wanted to like it. I even have tickets for ng-conf 2016 for
the 3rd year in a row. I think it is fair to say I have drunk the Angular
kool-aid.

But the Angular 2 tutorial really left a bad taste in my mouth. I hated the new
syntax. It's difficult to type and hard to grok. For example:

```html
<li
  *ngFor="#hero of heroes"
  [class.selected]="hero === selectedHero"
  (click)="onSelect(hero)"
>
  <span class="badge">{{hero.id}}</span> {{hero.name}}
</li>
```

Look at all those new symbols: \*, #, [], ()

If I felt uncomfortable with
[JSX](https://reactjs.org/docs/introducing-jsx.html), this makes me more
uncomfortable.

As for [TypeScript](http://www.typescriptlang.org/), I'm fine with transpilers.
I've taken a liking to [CoffeeScript](http://coffeescript.org/). There are a
number of things I don't like about CoffeeScript, but I prefer it over ES5. But
again, TypeScript left me feeling frustrated. Want to make JavaScript more
verbose and unpleasant? Use TypeScript. (Note: After attending ng-conf and using
ES2016 for a while, I may give TypeScript another try at some some point to see
if I like strong typing)

So now what?

In my frustration somehow I came across a new framework that was in the works -
[Aurelia](http://aurelia.io/).

I knew nothing of [Rob Eisenberg](https://twitter.com/eisenbergeffect) or
[Durandal](http://durandal.io/) or anything else he did. I didn't know that he
used to be on the Angular 2 core team and
[he left](http://eisenbergeffect.bluespire.com/leaving-angular/) because he
didn't like the direction things were going.

But when I saw the templating syntax, it just made sense. Want to bind to value?
`value.bind`. What if you just one way binding? `value.one-way` Want to specify
two way binding? `value.two-way` Want to just bind once? `value.bind-once` What
if you want to bind to src of an anchor tag? `src.bind`

Just carry that pattern where ever you need to.

So that led me down a path of learning more about Aurelia - and I like what I
see.

Anothor choice I briefly considered was [Ember](http://emberjs.com/). I've heard
good things about ember.js, but I have never looked into it because I've often
heard it compared to [Ruby on Rails](http://rubyonrails.org/). I've heard it has
a steep learning curve and it is very opinionated. From what I've seen of
Aurelia, if Ember was like RoR, I would compare Aurelia to
[Django](https://www.djangoproject.com/). You use convention over configuration
to save you time and help you manage your project, but if you need to step out
of the framework, you can.

Also, one more choice I briefly considered was
[Meteor](https://www.meteor.com/). I suppose if I were started a new project
from scratch, I would probably go with Meteor as it gives you so much out of the
box. But I wouldn't use Blaze. I would opt for Angular or React for templating.
Blaze just doesn't give you much. But whereas I am starting a new project with a
back-end in place and many existing APIs, I think Aurelia is a better choice.

So today at work we spent a couple of hours deliberating the pros and cons of
Angular 2, Aurelia and React. We even went so far as to rate various benefits
and provide rankings to them such as syntax legibility, learnability, community,
etc. Our scores looked something like this:

```text
Angular 2: 487
Aurelia: 649
React: 656
```

Our data based decision would point us to React. But then we did a straw poll. 7
people voted and these are the results:

```text
Angular 2: 0
Aurelia: 5
React: 2
```

So the decision has been made. We will be starting two new projects in Aurelia.
