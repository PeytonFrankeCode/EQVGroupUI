# Session Worklog

Running list of what Peyton asks for and what gets done, kept since the
last summary. When Peyton asks to retrieve the session, I summarize this
list briefly and reset it.

*Log started: 2026-07-12 (after the header/scroll-icon cleanup was pushed).*

## Entries

1. **Light-mode hero photo (DONE)** — after three watermarked candidates
   (Unsplash+ snowy peaks, a stock Park City Old Town shot, a stock aerial),
   Peyton provided a clean, watermark-free aerial of a Utah town with the
   Wasatch range behind it. Optimized to assets/img/hero-light.jpg and set
   as the light-mode hero background (dark left scrim keeps the headline
   legible). Dark mode still uses hero-night.jpg.
2. **Session worklog set up** — this file; tracks activity until Peyton asks
   for a summary, then resets.
3. **`/supervirushack` easter-egg page** — built, then removed at Peyton's
   request (added `supervirushack.html`, deleted it the same session).
4. **Motto restyle** — dark-mode hero motto changed to Peyton's preferred
   treatment: semi-transparent white, italic, with a slight drop shadow, replacing
   the holo/glass stroke treatment. Quotation marks sit on the translation
   ("To be, rather than to seem"); the Latin "Esse Quam Videri" is unquoted.
5. **Mobile responsiveness pass** — reduced empty space and glitches on
   phones: added a global `overflow-x: hidden` guard (no sideways scroll),
   tightened section/hero/page-hero padding at <=640px, capped hero title
   and motto sizes with vw-based clamps so big text never overflows narrow
   screens, and fixed the 3D map — de-scaled to 1x, centered, and capped at
   560px in the single-column layout so it no longer clipped past its column
   (with a flatter 20deg tilt and smaller beacon tags at <=560px). Verified
   zero horizontal overflow across widths.
6. **Replaced emoji arrows with inline SVG** — the up-right (↗) glyphs on
   the EQV Ventures external links (menu + footer, all pages) rendered as
   clunky blue emoji tiles on Android. Swapped every arrow (↗ and the
   → in the hero pill / news list) for crisp currentColor inline-SVG
   arrows via a new .eqv-extlink style, so they match the design on every
   platform.
7. **Careers apply link** — the Careers page primary CTA now reads "Apply
   for a Job" and links to the EQV Paycom ATS careers portal (opens in a
   new tab). Body copy updated from "send us your resume" to "browse our
   open positions and apply through our careers portal".
8. **Batch of client edits (chat 2026-07-12):**
   - Nav: "About" renamed to **Home**; added a **History** page to nav/footer
     across all pages (order: Home, Team, History, News, EQV Operating,
     Careers, Contact).
   - **Team + Timeline split**: timeline moved to its own `history.html`
     page; team.html is now team-only with an "Our History" link.
   - **Team roster updated**: removed Mickey Raney, Grant Raney, Danny Murray
     (not part of EQV Group); added Will Smith (CFO), Matt Parsons (Managing
     Director), David Wilansky (Managing Director). Bios written in the house
     style from public info — LinkedIn can't be scraped (blocked + ToS), so
     these are drafts to verify. NOTE: SEC filings list Will Smith as CIO /
     Partner, not CFO — confirm his title.
   - **Team title**: "Proven people" -> "Leadership built on experience".
   - **Map**: only states with operations are clickable now (others are inert
     base map); office labels reduced to city names ("EQV Office —" removed).
   - **Careers wording**: "Park City and Oklahoma City" -> "Dallas, Houston,
     and Oklahoma City". Paycom apply link kept.
   - **News moved on-site**: created 7 internal press-release pages
     (news-*.html) and repointed the news index headlines + "Read more" to
     them instead of the old external sites. Each internal page has a
     summary + a "View the official release" link to the source; full release
     text can be pasted in when available.
