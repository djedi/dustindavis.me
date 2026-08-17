---
slug: stopped-writing-daily-standup
title: I Stopped Writing My Daily Standup from Memory
date: 2026-08-17
author: Dustin Davis
description: How I use Hermes, Obsidian, and Claude Code session history to draft a better daily standup from the work trail I already leave behind.
categories:
  - automation
  - productivity
  - ai
banner: ./images/banner.png
bannerCredit: ''
---

Our team handles daily standup in two parts:

1. Everyone posts a short written update in Slack.
2. We have a quick meeting to discuss blockers and anything that needs a real conversation.

The written report gives everyone an asynchronous overview. The meeting is for the things that are stuck, unclear, or easier to solve together.

This works well, but I had one recurring problem: writing the report from memory.

By morning, I might have worked in several repositories, investigated a Jira ticket, used Claude Code for implementation or research, and asked Hermes to handle another task. Some of that work would be in my Obsidian notes. Some would only exist in an agent session. Small but useful outcomes were easy to forget.

So I built a Hermes skill that drafts my standup from the work trail I already leave behind.

## How the standup skill works

I trigger the workflow by messaging Hermes on Telegram. I can simply say:

> Draft today's standup.

If I already know what I plan to work on, I include that too:

> Draft today's standup. Today I'm finishing ENG-1234 and reviewing the Meet security changes.

That extra sentence makes the `Today` section much more accurate. The agent can infer likely next steps from unfinished work, but an explicit plan is better than a clever guess.

Once triggered, the skill checks three sources.

### 1. Obsidian

I keep a daily work note in Obsidian with two sections:

- `Report`, which contains the standup I paste into Slack
- `Notes`, where I capture useful events during the day

The next morning, the skill reads the most recent daily note, especially the `Notes` section. On Monday it uses Friday as the prior workday instead of pretending Sunday was packed with enterprise software adventure.

Obsidian gives the process a durable human-authored source. It also gives me a place to add context that may not exist in code or agent transcripts, such as a decision made in a meeting.

### 2. Hermes session history

The skill searches my recent Hermes sessions for the previous workday. This includes work I did directly with Hermes and tasks handled by background or delegated agents.

It looks for the request, the actions taken, and the final outcome. It does not treat “I asked an agent to do something” as proof that the thing was completed. A completion claim needs evidence such as changed files, passing tests, a build, a Jira update, an MR, or another concrete result.

That distinction is important. Agent activity is not the same as progress. Sometimes an agent spends twenty minutes learning that the original idea is impossible. Useful, yes. Completed feature, no.

### 3. Claude Code session history

We have an Anthropic business account. The standup skill reads my Claude Code session transcripts, including subagent sessions.

This catches work that would otherwise disappear from the report: research, code reviews, security investigations, test results, generated artifacts, and implementation work delegated to Claude Code.

The skill summarizes the human-sized outcome rather than the agent choreography. Nobody in the Slack channel needs to know that three subagents inspected twelve files and briefly disagreed about a type definition. They need to know what changed and whether it was verified.

## Turning the history into a report

After reading all three sources, the skill reconciles and deduplicates the activity.

The same task might appear in an Obsidian note, a Hermes session, and a Claude Code transcript. It should become one useful bullet, not three increasingly dramatic versions of the same work.

The generated note follows a simple format:

```text
*Friday:*
- Prepared Spanish translation review materials for the PDF report. ENG-1234
- Reviewed the web component security model and documented the main follow-ups.

*Today:*
- Finish the authentication changes and prepare them for review. ENG-5678

*Blockers:*
- 🛑 Waiting on the vendor's DNS records before the email domain can be configured. ENG-9012
```

Hermes writes the draft into a new Obsidian daily note. I read it, make any edits, and copy/paste the report directly into our daily standup Slack channel.

That manual review stays in the workflow on purpose. The agent is good at collecting evidence and producing a first draft. I am still responsible for what I tell my team.

## Why I like this setup

The main benefit is not that AI writes three bullets for me. I could write three bullets.

The useful part is recall.

My work is spread across notes, chat sessions, terminal sessions, repositories, Jira, and multiple coding agents. The skill gathers that fragmented history before it writes anything. I spend my time correcting phrasing or adding context instead of reconstructing yesterday from browser tabs and `git log`.

It also makes our short standup meeting better. The Slack post covers routine progress. The meeting can stay focused on the items marked with 🛑, plus anything that needs a decision.

## A few tips from using it

### Make blockers impossible to miss

I prefix every blocker with the stop-sign emoji: 🛑

It is simple, visually obvious, and easy to scan in a busy Slack channel. I omit the entire blockers section when there are none. A section containing “No blockers” is mostly decorative furniture.

### Link Jira tickets and include the summary

The skill turns ticket IDs into links and keeps a short human-readable explanation beside each one.

A bare `ENG-1234` forces everyone to open Jira just to understand the sentence. A linked ticket with a five-word summary gives readers enough context while still making the details one click away.

### Tell the agent today's plan when you know it

Session history is excellent for reconstructing yesterday. It is less reliable for predicting priorities, especially when meetings or new requests changed the plan overnight.

If I know today's focus, I include it in the Telegram message that triggers the report. My explicit plan takes priority over inferred next steps.

### Use your edits to teach the skill your voice

I did not like the first standup reports the skill produced. They were too verbose, and some of the wording did not sound like me. I spent a lot of time editing them.

For the first couple of weeks, I sent my edited version back to Hermes and asked it to update the standup skill. Each correction became a durable instruction: keep the report concise, use plain language, do not overstate progress, omit an empty blockers section, preserve my Slack formatting, and so on.

I was not fine-tuning the model in the machine-learning sense. I was refining the skill that tells the model how I write these reports. After a couple of weeks, the drafts needed far fewer edits because the workflow had absorbed my preferences instead of starting from a generic idea of what a standup should sound like.

If you build a similar workflow, expect to coach it at first. Do not quietly fix the output every morning and throw that feedback away. Give the edited version back to the agent and let it improve the instructions that produce tomorrow's report.

### Keep a notes section ready for tomorrow

Every daily note ends with an empty `Notes` section. During the day I can add decisions, links, completed work, or context from conversations. That small habit improves the next report more than adding a larger model would.

### Keep a human in the final step

The workflow drafts locally, writes to Obsidian, and stops. It does not post directly to Slack.

I want the speed of automation without giving up the chance to remove noise, fix an incorrect inference, or change the tone before coworkers read it.

## The full loop

The workflow now looks like this:

1. I message Hermes on Telegram, optionally including today's plan.
2. The standup skill reads Obsidian, Hermes history, and my Canary Claude Code sessions.
3. It extracts verified outcomes, ongoing work, and explicit blockers.
4. It deduplicates the activity and links relevant Jira tickets.
5. It writes a Slack-ready report into my daily Obsidian note.
6. I edit it and paste it into the standup channel.
7. Our short meeting focuses on blockers instead of status recitation.

It is a small automation, but I use it every workday. Those are usually the best ones: boring enough to be reliable, useful enough that you notice immediately when they are missing.

If you use coding agents during the day, your chat history is already a rough work log. Turning that history into a standup report is a practical way to make the work visible without adding another tracking ritual.

How are you combining agent history with the tools your team already uses?
