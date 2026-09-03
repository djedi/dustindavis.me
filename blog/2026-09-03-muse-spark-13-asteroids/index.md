---
slug: muse-spark-13-asteroids
title: 'Muse Spark 1.3 Built Me Asteroids in 26 Seconds'
date: 2026-09-03
author: Dustin Davis
description:
  I gave the Muse Spark 1.3 model from Zen (Free) my standard model test — build
  a single-page Asteroids game — and it shipped a working, sound-effects-and-all
  game in 26.3 seconds.
categories:
  - AI
  - Tools
keywords:
  - Muse Spark
  - Zen
  - OpenCode
  - coding agents
  - LLM
  - Asteroids
banner: ./banner.png
bannerCredit: ''
---

I have a go-to test for new models. Over the past year, every time I hear about
a fresh coding model I feed it some variation of this prompt:

> Create a single page asteroids game in html. save it in ~/Downloads/asteroids.html

It's a great hello-world for a coding model. A single file, no framework, no
network calls, no tests to run — just a self-contained game you can open in a
browser. It exercises game loop logic, collision detection, canvas drawing, and
keyboard handling all in one shot. If a model can nail that in one pass, it's
worth paying attention to.

This week I tried **Muse Spark 1.3** from **Zen (Free)** inside OpenCode. I don't
even remember setting it up — it was just available, so I gave it the test.

## The result

The model generated a complete, working Asteroids game in **26.3 seconds**:

- A canvas-rendered game loop with a wrap-around ship and full keyboard controls
  (W/↑ to thrust, A/D/←/→ to turn, Space to fire, S for hyperspace, P to pause,
  M to mute)
- Asteroids that spawn and split into smaller pieces when shot
- An enemy saucer that shows up starting level 2 and shoots back
- Screen-wrapping physics for the ship, bullets, and rocks
- Particle explosions, parallax starfield, and glowing vector-style visuals
- A score, lives, and level HUD, plus a start/restart screen
- Sound effects generated with the Web Audio API
- Even touch controls for playing on a phone

One prompt, one pass, no follow-up edits. That's the kind of thing that used to
take me a couple of evenings as a hobby project.

## Try it

Here's the game it generated. Open it in your browser and give it a spin:

[**Play the generated Asteroids game**](/static/asteroids.html)

It's a single self-contained HTML file — no dependencies, nothing to install.
Save it and it'll run offline forever.

## Why this test keeps being useful

A coding model can talk a great game about architectures and best practices.
But the single-file game test cuts through that. There's no build step to paper
over gaps and no framework to hide behind. Either the game loop runs or it
doesn't. Either the collision detection works or your ship drifts through the
rocks like a ghost.

Muse Spark 1.3 passed. In 26.3 seconds, which honestly felt like magic for
something that used to take me a real chunk of a weekend.

It's a good reminder that the bar for "good enough to use" keeps moving. A year
ago this test was a slog. Now it's a 26-second side quest I run for fun.
