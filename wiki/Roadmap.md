> **Status: the plan as of 23 September 2026.** The phases and their exit criteria are set by the owner. Phase 0 has a suggested time-box, and BB-001 in Phase 2 takes the time-box for a flagship lesson. Phases 1 and 3 get theirs when we know enough to set them honestly.

We work in four phases, then settle into a steady pace of new lessons. Each phase ends when its exit criteria are true, not on a date.

The order matters. We settle the idea before we design, we design against a real lesson rather than in the abstract, and we make one lesson well before we build a site to hold many.

## At a glance

| Phase | Goal | It ends when | Label |
|---|---|---|---|
| 0. Foundation | Settle the idea, the content and the theme | The core pages are signed off; the three lessons after BB-001, the theme and the licence are chosen; and the repository is renamed | `phase:0-foundation` |
| 1. Design system v0 | Turn the chosen theme into a small, strict system | Tokens, line primitives and components are documented, on both papers, and accessible | `phase:1-design-system` |
| 2. Lesson BB-001 | Make the A\* prototype into a guided lesson | BB-001 meets the lesson contract's definition of done, including the five-person test | `phase:2-lesson-bb001` |
| 3. Site skeleton and launch | Give lessons a home at bikinibrains.com | The home page, lesson page, reference mode and about page are live on the custom domain, with no account needed | `phase:3-launch` |

After launch: one flagship lesson every one to two months, with small, time-boxed notes in between.

## Phase 0: Foundation

**Goal.** Decide what bikinibrains is, what it teaches first and what it looks like, before building anything.

**Time-box.** About two weeks. That is a suggestion, not a promise. If the time runs out, the owner looks at what is left and decides on purpose what to finish, what to cut and what to carry into Phase 1, rather than letting the phase quietly stretch.

**Deliverables.**

- Signed-off pages: [Vision](Vision), [Learning principles](Learning-Principles), [Lesson contract](Lesson-Contract), [Voice and writing](Voice-and-Writing) and [Content map](Content-Map).
- The first three lessons after BB-001 chosen from the content map (P-3 in the [decision log](Decision-Log)).
- A theme direction chosen in Claude Design. This confirms or changes the working direction, the engineering drawing (D-005). Which paper readers see first (P-1) can be explored at the same time, but it isn't an exit criterion.
- A licence for lesson content (P-2).
- The repository renamed after the domain (D-002). Done on 2026-09-23: it is now `bikinibrains` (D-006).
- Recommended: a mock of the first three steps of BB-001 (see below). It isn't an exit criterion, but it is the best evidence to choose a theme with.

### Validate early with a mock of BB-001

Before the theme is settled, make a mock of the first three steps of BB-001, on paper or in Claude Design. Use the real narration, the real question and the real feedback from the [lesson contract](Lesson-Contract), not placeholder text.

This is the cheapest test we have. A design system invented without a real lesson in front of it is guesswork. Three real steps will show quickly whether the question, the answer states, the feedback and the caption fit on a drawing sheet without clutter, and whether the paper stays quieter than the drawing.

### Renaming the repository

Done on 2026-09-23: the repository is now `KamaljeetSahoo/bikinibrains` (D-006 in the [decision log](Decision-Log)).

- GitHub redirects the old web address, issue links, wiki and Git remote from `A-star-Algorithm`, so older links keep working.
- Links in the repository that spelled out the old name were updated in the same change: `wiki/`, the issue forms, issue config and pull request template under `.github/`, `README.md`, `package.json` and `index.html`.
- The GitHub Pages address is the exception. The visualiser moved from kamaljeetsahoo.github.io/A-star-Algorithm/, which no longer answers, to kamaljeetsahoo.github.io/bikinibrains/. That matters little once the custom domain goes live.
- Nobody should create a new repository called `A-star-Algorithm` under the same account, because that would stop the redirects working.

### Exit criteria

- [ ] Vision, Learning principles, Lesson contract, Voice and writing, and Content map are signed off by the owner.
- [ ] The first three lessons after BB-001 are chosen (P-3).
- [ ] A theme direction is chosen in Claude Design (D-005 confirmed or replaced).
- [ ] A licence for lesson content is chosen (P-2).
- [x] The repository is renamed (D-006).

## Phase 1: Design system v0

**Goal.** Turn the chosen direction into a small, strict design system: designed in Claude Design, then exported to the repository as tokens and components that lessons can use without a build step.

**Deliverables.**

- **Tokens:** paper, ink, redline, grid, type scale and spacing.
- **Line-type primitives:** the drafting line grammar, in which meaning is carried by line type, not colour.
- **Components:** sheet frame, title block, notes and legend, question step, feedback states, callout, buttons and progress.

Real lesson content drives every component. The BB-001 mock from Phase 0 is the first test for each one. The [design system](Design-System) page describes what exists so far and how the export will work.

### Exit criteria

- [ ] Every token, primitive and component listed above is documented.
- [ ] Each one is shown on both papers, blueprint and whiteprint.
- [ ] Each one meets the accessibility requirements on the [design system](Design-System) page: contrast measured on the rendered paper, meaning never carried by colour alone, keyboard focus, reduced motion, and 320px wide.

## Phase 2: Lesson BB-001

**Goal.** Turn the A\* prototype into a guided lesson: "How does a map find the shortest way through a building?"

**Where we start.** The private prototype, available from the owner, already draws A\* as an engineering sheet on both papers. But it is still a visualiser, not a lesson. It plays by itself, asks no questions, gives no feedback, and shows √2 and decimals on first sight. Phase 2 closes that gap.

**Deliverables.**

- Every step scripted to the [lesson contract](Lesson-Contract): narration, layer, question, feedback and caption.
- Feedback written for the three most predictable wrong answers to each question.
- The sheet drawn with the Phase 1 design system.
- Accessibility checks passing.
- A test with five people who didn't know A\*. Each thinks aloud during the lesson and answers the same three questions before and after it.
- Fixes made wherever testers had to guess.

**Prior art.** Amit Patel's Red Blob Games pages are the standard interactive introduction to A\*, and we credit them on the sheet. BB-001 has to do better on the thinking the learner does, through prediction, questions on the drawing and feedback on their own answer, not on how it looks.

**Time-box.** The [operating model](Operating-Model) gives a flagship lesson four to eight weeks. BB-001 is the first, so it will also tell us whether that estimate holds.

### Exit criteria

- [ ] BB-001 meets every point of the lesson contract's definition of done, including the five-person test.

## Phase 3: Site skeleton and launch

**Goal.** Give lessons a home that anyone can open without signing up.

**Deliverables.**

- **Home page:** the drawing register as a table of contents.
- **Lesson page:** BB-001 as a guided lesson.
- **Reference mode:** the finished sheet, with every layer, note and caption and a free sandbox, at one permanent address. Returning readers can show everything and skip the questions.
- **About and colophon page:** who makes bikinibrains, how AI is and isn't used, and the credits. *Proposed:* a short support and costs page, linked from it, publishes what the site costs.
- **The custom domain**, bikinibrains.com, served from GitHub Pages.

The analytics question (P-4) isn't needed for Phase 0. Its decision issue sits in Phase 3, so that it is answered before launch.

### Exit criteria

- [ ] Home, lesson page, reference mode and about page are live.
- [ ] bikinibrains.com serves the site from GitHub Pages.
- [ ] No account is needed for anything.

## After launch

- **One flagship lesson every one to two months**, with small, time-boxed notes in between. Each flagship lesson is time-boxed at four to eight weeks.
- **No catalogue first.** The register on the [content map](Content-Map) is a list of possibilities, not a backlog we owe anyone.
- **Every lesson goes through the same loop:** a lesson proposal issue, a script against the lesson contract, design in Claude Design where the lesson needs something new, the five-person test, then release.
- **Practice sheets** follow their lessons and come back to learners days later.
- **We maintain what we ship** before we add more. See the [operating model](Operating-Model).

## Following the roadmap in issues

Every task on the roadmap carries exactly one `phase:*` label. Each phase has an epic, a Feature issue labelled `epic`, with its tasks attached as sub-issues. One more epic, *Repository, hosting and tooling*, holds the set-up work, such as the rename and the domain. Each of its tasks carries the label of the phase that needs it. [How we work](How-We-Work) explains the full label set.

These filters show the roadmap as it stands:

- Phase 0, open: https://github.com/KamaljeetSahoo/bikinibrains/issues?q=is%3Aissue+is%3Aopen+label%3Aphase%3A0-foundation
- Phase 1, open: https://github.com/KamaljeetSahoo/bikinibrains/issues?q=is%3Aissue+is%3Aopen+label%3Aphase%3A1-design-system
- Phase 2, open: https://github.com/KamaljeetSahoo/bikinibrains/issues?q=is%3Aissue+is%3Aopen+label%3Aphase%3A2-lesson-bb001
- Phase 3, open: https://github.com/KamaljeetSahoo/bikinibrains/issues?q=is%3Aissue+is%3Aopen+label%3Aphase%3A3-launch
- The epics: https://github.com/KamaljeetSahoo/bikinibrains/issues?q=is%3Aissue+label%3Aepic
- Waiting on the owner: https://github.com/KamaljeetSahoo/bikinibrains/issues?q=is%3Aissue+is%3Aopen+label%3Aneeds-owner
- Open decisions: https://github.com/KamaljeetSahoo/bikinibrains/issues?q=is%3Aissue+is%3Aopen+label%3Adecision

To see what is finished in a phase, change `is%3Aopen` to `is%3Aclosed`.

These links use the repository's name since the rename. Links using the old name, A-star-Algorithm, are redirected by GitHub.

## Changing the roadmap

The roadmap changes through a pull request to `wiki/Roadmap.md`, like every other page. A change to a phase's goal or exit criteria is a decision, so it also gets an entry in the [decision log](Decision-Log).
