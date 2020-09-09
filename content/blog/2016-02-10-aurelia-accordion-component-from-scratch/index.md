---
author: Dustin Davis
comments: true
date: 2016-02-10T23:31:56.000Z
link: https://dustindavis.me/aurelia-accordion-component-from-scratch/
slug: aurelia-accordion-component-from-scratch
title: Aurelia Accordion Component From Scratch
banner: ./images/banner.jpg
bannerCredit:
  Photo by [David Vilches](https://unsplash.com/@circvs) on
  [Unsplash](https://unsplash.com)
categories:
  - Aurelia
  - JavaScript
tags:
  - aurelia
description: How to build a simple accordion component in Aurelia
---

As I have been working on a new project in [Aurelia](http://aurelia.io/) the
past few weeks, I've encountered a number of problems. Solutions come that seem
obvious after the fact, but a slow process to get to them.

In this simple tutorial, I show show a simple proof-of-concept I came up with
for an accordion resource component. Hopefully this can give a good example of
components within components, and dependency injection between them.

If you are not familiar with accordions check out the
[jQuery UI accordion demo](https://jqueryui.com/accordion/).

Here are the basic requirements for what I want to build:

- Click on a section title to expand it's associated content area
- If you click on another title, close the section that is currently open
- Open the first section by default. You should never have all sections closed

Let's start with the desired html markup. I would like to create my accordion
like so (app.html):

```html
<accordion>
  <accordion-section title="Section 1"> Content area 1 </accordion-section>
  <accordion-section title="Section 2"> Content area 2 </accordion-section>
  <accordion-section title="Section 3"> Content area 3 </accordion-section>
  <accordion-section title="Section 4"> Content area 4 </accordion-section>
</accordion>
```

So I will need at least two components, `accordion` and `accordion-section`.

My accordion template is simple (accordion.html):

```html
<template>
  <div class="accordion">
    <content></content>
  </div>
</template>
```

Basically I'm just wrapping this component in a div with the class of
"accordion" so I can use this class for CSS. The `<content></content>` tags
basically tell the component to insert whatever markup I put inside my component
tag. In this case, it is each of my `<accordion-section>` tags.

My accordion-section template is also pretty straight forward
(accordion-section.html):

```html
<template>
  <h3 click.trigger="showContent()">${title}</h3>
  <div show.bind="isVisible">
    <p>
      <content></content>
    </p>
  </div>
</template>
```

Notice my bindings here.

- `click.trigger="showContent()"`: this will make a call to show this associated
  content
- `${title}`: display the title of this accordion-section
- `show.bind="isVisible"`: I'll have a variable to set whether this content
  section is displayed

Now on to the view models...

The tricky part of this component is that each `accordion-section` needs to
"talk" to the other `accordion-section`s because when I open one, I need the
others to close.

So I'm going to keep track of all the sections in my `Accordion` view-model and
use dependency injection to inject my parent class into each child class.

So my parent class (Accordion) is pretty simple (accordion.js):

```js
export class Accordion {
  constructor() {
    this.sections = []
  }
}
```

I'm basically creating an empty array named `sections` when I instantiate this
class. I can then use this array in my `AccordionSection` view-model class,
which looks like this (accordion-section.js):

```js
import {bindable, inject} from 'aurelia-framework'

import {Accordion} from './accordion'

@inject(Accordion)
export class AccordionSection {
  @bindable title

  constructor(accordion) {
    this.accordion = accordion
  }

  attached() {
    this.accordion.sections.push(this)
    this.accordion.sections[0].isVisible = true
  }

  showContent() {
    for (let section of this.accordion.sections) {
      section.isVisible = false
    }
    this.isVisible = true
  }
}
```

What's going on here?

First, my imports. I'm importing `bindable` & `inject` from 'aurelia-framework'.
I'm also importing my `Accordion` class and injecting it into my
`AccordionSection` class.

I'm making the `title` variable bindable so that I can read the title attribute
set in our html markup.

When the component is `attached()`, I'm adding this view-model class to the
`Accordion` class `sections` array. I then set the first item in that array to
visible.

In the `showContent()` method (called on the title click) I first set all the
section's `isVisible` parameter to false, then set the clicked section
`isVisible` to true.

That's all there is to this simple component. To see it in action, check out
[this plunker](http://plnkr.co/edit/FGn5RR?p=preview).

Now go build upon this and add some styles and transitions. That's not my
department. ;)
