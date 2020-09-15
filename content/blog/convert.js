#!/usr/bin/env node
/* eslint-disable no-console */

const {exit} = require('process')
const frontmatter = require('frontmatter')
const fs = require('fs')
const opn = require('opn')
const path = require('path')
const readline = require('readline-sync')
const yaml = require('yaml')

const banner = require('./banner')

const args = process.argv.slice(2)

if (args.length === 0) {
  console.log('Pass in the path of the WordPress post you want to convert.')
  exit(0)
}

const dirName = path.basename(args[0], '.md')
console.log(dirName)

const content = fs.readFileSync(args[0], 'utf-8')
const parsed = frontmatter(content)

parsed.data.description = readline.question('Short descripton of post:\n')
parsed.data.banner = './images/banner.jpg'

opn(
  `https://unsplash.com/search/photos/${encodeURIComponent(
    parsed.data.title,
  )}?orientation=landscape`,
  {
    wait: false,
  },
)

const bannerUrl = readline.question('Enter unsplash banner url: ')
console.log(bannerUrl)

const imgPath = path.join(dirName, 'images')
console.log(`imgPath: ${imgPath}`)
fs.mkdirSync(path.join(dirName, 'images'), {recursive: true})
;(async () => {
  let bannerCredit = 'Photo by []() on [Unsplash](https://unsplash.com)'
  const bannerPath = path.join(dirName, 'images', 'banner.jpg')
  console.log(bannerPath)
  if (bannerUrl) {
    banner.downloadImage(bannerUrl, bannerPath)
    bannerCredit = await banner.getCredits(bannerUrl)
    console.log(bannerCredit)
    parsed.data.bannerCredit = bannerCredit
  } else {
    fs.copyFileSync('./banner.jpg', bannerPath)
  }

  const indexPath = path.join('.', dirName, 'index.md')
  console.log(indexPath)
  const fullContent = `---\n${yaml.stringify(parsed.data)}\n---\n\n${
    parsed.content
  }`

  fs.writeFileSync(indexPath, fullContent)
})()
console.log(yaml.stringify(parsed.data))

fs.unlink(args[0], err => {
  console.error(err)
})
