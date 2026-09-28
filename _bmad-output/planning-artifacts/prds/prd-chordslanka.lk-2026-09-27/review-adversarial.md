---
title: Adversarial Review — chordslanka.lk PRD
status: review
created: 2026-09-27
reviewed-artifacts:
  - prd.md
  - addendum.md
---

# Adversarial Review: chordslanka.lk PRD

## Overall Verdict

This is a well-written PRD for a product that cannot pay its author. The document is unusually disciplined about vocabulary, testable consequences, and guardrails — and that discipline is being spent decorating a business model that does not close arithmetically. At the Sri Lankan music-category AdSense RPM the PRD itself quotes in §4.8 (USD 1–3 per thousand pageviews), earning USD 1,000 per month requires roughly 22,000 ad-eligible pageviews per day, which is several multiples of the traffic the neglected market leader appears to command after years of accumulation in §16. The PRD never states a revenue target anywhere (§2.1 names the owner's job as "generate real advertising income"; SM-4 in §7 then tracks RPM with no threshold attached), which is precisely why the gap has gone unnoticed: the one number that would falsify the plan was never written down.

Worse, the product is designed to suppress its own revenue. The flagship differentiator carries no advertising by explicit design (FR-5, FR-27, §10), the success metric SM-2 targets driving 25% of song sessions into that ad-free surface, and FR-18 through FR-20 exist to eliminate the navigation steps that §12 names as the number-one revenue lever. Every user journey in §2.3 describes a one-pageview session. Meanwhile the legal posture is not merely risky, it is actively worse than the incumbent's: by having the administrator ingest and publish 5,000 lyric sheets himself (FR-24, FR-25), the founder becomes the primary publisher of the infringing material rather than a host of user-submitted material, which forfeits the intermediary-liability position that chordslankalk.com's submit-plus-DMCA structure (§16) was probably built to obtain. The §14 mitigations for this — "counsel before launch," "structurally removable lyrics," "original editorial content" — are theatre in that order: counsel that no solo founder will pay for and that cannot give a green light, a kill switch mislabelled as a mitigation, and a misunderstanding of how copyright and AdSense policy actually work.

Set against that, the execution plan is a solo founder shipping 32 functional requirements with no phasing, no timeline, no hour budget, and no release criteria, including a document-ingestion pipeline whose accuracy and cost are openly unresolved (OQ-3) while five other sections assume it works, and an editorial requirement (FR-32) that implies roughly a million words of original English prose about Sinhala songs. This PRD should not proceed to architecture. It should go back to a one-page business case that either finds a different revenue model, a different audience, or a smaller product — and if none of those survive contact with the numbers, this should be re-scoped as a portfolio project and honestly labelled as one, because the current framing sets the founder up to spend a year of evenings to earn pocket change and possibly lose an AdSense account in the process.

---

## Critical

### C-1. There is no revenue target, and when you supply one the arithmetic fails

**Location:** §2.1 (owner's job), §7 SM-4, §12, §4.8 Notes, §13.4

**What is wrong.** §2.1 states the owner's job as generating "real advertising income" from 5,000 sheets. That is the reason the project exists. Nowhere in eighteen sections is that quantified. SM-4 — the only metric connected to the actual goal — is defined as "tracked from first serving" with no target, no floor, and no decision attached to any value. SM-2, by contrast, carries a precise 25% threshold that §18 admits is a guess. The PRD has invented thresholds for things that do not matter and left the thing that does matter unbounded.

Run the numbers the PRD's own §4.8 supplies. Take USD 1.50 RPM as a central case for a Sinhala-dominant, mobile-heavy, music-category audience:

| Monthly gross | Ad-eligible pageviews/month | Pageviews/day |
| --- | --- | --- |
| USD 100 | 67,000 | ~2,200 |
| USD 300 | 200,000 | ~6,700 |
| USD 1,000 | 667,000 | ~22,000 |
| USD 2,000 | 1,330,000 | ~44,000 |

Now calibrate against the market. §16 records the incumbent's *top* song at 262,000 views — that is a lifetime cumulative counter on a site operating for years, across ~2,500 songs with a steep power-law tail. A site whose single best page has accumulated 262k views over its whole life is not doing 667,000 pageviews a month. To clear USD 1,000/month, chordslanka.lk must become several times larger than the established, trafficked market leader, in a category split across at least six live sites, serving a language spoken by roughly 17 million people of whom guitar-chord searchers are a small fraction. The total category search volume very likely cannot produce USD 1,000/month for *anyone* at Sri Lankan RPMs, let alone for the sixth entrant.

A realistic ceiling — the founder becomes the clear category leader after 18–24 months of SEO grind and holds 30–40% of category search — lands somewhere in the USD 150–400/month band. Against a build that is conservatively 800–1,500 solo hours plus perpetual ingestion, editorial, and moderation labour, that is materially below minimum wage, and it only arrives *if* AdSense approves a site of reproduced lyrics (see C-3).

**What I would do.** Before any architecture work, write a one-page business case with three numbers: the monthly gross that makes this worth the founder's time, the pageviews that implies at USD 1.50 and USD 3.00 RPM, and the honest estimate of category search volume it must capture. If the required share exceeds ~50% of the entire Sri Lankan chord-search market, the project is not an income project and the PRD's framing must change. Add a hard SM-4 target and a date, and add an explicit abandonment criterion — "if gross is below USD X at month 12, stop" — which the PRD currently lacks entirely.

### C-2. The product is architected to minimise the thing that generates money

**Location:** §4.2 (FR-5), §4.5 (FR-18–FR-20), §7 SM-2 and SM-8, §12, §2.3 UJ-1 and UJ-3, §10

**What is wrong.** §12 lists the revenue levers "in priority order: pages per session, audience mix, page speed, then catalogue breadth." Then the PRD spends its best engineering on reducing pages per session:

- FR-5 and FR-27 guarantee Play View carries no advertising. SM-2 sets a *success* target of driving 25% of song-page sessions into that zero-revenue surface, where FR-6's wake lock and FR-7's autoscroll are explicitly designed to keep them for the duration of a song. The flagship feature is a monetisation dead end, and the primary metric rewards growing it.
- UJ-3's stated climax is "zero searches for a session of playing." Read against §12, that is the climax of zero ad impressions. FR-18, FR-19, and FR-20 are a deliberate, well-built machine for removing Discover Surface visits from the returning visitor's session — and returning visitors are, per §1, "the only asset the business has."
- UJ-1 is a single-pageview session: Google → song page → Play View → done. One ad-eligible impression, possibly below the fold, on a page whose FR-2 explicitly forbids advertising from delaying or moving the content.

So the two most-loved features and both primary journeys attack lever #1, the flagship metric measures progress at doing so, and SM-8 (pages per session) sits in the *secondary* list. This is not a tension to be managed; as written it is a product that has decided not to earn.

**What I would do.** Either accept the conflict openly and drop advertising as the business model (see C-5), or redesign the monetised journey so the ad-free promise is affordable: make Play View entry cost a Discover Surface transition, monetise collection and favourites views as Discover Surfaces, and set an explicit revenue-per-session floor as a first-class constraint alongside the Play View purity constraint. At minimum, promote SM-8 to primary, demote SM-2, and state in §12 the expected ad impressions per session for each of UJ-1 through UJ-3 — do the multiplication in the document.

### C-3. The legal mitigations are theatre, and the plan actively forfeits the safe harbour the incumbent has

**Location:** §13.1, §14 (rows 1 and 10), FR-24, FR-25, FR-22, OQ-4, §4.10

**What is wrong.** Take the four mitigations in §14 row 1 in turn.

1. *"Counsel before launch."* A solo founder building for advertising pennies will not retain IP counsel, and if he does, no competent counsel will advise that publishing 5,000 unlicensed Sinhala song lyrics is fine. The mitigation's only honest outcome is "do not do this," which the PRD is not prepared to hear. It is a placeholder that lets the plan proceed while appearing to have addressed the risk.
2. *"Structurally removable lyrics" and a "chord-only fallback."* This is a kill switch, not a mitigation. A chord-only sheet is a product nobody in §2.3 wants, ranks for nothing, and cannot support FR-1's entire premise of chords anchored to lyric syllables. Calling the ability to destroy the product a mitigation for the risk of having to destroy the product is circular.
3. *"Live takedown route."* Takedown-plus-safe-harbour protects *hosts* of third-party material. FR-24 and FR-25 have the administrator personally converting and publishing the catalogue. That makes the founder the primary publisher and direct infringer for those 5,000 pages, with no intermediary shield available for them. Note what §16 records about the incumbent: submit, request, contributors, and a DMCA page. The incumbent's community-submission posture is very plausibly a deliberate liability structure. This PRD keeps the DMCA page and throws away the structure it protects.
4. *"Original editorial content per Song" (FR-32).* Original prose surrounding a reproduced lyric does not cure the reproduction, and it is irrelevant to whether AdSense's copyright policy flags the page. §4.10's claim that editorial "makes pages defensible on their own content rather than resting on reproduced lyrics" conflates SEO defensibility with legal defensibility. They are unrelated.

Then OQ-4 — "Publish in full, abridge, license, or omit?" — quietly includes a branch that does not exist. Lyric licensing at micro-publisher scale is not procurable; the aggregators who hold those rights deal with platforms at scale and for money, and Sinhala catalogue rights are fragmented across labels, estates, and lyricists with no collective licence to buy. The real option set is publish-and-hope, abridge-and-hope, or omit. OQ-4 should say so.

Finally, §13.1 correctly notes this is "an existential event, not an inconvenience" — and then the PRD proceeds to put all 32 FRs in MVP scope anyway (§6.1), including the ones that only pay off if the account survives.

**What I would do.** Resolve OQ-4 *before* writing a line of code, and resolve it as a binary gate with a named date and owner. Restructure to the incumbent's posture if publishing proceeds: visitor submissions (FR-22) become the primary catalogue path, founder ingestion becomes a private editorial tool, terms and DMCA agent registration go live first, and the founder never appears as the uploader of record. Delete the four §14 row-1 mitigations and replace them with one honest line: "If the lyrics posture is not resolved, this product does not launch." Also add the missing contingency: what ships if the answer is "omit lyrics"?

### C-4. OQ-11 is buried at the bottom of the list and it can destroy the entire asset

**Location:** OQ-11 (§17), §2.1, §4.7, §15, UJ-5

**What is wrong.** OQ-11 asks, as the eleventh of eleven open questions, "Where did the 5,000 sheets come from?" Everything upstream treats them as an owned, unencumbered asset: §2.1 calls them a catalogue "that currently earns nothing sitting in Google Drive," §15's entire Why Now rests on them, §4.7 calls ingestion "the founder's explicit version-one bet," and UJ-5's resolution claims they produce "the only durable advantage available."

If those JPEGs and PDFs were downloaded, screenshotted, or scraped from other chord sites — and a 5,000-file personal collection of chord sheets in a Drive folder is overwhelmingly likely to have been assembled that way — then three things are simultaneously true and all three are fatal:

- The transcriptions are someone else's work product, layering a second infringement on top of the lyric exposure, and plausibly against the very incumbent whose traffic this plan targets, who also holds the confusingly similar brand (§13.2).
- Google will recognise the content as duplicative of pages it has indexed for years on higher-authority domains. The traffic model in C-7 collapses: you cannot outrank the original with a copy of it.
- AdSense's scraped-content policy is triggered independently of the copyright policy, doubling the approval risk in §14 row 1.

The PRD's competitive advantage, its Why Now, its gating capability, and its revenue model all stand on an asset whose provenance the document admits it does not know.

**What I would do. ** Answer OQ-11 today, before anything else in this document is actioned — it is cheaper to answer than any other open question and it has the widest blast radius. Sample 50 files at random and identify their source. If any material portion came from other sites, the ingestion bet (§4.7), the catalogue-speed advantage (UJ-5), and §15 are void and must be rewritten around a catalogue the founder transcribes or sources with permission. Promote OQ-11 to OQ-1 and mark it launch-blocking alongside OQ-4.

### C-5. The non-goals foreclose every revenue model that fits the achievable traffic

**Location:** §5, §12

**What is wrong.** §5 rules out paid products, subscriptions, premium tiers, and ad-free purchases; §12 additionally rules out donations, affiliate placement, and sponsored content. The document then commits to AdSense as the sole revenue source.

This is exactly backwards for the traffic scale established in C-1. At 5,000–15,000 daily pageviews from a local audience, display advertising yields USD 100–300/month. The models that *do* produce meaningful income at that scale are precisely the ones banned: a small paid tier for the serious subset, sponsorship from local music retailers and schools who would pay more for a targeted Sri Lankan guitarist audience than any ad exchange will, affiliate revenue on instruments and capos, or paid placement for local teachers. §5 forecloses all of them on principle — "correctness and readability are never sold" — and the principle is admirable, but the founder is building this for income, and the PRD has removed every option that could deliver it while keeping the one that cannot.

Note also that the banned models are largely compatible with the Play View promise in §10, whereas AdSense is the one that is in direct conflict with it (C-2).

**What I would do.** Reopen §5 and §12 as a monetisation decision rather than a values statement. Keep "reading and playing a song is free" as the principle, then ask which non-display models honour it. Sponsorship of Discover Surfaces and affiliate placement on gear-adjacent content both survive that test and both out-yield AdSense at this traffic level. If the founder truly rejects all of them, C-1's conclusion stands unmitigated and should be written into §1.

### C-6. Thirty-two requirements, one person, no phasing, no dates, no hour budget

**Location:** §6.1, §6.2, §13.4, whole document

**What is wrong.** §6.1 places FR-1 through FR-32 in MVP scope. That is not an MVP; it is the product. The list includes a structural chord model with key-aware respelling, cross-script search with Sinhala and Tamil normalisation plus romanisation matching, a device-to-account migration path, a four-language moderation queue with revert, a document-ingestion pipeline with side-by-side review UI and duplicate detection, a PWA shell, a configurable ad layer with provider abstraction, and original editorial content for every song. §6.2's deferral list is all features the founder never asked for, which means nothing was actually cut.

Multi-script search alone (FR-15) is a specialist project: Sinhala Unicode normalisation, Tamil normalisation, and Singlish/Tanglish transliteration variance are three separate bodies of work, as the addendum itself concedes. The ingestion tooling (FR-24–FR-26) is a second application with its own review UI. Realistically this is 800–1,500 hours for a competent solo developer working evenings — nine to eighteen months to first revenue, during which income is zero and the AdSense question (C-3) remains unanswered.

There is no timeline in this PRD. No milestones, no release phases, no founder hours-per-week figure, no definition of done, no release criteria. §13.4 constrains infrastructure cost to near zero but says nothing about the far more scarce resource, which is the founder's time.

**What I would do.** Define a genuine v0 that can be live in six to eight weeks and can answer the two existential questions cheaply: 100–200 songs, FR-1, FR-2, FR-5 through FR-8, FR-10 through FR-13, basic title search, and the ad layer. That is enough to apply for AdSense, measure real RPM, and measure real Play View behaviour. Defer FR-14's lyric-fragment search, FR-15's cross-script matching, FR-19's collections, FR-20's accounts, FR-21 through FR-23's entire moderation apparatus, FR-24 through FR-26's ingestion, FR-30, FR-31, and FR-32 to after the numbers come back. Add a phase table with dates and an hours-per-week assumption to §6.

### C-7. The entire traffic model is assumed into existence — there is not one requirement about acquisition

**Location:** UJ-1, §7, §12, §9, absent throughout

**What is wrong.** UJ-1 — the primary journey — opens with "he types a fragment of the title into Google, taps the chordslanka.lk result." That single clause is doing more load-bearing work than any assumption in §18, and it is not flagged as an assumption at all. Every pageview in C-1's arithmetic depends on it.

The PRD contains no functional requirement for sitemaps, structured data, canonical tags, title and meta patterns, hreflang for a multi-script multi-language catalogue, internal linking strategy, pagination handling, or Core Web Vitals field measurement. FR-17's consequence about indexable Artist Pages and non-indexable facets is the only nod to search at all, and §9 gives no crawl architecture. There is no link-acquisition plan, no social or community seeding plan, and no acknowledgement that the competitor set in §16 has five to seven years of domain age, accumulated backlinks, and existing rankings for every head term the new site needs.

Realistically a new .lk domain publishing content that partially duplicates the incumbent (C-4) faces a 12–24 month climb to competitive rankings, if it gets there. The PRD budgets zero effort for it and zero time for it.

**What I would do.** Add a feature section for discoverability with real FRs: crawlable catalogue architecture, per-page metadata rules, structured data, sitemap generation on publish, field-measured page speed. Then add a traffic plan to §12 with a monthly pageview trajectory and the acquisition mechanism for each phase, because organic search will deliver nothing for the first two quarters. Tag the UJ-1 arrival step as `[ASSUMPTION]` and index it in §18 — it is the single biggest unflagged bet in the document.

---

## High

### H-1. FR-32 is unsurvivable at catalogue scale, and automating it triggers the risk it exists to mitigate

**Location:** FR-32 (§4.10), §6.1, §7 SM-3, §18

**What is wrong.** FR-32 is in MVP scope with no volume qualifier, no word count, no quality bar, and no definition of "original." §4.10 wants it for every Song. SM-3 targets 1,000 published songs in the first release cycle. At a defensible 250 words per piece, 1,000 songs is 250,000 words and the full 5,000 is 1.25 million — and §4.10 specifies it should be in English to rank, meaning original English prose about the artist and harmonic content of 5,000 Sinhala songs. At 20 minutes each, which is fast for genuinely original writing that requires knowing the song, 5,000 songs is roughly 1,670 hours. That is a year of full-time work on top of C-6's build.

The obvious escape is generation. That escape is a trap: bulk-generated per-page filler is exactly what Google's scaled-content-abuse policy and AdSense's low-value-content policy target. So the mitigation nominated in §14 row 1 for the AdSense risk becomes, if executed at the only feasible speed, a fresh AdSense and Search risk. §4.10 is also internally overreaching when it claims editorial "makes pages defensible" — see C-3 point 4.

**What I would do.** Cut FR-32 from MVP. Reintroduce it as a bounded, targeted requirement: original editorial on the top 50 songs by traffic, written by the founder, with a stated word floor and a stated purpose (pages-per-session lift, measured). Remove the legal-defensibility claim from §4.10 entirely. Add an explicit prohibition on bulk-generated editorial to §5's non-goals, since it is the default failure mode.

### H-2. UJ-5's throughput claim is off by an order of magnitude and OQ-3 has no abort threshold

**Location:** UJ-5 (§2.3), FR-24, FR-25, §7 SM-3, §14 rows 2–3, OQ-3

**What is wrong.** UJ-5's climax is 400 sheets published in an afternoon. Call an afternoon five hours: that is 45 seconds per sheet including opening the source image, reading the converted output against it, checking every chord position, confirming the key, resolving flagged uncertainties, and approving. FR-25 requires side-by-side comparison against the Source Artefact for *every* candidate, which means a human reads two representations of a chord sheet in full. Even at 95% accuracy that is realistically 2–4 minutes per sheet. At 5,000 sheets, 3 minutes each is 250 hours. UJ-5 is optimistic by roughly 10–40×, and SM-3's 1,000-songs target inherits the error.

Now the gating problem. §14's mitigation for OQ-3 is "technical spike before commitment," but the PRD never says what result kills what scope. If the spike returns 70% accuracy, review time per sheet approaches or exceeds manual transcription time — at which point ingestion has negative value and FR-24 through FR-26 are wasted build. If per-sheet cost is USD 0.10, the 5,000-sheet run is USD 500 against a revenue expectation of USD 150–400/month (C-1), which is a material fraction of year-one gross. Nothing in the PRD names either threshold, and five sections (§4.7, §6.1, §7 SM-3, §15, UJ-5) proceed as if the spike will succeed.

**What I would do.** Write the decision rule into §4.7 before the spike runs: state the maximum acceptable review minutes per sheet and maximum cost per sheet, and state what v1 becomes if either is exceeded — namely 200 hand-transcribed high-demand songs and ingestion deferred to v2. Re-baseline UJ-5 and SM-3 against measured review throughput, not aspiration. Add the founder's available hours per week so SM-3 can be sanity-checked at all.

### H-3. FR-24's uncertainty flagging assumes model calibration that does not exist

**Location:** FR-24, FR-25, addendum "Ingestion approach"

**What is wrong.** FR-24's consequence states that content the converter could not interpret is "marked as uncertain rather than omitted or invented," and FR-25 builds the review UI on top of that: uncertain regions are "visually distinguished for the reviewer." The addendum correctly observes that "whether errors are loud or silent matters more than the raw accuracy rate" — and then the PRD requires loudness as if it were a configuration option.

Multimodal models do not reliably know when they are wrong. A model reading a smudged chord sheet will emit a confident, plausible, incorrect chord — correct-looking, harmonically sensible, and completely unflagged. That is precisely the error class a reviewer skimming at UJ-5 speeds will not catch, and it is the error class that destroys the accuracy differentiation the product claims. The review process is designed to catch the errors the system admits to, which are the harmless ones.

**What I would do.** Make the spike measure silent-error rate specifically, on a labelled sample, as a separate number from overall accuracy, with a stated maximum. Change FR-25's review flow so it does not depend on converter self-report: require full read-through against the source, or require dual conversion by two different methods with disagreement as the flag. Adjust the per-sheet time budget in H-2 accordingly.

### H-4. Play View and Autoscroll are not a moat, and §16 already says so

**Location:** §4.2 Notes, §16, UJ-5 resolution, §1

**What is wrong.** The stated wedge is the phone-in-hand playing experience. Consider what it costs to copy:

- Autoscroll: a scroll loop with a speed control. A day's work, generously.
- Wake lock (FR-6): the Screen Wake Lock API, a handful of lines.
- Full-screen distraction-free view (FR-5): a route with the chrome removed. A day.
- Text sizing (FR-8), section jumps (FR-9): trivial.

An incumbent with existing traffic could ship the entire wedge in a week and would immediately out-earn the copy, because the feature's value is multiplied by the audience already on the page. There is no network effect, no data advantage, no switching cost, no proprietary input. §4.2's note claims "no local competitor advertises it" — and §16's own table records that slchords.com already offers "full-screen view, transposer, chord diagrams," which means the wedge is partially in-market today. The table's own conclusion for that site is "the clearest proof that features alone are not the differentiator." The PRD writes that sentence and then bets the product on features.

There is also a direct contradiction between two strategy statements. UJ-5's resolution says catalogue growth speed "is the only durable advantage available." §16's strategic conclusion says "catalogue size and transpose are table stakes in this market, not differentiators" and names the playing experience as the differentiator. These cannot both be the strategy, and the PRD never picks.

**What I would do.** Drop the claim that Play View is a moat; keep it as a quality bar, which is what §4.2's note actually argues and which is legitimate. Then identify a real defensibility candidate and write requirements for it — the strongest available is verified chord accuracy as a compounding data asset (the corrections flywheel in §4.6 plus structural chord data nobody else holds), because that gets better with use and cannot be copied in a week. Resolve the UJ-5 versus §16 contradiction explicitly in §1.

### H-5. Unauthenticated submissions plus a solo moderator is an unbounded time sink with no rate limiting

**Location:** FR-21, FR-22, FR-23, §13.1, UJ-4

**What is wrong.** FR-21 and FR-22 deliberately require no account, and §18 records the rationale — maximise volume. FR-23 hands the entire resulting queue to one administrator, and §13.1 additionally requires review by someone who can read Sinhala, Tamil, Hindi, and English.

There is no requirement anywhere for rate limiting, CAPTCHA or equivalent, spam classification, IP-level throttling, submission volume caps, or bulk rejection tooling. An open, unauthenticated, anonymous POST endpoint on an ad-bearing site will be found by automated abuse within weeks. §13.1's "nothing published unreviewed" guardrail means the spam never reaches visitors — it reaches the founder, whose time is the binding constraint on everything in C-6, H-1, and H-2. The queue becomes unworkable, moderation lapses, and the correction path that §4.6 calls "load-bearing" stops functioning.

Separately, UJ-4's resolution promises Sanduni that "when it is accepted, the sheet changes and she is credited." No FR delivers the notification. FR-21 makes contact optional and FR-23 says nothing about telling anyone the outcome. The journey's resolution is unsupported.

**What I would do.** Add an FR for submission abuse controls with testable consequences: per-IP rate limits, a bot challenge, bulk triage and bulk-reject in the Review Queue, and a measured cap on moderator minutes per week. Add an FR for contributor outcome notification, or amend UJ-4's resolution to stop promising it. Consider requiring accounts for whole-Sheet submissions (FR-22) while keeping single-chord corrections (FR-21) anonymous — that concentrates the abuse surface on the cheap-to-review path.

### H-6. Tamil, Hindi, and Devanagari support is being built for a catalogue that will not exist

**Location:** FR-15, §8 multi-script NFR, §13.1, §6.2, §3 glossary

**What is wrong.** FR-15 requires cross-script matching for Sinhala and Tamil. §8 makes correct Devanagari first-paint rendering a defect-level requirement. §13.1 requires moderation coverage in Sinhala, Tamil, Hindi, and English. §17's OQ list and §16's competitive table say nothing about Hindi demand at all, and §6.2 concedes the initial catalogue will be Sinhala-dominant "because that is what the 5,000 sheets are."

So the plan pays for three script pipelines, three normalisation strategies, and a four-language moderation obligation to serve content that the same document says will not be present. For a solo founder against C-6's hour budget, this is among the most expensive lines in the PRD and among the least justified. The moderation guardrail is worse than wasteful — it is probably unmeetable. Can the founder read Tamil and Hindi? The PRD does not say, and if he cannot, §13.1 is a guardrail that is violated the moment any Tamil content is published.

**What I would do.** Cut Tamil, Hindi, and Devanagari from v1 entirely. Make the data model language-agnostic (cheap) but build only Sinhala and English search, rendering, and moderation (much cheaper than three). Remove Hindi from §13.1 until there is Hindi content. State plainly in §13.1 which languages the operator can personally review, because that — not the platform — is the real constraint on which languages can be published.

### H-7. Nothing in the PRD addresses getting AdSense approved, or what happens if it is refused

**Location:** §12, FR-29, §14 row 1, §6.1

**What is wrong.** The whole business is one approval decision by one party. FR-29 specifies how to configure the publisher identifier and how to switch ads off — implementation detail for a state the PRD assumes will be reached. There is no requirement covering the eligibility prerequisites (content volume, site navigation, policy pages, domain age expectations), no plan for the review window, no decision about whether to apply at 100 songs or 1,000, and no contingency for refusal or for post-approval suspension. §14 row 1 names the consequence — "the business model disappears" — and offers only the four mitigations dismantled in C-3.

Note the ordering problem this creates. AdSense approval is both the cheapest and the most decisive experiment available, and it can be run on 100 pages. The PRD schedules all 32 FRs (§6.1) before finding out.

**What I would do.** Make AdSense approval the v0 exit criterion in C-6's phase plan: publish 100–150 songs with terms, privacy, takedown route, and editorial on the top 20, apply, and stop all further build until the answer arrives. Add an FR for approval prerequisites with testable consequences. Write the refusal branch into §14: which alternative networks, at what traffic thresholds, and whether the product survives at their yields.

### H-8. FR-10, FR-13, and FR-2 cannot all be satisfied as written

**Location:** FR-2, FR-10, FR-13, §4.3 description, FR-8, FR-18

**What is wrong.** FR-2 requires the first Sheet section to be present in the initial server response and readable with no client-side execution, and requires that the rendered Sheet "does not move position after advertising loads." §4.3 states Sheets "always open in their Original Key," and FR-10's consequence is absolute: "No Sheet opens in a transposed state on a visitor's first view of it." FR-13 then requires the system to restore the Sounding Key and Capo Position the visitor last used for that Song, per device and without an account.

Per-device, account-free state lives in the browser, which the server cannot see. So a returning visitor's song page is server-rendered in the Original Key and then re-renders into the remembered key after hydration — a visible content change and a layout shift on the exact surface where FR-2 forbids movement, and on slow connections the flip may land seconds after the visitor started reading. FR-10's "first view" wording papers over the conflict rather than resolving it; the interaction is never specified. FR-8's persisted text size has the identical problem and is worse, since text size changes line wrapping and therefore the height of everything.

**What I would do.** Specify the hydration contract in §4.1: either accept a documented, bounded re-render and state what the visitor sees during it, or restore key and text size only on explicit visitor action after load (a "resume in D" affordance) rather than automatically. Amend FR-13 and FR-8 consequences accordingly, and amend FR-2's no-movement consequence to scope it to advertising rather than all causes.

### H-9. The product's own stated root cause is out of scope, so the primary job is not served

**Location:** §4.3 Notes, UJ-2 edge case, OQ-1, §6.2, §2.1

**What is wrong.** §2.1 names the primary job as social: get through a song at a gathering without stalling. UJ-2 is the journey where someone else has already started singing in an unknown key — and its edge case says plainly: "If she cannot tell which way to move, the product should help her — this is the unbuilt capability." §4.3's note goes further, calling it "the root cause the whole product traces back to" and "the one place chordslanka.lk could replace ear-training experience rather than assist it." §6.2 then defers it.

The PRD therefore identifies the single capability that would be genuinely differentiating and non-trivial to copy — the opposite of H-4's wedge — and ships without it, keeping instead a transpose feature that §16 explicitly labels table stakes. The addendum's second option (player identifies one chord that sounds right, system suggests the transposition) is deterministic, needs no microphone, needs no new infrastructure, and is a few days of work. It is being deferred while FR-30's PWA install and FR-32's million words of editorial sit in MVP scope.

**What I would do.** Promote the interval helper from OQ-1 into v1 as a requirement in §4.3, specified against the addendum's option two. It is cheaper than at least six things currently in §6.1, it addresses the primary job, and it is the only candidate in the document for a differentiator that requires actual product thought to copy.

---

## Medium

### M-1. SM-1 is not measurable as defined, and there is no analytics requirement to measure anything

**Location:** §7 SM-1, §8 observability NFR

**What is wrong.** SM-1 is "median time from arriving on a song page to the first Sheet section being readable, on a mid-range Android phone over a constrained mobile connection, under two seconds." "First Sheet section readable" is not a browser metric, "constrained mobile connection" is not defined as a throughput figure, and a *median* implies field data across a population while the device and network conditions imply a lab test. As written it can be neither collected nor falsified.

More broadly, §8 requires that failed searches, correction volume, Play View entry and completion, transpose use, and ad performance "must be measurable," but no FR implements analytics, event taxonomy, or real-user measurement. SM-2's 25% target, SM-5, SM-7, and SM-8 all depend on instrumentation that nothing in §4 builds.

**What I would do.** Redefine SM-1 against a real metric (field LCP at p75 on the song page, with a stated threshold) and keep the lab variant as a separate release gate with a named throttling profile. Add an FR for analytics and event instrumentation covering every SM in §7, including its consent interaction, and including whether any measurement occurs inside Play View.

### M-2. The metrics in §7 are inverted in importance and several are undefined

**Location:** §7 SM-2, SM-3, SM-4

**What is wrong.** SM-4 — advertising RPM, the only metric connected to why the project exists — has no target (see C-1). SM-2 has a precise 25% threshold that §18 admits is invented with no baseline, and it measures entry into the unmonetised surface (see C-2). SM-3's "within the first release cycle" is undefined; there is no release calendar anywhere in the document, so the target has no deadline. SM-5's "rising release over release" and SM-6's "median days to resolution" have no thresholds either.

**What I would do.** Give SM-4 a number and a date. Replace SM-2's invented threshold with a four-week measurement period and no target for the first release, as §18 effectively concedes. Define "release cycle" in §6 with dates, or restate SM-3 in weeks.

### M-3. FR-9 depends on structure the ingestion pipeline will rarely produce

**Location:** FR-9, FR-24, §6.1

**What is wrong.** FR-9 lets a visitor jump to named sections — verse, chorus, bridge — "where the Sheet defines them," with the control absent otherwise. Sheets arriving via FR-24 from scanned JPEGs of community-made chord sheets will frequently have no reliable, machine-recoverable section labelling; where labels exist they will be inconsistent across five thousand documents made by different people. So the likely outcome is a feature that is absent on the large majority of the catalogue, built and tested for the minority.

**What I would do.** Either defer FR-9 until ingestion output characteristics are known from the OQ-3 spike, or make section detection an explicit ingestion requirement with a measured coverage target so FR-9's value is known before it is built.

### M-4. FR-4's single-URL rule makes alternate Sheets invisible and fights FR-2

**Location:** FR-4, FR-2, §4.1

**What is wrong.** FR-4 requires all Sheets of a Song to be reachable from one URL and requires that alternates "do not create competing indexable pages." The SEO instinct is sound, but the consequence is that alternate Sheets — which cost review time to accept under FR-22 and FR-23 — contribute nothing to discoverability, and switching between them must happen client-side, which means the alternate Sheet is not covered by FR-2's server-rendering guarantee. A visitor who lands on a Song whose Default Sheet is the wrong one gets the slow path.

**What I would do.** Specify the switching mechanism in FR-4: server-rendered distinct URLs with canonical tags pointing at the Song page gives both indexation control and FR-2 compliance, and is the standard resolution. Amend the consequence from "not indexable" to "canonicalised."

### M-5. FR-3's public provenance display is good product hygiene and poor legal hygiene

**Location:** FR-3, OQ-11, §13.1

**What is wrong.** FR-3 requires every Sheet to publicly show where it came from, and specifically that "Sheets derived from Ingestion are distinguishable from Sheets contributed by a person." Combined with C-4's unresolved provenance, this publishes a durable, machine-readable admission that thousands of pages were bulk-converted from source documents of unknown origin by the site operator — on a site already exposed on lyrics (C-3) and already brand-adjacent to a competitor (M-7). It also makes the founder-as-publisher posture explicit on every page.

**What I would do.** Keep provenance internally for audit (which is what §8's content-integrity NFR actually needs) and keep the public last-updated date and contributor credit. Drop the public ingested-versus-contributed distinction until OQ-4 and OQ-11 are resolved, then revisit.

### M-6. OQ-5 leaves the primary job failing at the exact moment it matters

**Location:** OQ-5, §5, FR-31, §18

**What is wrong.** §5 hard-bans offline reading because "offline use earns nothing." FR-31 reinforces it: no cached Sheets, a clear message instead of stale content. OQ-5 then admits the problem — a visitor losing signal mid-song at a gathering — and §18 records the founder accepting it. But the primary job in §2.1 is getting through a song at a gathering without stalling, and §1's core promise is that an interrupted chorus costs a returning visitor. A signal drop mid-song produces exactly the failure the product was built to prevent, at a wedding in a building with thick walls, which is the canonical use case.

The principle is also slightly overstated: caching the *currently open* Sheet for the duration of a play session is not an offline library and does not create an ad-free reading habit.

**What I would do.** Resolve OQ-5 by narrowing the non-goal: permit in-session retention of the open Sheet only, with no persistence across sessions and no downloads. That preserves the revenue logic in §5 and removes the failure mode. Amend FR-31's consequences to scope the no-cache rule to Sheets not currently in use.

### M-7. The domain confusion is a launch-blocker being treated as an open question

**Location:** §13.2, OQ-2, §14 row 6, §18

**What is wrong.** §13.2 records that chordslanka.lk is confusingly close to chordslankalk.com, that the incumbent's footer *asserts the chordslanka.lk name*, and that §18 assumes — without confirmation — that the founder is not that operator. The strategic framing is "attracting that site's visitors is legitimate." That framing understates the exposure: a live operator asserting the same name in their footer has an unregistered-rights and passing-off argument, and the founder would be building a brand, backlinks, and a catalogue on a name he may be forced off.

It is also an SEO liability, not just a legal one. Brand searches for "chordslanka" will surface the established site; the new site inherits the confusion without the authority, and any brand-building spend partly benefits the incumbent.

**What I would do.** Move OQ-2 out of §17 and into §13.2 as a launch gate with a decision date, ahead of any build. Establish the incumbent's registration and usage position, and if it is real, choose a distinct name now while the cost is zero rather than after a year of SEO accrues to a name that must be abandoned.

### M-8. Device-held state is treated as durable when it is not

**Location:** FR-13, FR-18, FR-19, FR-8, FR-7, UJ-3, §13.3

**What is wrong.** Favourites, Collections, per-Song key and capo, text size, and autoscroll speed all persist "on that device" without an account. Browser-local storage is evicted — by cache clearing, by private browsing, by storage pressure, and on iOS by script-writable-storage eviction after a period of inactivity. UJ-3's entire promise to Priyan is that his twelve songs and his *Wedding* collection are there when he opens the site; the realistic outcome is that some meaningful share of users lose them silently, and the feature built to beat the screenshot proves less reliable than the screenshot.

No requirement addresses detection, warning, or recovery, and FR-20's migration path only helps people who already registered.

**What I would do.** Add consequences to FR-19 covering durability: prompt for registration once a Collection reaches a size worth protecting, offer an export or share link for a Collection, and state the expected data-loss behaviour so UX can design for it rather than discover it.

### M-9. The assumptions index has no owners, no dates, and no falsification plan

**Location:** §18, §17

**What is wrong.** §18 lists twelve assumptions, several of which are load-bearing (founder independence from the incumbent, catalogue composition, the 25% Play View threshold), but records no owner, no resolution date, and no consequence if false. §17's eleven open questions have the same gap — including the two that are existential (OQ-3, OQ-4) and the one that can void the asset (OQ-11). A PRD that carries eleven open questions into architecture will have them answered by implementation accident rather than decision. Note also the largest unflagged assumption is not in §18 at all: UJ-1's Google ranking (C-7).

**What I would do.** Add owner, due date, and "if false, then" columns to both §17 and §18. Mark OQ-2, OQ-3, OQ-4, and OQ-11 as launch-blocking. Add the UJ-1 traffic assumption.

### M-10. No backup, recovery, or business-continuity requirement for the catalogue

**Location:** §8, §13.4, absent

**What is wrong.** After ingestion, the structured catalogue — the output of hundreds of hours of review labour — is the founder's only real asset, and it exists nowhere else in that form. §8's content-integrity NFR covers revert of individual Sheets. There is no requirement for backups, no retention of Source Artefacts outside Google Drive (FR-24 only requires a *reference* to the Source Artefact), no recovery objective, and no account-loss scenario. A single Drive mishap, hosting account suspension, or database loss destroys the entire investment.

**What I would do.** Add an NFR to §8: automated off-platform backup of the structured catalogue with a stated frequency, retained Source Artefacts under the operator's control rather than referenced by URL, and a tested restore procedure before the catalogue exceeds a few hundred songs.

---

## Low

### L-1. Consent is deferred to "must be able to accommodate," but EU traffic is certain

**Location:** §13.3, OQ-10, FR-29

**What is wrong.** §13.3 says advertising "requires a consent mechanism appropriate to the visitor's jurisdiction" and that the implementation must be able to accommodate one. §4.10 and OQ-7 simultaneously push for English editorial and an international audience, and the Sri Lankan diaspora is concentrated in the EU, UK, Canada, and Australia. So GDPR-scope traffic is not hypothetical, and Google's own requirements oblige a certified consent mechanism for European traffic on AdSense properties. This is real build work being carried as an open question.

**What I would do.** Resolve OQ-10 to a concrete answer — a certified CMP for EEA/UK traffic, geo-gated — and write it as an FR alongside FR-29 rather than an aspiration in §13.3.

### L-2. FR-30's installability is unconnected to any outcome

**Location:** FR-30, §4.9, §7

**What is wrong.** Installing to a home screen is justified in §4.9 as "install for speed and a home-screen icon," but no success metric measures install rate, retention lift, or revenue impact, and §5 has removed the offline capability that is the usual reason to install. It is build cost with no stated payoff, in a release that cannot afford any (C-6).

**What I would do.** Defer FR-30 past v1, or attach a metric that would justify it.

### L-3. The provider abstraction in §12 is premature

**Location:** §12, §18, addendum "Advertising integration notes"

**What is wrong.** The PRD commits to abstracting the ad provider now so an alternative network is "a configuration change rather than a refactor." The alternatives named as higher-yielding require traffic thresholds this site will not reach for a year or more, and FR-29's configuration requirements already deliver most of the switching benefit. This is speculative design against an event that may never occur.

**What I would do.** Keep FR-29's configuration requirements and drop the abstraction commitment from §12 until a second provider is actually in play.

### L-4. SM-C4 guards against a behaviour no requirement enables

**Location:** §7 SM-C4, FR-20, §4.5

**What is wrong.** SM-C4 warns against optimising registered accounts by gating features — but FR-20's consequence already forbids gating ("No feature in §4.1 through §4.4 requires an account"), and accounts exist solely for cross-device sync per §18. The counter-metric guards a door that is already locked, while the real counter-metric the plan needs — moderator hours per week, per H-5 — is absent.

**What I would do.** Replace SM-C4 with a founder-time counter-metric: operator hours per week spent on review, ingestion, and editorial, with a cap.

### L-5. The Discover Surface definition leaves the ad boundary ambiguous on the highest-traffic page

**Location:** §3 glossary, FR-27, §9

**What is wrong.** "Discover Surface" includes "the non-sheet portion of a song page," and FR-27 forbids advertising "in the Sheet body." On the single page that receives nearly all traffic, the boundary between Sheet body and page furniture is therefore defined by prose rather than by structure, and FR-32's editorial sits below the Sheet in a region whose classification is unstated. The addendum proposes enforcing the boundary structurally for Play View but says nothing about the song page.

**What I would do.** Enumerate the permitted ad regions on the song page explicitly in FR-27's consequences (above-sheet header, below-editorial, sidebar on wide viewports) and state that everything between the Sheet's first and last line is forbidden, so the rule is testable.

### L-6. Hindi appears in the guardrails but nowhere in scope

**Location:** §13.1, FR-15, §3, §6.2

**What is wrong.** §13.1 requires moderation capability in Hindi. FR-15 covers only Sinhala and Tamil script and romanisation. §8 requires Devanagari rendering. §6.2 mentions "Hindi and Tamil catalogue at parity" as out of scope. No journey, persona, or competitive finding motivates Hindi at all. It is an orphan language obligation.

**What I would do.** Remove Hindi from §13.1 and §8 until a Hindi catalogue is actually planned. See H-6.

---

## Finding Counts

| Severity | Count |
| --- | --- |
| Critical | 7 |
| High | 9 |
| Medium | 10 |
| Low | 6 |
| **Total** | **32** |

## What I Would Do First

In order, before any architecture or UX work:

1. Answer OQ-11 by sampling the 5,000 files (hours of work, widest blast radius).
2. Write the one-page business case with a revenue target and the pageviews it implies (C-1).
3. Resolve OQ-4 and OQ-2 as gates with dates (C-3, M-7).
4. Cut §6.1 down to a v0 that can apply for AdSense in six to eight weeks (C-6, H-7).
5. Run the OQ-3 spike with pre-committed abort thresholds, including silent-error rate (H-2, H-3).

If steps 1 through 3 come back badly, steps 4 and 5 are wasted effort, which is the strongest argument for this ordering.
