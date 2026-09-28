# Addendum — chordslanka.lk

Depth that belongs downstream (architecture, UX, or a technical spike) rather than in the PRD. Nothing here is a requirement; the PRD wins on any conflict.

## Platform choice, as stated by the founder

**Next.js with TypeScript.** Stated during finalize and recorded here as an input to the architecture phase rather than as a decision this document makes. It is consistent with what §8 demands: server-rendered first paint for FR-2, static generation and CDN caching for the cacheability NFR, and a workable progressive-web-app story for FR-30 and FR-31.

Two things the architecture work should settle rather than assume. First, the domain logic — chord parsing, transposition, respelling, capo composition, and Chord Diagram derivation — should be framework-free TypeScript with its own tests, because §8 requires it to be deterministic and covered before release and it must not become entangled with rendering. Second, FR-39 requires an open Sheet to survive losing the network while Transpose, Capo, Autoscroll, and text sizing keep working, which means the Sheet's structured content must be present on the client rather than fetched per interaction. That is a rendering-strategy constraint, not a detail.

## Where the domain logic lives

Implemented at `web/src/domain/chords/` as framework-free TypeScript — `types.ts`, `notes.ts`, `parse.ts`, `transpose.ts`, `diagram.ts`, with tests alongside. Nothing in it imports React, Next, or anything touching the DOM, which is what lets §8's determinism requirement be tested without rendering. The Next.js application lives under `web/` rather than the repository root, because the root already holds the BMad tooling and planning output.

## Chord and lyric representation

The PRD requires that Transpose preserve chord quality, respell toward the target key, keep slash bass notes, and leave unparseable annotations untouched (FR-11). That set of consequences rules out storing chords as display strings, which is the failure mode behind most broken transpose implementations.

Implied shape for the architect to evaluate:

- A **Chord Event** decomposed into root pitch class, quality, extensions, and optional bass pitch class, with the displayed text derived rather than stored.
- A **lyric line** as a token sequence, with Chord Events anchored to token indices rather than character offsets — necessary because lines may switch script mid-line and because grapheme clusters in Sinhala and Tamil do not map to single characters.
- **Unparseable content** retained verbatim with a flag, never normalised or discarded, so an administrator can resolve it later.
- **Sheet revisions** as immutable records, making the published Sheet highly cacheable and making revert (FR-23) a pointer change rather than a reconstruction.

## Transpose and Capo composition

The PRD requires that Transpose and Capo Position compose into a single result (FR-12) rather than being applied as two independent shifts the visitor must mentally reconcile. Worth stating explicitly for the implementer: the visitor expresses intent about the key that should *sound*, plus where the capo physically is; the system solves for the shapes. Implementing them as two additive offsets on the same display is the bug this requirement exists to prevent.

A shared, dependency-free module for this logic keeps a future native client from growing a second, divergent implementation.

## Ingestion approach — candidates for the spike

Unresolved (OQ-3). Options to measure against accuracy and cost per sheet:

- General-purpose document OCR, followed by rule-based parsing to recover chord positions from whitespace alignment. Cheapest; likely weakest on Sinhala script and on chord-over-lyric spatial layout.
- A multimodal model reading the sheet image directly and emitting structured output. Likely strongest on layout and mixed script; per-sheet cost and hallucination risk both need measurement.
- A hybrid: OCR for lyric text, model for chord placement and structure.
- Human-assisted correction as the constant in all three — the PRD mandates approval against the Source Artefact regardless of method (FR-25).

Things the spike must produce: measured accuracy on a representative sample of the actual 5,000 sheets (not clean test data), cost per sheet, throughput, and failure characteristics. Whether errors are loud or silent matters more than the raw accuracy rate, because silent errors reach publication.

Prioritisation input: failed-search data (FR-16) tells you which songs to convert first once the site is live.

## Rendering and caching

Song pages must serve their first Sheet section from the server (FR-2) and must remain cacheable as traffic grows (§8). Because a published Sheet only changes on an administrative action, static generation or long-lived cache with targeted invalidation on publish is the natural fit. This is also the resolution to the founder's observed tension that more traffic means more revenue but worse performance — cheap-to-serve pages break the trade-off.

Drawing the Sheet on a canvas would satisfy neither the server-rendering requirement nor the accessibility floor.

## Advertising integration notes

FR-27 through FR-29 imply:

- Reusable components taking a slot identifier as configuration, with the publisher identifier supplied once at the application level.
- The provider script loaded at most once per page, initialised once.
- Space reserved before content arrives, satisfying the no-layout-shift consequence.
- Graceful degradation when unconfigured, disabled, or blocked — no gaps, no errors, no broken layout.
- A development placeholder occupying the intended dimensions.
- The Play View boundary enforced structurally — for example, advertising components unavailable within that route — rather than by developer discipline.
- `ads.txt` populated from the real publisher identifier once the account exists; never invented.

Provider abstraction: keep the integration behind a thin internal interface so an alternative network remains a configuration change rather than a refactor (§12).

## Fonts and script rendering

§8 makes a Latin-only font that delays or breaks Sinhala, Tamil, or Devanagari rendering a defect. Options: rely on platform fonts that already cover these scripts, or self-host subset fonts. Either way, script coverage must be verified on low-end Android devices, which is where the audience is.

## Search implementation notes

FR-15 requires that native script and romanised spellings both match. Implied: a normalised romanisation field maintained alongside the native title, plus per-language text analysis. Sinhala Unicode normalisation and Tamil normalisation are separate pieces of work, not one shared rule. Artist aliases need their own storage rather than being derived.

## Chord Diagram derivation

FR-40 requires a diagram for any chord without authoring one per Song. Implied approach: derive shapes from the Chord Event's structure against a shared shape library keyed by quality and interval pattern, so a few hundred entries cover the whole catalogue and a new Song adds no content cost.

The subtlety that carries real risk is the capo. FR-12 already separates the key that sounds from the shapes being played; FR-40 requires the diagram to follow the *shapes*. So diagram selection takes the displayed chord, subtracts the Capo Position, and renders the resulting shape with the capo drawn as the nut. Getting this backwards produces a diagram that is confidently wrong, which §14 rates alongside a wrong transposition.

Two further notes. Diagram derivation should live in the same framework-free domain module as transposition, since both are pure functions over the same structure and both need the test coverage §8 demands. And the shape library is a place where a missing entry must yield no diagram rather than a nearest guess, matching FR-11's treatment of chords it cannot parse.

## Interface localisation

OQ-13 settled on an English-only interface with content in its own scripts. The PRD asks that this not become irreversible, which in practice means interface strings live in a single externalised catalogue from the start rather than inline in components. That is a small cost now against a rewrite later, and it keeps the audience-mix lever in §12.1 open.

## Rejected capability — key detection

OQ-1 asked how to help a player find the key a singer already started in. **All options below were rejected and OQ-1 is closed.** They are kept here so the reasoning is not relitigated later.

- A reference pitch the player can sound and match by hand. Cheapest and fully deterministic, but it still asks the player to compare two pitches by ear — the skill the target user does not have.
- An interval helper: the player identifies any one chord that sounds right and the system suggests the transposition that fits. Deterministic and needs no audio, but it still requires recognising a correct chord, which is the same missing skill one step removed.
- Microphone pitch detection. Most direct, and it conflicts with both the no-microphone position in §5 and the browser-reliability concern that removed the tuner from scope.
- Per-song suggested keys as editorial data (for example *usually sung in G for a male voice*). Considered and cut: it is deterministic and cheap, but it is 5,000 more fields to populate by hand and it does not help in the live case.

**The accepted answer instead.** A pro does not compute the key either — they try a chord, hear it is wrong, and adjust, and they are simply fast at it. The product substitutes for experience with cheap iteration rather than detection. Implementation consequences: transpose must be reachable inside Play View by one thumb, a semitone step must re-render with no perceptible pause, repeated steps must not flicker or reflow, and scroll position must survive a transposition. Per-song key memory (FR-13) removes the guessing entirely on the second occasion, which makes local persistence load-bearing rather than a convenience.
