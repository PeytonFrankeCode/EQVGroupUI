# Session Worklog

Running list of what Peyton asks for and what gets done, kept since the
last summary. When Peyton asks to retrieve the session, I summarize this
list briefly and reset it.

*Log reset: 2026-07-13 (after the assets + polish session: hero video, official
logo, interior-hero redesign, headline/tagline change, and the iOS/menu fixes).*

## Carry-over / open items
- Internal news pages hold accurate summaries + official-source links; paste
  full press-release text when the client provides it.
- Home stats still need verified figures for Active Basins (16) and Dedicated
  Professionals (50+); only the 3,500+ properties count is client-confirmed.
- Careers hero line "Proven energy assets need proven people" still uses the
  retired phrasing; reword if the client wants it fully gone.

## Entries
- Desktop map now fills the screen: on >=1100px the footprint section widens
  to ~1520px, the map column grows (2.15fr : 1fr) and the map scales up (1.34),
  and the info panel is vertically centered beside it. The map reads as the
  centerpiece instead of floating small in the middle. Tablet/mobile unchanged.
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
