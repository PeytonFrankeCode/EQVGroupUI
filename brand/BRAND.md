# EQV Group — Brand Colors

The official color palette for the eqvgroup.com redesign, extracted from the
company presentation template ([`Presentation_Template_Standard_v2.pdf`](./Presentation_Template_Standard_v2.pdf)).

These are the colors we will use across the website. Consume them via the CSS
custom properties in [`colors.css`](./colors.css) rather than hard-coding hex
values.

## Palette

| Token | Hex | RGB | Role |
|---|---|---|---|
| Brand Blue (primary) | `#0721A3` | `7, 33, 163` | Cover/hero backgrounds, primary buttons, links, accent divider lines |
| Ink (near-black) | `#000000` | `0, 0, 0` | Logo wordmark, primary headings, footer rules |
| White | `#FFFFFF` | `255, 255, 255` | Page background, logo reversed on blue |
| Grey 100 | `#F5F5F5` | `245, 245, 245` | Secondary panel / section backgrounds |
| Grey 150 | `#F2F2F2` | `242, 242, 242` | Content-block and placeholder fills |
| Body Grey | `#686868` | `104, 104, 104` | Body copy, captions, muted / footer text |

### Notes
- **`#0721A3` is the definitive brand blue.** On the presentation cover it sits
  under a subtle wave texture that makes it read a touch lighter (~`#3B50B4`),
  but the solid brand color is `#0721A3`. Use the solid value for flat fills.
- The logo appears in two treatments: **black on white** (light backgrounds)
  and **white on brand blue** (dark/hero sections).
- Keep large blue fields reserved for hero / feature moments; the rest of the
  site is a clean white-and-grey layout with blue used sparingly as the accent.

## Typography

- Primary typeface: **Aptos** (the presentation uses `Aptos` / `Aptos Display`).
- For the web, use Aptos where licensed; otherwise fall back to a neutral
  humanist sans (`system-ui, -apple-system, "Segoe UI", Roboto, Helvetica,
  Arial, sans-serif`). See `--eqv-font-sans` in `colors.css`.

## Accessibility

- Brand Blue `#0721A3` on white → contrast ratio **≈ 11.6:1** — passes WCAG AAA
  for normal text. Safe for links and body-weight text on white.
- White on Brand Blue → same ratio; safe for reversed text and the reversed logo.
- Body Grey `#686868` on white → **≈ 5.3:1** — passes AA for normal text; use
  for secondary/caption copy, not for the smallest legal type on light grey.
