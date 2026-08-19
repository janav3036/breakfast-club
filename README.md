# 🍳 The Breakfast Toll

Clear the checkpoint, then eat. A dumb little quiz site for the friend group, built to look like it was made in MS Paint during 4th period computer lab (that's on purpose).

## Running it

No build step, no server needed. Open `index.html` in a browser, or serve the folder locally:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`. If you're testing on a phone, prefer serving it (locally
or hosted on GitHub Pages/Netlify) over just double-tapping the HTML file — video reactions
are unreliable when opened straight off the filesystem in some mobile browsers.

## Structure

- `index.html` — type your name, proceed into Day 1
- `day1.html` + `js/day1.js` + `js/data-day1.js` — About Janav trivia (scored, **real content**)
- `day2.html` + `js/day2.js` + `js/data-day2.js` — About You (no wrong answers, just "logged") —
  built but **not linked from the site yet**, on purpose, since it's not launching yet
- `css/style.css` — the whole look, one file
- `assets/photos/` — real photos of Janav, one per question
- `assets/memes/` — reaction media: a correct/wrong pool used per-question, plus one
  photo/video per final-score tier

## Editing content

**Day 1** — edit `js/data-day1.js`. Each question has any number of choices, and `correct` is
either an index, an array of indices (for "all of the above" style answers), or `null` for a
rhetorical trick question (like "who's my favorite person" — no right answer is selectable,
everyone gets the gotcha message, but it still counts toward the total shown at the end since
it's still one of the questions).

Score tiers (`DAY1_TIERS` at the bottom of that file) control the caption *and* the
photo/video shown on the final screen, keyed by how many questions were answered correctly.

**Day 2** — edit `js/data-day2.js`. Each question is `type: "text"` (free response) or
`type: "scale"` (1-10 slider). No correct answers to worry about. To launch it, add a link to
`day2.html` back into `index.html` and/or the Day 1 final screen in `js/day1.js`.

**Photos/memes** — drop files into `assets/photos/` or `assets/memes/`, then point a
question's `photo` (or `correctPhoto`/`wrongPhoto`) field at the path. Leave a `photo` field
as `""` and a dashed placeholder box shows instead — nothing breaks if an image isn't ready.

## Notes

- Names and Day 2 answers are stored in the browser's `localStorage` only — nothing leaves
  the device, no backend. Fine for now; see `CLAUDE.md` for the phase-2 idea (Flask + SQLite
  for a real leaderboard) if that's ever wanted.
- The `.mp4` reactions are h264/aac and load fine over a real HTTP server — if one doesn't
  play on someone's phone, it's almost certainly a file:// / how-it-was-shared issue, not a
  broken file. Serve it properly (see "Running it" above) first before assuming it's corrupt.
