#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs')
const path = require('path')
const readline = require('readline-sync')
const slugify = require('@sindresorhus/slugify')
const tc = require('title-case')

const banner = require('./banner')

let title = readline.question('What is the title of your post?\n')
title = tc.titleCase(title)
let description = readline.question(
  'Give a short description of what the post is about:\n',
)
description = description.charAt(0).toUpperCase() + description.slice(1)
const bannerUrl = readline.question(
  'If you would like an Unsplash banner, enter the URL here:\n',
)
console.log(bannerUrl)
;(async () => {
  const today = new Date().toISOString().split('T')[0]
  const slug = slugify(`${today} ${title}`)

  fs.mkdirSync(path.join('.', slug, 'images'), {recursive: true})
  console.log(`${slug} created`)

  let bannerCredit = 'Photo by []() on [Unsplash](https://unsplash.com)'
  if (bannerUrl) {
    banner.downloadImage(
      `${bannerUrl}/download?force=true&w=1280`,
      path.join(slug, 'images', 'banner.jpg'),
    )
    bannerCredit = await banner.getCredits(bannerUrl)
    console.log(bannerCredit)
  } else {
    fs.copyFileSync('./banner.jpg', path.join(slug, 'images', 'banner.jpg'))
  }

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
bannerCredit: ${bannerCredit}
---

Content`

  fs.writeFileSync(indexPath, content)
})()
