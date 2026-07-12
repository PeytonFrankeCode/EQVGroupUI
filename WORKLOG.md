# Session Worklog

Running list of what Peyton asks for and what gets done, kept since the
last summary. When Peyton asks to retrieve the session, I summarize this
list briefly and reset it.

*Log reset: 2026-07-12.*

## Carry-over / open items
- Internal news pages hold accurate summaries + official-source links; paste
  full press-release text when available.

## Entries
- Follow-up cleanup: converted the last stray ghost button (404 page "Owner
  Relations") to the clean text-link style, keeping "Go Home" as the primary
  action. Extended the dash scrub to the internal, non-served docs too
  (brand/, design-system/, NOTES.md, eqvgroup-research.md, and this log), so the
  entire repo is now free of em/en dashes.
- Timeline draw-down animation (history page): the center line is now a faint
  track with a bright brand-blue fill whose height is driven by scroll progress,
  so the line "draws down" as you scroll while milestones reveal on entry.
  JS computes progress against a viewport anchor (rAF-throttled); reduced-motion
  users get the full line immediately. Placed the handler before the map's early
  return so it runs on the map-less history page.
- Dark-mode motto restyle: "Esse Quam Videri" is bigger and no longer italic,
  with the E/Q/V initials popping in bright white (with a soft glow) while the
  remaining letters sit back in a muted periwinkle, so the brand reads out of
  the phrase. The translation below is now a larger, more prominent italic
  quote (dropped the small uppercase/wide-tracking treatment). Mobile overrides
  updated to match.
- Full em-dash (and en-dash) scrub across every served page + CSS/JS: titles and
  OG tags now use "Page | EQV Group"; datelines use a period; label/heading
  separators became commas, colons, or parentheses; en-dashes ("2022-2024",
  "Grayburg-San Andres") became hyphens. Verified zero em/en dashes remain in
  served files (brand/ and design-system/ are internal, not served).
- Menu bars (burger): thicker and more proportional per the Blackstone
  reference, wider (18px→26px) and heavier (2px→2.5px) with matched open-state
  transforms.
- Map overhaul:
  - Rewrote each active-state description from the acquisition history (TX, OK,
    NM, LA, MS) and combined it with office detail in the info panel. Offices
    now carry roles: Dallas = Corporate Headquarters, Oklahoma City = Operations
    and Administration, Houston = Satellite Office.
  - North Dakota, Montana, Wyoming, Colorado are now NON-clickable, rendered in
    a muted mid-blue "non-operated interests" shade (new `.eqv-geo.is-nonop`).
    Clickable states are only where EQV has active operations.
  - Legend updated to three keys: Active Operations, Non-Operated Interests,
    EQV Offices (added `.eqv-swatch--nonop`).

- Wired real PDF links into the five owner-document cards on eqv-operating.html
  (removing the "coming soon" placeholders): ACH and Address Changes, Direct
  Deposit, and Change of Address all point to the EnergyLink instructions PDF;
  W-9 → W-9 blank PDF; Affidavit of Heirship → heirship PDF. All open in a new
  tab with the external-link arrow. Added a `.eqv-doc-card .eqv-extlink` CSS
  rule so the arrow sits flush-right and tints on hover.
- Copy/UX cleanup batch (from the design chat):
  - Removed the top-right "Contact" button from the header on every page, it's
    already in the menu (dropped the now-dead `.eqv-header__contact` CSS too).
  - Home hero: restyled the "Latest" news pill into a soft translucent banner
    (no oval outline); replaced the two CTA buttons ("Who We Are" + "Latest
    News") with a single clean text link ("Read the latest news →") via a new
    `.eqv-textlink` style, fewer obvious buttons, cleaner/modern.
  - Home stats: Oil & Gas Properties count 1,600+ → 3,500+.
  - EQV Operating: removed the duplicated "committed to providing quality
    service" sentence from the Owner Relations aside; moved the lone floating
    "ACH and Address Changes" card down into the Useful Documents grid (now 5
    forms together) so it no longer floats alone at the top.
  - Team: collapsed the repeated "Leadership"/"Executive Management" headers
    into one punchy hero header ("The People Behind EQV") and removed the
    redundant in-section heading.
  - History timeline: removed the "September 2024, Shares trade separately"
    milestone.
- Added five acquisition milestones to the history timeline (chronological):
  Q4 2024 Delaware Basin (West Texas), Q4 2024 Texas Panhandle / Anadarko
  Basin, Q4 2025 East Texas & North Louisiana, Q4 2025 South Texas &
  Mississippi / Tuscaloosa Marine Shale, and Q3 2026 Northwest Shelf (Southern
  New Mexico), client-supplied copy, lightly condensed to the timeline style.
- Button cleanup (fewer obvious buttons): converted navigational ghost buttons
  to clean text links with a nudging arrow, "View all news" (home), "Meet the
  team" (history), "Our history" (team), "Contact us" (careers), and the
  "← All news" back link on all 7 article pages. Kept true action buttons as
  buttons: Apply for a Job, Submit Documents, Send, View the official release,
  Go Home (404). Extended `.eqv-textlink` with `--light` (dark hero) and
  `--back` (left-nudging) variants; added `align-items:center` to the hero-CTA
  and article-action rows so links sit level with buttons.
- Redundant-text sweep of the remaining pages: Contact h2 "How to get in touch"
  → "Direct lines" (was echoing the hero "Get in Touch" eyebrow); Careers body
  "proven energy assets" → "predictable, cash-flowing energy assets" (the hero
  already says "Proven … proven people"); Home overview second paragraph
  reworded so it no longer also opens with "The EQV Group." News index and
  History hero reviewed, no redundancy worth changing.
- Open/handed-back: couldn't reproduce the "desktop looks squished" report, the
  home page renders correctly at 1440px in headless Chromium. Map CSS animations
  run everywhere except under prefers-reduced-motion (likely why they seemed
  absent on a desktop with reduce-motion enabled). Need a specific width/section
  from the client to act further.
