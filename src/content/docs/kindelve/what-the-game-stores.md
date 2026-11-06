---
title: "What the game stores"
app: "kindelve"
order: 9
description: "Everything Kindelve keeps, on your device and on the server, why each item exists and how long it is kept. Written for the open test."
---

This page describes what the game actually stores, as of the open test. It is documentation rather
than a policy: a formal privacy policy and terms of service are published with the first public
release, and they will say the same things in the language that makes them binding.

## On your device

| What | Why |
| --- | --- |
| Your save | The game. Creatures, mutations, relics, echoes, records, deeds, the ledger |
| A delve in progress | So a reload or a put-down phone does not lose the delve |
| Your settings | Language, the look, the lettering size, sound, the menu |
| A random device id | A string like `dev-k3f9qa`, made by the game, used to hold your place on the Trial board |

All of it is in your browser's own storage for play.kindelve.com. None of it is sent anywhere
except as described below.

## On the server

The server holds two things today, and both are tied to the random device id rather than to you.

**Trial entries.** When you send a Trial score, the server keeps the day, the device id, a name
generated from that id, the claimed floor, tick and hash, and the input log it needs to verify the
claim. The input log is the record of your taps, not a recording of you.

**The playing-now count.** While the game is open and in view it says so every couple of minutes.
The server keeps the device id and the moment it last heard from it, so it can count how many
Wardens are in the deep. A device not heard from for a day is deleted.

## What is not collected

No email address, no name, no account, no password, because there is no sign-in yet. No advertising
identifier, because there is no advertising. No analytics in the game, no third-party tracking
scripts, no camera, no microphone, no location, no contacts, and no fingerprinting beyond the random
id the game itself generated.

## The device id, specifically

It is random, generated in your browser, and tied to nothing. It is not derived from your hardware,
your network or anything about you. Two people cannot be told apart by it in any sense other than
"these two Trial entries came from the same browser".

Clearing your site data generates a new one, which also means losing your place on the board.

## What changes with accounts

When accounts arrive, the server additionally holds an opaque account id, the sign-in identities
you attach (an email address, or a Google account id), your Warden's name, and your save. The save
is the same save described above, kept so that it is recoverable and shared between your devices.

Export and delete, both self-service from inside the game, land with accounts rather than after
them. You will be able to take your save out and to delete the account and everything attached to
it without asking anyone.

## Contact

Questions about any of this: [contact@numericoasis.com](mailto:contact@numericoasis.com).
