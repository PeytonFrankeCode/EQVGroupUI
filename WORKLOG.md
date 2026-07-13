# Session Worklog

Running list of what Peyton asks for and what gets done, kept since the
last summary. When Peyton asks to retrieve the session, I summarize this
list briefly and reset it.

*Log reset: 2026-07-12 (after the redesign-polish session: hero headline
"Redefining Energy Investment", tagline retirement, map/beacon/timeline work,
menu-bar + iOS fixes, and the full dash scrub).*

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
- Official logo: measured the client's hi-res EQV mark and rebuilt the site's
  vector to match it exactly (corrected the middle E arm to full width and the
  V proportions). Updated the inline currentColor `#eqv-mark` symbol on all 15
  pages (so it still adapts to light/dark and stays crisp) and regenerated the
  SVG favicon + favicon-32.png + apple-touch-icon.png (white mark on brand
  blue) from the corrected geometry. Archived the hi-res original in brand/.
- Light-mode hero video: added the client's clip as an autoplaying, muted,
  looping background (behind a scrim, under the content). Transcoded the 28MB
  source to a 2.8MB MP4 + 2.4MB WebM (720p, no audio, faststart) and extracted
  a poster frame. Moved the hero gradient into a ::before overlay so it sits
  above the video; dark mode hides the video and keeps the night image + motto.
  Reduced-motion users get the static poster (JS pauses it).
