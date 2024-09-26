---
slug: my-software-easter-eggs
title: My Software Easter Eggs
date: 2024-09-25
author: Dustin Davis
description:
  A developer's tale of implementing humorous easter eggs in a professional
  video clipping tool, featuring Konami code and a snarky Clippy revival.
categories:
  - humor
  - JavaScript
  - yada
banner: ./images/clippy-easter-egg.jpg
bannerCredit:
---

Back when I first started working at [Uplynk](https://www.uplynk.com/), my first
major project was to create an online video clipping tool that would allow our
customers to create clips of their video assets so they could post them on their
social media channels and other platforms.

For example, lets say a new station wanted to create a clip of their weather
report and upload it to [Twitter](https://twitter.com),
[Facebook](https://www.facebook.com), and [YouTube](https://www.youtube.com).
They could load their new program into the video clipping tool and create a clip
of the weather report. The tool would then generate a new video and upload it
the places they had configured to send it.

It was a lot of fun and I was in a whole new world of technology. I had never
really worked with video before and I was learning a lot.

But, this post is about easter eggs!

I added two of them into this system. One of them was found.

My co-worker had ingested a copy of the movie
["Cool As Ice"](https://www.imdb.com/title/tt0101615/) from his DVD into the
system. It was so cringy. I actually watched the whole thing. I started using
that video asset for testing. Initially, while in the early stages of
development, I had it hard-coded to load that movie.

As the project progressed, it didn't make sense to load it. But I still liked
using it to test. So, I put in an easter egg to load it when the
[Konami code](https://en.wikipedia.org/wiki/Konami_Code) was entered.

For those unfamiliar, the Konami code is a famous cheat code that originated in
video games developed by [Konami](https://www.konami.com/). The code is: Up, Up,
Down, Down, Left, Right, Left, Right, B, A. It was first used in the 1986
release of [Gradius](<https://en.wikipedia.org/wiki/Gradius_(video_game)>) for
the NES, where it gave the player a full set of power-ups. The code became
legendary when it was used in
[Contra](<https://en.wikipedia.org/wiki/Contra_(video_game)>), also for the NES,
where it gave players 30 extra lives.

Since then, the Konami code has become a cultural phenomenon, appearing in
numerous video games (even those not made by Konami) and various websites as an
easter egg. It's a nod to gaming culture and often unlocks special features or
humorous content when entered on a website or app.

That is cool and all, but it was never found by the customers.

But here is were the story gets more interesting.

The code name for this project was "Clippy" because it was a video clipping
tool. But, it also paid homage to the
[Microsoft Clippy](https://en.wikipedia.org/wiki/Office_Assistant) character.

Microsoft Clippy, was an animated character that served as an office assistant
for Microsoft Office from 1997 to 2003. Clippy was a paperclip with eyes and
eyebrows, designed to help users by offering tips and suggestions while they
worked in various Office applications.

Clippy was created by Kevan J. Atteberry and was first introduced in Office 97.
The character was Microsoft's attempt to make their software more user-friendly
and interactive. Clippy would pop up with dialogue boxes offering help, often
starting with phrases like "It looks like you're writing a letter. Would you
like help?"

Despite Microsoft's good intentions, Clippy became notorious for being more
annoying than helpful to many users. The character would frequently interrupt
work with unsolicited advice, and its suggestions were often obvious or
unhelpful. This led to Clippy becoming a subject of ridicule and frustration
among Office users.

Due to its unpopularity, Microsoft began to phase out Clippy with Office XP in
2001, where it was disabled by default. By Office 2007, Clippy was completely
removed from the software.

But, thanks to some crafty developers, Clippy was resurrected in the form of a
javascript library called [Clippy.js](https://mklab.eu.org/clippy/).

I added this library and had it give some obvious and obnoxious advice to the
user explaining how to use the system.

The best part, in my humble opinion, was that it would end with a phrase taken
from Nick Burns.
[Nick Burns](http://www.snlarchives.net/Sketches/?Nick_Burns,_Your_Company's_Computer_Guy),
also known as "Nick Burns, Your Company's Computer Guy," is a recurring
character from Saturday Night Live (SNL) portrayed by Jimmy Fallon. He's an IT
technician who is notorious for his condescending attitude and rude behavior
towards his coworkers who need computer help.

Nick Burns is particularly annoying because of his arrogant demeanor and his
tendency to belittle others for their lack of technical knowledge. He often
makes his coworkers feel stupid and incompetent, even when they're asking for
help with relatively simple computer issues.

Here are some examples of the Nick Burn's lines that I would randomly show at
the end of the help routine:

- "Was that so hard?"
- "I can't wait to get my MCSE and get the heck out of here."
- "Shouldn't you be wearing a helmet?"
- "Hey, you know they're training monkeys down at the zoo to use computers,
  maybe I'll sign you up for a class."

Clippy always closed with the same phrase as Nick Burns. "Oh, and by the way...
YOU'RE WELCOME!"

I'll admit, I enjoyed this easter egg so much, that I wanted it to be found. So,
I made fairly easy to get to.

All you had to do to trigger it was to type the word "help" anywhere, anytime in
the app. As soon as you entered that four key combination, Clippy would appear
and give you a little "help".

So, if you were creating a video clip and it happened to have the word "help" in
the clip title for example, Clippy would appear.

But, it wasn't obvious what exactly triggered it. We had a certain customer that
apparently triggered it enough to complain to our support team about it. But,
our support team didn't know anything about it! The customer tried to explain
what was going on, that the Microsoft Clippy character was randomly showing up
and insulting him. Support could not reproduce it.

Support assumed that the customer had a bug on their computer that was
triggering it.

To prove his point, the next time Clippy made his appearance, the customer
whipped out his phone and started recording it. Notice he was looking for the
"zoo" line again, as that one seem to really trigger him.

<iframe width="720" height="405" src="https://www.youtube.com/embed/U7C9T_QL1zU?si=Wk3j1pHj2T7Sz4Gv" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

Support still had no clue what was going on. So they reached out to us and asked
if we had any ideas as to what might be causing this.

I should explain here that this was about 5 years later. I was now managing the
full-stack dev team. This question came to me. I felt a mix of joy, laughter,
and a little fear. When I wrote this, we were still small. The founders thought
the easter egg was funny and didn't care. They had since fully vested and gone
in a new direction. Now we had new management and some of them were a little
pissed off.

So we killed Clippy. We also removed the Konami code in the process. That one
would be a little more scary if someone actually found it because it might have
copyright implications.
