---
author: Dustin Davis
comments: true
date: 2017-04-14 20:49:31+00:00
link: https://dustindavis.me/aurelia-sharing-data-components/
slug: aurelia-sharing-data-components
title: Aurelia - Sharing Data Between Components
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
tags:
  - aurelia
  - dependency injection
  - DI
---

Looking back, one of the first issues I ran into in Aurelia is "how do I get my
components to talk to each other?"

This could be parent/child components or sibling components.

It turned out the answer was simply "Dependency Injection" (or DI as you might
see it referred to). But what exactly is dependency injection?

In the post I'm going to try to demystify it.

Basically, whenever I have data I want shared between components, the answer is
to create a separate class and inject this class into each component view-model
where I need it.

It is best explained with a simple example. Check out this
[gist.run](https://gist.run/?id=060f4d1db4bf7679af00296c0fdd8e5b), then I'll
explain it.

#### app.html:

[code lang="html"] <template> <require from="./comp1"></require>
<require from="./comp2"></require>

<comp1></comp1> <comp2></comp2> </template> [/code]

I'm basically including to components, `comp1` and `comp2` and displaying them
on the page. Nothing fancy here.

#### shared-service.js

[code lang=js] export class Shared { constructor() { this.val = 'Initial
value.'; } } [/code]

This is basically my shared class (or service) that I want to inject into each
of my components. You could put all kinds of variables and objects in here to
share, but basically we are just going to use `val` in each of our components.

#### comp1.js

[code lang=js] import {inject} from 'aurelia-framework';

import {Shared} from 'shared-service';

@inject(Shared) export class Comp1 { constructor(shared) { this.shared = shared;
}

setVal() { this.shared.val = 'Component 1 set value'; } } [/code]

Here is our first component view-model. Notice we are importing `inject` from
`aurelia-framework` and our `Shared` class from `shared-service.js`.

You can then use the `@inject` decorator, which is an ES2016 feature, to inject
this class into your view-model class. Notice you need to set it to a class
variable in your constructor. If this pattern looks new to you, don't worry,
you'll get used to it fast in Aurelia, because you'll use it everywhere.

If you prefer not to use the decorator for whatever reason, check out this
[stack overflow example on how to inject with ES5](http://stackoverflow.com/questions/39122600/how-to-inject-dependencies-in-aurelia-without-using-es6-class-feature).

#### comp1.html

[code lang=html] <template> <require from="./comp1child"></require>

  <div>
    Comp1: ${shared.val}<br>
    <button click.delegate="setVal()">Set Value</button>
  </div><br>

<comp1child></comp1child> </template> [/code]

Here you can basically see how I'm including a child component and outputting
the `shared.val` value.

If you look through the other components you will notice they pretty much follow
the same pattern so there is not much else to explain. Basically our shared
class is a singleton that is injected to our component classes.

_Bonus:_ One small thing I'd like to point out is the `comp2child` component.
Notice there is no view model. All we have is `comp2child.html` with no
associated js file.

#### comp2child.html

[code lang=html] <template bindable="val">

  <div>
    Comp2 Child component with no view-model.<br>
    Edit here too: <input type="text" value.bind="val">
  </div>
</template>
[/code]

We are doing this with the `bindable` attribute in the `<template>` tag.

We then pass in the attribute we want to bind when we add the component:
`<comp2child val.two-way="shared.val"></comp2child>`. Notice I'm specifying
`two-way` data binding. If I just used `.bind` it would default to `one-way`
binding and editing the value in the comp2child component would not propagate
back up to the service.

If I were to have a view-model for `comp2child` what would it look like if I
wanted to have a bindable instead of using DI? Something like this:

[code lang=js] import {bindable} from 'aurelia-framework';

export class Comp2child { @bindable val } [/code]
