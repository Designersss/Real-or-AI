# Real or AI?

A fast, mobile-first guessing game: **10 blind rounds**, no correctness feedback until the final score, with a repeatable friend challenge.

## Local development

Requires Node.js 22+ and npm.

```sh
npm install
npm run dev
```

```sh
npm run lint
npm run typecheck
npm run test
npm run build
```

### Cloudflare Workers Static Assets

`wrangler.jsonc` configures a static-assets deployment. Use **Build command** `npm run build` and **Deploy command** `npx wrangler deploy` with Cloudflare.

## UI / game

- Approved black + lime identity; the landing content stays within one viewport on common screen sizes (with natural overflow on extremely small or zoomed screens).
- Home has only logo, hero, Start Game, image collage and minimal stats. The bottom information panels and footer are removed.
- Each round shows a single photo and two choices: REAL or AI. The game is viewport-sized (including mobile and landscape), with the full image preserved using contain fit. Extremely short/zoomed portrait windows can scroll rather than crop the controls.
- Answers advance immediately; **no per-round right/wrong result, no hint, no current score, no class-count display**.
- At the end, users see the final score and can optionally expand **Review Your 10 Answers** for their own picks, labels and sources.
- `makeDeck` produces **3–7 real** and **7–3 AI** in every 10-round run, with category mixing across portrait/animal/scene. A seed determines the composition and order so friends share a reproducible deck.
- Friends' score query value is unverified; not suitable for leaderboards.
- Personal best and number of completed games stay in localStorage.
- No sign-up, inference API or server dependency.

## Image catalog — candidate set, not launch-ready

`src/catalog.ts` now lists **60 distinct images**, 30 REAL and 30 AI. The labels are based on upstream photography and generated-image sets: MIT-licensed faces, CC0 dogs, synthetic scenes labelled MIT and real scenes from Unsplash. The complete source inventory, licensing caveats and attribution notes are in [docs/IMAGE-SOURCES.md](docs/IMAGE-SOURCES.md).

**Important:** image origins and license claims are documented, but the 60 individual images have not yet been manually inspected for difficulty, release suitability or attribution. They are remote-hotlinked from source repositories and Unsplash in the prototype. Before public launch: confirm original licenses and photographers, review realism with human testers, self-host optimized image variants, and check loading on mobile. A permissive dataset README does not by itself prove rights to every included photograph.

## Challenge versioning

Current links: `?challenge=v2-<8 hex digits>&from=<score>`. V1 prototype links are intentionally not accepted because the pool and sampling algorithm changed *before launch*. After launch, add versioned catalogs to keep old shared links stable.

## Quality gates

GitHub Actions runs lint, typecheck, unit tests, build and Chromium viewport E2E across common desktop/mobile sizes. Run `npm run test:e2e` after `npx playwright install chromium` locally. Browser/device QA and source-rights review remain separate release blockers; the current project is a development prototype, not a production-ready photo collection.

## Privacy and security

No account, uploaded image or backend score storage. Each challenge link contains a local seed and an optional unverified score. External image hosts receive ordinary asset requests; self-hosting is planned for release.
