---
slug: ja-mstacks-gatsby-and-11ty
title: JAMstacks - Gatsby & 11ty
date: 2020-10-05
author: Dustin Davis
description: After spending a month migrating two WordPress sites to Gatsby and 11ty, here are a few of my thoughts.
categories:
  - JavaScript
  - Django
  - Gatsby
  - 11ty
banner: ./images/banner.jpg
bannerCredit: Photo by [Harley-Davidson](https://unsplash.com/@harleydavidson) on [Unsplash](https://unsplash.com)
---

Recently I've [converted my blog](goodbye-wordpress) to [Gatsby](https://www.gatsbyjs.com/). In the process, my friends
told me to check out [11ty](https://www.11ty.dev/) as well. So to learn 11ty I decided to convert my
[mom's business website](https://soakers.biz).

The projects were quite different, so it is hard to compare apples to apples. For one, I did a lot of migration of blog
posts in Gatsby. I wrote a few custom scripts to help with this. I started with another blog platform and molded my
layout to match the blog I cloned. After trying to move it to an 11ty blog, it didn't work as well because of the
convention I used for the Gatsby blog. Had I started with 11ty then I don't think it would have been difficult, I would
have just used different conventions.

Gatsby seems more mature with lots of 3rd party plugins. I really like their image transformer. It is silly but that was
the main selling point for me to try it out.

Other than that, I think any further websites I create using the [JAMstack](https://jamstack.org/) will be done in 11ty.
Here are some high-level reasons I preferred 11ty.

- I hate JSX. I'm not saying it is bad or wrong, I just hate working with it. It feels unnatural to me. There is some
  context-switching involved between working with JSX and HTML.
- I love [Nunjucks](https://mozilla.github.io/nunjucks/) (notice the `j` in there - I overlooked that at first). A week
  ago I never thought I'd say that. But then I read somewhere that [James Long](https://jlongster.com/), the creator of
  [Prettier](https://prettier.io/) was the same person who created Nunjucks. It was said that he designed it after
  [Jinja2](https://jinja.palletsprojects.com). From what I understand, Jinja2 was modeled after
  [Django templating](https://docs.djangoproject.com/en/3.1/topics/templates/). Having spent years using
  [Django](/blog?q=Django), all of a sudden it all made complete sense and I felt right at home using Nunjucks.
- It was so easy mixing and matching HTML, Nunjucks, and Markdown. 11ty supports each of these and more and it was so
  simple throwing each of them in as desired.
- I think is really cool that Gatsby generates a [GraphQL](https://graphql.org/) API for you. I'm guessing you can do
  some powerful things with it. But, for what I was doing, it felt like overkill. 11ty's
  [collection system](https://www.11ty.dev/docs/collections/) seems simple and sufficient for most use cases.
- Build times were much faster on my 11ty project. Yeah, my project was smaller, but I think the simplicity of the
  design lends itself to faster builds and deploys.

What I didn't like about 11ty:

- The author seems to be a social warrior and so the header of the website is all about his favorite causes. I like the
  framework, but not all the liberal agendas being supported by the framework.
