# Session Worklog

Running list of what Peyton asks for and what gets done, kept since the
last summary. When Peyton asks to retrieve the session, I summarize this
list briefly and reset it.

*Log reset: 2026-07-14 (after the improvements pass: desktop map fills the
screen, self-hosted Inter web font, JSON-LD, rebuilt og.jpg, sitemap dates,
and the a11y focus ring).*

## Carry-over / open items
- Internal news pages hold accurate summaries + official-source links; paste
  full press-release text when the client provides it.
- Home stats still need verified figures for Active Basins (16) and Dedicated
  Professionals (50+); only the 3,500+ properties count is client-confirmed.
- Careers hero line "Proven energy assets need proven people" still uses the
  retired phrasing; reword if the client wants it fully gone.
- Awaiting client assets: team headshots.
- Contact form is still mailto-based; wire up a real backend (Formspree /
  Cloudflare Pages Functions) once the client picks a service.

## Entries
- Menu: removed the redundant "Our Platform" (sister-site) list from the
  full-screen menu on desktop, since those links are now in the header. Kept it
  on mobile, where the header sister-links are hidden (wrapped in
  .eqv-menu__platform, hidden at >=940px).
- Header: per client, replaced the internal page tabs with links to the sister
  sites (EQV Ventures, EQV Ventures II, EQV Power, external ↗) so the platform
  family sits at the top. The site's own pages stay in the labelled MENU button
  (now shown on all sizes). Removed the now-unused active-nav JS.
- Platform everywhere: added EQV Power alongside EQV Ventures I & II in the
  footer platform links and the full-screen menu's "Our Platform" list on all
  pages, so the whole platform is represented site-wide (not just the landing
  section). Fixed two scripted mis-inserts (a stray link in the II news
  articles; left the homepage JSON-LD untouched).
- Map: office cities (Dallas, Oklahoma City, Houston) are now clickable and
  show that office's detail in the panel — role, address, phone, and a "Get in
  touch" link. OKC has full contact; Dallas/Houston show role + link until the
  client provides street addresses. (First half of Jerry's interactive-map
  ask; the state->county zoom still needs county-level data.)
- Landing page now tells the platform story: added an "EQV Platform" section
  after the overview with cards for EQV Operating, EQV Ventures Acquisition
  Corp. (NYSE: FTW), EQV Ventures Acquisition Corp. II, and EQV Power. EQV
  Power is a link-only placeholder (need a 1-2 sentence description; can't
  reach eqvpower.com from here).
- Navigation: added a visible desktop header nav (>=1080px) so first-time
  visitors see the links directly; the labelled Menu button + full-screen menu
  take over on mobile. Active page highlighted via JS (no per-file edits).
- UX: added a visible "MENU" label next to the header hamburger on every page
  so the navigation control is obvious to non-technical visitors (client
  feedback: Jerry couldn't find the menu button). Refactored the burger into
  label + icon; open/close X animation preserved.
- Timeline: the center line (track + progress fill) now renders behind the
  milestone dots instead of on top of them, so each dot's halo cleanly breaks
  the line (z-index on the line pseudo-elements vs the items).
