---
author: Dustin Davis
comments: true
date: 2017-04-06T19:02:30.000Z
link: https://dustindavis.me/observing-arrays-aurelia/
slug: observing-arrays-aurelia
title: Observing Arrays in Aurelia
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Stanislav Kondratiev](https://unsplash.com/@technobulka) on
  [Unsplash](https://unsplash.com)
categories:
  - Aurelia
tags:
  - aurelia
  - javascript
  - observables
description:
  If you're struggling to observe array data changes in Aurelia, check out these
  code snippets.
---

If you want to observe changes to an array in Aurelia, you can't simply use the
`@observable` decorator as it won't recognize mutations to the array. Instead,
you need to use the `collectionObserver` in the `BindingEngine`.

Example:

```js
import {BindingEngine, inject} from 'aurelia-framework'

@inject(BindingEngine)
export class App {
  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine
    this.data = []
  }

  attached() {
    this.subscription = this.bindingEngine
      .collectionObserver(this.data)
      .subscribe(this.dataChanged)
  }

  detached() {
    this.subscription.dispose()
  }

  dataChanged(splices) {
    console.debug('dataChanged', splices)
  }
}
```

There are some gotchas that you should be aware of though...

In the example above, if you were to replace the value of `this.data`
completely, then your `collectionObserver` will not work, unless you subscribe
again.

If you are always going to replace your array data, then the `@observable` would
work at this point.

As an example, check out this
[gist.run](https://gist.run/?id=14ca3a0e0688ceafb8c145ec5d11566d).

Here is the code for reference:

```js
import {BindingEngine, inject, observable} from 'aurelia-framework'

@inject(BindingEngine)
export class App {
  @observable data2 = []

  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine
    this.data = []
    this.log = []
  }

  attached() {
    this.observeData()
  }

  observeData() {
    if (this.subscription) {
      this.subscription.dispose()
    }
    this.subscription = this.bindingEngine
      .collectionObserver(this.data)
      .subscribe(splices => {
        this.dataChanged(splices)
      })
  }

  detached() {
    if (this.subscription) {
      this.subscription.dispose()
    }
  }

  dataChanged(splices) {
    console.debug('dataChanged', splices)
    this.log.unshift('data changed ' + new Date())
  }

  data2Changed(newVal) {
    console.debug('data2Changed', newVal)
    this.log.unshift('data2 changed ' + new Date())
  }

  addData() {
    this.data.push(new Date())
    this.data2.push(new Date())
  }

  popData() {
    this.data.pop()
    this.data2.pop()
  }

  spliceData() {
    const rand = Math.floor(Math.random() * this.data.length)
    this.data.splice(rand, 1, 'spliced')
    this.data2.splice(rand, 1, 'spliced')
  }

  replaceData() {
    this.data = ['replaced', 'data', 'completely']
    this.data2 = ['replaced', 'data', 'completely']
  }
}
```

You will notice that anytime we are modifying the array of data (if you click
the Add Data, Pop Data, or Splice Data buttons) the `dataChanged()` function is
triggered. The observable `data2` variable is not. If you press the Replace Data
button you will see that the `data2Changed()` function is triggered, and the
`dataChange()` function is no longer triggered on the `data` array changing.

So you may have to come up with a combination of solutions if you want to
observe both the array being replaced and the array being modified. Something
like this:

```js
import {BindingEngine, inject, observable} from 'aurelia-framework'

@inject(BindingEngine)
export class App {
  @observable data = []

  constructor(bindingEngine) {
    this.bindingEngine = bindingEngine
    this.log = []
  }

  attached() {
    this.observeData()
  }

  observeData() {
    if (this.subscription) {
      this.subscription.dispose()
    }
    this.subscription = this.bindingEngine
      .collectionObserver(this.data)
      .subscribe(splices => {
        this.dataModified(splices)
      })
  }

  detached() {
    if (this.subscription) {
      this.subscription.dispose()
    }
  }

  dataChanged(newVal) {
    this.log.unshift('data changed ' + new Date())
    this.observeData()
  }

  dataModified(splices) {
    this.log.unshift('data modified ' + new Date())
  }
}
```

[See an example running here](https://gist.run/?id=305f3752a56d1b3440ebfcaa3933c652).
