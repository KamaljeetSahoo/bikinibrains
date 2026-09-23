> **Status: Proposed.** This is a working list, not a promise. The owner signs it off as part of Phase 0. Which three lessons come after BB-001 is still an open decision ([P-3 in the decision log](Decision-Log)).

The content map lists the lessons bikinibrains plans to make and sets out how we choose them. Every lesson is one drawing in a single numbered set, so the map takes the form of a **drawing register**: the index a drawing office keeps of every sheet it has issued.

Each lesson asks one question in plain words and is drawn in the drafting convention that suits its subject. A route through rooms becomes a floor plan, and a sorted shelf cut in half becomes a section. The [lesson contract](Lesson-Contract) says what every lesson must contain. This page says which lessons, and why.

## The drawing register

Drawing numbers run BB-001, BB-002 and so on. "BB" stands for bikinibrains. A number identifies a lesson; it doesn't set the order we make them in. That is decided separately, and P-3 covers the next three.

| No. | Question title (draft) | Subject | Drawn as | Status |
|---|---|---|---|---|
| BB-001 | How does a map find the shortest way through a building? | A* search | Floor plan: a route found through rooms | Prototype |
| BB-002 | How do you find one word in a dictionary without reading every page? | Binary search | Section: a sorted shelf, cut in half and in half again | Proposed |
| BB-003 | How does a computer put things in order? | Sorting | Elevation: bars seen side-on as they swap places | Proposed |
| BB-004 | How does a computer find anything instantly? | Hash tables | Cabinet detail: every key filed in a labelled drawer | Proposed |
| BB-005 | How do two strangers agree on a secret in public? | The HTTPS handshake / key exchange | Sequence drawing: messages passed between two parties | Proposed |
| BB-006 | How does Git remember every version of everything? | Git branches | Site plan: roads that fork, run alongside and merge | Proposed |
| BB-007 | How does a neural network learn? | Neural networks | Schematic: a circuit of weighted wires | Proposed |

The question titles are drafts, written to the rules in [Voice and writing](Voice-and-Writing). The question is in the learner's own words. The technical name, shown in the Subject column, becomes the lesson's subtitle.

**About BB-001.** There is a working prototype that draws A* search as an engineering sheet. It has both papers, the drafting line grammar, a g + h = f callout and a title block with live figures. It is private for now and available from the owner. It is still a visualiser, not yet a lesson. It plays by itself, asks no questions, gives no feedback and shows √2 and decimals before anyone has asked for them. Phase 2 on the [roadmap](Roadmap) turns it into a guided lesson that meets the lesson contract.

### What "drawn as" means

Each subject gets a convention whose shape already says something true about it. Binary search does cut the shelf in half, and branches in Git do fork and merge like roads.

- **Floor plan**: a building seen from directly above, as if sliced through at waist height.
- **Section**: an object cut straight through so you can see inside it.
- **Elevation**: one side of an object seen straight on, with no perspective.
- **Cabinet detail**: a close-up of one piece of joinery, drawn so that someone could build it.
- **Sequence drawing**: events in order, with each party in its own column and time running down the page.
- **Site plan**: a whole site from above, showing roads, plots and where they join.
- **Schematic**: what connects to what, rather than where things physically sit.

[Visual direction](Visual-Direction) explains the drafting grammar that every one of these shares.

## Later sections to explore

These are areas, not commitments. Each would need its own questions, and each question would have to pass the checklist below.

- How data is represented: bits, bytes, text and colour.
- How networks move data: packets, DNS and routing.
- How screens and images work.
- How compression works.
- How programs run: compilers, interpreters and memory.
- How AI models work. BB-007 would be the first step into this one.

We are not building a catalogue first. After launch the plan is one flagship lesson every one to two months, with small, time-boxed notes in between (see the [roadmap](Roadmap)). A long register is a list of possibilities, not a backlog we owe anyone.

## Choosing what to make next

Every proposed lesson is checked against five criteria:

- [ ] **People ask it.** Many people ask this question, and ask it in roughly these words.
- [ ] **It can be drawn and acted on.** The mechanism can be drawn, and the learner can do something to the drawing: click a cell, move a wall, type a number. Reading a description is not enough.
- [ ] **One clear "aha" in 15 minutes.** A newcomer can reach one insight within a single lesson of 6 to 10 steps.
- [ ] **It builds towards later lessons.** Other lessons in the register use what it teaches.
- [ ] **We can make it correct.** Someone who knows the subject well will review it.

*Proposed:* score each criterion 0, 1 or 2. A score doesn't choose for us. It makes the trade-offs visible so the owner can make the call.

| Criterion | 0 | 1 | 2 |
|---|---|---|---|
| People ask it | Only specialists ask it | People ask it, but in quite different words | People ask it in roughly these words |
| Drawn and acted on | It can only be described | It can be drawn, but the learner would mostly watch | The learner acts on the drawing at every step |
| One "aha" in 15 minutes | It needs several lessons first | It's reachable, but the lesson would be crowded | One insight fits comfortably in 6 to 10 steps |
| Builds towards later lessons | It stands alone | It connects to one other lesson | Several later lessons rely on it |
| We can make it correct | Nobody can review it, or the subject is contested | A reviewer is possible but not yet agreed | A reviewer has agreed |

**Suggested reading of the score (proposed).** The maximum is 10. A 0 on "drawn and acted on" or on "we can make it correct" rules a lesson out for now, whatever its total, because it could not meet the lesson contract without them. Close totals are settled by the owner, not by arithmetic.

## From idea to register

1. **Propose it.** Open a [lesson proposal](https://github.com/KamaljeetSahoo/A-star-Algorithm/issues/new?template=lesson-proposal.yml) issue. The form asks for the question in the learner's words, the technical subject, and what the learner draws or acts on. It also asks for the convention it would be drawn in, the "aha" in one sentence, the wrong answers you expect people to give, and any prior art to learn from and credit. Tick the five criteria the form lists. If you can, add a 0 to 2 score for each criterion in a comment, and say who could check the lesson for correctness.
2. **Talk it through.** The proposal is discussed on the issue under the `area:content` label, and anyone can comment. When it's ready for a decision, it gets the `needs-owner` label.
3. **The owner decides.** If the answer is yes, the lesson takes the next free BB number and joins the register as Proposed. If the answer is not now, the issue is closed as not planned with a one-line reason, so the idea stays findable and can be reopened.
4. **It is scheduled.** When a lesson is picked for work, its proposal issue becomes the parent of that lesson's tasks, which are attached as sub-issues (see [How we work](How-We-Work)). Its status here changes to In progress.
5. **It is published** once it meets the definition of done in the [lesson contract](Lesson-Contract).

The status words we use in the register (proposed):

- **Proposed**: accepted onto the register, not started.
- **Prototype**: a working drawing exists, but it is not yet a lesson.
- **In progress**: being scripted, drawn and tested.
- **Published**: meets the definition of done, at one permanent address.
- **Withdrawn**: dropped. The number is retired and never reused.

A lesson keeps its number when its title changes.

## Prior art and credit

For A*, the standard interactive reference is Amit Patel's [Introduction to the A* algorithm](https://www.redblobgames.com/pathfinding/a-star/introduction.html) on [Red Blob Games](https://www.redblobgames.com/). It is clear, careful and generous, and BB-001 builds on the ground it prepared. We credit it here and will credit it on the BB-001 sheet.

We are not trying to out-draw that page. BB-001 has to do better on the thinking the learner does: predicting before seeing, answering questions on the drawing, and getting feedback that names their specific mistake.

When any lesson builds directly on someone's published work, we credit it on this page and on the lesson's own sheet.

## See also

- [Lesson contract](Lesson-Contract): what every lesson must contain.
- [Learning principles](Learning-Principles): the research behind the format.
- [Roadmap](Roadmap): phases and when lessons get made.
- [Decision log](Decision-Log): P-3, the first three lessons after BB-001.
