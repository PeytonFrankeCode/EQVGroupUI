# EQV Group: Brand Color Standard

> **Source of truth.** These colors are extracted directly from the official
> `Presentation_Template_Standard_v2` brand template and are the **exact,
> approved** colors for all EQV Group digital and print work. Do not introduce
> new colors, tints, or shades without sign-off. When in doubt, use a value
> from this file.

Extracted and verified: 2026-07-06.

---

## Primary / Brand

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **EQV Blue** (primary) | `#0721A3` | `7, 33, 163` | Core brand color. Cover backgrounds, accent divider lines, primary buttons, links, key highlights. |

The EQV Blue is the single defining brand color. Everything else is a neutral
that supports it.

---

## Neutrals

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **White** | `#FFFFFF` | `255, 255, 255` | Logo lockup on blue, page/content backgrounds, text on the blue cover. |
| **Black** | `#000000` | `0, 0, 0` | Footer rule line, footer wordmark, primary headings. |
| **Near Black** | `#030303` | `3, 3, 3` | Fine strokes and dense text (functionally black; kept for fidelity). |

---

## Grays

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Gray 50** | `#F5F5F5` | `245, 245, 245` | Lightest surface. Subtle bands, placeholder fills. |
| **Gray 100** | `#F2F2F2` | `242, 242, 242` | Light surface. Content bands, title-placeholder fill. |
| **Gray 500** | `#686868` | `104, 104, 104` | Secondary / body text, confidential footer text. |
| **Gray 600** | `#767676` | `118, 118, 118` | Muted text, page numbers, captions. |

---

## Accent (decorative only)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Blue Wave** | `#3C50B4` | `60, 80, 180` | The lighter blue produced by the cover's decorative wave texture overlaid on EQV Blue. Use only to reproduce that gradient/texture effect, **not** a general-purpose UI color. |

---

## Quick reference

```
EQV Blue    #0721A3   ← primary brand
White       #FFFFFF
Black       #000000
Near Black  #030303
Gray 50     #F5F5F5
Gray 100    #F2F2F2
Gray 500    #686868
Gray 600    #767676
Blue Wave   #3C50B4   ← decorative accent only
```

## Notes on usage

- **On blue backgrounds:** use White for text and the logo.
- **On white/light backgrounds:** use Black / Near Black for headings and
  EQV Blue for accents, links, and interactive elements.
- **Body text:** Gray 500 for secondary copy; Black for primary copy.
- The footer pattern in the template is a full-width Black rule with the
  wordmark on the left and Gray 500 confidential text centered.
- The header/section pattern is a Gray 100 band bounded top and bottom by
  EQV Blue rules (see template page 2).

Machine-readable equivalents of this file live alongside it:
`colors.json`, `colors.css`, and `_colors.scss`.
