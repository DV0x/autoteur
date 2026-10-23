# Notes for coding agents

Read `README.md` first. This file is the house rules.

## Commands

```
pnpm install
pnpm dev          # apps/web on :5299
pnpm smoke        # apps/agent smoke test, faux model, no key
pnpm test
pnpm typecheck
```

## Rules

- Never commit or push. The owner commits. Before a commit, check that nothing under `data/`, no `.env` and nothing token-shaped is staged.
- Keys live in `.env` only, never in code, chat or logs.
- Every `@earendil-works` package is pinned at exactly 1.4.0, and they move together. pi-durable breaks its API between releases, and a store written by a newer version can't be opened by an older one.
- pnpm keeps dependency install scripts off. Read a script before allowing it, and record why in `pnpm-workspace.yaml`.
- GPU time and paid APIs run only on the owner's explicit go.
- The agent reaches ComfyUI through one tool, `run_workflow(name, inputs)`. It mints the job id itself and asks ComfyUI about that id before it ever submits again.
- `apps/agent` runs TypeScript directly on Node with type stripping. Use only erasable syntax, so no enums and no namespaces, and import local files with their `.ts` extension.
- Write docs and comments in plain words, with no em dashes and no semicolons in the prose.
