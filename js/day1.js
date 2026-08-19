(function () {
  const letterFor = idx => String.fromCharCode(65 + idx); // A, B, C, D, E...
  const playerName = getPlayerName() || "Friend";

  const stepContainer = document.getElementById("stepContainer");
  const stepLabel = document.getElementById("stepLabel");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");

  const total = DAY1_QUESTIONS.length;

  // fallback reaction pools, used when a question doesn't specify its own correctPhoto/wrongPhoto
  const CORRECT_REACTIONS = ["assets/memes/cor-ans-1.jpeg", "assets/memes/cor-ans-2.jpeg", "assets/memes/cor-ans-3.jpeg"];
  const WRONG_REACTIONS = ["assets/memes/wrong-ans-1.mp4", "assets/memes/wrong-ans-2.jpg", "assets/memes/wrong-ans-3.jpeg"];

  let score = 0;
  let slideCount = 1;

  progressBar.max = total;

  // swap the step's content and restart the basic fade every time
  function render(html) {
    stepContainer.classList.remove("active");
    void stepContainer.offsetWidth; // force reflow so the animation replays
    stepContainer.innerHTML = html;
    stepContainer.classList.add("active");
    stepLabel.textContent = "Slide " + slideCount++;
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function photoBlock(path, alt) {
    if (!path) return "";
    return `<img class="q-photo" src="${path}" alt="${alt}">`;
  }

  function reactionBlock(path, alt) {
    if (!path) return "";
    if (/\.mp4$/i.test(path)) {
      return `<video class="result-photo" autoplay muted loop playsinline preload="auto"><source src="${path}" type="video/mp4"></video>`;
    }
    return `<img class="result-photo" src="${path}" alt="${alt}">`;
  }

  function renderQuestion(i) {
    progressBar.value = i;
    progressText.textContent = `Question ${i + 1} of ${total}`;

    const q = DAY1_QUESTIONS[i];
    const choicesHtml = q.choices.map((c, idx) => `
      <button class="btn" data-idx="${idx}">
        <span class="choice-letter">${letterFor(idx)})</span>${c}
      </button>
    `).join("");

    render(`
      <div class="q-text">${q.q}</div>
      ${photoBlock(q.photo, "photo of Janav")}
      <div class="choices">${choicesHtml}</div>
    `);

    stepContainer.querySelectorAll(".choices .btn").forEach(btn => {
      btn.addEventListener("click", () => handleAnswer(i, parseInt(btn.dataset.idx, 10)));
    });
  }

  function handleAnswer(i, chosenIdx) {
    const q = DAY1_QUESTIONS[i];
    let mode, headline, emoji, sub;

    const isCorrect = Array.isArray(q.correct) ? q.correct.includes(chosenIdx) : chosenIdx === q.correct;

    if (q.correct === null) {
      mode = "wrong";
      emoji = "😏";
      headline = "NOPE.";
      sub = q.trickMsg || "Trick question.";
    } else if (isCorrect) {
      score++;
      mode = "correct";
      emoji = "✅";
      headline = "YAY!!";
      sub = q.correctMsg || DEFAULT_CORRECT;
    } else {
      mode = "wrong";
      emoji = "❌";
      headline = "WRONG.";
      sub = q.wrongMsg || DEFAULT_WRONG;
    }

    const pool = mode === "correct" ? CORRECT_REACTIONS : WRONG_REACTIONS;
    const reactionPath = (mode === "correct" ? q.correctPhoto : q.wrongPhoto) || pool[i % pool.length];
    const isLast = i === total - 1;

    render(`
      <div class="result ${mode}">
        <div class="result-emoji">${emoji}</div>
        <div class="result-headline">${headline}</div>
        <div class="result-sub">${sub}</div>
        ${reactionBlock(reactionPath, "reaction")}
        <button class="btn btn-big" id="nextBtn">${isLast ? "SEE MY SCORE ➜" : "NEXT ➜"}</button>
      </div>
    `);

    document.getElementById("nextBtn").addEventListener("click", () => {
      if (isLast) {
        renderFinal();
      } else {
        renderQuestion(i + 1);
      }
    });
  }

  function tier(rawScore) {
    return DAY1_TIERS.find(t => rawScore <= t.max);
  }

  function renderFinal() {
    progressBar.value = total;
    progressText.textContent = "DONE";

    const t = tier(score);

    render(`
      <div class="final">
        <h2>ACCESS GRANTED</h2>
        <div class="score-box">${score} / ${total}</div>
        ${reactionBlock(t.media, "score reaction")}
        <div class="tier-caption">${playerName} — ${t.caption}</div>
        <div class="tier-caption">breakfast is served. go find Janav.</div>
      </div>
    `);
  }

  renderQuestion(0);
})();
