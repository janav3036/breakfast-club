/*
  DAY 1 — About Janav. REAL CONTENT.

  Each question:
    q          - the question text
    photo      - optional, path under assets/photos/ (leave "" for the dashed placeholder box)
    choices    - array of strings (any length), shown as A/B/C/D/E...
    correct    - index of the right choice, OR an array of indices if more than one
                 choice counts as correct, OR null for a trick question with no right
                 answer (doesn't count toward the score)
    correctMsg - optional custom line shown on a correct answer (else DEFAULT_CORRECT)
    wrongMsg   - optional custom line shown on a wrong answer (else DEFAULT_WRONG)
    trickMsg   - only for correct: null questions — the "gotcha" line
    correctPhoto/wrongPhoto - optional reaction image paths under assets/memes/
*/

const DEFAULT_CORRECT = "YAY!! Very good. You should at least know this much about me.";
const DEFAULT_WRONG = "ARE YOU DUMB?? You don't even know this much about me??";

const DAY1_QUESTIONS = [
  {
    q: "Who is my favorite person in class?",
    photo: "",
    choices: ["Shagun", "Agastya", "Meera", "Lavanya", "Sneha"],
    correct: null,
    trickMsg: "No one. I don't pick favorites.",
  },
  {
    q: "What is the most important thing in my life right now?",
    photo: "assets/photos/q2.jpeg",
    choices: ["Claude", "Money", "My dog", "The gym"],
    correct: [0, 1, 2, 3],
    correctMsg: "All of them. Why not?",
  },
  {
    q: "What's the weirdest thing I learned how to do?",
    photo: "assets/photos/q3.jpeg",
    choices: ["Fold my tongue in weird ways", "Juggling", "Flip pages in a book with my legs"],
    correct: 0,
  },
  {
    q: "How many Monsters have I had till now?",
    photo: "assets/photos/q4.jpg",
    choices: ["At least 20", "50", "100", "150"],
    correct: 3,
    correctMsg: "150. Yes I know it's bad for me but it's fine. Also it's probably more than that tbh.",
  },
  {
    q: "What's my worst quality?",
    photo: "assets/photos/q5.JPG",
    choices: ["Too humble", "Too handsome", "Too empathetic", "Just gives the best advice"],
    correct: [0, 1, 2, 3],
    correctMsg: "All of them. Aren't you sweet?",
  },
  {
    q: "I'm assuming you know I wear glasses. How blind am I?",
    photo: "assets/photos/q6.jpeg",
    choices: ["Blind blind", "Kinda blind", "Wouldn't know if a truck was coming at me"],
    correct: 1,
  },
  {
    q: "When did I start coding?",
    photo: "assets/photos/q7.jpeg",
    choices: ["12", "15", "17", "Out of the womb"],
    correct: [1, 3],
    correctMsg: "15 — or out of the womb, it's my inherent talent.",
  },
  {
    q: "At what age did I have my first girlfriend?",
    photo: "assets/photos/q8.jpeg",
    choices: ["11", "13", "15", "Not yet"],
    correct: 1,
  },
];

// score bands, based on raw number correct (out of 8 shown — the "favorite person" trick
// question still counts toward the total, it just can never be answered correctly)
const DAY1_TIERS = [
  { max: 2, caption: "Embarrassing. You really should know the person you're getting your daily dose of scrumptious meals from. But it's fine, you can have food.", media: "assets/memes/1-2.jpeg" },
  { max: 4, caption: "You know some things about me. But talk more, cus next time no food.", media: "assets/memes/3-4.jpeg" },
  { max: 6, caption: "You really know me. Good, good, as you should. Have as much food as you like.", media: "assets/memes/5-6.mp4" },
  { max: Infinity, caption: "Why do you know so much about me? Stalker. I probably shouldn't give you food.", media: "assets/memes/7-8.jpeg" },
];
