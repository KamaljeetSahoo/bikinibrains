This page records the choices that shape bikinibrains: what was decided, why, and what follows from it. It is written so that someone joining later can see why things are the way they are, and so that the owner can see at a glance what is still open.

- **D-** numbers are decisions. Each one has a status, a date, the context, the decision and its consequences.
- **P-** numbers are pending. Each one sets out the options and their trade-offs. They are the owner's call, and nothing on this page decides them.

## Index

| No. | Decision | Status |
|---|---|---|
| D-001 | Free forever | Accepted |
| D-002 | Static site on GitHub Pages, at bikinibrains.com | Accepted |
| D-003 | Planning in the open: wiki for docs, issues for work (see D-007) | Accepted |
| D-004 | Private references are never named in public | Accepted |
| D-005 | Working visual direction: the engineering drawing | Proposed |
| D-006 | Repository name: bikinibrains (was P-5) | Accepted |
| D-007 | The repository is private for now | Accepted |
| P-1 | Default paper | Owner's call |
| P-2 | Licence for lesson content | Owner's call |
| P-3 | First three lessons after BB-001 | Owner's call |
| P-4 | Analytics | Owner's call |
| P-6 | Making the repository public again | Owner's call |

**Statuses.** *Proposed* means it is our working assumption, but not yet confirmed. *Accepted* means it is in force. *Superseded* means a later decision replaced it, and the entry names which one. We never delete or rewrite an accepted decision. If we change our minds, a new entry supersedes it, so the history stays readable.

## Decisions

### D-001 Free forever

- **Status:** Accepted
- **Date:** 2026-09-23

**Context.** A chatbot will now explain almost anything for free, so explanations are no longer scarce. What is still rare is a carefully ordered, precisely drawn, hands-on path that makes you think and checks that you understood. Once a lesson like that exists as a static web page, each extra learner costs almost nothing. The owner believes this kind of learning should be free for everyone.

**Decision.** bikinibrains is free forever. There is no paywall, no advertising, no daily limit, and no account needed to learn.

**Consequences.**

- Running costs have to stay close to zero, which leads to static hosting (D-002).
- With no accounts, progress lives in the learner's browser. It doesn't follow them between devices, and clearing the browser clears it.
- We ask for support once, when someone finishes a lesson, and never before they start.
- We publish what the site costs.
- There is no revenue to buy time with, so time is what we protect. Every piece of work is time-boxed. See the [operating model](Operating-Model).
- Nothing in the design may pressure people to come back or to pay: no streaks to protect, no countdowns, no dark patterns.

### D-002 Static site on GitHub Pages, at bikinibrains.com

- **Status:** Accepted
- **Date:** 2026-09-23

**Context.** Free forever (D-001) needs hosting that costs close to nothing and needs little looking after. The existing A\* visualiser is already plain files, with no build step and no dependencies, and is already served by GitHub Pages. The project's domain is bikinibrains.com. The repository is still named after the visualiser, A-star-Algorithm.

**Decision.** bikinibrains is a static site on GitHub Pages, served at the custom domain bikinibrains.com. The repository is renamed after the domain. Only the owner can do the rename, in the repository's settings. The exact new name is P-5.

**Consequences.**

- There is no server. Anything that would need one, such as accounts, server-side analytics or comments, is either out of scope or would depend on an outside service, and would need its own decision.
- Lessons must work as plain files served as they are.
- Because the site is only static files, it could move to another static host without being rewritten.
- After the rename, GitHub redirects the old repository addresses, but not the old GitHub Pages address. Links that spell out the old name, in the wiki, the issue forms, the pull request template, the README, `package.json` and `index.html`, should be updated. The [roadmap](Roadmap) lists the steps.

### D-003 Planning in the open: wiki for docs, issues for work

- **Status:** Accepted
- **Date:** 2026-09-23
- **See also:** D-007. The repository is private for now, so the wiki and the issues are open only to the owner and collaborators, and this entry's last consequence is on hold until it opens again. Everything else here still holds.

**Context.** The repository is public. The plan needs one place that newcomers can read and the owner can decide from, and the work needs to be visible and trackable. Documents that are edited without review drift, and nobody can see why they changed.

**Decision.** The GitHub wiki holds the living documents. Its pages are written in the repository's `wiki/` folder, changed through pull requests, and published to the wiki by a workflow whenever a change is merged into `master`. GitHub issues hold the work.

**Consequences.**

- Document changes are reviewed like code, and their history lives in the repository.
- Edits made in the wiki's own web editor are overwritten at the next publish, so nobody should edit there.
- GitHub only creates a wiki's storage when its first page is saved, so the owner has to create one page by hand, once, before the workflow can publish.
- Issues use three types (Feature, Task and Bug) and a small, fixed set of labels. The labels are kept in `.github/labels.json` and synced by a workflow. [How we work](How-We-Work) has the details.
- Everything we plan is public, which is why D-004 exists.

### D-004 Private references are never named in public

- **Status:** Accepted
- **Date:** 2026-09-23
- **See also:** D-007. The rule applies in full while the repository is private, because its history, the wiki's history and every issue become public if it opens again.

**Context.** While shaping the idea, the owner looked privately at other products for inspiration. The repository, the wiki and the issues are public. Naming those products here would invite comparisons we don't want, could suggest a connection or endorsement that doesn't exist, and would pull our pages towards describing someone else's work instead of our own.

**Decision.** Commercial products used as private inspiration are never named, linked or recognisably described in the repository, the wiki or the issues. Private references stay in the private brief used with Claude Design, which is never committed. Public pages describe our principles in our own words.

Two things are not affected by this rule. Published learning-science research is cited by author and year. Prior art that we build on directly is credited by name: Amit Patel's Red Blob Games pages on A\* are the first example.

**Consequences.**

- The pull request template includes a check for this, and reviewers look for it.
- Git history and wiki history keep old text even after it has been edited out, so it matters more to catch a slip before it is merged than to clean up after it.
- New contributors need to know about the rule. [How we work](How-We-Work) says it, and so does the pull request checklist.

### D-005 Working visual direction: the engineering drawing

- **Status:** Proposed. It stays proposed until the owner confirms it in Claude Design.
- **Date:** 2026-09-23

**Context.** An earlier private style lab compared nine visual styles, and the blueprint was chosen over the others as the working direction. A private prototype of BB-001 draws A\* as an engineering sheet on two papers, blueprint and whiteprint. Its drafting line grammar carries meaning through line type rather than colour, so it still reads in greyscale and for colour-blind readers. The direction keeps the warmth of someone drawing this for you and adds a precision in which every mark means exactly one thing.

**Decision (proposed).** The working visual direction is the engineering drawing: blueprint and whiteprint papers, with the drafting line grammar. Colour does one job, the redline, which means "look here now".

**Consequences.**

- Phase 1 builds the design system on this direction, once it is confirmed.
- A new meaning on the drawing gets a new line type, never a new colour.
- The risk is that it turns into a costume. The rule that the paper is never louder than the drawing guards against that.
- Some things are still open: which paper readers see first (P-1), how much texture to use, the typefaces, and how subjects that aren't grids are illustrated. See [visual direction](Visual-Direction).
- The direction is confirmed or changed in Claude Design, ideally after trying it on a mock of BB-001's first three steps.


### D-006 Repository name: bikinibrains

- **Status:** Accepted
- **Date:** 2026-09-23
- **Issue:** #39 (was P-5)

**Context.** D-002 decided to rename the repository after the domain, and P-5 asked whether the name should be exactly "bikinibrains.com" or "bikinibrains".

**Decision.** The repository is `KamaljeetSahoo/bikinibrains`. The owner renamed it on 2026-09-23.

**Consequences.**

- GitHub redirects the old repository, issue, wiki and Git addresses from `A-star-Algorithm`, so older links keep working. Nobody should create a new repository called `A-star-Algorithm` under this account, because that would break the redirects.
- The GitHub Pages address moved to kamaljeetsahoo.github.io/bikinibrains/. The old Pages address is not redirected. Readers will see bikinibrains.com once the custom domain is set.
- Links that spelled out the old name in the repository and the wiki were updated in the same change.

### D-007 The repository is private for now

- **Status:** Accepted
- **Date:** 2026-09-24
- **Issue:** #ISSUE_PRIVATE

**Context.** Since D-003 the repository, the wiki and the issues have been public. On 2026-09-24 the owner decided to make the repository private for now. When it becomes public again is still open (P-6).

**Decision.** The repository, and with it the wiki and the issues, is private for now. Only the owner and the collaborators they invite can see it. The site on GitHub Pages stays public and publishes only the demo.

**Consequences.**

- The way we work doesn't change. The wiki holds the living documents, issues hold the work, and every change goes through a pull request (D-003). Only the audience is smaller.
- Nobody outside the project can read the wiki, open an issue or send a pull request. Links to the repository, the wiki or the issues, old `A-star-Algorithm` links included, show "page not found" to anyone who isn't a collaborator.
- A GitHub Pages site stays public even when its repository is private, and Pages builds the whole of `master`. So `_config.yml` lists what the site publishes: `index.html`, the stylesheet, the scripts in `src/` and the licence. Anything not listed, including `wiki/`, stays off the site. The demo's links to the repository are removed until it opens again.
- Pages and the wiki work in a private repository only because the owner's account is on GitHub Pro. If the account moved to GitHub Free while the repository was private, GitHub would unpublish the site. Actions runs now count against the 3,000 minutes a month that Pro includes.
- GitHub's secret scanning and push protection only cover public repositories, so nothing stops a password or token committed by mistake. Keep secrets out of commits.
- D-004 applies in full. If the repository opens again, its whole history opens with it: every commit, the wiki's history, and every issue and comment.
- Changing visibility erases a repository's stars and watchers. There are none to lose, but the owner should check afterwards that they are still watching it.

## Pending: the owner's call

None of these is decided. Each lists the options and what they cost, so the choice can be made quickly. When one is decided, it moves to the decisions above (see [recording a decision](#recording-a-decision)).

Other choices will come up as the work goes on, such as how the site is structured (plain static files or a static-site generator) in Phase 1. They start as Decision issues and are added here when they are made.

### P-1 Default paper

**The question.** When a reader opens a sheet, which paper do they see?

| Option | For | Against |
|---|---|---|
| Whiteprint | Calm; prints well; closest to "simple". Line contrast 8.5:1, redline 4.6:1. | Less distinctive at first sight. |
| Blueprint | Distinctive and memorable: the hook. Line contrast 7.8:1, redline 4.8:1. | A dark page can be tiring for long reading in daylight, and uses a lot of ink if printed. |
| Follow the reader's light or dark setting | Respects the reader's own choice, and both papers get used. | The first impression differs from device to device. |

**Either way:** both papers are built and tested in Phase 1. This only decides which one a reader sees first.

**When:** explored in Claude Design, most naturally while the theme direction is chosen in Phase 0. It is not a Phase 0 exit criterion by itself.

**Owner's call.**

### P-2 Licence for lesson content

**The question.** Under what terms can others reuse lesson text and drawings? The code stays MIT whichever is chosen.

| Option | For | Against |
|---|---|---|
| CC BY 4.0 | Anyone can translate, adapt and reuse the lessons, as long as they credit us. It invites volunteer translations and is simple to understand. | Others may reuse the lessons commercially, for example inside a paid course, as long as they credit us. |
| CC BY-NC 4.0 | Blocks commercial reuse. | Likely to attract fewer contributions. Projects that only accept freely reusable content, such as Wikipedia, can't include it. Where "non-commercial" ends is often unclear, for example for a school or a paid workshop. |

**Worth knowing.** Creative Commons licences can't be withdrawn from copies that have already been shared. Moving from BY-NC to BY later needs the agreement of everyone who has contributed content. Moving from BY to BY-NC only affects new versions: what was already shared under BY stays under BY.

**Either way:** we need a clear line between code (MIT) and content, so that it's obvious which licence covers which file.

**When:** a Phase 0 exit criterion.

**Owner's call.**

### P-3 First three lessons after BB-001

**The question.** Which three drawings from the [content map](Content-Map) come after BB-001?

**The candidates** are BB-002 to BB-007: binary search, sorting, hash tables, key exchange, Git branches and neural networks.

**How to judge them.** Use the five criteria on the content map:

1. It is a question many people actually ask.
2. The mechanism can be drawn and acted on, not just described.
3. There is a clear "aha" within 15 minutes.
4. It builds towards later lessons.
5. We can make it correct, because an expert can review it.

**The main trade-off.** Lessons whose drawings are close to what BB-001 already needs will reuse more of the design system, so they are likely to be quicker to make. A lesson drawn in a very different convention, such as BB-005's sequence drawing, costs more, but it tests early whether the visual family stretches beyond grids (question 5 on [visual direction](Visual-Direction)).

**When:** a Phase 0 exit criterion.

**Owner's call.**

### P-4 Analytics

**The question.** Do we measure anything about how people use the lessons?

| Option | For | Against |
|---|---|---|
| None | Simplest. Nothing to run, explain or secure, and the strongest privacy promise. | We only learn where people get stuck from our five-person tests and from what people tell us. |
| Privacy-light, used only to find where learners get stuck | Shows which steps people leave and which wrong answers are common, across many more people than we can test. | Something to set up, explain in a privacy note and maintain. It should collect nothing personal, and may depend on an outside service. |

**When:** not needed for Phase 0. Its decision issue sits in Phase 3, so that it is answered before launch.

**Owner's call.**

### P-6 Making the repository public again

**The question.** The repository is private for now (D-007). When does it become public again?

| Option | For | Against |
|---|---|---|
| Before launch | People outside the project can follow the plan, report problems and propose lessons before the site opens. | The plan is public while it is still changing. |
| At launch | The site, its source and the plan open on the same day, so the about page can link to the source. | Until then, only collaborators can report a problem or help. |
| After launch | The plan stays private for longer. | Readers of the live site can't open an issue or see the source, so the support page needs another way to report a bug. The case for contributions in P-2 waits too. |

**Either way:** before it opens, check the whole Git history, the wiki's history and every issue for anything D-004 rules out, because all of it becomes public at once. Then put back the demo's links to the repository, restore the parts of these pages that are on hold while it is private, and check that the wiki still restricts editing to collaborators.

**When:** before launch, because the about page, the support page and how readers report a bug depend on the answer.

**Owner's call.**

## Recording a decision

1. **Open a Decision issue** with the issue form. It is titled "Decide: …" and labelled `decision` and `needs-owner`. Write down the options and their trade-offs.
2. **The owner decides** in the issue, and the outcome is written into it.
3. **Record it here** in a pull request to `wiki/Decision-Log.md`. A pending item becomes a decision with the next free D- number and says which P- number it was. Numbers are never reused.
4. **Update the pages it affects** in the same pull request, including any "Proposed" banners.
5. **Close the issue** and link it from the entry.

To change an accepted decision, add a new entry that supersedes it. Then set the old entry's status to "Superseded by D-0NN" and leave the rest of it as it was.

### Template for a new decision

```markdown
### D-0NN Short title

- **Status:** Proposed | Accepted | Superseded by D-0NN
- **Date:** YYYY-MM-DD
- **Issue:** #NN (was P-N, if it started as pending)

**Context.** What is true now, and why a decision is needed.

**Decision.** What we will do, in one or two plain sentences.

**Consequences.** What follows from it, including the costs and what it rules out.
```

### Template for a pending item

```markdown
### P-N Short title

**The question.** One sentence.

| Option | For | Against |
|---|---|---|
| … | … | … |

**When:** which phase needs the answer.

**Owner's call.**
```
