---
slug: building-an-app-with-ai
title: My Playbook for Building an App with AI
date: 2026-03-02
author: Dustin Davis
description:
  A step-by-step checklist I follow when building a new app with AI — from
  design mockups to deployment to getting found on Google.
categories:
  - AI
  - Development
keywords:
  - AI development
  - app development
  - AI workflow
  - web development
  - Docker
  - mobile app
  - SEO
banner: ./banner.png
bannerCredit: ''
---

I've been building a lot of apps with AI lately. Every time I start a new
project, I find myself going through the same steps. So I put together this
playbook — partly as a reference for myself, partly in case it helps someone
else.

## Start with Mockups

Before writing any real code, I start with design mockups. I'll prompt the AI to
generate basic HTML and CSS of what I want the app to look and feel like, along
with a basic design guide.

This is also where I establish the frontend tech stack. My current favorites:

- **Svelte** — lightweight, reactive, minimal boilerplate
- **11ty** — great for static sites and blogs
- **Go Templates** — simple and fast when paired with a Go backend
- **HTMX** — add interactivity without the SPA complexity
- **Alpine.js** — sprinkle in JS behavior without a build step
- **UnoCSS** — utility-first CSS that's fast and flexible

One tip that saves me a lot of refactoring later: **tell the AI to use Font
Awesome for all icons**. This avoids the mess of inline SVG images scattered
throughout your markup. Getting these foundational decisions right up front
prevents a lot of tedious cleanup later.

## Set Up Authentication

This is the first thing I wire up — before features, before polish. Starting
with auth early means every feature you build after this already has user context
baked in, and you avoid a painful retrofit later.

I usually start with **email and password** to keep things simple. Once the app
is stable, I'll layer on additional methods:

- **Magic links** — passwordless login via email
- **Passkeys** — the future of auth, and AI can help you implement the WebAuthn
  flow
- **Social auth** — Google, GitHub, Apple, etc.

Getting the basics in place first — registration, login, sessions, protected
routes — gives the AI a solid foundation to build everything else on top of.

## Wire It Up

Next, I choose a backend framework and start building the actual functionality.
My go-to options:

- **Bun/Elysia** — fast, TypeScript-native, and generates excellent Swagger docs
  automatically. If you're building a public API, this is a big win.
- **Go** — light and lean. You can run a lot of Go + SQLite apps on a cheap
  shared hosting server.
- **Python/FastAPI** — great for data-heavy apps or when you need the Python
  ecosystem.

One thing I always do: **ask the AI to create Swagger API docs as it builds each
endpoint**. Elysia's auto-generated docs are the best I've seen — if you're
making a public API, that alone is worth considering it.

I also have the AI create a `./dev` script early on that spins up my Docker
Compose dev environment. One command and everything is running — database,
backend, frontend, hot reload. It's a small thing but it keeps the iteration
loop tight and means you don't have to remember a bunch of startup commands.

## Iterate

This is the unglamorous part. Just keep iterating on the build until you're
ready to launch. Fix bugs, refine the UI, add features. The AI makes this loop
fast — you can move through changes quickly without context-switching between
docs and code.

One thing to do during this phase: **ask the AI to write tests as it builds
features**. This is one of the things AI is genuinely great at, and most people
skip it. You don't need 100% coverage — even basic happy-path tests catch a lot
of regressions and give you confidence when you're moving fast.

Depending on the app, I'll also have the AI create a `./test` script with
options for running the full suite, individual tests, or generating coverage
reports. Same idea as the `./dev` script — make the common tasks a single
command so there's no friction.

## Deploy with Docker

When it's time to go live, I deploy using Docker. For the reverse proxy, I use
**Caddy** — it handles SSL certificates automatically, which removes one of the
most annoying parts of deployment.

No messing with Let's Encrypt cron jobs or nginx config files. Caddy just works.

Don't forget **backups**. Especially if you're running SQLite on a cheap VPS,
set up a cron job to back up your database. AI can write this for you in
seconds, and you'll be glad you have it the first time something goes wrong.

## Build Mobile

Here's where things get interesting. By this point, the AI already knows your
app well and you have all your APIs in place. Building a mobile app becomes much
easier.

Your options depend on what you're after:

- **Flutter** or **React Native** — one codebase for both iOS and Android
- **Capacitor** — wrap your existing web app in a native shell with minimal
  effort
- **Swift** — go fully native if you want the iOS look and feel (hello, liquid
  glass)

Since the AI already understands your API layer, it can scaffold the mobile app
quickly using the same endpoints.

## Optimize Your Website

Launching is just the beginning. There's a lot of polish to do after you go
live:

- **Favicon** — generate an icon on [Ideogram](https://ideogram.ai) and convert
  it with a [favicon generator](https://redseam.com/tools/favicon-generator/).
- **OpenGraph images and descriptions** — make sure your links look good when
  shared. Preview them with an
  [OG preview tool](https://redseam.com/tools/og-preview/).
  - Pro tip: have the AI generate an OG preview page with the right dimensions.
    You can click on the element and save it as a node screenshot — much faster
    than fiddling with image editors.
- **Website audit** — ask the AI to audit your site and generate a todo list of
  things to fix or improve.
- **Programmatic SEO** — have the AI plan and build out programmatic SEO pages
  to increase your chances of being found.
- **Blog** — if this is a business, consider adding a blog. You can use
  [OpenClaw](https://openclaw.ai) to automate daily blog posts. I like to use
  Ideogram for blog post images.
- **Theme switcher** — I prefer three options: light, dark, and system settings.
- **Accessibility** — ask the AI to audit your site for a11y issues. It catches
  things like missing alt text, poor contrast, and keyboard navigation problems
  quickly.
- **Error monitoring** — add something like [Sentry](https://sentry.io) or a
  simple error logging endpoint. Analytics tells you who's visiting — error
  monitoring tells you what's breaking.
- **Privacy policy and Terms of Service** — if this is a business, AI can draft
  these in minutes. Easy win that a lot of indie devs skip.
- **Bonus** — related to programmatic SEO, consider adding tools or games to
  your site for additional reach.

## Get Seen

Finally, make sure people can actually find you:

- **Sitemap** — make sure you have a `sitemap.xml` (ideally auto-generated) and
  submit it to
  [Google Search Console](https://search.google.com/search-console).
- **Analytics** — add [Google Analytics](https://analytics.google.com) or
  [Clicky](https://clicky.com) for tracking so you know what's working.

---

That's the playbook. It's not exhaustive, but it covers the key steps I go
through every time. The beauty of building with AI is that each of these steps
goes faster than you'd expect — and the AI carries context from one phase to the
next, so there's very little ramp-up time between stages.
