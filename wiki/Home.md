# bikinibrains

bikinibrains is a free, open library of short, interactive lessons on how computing and technology work, for anyone who is curious. Each lesson is one question in plain words, such as "How does a map find the shortest way through a building?", and you learn the answer by predicting, clicking, drawing and answering on a single precise drawing that answers back. When you finish, the lesson stays behind as a clear illustrated reference you can come back to.

No prior technical knowledge is assumed, and nothing is dumbed down. There is no paywall, no advertising and no account to create.

## Where we are

**Phase 0: Foundation.** Before we build anything, we are settling the idea, the content and the theme. The phase is time-boxed to about two weeks. It ends when:

- the [vision](Vision), [learning principles](Learning-Principles), [lesson contract](Lesson-Contract), [voice guide](Voice-and-Writing) and [content map](Content-Map) are signed off by the owner;
- the first three lessons after BB-001 are chosen;
- a theme direction is chosen in Claude Design;
- a licence for lesson content is chosen;
- the repository is renamed after the domain, bikinibrains.com (whether the name is exactly the domain is P-5 in the [decision log](Decision-Log)).

What exists today:

- **An A\* visualiser.** The code in this repository draws A\* search on a grid. It is plain JavaScript with no build step and no dependencies, and it comes with tests and a colour-contrast audit. Its search code is a starting point for the first lesson, BB-001.
- **A private prototype of BB-001**, drawn as an engineering sheet. It is available from the owner and is not public yet.

To be honest about the gap: neither is a lesson yet. The prototype plays by itself, asks no questions, gives no feedback and shows √2 and decimals on first sight. The [lesson contract](Lesson-Contract) describes what it has to become, and the [roadmap](Roadmap) says when.

## Start here

Read the pages in this order. The first three explain the idea; the rest explain how we make it and run it.

1. [Vision](Vision): what we are making, who it is for, and why it is free.
2. [Learning principles](Learning-Principles): the research every lesson is built on.
3. [Lesson contract](Lesson-Contract): the format every lesson follows, with BB-001 worked through step by step.
4. [Content map](Content-Map): the register of planned lessons, BB-001 onwards, and how we choose them.
5. [Voice and writing](Voice-and-Writing): how we write titles, narration, captions and feedback.
6. [Visual direction](Visual-Direction): the engineering-drawing look we are exploring.
7. [Design system](Design-System): the tokens and components Phase 1 will produce.
8. [Roadmap](Roadmap): the phases, and what has to be true to finish each one.
9. [Decision log](Decision-Log): what has been decided, and what is still the owner's call.
10. [Operating model](Operating-Model): how the project stays free without wearing anyone out.
11. [How we work](How-We-Work): the wiki, issues, labels and the design loop.

## Get involved

- **Report a problem or suggest an improvement** by opening an issue in the repository's [Issues tab](https://github.com/KamaljeetSahoo/A-star-Algorithm/issues).
- **Suggest a lesson.** The best ideas are questions many people actually ask, about something that can be drawn and acted on, with one clear "aha" inside 15 minutes. The [content map](Content-Map) explains how to propose one.
- **Improve a wiki page** with a pull request. Every page here is a Markdown file in the repository's `wiki/` folder, and a GitHub Action publishes that folder to this wiki whenever a change is merged into `master`. Please edit the file rather than the page in the wiki's web editor, because changes made there can be lost at the next publish.
- **Argue with a draft.** If a Proposed page gets something wrong, open an issue that names the page and says why. Drafts get better that way.

[How we work](How-We-Work) explains how issues are labelled and how work moves from idea to done.

## Licence

The code is MIT-licensed. The licence for lesson content has not been chosen yet: it will be either CC BY 4.0 or CC BY-NC 4.0 (P-2 in the [decision log](Decision-Log)).

> Pages marked **Proposed** are drafts awaiting the owner's sign-off. Until then, read them as a direction, not a decision.
