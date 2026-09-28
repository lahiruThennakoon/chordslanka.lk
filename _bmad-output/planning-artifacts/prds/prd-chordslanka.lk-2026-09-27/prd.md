---
title: chordslanka.lk
status: final
created: 2026-09-27
updated: 2026-09-28
---

# PRD: chordslanka.lk

## 0. Document Purpose

This PRD is for Lahtlk as owner-operator, and for the downstream BMad workflows that will consume it — UX, architecture, and epic breakdown. It builds on the facilitated brainstorm intent at `_bmad-output/brainstorming/brainstorm-songchords-facilitated-2026-09-27/brainstorm-intent.md` and does not repeat it; where this document and that one disagree, this one wins. Competitive findings were gathered by research during discovery and are recorded in `.memlog.md` in this folder.

Vocabulary is fixed in §3 and used verbatim everywhere else. Features are grouped in §4 with functional requirements nested and numbered globally as FR-1..FR-n, so epics can reference them even if features get reorganised. **Identifiers reflect the order things were written, not the order they are read** — FR-39 to FR-41 were added during finalize and sit in the feature sections they belong to rather than at the end, so a non-monotonic sequence in §4 is correct rather than a gap. The same applies to SM-9 and SM-10. Inferences I made without confirmation are tagged `[ASSUMPTION]` inline and indexed in §18. Technical mechanism choices deliberately live in `addendum.md`, not here.

## 1. Vision

chordslanka.lk is a chord sheet site for Sri Lankan guitarists, built for the moment that actually matters: someone at a gathering asks for a song, and the guitarist has seconds to find it, get it into a key the singer can reach, and play it without losing the room. Every other chord site in this market is a catalogue you read. This one is an instrument you play with.

The founder described success as a sentence he wants to overhear one guitarist say to another:

> *"Hey machan, now we don't need to worry — there is chordslanka.lk which has all the songs we usually need, and a community-updated database where we can see the latest songs, with transpose, and the best autoscroll feature I have ever seen in a chords site or app."*

That sentence is the specification behind the specification. Four things earn it: **completeness** (the songs we usually need), **freshness** (the latest songs), **transpose**, and **autoscroll good enough to be singled out**. The emotion it carries is relief — *we don't need to worry* — and relief is what the product sells. Any requirement below that does not serve one of those four, or that introduces worry, is suspect.

The market is not empty. Roughly ten Sinhala chord sites already exist, several with thousands of songs, and the largest incumbent's most-viewed song has passed 250,000 views. But the incumbent added roughly fifteen songs in six months while advertising daily updates, its newest album collection is from January 2024, and none of the local sites treat the phone-in-hand playing experience as the product. That is the gap: not more songs, but a live catalogue and a sheet that behaves well while a guitar is in the way.

The business is advertising. The site is free, funded by AdSense, and the ad experience is deliberately confined to the journey *toward* a song — never the song itself. That constraint is not modesty; it is the product. An interrupted chorus costs a returning visitor, and returning visitors are the only asset the business has.

The income this is built for is real but bounded, and §12.1 states the figure and the arithmetic openly rather than leaving it implied. The whole plan rests on one channel — ranking in Google for song titles — against an incumbent that is declining while neglected.

## 2. Target User

### 2.1 Jobs To Be Done

- **Functional** — Find a specific song fast, from a half-remembered title, in Sinhala script, Tamil script, or romanised spelling.
- **Functional** — Move a song into a key the singer in front of me can actually sing.
- **Social** — Get through a song at a gathering without stalling, fumbling, or killing the mood. This is the primary job.
- **Emotional** — Not look incompetent in front of people when the phone is the thing that fails.
- **Functional** — Come back to a song I have already found without searching for it again.
- **Contextual** — Read a sheet at arm's length, on a phone, in poor light, with both hands occupied.
- **Social** — Contribute a song or a correction, and have it visibly matter.
- **Owner's job** — Generate real advertising income from a catalogue of 5,000 chord sheets that currently earns nothing sitting in Google Drive.

### 2.2 Non-Users (v1)

- **Guitar learners wanting structured lessons.** The Learn → Practice → Mastered progression from the original product sketch is cut, confirmed by the founder during finalize; the primary job is social, not pedagogical. Beginners are still served — Chord Diagrams (FR-40) exist precisely so an unfamiliar shape does not stop someone — but the product does not teach a curriculum.
- **Musicians wanting tabs, MIDI files, or backing tracks.** The incumbent offers these; v1 does not compete there.
- **Offline users.** Deliberately unserved — see §5 and the single carve-out in §4.9.
- **Sheet-music and notation readers.** Chord-over-lyric only.
- **Teachers and music schools as an institutional segment.** No classroom features in v1.

### 2.3 Key User Journeys

- **UJ-1. Nuwan finds a song in the ten seconds before the room loses interest.**
  - **Persona + context:** Nuwan, 26, plays reasonably well, is at a friend's place with a guitar across his knee. Someone asks for a Chamara Weerasinghe song he half knows.
  - **Entry state:** Unauthenticated, on mobile data, arriving from a Google search for the song name — not from the homepage.
  - **Path:** He types a fragment of the title into Google, taps the chordslanka.lk result, and the song page renders with the first verse visible before anything else finishes loading. He taps **Play** and the sheet fills the screen in large type.
  - **Climax:** He is playing within seconds of the request, and the room never went quiet.
  - **Resolution:** The song stays open. The screen does not sleep. Autoscroll follows at the speed he set.
  - **Edge case:** If the song is not in the catalogue, he is offered a request form pre-filled with what he typed, and shown the closest matches rather than an empty page.

- **UJ-2. Ishara catches a key that somebody else already started.**
  - **Persona + context:** Ishara, 21, knows open chords and cannot find a key by ear. Her cousin has already started singing, in a key nobody chose.
  - **Entry state:** Song page open, sheet showing the original key.
  - **Path:** She taps transpose and moves the key up until the chords match what she is hearing. The whole sheet re-spells instantly. Her capo position, if she uses one, is shown alongside the sounding key.
  - **Climax:** She joins in on the right chord without having worked it out.
  - **Resolution:** The key she landed on is remembered for that song on her device, so next time it opens where she left it.
  - **Edge case:** If she cannot tell which way to move, she guesses and corrects. The product's job is to make that loop fast enough that nobody in the room notices — a tap, a re-spelled sheet, another tap. It does not tell her the key. See §4.3.

- **UJ-3. Priyan gets back to the twelve songs he actually plays.**
  - **Persona + context:** Priyan, 38, plays at family gatherings and at his church. He has the same dozen songs on rotation and is tired of searching for them.
  - **Entry state:** Returning visitor, has favourited songs on a previous visit.
  - **Path:** He opens the site, sees his favourites without searching, and taps into a collection he built called *Wedding*. He plays three songs in sequence without returning to search.
  - **Climax:** Zero searches for a session of playing — the screenshot habit is broken.
  - **Resolution:** His collections are intact and he adds one more song to *Wedding* from the song page itself.

- **UJ-4. Sanduni fixes a wrong chord instead of complaining about it.**
  - **Persona + context:** Sanduni, 30, plays well and notices the chorus chord is wrong against the recording she knows.
  - **Entry state:** Song page open, reading a sheet with an inherited error.
  - **Path:** She taps the chord in question, chooses *suggest a correction*, and types the chord she believes is right with one line of reason. She does not need an account to do it. `[ASSUMPTION: corrections are allowed without registration to maximise volume; only publishing requires review.]`
  - **Climax:** Her suggestion is acknowledged immediately and queued for review — she is treated as a contributor, not a complainant.
  - **Resolution:** When it is accepted, the sheet changes and she is credited if she left a name.

- **UJ-5. Lahtlk publishes a sitting's worth of scanned sheets without typing them.**
  - **Persona + context:** The owner, working through a Google Drive folder of 5,000 JPEG and PDF chord sheets.
  - **Entry state:** Authenticated as administrator in a content tool.
  - **Path:** He points the tool at a batch of files. Each is converted into structured chords and lyrics, then presented side by side with the original image for approval. He accepts most, fixes a few, rejects the unreadable ones.
  - **Climax:** The work becomes reviewing rather than transcribing. His time per sheet is spent checking a machine's output, not typing lyrics in Sinhala.
  - **Resolution:** The catalogue grows steadily without a transcription team, which is the only durable advantage available. `[ASSUMPTION: review throughput is unknown until the spike measures it. A realistic working figure is a few minutes per sheet including corrections, which puts the full 5,000 in the range of months of part-time evenings rather than weeks. Scope and metrics below are set against that, not against an optimistic figure. See OQ-3.]`

## 3. Glossary

- **Song** — A musical work identified by title and artist, independent of any particular written version. A Song has one or more Sheets and belongs to exactly one primary Language.
- **Language** — One of exactly four values in v1: Sinhala, Tamil, Hindi, English. A Language is a property of a Song. Script names (Sinhala, Tamil, Devanagari, Latin) describe rendering and are not interchangeable with Language — Hindi Songs are written in Devanagari, and any Language may appear romanised in Latin script as a search key.
- **Sheet** — One written arrangement of a Song: its lyrics, its Chord Events, its Original Key, and its provenance. A Song may have multiple Sheets (for example a simplified version); exactly one is the Default Sheet.
- **Chord Event** — A single chord occurrence anchored to a position in a lyric line, stored structurally (root, quality, extensions, bass) rather than as display text.
- **Chord Diagram** — A fretboard illustration of one way to form a chord, showing finger positions relative to the fret the player is actually barring. Derived from the chord's structure, not authored per Song.
- **Original Key** — The key a Sheet was transcribed in. The key a Sheet is always displayed in on first open.
- **Sounding Key** — The key a Sheet is currently displayed in after Transpose, being the key that will actually be heard.
- **Transpose** — Shifting every Chord Event in a Sheet by a number of semitones, producing a new Sounding Key.
- **Capo Position** — A fret number at which a capo is placed, which changes the relationship between the shapes a player forms and the Sounding Key.
- **Play View** — The full-screen, distraction-free presentation of a Sheet intended for use while holding a guitar. Carries no advertising.
- **Autoscroll** — Continuous vertical advance of a Sheet in Play View at a user-controlled speed.
- **Discover Surface** — Any page whose purpose is finding a Song rather than playing one: home, search results, Artist Page, Language Page, and the non-sheet portion of a song page. Advertising appears only on Discover Surfaces.
- **Artist Page** — A page listing every Song attributed to one performer or composer.
- **Favourite** — A user's mark on a Song for later retrieval, held per device before registration and per account after.
- **Collection** — A user-named, user-ordered set of Songs, such as *Wedding* or *Trip*. Distinct from a Favourite, which is a flat list.
- **Submission** — A complete Sheet contributed by a visitor for review before publication.
- **Correction** — A proposed change to one or more Chord Events, or to lyric text, on an existing published Sheet.
- **Review Queue** — The single administrative backlog of everything awaiting a decision, comprising exactly five item types: Submissions, Corrections, Song Requests, Ingestion Candidates, and Removal Requests. This definition is the only enumeration; requirements refer to it rather than restating it.
- **Ingestion** — The conversion of a source JPEG or PDF chord sheet into a structured Sheet.
- **Ingestion Candidate** — The structured output of Ingestion for one source file, held unpublished until approved.
- **Source Artefact** — The original JPEG or PDF file an Ingestion Candidate was derived from, retained for audit and comparison.
- **Song Request** — A visitor's named ask for a Song that is not in the catalogue.
- **Removal Request** — A request from any person that a Song or Sheet be taken out of public view, together with its recorded outcome.
- **Canonical Song URL** — The single indexable address for a Song, stable across Sheet changes, transposition, and Play View.

## 4. Features

### 4.1 Song Page and Sheet Rendering

**Description.** The song page is the product's front door, because visitors arrive here from a search engine rather than from the homepage (realises UJ-1). It must render the beginning of the Sheet almost immediately on a slow mobile connection, present chords positioned over the correct lyric syllables, and remain legible at arm's length. Advertising may appear around the page furniture but never within the Sheet body. The page also carries the song's metadata — artist, Language, Original Key — and its provenance, so a reader can judge what they are looking at.

**Functional Requirements:**

#### FR-1: Render a Sheet with chords aligned over lyrics

A visitor can read a published Sheet with every Chord Event positioned above the lyric syllable it belongs to, without authenticating. Realises UJ-1.

**Consequences (testable):**
- Alignment is preserved at every supported text size, and at viewport widths from 320 CSS pixels upward.
- No horizontal scrolling is required to read any lyric line at 320 pixels wide.
- Sheets containing mixed scripts within a single line (for example romanised words inside a Sinhala line) render with chords still correctly anchored.
- Chord identity is never conveyed by colour alone.

#### FR-2: Serve the first screen of a Sheet on a slow connection

A visitor on a constrained mobile connection can read the first section of a Sheet before secondary page content, advertising, or client-side behaviour has finished loading. Realises UJ-1.

**Consequences (testable):**
- The first section of the Sheet is present in the initial server response and requires no client-side execution to become readable.
- Advertising and non-essential scripts cannot delay the Sheet becoming readable.
- The rendered Sheet does not move position after advertising loads.

#### FR-3: Display Sheet provenance

A visitor can see, on any Sheet, where it came from and when it was last changed — including whether it was contributed, ingested from a source sheet, or corrected, and by whom where a name was given.

**Consequences (testable):**
- Every published Sheet displays a last-updated date.
- Sheets derived from Ingestion are distinguishable from Sheets contributed by a person.
- Accepted Corrections credit the contributor when a name was supplied.
- The Song's songwriter and composer are credited where known, distinctly from the performing artist and from the Sheet's transcriber — see §13.1.

#### FR-4: Offer multiple Sheets for one Song

A visitor can switch between Sheets of the same Song when more than one exists, from a single canonical song URL.

**Consequences (testable):**
- All Sheets of a Song are reachable from one URL; alternates do not create competing indexable pages.
- The Default Sheet is the one presented on arrival.
- Each Sheet is labelled with how it differs from the others — which recording or performance it follows, or that it is a simplified version — so a visitor can tell which one matches the version being sung in the room. An unlabelled alternate is a defect; "not the version we know" is the failure mode most likely to send a visitor back to a search engine.

#### FR-40: Show a Chord Diagram for any chord in a Sheet

A visitor can see how to form any chord in a Sheet, without leaving the Sheet and without losing their place in it.

**Consequences (testable):**
- A Chord Diagram is reachable from the chord itself, wherever that chord appears, including inside Play View.
- Viewing a diagram does not stop Autoscroll, scroll the Sheet, or change the visitor's reading position, and dismissing it returns them to exactly where they were.
- No permanently docked diagram panel competes with the Sheet for space; diagrams appear on demand and get out of the way.
- **Diagrams show the shape the player forms, not the chord that sounds.** With a Capo Position set, the diagram is relative to the capo — consistent with FR-12, which distinguishes the two. A diagram that shows the sounding chord while a capo is on is a defect, not an approximation.
- Diagrams follow Transpose: after transposition, the diagram shown for a chord is the diagram for the chord now displayed.
- Diagrams are derived from the Chord Event's structure and shared across all Songs; none is authored per Song, and adding a Song never requires adding a diagram.
- A chord whose shape the system cannot derive shows no diagram rather than a guessed one, consistent with FR-11's treatment of unparseable chords.
- Standard tuning is assumed, in line with §6.2.
- Diagrams are legible at arm's length on a phone and do not rely on colour to convey finger position.

**Notes:** `[NOTE FOR PM]` Added to v1 at the founder's confirmation during finalize. Reconciliation against the original product sketch (`KEY / CAPO / CHORDS`) showed the third branch meant chord shapes, which this document had dropped on the author's assumption that they were never requested. Every local competitor offers diagrams and beginners stall without them, so this closes a genuine parity gap rather than adding a flourish.

**Feature-specific NFRs:**
- Text must remain readable without the reader's assistive text-scaling being overridden.
- A wrong Chord Diagram damages trust exactly as a wrong transposition does. Diagram derivation is deterministic and must carry automated test coverage before release, including capo-relative cases.

### 4.2 Play View and Autoscroll

**Description.** Play View is the feature the product intends to be known for, and the founder set the bar explicitly: Autoscroll must be **the best of any chord site or app he has used**, not merely present. That is a comparative standard, and it is the one place in this document where "as good as the competition" is an explicit failure — so §7.0 names the comparison set and makes the judgement a release condition rather than an aspiration. It fills the screen with the Sheet, removes everything that is not the Sheet, keeps the screen awake, and advances at a speed the player controls by feel rather than by entering a tempo. It carries no advertising, no upgrade prompts, and no rating requests — this is the non-negotiable boundary described in §10. Realises UJ-1 and UJ-2.

**Functional Requirements:**

#### FR-5: Enter a distraction-free Play View

A visitor can open any published Sheet in Play View from the song page, without authenticating.

**Consequences (testable):**
- Play View contains no advertising of any kind.
- Play View contains no promotional, rating, registration, or upgrade prompt.
- Site navigation furniture is hidden; exiting is a single deliberate action.
- Play View is usable in both portrait and landscape orientation.

#### FR-6: Keep the screen awake during Play View

The system prevents the device screen from sleeping while Play View is active, and tells the visitor plainly when the browser will not permit this.

**Consequences (testable):**
- A wake lock is requested on entering Play View and released on exit.
- Where the browser refuses or does not support it, a single unobtrusive line informs the visitor rather than failing silently.

#### FR-7: Autoscroll a Sheet at a controllable speed

A visitor can start, pause, resume, and continuously adjust the speed of Autoscroll while playing, using controls reachable by one thumb.

**Consequences (testable):**
- Speed is adjustable while Autoscroll is running, without stopping it.
- Speed changes take effect immediately and without a jump in scroll position.
- The chosen speed persists for that visitor on that device across sessions.
- All Autoscroll controls are operable one-handed, positioned within thumb reach at the screen edges or bottom.
- Autoscroll does not start automatically; the visitor starts it.
- When the operating system requests reduced motion, Autoscroll does not auto-advance and manual advance is offered instead.
- A visitor can scroll or nudge the Sheet by hand *while Autoscroll is running*, and Autoscroll continues from the new position rather than stopping or snapping back. A singer holding a note or repeating a verse must not leave the player stranded behind the scroll.

#### FR-8: Adjust and persist Sheet text size

A visitor can increase or decrease Sheet text size in Play View, and the choice persists on that device.

**Consequences (testable):**
- Chord-over-lyric alignment (FR-1) survives every text size.
- The setting persists without an account.

#### FR-9: Jump between Sheet sections

A visitor can move directly to a named section of the Sheet — verse, chorus, bridge — from within Play View.

**Consequences (testable):**
- Sections are jumpable where the Sheet defines them; the control is absent rather than broken where it does not.

**Notes:** `[NOTE FOR PM]` The founder identified best-in-class Autoscroll as the single feature worth being famous for. No local competitor advertises it. It should be treated as the quality bar for the whole release, not as one requirement among many.

### 4.3 Transpose and Capo

**Description.** Transpose exists because the singer sets the key, not the guitarist (realises UJ-2). Sheets always open in their Original Key — the original is the starting truth, not a preference. From there a visitor shifts the Sounding Key and, where they use a capo, sees the relationship between the shapes they play and the key that sounds. This must be deterministic and correct; a single wrong transposition permanently damages trust in every other sheet on the site.

**Functional Requirements:**

#### FR-10: Open every Sheet in its Original Key

The system displays a Sheet in its Original Key on first open, and shows what that key is.

**Consequences (testable):**
- No Sheet opens in a transposed state on a visitor's first view of it.

#### FR-11: Transpose a Sheet by semitone

A visitor can raise or lower a Sheet by one semitone at a time, and every Chord Event updates immediately and consistently. Realises UJ-2.

**Consequences (testable):**
- Chord quality, extensions, and bass notes are preserved through transposition; only pitch changes.
- Slash chords transpose both the chord and the bass note.
- Resulting chord names follow the key signature of the Sounding Key rather than defaulting to sharps or to flats. The rule is fixed rather than left to judgement, because §8 requires automated coverage and an engineer cannot test an adjective: sharp keys (G, D, A, E, B, F♯) spell accidentals as sharps; flat keys (F, B♭, E♭, A♭, D♭, G♭) spell them as flats; C uses sharps. Where a Capo Position is set, spelling follows the key of the chords actually displayed — which is the shape key, since the shapes are what the player reads. `[NOTE FOR PM]` An earlier draft of this rule said spelling follows the Sounding Key. Implementation showed that to be wrong: sounding C with a capo at fret 2 produces B♭ shapes, and spelling those against C yields "A♯" for a chord every guitarist writes as "B♭". Corrected during the first build.
- Non-chord annotations in the Sheet (for example *N.C.*, repeat marks, instrumental labels) are left untouched.
- Any Chord Event the system cannot parse is displayed unchanged and flagged for review rather than guessed at.
- The Sounding Key is displayed at all times.
- Transpose is available inside Play View, not only on the song page, and its controls are operable by one thumb without leaving the Sheet.
- Repeated single-semitone steps are possible in rapid succession without the Sheet flickering, reflowing, or losing the visitor's scroll position.
- A visitor's reading position in the Sheet is preserved across a transposition.

#### FR-12: Set a Capo Position and see both keys

A visitor can set a Capo Position between 1 and 12 and see both the Sounding Key and the shapes to play.

**Consequences (testable):**
- Transpose and Capo Position compose into one result; the visitor never has to mentally undo one to apply the other.
- With a capo set, both the key that sounds and the shapes being played are labelled distinctly.
- Clearing the Capo Position returns the Sheet to the state implied by Transpose alone.

#### FR-13: Remember a visitor's key and capo per Song

The system restores the Sounding Key and Capo Position a visitor last used for a given Song. Realises UJ-2, UJ-3.

**Consequences (testable):**
- Restoration works without an account, per device.
- The Original Key remains visible and one action away.

**Notes:** `[NOTE FOR PM]` **How this product answers the root cause.** The brainstorm traced everything back to one thing: a player cannot find the key a singer has already started in, and what the pro has that the beginner lacks is experience. The obvious responses — a reference pitch, an interval helper, microphone detection — were all considered and rejected, because each still requires the ear the player does not have, or breaks the no-microphone position in §5.

The answer is that a pro does not compute the key either. They try a chord, hear it is wrong, and adjust; they are simply fast at it. So the substitute for experience is **cheap iteration, not detection**. FR-11 plus FR-13 deliver it: guess-and-correct in a couple of taps, and the key remembered so the second occasion needs no guessing at all.

That makes this a UX quality bar rather than a separate capability, and it is the bar the design work must hit. If transposing takes a visible pause, a menu, or a trip out of Play View, this product has failed at the exact thing it exists to fix. `[ASSUMPTION: fast guess-and-correct is an adequate substitute for ear training. This is the founder's judgement and it is untested; SM-2 and Transpose usage should be read together after launch to check that visitors adjust keys rather than abandoning songs.]`

### 4.4 Search and Discovery

**Description.** Most visitors arrive from an external search engine and never see the homepage, so on-site search serves the returning visitor and the visitor whose first search failed. It must accept Sinhala script, Tamil script, and romanised spellings of the same title, because people type what they can type, not what is correct. Zero-result searches are a product signal, not a dead end: they feed the transcription backlog and offer the visitor a Song Request.

**Functional Requirements:**

#### FR-14: Search by title, artist, and lyric fragment

A visitor can find a Song by typing part of its title, its artist's name, or a remembered fragment of its lyrics. Realises UJ-1.

**Consequences (testable):**
- Partial and misspelled input still returns the intended Song where a reasonable match exists.
- Results indicate the Language of each Song.

#### FR-15: Search across scripts and romanisations

A visitor can find a Song written in Sinhala, Tamil, or Devanagari script by typing either the native script or a common romanised spelling, and vice versa.

**Consequences (testable):**
- Equivalent forms of the same Sinhala title match regardless of Unicode normalisation differences.
- Tamil and Devanagari titles match their own normalisation variants on the same basis.
- Common romanised ("Singlish" and "Tanglish") spellings of a title match the native-script Song, as do romanised Hindi titles.
- Artist name variants, nicknames, and shortened forms match the correct artist.
- A Song's primary title is always displayed in its own script, with romanisations serving as search keys only.

#### FR-16: Capture a failed search as a signal and offer a request

When a search returns nothing useful, the system records the query and offers the visitor a Song Request pre-filled with what they typed. Realises UJ-1.

**Consequences (testable):**
- Zero-result and no-click queries are retained for administrative review.
- The visitor is shown nearest available matches alongside the request option.
- Submitting a Song Request requires no account.

#### FR-17: Browse by artist and by language

A visitor can reach an Artist Page listing that artist's Songs, and a Language Page listing Songs in a given Language.

**Consequences (testable):**
- Every published Song is reachable by browsing from at least one Artist Page.
- Indexability of these surfaces is governed by FR-33.
- Recently published Songs are browsable as their own surface. Freshness is a promise the product makes against a visibly stale incumbent (§16), and a catalogue that grows invisibly does not keep it.

### 4.5 Favourites and Collections

**Description.** People screenshot chord sheets because searching again is slower than scrolling their camera roll (realises UJ-3). Favourites and Collections exist to beat the screenshot. Both work on the device before registration, so a first-time visitor gets the benefit immediately; registering preserves them across devices. Collections are named by the visitor around occasions — *Wedding*, *Trip*, songs about parents — because that is how people actually group songs.

**Functional Requirements:**

#### FR-18: Favourite a Song

A visitor can mark and unmark a Song as a Favourite and see their Favourites in one place. Realises UJ-3.

**Consequences (testable):**
- Favouriting works without an account and persists on the device.
- Favourites survive a browser session ending.

#### FR-19: Create and manage Collections

A visitor can create a named Collection, add and remove Songs, reorder them, and rename or delete the Collection. Realises UJ-3.

**Consequences (testable):**
- A Song may belong to any number of Collections.
- Collection order is the visitor's, not alphabetical or chronological.
- Adding a Song to a Collection is possible directly from the song page.

#### FR-20: Register to preserve Favourites and Collections across devices

A visitor can create an account and retain their existing device-held Favourites and Collections, then access them from another device.

**Consequences (testable):**
- Device-held Favourites and Collections are migrated on registration rather than lost.
- Every visitor-facing capability in this document except cross-device sync works unauthenticated. This is the whole rule, stated once, so that adding a feature section cannot quietly narrow it.

**Notes:** `[ASSUMPTION: accounts are in v1 solely to carry Favourites and Collections across devices, with no social or profile features.]`

### 4.6 Community Submissions and Corrections

**Description.** The catalogue's accuracy is inherited: wrong chords come from whoever made the original sheet, and Ingestion copies mistakes faithfully. The correction path is therefore load-bearing rather than a nicety (realises UJ-4). The founder's instruction is explicit — experienced players should be able to *suggest*, not complain — so a Correction is a structured proposal at a specific Chord Event, acknowledged immediately and reviewed before it changes anything. Submissions of whole Sheets are accepted on the same principle: everyone's place, nothing published unreviewed.

The feeling this must produce matters as much as the mechanism, and the founder named it: contributors should be convinced *this is everyone's place, and sharing is loving music*. A contribution form that reads like a moderation queue will not produce that. Acknowledgement should feel like thanks rather than receipt, credit should be offered rather than withheld, and a rejection should never read as a verdict on the person. This is a tone requirement binding on the UX workflow, not a nicety.

**Functional Requirements:**

#### FR-21: Suggest a Correction to a published Sheet

A visitor can propose a change to a specific Chord Event or lyric line on a published Sheet, with an optional reason, and receive immediate acknowledgement. Realises UJ-4.

**Consequences (testable):**
- A Correction identifies the exact location it applies to.
- No Correction alters a published Sheet before administrative acceptance.
- Submitting requires no account; a name and contact are optional.
- The visitor is told their Correction was received without being made to wait for review.

#### FR-22: Submit a complete Sheet

A visitor can contribute a new Sheet for a Song, including lyrics, chords, and the key they transcribed it in.

**Consequences (testable):**
- A Submission is never publicly visible before acceptance.
- The contributor must affirm the submission terms before the Submission is accepted for review — see §13.
- A Submission for a Song that already exists is offered as an additional Sheet rather than silently replacing the Default Sheet.

#### FR-23: Review, accept, reject, and revert

An administrator can work the Review Queue — accepting, editing, or rejecting Submissions and Corrections — and can revert a published Sheet to a previous state.

**Consequences (testable):**
- Every published change to a Sheet is attributable and reversible.
- The Review Queue distinguishes Submissions, Corrections, Song Requests, and Ingestion Candidates.
- An administrator can unpublish any Sheet or Song immediately — see §13.
- Review is possible on content in Sinhala, Tamil, Hindi, and English.

**Notes:** `[NOTE FOR PM]` Moderation of user-generated content on ad-bearing pages is a policy obligation, not only a quality measure. See §13.

### 4.7 Catalogue Ingestion

**Description.** This is the release's gating capability and the founder's explicit version-one bet: 5,000 chord sheets already exist as JPEG and PDF files in Google Drive, and typing them by hand is not viable. Ingestion converts a Source Artefact into an Ingestion Candidate — structured lyrics and Chord Events — which an administrator approves against the original image before it is published. Nothing reaches the public catalogue unreviewed (realises UJ-5). Accuracy and cost characteristics of the conversion approach are unresolved and belong to a technical spike, not to this document; candidate approaches are recorded in `addendum.md`.

**Functional Requirements:**

#### FR-24: Convert a Source Artefact into an Ingestion Candidate

An administrator can submit one or many Source Artefacts and receive, for each, an Ingestion Candidate containing structured lyrics and Chord Events. Realises UJ-5.

**Consequences (testable):**
- Both JPEG and PDF inputs are accepted.
- Each Ingestion Candidate retains a reference to its Source Artefact.
- Content the converter could not interpret is marked as uncertain rather than omitted or invented.
- Failure on one artefact in a batch does not fail the batch.

#### FR-25: Review an Ingestion Candidate against its source

An administrator can compare an Ingestion Candidate with its Source Artefact, correct it, and approve or reject it. Realises UJ-5.

**Consequences (testable):**
- Source Artefact and converted result are viewable together.
- Positions the converter marked uncertain are visually distinguished for the reviewer.
- No Ingestion Candidate is published without an explicit approval action.
- Rejected candidates are retained for a later retry rather than discarded.

#### FR-26: Detect duplicates before publishing

The system warns an administrator when an Ingestion Candidate appears to duplicate an existing Song or Sheet.

**Consequences (testable):**
- A probable duplicate is surfaced before publication with the existing Song named.
- The administrator may publish it as an additional Sheet of the existing Song instead of a new Song.

**Feature-specific NFRs:**
- Ingestion is an administrative capability; it is never exposed to visitors in v1.

### 4.8 Advertising Placement

**Description.** AdSense is the entire business model, and the founder named uncontrolled advertising as the worst possible version of this product. Both things are true, which makes placement a product decision rather than an afterthought. The rule is simple and absolute: advertising monetises the journey to a Song and never the Song being played. Slots must be configurable without code changes, must reserve their space so content does not move, and must degrade invisibly when unconfigured or blocked.

**Functional Requirements:**

#### FR-27: Display advertising on Discover Surfaces only

The system displays advertising on Discover Surfaces and nowhere else.

**Consequences (testable):**
- No advertising renders in Play View, in the Sheet body, or in any administrative screen.
- Advertising is visually distinct from navigation, search results, and Sheet controls, and is never styled to resemble them.
- No advertising overlays or obscures lyrics, chords, or controls.
- Advertising placement between search results never causes an advertisement to read as a Song result.

#### FR-28: Reserve advertising space to prevent content movement

Every advertising slot reserves its layout space before its content arrives.

**Consequences (testable):**
- Sheet and page content do not shift position when advertising loads, fails, or is blocked.
- A blocked or unconfigured slot leaves no visible gap that breaks the layout.

#### FR-29: Configure advertising without code changes

An operator can set the publisher identifier and each slot identifier through configuration, and can disable all advertising through a single switch.

**Consequences (testable):**
- No publisher or slot identifier is embedded in application source.
- With advertising disabled or unconfigured, every page renders correctly and no advertising script loads.
- The advertising provider's script is loaded at most once per page.
- In development, slots render a placeholder occupying the intended space rather than live advertising. Live advertising units never load outside production, under any configuration.
- The site serves an `ads.txt` file declaring the authorised publisher, with its value taken from configuration rather than hard-coded — see §13.5.

**Notes:** `[NOTE FOR PM]` Research during discovery indicates music is a low-value advertising category (roughly USD 4–10 per thousand pageviews worldwide) and that Sri Lankan audiences are reported far lower still, around USD 1–3, against USD 5–25 for Western audiences. Revenue is therefore driven by pages per session, audience mix, and page speed — not by ad density. This is market context gathered from secondary sources, not a projection for this site. Also noted: a click-through rate above roughly 2% is treated as an invalid-activity signal by the provider.

### 4.9 Installable Site and Performance Shell

**Description.** The founder wants the site installable on a phone and fast on weak connections, but explicitly does not want offline use — an offline reader generates no advertising revenue. That combination is coherent: install for speed and a home-screen icon, not for disconnected reading. There is one deliberate exception, and it is not a compromise of the position: a Sheet the visitor has *already opened* must survive a loss of signal, because its advertising impression has already been served and abandoning it mid-song would break the principle in §8 for no revenue gained.

**Functional Requirements:**

#### FR-30: Install the site to a device home screen

A visitor can install chordslanka.lk to their device home screen and launch it as a standalone app surface.

**Consequences (testable):**
- The installed surface opens without browser chrome.
- The installed surface is not promoted intrusively over the Sheet.

#### FR-31: Load application shell and static assets from cache

The system serves its interface shell and static assets from a local cache on repeat visits to reduce time to first readable content.

**Consequences (testable):**
- Sheets the visitor has not opened are fetched from the network and are not available while disconnected.
- Attempting to reach an unopened Song without a network shows a clear message rather than stale or partial Sheet content.
- No feature advertises, implies, or offers offline availability of Sheets, and no Sheet is downloadable.

#### FR-39: Keep an open Sheet alive through a loss of connectivity

A Sheet the visitor is currently reading or playing remains fully readable and fully usable if the network drops, until they navigate away from it.

**Consequences (testable):**
- Losing the network mid-song does not blank, reload, or partially render the Sheet on screen.
- Transpose, Capo, text sizing, section jumps, and Autoscroll continue to work on the open Sheet while disconnected, because all of them are transformations of content already present.
- Favourites added or removed while disconnected are retained on the device and applied when the network returns. Collection edits are deliberately *not* accepted while disconnected in v1 — a Collection is ordered and shared across devices once an account exists (FR-20), and merging concurrent reorderings is a problem this release does not need to solve mid-song.
- Reconnecting does not reload the page or move the visitor's reading position.
- No notification, banner, or dialogue about connectivity appears over a Sheet that is still usable — the visitor is told only when something they attempt actually cannot be done.
- This behaviour is never presented as an offline feature, and it does not extend to any Song the visitor has not already opened.

**Notes:** `[NOTE FOR PM]` This resolves OQ-5, which previously left the founder's "never break momentum" principle in direct contradiction with the rejection of offline. The distinction that resolves it: the advertising impression for an opened Song has already been served, so keeping that Sheet alive costs nothing and abandoning it costs a returning visitor. It is survival of an open Sheet, not a library of downloaded ones. `[ASSUMPTION: that this carve-out is consistent with the founder's rejection of offline rather than a reversal of it. Author's reading of the momentum principle; not separately confirmed.]`

### 4.10 Song Editorial Content

**Description.** Original written material — a short piece about a song, its artist, or how its progression works — makes a page defensible on its own content rather than resting on reproduced lyrics, lifts pages per session, and creates legitimate advertising inventory outside the Sheet. It is genuinely valuable. It is also expensive: at 250 words per song, covering the whole catalogue is over a million words, and generating it in bulk would be scaled content abuse under the advertising provider's policies — the exact outcome §13.1 exists to avoid. So the capability is built and the coverage is deliberately partial. Editorial content is written by a person for songs worth writing about, and most songs never get any. It sits below the Sheet, never above it.

**Functional Requirements:**

#### FR-32: Publish original editorial content for selected Songs

An administrator can attach original written content to a Song, displayed below the Sheet on the song page. Coverage is selective by design, not aspirationally universal.

**Consequences (testable):**
- Editorial content never displaces the Sheet from the top of the page.
- A Song without editorial content renders normally with no empty section, and the great majority of Songs will have none.
- Editorial content is included in search indexing for the song page.
- The system does not generate editorial content in bulk, and no workflow exists to populate it automatically across the catalogue.
- Editorial content is written in English and targeted at the highest-traffic Songs and at readers outside Sri Lanka. This is not a stylistic preference: §12.1 names audience mix as the largest multiplier in the revenue model, and this requirement is the only thing in the document that acts on it. Editorial coverage aimed solely at the existing local audience would leave that lever untouched.

**Notes:** `[ASSUMPTION: editorial content is human-authored by the operator in v1, not solicited from visitors and not machine-generated at scale.]` `[NOTE FOR PM]` This was originally specified as content for every Song. That version was unachievable by one person and dangerous to automate. Treat editorial coverage as an ongoing editorial practice targeted at the highest-traffic Songs, not a launch deliverable.

### 4.11 Discoverability and Traffic Acquisition

**Description.** UJ-1 begins with a Google search, and every revenue figure in §12 assumes the site ranks for song titles. Nothing else in this document delivers that, which made it the largest silent gap in the release. The incumbent's own traffic is 64% Google organic, and it is declining — the ranking positions this business needs are held by sites that are not defending them. Ranking is not a marketing activity bolted on afterwards; it is a set of product requirements about what is indexable, how pages link to each other, and what a search engine can understand about a Sheet.

**Functional Requirements:**

#### FR-33: Present every Song as an indexable, canonical, machine-readable page

Every published Song has exactly one canonical indexable URL carrying structured metadata a search engine can interpret, and the system publishes a complete machine-readable index of those URLs.

**Consequences (testable):**
- Every published Song has exactly one Canonical Song URL, which does not change when its Sheets, key, or editorial content change. Transposed states and Play View produce no competing indexable URL; the alternate-Sheet rule is FR-4's and is not restated here.
- Song title, artist, and Language are exposed as structured metadata, in the Song's own script, with romanised forms available as alternates.
- A crawler can discover every published Song from a single machine-readable index, regenerated whenever the catalogue changes.
- Indexability is decided in one place: Song pages, Artist Pages, Language Pages, and the recently-published surface are indexable; search-result, filter, and facet URLs are not. FR-17 defers to this rule rather than duplicating it.

#### FR-34: Link Songs to each other structurally

Every song page links to related Songs — same artist, same Language, recently published — so that a visitor arriving from search has somewhere to go and a crawler can reach the whole catalogue.

**Consequences (testable):**
- Every published Song is reachable from the homepage within **three link hops**, by way of Artist Pages, Language Pages, and the recently-published surface (FR-17).
- No published Song is an orphan reachable only by search or only by sitemap.
- Related-Song links appear outside the Sheet body and outside Play View.
- Relations are derived from Song metadata — artist, Language, publication date — and never from visitors' Collections, which are private to their device by §13.3 and are not a public taxonomy.

#### FR-35: Make a Song shareable as a link

A visitor can share a Song as a link that opens the same Song for the recipient, with a preview showing the title and artist.

**Consequences (testable):**
- The shared link is the Song's canonical URL.
- A shared link carries preview metadata sufficient for messaging applications to render title and artist.
- Sharing requires no account.

**Notes:** `[NOTE FOR PM]` The word-of-mouth moment the founder described — one guitarist telling another at a gathering — is realised by FR-35 plus the product quality itself. There is no growth mechanism beyond that in v1, and there should not be one; a referral scheme would be noise at this stage. `[ASSUMPTION: organic search plus word of mouth are the only acquisition channels in v1. No paid acquisition, no social media programme, no email list.]`

### 4.12 Rights Response and Content Removal

**Description.** §13.1 states three obligations that had no requirement behind them: a live takedown route, structurally removable lyrics, and the ability to unpublish fast. Because a policy action against the advertising account ends the business, these are release-blocking capabilities rather than compliance paperwork.

**Functional Requirements:**

#### FR-36: Accept, log, and act on a content removal request

Any person can submit a content removal request from a publicly linked route, and every request and its outcome is recorded.

**Consequences (testable):**
- A removal request route is reachable from every page without an account.
- Each request records what was requested, by whom, when, what was decided, and when it was actioned.
- A Removal Request can be actioned by the immediate unpublish capability defined in FR-23, independent of the request's final resolution, and Removal Requests enter the Review Queue alongside the other item types listed in §3.
- An unpublished Song returns a correct not-available response and is removed from the sitemap and from search and browse surfaces.
- The request log is retained and reviewable as evidence of responsiveness.

#### FR-37: Render a Sheet with lyrics removed

An administrator can remove lyric text from a Sheet, per Song, leaving a usable chord-only rendering with the Sheet's structure intact.

**Consequences (testable):**
- Chord Events, section labels, and ordering survive lyric removal; the page remains useful rather than broken.
- Removal is reversible and is recorded as an administrative action.
- Removal can be applied to a single Song without affecting any other.
- A lyrics-removed Sheet is clearly labelled as such rather than appearing incomplete by accident.

#### FR-41: Publish the policy pages the release depends on

The site publishes its Terms of Use, Privacy Policy, contribution terms, and rights contact, all reachable from every page.

**Consequences (testable):**
- All four are live before any Song is publicly reachable. §13.1 calls the rights page a launch blocker; these are the others.
- The contribution terms are the ones FR-22 requires a contributor to affirm, and the affirmation records which version was accepted.
- The rights contact names a real person or role and a working route, and is the same route FR-36 exposes.
- The Privacy Policy describes what FR-38 records and states that reading and playing behaviour is never sold or added to an advertising profile, consistent with §13.5.
- Each page is reachable from every page of the site in one action.

### 4.13 Measurement

**Description.** Every metric in §7 requires instrumentation, and none of it exists by default — particularly Play View entry, which is the release's primary behavioural signal and happens entirely on the client. An unmeasured metric is a wish.

**Functional Requirements:**

#### FR-38: Instrument the behaviour the success metrics depend on

The system records the events needed to compute every metric in §7, without capturing audio or the content of what a visitor plays.

**Consequences (testable):**
- The following are recorded: page views and sessions; referring source, so search arrivals are distinguishable from direct and shared-link arrivals; returning-visitor recurrence within a 30-day window; time to first readable Sheet; Play View entry and exit; Autoscroll start, speed changes, and how far through a Sheet the visitor reached; Transpose and Capo use, including how many steps were taken before settling; Chord Diagram opens; search queries including zero-result queries; Song Request submissions and whether the requested Song was later published; Correction and Submission lifecycle timestamps from receipt to resolution; Favourite and Collection actions; and advertising performance.
- Every metric SM-1 to SM-8 and SM-10 can be computed from this recorded data without manual estimation.
- SM-9 is partly external and is treated as such: search arrivals are recorded on the site, while ranking positions for song titles and for the brand term are read from the search engine's own webmaster console and **reported** rather than computed. The requirement is that both halves are reviewed together on a regular cadence, not that the site can derive the ranking half.
- Microphone audio is never captured.
- Measurement scripts cannot delay the Sheet becoming readable (FR-2).
- Counter-metrics SM-C1 to SM-C4 are reported alongside the metrics they counterbalance, not on request.

## 5. Non-Goals (Explicit)

- **This is not an offline app.** No Sheet downloads, no library of offline Sheets, no reading a Song that was not already opened. Offline use earns nothing and the business is advertising. One deliberate exception: a Sheet the visitor already has open survives a loss of signal — see FR-39, whose advertising impression is already served.
- **This is not a paid product.** No subscription, no premium tier, no paywalled Sheet, no ad-free purchase. Correctness and readability are never sold.
- **This is not a guitar course.** No lesson paths, no chord trainers, no practice scoring, no progress tracking in v1.
- **This is not a tab, MIDI, or backing-track library.** The incumbent occupies that ground; v1 does not contest it.
- **This is not a tuner or metronome.** Both were explicitly identified by the founder as removable without losing the weekly habit. Browser microphone behaviour is unreliable enough to damage the brand if shipped badly.
- **This is not a social network.** No feeds, no following, no public profiles, no comment threads under Songs. Corrections replace arguments.
- **This is not an AI chord detection service.** No audio upload, no fetching audio from third-party video platforms, no automated chord detection from recordings in v1.
- **The site does not become an advertising surface with songs attached.** Ad density is capped by the experience, not by inventory appetite.
- **The product is never framed around occasions, days, or skill levels.** No "Friday night songs" framing, no beginner and advanced tracks, no gating by ability. The founder's instruction: whether someone is playing on a Friday or a Sunday, a beginner or a professional, *it should not matter* — the same sheet, the same speed, the same quality for everyone. Collections are named by visitors for their own occasions (§4.5); the product does not name occasions for them.

## 6. MVP Scope

### 6.0 Build Order

The founder locked one sequencing decision during discovery and it is not negotiable: **the sheets come before the advertising.** Build the catalogue, the song page, and the playing experience first; integrate AdSense once there is something worth visiting. The reasoning is practical rather than principled — an advertising application is judged on the site as it stands, and a thin site invites rejection on the one account the business cannot afford to lose.

This also fixes the launch dependency the rest of the document leaves implicit: obtaining an AdSense account requires a manual application, domain verification, and a review by Google of unknown duration. SM-4 measures revenue "from first serving", which cannot begin until that approval lands. Treat approval as a dated dependency on the launch plan, not an afterthought.

### 6.1 In Scope

- Song page with aligned chord-over-lyric Sheet rendering, server-rendered first section, Chord Diagrams on demand (FR-1 to FR-4, FR-40)
- Play View with wake lock, speed-controlled Autoscroll, text sizing, section jumps (FR-5 to FR-9)
- Deterministic Transpose and Capo Position with per-Song memory (FR-10 to FR-13)
- Search across Sinhala, Tamil, Hindi, and English including romanisations; failed-search capture; Artist, Language, and recently-added surfaces (FR-14 to FR-17)
- Favourites and Collections, device-first, with optional registration to sync (FR-18 to FR-20)
- Corrections and Submissions with an administrative Review Queue and revert (FR-21 to FR-23)
- Catalogue Ingestion with human approval against the Source Artefact (FR-24 to FR-26) — **conditional on OQ-3's spike clearing its abort thresholds.** If it does not, the alternative branch is in scope instead: publish a few hundred of the best sheets by hand, grow through community Submissions (FR-22), and reset SM-3. The capability is committed; the 5,000-sheet ambition is not.
- AdSense on Discover Surfaces, configurable, space-reserved, never in Play View (FR-27 to FR-29)
- Installable site with cached shell, no offline Sheets, and an open Sheet that survives losing signal (FR-30, FR-31, FR-39)
- Editorial content capability, applied selectively to high-traffic Songs (FR-32)
- Indexable canonical Song pages, structured metadata, sitemap, internal linking, shareable links (FR-33 to FR-35)
- Removal request route with log and immediate unpublish; lyrics-removed chord-only rendering; published policy pages (FR-36, FR-37, FR-41)
- Instrumentation for every success metric and counter-metric (FR-38)
- Published Terms of Use, Privacy Policy, contribution terms, and rights-contact page (FR-41)

### 6.2 Out of Scope for MVP

- **Learn, Practice, and Mastered progression** — **cut, confirmed by the founder during finalize.** These four stages were in the original product sketch; the founder confirmed the primary job is social rather than pedagogical and that the ladder is not wanted. Not a deferral awaiting revisit.
- **Any key-detection or key-suggestion capability** — cut, not deferred. No reference pitch, no interval helper, no audio analysis, no per-song suggested keys. The root cause is answered by fast iteration instead; see the note in §4.3 and resolved OQ-1.
- **AI chord analysis from audio** — deferred; legal permission and accuracy both unresolved.
- **Guitar tuner and metronome** — deferred by the founder's own prioritisation.
- **Strumming patterns and animation** — deferred.
- **Contributor reputation, leaderboards, and the giveaway or raffle mechanism** — the reward idea was raised but never specified. Deferred to v2.
- **Alternative tunings** — v1 assumes standard tuning; a Sheet requiring another tuning is labelled or not published.
- **Alternative voicings and movable shapes per chord** — one derived Chord Diagram per chord in v1 (FR-40). Offering a player a choice of shapes, barre alternatives, or simplified voicings is deferred.
- **Hindi and Tamil catalogue at parity with Sinhala** — the Languages are supported by the platform from day one, but the initial catalogue will be Sinhala-dominant because that is what the 5,000 sheets are. `[ASSUMPTION: that the purchased catalogue is overwhelmingly Sinhala. Its actual language breakdown has never been checked, and if it holds substantial Tamil or Hindi material the parity question changes.]`
- **A dedicated lyrics-only experience** for visitors seeking words rather than chords. Now cut rather than deferred: §13.1's posture rests on a guitarist needing the words to play, and a lyrics-only page has no such justification. Real traffic is being left on the table deliberately. See OQ-6.

## 7. Success Metrics

### 7.0 The Pass/Fail Bar

Every metric below is quantitative, and the founder's own definition of success is not. Recorded here because a numbered-metric list silently discards it:

- **Traffic in month one is not success.** Arrivals prove the site was found, not that it worked. A visitor who arrived, struggled, and left counts identically to one who played three songs.
- **If the experience is poor, the product has failed regardless of the numbers.** The founder's words: *"if UX is not good it is still a failure."* No revenue figure, catalogue size, or ranking position overrides this.
- **Retention is the absence of frustration, not the presence of features.** People return because nothing got in their way. The founder's framing: *"people should stick to my app because we are not frustrating them."* This is why SM-5 is read as a symptom rather than a target to optimise directly.
- **The song path must work end to end, not requirement by requirement.** Search, open, transpose, play, scroll — each passing its own tests while the whole sequence is awkward is a failure this document would not otherwise catch.
- **Autoscroll must win a side-by-side comparison.** §4.2 sets a comparative bar, and a comparative bar needs a comparison. Before release, Autoscroll is run against **slchords.com's full-screen view** and at least **two established mobile chord applications** on the same song, on the same phone, and must be judged better on each of: smoothness at slow speeds, absence of stutter when speed changes mid-scroll, recovery when the player nudges the sheet by hand, and thumb reachability of the controls. Losing on any one of them is a release blocker, because "as good as the competition" is declared a failure and this is the only place that claim gets tested.

**How the bar is judged.** These are gates, not sentiments, so they need an owner and a procedure. Before each release the founder personally performs one scripted walkthrough — search for a song, open it, transpose it, enter Play View, scroll through to the end — on a mid-range Android phone over mobile data, plus the Autoscroll comparison above. The pass condition is his own: *would I hand this to a friend at a gathering right now?* A recorded "no" blocks the release regardless of what §7's numbers say.

**Primary**
- **SM-1: Time to readable Sheet.** Median time from arriving on a song page to the first Sheet section being readable, under two seconds, measured on the **standard test profile**: a mid-tier Android device roughly equivalent to a four-year-old mid-range handset, throttled to 1.6 Mbps down and 300 ms round-trip, first visit with an empty cache. Naming the profile once here is what makes the threshold reproducible; FR-2's "constrained mobile connection" means this profile. Validates FR-1, FR-2.
- **SM-2: Play View entry rate.** Share of song page sessions that enter Play View, above 25%. This is the clearest signal the product is being played rather than read. Validates FR-5 to FR-9. `[ASSUMPTION: threshold is a first-release guess with no baseline; revise after four weeks of data.]`
- **SM-3: Catalogue published.** Published Songs from the 5,000-sheet bank, with 1,000 published within the first release cycle and a sustained weekly rate thereafter. Validates FR-24 to FR-26. `[ASSUMPTION: the 1,000 figure is contingent on the ingestion spike's measured review throughput and should be reset once OQ-3 resolves.]`
- **SM-4: Advertising revenue.** Absolute monthly revenue against the USD 300 target in §12.1, reported alongside revenue per thousand pageviews so that traffic and yield can be told apart. Tracked from first serving. Validates FR-27 to FR-29.
- **SM-9: Organic search arrival.** Monthly sessions arriving from an external search engine, and the count of Songs ranking on the first page for their own title. Tracked alongside it: position for the bare brand term *chordslanka*, which is a channel in its own right given the naming strategy in §13.2. This is the leading indicator for every revenue figure in §12.1 and the earliest signal that the plan is or is not working. Validates FR-33 to FR-35.

**Secondary**
- **SM-5: Returning visitor share.** Share of sessions from visitors seen in the previous 30 days, rising release over release. Validates FR-13, FR-18, FR-19.
- **SM-6: Corrections received and resolved.** Volume of Corrections and median days to resolution, as the health signal for inherited accuracy. Validates FR-21, FR-23.
- **SM-7: Failed-search conversion.** Share of zero-result searches that become a Song Request, and share of those later published. Validates FR-16.
- **SM-8: Pages per session.** Directly tied to advertising income and to internal linking quality. Must rise through better related-Song surfaces, never through obstruction — see §12.2. Validates FR-17, FR-32, FR-34.
- **SM-10: Key adjustment engagement.** Share of Play View sessions in which the visitor transposes or sets a Capo Position, and among those, the share taking more than two steps before settling. The first number says the differentiating cluster is being used; the second is the direct read on §4.3's bet that cheap guess-and-correct substitutes for ear training — a high multi-step share means the loop is working, while transposition abandoned mid-song means it is not. Also tracks Chord Diagram opens per Play View session. Validates FR-11, FR-12, FR-13, FR-40.

**Counter-metrics (do not optimise)**
- **SM-C1: Advertising click-through rate.** Must not be optimised upward. A rate above roughly 2% is treated as an invalid-activity signal by the provider and risks the account that funds the product. Counterbalances SM-4.
- **SM-C2: Advertisements per page.** Must not rise to chase SM-4. Ad density is capped by the Play View boundary and the reading experience. Counterbalances SM-4.
- **SM-C3: Published Songs per week.** Must not be optimised at the expense of review quality. Publishing unreviewed Ingestion Candidates would inflate SM-3 while destroying the accuracy the product is differentiating on. Counterbalances SM-3.
- **SM-C4: Registered accounts.** Must not be optimised by gating features. Every visitor-facing capability except cross-device sync works unauthenticated by design. Counterbalances SM-5.

## 8. Cross-Cutting NFRs

- **Momentum is never broken.** The founder's central principle, stated plainly because the rest of this document only refers back to it: *"it should feel like killing the momentum, and in my app it should never happen."* Once a visitor is playing, nothing may interrupt — not an advertisement, not a prompt, not a layout shift, not a lost connection, not a slow response. Any failure that occurs mid-song is a class of defect in its own right, and the correct behaviour is always to degrade quietly and keep the Sheet readable rather than to explain, block, or reload. This principle is what FR-5, FR-6, FR-28, and FR-39 exist to serve.
- **Mobile-first.** Every visitor-facing surface is designed for a phone held in one hand with a guitar occupying the other, then adapted upward. Desktop is secondary.
- **Performance on constrained networks.** Song pages must be usable on slow mobile connections typical of Sri Lankan mobile data. Server-rendered content is the floor; client-side behaviour is an enhancement.
- **Cacheability.** Song pages must be servable from cache or a content delivery network so that traffic growth does not degrade response times — the founder identified this tension directly. Published Sheet content changes only on an administrative action, which makes it highly cacheable.
- **Multi-script support.** Sinhala, Tamil, and Devanagari text must render correctly in the visitor's first paint. A Latin-only web font that delays or breaks script rendering is a defect, not a trade-off.
- **Content is multilingual; the interface is English.** Song titles, lyrics, and artist names appear in their own scripts, always. The site's own navigation, labels, controls, and messages are English only in v1 — a deliberate decision (OQ-13) on the basis that Sri Lankan web users read English interfaces and that the alternative multiplies every copy change by three for no measured gain. The implementation must not make this irreversible: interface text should be externalised rather than embedded, so localisation stays a later decision rather than a rewrite.
- **Accessibility floor.** Sheet contrast sufficient for reading in poor light; chord identity never conveyed by colour alone; reduced-motion preference respected by Autoscroll; keyboard operability for search and transpose on desktop; text scaling honoured.
- **Trust in determinism.** Transpose and Capo are pure, testable transformations with no probabilistic component. They must be covered by automated tests before release, including slash chords, unusual qualities, and unparseable annotations.
- **Observability.** Every behaviour the success metrics depend on must be measurable, and audio is never captured. The authoritative event list is FR-38's; this bullet states the principle only, so the two cannot diverge.
- **Content integrity.** Every published Sheet must be attributable and revertible, and any Song must be removable from public view within minutes by a single administrative action.

## 9. Information Architecture

Top-level surfaces:

- **Home** — recent additions, most-played, and search. A Discover Surface. Deliberately light: most visitors never see it.
- **Search results** — a Discover Surface.
- **Song page** — the primary landing surface from external search, at a Canonical Song URL. Sheet at the top, metadata and provenance around it, editorial content and related Songs below, advertising in the page furniture only.
- **Play View** — a full-screen mode entered from a song page. No advertising, no navigation.
- **Artist Page** and **Language Page** — browse and indexable entry points; Discover Surfaces.
- **My songs** — Favourites and Collections.
- **Submit / Request** — contribution entry points.
- **Administration** — Review Queue and Ingestion tooling. Not public.
- **Terms of Use, Privacy Policy, and takedown route** — publicly linked from every page.

## 10. Aesthetic and Tone

The product's visual identity is specified separately by the UX workflow and is not settled here. Three decisions are product-level rather than design-level and belong in this document:

- **The Sheet is reverently plain.** Whatever visual character the site carries on its Discover Surfaces, the Sheet itself and Play View prioritise legibility over atmosphere. No texture behind lyrics, no motion competing with the reading line, no decoration inside the Sheet body.
- **Play View is inviolable.** No advertising, no upselling, no rating prompt, no registration nudge, no layout change after load. This is the product's central promise and the founder's own definition of the worst possible version of it.
- **The identity must be unmistakably not the incumbent's.** Because the site competes under a name close to chordslankalk.com by deliberate choice (§13.2), its logo, colour, typography, layout, and voice must be visibly its own. Resemblance to the incumbent is a defect, not a convergence. This is a constraint on the design work, not a preference.

Voice for product-generated text: plain, warm, unhurried, and never cute at the moment of failure. A visitor whose wake lock was refused or whose search found nothing should be told what happened in one clear line.

## 11. Platform

Responsive web, server-rendered, installable as a progressive web application. No native mobile application in v1. Mechanism choices are recorded in `addendum.md`.

## 12. Monetization

- **Free in full.** Every Sheet, Play View, Transpose, Capo, Favourite, and Collection is free and unauthenticated where possible. Nothing about reading or playing a song is ever sold.
- **AdSense only.** Advertising is the single revenue source in v1. No subscription, no donations, no affiliate placement, no sponsored content.
- **Discover Surfaces only.** Advertising appears on the journey to a Song and never on the Song being played.
- **Revenue levers, in priority order:** traffic volume from organic search first, then audience mix, then pages per session, then page speed, then catalogue breadth. Traffic leads because it is the only lever with no ceiling; audience mix ranks second because it is the largest *multiplier* on whatever traffic exists (§12.1), even though it is the harder of the two to move. Ad density is explicitly not a lever.
- **The exit is open.** Alternative advertising networks exist with meaningfully higher yields at modest traffic thresholds; the implementation must not hard-wire the site to a single provider. `[ASSUMPTION: worth a small amount of abstraction now rather than a rewrite later.]`

### 12.1 Revenue Target

The founder's stated purpose is income, and this document previously specified no figure — which allowed a plan to look sound while the arithmetic underneath it did not close. The target is now explicit so that scope can be judged against it.

- **Target.** A meaningful second income for one person in Sri Lanka, defined as USD 300 per month sustained — approximately the national average monthly wage. `[ASSUMPTION: the founder accepts USD 300/month sustained as the v1 definition of success, and accepts that a software-engineering salary is not a realistic advertising outcome at this market's rates.]`
- **What that requires, in one unit.** At the USD 1–3 per thousand pageviews reported for Sri Lankan audiences, USD 300 per month needs roughly **100,000 to 300,000 ad-bearing pageviews** per month. Competitor figures in §16 are *visits*, not pageviews, so they must be converted before they can be compared. `[ASSUMPTION: four pageviews per visit, inferred from the leader's 23:05 average session in §16 and unverified for this site.]` On that basis the leader's ~151,000 visits imply roughly 600,000 pageviews and the whole visible field roughly 1.35 million. A further discount applies to this site specifically and not to competitors: Play View carries no advertising (FR-5, FR-27) and SM-2 targets driving a quarter of sessions into it, so ad-bearing pageviews are a fraction of total pageviews rather than all of them. Netting that out, the target sits somewhere between a quarter and the whole of the current market leader's traffic. That is a demanding position but not an impossible one, and it is materially less bleak than comparing pageviews to visits would suggest.
- **Timescale.** Organic search ranking is the only acquisition channel (FR-33 to FR-35) and it compounds slowly. This is a two-to-three-year effort, not a launch outcome. `[ASSUMPTION: the founder accepts that timescale. If a faster return is required, advertising is the wrong model and the plan needs reconsidering rather than accelerating.]`
- **Where the headroom is.** Audience mix is the largest single multiplier in the model: the same traffic from Western visitors is worth several times more. English-language editorial content and diaspora-oriented material are the only levers that touch it, which is why FR-32 survives despite being narrowed. See OQ-7.
- **What the target does not justify.** No amount of revenue shortfall justifies advertising inside Play View, raising ad density, or generating editorial content in bulk. Those are the three ways this plan would fail while appearing to try harder. Counter-metrics SM-C1 and SM-C2 exist to make that visible.

An interactive working model with adjustable traffic, audience mix, pages per visit, and ad coverage exists at `chordslanka-business-case.canvas.tsx` under `~/.cursor/projects/c-Projects-Chordslanka-chordslanka-lk/canvases/`. It is **outside this repository** and is not a deliverable of this document; the arithmetic above stands on its own without it.

### 12.2 The Play View Boundary Is a Deliberate Revenue Sacrifice

This document contains a real tension and resolves it rather than hiding it. Pages per session is a top revenue lever, yet FR-5 and FR-27 make Play View ad-free, SM-2 targets driving a quarter of sessions into it, and Favourites and Collections exist specifically to eliminate browsing. Every one of those choices reduces ad-bearing pageviews.

That is the intended trade. Play View is where the product earns the returning visitor, and returning visitors are the only compounding asset the business has. Monetising the moment of play would raise short-term revenue per session and destroy the reason anyone chooses this site over six alternatives. The resolution is that the ad-bearing journey must be made better rather than longer: faster song pages, stronger internal linking (FR-34), and related-Song surfaces that a visitor actually wants to follow. Length extracted by obstruction is explicitly out of bounds.

## 13. Constraints and Guardrails

### 13.1 Legal and copyright

**This section records risk, not legal advice. A qualified view is still required, bundled with the name question in §13.2, and the decision below was taken with that pending.**

**Decision on lyrics (resolves OQ-4).** Publish Sheets with full lyrics, and compete on responsiveness rather than avoidance. This matches every site in §16, all of which publish full lyrics under advertising and have done so for years — the market leader maintains a DMCA page, which indicates a considered decision to handle complaints as they arrive rather than reduce exposure. That is evidence about how this plays out in practice, not evidence of legality, and it is recorded as an accepted risk rather than a cleared one. `[ASSUMPTION: the founder accepts full-lyric publication as an informed risk, on the basis that the entire local market operates this way and that the exposure materialises through complaint rather than proactive enforcement.]`

**What this posture obliges, in order of importance.** The decision is only defensible if the response side is real. A slow or argumentative response is what converts a survivable complaint into an account-ending one:

- **Remove first, discuss afterwards.** Any credible removal request results in the Song being unpublished before its merits are considered. There is no scenario in which a Song is worth arguing about while it remains live under advertising. FR-36 makes the unpublish action independent of the request's resolution precisely so this is possible.
- **Response speed is a commitment, not a best effort.** Acknowledge within one business day, unpublish within one business day of a credible request, and log both. This is the single most load-bearing operational obligation in the document. Two different speeds appear in this document and both are correct: the *capability* must remove a Song from public view within minutes of the decision (FR-23, §8), while the *commitment* is to reach that decision within one business day of the request arriving.
- **A rights policy page is a launch blocker.** Published before the catalogue goes public: a named contact, the request process, and what happens next. §6.1 already commits to it; this decision makes it non-negotiable.
- **Credit the songwriter and composer wherever known.** Cheap, correct, and it changes the framing of the site from reproduction to appreciation. Recorded as a consequence of FR-3.
- **FR-37 is a prepared switch, not a theoretical one.** The chord-only, lyrics-removed rendering must actually work before launch, because it is the only response available if exposure ever arrives at catalogue scale rather than song by song.
- **Do not extend the exposure beyond what the product needs.** No lyrics-only pages, no lyric excerpts in metadata or previews beyond a title, no lyric text in editorial content. The justification for reproducing a lyric is that a guitarist needs it to play; anything past that is reproduction with no defence. See OQ-6.

- **Reproduced song lyrics are the central legal exposure.** Chord names alone are a weaker target than chords locked to a full lyric. The founder's 5,000 sheets are lyrics plus chords.
- **Catalogue provenance, as established.** The 5,000 sheets were created by one individual and purchased from him by the founder. They were not collected from the competing sites. This matters in three ways and resolves two of them. It means the text is plausibly original rather than duplicated, which the entire organic-search plan in §12.1 depends on. It means the catalogue is not scraped content under the advertising provider's policies. What it does not do is transfer any right to the underlying song lyrics — a transcriber never held that right and therefore could not sell it. The purchase settles where the asset came from; it does not settle the question below. See OQ-11 for what remains unconfirmed.
- **The advertising provider's own policies prohibit content that infringes copyright, and hold the publisher responsible for visitor-contributed content on pages carrying advertising.** Because advertising is the entire business model, a policy action is an existential event, not an inconvenience. This is a documented obligation, not a speculative one.
- **Bulk-generated content is a separate and equally fatal policy exposure.** The advertising provider prohibits scaled content abuse — mass-produced pages of low value, whether machine-generated or templated — independently of any copyright question. This is the obligation that constrains FR-32 and that §14's editorial risk row refers to. It matters here because a 5,000-song catalogue is exactly the shape of thing that invites bulk text generation to make pages look substantial, and doing so would trigger the same account loss that the copyright rules would.
- **Lyrics must be structurally removable.** The data model must allow lyrics to be removed from a Sheet, per Song, without destroying the Chord Event structure or the page. This makes a chord-only fallback and a fast takedown response possible.
- **A takedown route must be live before the catalogue is public** — a published contact, a request mechanism, a log of requests and outcomes, and the ability to unpublish within minutes.
- **Visitor contributions require affirmed terms.** No Submission or Correction is accepted without the contributor affirming they have the right to contribute it and granting permission to display and moderate it.
- **Moderation must cover every published Language.** Sinhala, Tamil, Hindi, and English content all require review by someone who can read it.
- **Technical feasibility is never treated as legal permission.** This applies to lyrics, to any future audio handling, and to any third-party content source.

### 13.2 Brand and domain

**Established facts.** The founder registered chordslanka.lk himself, fresh; it was available and no prior holder is known. He is independent of chordslankalk.com and its named administrator. That incumbent operates on a `.com` while its own footer asserts the chordslanka.lk name — it has been branding itself with an address it does not hold, and now cannot.

**Decision (resolves OQ-2).** The name proximity is a deliberate strategy, not an accepted accident. chordslanka.lk competes under the name the incumbent advertises for itself, on the correct domain, with a better site. The reasoning is that the incumbent is declining while neglected (§16), its footer effectively publishes this site's address, and the domain is an exact match for what visitors type into a search engine.

**What that strategy commits the product to.** Choosing to inherit visitor expectations means being unable to disappoint them:

- **The site must be visibly better than the incumbent on arrival, from day one.** A visitor who lands here expecting the site they know and finds a thinner catalogue or a slower page is a visitor converted *away*. This raises the launch bar: leaning on a shared name with an underbuilt site is the worst available combination. It is a direct argument for depth of catalogue at launch over an early release.
- **The name is contested ground; the identity is not.** Trading under a shared name is defensible. Reproducing the incumbent's visual identity — its logo, layout, colour, typography, page structure, or wording — is a different and far weaker legal position, and it would make this site the copycat in the eyes of anyone who knows both. The visual identity must be independently and obviously distinct. This is binding on the UX workflow, not advisory.
- **No claim of continuity or affiliation.** Nothing may state or imply that this site is the incumbent, succeeds it, is endorsed by it, or is its official version. No "formerly", no "the real", no comparison advertising against it.
- **Ranking first for the bare name is an explicit objective.** The brand search itself is a channel, tracked under SM-9.
- **The residual risk is accepted and it is a total one.** Long public use of a name can support a claim even with no registered trademark and no domain. The probability is low — the incumbent never held this domain and no registered mark is known — but the consequence is loss of the address every ranking is attached to. Mitigation is to keep brand investment cheap and portable: nothing printed, nothing physical, no third-party identity tied to the domain that could not be redirected. `[ASSUMPTION: the founder accepts a low-probability, high-severity domain risk in exchange for the naming advantage. Counsel should confirm the position before any significant spend, but this does not block building.]`

**This section is not legal advice.** A qualified view on the name position should be obtained alongside the copyright question in OQ-4, from the same counsel, in one conversation.

Separately, chordslanka.com is a lapsed domain now serving a parking page. It has no audience to convert, only residual brand searches and old inbound links.

### 13.3 Privacy

- Collect the minimum needed to operate. Favourites, Collections, and per-Song key preferences should live on the device until an account exists.
- Advertising requires a consent mechanism appropriate to the visitor's jurisdiction; the implementation must be able to accommodate one. `[ASSUMPTION: the specific consent obligations for a Sri Lanka–primary audience with international visitors are undetermined and need confirmation.]`
- Never capture microphone audio, and never include reading or playing behaviour in any data sale or advertising profile.

### 13.4 Cost

Single-operator economics. Infrastructure must stay near-zero at low traffic and scale with revenue rather than ahead of it. Ingestion conversion cost is a real and unknown line item and is part of the technical spike, not an assumption. See OQ-3.

### 13.5 Advertising Integration, Identifiers, and Testing

These constraints came from the founder's own advertising brief. They are recorded as requirements rather than practices because the account they protect is the entire revenue model, and because two of the most common causes of suspension are developer behaviour rather than site content.

- **Never click or otherwise interact with advertisements on the site.** This applies to the operator, to anyone testing, and to automated tests and crawlers. A single automated suite that clicks a live ad unit can end the account. Counter-metric SM-C1 watches production click-through rate, which detects the symptom far too late; the prevention is that live units never load where a test can reach them (FR-29).
- **No fake, placeholder, or borrowed advertising that impersonates live advertising.** Development placeholders must be obviously inert and visibly not real advertisements.
- **Public identifiers and private secrets are different things and must be handled differently.** The publisher identifier and slot identifiers are public by nature and may live in configuration that ships to the browser. Account credentials, API keys, and reporting access tokens are secrets and must not. Conflating the two is how the first gets over-protected into unusability and the second gets committed.
- **No secret or credential is ever committed to the repository**, in any form, including in configuration examples, test fixtures, and documentation.
- **The publisher identifier is never invented or guessed.** It is obtained from the real account after approval, recorded once in configuration, and its exact value documented where the operator will find it again.
- **`ads.txt` is mandatory** and must be reachable at the site root, declaring the authorised publisher. Its value comes from configuration (FR-29) and must be verified as live after approval.
- **No additional visitor data is collected for advertising purposes** beyond what the provider requires and the Privacy Policy discloses. Reading and playing behaviour is measured for the product's own metrics (FR-38) and is never fed into an advertising profile or sold.
- **Advertising extends existing handling rather than introducing a parallel path.** At the point advertising is integrated, whatever configuration and consent handling the application already has is what advertising must use. Building a second, advertising-specific way to hold identifiers or record consent is the defect this guards against.

## 14. Risk and Mitigations

| Risk | Consequence | Mitigation |
| --- | --- | --- |
| Advertising account refused or suspended over reproduced lyrics | Total loss of revenue; the business model disappears | Accepted deliberately (§13.1). Remove first and discuss afterwards; one-business-day response commitment; rights policy page live before launch; songwriter credit where known; FR-37 chord-only fallback working before launch, not theoretical |
| A publisher rather than an individual asserts a claim | Exposure arrives at catalogue scale, not song by song, and removal one at a time cannot keep pace | The trigger to revisit OQ-4 rather than absorb it; FR-37 exists to make a catalogue-wide response possible in hours; counsel engaged before that happens, not during |
| Removal requests accumulate unanswered | A survivable complaint becomes an account-ending one through neglect alone | FR-36 logging makes the backlog visible; response time is the founder's own commitment and the one operational duty that cannot be deferred |
| Ingestion accuracy too low to be usable | The gating capability fails and the catalogue cannot grow | Technical spike before commitment; human approval against Source Artefact is mandatory; uncertain regions flagged, never guessed |
| Ingestion cost per sheet too high at 5,000 scale | Catalogue growth stalls on economics | Measure cost per sheet in the spike; batch and prioritise by demand from failed searches |
| Inherited chord errors at scale | Trust damage across the whole catalogue, not one page | Corrections as a first-class path; provenance visible on every Sheet; revert capability |
| Local-only audience caps revenue | Income target unreachable regardless of traffic | Editorial content in English; platform-level multi-language support from day one |
| The site never ranks in Google | Every revenue figure in §12.1 is void; UJ-1 never happens and no other channel exists | FR-33 to FR-35 as release requirements, not marketing follow-up; SM-9 as the earliest warning signal; speed as a ranking input, not only a UX property |
| Market is smaller than the income target needs | Effort sustained for years against a ceiling that cannot pay it | §12.1 states the target and the arithmetic openly; SM-4 and SM-9 reviewed against it quarterly; audience mix (OQ-7) treated as the only real multiplier |
| Purchased sheets were compiled rather than transcribed | Duplicate content prevents ranking; the SEO plan fails on content that looked like an asset | Confirm with the seller (OQ-11); spot-check a sample of sheets against published sources before bulk publication |
| Editorial content attempted at catalogue scale | Scaled content abuse; the policy action the whole §13.1 exists to avoid | FR-32 narrowed to selective human authoring with no bulk generation workflow |
| Name claim asserted by the incumbent | Loss of the domain every ranking is attached to — the whole business | Accepted deliberately (§13.2). Domain registered fresh and independently; no registered mark known; visual identity kept obviously distinct; brand investment kept cheap and portable so a forced move is survivable; counsel to confirm alongside OQ-4 |
| Launching under a shared name with a thinner site | Visitors arriving with the incumbent's expectations are converted away rather than won | Depth of catalogue and page speed are launch conditions, not post-launch work; §13.2 makes this explicit |
| Traffic growth degrades performance | The core promise — speed — breaks as the site succeeds | Highly cacheable song pages; content delivery network; no per-request dynamic rendering of Sheets |
| A wrong transposition or a wrong Chord Diagram | Permanent loss of trust in the site's core competence | Deterministic implementation with automated test coverage before release, including capo-relative diagram derivation |
| Ad density creep in pursuit of revenue | The founder's own stated worst outcome | Counter-metrics SM-C1 and SM-C2; Play View boundary enforced in code, not by convention |
| Visitor-submitted content violating policy | Provider action against the account | Nothing published unreviewed; multi-language moderation capability |

## 15. Why Now

The incumbent is trafficked but neglected. It advertises daily updates while adding roughly fifteen songs between March and August 2026, and its newest album collection is dated January 2024. Meanwhile 5,000 chord sheets sit in a Drive folder earning nothing, and conversion of scanned documents into structured text has become tractable enough to be worth a spike rather than a wish. The opening is a well-maintained, fast, phone-first catalogue in a market where the leader has stopped tending its own.

## 16. Competitive Landscape

Findings from discovery research, recorded for downstream reference. Traffic figures are third-party estimates from mid-2026, not measured first-party data, and should be treated as order-of-magnitude.

| Site | Est. monthly visits | Scale claimed | Notable | Gap to exploit |
| --- | --- | --- | --- | --- |
| chordslankalk.com | ~151,700 | "Largest", ~2,500 songs; top Song at 262k views | Market leader. 23:05 average session, 64% Google organic. Declining: ~214,650 in April to ~151,720 in June 2026 | Stale catalogue; no advertised Transpose or Autoscroll; ageing experience; losing traffic while adding ~15 songs in 6 months |
| guitar.lk | ~56,000 | 4,000+ chords | Registration for favourite lists | Experience and freshness |
| slchords.com | ~43,600 | — | Full-screen view, transposer, chord diagrams, contributor ratings, search by chord count and beat, request, download | Feature-rich; the clearest proof that features alone are not the differentiator |
| chordlanka.com | ~26,800 | 2,521+ songs | Most-played counters, daily updates claimed | Similar name, similar offer |
| lklyrics.com | ~25,800 | — | Lyrics-led rather than chords-led | Different job; evidence for OQ-6 |
| alachords.com | ~13,700 | — | — | — |
| sinhalasongbook.com | ~11,400 | — | — | — |
| chordslk.com | ~8,400 | — | Daily updates, top hits | — |
| chordsl.com | — | 2,288+ chords, 517+ artists | Sinhala, Tamil, English; transpose; community contributions | Closest positional competitor; smaller catalogue |
| chordslanka.com | ~0 | — | Lapsed 2019; parking page | Residual brand searches only |

**The total visible market is roughly 337,000 visits per month.** That figure, not the leader's share of it, is the ceiling this business is working against — and §12.1 shows the revenue target requires a leading position in it rather than a foothold.

Two findings carry more weight than the rest. The leader's **23-minute average session** is independent evidence for this product's central thesis: people are not reading these pages, they are sitting with them while playing, and nobody has built for that. And the leader is **declining while neglected**, which is the whole opening — the ranking positions this plan needs are held by a site that has stopped defending them.

One further signal worth recording: the leader's visitors go on to **chordify.net** and **smule.com**. Chordify detects chords from audio; Smule is singing and performance. That is evidence the local offering does not finish the job, and that the demand pulling people away is precisely the AI chord detection §5 rules out and the performance side the product does not touch. It does not change v1 scope — the legal and accuracy problems that ruled out audio analysis are unchanged — but it is the clearest available indication of where this market's unmet demand actually sits, and it belongs in any future scope conversation rather than being rediscovered later.

The strategic conclusion: catalogue size and transpose are table stakes in this market, not differentiators. What no local competitor is doing well is the phone-in-hand playing experience — Play View, Autoscroll, speed — combined with a genuinely current catalogue and pages that load fast enough to out-rank a neglected incumbent.

## 17. Open Questions

1. **OQ-1. The key-catching capability — RESOLVED.** Decision: build no detection or suggestion mechanism. All three candidates still required the ear the player lacks, or broke the no-microphone position. The root cause is answered instead by making guess-and-correct fast enough to be socially invisible, which is a quality bar on FR-11 and FR-13 rather than a new capability. Recorded in the §4.3 note; the rejected options remain in `addendum.md` for the record. Revisit only if post-launch data shows visitors abandoning songs rather than adjusting keys.
2. **OQ-2. Brand and domain position relative to chordslankalk.com — RESOLVED.** The founder registered chordslanka.lk fresh and is independent of that operator. Decision: the name proximity is a deliberate strategy — compete under the name the incumbent advertises, on the correct domain, with a better site. The residual name-claim risk is accepted as low-probability and high-severity. Conditions recorded in §13.2, the binding one being that the visual identity must be obviously distinct. Counsel to confirm alongside OQ-4, not before building.
3. **OQ-3. Ingestion approach, accuracy, and cost.** Unresolved and gating. Requires a technical spike on a sample of at least 50 sheets spanning the best and worst legibility in the bank, measuring three numbers: chord accuracy against the source, minutes of human review per sheet, and conversion cost per sheet. **Abort thresholds, set in advance so the result cannot be rationalised:** if review takes longer than five minutes per sheet, or conversion costs more than USD 0.10 per sheet, or accuracy is low enough that a reviewer is effectively retyping, then bulk ingestion is not viable. In that case the plan changes rather than persisting — publish a few hundred of the best sheets by hand, lean on community Submissions for growth, and reset SM-3. Committing to 5,000 sheets before these numbers exist is the single largest way this release fails.
4. **OQ-4. Copyright posture for lyrics — RESOLVED as an accepted risk.** Decision: publish full lyrics and compete on responsiveness, matching the market rather than abridging or omitting. Abridging carried the risk without the benefit; chords-only would have killed the product; licensing is not realistically available for this catalogue. Obligations recorded in §13.1, the load-bearing one being remove-first-discuss-afterwards with a one-business-day response commitment. Counsel still to confirm, bundled with §13.2. Revisit immediately if a publisher — as opposed to an individual — asserts a claim.
5. **OQ-5. Connectivity during play — RESOLVED.** An open Sheet survives a loss of signal; an unopened one does not. Specified as FR-39. The distinction that resolves the apparent conflict with §5: the advertising impression for an opened Song has already been served, so keeping that Sheet alive costs no revenue, while abandoning it costs a returning visitor and breaks the §8 momentum principle.
6. **OQ-6. Lyrics-only visitors — answered as a consequence of OQ-4.** Not served. §13.1's posture depends on the lyric being there because a guitarist needs it to play; a lyrics-only page forfeits that justification and adds exposure for traffic the business cannot safely monetise. Recorded in §6.2 as cut rather than deferred. The open part is only whether this decision should be revisited if the rights position ever becomes licensed rather than tolerated.
7. **OQ-7. Audience geography.** Research indicates audience mix is the largest revenue lever. Is targeting beyond Sri Lanka a goal, and if so, does that change the catalogue?
8. **OQ-8. Contributor reward mechanism.** Giveaways and a raffle funded by advertising income were raised. Unspecified: threshold, mechanism, legality of a prize draw, and timing.
9. **OQ-9. Chord diagrams — RESOLVED.** In v1, specified as FR-40. Reconciliation showed the earlier framing was wrong: the founder's original sketch reads `KEY / CAPO / CHORDS`, and since key and capo are already FR-10 to FR-13, the third branch meant chord shapes. The founder confirmed it. Diagrams are derived from chord structure and shared across Songs, so the catalogue cost is zero; the one subtlety carried into the requirement is that a diagram must show the shape the player forms relative to a capo, not the chord that sounds.
10. **OQ-10. Consent mechanism scope.** What consent obligations actually apply for a Sri Lanka–primary audience with international visitors?
11. **OQ-11. Catalogue provenance — partially resolved.** Answered: the sheets were created by one individual and bought from him, not taken from competing sites. Two things remain unconfirmed and both are cheap to settle. First, did he transcribe them himself by ear, or compile them from other published sources over the years? If compiled, some of the text already exists elsewhere and the uniqueness the SEO plan depends on weakens. Second, is there anything in writing — an agreement, a message thread, a payment record with terms — and did it assign rights or merely transfer copies? Neither answer changes the lyrics question in OQ-4, which stands regardless.
12. **OQ-12. The learning ladder — RESOLVED.** Cut, confirmed by the founder. Learn, Practice, tracked Play, and Mastered were four of the original sketch's stages and had been removed on the author's judgement without asking. The founder confirmed the primary job is social rather than pedagogical. Recorded in §6.2 as cut rather than deferred.
13. **OQ-13. Interface language — RESOLVED.** English-only interface in v1, with content always in its own script. Recorded as a cross-cutting NFR in §8, including the requirement that interface text be externalised so localisation stays a later decision rather than a rewrite.

## 18. Assumptions Index

- **§2.3 (UJ-4)** — Corrections are permitted without registration to maximise volume; only publishing requires review.
- **§2.3 (UJ-5)** — Ingestion review throughput is unmeasured; the working figure is minutes per sheet, putting the full catalogue in months rather than weeks.
- **§4.3** — Fast guess-and-correct transposition is an adequate substitute for the ear training a beginner lacks. Founder's judgement, untested.
- **§4.5** — Accounts exist in v1 solely to carry Favourites and Collections across devices, with no social or profile features.
- **§4.9** — Keeping an already-opened Sheet alive through signal loss (FR-39) is consistent with rejecting offline, on the basis that its advertising impression has already been served. Author's reading of the founder's momentum principle; not separately confirmed.
- **§4.10** — Editorial content is human-authored by the operator in v1, not solicited from visitors and not machine-generated at scale.
- **§4.11** — Organic search and word of mouth are the only acquisition channels in v1; no paid acquisition, social programme, or email list.
- **§6.2** — The initial catalogue will be Sinhala-dominant because that is what the 5,000 sheets contain; Tamil and Hindi are platform-supported but not at catalogue parity. The actual language breakdown of the purchased catalogue has never been checked.
- **§7 (SM-2)** — The 25% Play View entry threshold is a first-release guess with no baseline.
- **§7 (SM-3)** — The 1,000-song first-cycle figure is contingent on the ingestion spike and should be reset once OQ-3 resolves.
- **§12** — A small amount of provider abstraction is worth building now to keep an alternative advertising network open later.
- **§12.1** — The founder accepts USD 300 per month sustained as the v1 definition of success, and accepts that advertising at this market's rates cannot reach a software-engineering salary.
- **§12.1** — The founder accepts a two-to-three-year timescale, organic search being the only channel.
- **§12.1** — Four pageviews per visit, inferred from the leader's 23:05 average session and unverified for this site. The whole comparison between the revenue target and the measured market rests on it.
- **§13.1** — The founder accepts full-lyric publication as an informed risk, on the basis that the entire local market operates this way and that exposure materialises through complaint rather than proactive enforcement.
- **§13.2** — The founder accepts a low-probability, high-severity name-claim risk in exchange for the naming advantage, and accepts building before counsel confirms the position.
- **§13.3** — Specific consent obligations for the audience mix are undetermined.
