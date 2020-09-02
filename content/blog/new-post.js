#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const readline = require('readline')
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const slugify = require('@sindresorhus/slugify')

let slug = null

rl.question('What is the title of your post? ', title => {
  rl.question('What is the short description? ', description => {
    const today = new Date().toISOString().split('T')[0]
    slug = slugify(`${today} ${title}`)
    fs.mkdirSync(path.join('.', slug, 'images'), {recursive: true})
    console.log(`${slug} created`)

    fs.copyFileSync('./banner.jpg', path.join(slug, 'images', 'banner.jpg'))

    const indexPath = path.join('.', slug, 'index.md')
    const content = `---
slug: ${slug}
title: ${title}
date: ${today}
author: Dustin Davis
description: ${description}
categories:
    - yada
keywords:
    - keyword
banner: ./images/banner.jpg
bannerCredit:
    'Photo by []() on
    [Unsplash](https://unsplash.com)'
---

Content`

    fs.writeFileSync(indexPath, content)
    rl.close()
  })
})
