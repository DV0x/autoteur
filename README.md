# Autoteur

A video agent on ComfyUI. You give it a product link and direct the ad on one board, and it makes a finished ad you can post. The first mode is 60 to 90 second cartoon direct-response ads.

Built for Comfy's Open Source Higgsfield challenge, October 2026. Work in progress.

## The idea

The board is the ad itself. Scene cards sit in cut order under a player that always plays the whole ad, and the ad grows on the same cards from a plan to stills, then a voiced animatic, then draft clips, then the final cut. You see and hear the whole ad before you pay for a single clip. You direct with notes in plain words, and every note redoes only what it touches. The images, clips and voice all run as ComfyUI workflows on your own GPU.

## Where things are

| Path | What it is |
|---|---|
| `apps/web` | The board, a Next.js app. It started as the Dreamverse front end from FastVideo, see `NOTICE` |
| `apps/agent` | The agent, on pi-durable, which writes every step to disk so a crash or a closed laptop loses nothing |

## Run it

Needs Node 22.19 or newer and pnpm.

```
pnpm install
pnpm dev          # the board at http://localhost:5299
pnpm smoke        # the agent stack with a fake model, no key needed
pnpm test
pnpm typecheck
```

Keys go in `.env`, copied from `.env.example`. It is gitignored.

## Status

Oct 23. The repo is set up. `apps/web` is still Dreamverse's screen as imported, and the board replaces it next. The agent runs its smoke test and nothing more yet.

## Licence

Apache 2.0, see `LICENSE` and `NOTICE`.
