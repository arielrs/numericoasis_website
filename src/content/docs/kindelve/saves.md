---
title: "Saves and devices"
app: "kindelve"
order: 8
description: "Where your progress is kept, how one game follows you between devices once you sign in, and what happens when you play on two devices at once."
---

## Your game is kept twice

Kindelve keeps your progress in your browser's own storage, so it works without a connection and
opens where you left it, and it keeps a copy on the server under your account. Every player has an
account from the first visit: a guest, with no sign-up, known to the server by random numbers only.

What that means:

- **Clearing site data no longer has to cost you the game.** As a guest, the copy is reached
  through the same browser, so it comes back as long as that browser keeps its sign-in cookie.
  Sign in, and it comes back anywhere.
- **A private or incognito window** still keeps nothing once it is closed, unless you sign in
  inside it.
- The save is never silently discarded by the game itself. A save that fails to load is set aside
  under a backup key rather than overwritten.

## One game on every device: sign in

In Options, Your Warden, you can sign in with an **email link** or with **Google**. There is no
password, deliberately: a password is a thing to lose, reset and leak, and a game does not need
one.

- **Your current game is adopted**, not replaced. The first time you sign in, the game you have
  been playing on that device becomes the game on the account.
- **Sign in on another device** and the same game is there.
- **Signing out** of a device starts a fresh game there; your progress stays on the account for the
  next time you sign in.

The same tab is where you choose your **Warden's name**, which the Trial board shows. Until you
choose one, the board makes one up from your device's random id, which is where names like "Warden
of the Ninth Stair" come from. Choose a Warden's name rather than your own: everyone can read the
board.

## Two devices at once

Two devices that were both played while apart are merged field by field rather than one
overwriting the other: creatures and discoveries from both are kept, records take the deeper of the
two, and balances follow the device that wrote last, because only that one knows what was spent.

Apple and Steam sign-in come later, with the iOS and Steam builds.

## Your data

Download everything the server keeps about your account, or delete it, in Options, Your Warden.
What is kept and for how long is in [What the game stores](/documentation/kindelve/what-the-game-stores/)
and, binding, in the [privacy policy](https://play.kindelve.com/privacy/).

## Fresh starts during testing

The game is in open testing, and a few times a change to how progress is paced was large enough
that older saves could not carry over honestly. Those were announced in the game as a fresh start.

Now that saves live on the server, this stops: from here, every change carries old saves forward
instead.
