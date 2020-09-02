---
author: Dustin Davis
comments: true
date: 2017-03-31 15:30:46+00:00
link: https://dustindavis.me/aurelia-replaceable-parts-html-only-templates/
slug: aurelia-replaceable-parts-html-only-templates
title: Aurelia Replaceable Parts & HTML Only Templates
banner: ../banner.jpg
bannerCredit:
  'Photo by [Patrick Fore](https://www.patrickfore.com/) on
  [Unsplash](https://unsplash.com)'
categories:
  - Programming & Internet
---

I've been using [Aurelia](http://aurelia.io) for over a year now. We have been
working on a
[new live event dashboard and scheduler](https://www.verizondigitalmedia.com/solutions/live-streaming/),
which some big clients are beta testing now.

Yet, I continue to learn new things. Yesterday I learned two little template
hacks that I think I will find useful in the future and now, hopefully you will
too.

## HTML Only Templates

So I figured you could have HTML only templates, but I haven't really seen the
need for them up to this point. Most often you will want a template that has
some kind of bindable data. Well, did you know you can add bindables to
templates without using a view-model?

I learned this tip from
[Dwayne Charrington](https://ilikekillnerds.com/about/)'s book
[Aurelia For Real World Applications](https://leanpub.com/aurelia-for-real-world-applications)
(see chapter 7).

In your template tag, you can simply add the `bindable` attribute and pass in a
comma separated list of bindable attrubutes.

[code lang=html] <template bindable="heading, bodyText">
<h1>${heading}</h1>
    <p>${bodyText}</p> </template> [/code]

To use this template, you simply `require` it and pass in your attributes.

[code lang=html] <template> <require from="./my-element.html"></require>
<my-element heading="This is the heading" body-text="This is the bodyText"></my-element>
</template> [/code]

You can see a working example
[here](https://gist.run/?id=044dad26eda6e86aec61b4bd86064b34).

## Replaceable Parts

I talked about HTML only templates first so I could show the replaceable parts
trick without the need of a view-model.

Sometimes you need to replace a whole section of content in a component. You can
do this in various ways. Often I simply use the `<slot>` tag or some other
method like `<compose>`.

But I recently learned about replaceable parts from a
[Pluralsight course by Brian Noyes](https://app.pluralsight.com/player?course=aurelia-fundamentals&author=brian-noyes&name=aurelia-fundamentals-m10&clip=5&mode=live).

If you want to have a section of your component that is replaceable you can add
a template tag with a `replaceable` attribute and a `part` attribute. For
example (comp.html):

[code lang=html] <template>

  <h2>This is a component with replaceable parts.</h2>
  <template replaceable part="repl">This part is replaceable.</template>
</template>
[/code]

To replace the `replaceable` template part, you would include a template tag
within your custom element component and specify the `replace-part` attribute.
Example:

[code lang=html] <template> <require from="./comp.html"></require> <comp></comp>
<comp> <template replace-part="repl"> This part is being replaced. </template>
</comp> <comp> <template replace-part="repl">
<iframe width="560" height="315" src="https://www.youtube.com/embed/dQw4w9WgXcQ" frameborder="0" allowfullscreen></iframe>
</template> </comp> </template> [/code]

Checking out a working example
[here](https://gist.run/?id=99cbbab4a0af26dbf10cfb7d4650fe98).

### Why Replaceable Parts instead of Slots?

From what I
[was told](https://gitter.im/aurelia/Discuss?at=58dea88b7ea420cc4225e66b),
replaceable parts was implemented because of limitations with the Shadow DOM
slots spec. In most cases, using `<slot>` is cleaner and follows the Shadow DOM
standard. But `<slot>` does not allow for dynamic content. Slots cannot be added
or removed dynamically. So, you can't place and `if` binding on a slot, but you
can on a `replace-part`.
