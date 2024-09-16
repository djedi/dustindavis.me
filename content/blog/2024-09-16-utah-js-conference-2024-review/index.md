---
slug: utah-js-conference-2024-review
title: UtahJS Conference 2024 Review
date: 2024-09-16
author: Dustin Davis
description: "Explore key insights from UtahJS Conference 2024, including React Server Components, vanilla JS web components, DevOps with GitHub Actions, AI-powered features, and real-time hypermedia. Discover cutting-edge tools and techniques shared by industry experts to enhance your JavaScript development skills."
categories:
  - JavaScript
  - TypeScript
banner: ./images/banner.png

---

[UtahJS 2024](https://www.youtube.com/@UtahJS) was very similar in format to [2023](https://dustindavis.me/blog/utah-js-2023-review) - held at the same venue - Megaplex Theaters in Sandy - which I give a 5 star rating!

There are 3 tracks so you can choose the theater/presentation that interests you the most.

## Kent C. Dodds

### [React and the Vanishing Network](https://vanishing-network.epicreact.dev/)

If you have ever attended a conference talk by Kent C. Dodds, you're in for a treat. Even though I have no interest in React still, I chose this track because I always enjoy listening to and watching Kent work.

If you click the title of his talk above, you will be taken to a workshop that you can go through. He covers the progression of multi-page applications, single-page applications, progressive enhancement SPAs, and finally React Server Components.

While nice, I'm still not moving to React any time soon. I still hate JSX. Also, maybe I'm looking at things the wrong way, but how many applications do you really need to focus on making work well with a 3G internet speed or JavaScript disabled? So far in my career, it has been easy enough to assume JavaScript is enabled and it has never been an issue otherwise.

But, another reason I really enjoy conferences is because you can see the tools that presenters are using. One thing that has always impressed me with Kent was how fast he can live code. He gave a shout out to [Cursor AI](https://www.trycursor.com), which made him even faster.

Cursor is interesting. I believe it is based on VS Code so you can use all the same extensions. It has AI built in to recognize the code in your project to give you better code suggestions. From what I saw, it seemed very similar to [Sourcegraph's Cody](https://sourcegraph.com/cody), which I have settled into using on a daily basis.

![[./images/CleanShot 2024-09-16 at 11.13.19@2x.png]]

Another tool or library I heard mentioned a few times in talks, but didn't look into is [TanStack](https://tanstack.com/) and more specifically [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/guides/queries).

## Jo jo

### JavaScript Craftsmanship: Framework-less Async JS Components

This talk was about how to build web components with vanilla JS rather than using a library. There are demonstrations on his [git repo](https://github.com/jojobyte/js-craft).

The coolest thing I learned that was unrelated to his talk was due to technical difficulties he was having. He couldn't get his Linux machine to work with the projector, so he borrowed someone else's Mac. It was clear he was totally lost on macOS. So while he planned to do some live coding, he couldn't really do it on an unfamiliar machine.

Someone in the audience suggested he press period (.) while in his GitHub repo. This opens the project in a VS Code instance. He could then edit and run his code from an online VS Code instance.

Here is another little tip I saw: import the lit html package and with the right plugin, VS Code will highlight HTML code in your JavaScript

  app.innerHTML = html`
    <div>
      <div class="card">
        <div id="lbar"></div>
        <div id="bar"></div>
      </div>
      <div class="card">
        <button id="counter" type="button"></button>
      </div>
      <div class="card">
        <button id="lazy" type="button">Load Async</button>
      </div>
    </div>
  `

## Nate Hearns

### Write once, deploy anywhere

Nate's talk was mainly about React Native and why you should use it to build web apps as well as mobile apps. He said it is really the only technology stack that can do mobile and web in one code base.

I was surprised at this statement because I immediately thought of Flutter. I have tried Flutter and I was able to build web and desktop apps as well as iOS and Android apps. He even mentioned Flutter and said that you can only use it for iOS and Android, so I assume he wasn't aware of its capabilities.

I wasn't sure if he worked for [Expo](https://expo.dev/) or not, but he really pushed this helper library that makes building for iOS and Android more seamless - for a price.

Another library he mentioned that he likes to use is [Shopify Restyle](https://shopify.github.io/restyle/) which is a library for building UI components in React Native.

He mentioned that x.com uses React Native for the web application, but not their mobile applications.

## [Rob Richardson](https://robrich.org)

### Level-up Your DevOps with GitHub Actions and Kubernetes

Rob's presentation started with an empty git repo and he imported a simple .NET web app, then proceeded to manually write a Dockerfile and Kubernetes file and set up hosting for it. The code can be found here:

<https://github.com/robrich/levelup-devops-github-actions-kubernetes>

## Todd Fisher

### Javascript AI Cookbook: Building AI powered product features

Todd showed a lot of examples of how to utilize AI in your applications. He went through demos in this repo: <https://github.com/toddwashere/ai-cookbook-learning/tree/main/api/src/examples>

For simple stuff if you don't want to pay for API usage, use [ollama](https://ollama.com/)

The more details you add to your prompt with examples, etc., the better results you will get.

One example I liked was where they were collecting customer information. They had various questions about the company the person worked for. They updated it so that after the customer entered the URL of their business, they would prompt AI to read the website and pre-populate the other business-related form questions.

## Delaney Gillilan

### Real-time Hypermedia

This talk may not be the most relevant to my day-to-day business, but it was the most interesting to me. Delaney has a background in game development so he is not your standard JavaScript developer and has different opinions on the way things should be done. These are unpopular opinions that I also share - even as a web developer.

For example, he says SPA (single page applications) are a bad idea for the modern web. They either have too much, or too little data. They are optimized for the wrong problem.

He mentioned he got into htmx and Alpine.js. I actually started a project and used these two frameworks with a Django app, as I longed to get back to the classic, simpler way of doing things.

Here is one of my own complaints about modern SPAs. Sure they perform fast - but generally AFTER you wait forever for the app to load! People have come up with creative ways to entertain you while the SPA is loading. Back when everything was being served up by the server a la Django, there may have been a slight delay in page loads, but generally if you needed to go to an app and get something done quickly, you don't spend ten seconds watching loading spinners.

To me HTMX is going back to the way we used to do "Ajax" in web apps, so I was surprised when I first heard about it.

But here is another opinionated statement from Delaney:

HTMX may be a bad idea for the modern web. Everyone seems to be missing the power of hypermedia.

I'll be honest, I haven't even heard of the term "Hypermedia" and I wouldn't even be able to explain it to anyone.

After working with HTMX and Alpine.js, Delaney wrote his own library called [Datastar](https://data-star.dev)

He did a demo showing an interactive training app he built where it had video interactions and you could run commands in the terminal that would also update the tutorial website you were on. It was pretty cool and really fast.

He mentioned he was into NATS, Synadia, and Go and here are some resources:

- [NATS](https://nats.io/)
- <https://gonads.net/>
- <https://www.synadia.com/>

He recommended this YouTube talk: [Immediate Mode vs Retained GUIs](https://www.youtube.com/watch?v=Z1qyvQsjK5Y)

- SPA -- Retained Mode
- Hypermedia == Immediate Mode

## Roei Berkovich

### Beyond the Hype: Facing Micro Frontend Challenges in Large-Scale

Roei talked about how they manage various micro front-ends at his job using various frameworks and tools they use to connect and monitor.

I'll be honest, I zoned out because of the corporate tone of the presentation and perhaps a little PTSD from a previous job.

## Nick Humrich

### You Are the CPU: What CS Can Teach Us About Ourselves to Improve Developer Efficiency

Nick's talk was all about improving human efficiency - not really anything JavaScript or coding related specifically. Here are my notes from some of his slides:

You are your company's most expensive resource. You should be optimized.

DORA Metrics

- Deployment Frequency 1/dev/day
- Error rate < 15%
- Change lead time < 1 hour
- Mean Time to Recovery < 1 hour

We are using CPU cycles on things that are not needed.

Reduce Toil

"Improving daily work is even more important than doing daily work" --Phoenix Project

Reduce Cognitive Load

- Smaller code bases
- Smaller code reviews/PRs
- Smaller feature chunks
- Improve Observability
- Testing
- TypeScript

Some things are better done sync than async because context switching consumes more resources than not.

Reduce Context Switching

- Reduce work in progress
- Focus time for thought-intensive processes
- Get into Flow State

If you could do one thing to improve today: move from large deployment to small deployment: Ship smaller batches

## Lucas Castro

### Getting Started with Passkeys and WebAuthn

Lucas gave a demo on how to set up passwordless authentication with WebAuthn.

In a nutshell, WebAuthn uses a private/public key pair. The server stores only your **public key**. When you authenticate, your device (like a phone, browser, security key, or authentication manager) uses the **private key** to sign a challenge. The server verifies this signature using the **public key** it has. This proves that you have the private key without ever sending it over the network, making it highly secure.

If the user loses access to their **passkey** (private key), they might lose access to the account unless there's a fallback recovery method, like an email or backup method (e.g., another registered device or security key). While this is somewhat true for many forms of authentication (like losing a password), **passkeys** are generally device-specific, so losing a device can be more problematic unless recovery options are in place.

To prevent lockout, it's important to offer fallback options or allow users to register multiple devices for authentication.
