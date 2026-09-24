> **Status: Proposed v0.** This is the format every lesson would follow. It needs the owner's sign-off before Phase 0 can close. Until then, argue with it in an issue.

A lesson makes the learner a promise: one question, answered by doing, in 10 to 15 minutes, on one drawing that stays behind as a reference. This page spells out what keeping that promise takes, so that every lesson feels like part of the same library, whoever made it.

The reasons behind each rule are in [learning principles](Learning-Principles). How the sheet looks is being worked out in [visual direction](Visual-Direction) and will be fixed in the [design system](Design-System). How the words are written is in [voice and writing](Voice-and-Writing).

## At a glance

- One lesson is one sheet, and one sheet answers one question.
- The title is the question in the learner's own words. The technical name is the subtitle.
- A lesson takes 10 to 15 minutes, in 6 to 10 steps.
- It opens with a challenge, before any terms.
- Every step has one sentence of narration, one new layer on the same drawing, one question answered by acting on the drawing, feedback on the drawing, and a one-sentence caption.
- Numbers start small and whole. Complexity arrives later, in a "what changes?" step.
- Motion is used only where the idea is change. Nothing autoplays. Nothing is revealed before the learner commits.
- Only one control is visible at a time, and nothing appears until it is needed.
- Afterwards, the sheet becomes the reference, with a sandbox, at one permanent URL.
- Practice lives on short, separate sheets that come back days later.
- Accessibility is part of done.

## The sheet

A lesson happens on a single sheet. What each part is *for* is set here. How each part looks, and where the step panel sits, is still open in Claude Design (question 4 on [visual direction](Visual-Direction)).

- **Title.** The question, in words a curious person would use. For example: "How does a map find the shortest way through a building?"
- **Subtitle.** The technical name, such as "A\* search". People who know the term can find the lesson, and newcomers learn what the idea is called.
- **The drawing.** One precise drawing that every step adds to. The learner never leaves it for another picture.
- **The step panel.** The narration, the question, the one control, the feedback and the caption for the current step.
- **Notes.** The legend: one short note for each kind of mark on the drawing. Pointing at a note isolates its layer. Notes are also where technical words that the lesson doesn't teach can be named.
- **Title block.** Live figures for what the drawing shows right now (in BB-001, cells settled and route cost), the byline (who drew it, and who reviewed it if anyone did), the revision date, and credit for any prior work the lesson builds on.
- **Place names.** A way to name any spot on the drawing in words, such as letters and numbers around the border, so that narration, feedback and screen readers can say "the doorway at C4".
- **Progress.** Which step you are on, out of how many, and evidence of what you have done so far. It is never a streak to protect.

The sheet carries nothing else. The only request for support appears once, after the recap, and never before the lesson starts (see [operating model](Operating-Model)).

## Length and shape

- A lesson takes 10 to 15 minutes and has 6 to 10 steps. If it needs more, it is probably two lessons.
- The first step (step 0) is the challenge. The last is the recap. Every step in between adds one idea.
- The simplest version comes first. Simple does not mean shallow: it means each step asks only a little at once.

## The opening challenge

Before any terms, the learner tries the whole problem in their own way. In BB-001: "Draw the route you think is shortest."

- It is quick to attempt, and needs no knowledge of the subject.
- Its feedback states a fact about the attempt (for example, how long the route is) without revealing the answer.
- The attempt stays on the sheet, and a later step comes back to it. Trying first only helps when the teaching builds on the attempt (principle 4).

## Anatomy of a step

Every step has five parts, in this order.

1. **Narration.** One sentence that tells the learner what to look at or what to do. It never gives away the answer.
2. **One new layer.** One new thing appears on the same drawing, and only one.
3. **One question, answered by acting on the drawing.** Click a cell, move a wall, draw a route, shade a region, drag a label onto the drawing, or type one number. The answer is never picked from a list set apart from the drawing.
4. **Feedback on the drawing.** It responds to the learner's specific answer and, when the answer is wrong, names the misconception.
5. **Caption.** One sentence that states what the step taught. It stays on the sheet.

Rules that apply to every step:

- Only one control is visible at a time. Nothing appears until it is needed.
- The question always comes before the reveal.
- The idea comes first and its name second. A term appears only after the learner has already met the thing it names.
- The learner can go back to any earlier step. Captions they have already earned stay.

## Feedback rules

The [voice guide](Voice-and-Writing) sets out how feedback is worded. The contract requires:

- **On the drawing, next to what it is about.** Not in a banner or a pop-up.
- **Specific.** It says what the learner's answer actually was, names the idea behind it if that idea has a name, and shows where it differs from what this lesson teaches. "Not quite" on its own is never enough.
- **Shown as well as told.** Where possible, the drawing shows where the answer leads, for example by drawing the route that choice would produce next to the one the rule would choose.
- **Scripted for the three most predictable wrong answers** to every question. Any other wrong answer gets a general response that points back to the idea without giving the answer away.
- **Given for right answers too**, in one sentence that says why it is right, because a lucky guess and real understanding look the same from outside.
- **Always open to another try.** After a second miss, the drawing works the answer through, and the learner makes the final move themselves. (The number of tries is an open question, below.)
- **Never carried by colour alone**, and never red for wrong or green for right. Feedback is about the answer, never about the person.

## Caption rules

- One full sentence, ending with a full stop, that states a fact.
- True beyond this drawing and this click. It describes the idea, not the learner.
- Present tense and plain words. Any term it uses has already been met.
- It appears only after the step is answered, and then stays.
- Read in order, a lesson's captions make a complete summary of it. The recap and the reference sheet use them as they are.

For example:

- **Yes:** "g is the cost of the route actually walked from A to a cell."
- **No:** "Great job, now you know what g is!" This praises the learner and says nothing about g.
- **No:** "The heuristic." This is a label, not a sentence.

## Numbers first

- The first numbers a learner meets are small whole numbers that they can check by counting on the drawing.
- The grid is small and the moves are simple. In BB-001, moves go up, down, left or right, and each costs 1.
- Complexity (diagonals, √2, decimals) arrives later, in a step that asks "what changes?", once the idea already works with whole numbers.
- A number is shown only when the learner has a reason to look at it.
- Printed figures add up as printed (see the numbers rules in the [voice guide](Voice-and-Writing)).

## Motion

- Motion is used only where the idea is change or cause and effect: a frontier growing, bars swapping places, a message crossing between two parties.
- Nothing autoplays. The learner starts every motion.
- Nothing is revealed until the learner has committed to an answer.
- Every motion can be paused, stepped through and replayed, and it ends in a still drawing that tells the same story.
- When the reader has asked for reduced motion, changes appear in place without movement, and nothing is lost.
- Nothing moves only to look alive.

## Reference mode and sandbox

When the recap is done, the sheet becomes the reference: the finished model on the shelf.

- **Everything shows**: all layers, notes and captions, at one permanent URL that doesn't change when the lesson is revised. Revisions are dated in the title block.
- **Returning readers skip ahead.** A "show everything, skip questions" choice takes someone who already knows the lesson straight to the reference, because guidance that helps a beginner gets in an expert's way (principle 6).
- **Notes isolate layers.** Pointing at a note shows only that layer.
- **A free sandbox** sits on the same drawing: the learner can change its inputs (in BB-001, the walls, A and B) and see what happens. It comes after the lesson, never instead of it (principle 5).
- **It still reads without JavaScript.** The question, the captions, the notes and a still image of the finished drawing are there even if scripts fail.

## Practice sheets

- Practice lives on short, separate sheets, each a few minutes long, that come back days after the lesson.
- Each practice sheet uses a fresh drawing of the same idea, such as a new floor plan, so the learner has to recall rather than recognise.
- Questions are answered on the drawing, under the same feedback rules. Practice sheets don't teach anything new.
- No account is needed. Which practice is due is remembered in the learner's own browser, and offered when they come back.

## Accessibility

Accessibility is part of done, not a later pass. A lesson is not finished until all of this is true.

- **Keyboard.** Every step can be done with the keyboard alone, with a visible focus. On a grid, the arrow keys move a cursor and Enter acts.
- **Screen reader.** Every step can be done with a screen reader. Every place on the drawing can be reached and is announced with what is there, for example "C4, doorway, 3 steps from A". New layers, feedback and captions are announced when they appear.
- **Never colour alone.** Meaning is carried by line type, shape and label, so the drawing works in greyscale and for colour-blind readers. The one accent colour only says "look here", and always alongside a second cue.
- **Contrast.** Text meets WCAG 2.2 AA (4.5:1), and lines and controls that carry meaning reach at least 3:1. The automated contrast audit checks this.
- **Reduced motion** is respected everywhere.
- **Small screens.** Every step works at 320px wide with no sideways scrolling, and controls are at least 44 by 44 pixels to touch, as on the [design system](Design-System). How cells on the drawing are picked at that width is still open (see the questions below).
- **Zoom.** Text can be enlarged to 200% without anything being lost.

## Definition of done

A lesson is done when all of these are true:

1. Every step is scripted: narration, layer, question, feedback and caption.
2. Misconception feedback is written for the three most predictable wrong answers to each question.
3. It is drawn to the design system.
4. The accessibility checks pass.
5. It has been tested with five people who didn't know the topic. Each one thinks aloud while doing the lesson, and answers the same three questions before and after it.
6. Fixes have been made wherever people guessed. When a tester has to guess, the step changes, not the tester.

Every lesson pull request also runs the automated checks (tests, contrast audit and accessibility checks), and they must pass.

**Suggested addition, not yet agreed:** a correctness review by someone who knows the subject well. The [content map](Content-Map) already asks for a reviewer before a lesson is chosen. While the repository is private (D-007), an outside reviewer can see a lesson's pull request only if the owner adds them as a collaborator. On a personal account, every collaborator can also make changes to the repository, not only read it. The owner decides whether to invite a reviewer or to share the lesson with them another way.

## Worked example: BB-001

- **Title:** How does a map find the shortest way through a building?
- **Subtitle:** A\* search
- **Drawn as:** a floor plan, with a route found through rooms.

**The plan.** A few rooms joined by doorways, on a grid small enough that every number can be checked by counting. A is where you are and B is where you want to go. Moves go up, down, left or right, and each step costs 1. Walls are hatched.

The line types named in brackets come from the working drafting grammar on [visual direction](Visual-Direction), which is still Proposed. One difference from that page: until step 7, h is drawn as two dimension lines, one across and one up, rather than one straight line to B, so that its numbers stay whole. The example numbers are only illustrations; the real ones depend on the plan that gets drawn.

**Prior art.** BB-001 builds on Amit Patel's [Introduction to the A\* algorithm](https://www.redblobgames.com/pathfinding/a-star/introduction.html) on Red Blob Games, the standard interactive introduction to A\*, and credits it on the sheet. BB-001 doesn't try to be more beautiful. It has to do better on the thinking the learner does.

### Step 0: the challenge

- **Narration:** "Draw the route you think is shortest from A to B."
- **New layer:** none yet, only the plan, A and B.
- **Question:** draw a route, cell by cell.
- **Feedback:** states the route's cost ("Your route takes 11 steps") and keeps it on the sheet as a faint line. It doesn't say yet whether a shorter route exists, and it says plainly that guesses are how this lesson works. If the route crosses a wall or skips a cell, the drawing marks the spot.
- **Caption:** "A route is a chain of neighbouring cells, and its cost is the number of steps it takes."

### Step 1: the cost walked so far

- **Narration:** "A\* works outwards from A, one cell at a time, keeping count as it goes."
- **New layer:** the route walked from A to one marked cell (phantom line).
- **Question:** "How many steps from A to this cell?" The learner types one number.
- **Predictable wrong answers:**
  - *One too many, because A was counted as a step.* "You counted A. A is where you start, so count the moves, not the cells."
  - *A diagonal shortcut.* "That cuts a corner. On this plan, moves go only up, down, left or right."
  - *Straight through a wall.* The drawing marks the hatched wall: "Routes can't pass through walls. This one has to use the doorway."
- **Caption:** "g is the cost of the route actually walked from A to a cell."

### Step 2: searching without a hint

- **Narration:** "Suppose the search always takes the waiting cell with the smallest g next."
- **New layer:** the search's progress, shown as the cells waiting to be dealt with (hidden line, dashed) and the cells already dealt with (wash). Notes name them the *frontier* and the *settled* cells.
- **Question:** "Shade the cells you think it will settle before it reaches B." Then the learner runs the search at their own pace and watches it spread. The motion is justified here, because the idea is change.
- **Predictable wrong answers:**
  - *A narrow band heading straight for B.* "You've sent it straight at B. This rule uses only the cost from A, so nothing in it points towards B. It spreads evenly, even away from B."
  - *Only the room A is in.* "It doesn't stop at the doorway. It settles every cell that is fewer steps from A than B is, whichever room that cell is in."
  - *Only the cells along their own route from step 0.* "That's the route you'd take. The search doesn't have a route yet. It has to settle cells all round A to find one."
- **Caption:** "Using only the cost walked so far, a search spreads out evenly in every direction, including away from B."
- **Note:** this rule on its own is Dijkstra's algorithm. When every step costs 1, it behaves like breadth-first search. It is named in a note, not taught.

### Step 3: a guess at what's left

- **Narration:** "Now give the search a hint: a guess at how far each cell still is from B."
- **New layer:** two dimension lines from one cell to B, one across and one up, drawn straight through the walls.
- **Question:** "Ignoring the walls, how many steps from this cell to B?" The learner types one number.
- **Predictable wrong answers:**
  - *The real route, round the wall.* "That's the real route. Finding it is the whole job, so the guess can't use it. The guess ignores walls, which is why it can be worked out instantly."
  - *Only the longer of the two runs, as if the route could cut diagonally.* "Here the route can't cut corners. Add the steps across to the steps up."
  - *One too many.* "You counted the cell you're standing on. Count the moves, as you did for g."
- **Caption:** "h is a guess at the cost still to go, made by ignoring the walls."

### Step 4: the guess is never too big

- **Narration:** "This cell has a wall between it and B."
- **New layer:** the cell's real route to B (phantom line), measured beside its h.
- **Question:** "Draw the shortest real route from this cell to B." The drawing counts it and sets it next to h.
- **Predictable wrong answers:**
  - *A route through the wall.* The drawing marks the crossing: "Real routes go through doorways. The guess can ignore walls; the route can't."
  - *A route that is longer than it needs to be.* "That works, but there's a shorter way round. Look at the other doorway."
  - *Copying h as the answer.* "That's the guess. Now draw the route you'd actually have to walk."
- **Caption:** "h ignores the walls, so it can never be more than the real distance left to B."
- **Note:** a guess that never overestimates is called *admissible*. In the sandbox, moving the wall shows the same thing: the real route never drops below h.

### Step 5: adding them up

- **Narration:** "A\* adds g and h for every cell on the frontier, and settles the one with the smallest total next."
- **New layer:** the g + h = f sum on three frontier cells (leader and callout).
- **Question:** "Which cell will A\* settle next?" The learner clicks a cell.
- **Predictable wrong answers** (worded in full in the [voice guide](Voice-and-Writing)):
  - *The frontier cell with the smallest h.* That is greedy search, which heads for B but can be led into a dead end.
  - *The frontier cell with the smallest g.* That is the search from step 2, which spreads out in every direction.
  - *A cell that isn't on the frontier yet.* It has no g to add up; A\* can only settle dashed cells.
- **Ties:** if two cells share the smallest f, either answer is right, and the feedback says so.
- **Caption:** "A\* always settles the frontier cell with the smallest f, where f = g + h."

### Step 6: your turn to run it

- **Narration:** "Settle the next cells yourself, with a little less help from the drawing each time."
- **New layer:** the search itself. The settled wash and the frontier grow with each choice, and when B is settled, the route is drawn (object line, with an arrowhead at B).
- **Question:** "Which cell next?", three times. The first time, every f is shown. The second time, g and h are shown but not f. The third time, only the frontier is marked and the learner works out the numbers. After that, the learner steps the search on to B at their own pace.
- **When B is settled:** the cells A\* settled are drawn over the region the search in step 2 settled, and the title block shows both counts.
- **Predictable wrong answers:** the three from step 5, plus one more:
  - *Choosing B as soon as it appears on the frontier, while another cell has a smaller f.* "B is on the frontier, but this cell has a smaller f, so a cheaper route might still run through it. A\* finishes when it settles B, not when it first sees it."
- **Caption:** "The guess steers A\* towards B, so it usually settles fewer cells than a search without it, and it still finds a shortest route."

### Step 7: what changes when the route can cut corners?

- **Narration:** "Now the route may also move diagonally, and a diagonal step costs √2 ≈ 1.41."
- **New layer:** diagonal moves on the plan, each marked with its cost. This is the first time √2 and decimals appear on the sheet.
- **Question:** "Click a cell where the old guess, across plus up, is now more than the real cost to B."
- **Predictable wrong answers:**
  - *A cell in the same row or column as B.* "Along B's row or column, a diagonal can't make the route any shorter, so the old guess still can't be too big. Look for a cell that is both across from B and above or below it."
  - *A cell whose real route goes round a wall.* "Walls make the real route longer, never shorter, so they can't make the guess too big. Look for a cell where a diagonal shortcut beats across plus up."
  - *B itself.* "At B, both the guess and the real cost are 0."
- **Right answer, for example:** "Yes. From here the old guess says 2, but one diagonal step costs only 1.41. The guess is now too big." The feedback then draws a single dimension line from that cell straight to B, as the private prototype does, to show a guess that still can't overestimate.
- **Caption:** "When diagonal moves are allowed, across plus up can overestimate, so the guess has to change to one that can't, such as the straight-line distance."

### Step 8: recap

- **Narration:** "Here is the route you drew at the start, beside the one A\* found."
- **New layer:** back on the plan without diagonals, the learner's route from step 0 and A\*'s route, each with its cost. The captions from every step are gathered into a summary.
- **Question:** "Drag g, h and f onto the right numbers beside this cell." The cell is one the learner hasn't looked at before. It shows four numbers: its g, h and f, and its real cost still to go to B, which none of the labels fits.
- **Predictable wrong answers:**
  - *g and h swapped.* "g is behind the cell: the cost already walked from A. h is ahead of it: the guess at what's left to B. Follow the phantom line back to A."
  - *f placed on g or h.* "f is the total, g + h. It's the number A\* compares."
  - *h placed on the real remaining cost.* "That's the real cost left. h is the guess that ignores walls."
- **Caption:** "A\* finds a shortest route by always settling the cell with the smallest cost walked plus cost guessed, as long as the guess never overestimates."
- **Afterwards:** the sheet becomes the reference, the one request for support appears, and the first practice sheet (a new floor plan) is set to come back a few days later.

That is nine steps, from 0 to 8, which fits the 6 to 10 allowed and should take 10 to 15 minutes. The five-person test will say whether it does.

### Where BB-001 stands today

The private prototype (available from the owner) already has the drawing, both papers, the drafting grammar, the g + h = f callout, notes that isolate layers, a title block with live figures, and keyboard, screen-reader and touch support.

It is still a visualiser, not a lesson. It plays by itself, asks no questions, gives no feedback, and shows √2 and decimals on first sight. Meeting this contract means starting on a plan without diagonals and with whole numbers, scripting steps 0 to 8, writing the feedback, making a practice sheet, and running the five-person test. That is Phase 2 on the [roadmap](Roadmap).

## Open questions

These are for the owner, and some will be answered by the first mock of BB-001's opening steps in Claude Design.

- **Passing the five-person test.** What counts as a pass? The definition of done sets the method but not the bar.
- **Tries before help.** Is two tries before the drawing works the answer through the right number?
- **Practice timing.** How many days until the first practice sheet comes back, and how does the site offer it without accounts or email?
- **Small screens and grid size.** At 320px wide, with a 16px margin on each side and 44-pixel touch targets, there is room for only about six cells across. Is BB-001's first plan that small, or are cells chosen another way, such as with a cursor or a zoomed view?
- **Where the step panel sits** on the sheet without cluttering the drawing (question 4 on [visual direction](Visual-Direction)).
- **One drawing, always?** Could a future lesson ever need a second drawing, or is that a sign it should be two lessons?
