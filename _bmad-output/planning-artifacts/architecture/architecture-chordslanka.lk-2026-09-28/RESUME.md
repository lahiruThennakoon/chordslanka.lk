# Resume here

Paused 2026-09-28 at Lahtlk's request. He is gathering the source chord files
and will say when to continue. Nothing has been committed to the spine yet.

## Restart instruction

Run the `bmad-architecture` skill, intent **create**, and adopt this run folder
rather than starting a new one. Working mode is the **Coaching path** — ask,
let him decide, record why. He prefers one question per turn.

Additional deliverable he asked for: a **visual overview** alongside the spine.

## Inputs

- `../../prds/prd-chordslanka.lk-2026-09-27/prd.md` — final, FR-1..FR-41
- `../../prds/prd-chordslanka.lk-2026-09-27/addendum.md` — mechanism depth
- `./.memlog.md` — inherited constraints already recorded, do not re-decide them
- `{project-root}/_ingestion-samples/` — his sheets land here, for the OQ-3 spike

## Where the conversation stopped

**Decision 1 is open: where does a Sheet live?** Three shapes were put to him.

1. Files in the repository — costs nothing, Git gives FR-23 history and revert
   for free, but publishing needs his computer and visitor corrections have
   nowhere natural to land.
2. Hosted database, pages rendered on request and cached — real admin screen,
   instant publish and unpublish, but he owns the versioning logic.
3. Database as source of truth, pages pre-built and refreshed on publish —
   recommended, because it satisfies §8 cacheability, §13.4 cost and the FR-36
   takedown window together. Cost is more moving parts.

He cancelled the form without choosing, so **ask again on resume**.

**The sub-question that actually decides it, still unanswered:** does he work on
content in batches at a desk, or does he want to publish and correct from his
phone? Desk-only makes the admin side a local script. Phone-first makes it a
real authenticated application.

## Remaining decisions, not yet raised

- How a Song, a Sheet and a Chord Event relate, and which one owns the key
- Where ingestion output sits between extraction and approval
- How the administrative surface is separated from the public site
- Hosting and delivery shape for a solo operator at near-zero cost
- How advertising configuration and consent are held without secrets in source
- Search implementation, given multilingual content and an English interface
