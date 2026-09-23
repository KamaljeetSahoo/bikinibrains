> **Status: Proposed.** This voice guide is one of the Phase 0 documents the owner signs off before BB-001 is scripted. Until then, treat it as a strong draft and argue with it in an issue.

This page is for anyone writing words that learners will read, whether a question title, a line of narration, a caption or a piece of feedback. It also covers the words around the lessons, such as the home page, the about page and issue descriptions.

We write for a curious person who knows nothing about the subject yet. We assume no prior technical knowledge, and we never dumb anything down.

## Our voice

**Plain.** Use short, common words and put one idea in each sentence. Introduce a technical term after the idea it names, then use that same term every time. If a sentence needs reading twice, rewrite it.

**Warm.** We are on the reader's side. We assume they are clever and new to this, not slow. We explain things the way you would to a friend across a table, with the drawing between you.

**A little playful.** Now and then a light line helps, such as a short aside in the hand-lettered notes: "h can't see walls. It's an optimist." A line like that is also true, because h never overestimates. Playfulness never goes into feedback on a wrong answer, and it never comes at the reader's expense.

**Human.** A person wrote this and it should sound like one. "We" and "you" are fine, and so are contractions ("it's", "you'll"). Say what things do rather than what they "leverage" or "facilitate".

| We write | We don't write |
|---|---|
| "Every cost on this sheet is measured from A." | "All cost calculations are performed relative to the origin node." |
| "Pick the cell you think A* will settle next." | "Now it's time to test your knowledge!" |
| "h ignores the walls, so it can never be more than the real distance." | "The heuristic function is admissible by construction." |

## Question titles

Each lesson's title is the question a curious person would ask, in their words. The technical name goes underneath as the subtitle, so that people who already know the term can still find the lesson.

- Ask about a mechanism ("how does…"), not for a definition ("what is…").
- Use an everyday picture, such as a map, a dictionary or two strangers, before any jargon.
- Keep it to one question that one lesson can answer.
- Don't promise anything. The title asks and the lesson answers.

Good titles, taken from the [content map](Content-Map):

- "How does a map find the shortest way through a building?" (subtitle: A* search)
- "How do you find one word in a dictionary without reading every page?" (subtitle: Binary search)
- "How do two strangers agree on a secret in public?" (subtitle: The HTTPS handshake / key exchange)

Titles we would not use, with what we'd write instead:

| Instead of | Write | Why |
|---|---|---|
| "A* Search Algorithm Explained" | "How does a map find the shortest way through a building?" | A topic isn't a question, and the jargon comes first. |
| "What is a hash table?" | "How does a computer find anything instantly?" | This asks for a definition rather than how something works. |
| "Master Pathfinding in 10 Minutes" | "How does a map find the shortest way through a building?" | "Master" is hype, and the time is a promise we can't keep for everyone. |
| "Understanding Heuristic-Guided Best-First Graph Traversal" | (the same A* title) | It stacks four terms the reader doesn't know yet. |
| "Why is Git so powerful?" | "How does Git remember every version of everything?" | The answer to that question would be a sales pitch. |

## Narration

Each step has one sentence of narration, which tells the learner what to look at or what to do.

- Point at the drawing: "The dashed cells are the frontier."
- Ask before telling. Narration never gives away the answer to the step's question.
- Write in the present tense: "A* looks at…", not "A* will look at…".
- Put nothing in narration that the drawing could show instead.

## Captions state facts

Each step ends with a one-sentence caption stating what was just learned. Captions are collected into the reference sheet afterwards, so every caption has to be true and make sense when read on its own, months later, with no question in front of it.

- A caption is a full sentence, ends with a full stop and states a fact.
- It never praises, asks a question or refers to "this step".

Captions we'd write for A*:

- "A* always settles the frontier cell with the smallest f, where f = g + h."
- "g is the cost already walked from A, and h is a guess at the cost still to go."
- "h ignores the walls, so it can never be more than the real distance left to B."
- "Once a cell is settled, its cheapest route from A is known for certain."

Captions we wouldn't write:

- "Great job, you've got it!" This praises the learner and says nothing.
- "Now you understand A*." It can't know that, and it isn't a fact about A*.
- "The heuristic." This is a label, not a sentence.
- "What do you think happens next?" Narration asks questions. Captions state facts.

## Feedback on answers

Feedback is where a lesson is most useful and where it can most easily go wrong. When someone gives a wrong answer, it is usually a reasonable idea that belongs to something else. We name that idea, show where it leads on the drawing, and point back to what this lesson is about.

Every piece of feedback does three things in two or three sentences:

1. It says what the learner's choice was, and names it if it has a name.
2. It explains how that differs from what the lesson is teaching.
3. It points to the place on the drawing where they can see the difference.

It never says "Wrong!", "Oops" or "Not quite" on their own, and it always lets the learner try again.

A right answer gets a reason too, because a lucky guess and real understanding look the same from the outside: "Yes. 7 is the smallest f on the frontier, so A* settles this cell next."

The top three predictable wrong answers for the A* step "Which cell will A* settle next?":

| The learner picked… | Feedback |
|---|---|
| The frontier cell with the smallest h | "That's the cell that looks closest to B if you ignore the walls. Choosing by h alone is greedy search, which is often quick but can be led into a dead end. A* also counts the cost already walked, so look for the smallest g + h." |
| The frontier cell with the smallest g | "That's the cell cheapest to reach from A. Choosing by g alone is Dijkstra's algorithm, which finds the shortest route too but spreads out in every direction. A* adds h so that it leans towards B." |
| A cell that hasn't been seen yet | "A* can only settle cells on the frontier, which are the dashed ones. This cell hasn't been reached yet, so it has no g to add up. Pick one of the dashed cells." |

Where it can, the drawing shows what the words say, without giving the answer away. For the smallest-h pick, for example, it can put that cell's g beside its h, so the learner sees what greedy search left out. The [lesson contract](Lesson-Contract) requires scripted feedback like this for the three most predictable wrong answers to every question, and says what happens after a second miss.

## Words to avoid

| Avoid | Because |
|---|---|
| revolutionary, game-changing, master, unlock, ultimate, supercharge, effortless, mind-blowing | These are hype words. They promise a feeling instead of explaining something. |
| simply, just, obviously, easy, of course, clearly, everyone knows | They tell a stuck reader that the problem is them. |
| Wrong!, Oops, Fail, silly mistake | They shame the learner. Name the idea instead (see "Feedback on answers" above). |
| magic, basically, under the hood (as a way to avoid explaining) | These skip the explanation we're here to give. |
| "the computer thinks / wants / knows", "the AI understands" | Say what it does instead: "compares", "stores", "predicts". |
| "proven to", "N× faster learning", "learning styles" | These are claims we never make. See [learning principles](Learning-Principles). |
| "AI-powered" | It says nothing about what the thing does. Say what the thing does. |

## Numbers and units

- **Start with numbers people can work out in their heads.** Early steps use a small grid and whole numbers. Diagonals, √2 and decimals arrive later, in a "what changes?" step.
- **Show the working** the way you would on a board: g and h in a column, a rule under them, and f below.
- **Printed figures must add up as printed.** When values are rounded, derive one from the others so the column still sums. The prototype rounds g and f and prints h as f − g, so a reader checking by hand never finds a sum that is out by 0.01.
- **Use numerals for values a reader might calculate with** ("g is 4", "12 steps"). In plain prose, use words for casual counts under ten ("two strangers", "three questions").
- **Show at most two decimal places**, and write "≈" for anything approximate: √2 ≈ 1.41.
- **Use the proper symbols**: × for multiply, − (a true minus sign) for subtract, and spaces around operators, as in g + h = f.
- **Write variables as single lower-case letters** and keep them the same in the text, on the drawing and in the captions. On the sheet they are set in the figures face (see [design system](Design-System)).
- **State the units once on each sheet**, on the scale bar or in the title block, for example "1 cell = 1". Where units matter (bytes, milliseconds), write them out on first use.
- **Separate thousands with a comma** in prose: 12,228.
- **Dates**: in a title block, write 2026-09-23. In prose, write 23 September 2026.

## Spelling and style

- **British spelling**: colour, visualiser, organise, behaviour, centre, grey, licence (noun). "Program" is fine when it means a computer program.
- **Sentence case** for headings, titles, buttons and labels as written. The design may set some labels in capitals, but the source text stays in sentence case.
- **Abbreviations**: spell them out on first use unless the short form is what people actually say (Git, DNS). For example, "HTTPS, the secure version of the web's main protocol".
- **Links** describe where they go. Don't write "click here".
- **Text alternatives** for a drawing describe what it shows and what that means, in the same words as the visible caption where possible.
- **No emoji** in lessons, on the site or in the wiki.

## How we use AI in writing

This is the statement we propose for the about page. The owner agrees the exact wording as part of signing off this guide.

> People write and review bikinibrains. We use AI tools to help draft problem variations and code. A person writes the voice: every question title, line of narration, caption and piece of feedback. A person also reviews everything before it ships.

In practice:

- **AI may draft.** Drafts are a starting point and are never published as they are.
- **Humans write the voice.** Titles, narration, captions and feedback are written or rewritten by a person, in this voice.
- **Humans review everything.** No word or line of code ships without a person reading it.
- **AI doesn't face learners.** There is no chatbot and no AI tutor. If that ever changes, the AI must work on the drawing and never hand out answers. See [learning principles](Learning-Principles) for why.

## Before copy ships

- [ ] Every title is a question in plain words, with the technical name as its subtitle.
- [ ] Each step has one sentence of narration that doesn't give away the answer.
- [ ] Every caption is one full sentence that states a fact and reads well on its own.
- [ ] Feedback exists for the top three predictable wrong answers, and each one names the idea without shaming.
- [ ] Nothing from "words to avoid" appears.
- [ ] Numbers in the first steps can be worked out in your head, and every printed column adds up.
- [ ] The spelling is British.
- [ ] A person other than the author has read it all.
