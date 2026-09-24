This page is the practical guide: how to change these pages, how work is tracked in issues, how design moves from Claude Design into the repository, what a lesson pull request is checked against, and how branches and commits work.

In one line: **the wiki holds the living documents, issues hold the work, pull requests make every change, and the owner makes the calls.** That arrangement is decision D-003 in the [decision log](Decision-Log).

## Editing the wiki

Every page in this wiki is a Markdown file in the repository's `wiki/` folder. Nobody edits the wiki directly.

**The flow:**

1. Make a branch and edit the file in `wiki/`. For example, the page you are reading is `wiki/How-We-Work.md`.
2. Open a pull request to `master`. Someone reads it, and it is changed until it is right.
3. Merge it. The **Publish wiki** workflow (`.github/workflows/wiki.yml`) copies the `wiki/` folder to the wiki. You can also run it by hand from the repository's Actions tab.

**Please don't use the wiki's own web editor.** The workflow makes the wiki match the `wiki/` folder exactly. Any edit made in the web editor is overwritten at the next publish, and any page that isn't in the folder is removed.

**File names become page names.** GitHub turns hyphens into spaces, so `Lesson-Contract.md` becomes the page "Lesson Contract". Link between pages with the file name and no `.md` suffix, for example `[Lesson contract](Lesson-Contract)`. Two files are special: `_Sidebar.md` is the navigation on every page, and `_Footer.md` is the line at the bottom.

**One-time set-up (done).** GitHub only creates a wiki's storage when its first page is saved, so the workflow fails until one exists. On 23 September 2026 the owner saved a first page, and the first publish replaced it. On 24 September 2026 the owner ticked "Restrict editing to collaborators only" under **Settings → General → Features → Wikis** (#38). It matters most once the repository is public again, because it stops people outside the project editing the wiki directly, so their changes come through pull requests.

**Status banners.** A page that is still a draft opens with a status note, such as "Proposed" or "Draft v0". When the owner signs a page off, the banner changes in a pull request, and any decision it contains goes into the decision log in the same pull request.

**How to write.** Plain, direct and warm. Sentence case for headings, British spelling, and no emoji. Use a table only when it compares things. [Voice and writing](Voice-and-Writing) has the full guide.

**What we never name.** The repository, the wiki and the issues are private for now (D-007), but write as if they were public. If the repository becomes public again, every commit, the wiki's history and every issue and comment become public with it. Commercial products used as private inspiration are never named, linked or recognisably described in any of them (D-004). Describe our principles in our own words. Research is cited by author and year, and prior art we build on is credited by name, such as Red Blob Games for A\*.

## Issues

Issues hold the work. Each issue has **labels** that place it on the roadmap, and is one of three **kinds of work**.

### Kinds of work

GitHub calls these issue types, but it records them only on repositories that belong to an organisation. This one belongs to a personal account, so setting one has no effect here. The three kinds below still describe the work, and the list of issue forms further down gives each form's kind in brackets.

- **Feature:** a larger body of work, such as a phase epic, the set-up epic or a new lesson. Its tasks are attached as sub-issues.
- **Task:** a single piece of work that one person can finish.
- **Bug:** something that doesn't work, or that teaches the wrong thing.

### Labels

The labels are defined in `.github/labels.json`. The **Sync labels** workflow creates or updates them whenever that file changes on `master`, and it can also be run by hand. To add or change a label, edit the file in a pull request. The workflow leaves alone any label that isn't in the file, so removing a label from the file doesn't delete it from GitHub.

**Phase.** Every task on the roadmap has exactly one.

- `phase:0-foundation`: the idea, the content and the theme, settled before building.
- `phase:1-design-system`: design system v0, meaning tokens, line primitives and components.
- `phase:2-lesson-bb001`: BB-001, A\* as a guided lesson.
- `phase:3-launch`: the site skeleton, the custom domain and launch.

**Area.** One or more, for whichever parts of the project the issue touches.

- `area:vision`: what bikinibrains is, and who it is for.
- `area:content`: lessons, questions, captions and the content map.
- `area:learning`: how a lesson teaches, meaning the principles, the lesson contract and testing.
- `area:design`: the visual direction, the design system and screens.
- `area:engineering`: code for lessons, the drawing engine and the site.
- `area:infra`: the repository, hosting, the domain and automation.
- `area:ops`: running it for free, meaning costs, licence, support and process.

**Flags.** Add these as they apply.

- `epic`: a phase-sized body of work. Its tasks are sub-issues.
- `decision`: a choice to make, with the options and trade-offs written down.
- `needs-owner`: waiting on the owner's call or sign-off. Remove it once the owner has answered.

### Issue forms

A new issue starts from one of four forms. You can also open a blank issue.

- **Lesson proposal** (Feature, `area:content`): a question for a new lesson sheet, with the mechanism, the "aha" and the predictable wrong answers. Read the [content map](Content-Map) first.
- **Design task** (Task, `area:design`): a screen, component or visual question to work through in Claude Design.
- **Decision** (Task, `decision` and `needs-owner`): a choice to be made and recorded in the decision log.
- **Bug** (Bug): something broken, something that teaches the wrong thing, an accessibility problem, or a layout that fails on a screen size.

The form sets the first labels. Add the phase label, and any other area labels, when the issue is triaged.

### Working an issue

- Link the pull request that finishes an issue by writing "Closes #12" in its description. The issue then closes when the pull request is merged.
- Keep issues current as the work lands, not afterwards. Tick each "Done when" item as it is met, leave one comment that says what changed (with the commit) and what is left, and close the issue once every item is ticked.
- Keep the wiki current in the same way. A change that makes a page out of date updates that page in the same commit or pull request, including status banners, roadmap exit criteria and the open questions on [Vision](Vision).
- A decision is recorded in three places at once: a comment on its issue, which then closes; an entry in the [decision log](Decision-Log); and any page that listed it as open.
- When an issue is waiting on the owner, add `needs-owner` and say exactly what is needed: a yes or no, a choice between named options, or a sign-off.
- When an issue is closed without being done, say why.
- The [roadmap](Roadmap) has saved filters for each phase, the epics, open decisions and everything waiting on the owner.

## The design loop with Claude Design

The visual side of bikinibrains is designed in Claude Design, then brought into the repository as plain files.

1. **Brief.** A Design task issue says what needs designing, and the one thing it must get right, using real lesson content. The owner also keeps a private brief for Claude Design. It isn't committed, because it contains private references (D-004).
2. **Claude Design.** The design system and screens are explored there, normally on both papers, blueprint and whiteprint, at phone width and at desktop width.
3. **The owner picks.** The choice is recorded in the issue, with screenshots, so that people without access to Claude Design can see what was decided and why. If it settles an open question such as P-1 or D-005, it also goes in the [decision log](Decision-Log).
4. **Export to the repository.** Tokens and components come into the repository as plain files that need no build step. *Proposed:* a `tokens.json` file and CSS custom properties that carry the same values. The [design system](Design-System) page describes the format.
5. **Implement.** The components are built into the lesson or the site.
6. **Review against the lesson contract.** Whatever was designed has to support the [lesson contract](Lesson-Contract), and pass the checks below.

Two rules keep the loop honest:

- **Design with a real lesson in front of you.** Use real narration, questions, feedback and numbers, never placeholder text. The first test for the whole system is a mock of BB-001's first three steps.
- **Colour never carries meaning by itself.** A new meaning gets a new line type. The only use of colour for meaning is the redline, "look here now". See [visual direction](Visual-Direction).

## Reviewing a lesson pull request

Every lesson pull request runs the automated checks: the tests, the contrast audit and accessibility checks. They must pass before it is merged. CI runs the tests and the contrast audit today, on Node 20 and 22, and the accessibility checks arrive with BB-001.

A reviewer then checks the lesson against this list, most of which comes from the [lesson contract](Lesson-Contract). The contract is still v0 and awaits the owner's sign-off, so this list will change with it.

**The shape**

- [ ] The title is one question in the learner's own words, and the technical name is the subtitle.
- [ ] It takes 10 to 15 minutes and has 6 to 10 steps.
- [ ] It opens with a challenge before introducing any terms.
- [ ] Each step has one sentence of narration, one new layer on the same drawing, one question answered by acting on the drawing, feedback, and a one-sentence caption.
- [ ] The feedback names the specific misconception behind each of the three most predictable wrong answers.
- [ ] The first numbers can be worked out in your head. Complications such as diagonals, √2 and decimals arrive later, in a "what changes?" step.
- [ ] Motion appears only where the idea is change or cause and effect. Nothing plays by itself, and nothing is revealed before the learner has committed to an answer.
- [ ] Only one control is visible at a time, and nothing appears until it is needed.
- [ ] Afterwards the sheet works as a reference: every layer, note and caption, a free sandbox, and a way to show everything and skip the questions.

**Accessibility**

- [ ] Every step can be done with a keyboard alone and with a screen reader.
- [ ] Meaning is never carried by colour alone. Every state still reads in a greyscale screenshot.
- [ ] Reduced motion is respected.
- [ ] It works at 320px wide, with no sideways scrolling, and touch targets are at least 44 by 44 pixels.
- [ ] Text can be enlarged to 200% without anything being lost.

**Words**

- [ ] The copy passes the "before copy ships" list in [voice and writing](Voice-and-Writing), including a read by someone other than the author.

**Design and build**

- [ ] It is drawn to the [design system](Design-System), on both papers.
- [ ] It runs from the committed files, with no build step.
- [ ] The question, captions, notes and a still drawing still read if JavaScript fails.

**Testing**

- [ ] Five people who didn't know the topic have done the lesson, thinking aloud, and answered the same three questions before and after it.
- [ ] Fixes have been made wherever people had to guess.

**Credit and what we never name**

- [ ] Prior art we built on is credited on the sheet.
- [ ] Nothing names, links or recognisably describes the products we keep as private references.
- [ ] Any page in `wiki/` that the change affects is updated in the same pull request.

A correctness review by someone who knows the subject well is a suggested addition to the definition of done. It is not agreed yet.

For pull requests that aren't lessons, the pull request template's shorter checklist applies.

## Branches and commits

- **`master` is the main branch.** It should always be in a state we would be happy to publish.
- **Short-lived branches.** Make one branch per change and keep it small enough to review in one sitting. Merge it, or close it, within days rather than weeks. Naming it after what it does helps, for example `wiki/licence-decision` or `lesson/bb-001-step-3`.
- **Everything goes through a pull request to `master`,** including changes to the wiki. Fill in the pull request template's checklist.
- **CI must pass** before merging.
- **Commit messages** start with a short line in the imperative that says what the commit does, such as "Add feedback for the diagonal misconception". Then a blank line, then a few sentences on why. Look at the repository's history for examples.
- **Keep commits focused.** Don't mix a design-system change with lesson copy, for example.

*Proposed:* a branch protection rule on `master` that requires CI to pass before merging, so the rule is enforced rather than remembered. While the repository is private, this relies on the owner's GitHub Pro plan.

## Where things live

- `wiki/`: the source of every wiki page.
- `_config.yml`: what GitHub Pages publishes. Only the demo is listed. A test (`tests/pages.test.js`) fails if a new top-level file would slip onto the site, or if the demo loads a file the site would leave off.
- `.github/labels.json`: the label set.
- `.github/ISSUE_TEMPLATE/`: the issue forms.
- `.github/pull_request_template.md`: the pull request checklist.
- `.github/workflows/ci.yml`: tests and the contrast audit, on every push to `master` and every pull request.
- `.github/workflows/wiki.yml`: publishes `wiki/` to the wiki.
- `.github/workflows/labels.yml`: syncs the labels.
- `src/`, `tests/` and `tools/`: the A\* engine and interface, its tests, and the contrast audit.
