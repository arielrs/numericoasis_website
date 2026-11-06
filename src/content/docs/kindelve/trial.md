---
title: "The Warden's Trial"
app: "kindelve"
order: 7
description: "The daily five-minute ladder: the same deep for everyone, how places and ties are decided, and how the server proves a score by replaying it."
---

The **Warden's Trial** is one delve a day, the same for every player, scored on a board.

## The terms

- Five minutes, which is six thousand ticks of simulation.
- The same seed, the same creatures, the same laws for everyone who plays that day.
- One entry a day. The terms are announced on the board before you start.
- A Trial pays echoes by the floor reached, so a day you place badly is still a day worth playing.

Because the deep is identical for everyone, a Trial is the one place in Kindelve where the result
is about the player rather than about the roster.

## Places and ties

The board ranks by the deepest floor reached, then by the tick it was first reached, then by who
sent it first. Ties share a place, so two Wardens who reached the same floor on the same tick both
stand second, and the next Warden stands fourth.

## How a score is proved

A public ranking is worth cheating for, so the board does not take anyone's word for a score.

The game does not send the server a number. It sends the **input log**: every tap, in order, with
the tick it happened on. The server then runs the same delve again, from the same seed, applying
the same inputs on the same ticks, and compares what it reaches against what was claimed.

- Same floor, same tick, same hash: the score is accepted and appears on the board.
- Anything else: the entry is refused, and nothing is kept.

This works because the simulation is written to be exactly reproducible. It uses whole numbers
rather than decimals, a seeded generator rather than the browser's randomness, and it never reads
the clock. Two machines running the same delve cannot drift apart, which means a replay is proof
rather than an estimate.

There is no cheat detection in this, in the sense of a system guessing at intent. There is nothing
to guess: either the log produces the claimed result or it does not.

## Refusals that are not accusations

An entry can be refused for reasons that are nobody's fault, and the game says which:

- **version**: the delve was played on an older build of the game, whose deep differs from the one
  the server now simulates. Reload and the next Trial is fine.
- **duplicate**: that day already has an entry from this device.
- **offline**: the send never arrived. The game keeps the score and sends it again later, and
  sending twice is safe.

## Who is playing now

A small count in the corner shows how many Wardens are in the deep at the moment. The game says it
is here every couple of minutes while the tab is open and in view, and the count is everyone heard
from in the last five minutes.
