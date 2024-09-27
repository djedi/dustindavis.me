---
slug: from-gatsby-to-11ty
title: From Gatsby to 11ty
date: 2024-09-24
author: Dustin Davis
description:
  A brief overview of moving my blog from Gatsby to 11ty, highlighting the
  simplicity and speed of 11ty compared to Gatsby.
categories:
  - 11ty
  - Gatsby
  - JavaScript
banner: ./images/gatsby-to-11ty.png
bannerCredit: Image created by [Midjourney](https://midjourney.com/)
---

Well, I finally did it. I've moved [this blog](./goodbye-wordpress) from
[Gatsby](https://www.gatsbyjs.com/) to [11ty](https://www.11ty.dev/). You
probably won't notice any difference. That was my goal.

The catalyst was writing my last blog post. There are things that have stopped
working in dev mode and they are getting harder to fix as the npm packages get
older. Gatsby was woefully out of date and I figured that in the time it would
take me to get everything upgraded, I could just start over with 11ty.

One of the main reasons I chose 11ty was its flexibility. Unlike Gatsby, which
is heavily tied to [React](https://reactjs.org/), 11ty allows you to use
whatever templating language you prefer. I opted for
[Nunjucks](https://mozilla.github.io/nunjucks/), which I find intuitive and easy
to work with because of my experience with
[Django](https://www.djangoproject.com/). I was able to reuse all the markdown
files from my old site without any changes except for one - I now use a
shortcode to render images. I just wrote a script to update all the blog posts.
I can continue to use this script to convert any markdown image references to
the new shortcode.

Here is an example of the shortcode, this markdown:

```md
[!Image Alt Text](./path/to/image.jpg) _Caption for Image_
```

becomes this shortcode:

```njk
{% raw %}{% responsiveImage "./path/to/image.jpg", "Image Alt Text",
"custom-class", 720, "Caption for Image" %}{% endraw %}
```

The migration process wasn't without its challenges. I had to rewrite many React
components as 11ty shortcodes as well as other scripts and tooling, which took
some time. [ChatGPT](https://www.openai.com/chatgpt) and
[Claude AI](https://www.anthropic.com) via
[Cody](https://about.sourcegraph.com/cody) were helpful to do many of the basic
tasks. However, this process allowed me to simplify my codebase significantly. I
no longer needed complex state management or [GraphQL](https://graphql.org/)
queries - 11ty's data cascade system proved more than sufficient for my needs.

Another significant improvement was the build time. With Gatsby, my site would
take several minutes to build, even for small changes. Now, with 11ty, the
entire site builds in seconds. This speed improvement has made the development
process much more enjoyable and efficient.

In terms of performance, the switch to 11ty has resulted in a leaner, faster
site - especially while building locally. I really liked the effect of loading
vector images as [SVGs](https://developer.mozilla.org/en-US/docs/Web/SVG) and I
have re-created that effect in 11ty. This is the slowest process as far as build
times go, but I have set up a caching mechanism to mitigate this issue when
building locally.

One major update to the blog that I did in the process was to create scripts to
generate the data from my ["Uses"](/uses) page. Now I have scripts that will
read all the applications and CLI tools that I have installed on my Mac and
generate a data file that 11ty will use to generate the page. I can now just run
this script whenever I want to update the page. As a bonus, to make things even
easier for me, I have integrated it with my [OpenAI](https://openai.com) account
to use AI to get the URL and app description.

Overall, while Gatsby served me well for a time, I'm thrilled with the move to
11ty. Its simplicity, speed, and flexibility align perfectly with my needs as a
blogger and developer. If you're considering a similar move, I highly recommend
giving 11ty a try. The learning curve is gentle, and the benefits are
substantial.

If you are interested in migrating your site from Gatsby to 11ty, I'm happy to
help. Feel free to reach out to me with any questions you may have.
