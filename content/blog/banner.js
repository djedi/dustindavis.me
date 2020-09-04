#!/usr/bin/env node
/* eslint-disable no-console */

const fs = require('fs')
const https = require('https')
const request = require('request')

const args = process.argv.slice(2)

exports.getCredits = unsplashUrl => {
  const p = new Promise((resolve, reject) => {
    https
      .get(unsplashUrl, async resp => {
        let data = ''

        // A chunk of data has been recieved.
        await resp.on('data', chunk => {
          data += chunk
        })

        // The whole response has been received. Print out the result.
        await resp.on('end', () => {
          // console.log(data)
          let regex = /twitter:creator" content="([^"]+)/gm
          let m = regex.exec(data)
          const handle = m[1]
          console.log(`handle: ${handle}`)
          regex = /og:title" content="Photo by ([^"]+) on Unsplash/gm
          m = regex.exec(data)
          const name = m[1]
          console.log(`name: ${name}`)
          const description = `Photo by [${name}](https://unsplash.com/${handle}) on [Unsplash](https://unsplash.com)`
          pbcopy(description)
          resolve(description)
        })
      })
      .on('error', err => {
        console.log(`Error: ${err.message}`)
        reject(err)
      })
  })

  return p
}

exports.downloadImage = (url, fileLocation) => {
  download(url, fileLocation, () => {
    console.log('banner downloaded')
  })
}

function download(uri, filename, callback) {
  console.log(`url: ${uri}\nfilename: ${filename}`)
  const modUri = `${uri}/download?force=true&w=1280`
  request.head(uri, () => {
    request(modUri).pipe(fs.createWriteStream(filename)).on('close', callback)
  })
}

function pbcopy(data) {
  const proc = require('child_process').spawn('pbcopy')
  proc.stdin.write(data)
  proc.stdin.end()
}

if (args.length && args[0].startsWith('http')) {
  ;(async () => {
    const desc = await exports.getCredits(args[0])
    console.log(`desc: ${desc}`)
    exports.downloadImage(args[0], './images/banner.jpg')
  })()
}
