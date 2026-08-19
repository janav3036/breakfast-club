# 🍳 The Breakfast Toll — Project Brief for Claude Code

## The Bit

Janav feeds his friends his mom's home-cooked breakfast most mornings. As a running joke — and a real way to get to know everyone — nobody eats until they clear a quick round of questions first. It's a toll booth, not a bouncer: playful, not an actual barrier.

- **Day 1 (ships first, needed by tomorrow):** Questions *about Janav* — trivia, friends guess.
- **Day 2 (ships after):** Questions *about whoever's answering* — no wrong answers, just getting-to-know-you.

Treat this brief as a starting point, not gospel. Adjust anything that doesn't fit once you're actually building.

## Vibe

Meme page energy, not SaaS landing page energy. A BuzzFeed quiz that fell into a group chat. Built for four or five specific people, not a general audience — if it could pass for a generic quiz-app template, it's wrong. Lean into the specific bit (breakfast, mom's cooking, this friend group) rather than generic "quiz night" framing.

## How It Works

1. Land on the page, pick your name from the friend group (or type it).
2. Get served that day's questions — one at a time or all in one scroll, either's fine.
3. Answer them.
4. Get a payoff screen — something like "✅ ACCESS GRANTED — breakfast is served."

The gate is thematic, not functional — Janav's still the one physically holding the food. The site just needs to *feel* like clearing a checkpoint.

## Build Priority

Day 1 needs to be real by tomorrow. Suggested order:
1. Static shell — landing page, name picker, base styling
2. Day 1 quiz flow, wired up with placeholder content
3. Swap in real Day 1 content once Janav supplies it (see below)
4. Day 2 flow
5. Nice-to-haves, only if time allows

## Day 1 — About Janav

Real trivia questions with real correct answers. Mix formats: multiple-choice, guess-the-number, true/false. Each question can carry a photo of Janav and a reaction (meme/sticker) that fires on submit — one for correct, one for wrong.

**Format (fill in with real content):**
```
Question:
Type: multiple-choice / guess-the-number / true-false
Options: (if multiple-choice)
Correct answer:
Photo: assets/photos/___
Reaction (correct): assets/memes/___
Reaction (wrong): assets/memes/___
```

**Placeholder examples — swap in real facts, these are just to show the shape:**
- What's Janav's actual go-to order at [spot]?
- Which meme format does Janav send the most?
- Guess what time breakfast actually started cooking today (closest wins)
- True or false: Janav has actually finished [the book/show he won't stop talking about]
- What's Janav's most-repeated phrase, per the group?

## Day 2 — About Them

Open-response, no correct answer — the fun is in what they say, not scoring it. Each question can carry an optional photo/meme. On submit, show a light, non-judgmental reaction ("logged for future reference 📁") instead of right/wrong.

**Format:**
```
Question:
Photo/meme (optional): assets/___
```

**Placeholder examples:**
- What's one thing about you the group doesn't know yet?
- Rate today's breakfast, honestly (1–10)
- Drop the meme that best describes your mood right now
- What's an inside joke here you'd have to explain to a stranger?

## Content Janav Needs to Supply

Claude Code can't invent these — real content is needed before Day 1 can actually ship:
- [ ] 5–8 real Day 1 questions + correct answers
- [ ] 5–8 real Day 2 questions
- [ ] A handful of actual photos of Janav, matched to specific questions
- [ ] Reaction memes/stickers/GIFs (correct, wrong, generic) — pull from what's already saved rather than sourcing fresh off the internet, since most meme templates are copyrighted
- [ ] The friend group's names, if there's a name-select step

## Tech Recommendation

**Start static.** Plain HTML/CSS/JS, no backend — fastest path to something real by tomorrow, and trivially shareable: free hosting on GitHub Pages, Netlify, or Vercel, or just run it locally and pass the phone around. No new tooling on top of an existing git workflow.

**Later, if wanted:** a small Flask + SQLite backend to save everyone's answers — enables a running leaderboard ("who knows Janav best") or a hall-of-fame of the best Day 2 answers. Clean phase-2 addition, shouldn't hold up Day 1.

Build mobile-first — friends will be on their phones, not laptops.

## Suggested Structure

```
breakfast-toll/
├── index.html          # landing + name picker
├── day1.html            # About Janav
├── day2.html            # About Them
├── assets/
│   ├── photos/
│   └── memes/
├── css/
├── js/
└── README.md
```
Adapt freely — this is a suggestion, not a spec to follow exactly.

## Design Direction

- Skip the generic AI-design defaults (cream background + serif + terracotta accent; near-black + one acid accent; hairline-rule "broadsheet" layout). Ground the look in the actual bit instead: breakfast, tickets, checkpoints, mom's cooking — not a generic "quiz app."
- Pick one signature element and commit to it — e.g. each cleared question visually "stamps" or "punches" a boarding-pass-style ticket that fills in as you go. Keep everything else around it quiet.
- Real copy over placeholder copy: "Clear this to eat" beats "Question 1 of 5." Write every label like it's for this specific friend group, not a generic quiz.
- Keep the reveal snappy — the meme popping up right after each answer is most of the fun. Don't bury it behind animation delay.

## Nice-to-Haves (not for MVP)

- Auto-switch which day's content shows based on the actual date
- A shareable "results card" after finishing (Wordle-style) to send to the group chat
- Sound effect or confetti on the access-granted screen
- A QR code that opens straight to the current day's quiz

## Out of Scope (for now)

- Accounts or login — a name picker is enough
- Production-grade security — this lives inside a friend group, not the open internet
- Any backend at all, unless persistence actually gets requested

## Using This Brief

Save this file as `CLAUDE.md` in the project's root folder — Claude Code loads it automatically at the start of every session there, no extra step needed.

If anything here is unclear once you start building, ask rather than guess — this is a small, fun project, and a quick check-in beats building the wrong thing confidently.
