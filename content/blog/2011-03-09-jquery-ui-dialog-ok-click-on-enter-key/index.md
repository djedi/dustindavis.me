---
author: Dustin Davis
comments: true
date: 2011-03-09T18:19:43.000Z
slug: jquery-ui-dialog-ok-click-on-enter-key
title: 'jQuery UI Dialog: OK click on Enter key'
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Volodymyr Hryshchenko](https://unsplash.com/@lunarts) on
  [Unsplash](https://unsplash.com)
categories:
  - JavaScript
tags:
  - ajax
  - dialog
  - jquery
description: Simple jQuery snippet to close a dialog box on enter
---

I use the [jQuery dialog](http://jqueryui.com/demos/dialog/) a lot on the
[inzolo](http://inzolo.com) budget screen. It often contains small forms. After
entering the form data it is natural to hit enter and expect it to submit the
form. The OK button is set to post the form data via ajax. Thanks to
[this stackoverflow post](http://stackoverflow.com/questions/868889/submit-jquery-ui-dialog-on-enter)
I found a simple way to override the enter key so that when the dialog box is
open, it simulates pressing the OK button. I simply added this jQuery snippet to
control all my dialogs that have a form & OK button.

```js
$('#dialog').live('keyup', function (e) {
  if (e.keyCode == 13) {
    $(':button:contains("OK")').click()
  }
})
```
