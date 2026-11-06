---
title: "Saves and devices"
app: "kindelve"
order: 8
description: "Where your progress is kept today, what that means for playing on a second device, and the accounts and cloud saves being built now."
---

## Today: the save is on your device

Kindelve keeps your progress in your browser's own storage, on the device you played on. There is
no account yet, and nothing about your game leaves the device except a Trial entry when you send
one.

What follows from that, stated plainly because it has cost players progress before:

- **Clearing site data for play.kindelve.com deletes the save.** So does "clear browsing data" with
  site data included, and so does a browser reinstall.
- **A private or incognito window keeps nothing** once it is closed.
- **Two browsers are two games.** Chrome and Firefox on the same machine do not share a save, and
  neither do a phone and a desktop.
- The save is never silently discarded by the game itself. A save that fails to load is set aside
  under a backup key rather than overwritten, so a problem costs a conversation rather than a
  month.

If a save matters to you, play in a normal window in a browser you are not in the habit of clearing,
and do not rely on it surviving a device change.

## Being built now: accounts and one save everywhere

The next substantial piece of work is moving the save to a server, so that it is recoverable and so
that one game follows you between devices. The shape of it:

- **A name for your Warden**, which is what the Trial board shows. Until you choose one, the game
  makes one for you from your device's random id, which is where names like "Warden of the Ninth
  Stair" come from.
- **Sign in with an email link or with Google.** No passwords, deliberately: a password is a thing
  to lose, reset and leak, and a game does not need one.
- **Your current save is adopted**, not replaced. The first time you sign in, the game you have
  been playing on that device becomes the game on the account.
- **Guest play keeps working.** A new player starts immediately, with no sign-up, and is asked for
  nothing until they want a second device or the board.

Two devices that were both played while offline from each other are merged field by field rather
than one overwriting the other: creatures and discoveries from both are kept, records take the
deeper of the two, and balances follow the device that wrote last, because only that one knows what
was spent.

Apple and Steam sign-in come later, with the iOS and Steam builds.

## Fresh starts during testing

The game is in open testing, and a few times during it a change to how progress is paced has been
large enough that older saves could not carry over honestly. Those were announced in the game as a
fresh start.

Once accounts exist, this stops. A cloud save cannot be wiped for a balance change, so from that
point every change has to carry old saves forward instead.
