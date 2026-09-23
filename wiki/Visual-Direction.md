> **Status: Proposed, to be settled in Claude Design.** The engineering drawing is our working direction (decision D-005), but it stays proposed until the owner confirms it in Claude Design. The default paper is a separate open decision (P-1). Both are in the [decision log](Decision-Log).

This page explains how bikinibrains looks and why. The exact values (colours, sizes, stroke widths) live on the [design system](Design-System) page.

## The direction in one paragraph

Every lesson is drawn as an **engineering drawing**. Old blueprints were drawn precisely on blue stock, with guide lines, dimensions and notes. They felt like a person explaining at a blackboard, but with more precision. A chalkboard is someone explaining out loud. A blueprint is the same explanation drawn so carefully that it still makes sense after they have left the room. bikinibrains keeps the warmth of "someone drew this for you" and adds a drawing language in which every mark has exactly one meaning.

## Why an engineering drawing

**The drawing is where the thinking happens.** In a bikinibrains lesson, the learner predicts, clicks and answers on one precise drawing, and the drawing answers back. That only works if the drawing can carry exact meaning, and technical drawing worked out how to do that long ago.

**Meaning rides on the line, not on colour.** A drafting convention says a dashed line means hidden, and hatching means material that has been cut through. If we map a lesson's ideas onto that grammar, the drawing still reads for colour-blind readers, on a greyscale printout and through a washed-out projector.

**The finished drawing becomes the reference.** A lesson works like a model kit: you build it step by step with your own hands, and the finished model stays on the shelf. When you finish a lesson, the sheet stays behind with all its layers, notes and captions, at one permanent address.

**It grows as a drawing set.** Each lesson is a numbered sheet in one set, drawn in whichever convention fits its subject (see [content map](Content-Map)). The home page can be the drawing register, and the site becomes a set of drawings rather than a list of articles.

**What it costs us.** We are honest about the costs:

- One accent colour means fewer states can be told apart by colour. That forces discipline, which mostly helps, but some subjects will push for a second hue. Before adding one, we look for a line type that can do the job.
- Texture tempts us to add more. The paper must stay quiet (see "Never louder than the drawing" below).
- The blue is the hook, not the value. What should bring people back is good questions and careful drafting.

An earlier private style lab compared nine visual styles, and the engineering drawing was chosen over them as the working direction.

## The drafting line grammar

Every mark has exactly one meaning, and that meaning is carried by the **type of line**, never by colour alone. This is the grammar the private prototype of BB-001 already uses:

| Mark | How it looks | Meaning | Where BB-001 uses it |
|---|---|---|---|
| Object line | Solid and continuous | A visible edge, or something built or confirmed | Wall outlines. The confirmed shortest route, drawn heavier, with an arrowhead at B |
| Hidden line | Short dashes | There, but not yet settled | The frontier: cells A* has seen but not yet settled |
| Phantom line | Long, short, short | A path of motion | g: the route walked so far from A to the cell being explained |
| Section hatch | Parallel lines at 45° | Material cut through | Walls, drawn as if sliced at waist height, the way every floor plan is |
| Dimension line | A thin line with 45° slash terminators and a figure | A measured distance | h: straight to B and through the walls, which is why h never overestimates. In early lesson steps, where moves are only across and up or down, h is drawn as two dimension lines (across, then up) so the numbers stay whole; the single straight line arrives with diagonal moves (see the [lesson contract](Lesson-Contract)) |
| Datum circle | A circled letter with four registration ticks | A fixed reference point | A (every cost is measured from here) and B (the goal) |
| Leader and callout | A thin line from a point to a boxed note | "This note is about that point" | The g + h = f sum for the cell being explained |
| Wash | A flat tint that deepens | An area, graded by amount | Settled cells: the deeper the wash, the further from A |
| Redline | The one warm accent colour | Look here now. This is the only use of colour for meaning | The cell A* just chose (a crosshair ring), f in the callout, the keyboard cursor, the focus ring and the finishing stamp |

The sheet itself carries the same conventions as a real drawing:

- **Border zones.** Numbers run along the top and bottom and letters down the sides, so anyone can say "look at C4".
- **Title block.** It holds live figures for the drawing, such as cells settled, frontier size and route cost, plus a byline and date.
- **General notes.** These act as the legend. Pointing at a note isolates its layer, and everything else fades back.
- **Scale bar.** It shows what one cell is worth.
- **Drawing register.** This is the index of every sheet in the set.

**One mark, one meaning.** When a new lesson needs a new kind of meaning, it takes a new line type from the drafting vocabulary and adds it to this table, rather than a new colour.

## Two papers

The prototype draws on two real historical print processes. Each has its own character, so neither is a light or dark version of the other.

| | Blueprint (cyanotype) | Whiteprint (diazo) |
|---|---|---|
| What it was | The first widely used process for copying drawings: white lines on Prussian blue | The process that replaced it from the mid-20th century: blue-violet lines on off-white stock |
| Ground (as rendered, with texture) | `#174A87` | `#F2EEE2` |
| Linework | `#EAF2FC` | `#26407E` |
| Redline | `#FFAB90` | `#BD3E0A` |
| Linework contrast | 7.8:1 | 8.5:1 |
| Redline contrast | 4.8:1 | 4.6:1 |
| Character | Distinctive and memorable. The hook. | Calm, prints and photocopies well, and closest to "simple" |

Contrast is measured against the rendered ground, meaning the colour each sheet averages out to once grain and mottle are laid over it, not the flat base colour underneath. The ratios are rounded down, so a 4.46 is never reported as 4.5. Behind both papers, the page itself is a dark desk (`#0C1522`) that the sheets sit on.

Which paper a reader sees first is still open (see question 1 below and P-1).

## Type

The prototype uses three faces, each with one job:

- **Lettering: Barlow Condensed.** Title blocks, labels, buttons and anything a stencil would draw. It is set in capitals with generous letter-spacing.
- **Figures: B612 Mono.** Dimensions, g, h and f, and every number on the drawing. It was designed for aircraft cockpit displays, where a misread digit is not an option.
- **Hand: Architects Daughter.** Notes and asides, as the voice of whoever is doing the explaining.

The prototype sets its longer notes in the hand face. Which face should carry a lesson's narration, questions, feedback and captions is still open (see question 3).

## Never louder than the drawing

This is the rule that keeps the direction from turning into a costume: **the paper must never be louder than the drawing.**

Grain, mottle, a fold and a little edge burn make a sheet feel drawn by someone. Too much of any of them, and people notice the paper before the idea. The grid and the washes sit well below text contrast on purpose, because in drafting they are meant to recede behind whatever is being drawn.

Three quick checks for any screen:

1. **The greyscale test.** Take a greyscale screenshot. Every state should still be readable.
2. **The squint test.** Blur your eyes. The drawing should be the first thing you see, and the texture should not show at all.
3. **The bare-paper test.** Turn the texture off. If the lesson reads better without it, the texture is too loud.

Motion follows the same rule. It is used only where the idea itself is change or cause and effect. Nothing autoplays, and nothing is revealed until the learner has committed to a prediction.

## Open questions for Claude Design

These are the questions the owner will work through in Claude Design. None of them is decided here.

1. **Default paper for reading.** Should it be whiteprint (calm, prints well, closest to "simple"), blueprint (distinctive, the hook), or whichever matches the reader's system light or dark setting? This is decision P-1. *What would help:* read a full lesson on each paper on a phone at night and on a laptop by day, then print both.
2. **How much texture.** How much grain, mottle and fold can we use before it becomes a costume? *What would help:* the three checks above, applied to the same screen at three levels of texture.
3. **Typography.** Should we reduce to two faces with separate jobs? The handwriting face may be tiring to read for long, so perhaps it should be kept for short annotations on the drawing only. *What would help:* setting a whole step (narration, question, feedback and caption) in each option at 320px wide.
4. **The lesson interface on the sheet.** How do the question, answer states, feedback, progress and captions sit on a drawing sheet without cluttering it? *What would help:* a mock of BB-001's first three steps, following the [lesson contract](Lesson-Contract): one control visible at a time, and nothing appearing until it's needed.
5. **Illustration for subjects that aren't grids.** Which style still belongs to the same family: isometric exploded views, orthographic sections or schematics? *What would help:* quick sketches of BB-002 (a section) and BB-005 (a sequence drawing), two conventions far from a floor plan.
6. **Site-level pages.** The site needs a home page (the register as a table of contents), a lesson sheet, reference mode, and an about and colophon page. *What would help:* a home page mock built from the real register, at phone width first.

## What we are deliberately not doing

- **No decorative gradients.** The only gradients are the paper's own edge burn and fold, and they obey the rule above.
- **No stock illustrations or clip art.** Every picture is drawn for its lesson, in the drafting grammar.
- **No mascots or characters.** The person explaining is present through the hand-lettered notes, not through a cartoon.
- **No colour-coded states.** There are no rainbow layers and no red-for-wrong or green-for-right. Colour does one job, which is the redline.
- **No costume props.** That means no fake tape, pushpins, coffee rings or torn edges.
- **No rounded cards.** Sheets, buttons and controls have square corners. The only circles are the ones that mean something.
- **No decorative motion.** There is no parallax, confetti or animated flourish. Progress is shown as evidence of what you have learned, never as a streak to protect.
- **No emoji** anywhere in the interface.

## How this gets settled

The design loop is: brief → Claude Design (design system and screens) → the owner picks → tokens and components are exported to the repository → implemented → reviewed against the lesson contract.

We check the direction early against a real lesson, with a mock of BB-001's first three steps, because a design system invented without a real lesson in front of it is guesswork. The private prototype is available from the owner for anyone working on this.

## See also

- [Design system](Design-System): the tokens, line primitives and components behind this page.
- [Content map](Content-Map): which convention each lesson is drawn in.
- [Lesson contract](Lesson-Contract): what the interface has to make room for.
- [Decision log](Decision-Log): D-005 and P-1.
