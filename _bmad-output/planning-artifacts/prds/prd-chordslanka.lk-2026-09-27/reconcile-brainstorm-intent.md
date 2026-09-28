---
title: Input reconciliation — brainstorm intent vs PRD
input: _bmad-output/brainstorming/brainstorm-songchords-facilitated-2026-09-27/ (brainstorm-intent.md + .memlog.md)
checked-against: prd.md, addendum.md
date: 2026-09-27
status: findings only — no PRD edits made
---

# Input Reconciliation — Facilitated Brainstorm → PRD

The memlog is a facilitated session: every `(idea)` entry is the founder's own words. Those entries were treated as primary source with high authority. Below are gaps where the input said something the PRD dropped, weakened, or contradicted. Items the PRD explicitly cut or deferred **with a stated reason** (key-detection/OQ-1, lyrics-only visitors/OQ-6, tuner and metronome, AI analyser, Learn→Practice→Mastered, giveaways/raffle OQ-8) are **not** listed — those were handled correctly.

Nine gaps found: 2 critical, 4 high, 2 medium, 1 low.

---

## GAP-1 — The qualitative success bar is gone: "outstanding UI/UX or the product has failed"

**Severity: CRITICAL**

### What the input said

> "(idea) Yes, and the song path must be very usable, and the UI and UX should be outstanding." — memlog, Yes-And Building

> "(idea) Traffic in month one is not success. If the UX is poor the product has still failed, no matter the visitor count." — memlog, Reverse Brainstorming

> "(idea) Retention strategy stated in feelings: people stick because the app does not frustrate them. Absence of friction is the loyalty mechanism, not features." — memlog, Six Thinking Hats

Intent restated in `brainstorm-intent.md` §Non-negotiable UX rules:
> "Retention is the absence of frustration, not features. People stay because the app does not annoy them."
> "Outstanding UI/UX or the product has failed, regardless of traffic. Month-one visitor count is not success."
> "The song path must be very usable end to end."

### Where the PRD should carry it

§7 Success Metrics and §10 Aesthetic and Tone. Possibly §8 Cross-Cutting NFRs.

### What the PRD actually does

§7 is entirely quantitative and largely traffic- and revenue-derived: SM-1 (speed), SM-3 (songs published), SM-4 (revenue), SM-9 (organic sessions). SM-2 (Play View entry) is the closest proxy for "is it good", but it measures behaviour, not quality. Nothing in §7 states that a poor experience means failure irrespective of those numbers, and no counter-metric encodes "traffic is not success". The word *frustration* does not appear in the PRD. §10 covers three narrow visual decisions (plain Sheet, inviolable Play View, distinct identity) plus a voice line, but it does not carry the founder's blunt pass/fail standard.

This is the single largest qualitative loss. The founder set an absolute quality gate; the numbered-FR structure converted it into a set of thresholds any of which can be hit by a mediocre product.

There is also no requirement or metric covering the **song path end to end** — the PRD decomposes it into FR-1/FR-2 (render), FR-5 (Play View), FR-11 (transpose), FR-14 (search), each individually testable, with no requirement that the whole search-to-playing path holds together. That is exactly the founder's phrasing "the song path must be very usable **end to end**".

### Suggested fix

1. Add to §10 (or open §7) a **Release Quality Gate**, worded close to the founder's own:
   > "Outstanding UI and UX, or the product has failed — regardless of traffic. Month-one visitor count is not success. Retention here is the absence of frustration, not the presence of features: people stay because the site does not annoy them."
   State plainly that this gate can veto a release even when SM-1, SM-3, SM-4 and SM-9 are met.
2. Add a counter-metric **SM-C5: traffic without quality** — SM-9 and SM-4 must not be reported as success while the end-to-end path fails a hands-on review.
3. Add an end-to-end acceptance requirement (candidate FR-39 or a §8 NFR): the complete path — cold Google arrival → song page readable → Play View → transpose → autoscroll → exit — must be walked on a mid-range Android phone on constrained data before each release, with any stall, fumble or dead end treated as release-blocking.

---

## GAP-2 — "Never break momentum mid-song" is cited but never stated, and nothing enforces it

**Severity: CRITICAL**

### What the input said

> "(idea) A mid-song failure kills the momentum, and it must never happen in this app. Momentum is the thing being protected." — memlog, Six Thinking Hats

`brainstorm-intent.md` lists it as the first non-negotiable UX rule:
> "Never break momentum mid-song. A mid-song failure kills the moment and must never happen."

### Where the PRD should carry it

§8 Cross-Cutting NFRs or §10, plus a consequence set on FR-5 / FR-7 / FR-31.

### What the PRD actually does

The principle appears **once**, inside OQ-5, as a back-reference to something the document never established:

> "OQ-5. Connectivity during play. … The current answer — the Sheet may become unavailable — conflicts with the 'never break momentum' principle."

That is the only occurrence. The founder's hardest stated rule exists in the PRD only as a citation inside an unresolved open question. Everything else is partial and incidental: FR-6 (wake lock) protects one failure mode, FR-11 preserves scroll position across transposition, §10 keeps prompts out of Play View. No requirement addresses mid-song failure as a class — a script error, an ad script fault, a session expiry, a re-render, a lost connection, a memory eviction on a low-end phone.

Note the founder derived the whole product from this: the pause is what lets the singer set the key (Five Whys), which is the root cause the product exists to substitute for. Momentum is not one UX preference among several; it is the through-line.

### Suggested fix

1. Add to §8 as a first-class NFR, in the founder's terms: *"Momentum protection. Once a Sheet is on screen, nothing may interrupt it. A mid-song failure is the one class of defect this product treats as unacceptable rather than as a severity rating."*
2. Add consequences to FR-5: an open Play View survives loss of network, an advertising or analytics script failure, and a background/foreground cycle, without losing the Sheet, the scroll position, the Sounding Key, or the Autoscroll state.
3. Resolve OQ-5 against the principle rather than leaving the conflict open: the minimum honest answer is that the currently-open Sheet is held in memory and remains fully usable for the duration of the song after signal is lost — which is *not* offline support (no library, no downloads) and so does not breach §5.

---

## GAP-3 — The founder's dream referral quote, and the "latest songs" promise inside it

**Severity: HIGH**

### What the input said

The founder's own imagined testimonial, from the Disney Method round — the one piece of first-person voice in the entire session:

> "(idea) The dream referral, in the founder's words: **Hey machan, now we do not need to worry. There is chordslanka.lk, it has all the songs we usually need, a community-updated database where we can see the latest songs, transpose, and the best autoscroll feature I have ever seen in any chords site or app.**"

### Where the PRD should carry it

§1 Vision, and §4.11 (FR-35 notes already gesture at it).

### What the PRD actually does

§4.11 refers to it abstractly — "The word-of-mouth moment the founder described — one guitarist telling another at a gathering" — and then treats it purely as a distribution mechanism (share links). The quote itself appears nowhere. Two things carried in it are lost:

1. **"now we do not need to worry."** The emotional promise is *relief* — the guitarist's anxiety about being caught out is retired. The PRD's §2.1 has "Not look incompetent in front of people", which is the fear; it never names the relief as the thing being delivered. §1's vision is competitive and commercial ("an instrument you play with", ad-funded, ranking).
2. **"a community-updated database where we can see the latest songs."** Currency is one of the four things in the founder's pitch — restated in `brainstorm-intent.md` as "the community keeps it current". The PRD's catalogue is 5,000 *historical* scanned sheets; §15 and §16 correctly identify the incumbent's staleness as the opening, but **no requirement makes new or recent songs visible or prioritised**. §9 mentions "recent additions" on a home page the PRD itself says most visitors never see. There is no FR for new-release intake, no surfacing of recency on Discover Surfaces, and no metric for catalogue freshness. The differentiator the founder named second is unrequiremented.

### Suggested fix

1. Quote the referral verbatim in §1 as the product's own definition of success, and add the relief framing to §2.1 as the emotional job: *"stop worrying about whether I can pull a song off when asked."*
2. Add an FR under §4.4 or §4.11: recently added and recently corrected Songs are surfaced on Discover Surfaces (home, Artist Page, Language Page) with their date, and Submissions that add currently-popular songs are prioritised in the Review Queue.
3. Add a freshness metric to §7: Songs published in the last 30 days, and median age of the newest ten Songs — the direct counter to the incumbent's "fifteen songs in six months" weakness the PRD itself identifies.

---

## GAP-4 — "Sheets before AdSense" was a locked sequencing decision; the PRD bundles them

**Severity: HIGH**

### What the input said

This was resolved explicitly in session after the founder's two answers collided:

> "(insight) Tension to resolve: the chosen version-one bet was converting 5000 scanned sheets, but the chosen first move is enabling AdSense. AdSense approval needs real indexed content, so the two compete for the same month."
> "(decision) **Resolved order: the sheets go first. Convert and publish the catalog, then enable AdSense on top of real content.**"

`brainstorm-intent.md` records it twice — as the first locked decision ("Sheets before AdSense") and as the three-step build sequence: convert → publish pages that rank → *then* enable AdSense.

### Where the PRD should carry it

§6 MVP Scope, §12, and the FR-29 consequences.

### What the PRD actually does

§6.1 lists ingestion (FR-24–26) and AdSense (FR-27–29) as peers in one undifferentiated MVP bundle. §7 SM-4 says revenue is "Tracked from first serving", with no statement of when first serving is permitted. FR-29 provides a global advertising off switch — the mechanism for the founder's sequencing — but no requirement says the switch starts **off** and what condition turns it on. §13.1 and §14 both treat a policy action as existential, which makes the sequencing a risk control, not a preference: applying for AdSense over a thin or empty catalogue is precisely the "thin pages" failure the research flagged.

The PRD does not contradict the decision in words, but by flattening it into a scope list it drops a locked ordering constraint that guards the business's only revenue channel.

### Suggested fix

1. Add to §6 an explicit **release ordering** subsection stating the founder's three steps, and record that advertising ships disabled.
2. Add a consequence to FR-29: advertising is disabled by default and is enabled only after a stated threshold of published, indexed Songs is met — with the threshold named (tie it to SM-3 and to §13.2's "depth of catalogue at launch" argument).
3. Add the ordering to §14 as the mitigation for the AdSense-refusal risk row.

---

## GAP-5 — "Best autoscroll of any chords site or app" is the signature feature, but FR-7 specifies a generic one

**Severity: HIGH**

### What the input said

> "(idea) The phone shows lyrics with chords clearly, with auto-scroll the user can speed up or slow down."
> "(insight) **Autoscroll is the feature the founder wants to be famous for.** Earlier discovery treated autoscroll as a trap; the founder treats it as the signature."
> "…and the best autoscroll feature I have ever seen in any chords site or app." — founder's referral quote

`brainstorm-intent.md`: "Autoscroll with user speed control is the signature feature. **Best-in-class, the thing to be famous for.**"

### Where the PRD should carry it

FR-7's testable consequences.

### What the PRD actually does

FR-7's consequences describe a competent, ordinary autoscroll: adjustable while running, immediate effect, persisted speed, thumb-reachable, no auto-start, reduced-motion respected. Every one of those is table stakes. The ambition is carried only as prose — a `[NOTE FOR PM]` saying it "should be treated as the quality bar for the whole release" — which is a note, not a requirement, and nothing downstream can test against it.

This is the classic FR-structure loss: the founder's one "famous for this" feature is now indistinguishable in specification from FR-9 (section jumps). An implementation that satisfies every FR-7 consequence could still be worse than the competitors', because none of the qualities that make autoscroll *feel* good are specified: smoothness (sub-pixel, no judder, no frame stutter on a low-end Android), fine-grained speed resolution, whether speed can be set by feel from a song's tempo, nudge-without-losing-place, behaviour at the end of a Sheet, and interaction with a manual scroll mid-song.

### Suggested fix

Add testable consequences to FR-7 covering: continuous sub-pixel advance with no visible stepping or judder on a mid-range Android device; speed adjustable in increments fine enough that no step feels like a jump; a manual scroll during Autoscroll repositions without stopping it and without resetting the speed; Autoscroll survives a transposition and a text-size change without losing position; and defined, non-jarring behaviour at the end of the Sheet. Add a comparative acceptance test: side-by-side against `slchords.com`'s full-screen view and the leading chord apps, with "visibly better" as the pass condition, since that is literally the founder's claim.

---

## GAP-6 — "This is everyone's place and sharing is loving music"

**Severity: HIGH**

### What the input said

> "(idea) Users should be able to submit songs too. **The feeling to create is that this is everyone's place and that sharing is loving music.**" — memlog, Morphological Analysis

Note the founder's exact framing: *the feeling to create*. This was stated as an emotional design target, not a feature request.

### Where the PRD should carry it

§4.6 description, §10, and the FR-21/FR-22 acknowledgement consequences.

### What the PRD actually does

§4.6 takes half the phrase — "everyone's place, nothing published unreviewed" — and welds it to the moderation constraint, which inverts the founder's meaning: an invitation becomes a gate. "Sharing is loving music" is dropped entirely, and §10 carries nothing about how contribution should feel. The functional path is complete (FR-21, FR-22, FR-23, plus credit via FR-3 and "contributor, not complainant" in UJ-4), so the mechanism survives while the warmth does not. §5 further hardens it — "No social network… Corrections replace arguments" — which is a correct scope boundary but pushes the same direction.

The risk is concrete, not cosmetic: the PRD's own §13.1 requires contributors to affirm legal terms before a Submission is accepted, and §14 depends on Corrections arriving at volume to fix inherited chord errors. A contribution flow designed as a liability funnel will not produce that volume.

### Suggested fix

1. Restore the founder's phrasing in §4.6: *"The feeling to create is that this is everyone's place, and that sharing is loving music."* State that review protects the reader, and must never read to the contributor as suspicion.
2. Add to §10 a voice rule for contribution surfaces: thanks before terms, plain language for the rights affirmation, and acknowledgement worded as welcome rather than receipt.
3. Add consequences to FR-21/FR-22: the contributor is thanked by name where given, told what happens next and roughly when, and told the outcome — accepted or not — rather than only being credited on acceptance.

---

## GAP-7 — The prohibition on day-based and event-based framing is missing from Non-Goals

**Severity: MEDIUM**

### What the input said

> "(idea) **The beginner should not care which day it is. Friday or Sunday, the experience is the same. No day-based or event-based framing.**" — memlog, Role Playing

`brainstorm-intent.md` lists it under Out of scope: "Day-based or event-based framing. Friday or Sunday, the experience is identical."

### Where the PRD should carry it

§5 Non-Goals.

### What the PRD actually does

Nothing. §5 lists eight non-goals; this prohibition is not among them, and no requirement enforces it. It is a silent omission — the founder stated it as a rule, the PRD neither adopts nor rejects it. §9's home surface ("recent additions, most-played") is consistent with it today, but nothing prevents a downstream UX workflow from building seasonal homepages, Christmas or Vesak collections, weekend merchandising, or "songs for tonight" framing, all of which are natural ideas that the founder pre-emptively ruled out.

Worth distinguishing: user-built Collections *by occasion* (Wedding, Trip) are explicitly wanted — that is the user grouping their own songs. The prohibition is on the **product** framing the experience by day or event.

### Suggested fix

Add to §5: *"This is not an occasion or calendar product. The experience is identical on a Friday and a Sunday. No seasonal theming, no event-based homepages, no time-of-day framing, no 'songs for tonight'. Occasion-based grouping belongs to the visitor via Collections (FR-19), never to the site."*

---

## GAP-8 — Hindi silently drops out of the search requirements

**Severity: MEDIUM**

### What the input said

> "(idea) Catalog scope: all famous songs across Sinhala, Tamil, **Hindi** and English. Hindi is new; it was not in the original brief." — memlog, Morphological Analysis

`brainstorm-intent.md`: "Languages: Sinhala, Tamil, Hindi, English."

### Where the PRD should carry it

FR-15, §2.1, §6.1.

### What the PRD actually does

The PRD handles Hindi inconsistently:

- §8 correctly requires Devanagari to render in first paint.
- FR-23 correctly requires moderation across "Sinhala, Tamil, Hindi, and English".
- §6.2 explicitly defers *catalogue parity* for Hindi and Tamil with a stated reason — that deferral is fine and is not a gap.
- But **FR-15 covers only "Sinhala or Tamil script"**, and §6.1's scope line reads "Search across Sinhala, Tamil, and English including romanisations". §2.1's finding job says "in Sinhala script, Tamil script, or romanised spelling".

Catalogue parity being deferred is a content decision; script and romanisation support in search is a platform capability, and §6.2 itself says "the Languages are supported by the platform from day one". So the PRD states platform-level support for four languages while its search requirements specify three. Devanagari romanisation ("Hinglish") is a distinct piece of work from Sinhala and Tamil normalisation — the addendum's search notes already say each language is separate work — so this will not be picked up by accident.

### Suggested fix

Extend FR-15 and its consequences to Devanagari and common Hinglish romanisations, and correct the §6.1 and §2.1 wording to four languages. If Hindi search is genuinely being deferred, say so explicitly with a reason rather than letting it fall out of the list.

---

## GAP-9 — Two founder statements about ads on the song page; the PRD picks one without saying so

**Severity: LOW**

### What the input said

Two entries that do not fully agree:

> "(direction) …ads only on discover surfaces (home, search, **song metadata**, artist, category), never inside Play, Practice, tuner, or metronome." — memlog, AdSense brief
> "(decision) Resolution of the ad contradiction: ads only in suitable places, and **once a song is selected nothing interrupts the user. The ad zone is everything before the song opens.**" — memlog, TRIZ Contradiction

### Where the PRD should carry it

§4.8 description and the Glossary entry for Discover Surface.

### What the PRD actually does

The Glossary defines a Discover Surface to include "the non-sheet portion of a song page", and §4.1 permits advertising "around the page furniture" of a song page. That follows the earlier AdSense brief ("song metadata") and is defensible — but the founder's later and more emphatic framing was that the ad zone is *everything before the song opens*, and a song page is after the song was selected. The PRD resolves the ambiguity in the revenue-favourable direction without noting that two founder statements existed, and §12.2 — which is otherwise admirably explicit about the trade it is making — does not mention this one.

Not a contradiction of a locked decision, and the later TRIZ resolution came after the AdSense brief, so the reading is arguable. But it is an unflagged choice on the founder's most guarded boundary.

### Suggested fix

Add one line to §4.8 or §12.2 recording that the founder said both things, that the PRD reads "the song opens" as entering Play View rather than landing on the song page, and that the boundary holds only if advertising on the song page never sits adjacent to or above the Sheet body. Cheap to state; it lets the founder correct the reading before UX builds against it.

---

## Correctly handled — checked and not reported

Recorded so a later pass does not re-raise them: key-catching helper (OQ-1, cut with full reasoning in §4.3 and the addendum); lyrics-only visitors (OQ-6, cut with reason); tuner, metronome and AI analyser (§5, per the founder's own cut list); Learn→Practice→Mastered (§2.2 and §6.2, deferred with a PM flag); giveaways and raffle (OQ-8, deferred); offline (§5, matches the founder's reversal); AdSense-only monetisation; original key default (FR-10); full readable sheet and readable fonts (FR-1, FR-8); transpose (FR-11); favourites and occasion Collections (FR-18, FR-19); suggest-a-correction not complain (§4.6, UJ-4); request-a-song as demand signal (FR-16); PWA for install and speed not offline (§4.9); Google-as-entry and song-page-first (§1, UJ-1, §4.11); the screenshot habit (§4.5, UJ-3); inherited chord accuracy (§4.6, §14); the traffic-versus-performance loop (§8 cacheability, addendum); the founder's worst-case of ads over the song (§4.8, §10, §12.2, SM-C1, SM-C2); unnamed actors — publishers, rights holders, policy review (§13.1, §14); original written content as the survives-everything move (§4.10, narrowed with a stated reason); AdSense research figures (§4.8 note, §12.1); low-bandwidth as a hard requirement (FR-2, §8); ingestion as the version-one bet and its spike (§4.7, OQ-3); ads.txt and consent-documented-not-invented (addendum, §13.3, OQ-10).
