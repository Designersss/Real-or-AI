# Real or AI?

A fast, mobile-first guessing game. Can you tell a real photograph from an AI-generated image? Ten rounds, instant reveals, a result worth sharing, and reproducible friend challenges.

## Local development

Requires Node.js 22+ and npm.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite.

```sh
npm run check
npm run deploy
```

Deployment uses Cloudflare Workers Static Assets, configured by `wrangler.jsonc`. Use **Build command** `npm run build` and **Deploy command** `npx wrangler deploy` if deploying from the Cloudflare dashboard. Deployment requires a connected Cloudflare account and project.

## Scope

- Responsive dark/lime design from the approved concept.
- Ten rounds, five real + five AI images, instant answer reveal and result.
- URL-seeded challenges: everyone opening the same link gets the same ten images in the same order, with an optional, unverified friend's score.
- No account, no analytics SDK, no server or AI inference API.
- Local best score and games played, via `localStorage`.
- Share via X, Telegram or link copy.
- Respectful keyboard focus styles, alt text and reduced-motion settings.
- The code and UI are English-first.

## Image catalog — **pre-release**

`src/catalog.ts` contains a **temporary provenance-labelled preview catalog**, currently with **6 generated images and 17 real samples** from [AI-Detect Arena benchmark](https://github.com/AI-Detect-Arena/benchmark-dataset). Image labels come from the upstream dataset folder structure. The app currently hotlinks its public sample images from raw GitHub.

**Not yet the production 40-image catalog.** Before advertising or launching broadly:

1. Verify and document the usage rights for *each image*, especially AI images generated via external model APIs and any upstream photo permissions. Do not assume a repository-level license covers every file.
2. Confirm image identities/provenance and visually inspect the complete catalog.
3. Select 20 real and 20 AI images with comparable subject matter and difficulty, optimize to WebP/AVIF, and self-host.
4. Remove any externally hotlinked samples that aren't cleared for redistribution, and implement a curated editorial credit/source overlay.

The first PR prioritizes working UI and game logic, not final image licensing. **Do not claim it is launch-ready yet.**

## Challenge model

Shared links carry `challenge=v1-<8 hex digits>` and an optional `from=0..10`. The algorithm deterministically samples and shuffles 5 real + 5 AI images. The friend's score is **client-provided and not verified**, intentionally not used for official ranking. Catalog changes that alter the deck must create a new version or retain versioned historic catalogs, or older links could change.

This is a fun game, not a scientific image authentication tool. There is no anti-cheat in the client-only MVP.

## Security / privacy

No accounts, user-generated image uploads, or AI API keys. Sources open with `rel="noopener noreferrer"`. We only store basic personal game stats in the current browser. No user scores are uploaded to a server. External sample image servers may receive standard HTTP request metadata; final self-hosted images will eliminate this dependency.

## Checks

`npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` run in GitHub Actions. A pinned dependency lockfile is the next infrastructure task; this bootstrap PR temporarily runs `npm install` in CI.
