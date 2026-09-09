# HireAIVoice adversarial site audit

**Auditor:** Frank Mac (Codex on Frank)  
**Date:** 2026-09-08  
**Scope:** `https://hireaivoice.com` and `/home/connor/dev/hireaivoice.com`  
**Mode:** Read only

## Audit limits and measured coverage

I inspected all 32 local HTML files (the 11 top-level HTML files, the blog index, all 20 blog posts, and the 404 page), plus `llms.txt`, `robots.txt`, `sitemap.xml`, `_redirects`, `_headers`, `enhance.css`, and `enhance.js`. I extracted 544 anchors representing 62 unique `href` values, checked every local route target, checked same-page fragments, compared the 31 indexable local routes with all 31 sitemap entries, parsed all 32 JSON-LD blocks with a JSON parser, and mechanically scanned customer-facing files for the prohibited strings.

**Live HTTP checks are UNVERIFIED.** Every required `curl` request failed before an HTTP connection with `curl: (6) Could not resolve host: hireaivoice.com`. Therefore this report does not claim any live status code, redirect chain, or live/local parity. The same limitation applies to the two external anchors and the HonorElevate/LeadConnector scripts and form. Those must be rerun from a network-enabled shell before launch. The local coordination checkout was inspected without `git pull`, because pulling would violate the read-only instruction. The repository was `main...origin/main [ahead 2]` at audit time, so the local source may not equal production.

# BLOCKER

## 1. Two blog pages publish obsolete $297/$497 prices instead of $397/$597

**What it is:** Prospects can receive two different price lists from the same site. One of the stale prices is in JSON-LD, so search engines and answer engines can repeat it even if a visitor misses the body copy.

**Where and evidence:**

- `blog/ai-voice-systems-santa-clarita-business/index.html:32`: `"It is 297 dollars per month for the core plan and 497 dollars per month for the full plan"` in FAQ JSON-LD.
- `blog/ai-voice-systems-santa-clarita-business/index.html:130`: `"It is 297 dollars or 497 dollars per month"`.
- `blog/ai-voice-systems-santa-clarita-business/index.html:157`: `"It is 297 dollars per month for the core plan and 497 dollars per month for the full plan"`.
- `blog/why-scv-businesses-switch-ai-phones/index.html:31`: `"An AI voice agent runs a flat 297 dollars or 497 dollars per month"` in FAQ JSON-LD.
- Conflicting current copy includes `blog/ai-voice-agent-pricing/index.html:135`: `"Starter is $397 per month. Full System is $597 per month."`, and `beyond-the-phone.html:403,415`: `$397 a month` and `$597 a month`.

**Specific fix:** Replace every 297/497 occurrence, including JSON-LD, with the correct $397 Starter and $597 Full System prices. Add a build-time assertion that rejects `297 dollars`, `$297`, `497 dollars` when used as the Full System monthly price, and other retired price forms.

## 2. The site says “no setup fee” without limiting that waiver to the founding ten

**What it is:** Connor’s actual rule is a $497 setup fee beginning with client 11, while multiple pages and machine-readable surfaces state there is no setup fee categorically. This is a direct commercial contradiction and could bind the sale conversation to the wrong terms.

**Where and evidence:**

- `index.html:243-248` correctly frames the offer as `First 10 clients`, but says `"No setup fee"` without stating what client 11 pays.
- `start.html:128-131`, `661.html:212-217`, `nevada.html:198-203`, and `northern-california.html:202-207` repeat the founding-ten card and no-fee waiver but never publish the client-11 $497 setup fee.
- `llms.txt:42`: `"Two plans, both flat, with no setup fee and no contracts."` This is universal, not founding-ten-limited.
- `blog/ai-voice-agent-pricing/index.html:7,14,27,29,127,135,189` repeatedly says `"No setup fee"` or `"No setup fee on either one"`; line 135 calls it `"the whole price list."`
- `blog/ai-answering-plumbers-after-hours/index.html:33`: `"No setup fee, no contracts"` in FAQ JSON-LD.
- `blog/ai-voice-agent-hvac-santa-clarita/index.html:131`: `"No setup fee, no contracts. No contracts."`
- `blog/ai-receptionist-setup-one-day/index.html:166`: `"There is no setup fee"`.

**Specific fix:** State the complete rule everywhere pricing is described: first ten pay no setup fee; beginning with client 11, the setup fee is $497. Update `llms.txt`, meta/OG descriptions, visible price cards, and JSON-LD together. Do not leave the post-founding price implicit as merely “the price goes up.”

## 3. The site gives mutually exclusive AI-disclosure policies

**What it is:** The canonical site and `llms.txt` promise disclosure in the first sentence of every call. A blog post says owners may choose not to disclose and asserts there is generally no legal requirement. A prospect cannot tell which policy governs the product.

**Where and evidence:**

- `index.html:195`: `"Tells every caller it is an A I in the first breath"`.
- `nonprofits.html:145`: `"Yes, in the first breath, every call. It says so before it says anything else"`.
- `llms.txt:23-24`: `"It states that it is an AI in its first sentence of every call."`
- `blog/will-customers-know-its-ai/index.html:31` JSON-LD: `"That is your call, and the system supports either choice"` and `"the agent is upfront if asked but does not lead with it."`
- The same post’s visible copy at `:130` says `"You choose the transparency level"`; `:154` says `"the system supports either way"`; and `:155` says `"There is no legal requirement to announce it in most service contexts"`.

**Specific fix:** Delete the optional/non-disclosure position and make the first-sentence disclosure rule consistent in visible copy, metadata, JSON-LD, prompts, and `llms.txt`. Have California counsel review the remaining legal statement before publication; do not substitute an unsourced blanket legal conclusion.

## 4. The product scope changes from overflow coverage to “every inbound call” with guaranteed booking

**What it is:** The defined offer covers calls missed after hours, on closed days, or while busy. Numerous blog pages sell a different product that answers every inbound call instantly, 24/7, with no exceptions and books directly into any calendar. The home-page FAQ is materially narrower: the business’s desk gets first shot; the system may capture an appointment preference and text the desk; only Google Calendar is promised for direct booking.

**Where and evidence:**

- Canonical scope: `index.html:163-166` says the desk rings first and only no-answer/busy calls roll over. `index.html:194` says it answers `"after hours, on closed days, and when your line is busy"`. `index.html:197` says it `"Offers appointment times and captures their preference"`.
- Canonical booking limit: `index.html:289` says it captures the appointment and texts the front desk, can book Google Calendar directly, and will not promise practice-management-system writing on day one. `llms.txt:33-38` repeats the after-hours-only and Google-Calendar-only limits.
- Contrary claims: `blog/lead-response-time-data/index.html:131` says `"effectively zero, every call, no exceptions"`; `:159` says it answers `"every inbound call the instant it rings"` and `"books the appointment on the spot"`.
- `blog/speed-to-lead-first-5-minutes/index.html:153` says `"Nothing rolls to voicemail. No lead waits."`
- `blog/ai-voice-agent-pricing/index.html:144` says it answers `"every call"` and puts appointments `"straight onto your calendar"`.
- `blog/ai-voice-roofing-storm-calls/index.html:30,154` claims every call at once, no hold time or busy signal, including fifty simultaneous calls, and says it `"never lets a call ring out."`
- The same overbroad “answers every call 24/7” boilerplate appears in the CTAs of all 20 posts (for example `blog/cost-of-a-missed-call/index.html:168` and `blog/ai-receptionist-24-7/index.html:174`).

**Specific fix:** Pick one actual operating scope and make every page match it. For the stated offer, replace “every call,” “no exceptions,” “nothing rolls to voicemail,” and unconditional direct-booking claims with precise overflow/after-hours language and the actual calendar-integration boundary. Preserve direct booking only where the configured integration supports it.

## 5. Call-recording language creates an internal compliance contradiction

**What it is:** The home page says recording is off by default because California requires all-party consent, yet the features page advertises recording as included and describes transcripts for every AI call. That obscures what is recorded, what generates a transcript, and which disclosure/consent flow applies.

**Where and evidence:**

- `index.html:211,288` says recording is off by default and cites California all-party consent.
- `llms.txt:25-26` says the same.
- `nonprofits.html:146` says recording may be enabled only by written decision with disclosure.
- `beyond-the-phone.html:166` promises `"Every call the agent took, with the transcript"`.
- `beyond-the-phone.html:254` offers `"Call tracking and recording per campaign"`; `:344` lists call transcripts and summaries; `:353` lists call tracking and recording. The page says at `:338` that everything listed is switched on behind the login.

**Specific fix:** Separate audio recording, AI-generated transcripts, and call metadata in plain language. State the default and the exact opt-in consent/disclosure process everywhere recording is mentioned. Do not describe recording as simply switched on or included in California.

## 6. Live site and all HTTP link results could not be verified

**What it is:** This audit cannot certify the production site, redirects, form, chat loader, or external destinations because DNS was unavailable to `curl`. This is a launch blocker for the requested “fetch every link” gate, not evidence that the links are broken.

**Where and evidence:** Every attempt to fetch `https://hireaivoice.com/`, `/sitemap.xml`, `/robots.txt`, and `/llms.txt` returned `curl: (6) Could not resolve host: hireaivoice.com` before HTTP. The unverified external/resource hosts are `connorwithhonor.com`, `honorelevate.com`, `go.hireaivoice.com`, and `widgets.leadconnectorhq.com`.

**Specific fix:** From a network-enabled host, crawl all 31 sitemap URLs and all 62 unique hrefs with `curl -L`, recording initial status, every redirect hop, final URL, and final status. Separately fetch the form iframe, form loader, chat loader, OG images, favicon files, and Cloudflare email-decoder path. Diff live bodies against the intended commit before declaring launch-ready.

# SHOULD FIX

## 7. Unsourced voicemail percentages are repeated across at least 13 posts

**What it is:** The site repeatedly publishes 62%, 85%, and 80% as facts without a citation or link to a primary source. Repetition does not make the statistic sourced.

**Where and evidence:**

- `blog/will-customers-know-its-ai/index.html:147-149`: 80% will not leave voicemail and 62% call a competitor.
- 62% appears at `blog/ai-voice-agent-hvac-santa-clarita/index.html:144`, `blog/ai-answering-plumbers-after-hours/index.html:143`, `blog/why-scv-businesses-switch-ai-phones/index.html:155`, `blog/speed-to-lead-los-angeles-county/index.html:143,151`, `blog/ai-voice-systems-santa-clarita-business/index.html:147`, `blog/speed-to-lead-first-5-minutes/index.html:142,150`, `blog/ai-voice-vs-chatbots/index.html:152`, `blog/ai-voice-roofing-storm-calls/index.html:143`, `blog/cost-of-a-missed-call/index.html:143`, `blog/ai-receptionist-med-spa-booking/index.html:142`, `blog/missed-call-text-back-booked-jobs/index.html:142,148`, and `blog/ai-answering-auto-repair-shops/index.html:143`.
- 85% appears alongside it on many of those pages, plus `blog/ai-receptionist-24-7/index.html:152`.

**Specific fix:** Either cite a traceable primary study adjacent to each claim and accurately describe its population/date, or remove the percentages and use non-quantified wording. Do not source one post and leave copied versions unsupported elsewhere.

## 8. The 21x lead-response claim has no citation and is presented too broadly

**What it is:** A specific research result is framed as universal across industries without naming or linking the research.

**Where and evidence:** `blog/lead-response-time-data/index.html:127-140` repeatedly invokes “the research” and “studies”; `:143` states `"21x More likely to qualify vs a 30-minute wait"`; `:149-151` turns the result into a categorical statement that the job is already gone.

**Specific fix:** Cite the original study, give its sample/context and exact comparison, and narrow the wording to what the study measured. Remove `"the job is already gone"` and other deterministic extrapolations.

## 9. ROI and result claims read as guarantees

**What it is:** Multiple pages state that the system pays for itself, that one recovered job covers the fee, or that appointments/jobs necessarily result. Those claims depend on each business’s missed-call volume, conversion rate, ticket size, configuration, and customer behavior.

**Where and evidence:**

- `system.html:152`: `"Step one pays for itself and proves the thing works."`
- `blog/ai-voice-agent-pricing/index.html:33` JSON-LD: one recovered call pays for the month and `"Everything after that first recovered call is pure upside"`.
- `blog/cost-of-a-missed-call/index.html:29-32,127-130,135-154` treats a missed call as a lost $800-$2,000 job and says the product pays for itself several times over. `:145` publishes a hypothetical $124,800 annual loss and says the leak is “almost always six figures.”
- `blog/ai-voice-systems-santa-clarita-business/index.html:158`: `"pays for itself the first time it catches a call you would have lost."`
- `blog/ai-answering-plumbers-after-hours/index.html:33` says one captured burst-pipe job `"usually covers the cost for months."`

**Specific fix:** Convert guarantees to conditional examples, label every scenario assumption, avoid equating every missed call with a converted job, and add a results-vary disclaimer near calculators/ROI copy. Keep the calculator as user-supplied arithmetic, not proof of actual lost revenue.

## 10. The AI-detection article makes unsupported behavioral and legal claims

**What it is:** The article asserts what “most” callers can detect or care about without evidence, then gives risky legal guidance.

**Where and evidence:** `blog/will-customers-know-its-ai/index.html:127-130,135-142` claims most callers cannot tell, the few who notice almost never care, and the technology is irrelevant. `:155` asserts no legal disclosure requirement in most service contexts. `:163-164` says noticing AI will not cost business and an AI conversation beats a missed call `"every single time."`

**Specific fix:** Remove the detection/customer-reaction claims unless supported by directly relevant evidence. Delete the blanket legal conclusion or replace it with counsel-approved, jurisdiction- and context-specific language. Keep the operational first-sentence disclosure rule.

## 11. The blog index “Get Started” CTA points to a nonexistent section

**What it is:** The CTA promises a next step but does nothing useful because the page has no `id="pricing"`.

**Where and evidence:** `blog/index.html:518` links to `#pricing`; a parsed ID/fragment check found no `pricing` ID in that file.

**Specific fix:** Point it to `/start?market=blog-index` or to a real on-page section.

## 12. The blog index loads two different chat widgets

**What it is:** Two copies of the same external loader are initialized with different widget IDs. This can create duplicate bubbles, race conditions, double network work, or route leads to the wrong configuration.

**Where and evidence:** `blog/index.html:560-565` loads widget `69bc77f67111ac54f45d856d`, then immediately loads widget `6a9df46a86066d429f6140ed`. Every other audited page uses only `6a9df46a86066d429f6140ed`.

**Specific fix:** Confirm the intended HireAIVoice widget and keep exactly one loader and widget ID.

## 13. No privacy policy or terms are linked despite a lead form and chat widget

**What it is:** The site collects prospect data through an embedded application form and sitewide chat, but no audited page links to a privacy policy or terms. This is a trust and compliance gap, especially if follow-up includes texts or calls.

**Where and evidence:** `start.html:91-101` embeds `https://go.hireaivoice.com/widget/form/yyC0LQuNWIW5sM4qaaCf`; `start.html:169` and the other content pages load a LeadConnector chat widget. A full-text scan found no `privacy`, `terms of use`, `terms of service`, `TCPA`, or submission-consent language in any local HTML file.

**Specific fix:** Publish and footer-link a privacy policy and terms. Ensure the embedded form itself displays the required consent language for the exact follow-up channels used; verify the rendered iframe separately because its contents are external and UNVERIFIED here.

## 14. Prohibited honesty-announcement language remains in customer-facing copy

**What it is:** The hard brand rule bans “honest/honestly” and phrases that announce the honesty of what follows.

**Where and evidence:**

- `blog/ai-voice-agent-pricing/index.html:155`: `"That is the honest difference"`.
- `blog/will-customers-know-its-ai/index.html:14`: OG description says `"Here is the truth"`.
- The same file uses honesty-announcement variants in machine-readable and visible surfaces: `:7` `"Here is the straight answer"`; `:27` `"The straight answer"`; `:136` `"the straight answer"`; `:137` `"I am going to be straight with you"`.
- `blog/speed-to-lead-first-5-minutes/index.html:136`: `"Here is the uncomfortable truth"`.
- `calculator.html:224`: `"Be straight with yourself on these numbers."`

**Specific fix:** Rewrite all of these without announcing candor. Example: state the fact directly. Add the complete prohibited phrase list to a CI content lint that scans body copy, metadata, JSON-LD, alt text, and `llms.txt`.

## 15. The blog index contains a Cloudflare-generated email URL that is broken in the local source graph

**What it is:** The only locally unresolved internal `href` is a Cloudflare email-protection route. It may work only after Cloudflare transforms/serves the page, making local previews and non-Cloudflare hosting fragile.

**Where and evidence:** `blog/index.html:556` points to `/cdn-cgi/l/email-protection#94...`; no corresponding local route exists. `blog/index.html:560` references a local decoder file that does exist at `cdn-cgi/scripts/5c5dd728/cloudflare-static/email-decode.min.js`. Live behavior is UNVERIFIED.

**Specific fix:** Use a normal `mailto:` link or intentionally manage the protection at the edge, then verify both production and local preview behavior. Do not keep a source-only pseudo-route unless it is proven necessary.

# NICE TO HAVE

## 16. The 404 page lacks a meta description and canonical

**What it is:** All 31 indexable pages have one title, charset, description, and canonical, but `404.html` is the exception.

**Where and evidence:** Parsed `404.html`: one doctype, one charset, title present, zero meta descriptions, zero canonical links.

**Specific fix:** Add a concise meta description and either a self-canonical if the hosting behavior makes that appropriate or `noindex`; verify the actual HTTP 404 status live.

## 17. The blog index duplicates favicon declarations

**What it is:** Two icon declarations are repeated byte-for-byte.

**Where and evidence:** `blog/index.html:17-18` and `:20-21` repeat the 32x32 favicon and 180x180 Apple touch icon.

**Specific fix:** Remove the duplicate pair.

## 18. “Setup takes twenty minutes” and “live in 72 hours” are used interchangeably

**What it is:** These may describe hands-on customer time versus elapsed launch time, but the site does not consistently make that distinction. A prospect can reasonably read them as contradictory delivery promises.

**Where and evidence:** `start.html:84` says setup takes about twenty minutes. `blog/ai-receptionist-setup-one-day/index.html:166` says go live in 72 hours, while `:171` says setup takes about twenty minutes. `blog/index.html:546` promises `"One 30-minute call"`. Similar CTAs across the blog say twenty minutes while FAQ JSON-LD says about 72 hours.

**Specific fix:** Use one formulation everywhere: for example, “about 20-30 minutes of your time; normally live within 72 hours after we receive the required information.”

## 19. The offer identity is inconsistent: Vera is simultaneously overflow-only and a full 24/7 receptionist

**What it is:** Even apart from capability wording, the information architecture markets two distinct product identities. The home page says Vera covers the unstaffed portion of the week and does not replace the receptionist; the blog repeatedly brands the offer as a 24/7 receptionist that answers every call.

**Where and evidence:** `index.html:148` says `"Vera covers the green"` (the 123 unstaffed hours); `index.html:207` says it covers hours the receptionist is not there. In contrast, `blog/index.html:535` is titled `"The 24/7 AI Receptionist: Never Miss Another Call"`, and multiple post CTAs advertise answering every call 24/7.

**Specific fix:** Choose a single category description, preferably “after-hours and overflow AI phone coverage,” and reserve 24/7 language for availability of the overflow destination, not a claim that every business call routes to the AI.

## 20. Mechanical checks that passed locally but remain live-unverified

**What it is:** These are not defects in the inspected source, but they are recorded to prevent false positives and to identify the remaining verification gate.

**Evidence measured:**

- No em dash character was found in customer-facing HTML, text, XML, JS, or CSS.
- No customer-facing `GoHighLevel` or standalone `GHL` string was found.
- No `661-400-1720`, dead real-estate fee phrase, `$17`, `17k`, or `17,000` was found.
- All 32 JSON-LD blocks parsed successfully as JSON.
- Every HTML file had exactly one HTML5 doctype and one charset declaration; no local quirks-mode trigger was found.
- Every indexable page had a title, meta description, and canonical.
- All 31 sitemap paths map to local files, and all 31 indexable local routes appear in the sitemap.
- No indexable local page was orphaned from the internal anchor graph.
- All local image references resolved and all image elements had nonempty alt text.
- No obvious fixed-width mobile overflow was found by source inspection; the carrier table is wrapped in `overflow-x:auto` at `how-forwarding-works.html:118`. Actual viewport rendering is UNVERIFIED.

**Specific fix:** Preserve these checks as automated regression gates, then rerun them against fetched production HTML and perform real 375px/320px browser renders before launch.

## Verdict

**Not ready for paying prospects.** The source publishes two price lists, hides the client-11 setup fee behind categorical “no setup fee” claims, gives opposite answers about mandatory AI disclosure, and repeatedly sells broader answering and booking behavior than the canonical offer promises. The unsupported percentages, ROI guarantees, recording ambiguity, dead CTA, duplicate chat widget, and missing privacy/terms links compound the trust problem. Fix the BLOCKER findings first, then complete a network-enabled crawl and live/local parity check; until that happens, production readiness remains UNVERIFIED.
