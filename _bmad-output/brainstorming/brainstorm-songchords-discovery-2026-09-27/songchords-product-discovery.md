# SongChords product discovery

**Working name:** SongChords  
**Market:** Sri Lanka first; global later via a new corpus, not a clone of English tab sites  
**Languages:** Sinhala, Tamil, English  
**Source:** Brainstorm session 2026-09-27 (autonomous discovery)  
**Status:** BMAD-ready foundation for a later product brief and PRD. Not production code.

---

## Executive summary

SongChords is a phone-first chord sheet product for guitarists who need a trustworthy, readable, singable arrangement for the song in front of them—in the script they search with—and who need to keep their place while they play. The north star is time-to-first-clean-chorus, not catalog size.

**Decisions locked from discovery:**

| Decision | Choice |
| --- | --- |
| Launch market | Sri Lanka; Sinhala, Tamil, and English as first-class |
| Differentiation | Verified local repertoire, phone play mode with a guitar in hand, alias/script search, honest versions—not AI |
| Launch promise | Songs you can finish, not songs we indexed |
| Trust model | Curated and verified at launch; community proposes corrections, not new canonical sheets |
| AI role | Draft behind a reviewer only; never the public source of truth; never auto-publish |
| Accounts | Memory features; play mode works logged out on first visit |
| Monetization stance | Free full play of verified songs; no paywalled chords; no ads inside play mode |
| Competitor to beat | A photo of a notebook in a WhatsApp group—not Ultimate Guitar’s feature matrix |
| Next artifact | Product brief (`bmad-product-brief`) before PRD; do not start production code from this document alone |

**MVP cut:** about thirty guitarist-requested songs; logged-out search and song page; play mode; deterministic transpose and capo; diagram peek; error report; artist pages. Explicitly out: accounts, AI, user-generated sheets, audio upload, YouTube ingest, tuner, metronome, strumming animation, ads in play, paywalled chords.

**Validation:** about thirty songs and about twenty guitarists on their own phones. Success is finishing a song and opening a second one unprompted.

---

## Product vision

Three years out, a guitarist in Sri Lanka opens SongChords for a song the way they open a dictionary: the sheet matches the named recording, play mode survives a gig, and corrections stick.

Year one aims for a few hundred verified songs people actually request, plus play mode, transpose, capo, three-script search, and artist pages. The first move is thirty songs chosen by asking guitarists what they get asked to play, transcribed carefully, and made delightful on a phone.

Global expansion reuses the same play product and adds a corpus where diaspora demand exists. Cloning the English pop catalog is a red ocean. Local repertoire is the strategy, not a translation layer bolted on later. Sinhala and Tamil are first-class catalogs, not apologetic tabs on a Sinhala-first site.

The product becomes written memory for songs that often live as oral tradition and online video rather than an authoritative book.

---

## Problem statement

**The single most important problem:** I cannot get a trustworthy, readable, singable chord sheet for the song in front of me, in the script I search with, and keep my place while I play.

Contributing failure modes (from reverse brainstorming):

- Chords do not match the version in the room (film, acoustic, live, karaoke).
- One song is treated as one sheet when hits have multiple arrangements people mean by the title.
- Sinhala search misses Singlish spellings people actually type; Tamil users hit Sinhala-first lyric dumps or English tabs.
- Beginner songs use barre shapes because the transcriber plays intermediate voicings.
- Scroll follows a recorded BPM while the singer breathes late.
- A login wall sits in front of the first chord.
- Lyrics copied at scale invite publisher action before there are users.
- AI sheets go public with no human ear on the recording.
- Empty programmatic pages (every chord-name URL) get indexed.
- Ultimate Guitar’s tab/rating/version maze is squeezed onto a narrow phone.
- Capo is a text note, so transpose plus capo shifts the song twice.
- The paid tier is what makes the song readable.

Emotional stake: exposure at the gig. A wrong sheet makes beginners think they are bad. Accuracy is emotional, not only musical. What people say is “send me the chords”; what they do is screenshot. The product wins when the screenshot is unnecessary.

---

## Personas

| Persona | Snapshot | Product implication |
| --- | --- | --- |
| **Nethmi** | Nineteen; knows Em, C, G, D; needs one Sinhala song for Friday; no theory vocabulary | If the page says “tonic,” she leaves. Capo is advanced disclosure of “make this easier to sing.” |
| **Ruwan** | Thirty-four; plays at home and church; lives in saved keys and setlists | Will pay later to kill ads and keep the set offline. First payer archetype: hobbyist wanting offline and quiet play. |
| **Dilani** | Teaches ten students; wants same song in different keys plus a practice signal | Real job; **second product**. No teacher supply until students have a habit. |
| **Akeel** | Looks for Tamil songs; finds Sinhala-first dumps or English tabs | Tamil parity is a positioning promise, not a backlog apology. |
| **Kasun** | Plays well; wants studio key and another voicing | Will fix a wrong chord if the fix is two taps and a named recording. |

Shared feeling at the gig: exposure. Interface should lower heart rate—big type, the next chord, no surprise layout shift.

Teachers, music schools, tuition shops, and campus guitar circles are later segments and zero-budget channels (request list and sticker, not ads). Classroom and worship tools wait until rights are clear and the student habit exists.

---

## Jobs to be done

| Job | Release stance |
| --- | --- |
| Accompany a song at a family gathering in a key the singer can actually reach | Core (MVP via transpose/capo + play) |
| Learn one Sinhala (or Tamil) song this week without a teacher beside you | Core |
| List songs playable with only the open chords already in your hands | Near-term after MVP (chord-vocabulary filter) |
| Keep your place when eyes leave the fretboard and come back | Core (play mode) |
| Trust that these chords match the recording people in the room know | Core (verified stamp, named recording) |
| Remember the capo and key you settled on last time for this exact song | Post-MVP (accounts / local memory first) |
| Find another local song that uses the progression you just got under your fingers | Later (deterministic similar songs) |
| Isolate the G-to-C change that keeps breaking the chorus without restarting the whole song | Post-MVP practice path |
| Play quietly at night on a phone without an ad jumping the scroll | Core principle (no ads in play) |
| Put a class on the same song without photocopying a notebook | Later (teacher segment) |
| Singer who owns the guitar: singable key over theoretical spelling | Core |

---

## User journeys

### 1. Find and play tonight (MVP)

1. Open site logged out (search traffic must not bounce on a gate).
2. Search a fragment of a chorus half remembered—often Singlish, or Tamil/Tanglish/Latin—not by musical key.
3. Land on a song page with a verified arrangement citing recording, transcriber, verifier, and date; switch version if the room means a different arrangement.
4. Enter play mode: one column, landscape-first if on a stand, dark high-contrast default, wake lock on, font size from device preference.
5. Set sounding key and capo fret; system solves shapes (transpose and capo compose; not two blind shifts).
6. Advance by a huge advance-line zone (auto-scroll optional, set by feel—not BPM typing). Jump by section chips (verse / chorus / bridge).
7. Peek a chord diagram only when a new chord appears or on demand—not a docked panel stealing the lyric line.
8. Arrangement stays on the device so a dead spot in a hall cannot blank the chorus.
9. Optional later share: a link opens play already in the agreed key and capo so a band shares shapes—no account required.

### 2. Learn one song (MVP entry → post-MVP depth)

1. Nethmi finds one requested Sinhala song via title/artist/lyric fragment search.
2. Sees difficulty as player–song pair later; at MVP she needs open shapes and a peek at F/barre if they appear.
3. Practices by section chips more than by smooth scroll.
4. Post-MVP: practice path meets the chord, the change, the section, then the song; streak is songs touched this week, not guilt; isolate the failing change without restarting the whole song.

### 3. Report a wrong chord (MVP)

1. Kasun (or anyone) notices a mismatch with a named recording.
2. Two taps open an error report tied to a chord anchor—an editorial ticket, not a comment thread.
3. Editors verify against the recording; publish a new immutable arrangement revision; old share links keep their revision or explicitly follow latest (chosen on purpose).

### 4. Teacher / class (later)

Dilani sends one song link; each student keeps their own key. Class on the same song without photocopying. Discovered job; not first release. Do not build the class product first.

### 5. Performance / service set (post-MVP direction)

Performance mode hides practice chrome and shows only songs marked ready. Worship guitarists are a dense recurring segment; treat service setlists as a discovered job. Do not dump a worship catalog until rights are understood.

---

## Product principles

1. **Finishability over inventory** — Launch promise: songs you can finish, not songs we indexed. Depth is the proof; breadth is a later moat.
2. **Time-to-first-clean-chorus** — North star metric of product quality.
3. **Play before account** — Play mode works logged out. Account is memory (key, capo, progress), not the gate.
4. **Trust is a feature** — Verified stamp: which recording, who checked, when. Two guitarists against a named recording before verified. Coverage vs accuracy resolved with draft / reviewed / verified; drafts never indexable.
5. **Beat the notebook photo** — Wedge is playability while holding a guitar, not a feature matrix vs Ultimate Guitar.
6. **Capo is a job, not jargon** — Control people want: make this easier to sing. Capo is advanced disclosure; sounding key vs played shapes.
7. **UI language ≠ lyric language** — Chrome follows the user; the song stays in its own script.
8. **Play mode is a stage** — One column; no ads, upgrades, or rating prompts inside play. Interrupting the job is a broken product.
9. **Deterministic music math** — Transpose, capo, diagrams, key math, voicing class stay pure functions with tests. One wrong transpose destroys trust permanently.
10. **AI never auto-publishes** — Models may draft or suggest, labeled; never silently rewrite a verified sheet; never lead the brand with AI extraction.
11. **Local repertoire is strategy** — Delete Sinhala and Tamil and you become a worse Ultimate Guitar.
12. **Correctness is not a luxury** — Never paywall the sheet. Free is full play of the verified catalog.
13. **Feasibility ≠ permission** — Especially for lyrics, audio, YouTube, and AI.
14. **Lyrics removable** — Model so lyrics can be removed per song without breaking the chord timeline; chord-only where uncleared is an adult policy.

---

## Feature universe

### In the MVP

- Verified song library (~30 guitarist-requested songs), curated—not open community publishing
- Search by title, artist, lyric fragment, and language; Sinhala Unicode + Singlish; Tamil script + Tanglish + Latin; artist aliases
- Song page (server-rendered; first verse visible to slow phones and crawlers) + artist pages
- Multiple versions as first-class switcher on one canonical song URL
- Phone play mode: large type, wake lock, section jump, manual advance, dark high-contrast default, landscape-first, one-handed bottom/edge controls, font size persistence with chord alignment surviving resize
- Deterministic transpose; deterministic capo (sounding vs played shapes)
- Diagram peek (first appearance / on demand), not docked textbook
- Report-a-wrong-chord (structured editorial ticket)
- Citation: recording, transcriber, verifier, date
- Local storage for key, capo, font until accounts exist
- Optional text strum pattern on a section (e.g. down down-up / spoken syllables)—not animation
- Standard tuning only as guaranteed engine; other tunings as label/warning or song unpublished
- Paper escape hatch: one action exports current key for phone-banned venues (same legal content, different surface)—directionally in territory; prioritize after play reliability if capacity is tight
- Takedown contact, form, log, fast unpublish before catalog is public

### Post-MVP

- Accounts, favorites, setlists, remembered key/capo across sessions, synced setlists
- Practice path on one song (meet chord → change → section → song); isolate failing changes; spaced repetition only for missed changes
- Chord-vocabulary filter (“songs I can play” / known shapes in → playable songs out)
- Better romanization; trending from on-site play starts (“played here this week”)
- Cache / download of recent songs and sets (offline maps pattern); storage visibility
- Share links with agreed key and capo
- Ads on browse/search only (if any); premium removes browse ads, adds offline packs and synced setlists
- Continue-home: continue learning, short local trending, search—not a magazine
- Performance mode (ready songs only)
- Optional auto-scroll set by feel
- Stand mode (enormous type, section advance); Bluetooth pedal as later experiment that might become serious

### Later

- Community structured corrections (diffs at chord anchors), not open wiki day one; reputation after editors exist
- Editor tools at scale; small editor group → broader contributor agreements
- Tamil corpus parity push as explicit milestone
- Classroom / worship products only if rights are clear
- Deterministic similar songs / progression neighbors
- Tuner and metronome (metronome in-ear if ever; visual metronome fights the reading line)—after play mode is loved; mic features are a swamp on mobile browsers
- Teacher directory and gear affiliates: disclosed, optional, never in play view; wait until sheets are trusted
- Comfort-note → nearest singable key (user’s own audio, not a master)—post-validation provocation worth keeping

### Experimental / rejected for early product

| Item | Stance |
| --- | --- |
| Practice plan from failed changes (home drill) | Experimental, valuable |
| Labeled alternate voicings suggested by model | Experimental; labeled only |
| Audio / AI chord extraction | Experimental after counsel; never auto-publish; do not lead brand |
| Romanization/alias machine propose + human confirm | Catalog tool, not magic UX button |
| Microphone that judges playing | Parked—different product (pedagogy, latency, rights) |
| Strumming animation | Postpone (impressive, low early value); spoken mnemonic first |
| Custom tuning studio | Rejected for launch engine |
| Open community publishing / wiki | Rejected at launch |
| Comments / social feeds under songs | Rejected (politics/lyric fights); reports only |
| Paywalled chords / premium readability | Rejected |
| Ads, upgrades, rating prompts inside play | Rejected |
| Full-song audio uploads / YouTube ingest | Rejected (rights, ToS, security) |
| Separate lyrics-only catalog | Rejected (weak product + sharper legal question) |
| Empty programmatic chord/key/capo URLs | Rejected for SEO |
| Matching Ultimate Guitar feature maze on phone | Rejected as imagined constraint |
| Scraper + AI publisher launch | Worst idea; inverse is human-checked phone sheet |

---

## Prioritization reasoning

Evaluated qualitatively against: user value, differentiation, implementation complexity, business value, SEO value, retention, and dependency risk. Not a popularity ranking.

| Theme | User value | Differentiation | Complexity | Business / SEO / retention | Cut reasoning |
| --- | --- | --- | --- | --- | --- |
| Phone play mode | Highest—the job | High vs lyric dumps and notebook photos | Medium–high layout (alignment) | Habit and retention core | **Ship first.** Without it, search + static page does not beat existing lyric sites. |
| Deterministic transpose + capo | High—singable key prevents churn | Expected but must be correct | Medium (pure module + tests) | Trust; dependency for every journey | **Minimum, not polish.** Wrong transpose destroys trust permanently. |
| Verified local corpus (~30) | High for “tonight” | Highest vs UG English pop | Editorial effort, not code | SEO long-tail on real songs; brand | **Cold start is editorial.** Catalog tourism does not retain; accuracy does. |
| Three-script + alias search | High for Colombo guitarist | High—queries global sites ignore | Medium (analyzers, romanization) | Acquisition / SEO | Constraint that becomes advantage. Tamil first-class. |
| Diagram peek | High for beginners; intermediates survive without | Moderate | Low–medium | Onboarding | Keep peek, not textbook. |
| Error report | High for trust loop | Supports verified brand | Low | Editorial backlog from real use | Two taps; not comments. |
| Artist pages | Moderate browse + SEO | Standard expectation | Low | SEO hubs | Include in MVP. |
| Accounts / setlists / offline | High for Ruwan retention | Moderate | Medium | Monetization surface later | **Wait** until a stranger finishes a song without an account. Local storage bridges. |
| Practice path / failed-change isolation | High learning | Differentiating if done | Medium | Retention | Post-MVP after play is loved. |
| Chord-vocabulary filter | High for Nethmi-class | Differentiating | Medium (structured chords) | Retention / discovery | Second capability worth being great at—after play. |
| Community publishing | Speed vs moderation cost | Risky early | High ops | Trust risk | Corrections only, structured; no open wiki day one. |
| AI extraction | Tempting coverage | Worst differentiation if leading | High + legal | Brand and lawsuit risk | Off critical path; draft only; never auto-publish. |
| Tuner / metronome / mic practice | Requested | Brand risk if broken (iOS Safari) | High browser swamp | Distracts from chord accuracy brand | Postpone. |
| Teacher tools | Real job | Segment later | High | Second product | After student habit. |
| Ads in play / paywalled chords | Revenue temptation | Destroys job | Low to add, high to brand | Monetization anti-pattern | Rejected. |

**Cuts explained:** Coverage fights accuracy—resolve with states, not volume. SEO wants many URLs and quality wants few—long-tail capo/easy versions live as sections on the song page. Free growth fights a clean play screen—ads may sit on browse only. Helpful AI fights trust—deterministic engines forever for music math. Sri Lanka now vs global later—locale-neutral data model, Sri Lankan launch content, one codebase.

---

## MVP proposal

### Scope

About thirty songs chosen by asking guitarists what they get asked to play; transcribed carefully; verified against a named recording (two-guitarist bar for verified).

Product surface:

- Logged-out search and song page
- Play mode (readable lyrics, chords locked to the right syllable/token, thumb-reachable transpose, wake lock, section jump, manual advance, dark default, font size, landscape-first)
- Deterministic transpose and capo (sounding key vs played shapes)
- Diagram peek
- Report-a-wrong-chord
- Artist pages
- Citation metadata (recording, who checked, when)
- Device-local memory for key, capo, font
- Editorial workflow states: draft / reviewed / verified (search/index show verified by default; drafts never indexable)

### Explicitly excluded

Accounts; AI; user-generated sheets; audio upload; YouTube ingest; tuner; metronome; strumming animation; playlists/setlists as product; teacher tools; ads inside play; paywalled chords; community reputation; social feeds/comments; custom tuning studio; microphone features.

### MVP journeys

Find and play tonight; learn one song (basic); report a wrong chord.

### Acceptance criteria (directional)

- A stranger finishes a song on their own phone without an account.
- Chords remain aligned when font size changes.
- Transpose and capo compose correctly; ugly chords round-trip (structured root/quality/extensions/bass); unparsed annotations left untouched and flagged, never guessed; N.C. and percussion marks alone.
- Wake lock requested; if browser refuses, one-line honest message.
- Screen does not go dark mid-verse under normal supported browsers.
- Verified sheets cite recording and verifier; drafts are not public index fodder.
- Wrong-chord report creates an editorial ticket in two taps.
- First verse visible on slow connection via server-rendered song page.
- No ads or paywall in play mode.

### Validation test

About **thirty songs** and about **twenty guitarists** on their **own phones**. Success: finishing a song and opening a second one unprompted.

### Initial backlog themes

1. Pure transpose/capo chord module with tests  
2. Arrangement data model (song → recording/version → immutable revision → lines/tokens/chord events)  
3. Server-rendered song page + play mode hydration of same arrangement  
4. Search (Sinhala/Tamil/English + romanization field)  
5. Editorial verify/unpublish/revert admin writes  
6. Error-report writes  
7. Diagram asset lookup by chord/tuning/voicing  
8. Takedown path and legal gates for lyrics  
9. Editorial sprint: thirty requested songs  

### Epic breakdown (suggested)

| Epic | Intent |
| --- | --- |
| E1 Chord engine | Structured chords, transpose, capo composition, spelling, barre/open classification seeds |
| E2 Arrangement & publish | Domain model, revisions, verify states, citations |
| E3 Song & artist surfaces | SSR song page, version switcher, artist pages |
| E4 Play mode | Stage UI, wake lock, sections, advance, font, dark, diagram peek, device cache of opened arrangement |
| E5 Search | Analyzers, aliases, romanization, zero-result capture as editorial backlog |
| E6 Trust loop | Error reports, admin review, unpublish/revert, takedown |
| E7 Content sprint | Thirty songs, guitarist requests, two-ear verification |

### Suggested sequence

1. Play view + transpose engine (architecture: SSR site + relational store + pure chord module)  
2. Thirty songs editorial sprint in parallel as soon as model exists  
3. Search and artist pages  
4. Error report and takedown live before catalog is public  
5. Only then accounts and memory features  

Willingness to pay remains an **open question** until the play habit exists—do not design the company around an unearned subscription.

---

## Post-MVP roadmap

**Next after minimum:** accounts, favorites, setlists, remembered key and capo, practice path on one song, chord-vocabulary filter, better romanization, trending from real plays, cache of recent songs / offline packs direction, share links with key+capo, optional browse ads with premium quiet browsing.

**Later still:** community diffs, editor tools at scale, premium offline, Tamil corpus parity push, classroom or worship only if rights are clear, deterministic similar songs, then tuner and metronome.

**Year-one horizon (direction):** a few hundred verified requested songs; play mode; transpose; capo; three-script search; artist pages; retention via remembered settings, failed-change practice, and Saturday’s set one tap away.

**Moat:** verified local corpus, alignment quality, and alias search—not a tuner.

**Global later:** same product + new corpus from diaspora demand; not an English tab clone.

---

## AI opportunities

### Deterministic forever (not models)

Chord structure; transpose; capo composition; spelling toward target key; diagrams; barre and easy-voicing class; progression similarity; difficulty signals computed from structured chords first.

### Model suggestions (labeled, never silent rewrite)

- Practice order or easier shape suggestions  
- Romanization and alias proposals for human confirm (catalog tool)  
- Draft chord extraction behind a reviewer  
- Call a model only where rules run out for difficulty / similar progressions / barre classification  

### Must never auto-publish

Any model output. Brochure future (hum a chorus → sheet) and landfill future (wrong chords outranking good ones) share the surviving move: **never auto-publishing model output**. Provenance stored: model, version, reviewer, time. Screen says when a human has not checked it. Users can report a wrong suggestion in two taps.

### Do not lead the brand with AI chord extraction

Invites marketing claim and legal claim. AI is off the critical path to validation. Delete AI and the product can still be excellent.

### Feasibility vs legal permission

Technical ability to extract chords from audio is not legal permission. Keep separate in every AI idea. Audio extraction only experimental after counsel. No master uploads; no YouTube ripping even if the user supplies a URL—link out.

---

## UX architecture

### Information architecture

- **Identity:** Song (aliases, languages) → Recording/Version (key, tempo, suggested capo, source, verifier) → Arrangement revision (sections, lines)  
- **Home:** Continue, short local trending, search—not a magazine. Provocation kept: homepage can emphasize the song you are learning; catalog discovery lives on search and landing pages (split surfaces).  
- **Primary navigation:** search, the song, play, practice, your library.  
- **Doors for SEO/browse (not main tabs):** artist, genre, language hubs. Genre taxonomy local-first: film, baila, calypso, pop, choir/worship, campus, oldies, new video hits—map to global genres later.  
- **Trending:** played here this week from on-site play starts—not a copied global chart.  
- **Sheet above the fold;** story about the song optional and below (recipe-site pattern).

### Core screens

| Screen | Role |
| --- | --- |
| Home | Continue + local trending + search |
| Search results | Title/artist/fragment; zero results feed editorial queue |
| Song | SSR arrangement, version switcher, citations, long-tail sections (capo/easy) on-page |
| Play | Stage; one column; hydrates same arrangement |
| Practice (post-MVP) | Sectional path; failed-change drill |
| Library (post-MVP) | Favorites, setlists, offline packs |
| Artist | SEO + browse door |
| Report | Two-tap wrong chord / wrong suggestion |
| Admin (internal) | Verify, unpublish, revert |

### Mobile Play Mode flow

1. Open arrangement (cached on device after open).  
2. Landscape preferred on stand; portrait hand-held fallback.  
3. Dark high-contrast default. Wake lock on (or one-line failure).  
4. Current line high enough after glance down; next line as preview only; everything else leaves.  
5. Controls in bottom band or edges—one-handed; no fretting-hand pinch-zoom.  
6. Announce/highlight chord only when it changes—not beat-by-beat fighting the singing.  
7. First-time chord in song may show diagram once, then symbol only; peek on demand.  
8. Section chips; huge advance-line zone; optional auto-scroll by feel (reduced motion ⇒ no auto-scroll).  
9. Chord-only view for players who know the words is acceptable territory; do **not** build a separate lyric catalog.  
10. No ads, upgrades, or rating prompts.  

Accessibility notes from session: chord identity is not color alone; desktop key paths exist for search and transpose even though design is mobile-first; system fonts covering Sinhala and Tamil (or hosted subset)—a Latin-only web font that delays lyrics is a defect.

### Practice Mode flow (post-MVP, intended)

1. Enter from song or from home drill of the change you fail most often.  
2. Lesson-path order: meet the chord → meet the change → meet the section → then the song.  
3. Section chips drive practice more than pixel scroll.  
4. Isolate a failing change (e.g. G-to-C) without restarting the whole song.  
5. Spaced repetition only for missed changes—not a separate course product.  
6. Streak = songs touched this week, not guilt.  
7. Performance mode later hides practice chrome for weddings/services.  
8. Strum taught first as spoken down-up syllables (including Sinhala mnemonic) before any animation.  
9. No microphone judging in this flow for the foreseeable product.

---

## SEO strategy

| Surface | Indexing |
| --- | --- |
| Song pages (verified) | Index — primary; query pattern: song name + chords in the script people use |
| Artist pages | Index |
| A few real human hubs (e.g. language) | Index |
| Draft sheets | Never indexable |
| Faceted filter URLs | noindex |
| Thousands of chord/key/capo combination pages | Do not create; long-tail lives as sections on the song page |

**Long-tail on-page:** Capo and easy versions as sections on the song page, not extra URLs. Internal links: artists and same-chord songs.

**Sinhala / Tamil / English queries:** Accept native scripts and common romanizations; store normalized romanization index; display native title. Primary title stays in original script; English alias is a search key, not a replacement name. Code-switching and romanized chorus lines need alias lines so search finds the phrase people sing. Artists need aliases (nicknames, shortened names, spelling variants). Sinhala Unicode normalization and Tamil normalization are separate workstreams.

**Structured data caution:** Play payload is compact structured data for the client; do not invent thousands of thin landing pages. Prefer largest useful catalog, not largest page count. Empty programmatic pages such as every chord-name URL must not get indexed.

**Warning:** The worst SEO plan is thousands of chord/key/capo combinations. The inverse is real songs, real artists, and hubs a human would browse. Zero-result queries become the transcription queue.

Server-render the song so crawlers and slow phones see the first verse. Play mode is a second rendering of one arrangement—not a canvas-only sheet.

---

## Monetization options

### Free experience includes

Full play of the verified catalog. Correctness is not a luxury feature. Do not paywall the sheet.

### What people might pay for later

Offline packs; ad-free browse; synced setlists that follow the person across devices. First payer archetype: hobbyist (e.g. Ruwan) who wants offline and no ads while playing—play itself stays clean; premium removes browse ads and adds offline/sync.

### Rejected

- Paywalled chords / premium-only readable sheet  
- Ads, upgrades, or rating prompts inside play mode  
- Designing the company around a subscription before willingness to pay is earned  

### Compatible with this audience

Ads may sit on browse and search only, never shifting play layout. Gear affiliates and teacher directory later—disclosed, optional, never in play view—after trust exists. Teachers are a later segment. Willingness to pay is an open question until the play habit exists.

---

## Copyright and legal considerations

| Topic | Direction from discovery |
| --- | --- |
| Lyrics | Hard copyright. Chord names safer but not a free pass when locked to full lyric. Counsel decides before lyrics go wide. Lyrics removable per song without breaking chord timeline. |
| Chord transcription | Still requires care; verified human process. |
| Chord-only vs full sheet | Adult policy: chord-only where lyrics uncleared; full sheet where cleared or original local work. Inconsistency beats a lawsuit. |
| User content | No public submission without contributor agreement: license to display, representation, warranty, right to moderate or refuse. |
| Takedown | Contact, form, log, fast unpublish live before catalog is public. Map to Sri Lankan law with counsel; remain familiar to foreign publishers. |
| Audio uploads | Do not accept full-song uploads in the minimum product. Masters—even temporary—are rights and security problems. Object storage is not for audio masters. |
| YouTube URLs | Fetching/ingesting audio can break platform terms even when user supplies the link. Link out; do not ingest. |
| AI output | Feasibility ≠ permission. Never auto-publish. Provenance required. Do not lead brand with extraction. |
| Practice history / privacy | Practice history stays out of any sale or ad profile. Analytics can be logged out and query-level. Do not record microphone audio. |
| Terms / privacy / contributor agreements | Required before public editing; counsel for lyric licensing of a top local hundred is slow/expensive and potentially a real moat if a publisher will talk—open/strategic option, not MVP dependency. |
| Moderation | Not English-only while submissions are Sinhala and Tamil. Small editor group, version history, revert—not open wiki day one. Comments under songs rejected to avoid lyric/politics fights. |
| Paper export | Same legal content, different surface—for venues that ban phones. |

Distinguish throughout: **technical feasibility is not legal permission.**

---

## Technical architecture proposal

### Recommended architecture

- One web client as an installable site (PWA direction)  
- Server-rendered song pages; play mode hydrates the same arrangement—do not draw the sheet on a canvas  
- Single relational database; no microservices  
- Shared pure module for transpose and capo so a native client later does not invent a second engine  
- Object storage not for audio masters  
- Locale-neutral data model; Sri Lankan launch content and navigation; no second codebase for global later  

### Domain model / core entities

- **Song** — identity, aliases, languages; primary title in original script  
- **Recording / Version** — key, tempo, suggested capo, source, verifier; multiple versions first-class  
- **Arrangement revision** — immutable and cacheable; sections and lines; edits publish a new revision  
- **Line** — lyric tokens plus chord events anchored at token index (grapheme clusters, not Latin characters only—lines may switch language mid-lyric)  
- **Chord event** — structured (root, quality, extensions, bass); display text derived  
- **Diagram** — keyed by chord, tuning, voicing; shared drawings, not a photo per chord baked into song text  
- **User memory** (later) — key, capo, progress, setlists; do not fake profiles with device-only data  

### API boundaries

- **Public reads:** song, search, artist  
- **Writes at first:** error reports  
- **Admin writes:** verify, unpublish, revert  
- Auth can wait for MVP  

### Search strategy

Text analyzers for Sinhala, Tamil, and English plus a romanization field. Chord search structured later: contains, count, no-barre, tuning. A song is no-barre only if every chord has an open shape in the stated tuning. Zero-result queries logged as editorial backlog.

### AI architecture

Separate suggestion services from the verified sheet store. Models write drafts/suggestions with provenance; humans promote to reviewed/verified. Deterministic engines own music math. No silent rewrite of verified sheets.

### Storage / caching / CDN / PWA

Arrangement revision is the play payload—compact structured data. Opened arrangement stays on device for dead spots. Cache recent songs; later download song/set with storage visibility. CDN for static assets and SSR. Installable site; offline packs as premium direction.

### Scalability

Start simple: one app, one DB. Editorial accuracy is the real constraint, not microservice scale. Index only valuable URLs.

### Security

No master audio storage; takedown and unpublish; contributor warranties before public edit; practice history not sold; no mic audio recording in analytics.

### Answers to explicit architecture questions

| Question | Answer |
| --- | --- |
| Deterministic vs AI | Deterministic for chord structure, transpose, capo, spelling, diagrams, barre/easy class, progression similarity. AI may suggest only, labeled, never auto-publish. |
| How chords and lyrics are represented | Line = lyric tokens + chord events at token index; chord events structured; display derived; lyrics removable per song without breaking timeline. |
| Transpose | Pure function: add semitones to pitch classes, respell toward target key, keep slash bass, leave N.C./percussion alone; unparsed annotations untouched and flagged. |
| Capo | Transpose-by-fret with two labels (sounding key vs shapes). User states sounding key and capo fret; system solves shapes—does not apply both as blind shifts. |
| Multiple versions | First-class; one canonical song URL with switcher; no competing duplicate indexable URLs. |
| Community corrections | Structured change at a chord anchor → editorial ticket → new revision; not replacement essay or open wiki. |
| AI validation | Human ear on recording before verified; provenance; screen discloses unchecked model output. |
| Play-mode caching | Play payload = immutable revision; keep on device after open; share links pin revision or follow latest by explicit choice. |

---

## Competitive landscape

Grounded in session category patterns—not inventing precise competitor feature matrices.

| Category | Pattern vs SongChords |
| --- | --- |
| **Ultimate Guitar** | Already won English pop tabs; tab/rating/version maze is a failure mode on a narrow phone. Do not compete by cloning that maze or that corpus. |
| **Chordify / audio-to-chord tools** | Category promise of extraction speed; session warns AI extraction publishes wrong chords at scale. Feasibility ≠ permission. Do not lead brand here. |
| **Songsterr** | Interactive playback / tab category expectations; SongChords wedge is singable phone play for local repertoire, not a feature race. |
| **YouTube guitar lessons** | Oral/video memory of local songs; product becomes written memory and play companion, linking out rather than ingesting. |
| **Guitar-learning apps** | Lesson paths, streaks, tuners—steal selective patterns (sectional practice, non-guilt streaks) but postpone tuner/mic pedagogy. |
| **Local lyric/chord sites** | Search traffic and static pages exist; without playability while holding a guitar, they remain screenshot fodder. Alias/script search and verified stamps are the gap. |

**Common expectations:** search by song/artist, some transpose, multiple versions, diagrams, mobile page. Meeting expectations is table stakes; the wedge is verified Sri Lankan repertoire, play mode that respects a guitar in hand, alias/script search, and honest versions.

**Differentiation sentence:** a phone playbook for Sri Lankan songs, checked by guitarists, in the script you search and the key you sing.

**Weaknesses to avoid:** login wall before first chord; wrong chords; BPM-locked scroll; ads in play; paywalled readability; English-only moderation; UG maze on mobile; thin programmatic SEO pages; leading with “we have AI”; promising a tuner that feels broken on iOS Safari.

**Sri Lankan localization opportunities:** Sinhala/Tamil/Singlish/Tanglish search; local genre taxonomy; oral-tradition songs as written memory; worship/service setlists as discovered job (rights first); tuition shops and campus circles as channels; WhatsApp share of play links meeting notebook-photo habit; trending from local plays; Tamil parity as positioning.

---

## Key risks

| Risk | Why it matters |
| --- | --- |
| Chord/version mismatch with the room | Product fails socially at the gig |
| Lyric copyright claims before users exist | Existential; counsel and removable lyrics |
| AI or scraper wrong chords at scale | Trust and legal dual risk |
| Login wall or ads in play | Bounce and broken job |
| Capo + transpose double-shift bugs | Permanent trust loss |
| Chords stored as display strings | Cannot round-trip transpose (C♯/D♭, slash, N.C.) |
| Sinhala/Tamil search miss / English-only moderation | Acquisition and ops failure |
| Thin SEO landfill | Quality and ranking long-term harm |
| Tuner-led brand | Broken mic UX becomes the brand |
| Coverage pressure vs verification | Drafts leaking into index |
| Worship/classroom expansion without rights | Legal and focus risk |
| Building teacher product too early | No supply until student habit |
| Monetizing before habit | Subscription theater |
| Dead network at hall blanks chorus | Must cache opened arrangement |
| Auto-scroll fighting live singing | Honesty of manual advance |

---

## Open questions

- Willingness to pay: unproven until play habit exists; what package converts hobbyists first?
- Exact counsel outcomes for lyrics at scale; which songs can ship full sheet vs chord-only at launch?
- Will any publisher talk about licensing a top local hundred (press/moat option)?
- How strictly to require two guitarists vs one verifier under time pressure for the first thirty?
- Share-link policy default: pin revision vs follow latest?
- How soon to allow optional browse ads without training users that the product is “ad-supported chords”?
- Worship catalog: when are rights clear enough to treat service setlists as a real content line?
- Paper export: in MVP polish or immediately after validation?
- Stand mode / Bluetooth pedal: novelty or serious gig accessory?
- Comfort-note singable-key flow: post-validation priority relative to practice path?
- Global corpus choice: which diaspora repertoire first, and how to avoid English-pop red ocean?
- Contributor reputation systems: when do editors exist enough to open broader submissions?
- Metrics thresholds for “play complete” and validation success beyond “opened a second song”?
- Font strategy: system fonts vs hosted subset for Sinhala/Tamil performance on low-end phones?

---

## Recommended next BMAD artifact

Produce a **product brief** next via `bmad-product-brief`, using this discovery as input. Freeze MVP scope, the exclude list, the chord data model, and the legal gates. Only then write a PRD via `bmad-prd`.

**Do not start production code from this document alone.** The brainstorm and this discovery define product direction; they are not a build license.
