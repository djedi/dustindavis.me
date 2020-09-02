// gatsby remark affiliate link maker
const {URL} = require('url')
const visit = require('unist-util-visit')

function affiliateLinkTransformer({markdownAST}) {
  visit(markdownAST, 'link', linkNode => {
    if (linkNode.url.includes('amazon.com')) {
      const amazonUrl = new URL(linkNode.url)
      if (!amazonUrl.searchParams.has('tag')) {
        amazonUrl.searchParams.set('tag', 'dustindavis-20')
        linkNode.url = amazonUrl.toString()
      }
    }
  })
}

module.exports = affiliateLinkTransformer
