> **Status: Draft v0.** The source of truth will move to Claude Design. Once the owner has chosen there, the tokens and components will be exported back to the repository and to this page. Until then, every value below is taken from the private BB-001 prototype as it stood on 23 September 2026. Anything marked *proposed* is a suggestion for Phase 1, not a decision.

This page records the values behind the [visual direction](Visual-Direction): colours, type, spacing, line types and components, plus the accessibility rules they must meet. It is written for whoever builds or reviews a lesson, and for the owner choosing in Claude Design.

Phase 1 is finished when these are documented on both papers and meet the accessibility rules below: the tokens (paper, ink, redline, grid, type scale, spacing), the line-type primitives, the sheet frame, title block, notes and legend, question step, feedback states, callout, buttons and progress. See the [roadmap](Roadmap).

## Colour tokens

There are two papers, and each defines the same set of tokens. The desk (the page the sheets lie on) is shared. The drawing canvas reads its colours back from these CSS custom properties, so a token change reaches the drawing without touching any drawing code.

| Token | CSS property | Blueprint (cyanotype) | Whiteprint (diazo) | Used for |
|---|---|---|---|---|
| Ground | `--ground` | `#174A87` | `#F2EEE2` | The colour the sheet averages out to once texture is applied. All contrast is measured against it, and it is used to knock out lines behind figures. |
| Paper base | `--paper` | `#0E3A7A` | `#F0ECDF` | The flat colour under the grain and mottle. |
| Paper edge | `--ground-deep` | `#0F3668` | `#DDD3B8` | Edge burn at the rim of the sheet. |
| Ink | `--ink` | `#EAF2FC` | `#26407E` | Linework and main text. |
| Secondary ink | `--ink-2` | `rgba(234, 242, 252, 0.8)` | `rgba(38, 64, 126, 0.86)` | Labels, secondary text and door swings. |
| Tertiary ink | `--ink-3` | `rgba(234, 242, 252, 0.5)` | `rgba(38, 64, 126, 0.58)` | Border zone letters only. In the prototype these are decorative (see "Accessibility requirements" below). |
| Hairline | `--hairline` | `rgba(234, 242, 252, 0.3)` | `rgba(38, 64, 126, 0.3)` | Dividers inside the title block, notes and register. |
| Grid, minor | `--grid-minor` | `rgba(214, 232, 252, 0.085)` | `rgba(38, 64, 126, 0.07)` | A ruling on every cell. |
| Grid, major | `--grid-major` | `rgba(214, 232, 252, 0.2)` | `rgba(38, 64, 126, 0.17)` | A ruling on every fifth cell. |
| Wash | `--wash-rgb` | `234, 242, 252` | `38, 64, 126` | Settled cells, at an alpha of 0.07 + 0.2 × depth. |
| Hatch strength | `--hatch` | `0.42` | `0.55` | The opacity of section hatching. |
| Hover | `--hover` | `rgba(234, 242, 252, 0.09)` | `rgba(38, 64, 126, 0.07)` | The fill under the pointer on controls and notes. |
| Redline | `--redline` | `#FFAB90` | `#BD3E0A` | "Look here now", and the focus ring. |
| Desk | `--desk` | `#0C1522` | `#0C1522` | The page behind the sheets. |
| Desk ink | `--desk-ink` | `#9FB4CF` | `#9FB4CF` | Text on the desk. |

### Measured contrast

These figures are measured with the WCAG 2 formula against the **rendered ground**, not the paper base, and rounded down. Where a token is translucent, the table gives the colour it produces on the ground.

| Pair | Blueprint | Whiteprint | Needs | Result |
|---|---|---|---|---|
| Ink on ground | 7.8:1 | 8.5:1 | 4.5:1 (text) | Passes |
| Redline on ground | 4.8:1 | 4.6:1 | 4.5:1 (text) | Passes, with little margin on whiteprint |
| Secondary ink on ground | ≈ `#C0D0E5`, 5.6:1 | ≈ `#43588C`, 6.0:1 | 4.5:1 (text) | Passes |
| Tertiary ink on ground | ≈ `#819EC2`, 3.2:1 | ≈ `#7C89A8`, 3.0:1 | 4.5:1 (text) | Fails for text, so use it for decoration only |
| One hatch line on ground | ≈ `#7091B8`, 2.7:1 | ≈ `#828EAB`, 2.8:1 | 3:1 (graphics) | Below. Walls are identified by their full-ink outline, and the hatch is extra. |
| Hairline on ground | ≈ `#567CAA`, 2.0:1 | ≈ `#B5BAC4`, 1.6:1 | – | Recedes. It must never be the only edge of a control. |
| Grid, major / minor | 1.5:1 / 1.2:1 | 1.3:1 / 1.1:1 | – | Recedes, by design |
| Redline on the deepest wash | 2.5:1 | 2.9:1 | 3:1 (graphics) | **Fails. Must be fixed in Phase 1.** |
| Ink on the deepest wash | 4.0:1 | 5.3:1 | 3:1 (graphics) | Passes for lines. Figures sit on a knockout. |
| Desk ink on desk | 8.6:1 | 8.6:1 | 4.5:1 (text) | Passes |

The ground matters. On the blueprint, measuring against the darker paper base would report ink at 9.7:1 and redline at 6.0:1. The paper people see is lighter than that, because grain and mottle lift it.

The deep-wash failure is real. The redline crosshair sits on the cell A* just chose, which is often a settled cell far from A. Phase 1 needs to fix that. One option is to knock out the ground under the ring, as figures already are. Another is to cap how deep the wash goes.

## Type

### Roles

| Role | Face | Weights | Fallbacks | Used for |
|---|---|---|---|---|
| Lettering | Barlow Condensed | 500, 600 | "Arial Narrow", "Roboto Condensed", sans-serif | Title blocks, labels, buttons, zone letters and the stamp. Set in capitals and tracked. |
| Figures | B612 Mono | 400, 700 | ui-monospace, SFMono-Regular, Menlo, monospace | Every number, the variables g, h and f, the datum letters and dimensions, all in tabular numerals |
| Hand | Architects Daughter | 400 | "Segoe Print", "Bradley Hand", cursive | Notes, hints and asides: the voice of the person explaining |
| Longer reading text | Open | – | – | Narration, questions, feedback and captions. The prototype sets its longer notes in the hand face. Which face does this job is open question 3 in [visual direction](Visual-Direction). |

The prototype loads its faces from Google Fonts. *Proposed:* the site hosts them itself, so lessons keep working without a third party and readers' browsers make no outside requests.

### The main sizes the prototype uses

| Where | Face and weight | Size / line height | Tracking |
|---|---|---|---|
| Title block title | Lettering 600 | 27px / 1 (23px below 560px wide) | 0.08em |
| Sheet strip title | Lettering 600 | clamp(17px, 2.2vw, 22px) / 1.1 | 0.14em |
| Stamp | Lettering 600 + Figures 400 | 17px + 11.5px | 0.2em |
| Title block status | Lettering 600, redline | 15px / 1.2 | 0.16em |
| Notes and hints | Hand | 15px / 1.45 | – |
| Design-note body | Hand | 16px / 1.55, at most 62 characters wide | – |
| Buttons | Lettering 600 | 13px | 0.16em |
| Title block values | Figures 400 (700 when live) | 13px / 1.25 | – |
| Note titles | Lettering 600 | 12.5px / 1.2 | 0.14em |
| Strip, segmented control | Lettering 600 | 12px | 0.14–0.16em |
| Labels on the drawing (g, h) | Figures 700 | 11px | – |
| Callout rows / f row | Figures 400 / 700 | 11.5px / 13px | – |
| Callout header | Lettering 600 | 10.5px | 1.2px |
| Zone letters | Lettering 500, tertiary ink | 10.5px | 0.12em |
| Title block field names | Lettering 600 | 9.5px | 0.18em |

### A proposed scale

The prototype uses more than a dozen sizes, and several of them are too small for text people need to read. *Proposed:* seven steps, with a floor of 11px for any text a reader needs. This scale is to be tested in Claude Design at 320px wide before anything is fixed.

| Token | Size | Line height | Replaces | Typical use |
|---|---|---|---|---|
| `--text-2xs` | 11px | 1.2 | 9.5, 10.5, 11 | Title block field names, labels on the drawing, zone letters |
| `--text-xs` | 12px | 1.2 | 11.5, 12, 12.5 | The strip, segmented controls, note titles, callout rows |
| `--text-sm` | 13px | 1.25 | 13 | Buttons, title block values, f in the callout |
| `--text-md` | 15px | 1.45 | 15 | Hand notes, status |
| `--text-body` | 17px | 1.5 | 16 | Narration, questions, feedback and captions (in whichever face question 3 settles on) |
| `--text-lg` | 22px | 1.15 | 17–22 | Sheet strip title |
| `--text-xl` | clamp(23px, 3vw, 28px) | 1.05 | 23, 27 | The lesson's question title, the title block title |

*Proposed* tracking for capital lettering, reduced from six values to three: `--track-tight` 0.08em for large lettering, `--track` 0.14em for most lettering, and `--track-wide` 0.18em for the smallest labels and the stamp.

## Space, corners and rules

**Spacing.** The prototype's spacing grew by hand, with values anywhere from 2px to 30px and no fixed steps. *Proposed:* a 4px base with the steps 4, 8, 12, 16, 20, 24, 32 and 48px, each named by how many 4px units it holds (`--space-1` is 4px, `--space-8` is 32px, `--space-12` is 48px).

The prototype's layout values:

| Value | Now |
|---|---|
| Side margin of the page | clamp(16px, 3vw, 40px), so 16px on a phone |
| Widest the desk gets | 1240px |
| Gap between sheets | 30px |
| Sheet margin (paper showing outside the frame) | clamp(8px, 1.4vw, 16px) |
| Zone band around the frame | 20px (14px below 560px wide) |
| Zones | 8 numbered columns × 6 lettered rows (4 × 4 below 560px wide) |
| Layout breakpoints | 920px (drawing and side panel stack), 720px (notes go to one column), 560px (narrow frame, register becomes a list), 380px (smaller callout on the drawing) |
| Narrowest supported | 320px, with no sideways scrolling |

**Corners.** Everything is square: sheets, buttons, controls, callouts and the stamp have a 0px radius. The only circles are the ones that carry meaning: datums, note numbers (22px, 1.3px ring) and the redline ring.

**Rules.** Lines on the page are 1 to 2px.

| Rule | Width | Colour |
|---|---|---|
| Sheet frame, outer | 2px | ink |
| Field border and panel dividers | 1px | ink |
| Title block top rule | 1.5px | ink |
| Buttons and segmented controls | 1.5px | ink |
| Register table, outer / cells | 1.5px / 1px | ink / hairline |
| Title block and notes dividers | 1px | hairline |
| Stamp | 2px border plus a 1px outline, 3px out | redline |

**Shadow.** There is only one: the sheet lifting off the desk (`0 26px 60px rgba(0,0,0,.5), 0 3px 8px rgba(0,0,0,.4)`). Nothing on a sheet casts a shadow.

**Touch targets.** Buttons are at least 44px tall. Segmented controls are 34px tall with a fine pointer and 44px with a coarse one.

## Line-type primitives

These are the drawing's vocabulary, with the exact values the prototype uses. Sizes are in CSS pixels. `cell` is the width of one grid cell (the BB-001 plan is 23 × 23 cells, with a margin of 2.2% of its width, and never less than 8px). Most values scale with the cell and have a floor, so the drawing stays legible down to 320px wide. At that width a cell is about 8.6px.

| Primitive | Stroke | Pattern | Details | In BB-001 |
|---|---|---|---|---|
| Grid, minor | 1px, grid minor | Solid | On every cell, snapped to half pixels so it stays crisp | The ruling |
| Grid, major | 1px, grid major | Solid | On every fifth cell, like engineering paper | The ruling |
| Object line | 1.6px, ink | Solid, square caps | Traced once around each solid mass, not cell by cell | Wall outlines |
| Object line, heavy | max(2.4, 0.2 × cell), ink | Solid, round caps and joins | Draws itself on over 900ms (cubic ease-out). The arrowhead is max(1.8, 0.12 × cell) wide and max(7, 0.5 × cell) long, 0.45 rad (about 26°) either side, and stops 3px short of datum B | The confirmed route |
| Hidden line | 1.1px, ink | Dash max(2, 0.16 × cell), gap max(1.5, 0.10 × cell) | A square inset 0.2 × cell into the cell. While the search runs, the dashes creep 1px every 90ms. They are still when paused or when motion is reduced. | The frontier |
| Phantom line | 1.4px, ink | Long, gap, short, gap, short, gap: long max(6, 0.55 × cell), short max(1.5, 0.10 × cell), gap max(2, 0.13 × cell) | Butt caps, round joins | g, the route so far |
| Section hatch | 0.9px, ink at hatch strength | Parallel lines at 45° | Pitch clamp(0.24 × cell, 3.2, 6)px, clipped to the wall cells | Walls |
| Dimension line | 1px, ink, over a 5px knockout in ground at 92% opacity | Solid | Slash terminators at 45°, 1.5px wide and about 12.7px long. It stops 2px short of datum B. The figure sits 9px off the line, reads from the bottom or the right (never upside down), and slides along the line to stay clear of the callout. | h |
| Datum | 1.6px, ink, filled with ground | Circle | Radius R = clamp(0.6 × cell, 8, 15)px. It has four 1px registration ticks from R + 2 to R + 6px, and its letter is set in Figures 700 at round(1.05 × R)px. | A and B |
| Redline crosshair | 1.6px, redline | Ring and four arms | The ring radius is max(4, 0.36 × cell). The arms reach max(8, 0.78 × cell) from the centre and stop half a ring-radius short of it. | The cell being explained |
| Leader | 1px, ink | Solid | A 2.2px dot marks the point. At a datum the dot is left out and the leader stops 2px short of the circle. | Callout |
| Door | Leaf 1.3px, swing 0.8px, secondary ink | Line and quarter arc | The swing radius is one cell. It is drawn only when a cell is at least 6px. | Doors |
| Keyboard cursor | 1.5px, redline | Dash 3, gap 2 | Inset 1px in the cell | The keyboard position |
| Figure knockout | 4px stroke in ground | Round joins | Drawn behind every figure on the drawing so it can be read over lines | g and h labels |
| Wash | Fill | Flat | rgba(wash, 0.07 + 0.2 × depth), where depth = g ÷ the largest g so far | Settled cells |
| Scale bar | 1px, ink | Alternate segments filled | 5 cells long, 7px tall | Sheet foot |

**Legend symbols.** The general notes draw each line type small, in a 36 × 18 SVG: the frontier as `stroke-dasharray="3 2"` at 1.2, the phantom line as `7 2 1.6 2 1.6 2` at 1.4, the hatch at 0.8 and 75% opacity with a pitch of 4, the dimension line at 1 with 1.4 slashes, and the datum at r 6.6 and 1.3 with 1px ticks.

**Isolating a layer.** When a reader points at a note, every other layer drops to 12% opacity.

## Components

What exists in the prototype, and what Phase 1 still has to design. The lesson components are the new work, because the prototype is still a visualiser and not yet a lesson.

| Component | What it is | State |
|---|---|---|
| Sheet frame with zones | 2px border, a zone band with numbers and letters, and a 1px inner field | Exists in prototype |
| Strip (sheet header) | Drawing number, title with its view ("plan view"), and "sheet 01 of 02" | Exists in prototype |
| Title block | Project, title and subtitle, scale, figures that update as the search runs, status in redline, drawn by, date and sheet, on a 6-column grid | Exists in prototype |
| General notes (legend) | A numbered circle, a symbol, a title and a hand-lettered note. Pointing at a note isolates its layer, and on touch screens and narrow screens you tap it instead. | Exists in prototype |
| Callout: g + h = f | A leader to a boxed sum set out as a column, with f in redline. The printed figures always add up. | Exists in prototype |
| Redline crosshair | Marks the cell being explained | Exists. Needs the deep-wash contrast fix. |
| Stamp | A redline double border turned −7°, pressed on at the end in the corner the route leaves clear | Exists in prototype |
| Buttons | Outline and primary (ink fill), square, at least 44px tall, 40% opacity when disabled | Exists in prototype |
| Segmented control | A set of pressed or unpressed buttons (speed, paper) | Exists in prototype |
| Scale bar | "1 cell = 1" | Exists in prototype |
| Drawing register | A table that becomes one entry per drawing below 560px, and stays a table for screen readers | Exists in prototype |
| Keyboard cursor and cell read-out | Arrow keys move a dashed redline cursor, and each cell is announced as you land on it | Exists in prototype |
| Question step | One sentence of narration, one question answered by acting on the drawing, and one control visible at a time | To design |
| Answer states | Not yet answered, committed, right, a named misconception, and not allowed (such as an unseen cell). These are shown by mark and words, never by colour alone. | To design |
| Feedback | Names the misconception in words and shows it on the drawing, then offers another try (see [voice and writing](Voice-and-Writing)) | To design |
| Number input | "Type one number", for steps that ask for g, h or f | To design |
| Progress | Where you are in the 6 to 10 steps, shown as evidence of what you have done, with no streaks | To design |
| Captions | A one-sentence fact per step, collected into the reference sheet | To design |
| Reference mode | "Show everything, skip questions" for returning readers, with all layers, notes and captions, plus a free sandbox | To design |
| Site pages | Home (the register), lesson sheet, about and colophon | To design (open question 6) |

## Accessibility requirements

Accessibility is part of done, not a later pass. These rules apply to every token and component, on **both** papers.

- **Contrast is measured on the rendered paper**, including anything underneath the mark, such as a wash. Text needs at least 4.5:1. Graphics that carry meaning, such as line types, control edges and the focus ring, need at least 3:1. We don't use the large-text exemption.
- **Tertiary ink is for decoration only.** At 3.2:1 and 3.0:1 it can't carry text a reader needs, so the zone letters that use it are hidden from assistive technology. The [lesson contract](Lesson-Contract) suggests the border zones as one way to name places on the drawing ("the doorway at C4"). If lessons use them that way, the zone letters carry meaning and must move to secondary ink or stronger.
- **Meaning is never carried by colour alone.** Every state has a line type, a shape or words. The redline always comes with a shape (ring, crosshair, dashed outline) or words.
- **Focus style is a dashed redline**: a 2px dashed outline in redline, 2px out (3px on the drawing). It uses the redline for its one meaning, "look here now". Every interactive element shows it, and it is never removed without a replacement.
- **Keyboard.** Every step can be done from the keyboard. The drawing is reachable with Tab. Arrow keys move a cursor from cell to cell and announce each one, and Enter or Space acts on it. Single-key shortcuts work only when the sheet has focus and are declared with `aria-keyshortcuts`. The space bar still scrolls the page unless the drawing has focus.
- **Screen readers.** The drawing has a text description. Changes a learner needs to know about are announced politely. The register stays a table when it reflows, and decorative marks are hidden.
- **Reduced motion.** With reduced motion on, the dashes stop creeping, the route appears already drawn, and the stamp arrives without its bounce. Nothing autoplays in any case.
- **Touch.** Targets are 44px on coarse pointers. A vertical swipe on the drawing scrolls the page, and a sideways drag draws.
- **Small screens.** Everything works at 320px wide with no sideways scrolling.
- **The greyscale check.** Every state still reads in a greyscale screenshot.

The prototype runs 42 automated checks covering keyboard, touch, layout at 320px and contrast. The repository already has a contrast audit (`tools/contrast-audit.js`). *Proposed:* it reads the exported tokens and fails a pull request if any required pair drops below its threshold on either paper.

## How tokens will be exported

The design loop is: Claude Design → the owner picks → tokens and components exported to the repository → implemented → reviewed against the [lesson contract](Lesson-Contract).

*Proposed:* the export produces two files that carry the same values:

- **`tokens.json`** holds the data, for tools, tests and the contrast audit, in the W3C Design Tokens Community Group format (`$value`, `$type`) so that other tools can read it.
- **CSS custom properties** hold the same values as a plain stylesheet, for pages and for the drawing, which reads its colours back from CSS.

The CSS would be committed as it is, with no build step, so a lesson keeps working without a toolchain. Where the files live waits on the site-structure decision (plain static files or a static-site generator), and the Phase 1 export task records it here.

*Proposed:* each paper is scoped by an attribute with a plain name. The prototype uses `data-print="cyan"` and `data-print="diazo"`. The export would use `data-paper="blueprint"` and `data-paper="whiteprint"`.

```css
[data-paper="blueprint"] {
  --paper: #0e3a7a;
  --ground: #174a87;
  --ink: #eaf2fc;
  --ink-2: rgba(234, 242, 252, 0.8);
  --redline: #ffab90;
  /* … */
}
```

```json
{
  "paper": {
    "blueprint": {
      "ground": { "$type": "color", "$value": "#174A87", "$description": "Rendered average of the sheet; measure contrast here" },
      "ink": { "$type": "color", "$value": "#EAF2FC" },
      "redline": { "$type": "color", "$value": "#FFAB90" }
    }
  }
}
```

Line primitives are stored the way the table above gives them: a fraction of a cell with a pixel floor. For example, the long dash of the phantom line is 0.55 × cell and never less than 6px. The token format has no unit for "a fraction of a cell", so those values go in an `$extensions` block next to the plain stroke width.

## Changing the design system

- Propose a change in an issue labelled `area:design` and `phase:1-design-system`.
- Show before and after screenshots on **both** papers, at 320px wide and at desktop width.
- The contrast audit and the automated checks must pass.
- Update this page in the same pull request.
- A new meaning on the drawing gets a new line type, added to the grammar in [visual direction](Visual-Direction). It never gets a new colour.

## See also

- [Visual direction](Visual-Direction): why it looks like this, and the open questions.
- [Voice and writing](Voice-and-Writing): the words that sit on the sheet.
- [Lesson contract](Lesson-Contract): what the components must support.
- [Roadmap](Roadmap): Phase 1 exit criteria.
