# chordslanka.lk — brainstorm intent

## What this is

Output of a facilitated brainstorm session (2026-09-27) run across 25 ideation techniques. Every decision below is the founder's own, drawn out during the session — not proposed by a facilitator. This document is clean input for `bmad-product-brief`, then `bmad-prd`. The earlier working name SongChords is superseded; the product is chordslanka.lk.

## Product in one line

A fast, community-updated chord sheet site for Sinhala, Tamil, Hindi and English songs, built so a guitarist can get through a song in front of people — funded by AdSense.

## The core job

Get through a song at a gathering. Chords are only the means.

- The job is social, not educational. Surviving a song in front of people outranks learn / practice / mastered.
- Entry is a Google search directly to a song page. Users pick up a phone or laptop, search the song name, and open whatever ranks first.
- Therefore: song-page ranking and cold first-load speed are the product. Homepage design matters far less.

## Root problem

Five Whys chain, as derived in session:

1. People screenshot chords → searching again every time is not easy.
2. Repeat searching is slow → any delay kills the enthusiasm of a trip or party singalong. The moment does not wait.
3. During the pause, someone in the group just starts singing, in whatever pitch they landed on.
4. The guitarist is now chasing a key already in the air.
5. Only an experienced player can catch that key fast by ear.

**Root cause: the singer sets the key, not the guitarist, and catching it is a skill gate — years of experience — not a tool.** The product can substitute for that experience.

**Unbuilt implication (not yet a feature):** a key-catching helper that tells a player following a singer who already started which way to move. Original-key default plus transpose plus this root cause point directly at it. Nothing in the current feature list does this. It is the one place the product replaces ear training.

## Locked decisions

- Sheets before AdSense. Convert and publish the catalog first, then enable AdSense on top of real indexed content.
- Ads only before a song opens. Monetize the journey to the song — browse, search, discovery, song metadata, artist, category. Never inside an open sheet, Play, Practice, tuner, or metronome.
- AdSense only. No subscription, no paid tier.
- No offline support. Offline use earns nothing. This reverses an earlier discovery assumption about offline packs.
- PWA, for install and speed only — a fast shell over a live site, not an offline app.
- Original key by default. The original scale is the starting truth, not a user preference. Transpose from there.
- Full readable sheet, visible at once, in readable fonts. Readability is a requirement, not a setting.
- Autoscroll with user speed control is the signature feature. Best-in-class, the thing to be famous for.
- Favourites (add/remove) and user-built themed collections by occasion — wedding, trip, love, mother and father.
- User submissions, plus a suggest-a-correction path. Design a suggestion path, not a complaint channel.
- Languages: Sinhala, Tamil, Hindi, English. (Hindi is new; not in the original brief.)
- Catalog scope: all famous songs in those four languages.
- Product name is chordslanka.lk.

Word-of-mouth pitch the founder wrote: it has the songs, the community keeps it current, transpose, and the best autoscroll of any chords site or app.

## The version-one bet

**How might we make 5000 scanned sheets searchable without typing them all by hand?**

- The founder chose this over UX, ads, or community as the version-one bet.
- Conversion is the gate to everything else. Nothing ships until it is solved.
- The asset already exists: ~5000 chord sheets in Google Drive as JPEG and PDF. Content is not a risk; the format is.
- This is an image-to-structured-chords ingestion problem, not a transcription sprint. It replaces the earlier assumption of a 30-song manual transcription.

## Build sequence

1. Solve the pipeline that converts 5000 JPEG and PDF sheets into structured, searchable text.
2. Publish song pages that rank and load fast from a cold Google search.
3. Then enable AdSense, on discover surfaces only, never on an open song.

## In scope

- Song pages: full readable sheet, original key default, transpose, autoscroll with speed control.
- Keyword search that finds a song fast.
- Favourites and user-built themed collections.
- User song submissions and a suggest-a-correction path.
- Request-a-song (turns a missing song into a demand signal instead of a dead end).
- PWA install and fast load on low bandwidth.
- AdSense on discover surfaces, production-ready: env-configured client and slot IDs, reusable components, reserved space to avoid layout shift, no deceptive placements, `ads.txt` from the real publisher ID, consent documented rather than invented.

## Out of scope

- Offline use of any kind.
- Subscriptions or paid tiers.
- Ads on an open song sheet (or in Play, Practice, tuner, metronome).
- Day-based or event-based framing. Friday or Sunday, the experience is identical.
- **AI song analyser and guitar tuner — explicitly deprioritised.** The founder named both as removable without losing the weekly habit. Catalog, search, favourites, transpose and autoscroll are load-bearing; the tools are not. This contradicts the founder's earlier answer that tools could carry an empty catalog — the cut list is the more truthful signal.

## Non-negotiable UX rules

- Never break momentum mid-song. A mid-song failure kills the moment and must never happen.
- Retention is the absence of frustration, not features. People stay because the app does not annoy them.
- Readable fonts, full sheet visible, no squinting.
- Works on low internet speed. Hard requirement — and in direct tension with ad scripts on every page.
- Outstanding UI/UX or the product has failed, regardless of traffic. Month-one visitor count is not success.
- The song path must be very usable end to end.

## Monetization reality

External research gathered during the session. **Not verified for this specific site** — treat as market context, not as projections.

- Music is an entry-level AdSense niche: roughly 4–10 USD RPM worldwide, driven by ~1.2% CTR and ~0.35 USD CPC.
- Sri Lankan-audience sites reported around 1–3 USD RPM; the same content aimed at US / UK / Canada / Australia readers reported at 5–25 USD. Local-only traffic caps earnings hard.
- The profit levers are audience country mix, pages per session, original written content around the songs, and page speed — **not ad density**.
- CTR above roughly 2% is a risk signal; it can read as accidental clicks.
- Mediavine Journey accepts from about 1000 monthly sessions (Ezoic ~250,000 monthly users for new publishers). A higher-paying network later is a real lever, so AdSense need not be permanent.
- Many Sinhala chord sites already run on AdSense. The model is locally proven; the founder intends to out-earn them.
- Founder's stated top of the ladder: a genuinely good platform for music lovers *and* real AdSense income. Both goals held openly together. This is a revenue-earning product, not a hobby site.

## Risks

**Policy risk — lead item.** Google Publisher Policies prohibit content that infringes copyright, and hold the publisher responsible for user-generated content on ad-bearing pages. Reproducing full lyrics without a reprint licence is the named approval and suspension risk. AdSense guidance for music sites additionally warns against copied lyrics and thin pages. *This is not legal advice; it needs qualified counsel before launch.*

Then:

- **The differentiator is the liability.** Local Sinhala and Tamil repertoire is what makes the site distinct, and it is simultaneously the lowest-RPM traffic (1–3 USD) and the highest policy-risk content (full lyrics).
- **Inherited chord accuracy.** Wrong chords come from whoever made the original sheet. Conversion copies both the chords and the mistakes, so the 5000-sheet bank carries unknown accuracy. This is why the correction path from experienced players is load-bearing, not a nicety.
- **Performance degrades as traffic grows.** More guitarists means more ad income but more load; revenue and speed pull against each other. Implied leverage: static, cacheable song pages so growth raises income without the performance penalty.
- **Unnamed actors.** The founder named other local site owners as the competitive threat but did not name music publishers, rights holders, or Google policy review — any of which can end the site or the ad account.
- **Self-inflicted ad risk.** The founder's own worst-case was ads all over the screen interrupting the song. Ad discipline here is self-imposed; AdSense is both the only income and the main way to ruin the product.

## The move that survives every scenario

**Original written content around each song.** It holds across all four scenario-cross futures:

- If AdSense refuses or suspends → pages are defensible on their own content.
- If traffic stays local (low RPM) → it lifts pages per session, the lever that actually moves revenue.
- If traffic goes international → it ranks in English.
- If AdSense is approved → it creates legitimate ad inventory outside the song sheet.

## Open questions

- **The ingestion pipeline itself.** No method chosen for turning 5000 JPEG/PDF sheets into structured text. This is the version-one bet and it is unsolved.
- **Copyright and licensing posture.** Whether full lyrics are published, licensed, abridged, or omitted. Unresolved and blocking for AdSense.
- **Lyrics-only visitors.** The founder identified people searching for lyrics rather than chords as a large ad traffic source. No decision on whether or how to serve them.
- **Audience country mix.** Research says it is the biggest revenue lever, but no decision on whether to target beyond Sri Lanka.
- **Contributor revenue sharing.** Giveaways and a raffle draw funded by ad income were raised as an idea, never decided — no mechanism, threshold, or timing.
- **The LEARN → PRACTICE → PLAY → MASTERED progression** from the founder's product flow. The flow was recorded, but the primary job was later defined as social, and the AI/ANALYZE branch was deprioritised. Unclear what survives.
- **The key-catching helper.** Identified as the one feature that addresses the root cause. Not on any list, not scoped, not rejected.
- **Moderation model for user submissions**, given publisher liability for user-generated content on ad pages.
- **Consent / privacy implementation** for ads — noted as "documented, not invented," which means it is still to be determined.

## Recommended next step

1. **Technical spike on the ingestion pipeline** — image/PDF to structured chord text at 5000-sheet scale, with an accuracy and cost read. This gates everything.
2. Then `bmad-product-brief`.
3. Then `bmad-prd`.

No production code should be written from this document alone.
