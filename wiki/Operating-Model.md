> **Status.** Free forever (D-001) and static hosting (D-002) are decided. The licence for lesson content (P-2) and analytics (P-4) are still the owner's call. Anything marked *Proposed* on this page is a suggestion awaiting sign-off. All of these are tracked in the [decision log](Decision-Log).

This page explains how bikinibrains stays free without wearing out the people who make it. Free projects are usually ended by scope creep and burnout, not by a bad idea: the work grows faster than the time available, or nobody can keep up with maintenance. This page is how we try to avoid that.

## The short version

- **Free forever.** No paywall, no advertising, no daily limit, and no account needed to learn (D-001).
- **Near-zero fixed costs.** A static site on GitHub Pages. The domain is the main cost (D-002).
- **No accounts.** Progress lives in your own browser.
- **One request for support**, made when you finish a lesson and never before you start.
- **Costs in the open.** We publish what the site costs.
- **AI helps us make lessons, and stays out of them.** People write the voice and review everything.
- **Every piece of work has a time-box.**
- **We maintain what we ship.** Lessons work without a build chain, and the core content still reads if JavaScript fails.

## What free means

Free means the whole lesson, for everyone, every time. That rules out a free first half with the rest locked, a limit on lessons per day, or a "free" tier that nags. It also rules out advertising, and the tracking that usually comes with it.

It also rules out design that works against the learner: streaks to protect, countdowns, guilt-driven reminders or anything else that tries to make people come back or pay. Progress is shown as evidence of what you have learned.

Free doesn't mean unfinished. Every lesson meets the same [lesson contract](Lesson-Contract) and the same accessibility bar.

## What it costs

- **Hosting.** GitHub Pages serves the site from the repository at no charge.
- **Automation.** The tests, the contrast audit, the label sync and the wiki publishing run on GitHub Actions, which has no charge for public repositories on GitHub's standard runners.
- **Wiki and issues.** Both are included with a public repository.
- **The domain.** bikinibrains.com is renewed every year. It is the main running cost.
- **Typefaces.** The faces used in the prototype are free, openly licensed fonts. The [design system](Design-System) proposes hosting them on the site itself, so lessons don't depend on an outside service.
- **Time.** The real cost is the time of the people making lessons. The rest of this page is mostly about protecting it.

None of this needs a paid GitHub plan.

Some costs would only appear through a later decision. Examples are an analytics service (P-4) or an outside service for anything a static site can't do by itself. Each would be weighed against staying close to zero, and published if we take it on.

## Publishing what it costs

We publish what bikinibrains costs to run: what we pay for, and how much. It keeps us honest about "free", and it shows supporters exactly what their help pays for.

*Proposed:* the figures go on a short support and costs page, linked from the about and colophon page, when the site launches in Phase 3. The page says when it was last updated. There is nothing to publish yet beyond the domain.

## No accounts, local progress

You never need an account to learn. Where a lesson remembers something, such as which steps you've finished or which practice sheet is due, it keeps that in your own browser.

What that means for learners:

- There is no password, no email address and no personal data held by us, so there is nothing of yours for us to lose.
- Your progress stays on the device and browser where you made it. Clearing your browser's data clears it.
- A finished lesson is also a reference sheet at a permanent address. Returning readers can show everything and skip the questions, so losing progress never locks you out of anything.

Whether an optional account should ever exist, for example to carry progress between devices, is an open question. It is not on the roadmap.

## Asking for support

We ask once, at the moment someone finishes a lesson. That is when they know what they got, and whether it was worth something to them.

We never ask before a lesson starts or in the middle of one, and never with a pop-up in the way. Saying no, or ignoring the request, changes nothing about what anyone can use.

What exactly we ask for, and how people can give it, is not settled yet.

## Licence

The code is MIT-licensed, and it stays that way.

The licence for lesson content is pending (P-2). The choice is between:

- **CC BY 4.0**, which lets anyone translate, adapt and reuse the lessons with credit, including commercially; or
- **CC BY-NC 4.0**, which blocks commercial reuse, but is likely to attract fewer contributions.

An open content licence invites volunteer translations, and translations let a free project reach people it otherwise couldn't. The trade-offs are set out in full in the [decision log](Decision-Log#p-2-licence-for-lesson-content).

## How we use AI

We use AI in production, never in front of learners.

- **Where it helps:** drafting problem variations and code.
- **What stays human:** the voice, the judgement and the final review. A person writes every question title, line of narration, caption and piece of feedback, and a person reviews everything before it ships.
- **What learners never meet:** a chatbot or an AI tutor. If that ever changes, the AI must work on the drawing and never hand out answers. Principle 11 on [learning principles](Learning-Principles) explains why.

Readers will ask whether lessons are written by AI. The answer goes on the about page in plain words. [Voice and writing](Voice-and-Writing) has the proposed wording.

## Time-boxing

Every piece of work gets a time-box before it starts:

| Work | Time-box |
|---|---|
| Phase 0, the foundation | About two weeks |
| A prototype | About a week |
| A flagship lesson | Four to eight weeks |
| A note between flagship lessons | Small, and set when the note is planned |

When a time-box runs out, we stop and look at what exists. Then we decide on purpose: ship something smaller, cut the rest, or give it more time. If we give it more time, we write the new limit and the reason in the issue. The failure we are guarding against is the lesson that stays "nearly done" for months.

After launch, the pace is one flagship lesson every one to two months, with small notes in between. We don't build a catalogue first. The register on the [content map](Content-Map) is a list of possibilities, not a backlog we owe anyone.

## Maintaining what we ship

A lesson is only free for as long as it works. These rules keep it working:

- **No build chain.** A lesson runs from the files as they are committed. There is no compile step, bundler or package install between the repository and the reader. The A\* visualiser already works this way, with no build step and no dependencies.
- **The core content survives without JavaScript.** If the script fails to load, the question, the captions, the notes and a still drawing must still be there to read. Interaction is added on top of content that already reads.
- **Permanent addresses.** Each sheet lives at one permanent address. If one ever has to move, we leave a page at the old address that points to the new one.
- **Checks on every change.** Tests and the contrast audit run on every pull request. Accessibility checks join them with the first lesson.
- *Proposed:* **fixes before features.** A bug that teaches the wrong thing, or an accessibility failure, comes before new work.

## What ends free projects, and what we do about it

| Risk | What it looks like | What we do |
|---|---|---|
| Burnout | The people making it run out of time or energy, and the project goes quiet. | Time-boxes on everything. A pace we can keep, of one flagship lesson every one to two months. No public dates we can't keep. The register is a menu, not a debt. |
| Scope creep | Each lesson grows, the site sprouts features, and nothing ships. | One question per lesson. The proposed lesson contract keeps a lesson to 6 to 10 steps and 10 to 15 minutes. Phases have exit criteria. New ideas go into issues, not into the current piece of work. The [vision](Vision) lists what we are not building. |
| Funding | The project depends on money it doesn't have. | Fixed costs close to zero by design, so bikinibrains keeps running without donations. Costs are published. We ask once, at the end of a lesson. |
| Bit-rot | Lessons stop working as browsers, tools and dependencies change around them. | No build chain and no dependencies. Plain files that could move to any static host. Core content that reads without JavaScript. Automated checks on every change. |

If a risk starts to show, for example if lessons keep running past their time-box, the fix is to adjust the plan in the open: an issue, and an entry in the [decision log](Decision-Log) if it changes a decision. Quietly working harder is not the fix.
