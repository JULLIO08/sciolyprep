# SciOly Prep brand kit

Version 1 · November 2026. Tokens live in `assets/css/tokens.css`; base styles in `assets/css/base.css`. Preview everything at `/brand/`.

## Who we're talking to

High school students who might join as tutors, Science Olympiad coaches, and college admissions readers looking at what we've built. Every page should read as credible and organized first, friendly second.

## Personality

Clean and academic, with a small amount of real-club character. That character comes **only from the candid practice photos**. The design itself stays tidy: no doodles, textures, or handwriting fonts.

## Name and tagline

- Name: **SciOly Prep** (capital S, capital O, capital P). Never "Scioly Prep", "SCIOLY PREP", or "SciOlyPREP".
- Tagline: **Science Olympiad tutoring**
- Logo: to be supplied. Until then, set the name in Fraunces as a plain wordmark. Leave space for a mark to the left.

## Color

Light only. No dark mode.

| Token | Hex | Use | Contrast on cream |
|---|---|---|---|
| Cream | `#F8F4EA` | Page background | — |
| Cream deep | `#EFE8D8` | Placeholders, input fills | — |
| Sage | `#4F6F52` | Primary: links, buttons, key accents | 5.1:1 ✓ |
| Sage dark | `#3E5941` | Hover and pressed states | 7.0:1 ✓ |
| Kraft | `#A47148` | Secondary: large text (24px+), decorative details | 3.8:1 (large text only) |
| Kraft text | `#7A5232` | Kraft when it has to be small text (labels) | 6.2:1 ✓ |
| Ink | `#222621` | Body text, headings | 13.8:1 ✓ |
| Muted | `#5C5F57` | Meta text, small notes | 5.9:1 ✓ |
| Line | `#DDD5C4` | Input borders, hairlines inside components | — |

Balance: sage carries the section headings (h2), links, buttons, and a solid footer band with cream text. Kraft shows up in small labels and large numbers. Everything else is cream and ink. Most of the page is cream and ink. No highlight colors beyond this palette.

## Type

| Role | Font | Notes |
|---|---|---|
| Headings | Fraunces, 400 | Sentence case, regular weight. No all-caps, no bold headings. |
| Body | Literata, 400 | Paragraphs max ~38rem wide. |
| UI | Source Sans 3, 600 | Nav links, buttons, small labels only. |

Scale (desktop): h1 60px · h2 40px · h3 28px · lede 21px · body 17px · small text 15px · labels 13px. All fluid down to phone sizes.

Google Fonts URL:
`https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400&family=Literata:opsz,wght@7..72,400;7..72,600&family=Source+Sans+3:wght@600&display=swap`

## Photos

- Natural color, no filters, no overlays on faces.
- No captions. Every photo still gets descriptive alt text for screen readers.
- Slightly rounded corners (6px).
- 3–4 photos per page, one per major section.
- No hover effects on photos.
- Keep each file under ~200 KB; serve WebP.

## Icons

Minimal line icons only: 20px, 1.5 stroke, round caps, `currentColor`. Use for functional spots (email, phone, calendar, location). Never decorative, never emoji.

## Layout

- Hero is centered. Sections below are left-aligned.
- Balanced spacing. **Sections are separated by whitespace only**: no lines, no colored bands, no ornaments.
- Max content width 70rem, side gutter 16–40px.

## Components

- **Button:** sage outline, 10px rounded corners, Source Sans 3. On hover the sage fills in and text turns cream. Minimum height 44px.
- **Link:** sage, underlined, darkens on hover.
- **Focus:** 2px sage outline on everything keyboard-focusable.

## Motion

Subtle.

- Button fill: 220ms ease-out.
- Link color: 160ms.
- Hero content rises in once on page load (600ms, 8px). Nothing else animates.
- No scroll animations, no photo hovers, no counters.
- **One exception, the Gallery page:** the page sits under a light overcast (`#D4D1C8`, cream with a 15% dark tint; dark text, sage-dark `#3E5941` for links and buttons). A centered carousel advances on its own (0.75s slide, ~2.6s rest). The previous and next photos sit behind the main photo under a 75% dark overlay; only the main photo is fully bright. Hovering the main photo pauses the carousel, grows the photo 20%, and deepens the page overcast to 75% (`#444541`); header and headline text fade to cream with it. Arrow buttons on both sides, side-photo clicks and arrow keys move it by hand; it also pauses on keyboard focus and when the tab is hidden.
- `prefers-reduced-motion` turns all of it off.

## Voice

Friendly and plain, like a student explaining to a friend.

- Short sentences. Say what we actually do.
- Real numbers only. If we don't have a number yet, leave a clear placeholder.

## Always avoid

- Gradients, glows, glassy blur effects
- Emoji and stock icons (lightbulbs, rockets, atoms)
- Rows of identical cards with shadows
- Buzzwords: empower, unlock, journey, passionate, cutting-edge, elevate, seamless
- Anything that reads as AI-generated: filler intros, "not just X, it's Y" constructions, rule-of-three lists for rhythm, em-dash-heavy sentences, vague claims with no specifics, made-up stats or testimonials

## Moving to Astro later

`tokens.css` and `base.css` copy straight into `src/styles/`. Header and footer become `src/components/Header.astro` and `Footer.astro`; the page shell becomes `src/layouts/Base.astro`. No class names need to change.
