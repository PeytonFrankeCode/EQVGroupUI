# Session Worklog

Running list of what Peyton asks for and what gets done, kept since the
last summary. When Peyton asks to retrieve the session, I summarize this
list briefly and reset it.

*Log started: 2026-07-12 (after the header/scroll-icon cleanup was pushed).*

## Entries

1. **Light-mode hero photo (pending)** — Peyton supplied a snowy-peaks-over-
   autumn-aspens photo to replace the drawn light-mode hero, but it's an
   Unsplash+ watermarked preview. Waiting on a licensed/free clean file
   before swapping it in.
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
