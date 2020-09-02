#!/usr/bin/env node
/* eslint-disable no-console */

const https = require('https')

const args = process.argv.slice(2)
console.log(args)

if (args && args[0].startsWith('http')) {
  const unsplash_url = args[0]
  https
    .get(unsplash_url, resp => {
      let data = ''

      // A chunk of data has been recieved.
      resp.on('data', chunk => {
        data += chunk
      })

      // The whole response has been received. Print out the result.
      resp.on('end', () => {
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
      })
    })
    .on('error', err => {
      console.log(`Error: ${err.message}`)
    })
}

function pbcopy(data) {
  const proc = require('child_process').spawn('pbcopy')
  proc.stdin.write(data)
  proc.stdin.end()
}
