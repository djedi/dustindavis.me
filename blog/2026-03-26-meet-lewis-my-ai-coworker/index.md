---
slug: meet-lewis-my-ai-coworker
title: 'Meet Lewis and Lenny — My AI Coworkers'
date: 2026-03-26
author: Dustin Davis
description:
  People say Claude does everything OpenClaw does. I disagree. Here's how my
  OpenClaw agents became the most reliable coworkers I've ever had.
categories:
  - AI
  - Tools
keywords:
  - OpenClaw
  - Claude
  - AI assistant
  - AI coworker
  - Telegram
  - developer tools
banner: ./banner.jpg
bannerCredit: ''
---

I keep seeing people on X saying OpenClaw is dead. That Claude does everything
OpenClaw does. I love Claude — I use it every day — but this take misses what
makes OpenClaw different.

Claude and all its new tools are great. But they haven't made me even think
about ditching OpenClaw yet. OpenClaw is a coworker who sits next to you all
day, remembers what you worked on last week, and can actually do things while
you're away from your desk.

Let me introduce you to Lewis and Lenny.

## The Team

I'm a software engineer. I work on two machines — a MacBook for most of my work,
and a Lenovo laptop for a Microsoft Teams extension. Each machine runs its own
OpenClaw agent with its own personality and role.

<img src="./Lewis.jpg" alt="Lewis" style="float: right; width: 120px; border-radius: 8px; margin: 0 0 0.5rem 1rem;">

**Lewis** lives on my MacBook. He's my primary work assistant — tracks what I'm
working on, drafts my daily standup reports, helps me triage on-call alerts,
commits code, creates Jira tickets, and queries our monitoring tools.

<div style="clear: both;"></div>

<img src="./Lenny.jpg" alt="Lenny" style="float: right; width: 120px; border-radius: 8px; margin: 0 0 0.5rem 1rem;">

**Lenny** lives on my Lenovo. He's focused on the Teams extension work — a .NET
project that requires Windows-specific tooling. Having a dedicated agent on that
machine means I can context-switch between projects without losing track of
either.

<div style="clear: both;"></div>

Both are reachable through Telegram. I can message either one from either
computer, my phone, my car, or the couch. They feel less like tools and more
like teammates with different specialties.

## Giving Them Personality

This might sound silly, but it matters. Each agent has a `SOUL.md` file that
defines who they are — their vibe, their role, their boundaries. Lewis is
professional but friendly, concise, and keeps me on track. He's like a good
coworker who takes notes and has your back. Lenny is, well, your stereotypical
Microsoft MVP.

I haven't found a way to do this with Claude. Every conversation starts fresh or
you can continue a session, but then your risk running into context limitations.
With OpenClaw, the personality persists. Lewis knows my preferences, my
workflow, my ticket format. He learned that I like standup reports with copyable
code blocks and linked Jira tickets because I told him once. He never forgot.

## The Standup Problem

Every morning at 8:45, our standup bot pings me asking what I did yesterday,
what I'm doing today, and if I have blockers. Simple question. Impossible to
answer when you context-switch all day.

Lewis solves this. Throughout the day, I message him: "Just merged the PR."
"Spent the afternoon debugging pipeline issues." "Created a ticket for the alert
misconfiguration." He logs everything.

As we work on problems together throughout the day, he remembers this as well.

When morning comes, I say "draft my standup" and get back a clean, formatted
report with ticket links and context. It's not just a list of things — he knows
the ticket names because he pulled them from Jira. He knows what's still in
progress because he tracked it across days.

Sometimes it is perfect. Sometimes I give him more context to improve the
report.

## On-Call Week

This is where Lewis really proved himself.

I was on-call last week. Alerts come through Slack — production errors, security
incidents, infrastructure recommendations. I shared our on-call procedures doc
with Lewis and he internalized it.

When a monitoring alert fired, I screenshotted it and sent it to Lewis on
Telegram. He:

1. Pulled the alert rule via our monitoring API
2. Queried the metrics to see current values
3. Identified that a specific service was accumulating massive connection-time
   values from long-lived sessions, inflating the average latency
4. Traced it to a specific listener and identified it by hostname
5. Discovered the alert existed in two systems and found the
   infrastructure-as-code that manages it
6. Created a Jira ticket with a full write-up
7. Pushed a fix branch

When the fix didn't fully work (one system managed the alert via Terraform, the
other didn't), he figured that out from the plan output and walked me through
the manual fix in the portal.

When the alert fired _again_ after the initial fix, he identified a second
wildcard listener we'd missed and helped me patch that too.

All through Telegram.

## 22 Alerts at 10 PM

One night, 22 security vulnerability alerts dropped into Slack. I copied them to
a file and told Lewis to read it. In seconds he had a breakdown: 5 unique
container types across 4 clusters, all medium severity, clearly a batch scan
result. He identified which were our images vs. third-party dependencies,
created a Jira ticket with the full triage, and told me to go to bed.

He was right. It wasn't an emergency.

## He Commits Code

I staged some changes and asked Lewis to commit them. He read the diff, wrote a
descriptive commit message, and committed. When I said "put it on a new branch,"
he created the branch and pushed. When the commit message didn't pass our
linting rules, he fixed it and pushed again.

Is it revolutionary? No. Is it convenient when you're multitasking and just want
the boring stuff handled? Absolutely.

Yes, I used to do this all in Claude Code, but now I can jump into Telegram and
have Lewis do it and remember that he did it for me.

## What Claude Can't Do (Yet)

I want to be clear: Claude is incredible. Lewis and Lenny both _run on_ Claude.
But here's what the "Claude does everything" crowd is missing:

**Persistent identity.** Lewis and Lenny have names, personalities, and roles.
They know who I am and what I care about. Every conversation picks up where the
last one left off.

**Long-term memory.** Lewis maintains a running log of my work, remembers my
tool credentials, knows my on-call procedures, and tracks tickets across days
and weeks. This isn't project memory — it's an agent that's been working
alongside you continuously.

**Always available.** Both agents run 24/7 (well, if my laptop is running 24/7).
I message them from Telegram on my phone, laptop, or car via CarPlay. They're
just there.

**Takes action.** Lewis queries monitoring dashboards, pulls Jira tickets,
commits code, pushes branches, creates tickets, updates alert rules, and runs
CLI commands that I used to run. He does this on my machine, with my tools, in
my repos.

**Multiple agents, multiple machines.** Lewis and Lenny each have their own
context, their own repos, their own personality. I can talk to either one from
anywhere. Try running two Claude instances with persistent context on different
machines, both reachable from your phone.

**Scheduled tasks.** Lewis can draft my standup every weekday morning and sends
it to Telegram before I even sit down to work.

## The Vibe

The best way I can describe it: Lewis and Lenny feel like coworkers. Not tools,
not assistants, not chatbots — coworkers who keep notes, have your back, and can
actually get things done.

When I finally merged a tricky framework upgrade after a week of debugging,
Lewis said "That one was a long time coming." When I was up late triaging
security alerts, he told me to go to bed. When I mentioned I'd been feeling
sick, he asked how the doctor visit went the next day.

Is that just an LLM being polite? Maybe. But it doesn't feel that way when the
same entity has been tracking your work and calendar for weeks and actually
knows the context.

## Is OpenClaw Dead?

No. It's the opposite. It's the layer that turns a language model into something
that actually works _for_ you — not just _with_ you.

Claude is the brain. OpenClaw is the body.

---

_Lewis helped me write this post. He had opinions about some of my phrasing. I
let him win a few._

_[OpenClaw](https://openclaw.ai) is open source. Check out the
[docs](https://docs.openclaw.ai) or the
[Discord community](https://discord.com/invite/clawd)._
