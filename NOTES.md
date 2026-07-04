# EQV Group Redesign — Notes & Feature Ideas

Running list of client direction and feature requests for the eqvgroup.com
redesign. Add to this as ideas come up.

## Guiding principles

- **This is a UI refresh, not a rebuild.** Keep ALL existing information and
  preserve every original function of the current site — we are only updating
  the look/feel and layout.
- **Design language:** use the brand template (`brand/Presentation_Template_Standard_v2.pdf`).
  Palette = nice **blue** (`#0721A3`), **grey** (`#F5F5F5` / `#F2F2F2`), and
  **white**. Clean and institutional. See `brand/BRAND.md`.
- **Build:** static site on GitHub, deployed through Cloudflare (Pages).
- **Fresh redesign** of the layout, page by page, starting with the front page,
  then `/news`, then owner-facing pages.

## Feature ideas

### 1. Timeline page
- A vertical timeline with **a line down the middle**.
- As you **scroll down**, milestones animate/reveal one at a time.
- Implemented (2026-07-05) on `team.html` ("Our Team") together with the
  executive management section: center-line alternating timeline, seven
  milestones (founding through NYSE: FTW), scroll-revealed. Exec bios are
  drawn from SEC filings — confirm titles/bios with client and add photos.
- Content to plot along the timeline:
  - Company **founding(s)** (EQV Group 2022; the SPACs; entity milestones)
  - **Acquisitions** (14+ completed)
  - **Stats over time**: production volume (e.g. 25,233 boe/d net 2024),
    assets under management, well count (1,600 → 1,800+), states/basins.
- (Data points available in `eqvgroup-research.md` — confirm current figures
  with client.)

### 2. Interactive map
- Make the operations map **more interactive**.
- Clicking / hovering a **region (state/basin)** pulls up info for that area
  (e.g. wells, production, basin name). Western Oklahoma + Texas Panhandle are
  the current operated focus.
- Implemented (2026-07-03) as a **holographic 3D map**: real state geography
  (simplified outlines in `assets/js/us-map-data.js`, derived from
  @svg-maps/usa, MIT), CSS perspective tilt with cursor parallax, glowing
  asset states, pulsing office beacons with light pillars (Park City, OKC),
  hover tooltip + click info panel. No libraries; respects reduced motion.

### 3. Dark mode
- Add a **dark mode toggle**.
- Easter egg: when dark mode is switched on, reveal the **hidden meaning** of
  the company name — **"Esse Quam Videri"** (Latin, "to be, rather than to
  seem" — what EQV stands for).
- Client direction (2026-07-03): do NOT render it as background text; it
  shows as a small tagline **directly under the EQV logo** in the header,
  dark mode only.
- Client direction (2026-07-05): in dark mode the front-page hero transforms —
  the headline/description/buttons fade out, the background swaps to a darker
  night scene, and "Esse Quam Videri" fades in with its meaning ("To be,
  rather than to seem") beneath it. Implemented with the client's dark
  mountain-sunset photo (`assets/img/hero-night.jpg`).

## Open items
- Confirm current stats/figures with client before publishing (see open
  questions in `eqvgroup-research.md`).
- **PDF documents**: the owner-forms cards on `eqv-operating.html` (W-9,
  Direct Deposit, Change of Address, Affidavit of Heirship, ACH instructions)
  point to `#` placeholders — get the real PDFs from the client and drop them
  in `assets/docs/`.
- **Careers page**: built with generic copy — the live site's Careers page was
  never captured; replace with real content when available.
- **Contact form**: static host, so submit composes a pre-filled email
  (mailto) to contact@eqvoperating.com. Upgrade path: a small Cloudflare
  Worker + email routing if the client wants true in-page submission.
- FAQ categories carry the answers verified from the live site; the client
  may have more Q&As per category to migrate.
