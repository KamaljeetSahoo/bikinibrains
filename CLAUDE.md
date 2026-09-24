# Working on bikinibrains

bikinibrains is a free, open library of short, interactive lessons on how technology works. The GitHub wiki holds the living documents, and GitHub issues hold the work. The repository is private for now (D-007 in `wiki/Decision-Log.md`), so only the owner and collaborators can see them.

## Keep the wiki and issues current

This is part of every change, not a follow-up.

- **Wiki.** The wiki is published from `wiki/` by the *Publish wiki* workflow whenever `master` changes, and it mirrors that folder exactly. Edit the files, never the wiki's web editor. A change that makes a page out of date updates that page in the same commit, including status banners, roadmap exit criteria and open questions.
- **Issues.** Tick each "Done when" item as it is met. Leave one comment saying what changed (with the commit) and what is left. Close the issue once every item is ticked. If only an owner step is left, add `needs-owner` and name the step.
- **Decisions.** Comment on the decision issue and close it, add a D-nnn entry to `wiki/Decision-Log.md`, and update every page that listed the question as open.
- **Labels** are defined in `.github/labels.json`; the *Sync labels* workflow applies them.

The full rules are in `wiki/How-We-Work.md`.

## Write as if the repository were public

It is private for now, but if it opens again every commit, the wiki's history and every issue open with it.

- Never name, link or recognisably describe the commercial products we use as private design references. That applies to code, commits, the wiki and issues. Those references live only in the owner's private design pack.
- Write the way `wiki/Voice-and-Writing.md` describes: plain and warm, British spelling, sentence-case headings and no emoji.

## Checks

Run `npm run check` (the engine tests and the contrast audit) before pushing. CI runs both on Node 20 and 22.

## Branches

Work on a branch. Merging into `master` publishes the wiki, syncs the labels and redeploys GitHub Pages, so merge only when the owner says to.

The Pages site is public even while the repository is private. `_config.yml` lists what it publishes, which is only the demo. A file the site needs must be added there; everything else stays off it.
