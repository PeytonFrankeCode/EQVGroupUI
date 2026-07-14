# Session Worklog

Running list of what Peyton asks for and what gets done, kept since the
last summary. When Peyton asks to retrieve the session, I summarize this
list briefly and reset it.

*Log reset: 2026-07-13 (after the assets + polish session: hero video, official
logo, interior-hero redesign, headline/tagline change, and the iOS/menu fixes).*

## Carry-over / open items
- Internal news pages hold accurate summaries + official-source links; paste
  full press-release text when the client provides it.
- Desktop layout: decide whether to widen the map/content on large monitors
  (the "doesn't reach the edge of the screen" question). Beacons already scale
  up on desktop; the map itself is still capped at the 1200px container.
- Home stats still need verified figures for Active Basins (16) and Dedicated
  Professionals (50+); only the 3,500+ properties count is client-confirmed.
- Careers hero line "Proven energy assets need proven people" still uses the
  retired phrasing; reword if the client wants it fully gone.

## Entries
- Self-hosted web font: the CSS asked for "Aptos" (a Microsoft font most
  browsers don't have), so the site was silently falling back to system fonts.
  Added self-hosted Inter (variable, latin, ~99KB for normal+italic) via
  @font-face + preload, first in the stack (Aptos/system kept as fallbacks).
  Typography is now consistent and intentional on every device.
- SEO: added JSON-LD Organization schema to the homepage (name, logo, address,
  owner-relations contact, sameAs to the EQV Ventures sites).
- Rebuilt the social-share card (og.jpg) with the new logo, deep-navy branding,
  and the "Redefining Energy Investment" headline.
- Refreshed sitemap lastmod dates.
- Accessibility: added a clear site-wide keyboard focus ring (:focus-visible)
  that reads on both light pages and the dark hero/footer/menu.
