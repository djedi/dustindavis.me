---
slug: stop-being-late-for-virtual-meetings
title: Stop Being Late for Virtual Meetings
date: 2021-06-14
author: Dustin Davis
description:
  Tampermonkey script that completely interrupts your workflow to remind you of
  meetings.
categories:
  - JavaScript
  - Tampermonkey
banner: ./images/banner.jpg
bannerCredit:
  Photo by [Andy Beales](https://unsplash.com/@andybeales) on
  [Unsplash](https://unsplash.com)
---

I spent a lot of time in Google Meet (formerly Hangouts). I just counted my
meetings for the week, and I have 27 on the calendar (and I have this Friday
off). When people ask what I do for a living, I used to say I'm a programmer.
Now I say, "I mostly attend virtual meetings."

This post is not really about meetings, their needs, or their effectiveness. It
is about getting there on time. I tend to
[zone out](how-sports-improves-programmer-focus) when I'm in the middle of a
project, and I have effectively learned to ignore the little toaster
notifications that MacOS provides.

I once ran across a nice Chrome extension called
[Checker Plus for Google Calendar™ by Jason Savard](https://chrome.google.com/webstore/detail/checker-plus-for-google-c/hkhggnncdpfibdhinjiegagmopldibha).
There was only one feature that I relied upon. When it was time for a meeting, a
new browser window would open in the middle of my screen to alert me. This
window got in my way and totally interrupted my workflow. I know most people
would hate that, but for me, it was needed to grab my attention and say, "Stop
working! It is time for your 1:1 meeting with your boss."

Unfortunately, our company cracked down on tools that are allowed to access our
Google accounts. Therefore, I can no longer use that extension as it requires
API access to my Google Calendar.

Frustratingly, I found myself being late, or missing meetings altogether again.
It was embarrassing.

So I set out to write a replacement that does the same thing, without the need
to access my Google account. I came up with the following Tampermonkey script:

```js
// ==UserScript==
// @name         Google Calendar Alert Interrupter
// @namespace    http://dustindavis.me/
// @version      0.1
// @description  Interrupt me to get my attention where there is a meeting!
// @author       Dustin Davis
// @match        https://calendar.google.com/calendar/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// @run-at       document-start
// ==/UserScript==

;(function () {
  'use strict'

  var alrtScope
  if (typeof unsafeWindow === 'undefined') {
    alrtScope = window
  } else {
    alrtScope = unsafeWindow
  }

  alrtScope.alert = function (msg) {
    console.log('Intercepted alert: ', msg)

    window.name = 'gcal'
    var newWin = openWindow('', 900, 600)
    var html = `
            <style>
                body {
                    background: #4185f4  }
                section {
                    background: black;
                    color: white;
                    border-radius: 1em;
                    padding: 1em;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin-right: -50%;
                    cursor: pointer;
                    transform: translate(-50%, -50%) }
            </style>
            <section id="go">
                <h1>${msg}</h1>
            </section>
        `
    newWin.document.write(html)
    newWin.document.write('<script/>')

    var g = newWin.document.createElement('script')
    var s = newWin.document.getElementsByTagName('script')[0]
    g.text =
      'document.getElementById("go").addEventListener("click", () => { window.open("", window.opener.name); window.close();})'
    s.parentNode.insertBefore(g, s)
  }

  function openWindow(url, width, height) {
    var myWindow
    var center_left = screen.width / 2 - width / 2
    var center_top = screen.height / 2 - height / 2

    myWindow = window.open(
      url,
      'Title',
      'scrollbars=1, width=' +
        width +
        ', height=' +
        height +
        ', left=' +
        center_left +
        ', top=' +
        center_top,
    )
    myWindow.focus()
    return myWindow
  }
})()
```

## What it Does

This script will basically override the default `alert` function on
`calendar.google.com`. Instead of showing a browser alert message, it will open
a new window - essentially doing the same thing as my other script by getting my
attention.

# Making it Work for You

If you would like to use this script, do the following:

1. Install the [Tampermonkey](https://www.tampermonkey.net/) extension on your
   favorite browser.
2. Install
   [my script - Google Calendar Alert Interrupter](https://greasyfork.org/en/scripts/424597-google-calendar-alert-interrupter).
3. Set up Google Calendar to show alerts in your browser for calendar events.
   You can do this by going to Settings -> General -> Notification Settings. I
   have mine set to alert 1 minute before events. I've found I never need more
   than a 1-minute notice.
4. Keep your calendar open all day. I pin my calendar tab to keep it open.
