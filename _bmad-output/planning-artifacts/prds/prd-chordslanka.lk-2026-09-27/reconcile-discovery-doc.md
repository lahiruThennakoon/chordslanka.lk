# Input reconciliation — autonomous discovery document

**Input:** `_bmad-output/brainstorming/brainstorm-songchords-discovery-2026-09-27/songchords-product-discovery.md`
**Checked against:** `prd.md` and `addendum.md` (this folder)
**Date:** 2026-09-27
**Authority note:** This input is an autonomous (agent-generated) discovery document and ranks **below** the founder's facilitated session. Points superseded by the founder — the 30-song manual transcription sprint, offline packs as premium, autoscroll-as-trap, deferral of extra tools, and the SongChords name — are excluded and are not reported below even where the PRD contradicts them.

Six carried gaps plus two minor observations. Everything else in the input is either already represented in the PRD, explicitly rejected there with a reason, or rightly superseded.

---

## Gap 1 — Signal loss mid-song has an answer that is not offline mode

**Severity: critical**

**What the input said.** Listed as a named risk ("Dead network at hall blanks chorus → must cache opened arrangement") and built into the play-mode flow: the arrangement is kept on the device *after it is opened*, so a dead spot in a hall cannot blank the chorus (§User journeys 1.8, §UX architecture play flow step 1, §Technical architecture storage, §Key risks).

**Why this is not the rejected offline feature.** The founder rejected offline because an offline reader generates no advertising revenue. Retaining the Sheet a visitor has already opened costs no ad impression — the Discover Surface impression was already served on arrival. There is no catalogue download, no library, no offline browsing, no implied offline promise. The distinction is between *keeping what is on screen alive* and *letting people read songs they never loaded*.

**Where the PRD should carry it.** §4.9 (FR-31). The PRD currently states the opposite — "Song content is fetched from the network, not served from cache when disconnected" — and then flags the consequence as unresolved in OQ-5 and as an `[ASSUMPTION]` in §4.9 that a Sheet on screen may not survive a loss of connectivity. That is the one open question in the document that directly contradicts the product's central promise (never break momentum at the gathering), and the input answers it.

**Suggested fix.** Add a requirement under §4.9: *the currently-open Sheet, including its structure, sections, and Chord Events, remains usable for the duration of the session if connectivity is lost after the Sheet has loaded; Transpose, Capo, Autoscroll, and section jumps continue to work; no other Sheet is available.* Then resolve OQ-5 with that scope and delete the §4.9 assumption. Keep FR-31's "no feature advertises or implies offline availability" consequence intact — session-survival is invisible until it is needed.

---

## Gap 2 — Autoscroll needs manual nudge, not just reduced-motion fallback

**Severity: high**

**What the input said.** Two related findings that survive the autoscroll reversal because they make autoscroll *work* rather than argue against it:
- Failure mode: "Scroll follows a recorded BPM while the singer breathes late" — the singer, not the sheet, sets the pace, and live timing drifts.
- Interaction design: a "huge advance-line zone" for manual advance, section chips for jumps, and speed "set by feel — not BPM typing" (§User journeys 1.6, §UX architecture play flow step 8).

**Where the PRD should carry it.** §4.2, FR-7. The PRD already took the "by feel, not BPM" half — FR-7 is explicitly speed-by-control, which is correct. What it does not carry is recovery from drift *while autoscroll is running*: manual advance appears only as the reduced-motion substitute. A live singer who holds a note for four extra bars leaves the player behind the line with no way to catch up except changing speed, which then overshoots.

**Suggested fix.** Add consequences to FR-7: *the visitor can nudge the Sheet forward or back by a small amount, and drag-scroll freely, while Autoscroll is running; Autoscroll resumes from the new position without resetting speed.* This is a small addition to a requirement that already exists and is the difference between an autoscroll that survives a real performance and one that gets switched off in the first chorus.

**Related, same section.** The input also specifies where the reading line should sit: "current line high enough after glance down; next line as preview only" (§UX architecture play flow step 4). The PRD's §10 says the Sheet is reverently plain but says nothing about *where the line being played sits on the screen*. Worth one line in §4.2 or handing to the UX workflow explicitly, because the eye returns from the fretboard to a fixed place.

---

## Gap 3 — Nothing records which recording a Sheet matches

**Severity: high**

**What the input said.** The single most-emphasised failure mode in the document: "Chords do not match the version in the room (film, acoustic, live, karaoke)" and "One song is treated as one sheet when hits have multiple arrangements people mean by the title." Its response was a Recording/Version entity carrying source and a version switcher that lets a player "switch version if the room means a different arrangement" (§Problem statement, §Technical architecture domain model, §User journeys 1.3).

**Where the PRD should carry it.** §3 (Sheet definition), FR-3, FR-4. The PRD's provenance is *editorial* provenance — contributed vs ingested, who corrected it, when. It carries no notion of *which* performance a Sheet transcribes, and FR-4 lets a visitor switch between Sheets without requiring that the switcher say how they differ. A visitor facing two unlabelled Sheets of the same song has been handed the incumbent's version maze with less information.

**Note on the founder's constraint.** The 5,000 purchased sheets almost certainly do not record their source recording, so this cannot be a required field. That is an argument for making it optional and human-readable, not for omitting it — the field costs nothing when empty and is the only thing that resolves "this isn't the version we're singing".

**Suggested fix.** Add an optional free-text *version label* to the Sheet in §3 (e.g. "film version", "acoustic", "simplified", "capo 2"), add a consequence to FR-4 that *each alternate Sheet is presented with a label distinguishing it from the Default Sheet, and the switcher is absent rather than unlabelled where only one Sheet exists*, and add to FR-3 that the source recording or arrangement is displayed where known. Also worth adding to §14: "Sheet does not match the arrangement the room knows" is a distinct risk from "chord is wrong" and the Correction path (FR-21) does not address it — the answer is an additional Sheet, not a correction.

---

## Gap 4 — No genre or theme browse doors, which are the cheapest lever on the revenue model

**Severity: medium**

**What the input said.** A local-first genre taxonomy — "film, baila, calypso, pop, choir/worship, campus, oldies, new video hits — map to global genres later" — used as indexable browse doors alongside artist and language, deliberately not as primary navigation tabs (§UX architecture information architecture, §SEO strategy).

**Where the PRD should carry it.** §4.4 (FR-17), §4.11 (FR-34), §9. The PRD has exactly two browse axes: Artist Page and Language Page. Language is a weak axis in a Sinhala-dominant catalogue — it produces one enormous page. That leaves artist as effectively the only internal linking structure, which has to carry FR-34 ("every published Song reachable within a small, bounded number of hops"), SM-8 (pages per session, named in §12 as a top revenue lever), and the "make the ad-bearing journey better rather than longer" resolution in §12.2. One axis is thin for that job.

**Suggested fix.** Add genre or occasion hubs as a third indexable browse axis under FR-17 and as a related-Song source under FR-34, with the taxonomy local-first and deliberately small. Keep the input's constraint that these are SEO and browse doors rather than main navigation, and keep the PRD's existing rule that faceted and filter URLs stay unindexed — a fixed set of curated hubs is not a facet explosion. Worth noting this is close to free: the 5,000 sheets are likely already grouped in a way that seeds it.

---

## Gap 5 — OQ-9 (chord diagrams) already has a cheap answer in the input

**Severity: medium**

**What the input said.** Diagrams appear on a chord's *first appearance in the song or on demand* — "peek", explicitly "not a docked textbook" panel stealing the lyric line — and are shared drawings keyed by chord, tuning, and voicing rather than baked into each song's content (§Feature universe MVP, §UX architecture play flow step 7, §Technical architecture domain model). Rationale: high value for beginners, intermediates survive without, low-to-medium complexity.

**Where the PRD should carry it.** OQ-9 and §6.2. The PRD is not wrong to leave the include/defer decision open, but it frames it as an unanalysed question ("every local competitor has them; the founder never asked") and its §6.2 assumption notes beginners stall without them. The input contains the missing design analysis: the reason diagrams are usually a mistake is that they are docked panels competing with the lyric line, and the peek pattern avoids that at low cost.

**Suggested fix.** Attach the peek design and the shared-asset-per-chord/tuning/voicing note to OQ-9 so the decision is made on this basis rather than re-derived, and state plainly that the cost is one diagram set for standard tuning, not per-song artwork. If the answer stays "defer", record *that* as the reason.

---

## Gap 6 — Interface language versus lyric language is never decided

**Severity: medium**

**What the input said.** A stated product principle: "UI language ≠ lyric language — chrome follows the user; the song stays in its own script" (§Product principles 7).

**Where the PRD should carry it.** §8 (multi-script support) or §13. The PRD's multi-script requirements are about *rendering* Sinhala, Tamil, and Devanagari text correctly and keeping titles in their own script. It never says what language the interface itself is in — buttons, search prompts, empty states, the removal-request route, the submission terms. For an audience that searches in Sinhala and Tamil, that is a real unstated decision, and it interacts with §12.1's audience-mix lever: English chrome is what makes the site legible to the diaspora traffic that is worth several times more.

**Suggested fix.** State the v1 decision explicitly in §8 — most likely English chrome for v1 with Sheet content always in its own script — as a recorded choice with the audience-mix reasoning, rather than leaving it silent. If it is genuinely open, it belongs in §17 as an open question; a downstream UX workflow should not have to guess it.

---

## Minor observations

Two smaller items, recorded without full sections because neither is release-shaping.

- **Chord-vocabulary filter ("songs I can play with the four chords I know").** The input rates this the second capability worth being great at after play, and it is deterministic once Chord Events are structured, which the PRD already requires. One local competitor already offers search by chord count. The PRD does not mention it anywhere — not in scope, not in §6.2's deferral list. **Severity: low**, but it should be a deferral with a stated reason rather than an omission, since it is the natural v2 use of the data model v1 is building anyway.
- **Share links carrying key and capo.** The input describes a share link that opens in the agreed key and capo so a band works from the same shapes, with no account. FR-35 shares the canonical URL only, and §4.11 notes that sharing plus product quality is the entire growth mechanism. **Severity: low** — and it needs care, because FR-33 forbids competing indexable URLs, so key and capo would have to travel as a non-indexed fragment. Worth recording as a v2 idea rather than adding to v1.

---

## Points deliberately not reported

For the record, the following were checked and found already represented, explicitly rejected with a reason, or superseded by the founder's facilitated session, and require no action: the editorial draft/reviewed/verified states and drafts-never-indexed (covered by the Review Queue, approval gates, and FR-33); zero-result queries as transcription backlog (FR-16 and the addendum); deterministic transpose and capo composition including slash chords, respelling, and unparseable annotations (FR-11, FR-12, addendum); structured Chord Events and token-anchored lyric lines (addendum); the anti-pattern of thousands of programmatic chord/key/capo URLs (FR-33); lyrics-removable and the takedown route (FR-36, FR-37, §13.1); contributor terms and multi-language moderation (FR-22, FR-23); no comments or social feeds (§5); no microphone, tuner, or metronome (§5); feasibility-is-not-permission (§13.1); privacy of playing behaviour (§13.3); standard tuning only (§6.2); no ads in play (FR-27, §10, §12.2); and the accessibility floor including colour-independent chord identity and reduced motion (§8).
