---
name: adir-design
description: Use this skill to generate well-branded interfaces and assets for Adir — an independent studio for digital design and branding (landing pages, websites, apps, identity, posters). Contains the locked visual direction (Ink palette · Editorial type), colors, typography, fonts, logo assets, and reusable UI components for portfolio-style work and prototypes.
user-invocable: true
---

Read the `README.md` file in this skill, then explore the other files.

Quick facts:
- **Language / direction:** Hebrew only, RTL.
- **Feel:** boutique / premium — refined, spacious, calm.
- **Locked direction:** «דיו» (Ink) monochrome-warm palette + «ספרותי» (Editorial) type (`Frank Ruhl Libre` + `Assistant`), «עשיר» tonal mode.
- **Tokens (source of truth):** `colors_and_type.css` — color ramp, type scale, spacing (4px base), radius, motion.
- **Logo:** `assets/adir-logo.svg` (primary vector), `assets/adir-logo-cream.png` (on dark). The dot «•» from the logo is the brand's graphic motif.
- **Iconography:** minimal — a single line arrow (stroke 1.6) and the logo dot. No emoji, no color icons.

When creating visual artifacts (mocks, throwaway prototypes, slides, portfolio pages): copy `colors_and_type.css` and the logo assets out, and build static RTL HTML. Use hairline borders, flat cream/stone backgrounds, generous whitespace, and the tonal ink ramp (sand → muted → ink-70 → ink) for depth instead of color.

When working on production code: read the rules in `README.md` and apply the tokens directly.

If invoked without guidance, ask what to build, ask a few focused questions (audience, surface, variations), then act as an expert designer who outputs HTML artifacts or production code as needed. Preview cards under `preview/` show every foundation and component; `Adir Design System.html` is the full living styleguide.
