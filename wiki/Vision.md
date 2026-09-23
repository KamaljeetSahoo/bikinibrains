> **Status: Proposed.** Written from the owner's brief; it awaits the owner's sign-off as part of Phase 0. Where something is already decided, its number from the [decision log](Decision-Log) is shown in brackets.

## The idea

bikinibrains is a free, open library of short, interactive lessons on how computing and technology work. It is for anyone who is curious. We assume no technical background, and we don't dumb anything down.

Each lesson is one question in plain words, such as "How does a map find the shortest way through a building?" You learn the answer by doing. You predict, click, draw and answer directly on one precise drawing, and the drawing answers back.

When you finish, the lesson doesn't disappear. It stays behind as a clear, illustrated reference that you can come back to whenever you need it.

## Two ways to picture it

**A model kit.** A lesson is like building a model kit. You put it together step by step, with your own hands: that is the lesson. When you have finished, the model stays on the shelf: that is the reference sheet. You understand it because you built it, and you can pick it up and look at it again at any time.

**A chalkboard and a blueprint.** A chalkboard is someone explaining something out loud. It is warm and personal, but the explanation leaves the room when they do. A blueprint is the same explanation drawn so precisely that it goes on explaining itself after they have gone.

We want both at once: the warmth of a person drawing this for you, and the precision of a drawing in which every mark means exactly one thing. That is why our working visual direction is the engineering drawing. It is still Proposed and is being explored in Claude Design (see [visual direction](Visual-Direction)).

## Who it is for

Curious people of any background. That includes students, self-taught developers, designers, product people, people changing careers, and adults who use technology every day and would like to know how it works.

A lesson should make sense to someone who has never written a line of code, and still be worth the time of someone who has.

bikinibrains is not a catalogue sorted by school year, and it is not exam preparation.

## Why free, and why now

A chatbot will now explain almost anything, instantly and for free. Explanations are no longer scarce.

What is still rare is a carefully ordered, precisely drawn, hands-on path that makes you think, and that checks whether you understood. That takes judgement and time to make well.

Once it is made, it is cheap to share. A static web page costs almost nothing for each extra learner, so there is no good reason to charge for it.

The owner believes this kind of learning should be free for everyone. That is decided: bikinibrains is free forever, with no paywall, no advertising, no daily limits and no account needed to learn (D-001). The [operating model](Operating-Model) explains how we keep it that way.

## What we hold ourselves to

Two words: **doing** and **simplicity**.

**Doing.** Every step asks you to think or act before you are told anything. Feedback responds to your specific answer, not to a generic one. Practice comes back later, so the idea stays with you.

**Simplicity.** One idea per step, and the simplest version first. The picture carries the idea, and the captions state facts. The visual system is small and strict, with plenty of calm space, and the writing sounds like a real person.

Simple does not mean short or shallow. It means that each step asks only a little of you at once.

The research behind this is on [learning principles](Learning-Principles). The exact format every lesson follows is the [lesson contract](Lesson-Contract).

## What bikinibrains is not

- **Not a subscription product.** There is no paywall, no daily limit, no advertising and no dark patterns.
- **Not a chatbot or an AI tutor.**
- **Not a video course.**
- **Not a text-only reference** that you only read.
- **Not an open sandbox or visualiser with no lesson inside it.** Every sheet has a sandbox, but you reach it after the lesson, not instead of it.
- **Not something you need an account for.** Your progress can live in your own browser.

## What success looks like

These are the things that would tell us the idea is working. None of them has a date attached; the [roadmap](Roadmap) sets out the phases that lead there.

**In words:**

- BB-001, the A\* lesson, is live on bikinibrains.com as a guided lesson and meets every point of the lesson contract's definition of done.
- People who had never heard of A\* can use the idea on a floor plan they haven't seen before, and we have watched them do it.
- After launch, new lessons arrive at a steady pace the people making them can keep up: roughly one flagship lesson every one to two months, with small notes in between.
- People come back to finished sheets as references, and link to them.
- Running costs stay close to zero, and we publish them.
- People outside the project start to help, with corrections, lesson questions and, if the content licence allows it, translations.

**Signals we can count.** We haven't set targets for any of these, and we won't invent them before we have a baseline. The first lessons are for finding out which signals tell us something useful.

| Signal | What it tells us | Where it comes from |
|---|---|---|
| Lessons that pass the five-person test | Whether a lesson works for people who didn't know the topic | Our own test notes |
| Answers to the three questions asked before and after each test | Whether understanding changed, not only whether people enjoyed it | Our own test notes |
| Lessons completed | Whether people stay to the end | Only with privacy-light analytics (P-4, not decided) |
| Predictions answered, and which wrong answers are common | Where learners get stuck, and which feedback to improve | Only with privacy-light analytics (P-4, not decided) |
| Practice sheets returned to | Whether spaced practice works without accounts | Only with privacy-light analytics (P-4, not decided) |
| Issues and pull requests from outside the project | Whether other people find it worth improving | GitHub |
| Monthly running cost | Whether free stays affordable | The costs we publish |

If the owner decides against analytics, the counted signals come from the tests and from what people tell us, and that is enough to start.

**What would worry us:**

- people finish lessons but can't answer the questions afterwards (feeling fluent is not understanding; see principle 10 in [learning principles](Learning-Principles));
- lessons regularly take much longer to make than their time-box;
- lessons drift back into visualisers: pictures to watch rather than questions to answer.

## What we build on

- **Red Blob Games.** Amit Patel's [Introduction to the A\* algorithm](https://www.redblobgames.com/pathfinding/a-star/introduction.html) is the standard interactive introduction to A\*, and BB-001 builds on it. We credit it on the [content map](Content-Map) and will credit it on the BB-001 sheet. We don't aim to draw A\* more beautifully. BB-001 has to do better on the thinking the learner does: predicting, answering questions on the drawing, and getting feedback on their specific answer.
- **The visualiser in this repository**, whose search code is a starting point for BB-001.
- **Published learning-science research**, cited by author and year on [learning principles](Learning-Principles).

## Open questions

These are the owner's to settle. Each is tracked in the [decision log](Decision-Log).

- **P-1 Default paper.** Should sheets open on whiteprint, on blueprint, or follow the reader's light or dark setting?
- **P-2 Licence for lesson content.** CC BY 4.0 invites translation and reuse; CC BY-NC 4.0 blocks commercial reuse but is likely to attract fewer contributions. The code stays MIT either way.
- **P-3 The first three lessons after BB-001.** The candidates are on the [content map](Content-Map).
- **P-4 Analytics.** None at all, or privacy-light analytics used only to find where learners get stuck.
- **P-5 Repository name.** Exactly the domain, "bikinibrains.com", or "bikinibrains".

Longer-term questions, not yet on the decision log:

- **Accounts.** Progress lives in the browser today. Should an optional account ever exist, for example to carry progress between devices?
- **AI in front of learners.** Not now: AI helps us make lessons and stays out of the lessons themselves. If that ever changes, principle 11 sets the conditions.
- **What comes after the first seven drawings.** The content map lists areas to explore, and none of them is committed.
