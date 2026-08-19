(function () {
  const playerName = getPlayerName() || "Friend";

  const stepContainer = document.getElementById("stepContainer");
  const stepLabel = document.getElementById("stepLabel");
  const progressBar = document.getElementById("progressBar");
  const progressText = document.getElementById("progressText");

  const total = DAY2_QUESTIONS.length;
  const answers = [];
  let slideCount = 1;

  progressBar.max = total;

  function render(html) {
    stepContainer.classList.remove("active");
    void stepContainer.offsetWidth;
    stepContainer.innerHTML = html;
    stepContainer.classList.add("active");
    stepLabel.textContent = "Slide " + slideCount++;
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }

  function photoBlock(path, alt) {
    if (path) return `<img class="q-photo" src="${path}" alt="${alt}">`;
    return "";
  }

  function renderQuestion(i) {
    progressBar.value = i;
    progressText.textContent = `Question ${i + 1} of ${total}`;

    const q = DAY2_QUESTIONS[i];
    let inputHtml;

    if (q.type === "scale") {
      inputHtml = `
        <div class="range-value" id="rangeValue">5</div>
        <input type="range" id="answerInput" min="1" max="10" value="5">
      `;
    } else {
      inputHtml = `<textarea id="answerInput" placeholder="type your answer..."></textarea>`;
    }

    render(`
      <div class="q-text">${q.q}</div>
      ${photoBlock(q.photo, "")}
      ${inputHtml}
      <button class="btn btn-big" id="submitBtn" style="margin-top:14px;">LOG IT ➜</button>
    `);

    const input = document.getElementById("answerInput");
    if (q.type === "scale") {
      const rangeValue = document.getElementById("rangeValue");
      input.addEventListener("input", () => { rangeValue.textContent = input.value; });
    }

    document.getElementById("submitBtn").addEventListener("click", () => {
      answers.push({ q: q.q, a: input.value });
      handleSubmitted(i);
    });
  }

  function handleSubmitted(i) {
    const isLast = i === total - 1;

    render(`
      <div class="result logged">
        <div class="result-emoji">📁</div>
        <div class="result-headline">LOGGED.</div>
        <div class="result-sub">for future reference. no judgment (yet).</div>
        <button class="btn btn-big" id="nextBtn">${isLast ? "FINISH ➜" : "NEXT ➜"}</button>
      </div>
    `);

    document.getElementById("nextBtn").addEventListener("click", () => {
      if (isLast) {
        saveAnswers();
        renderFinal();
      } else {
        renderQuestion(i + 1);
      }
    });
  }

  function saveAnswers() {
    try {
      localStorage.setItem(
        "breakfastToll_day2_" + playerName,
        JSON.stringify({ name: playerName, answers, ts: Date.now() })
      );
    } catch (e) { /* storage full or unavailable, no big deal */ }
  }

  function renderFinal() {
    progressBar.value = total;
    progressText.textContent = "DONE";

    render(`
      <div class="final">
        <h2>THAT'S EVERYTHING</h2>
        <div class="tier-caption">${playerName}, you're officially on file.</div>
        <div class="tier-caption">go eat. you earned it, or you didn't have to, honestly — Janav was going to feed you anyway.</div>
        <a class="btn btn-big" href="index.html" style="text-decoration:none; display:block;">BACK TO START ➜</a>
      </div>
    `);
  }

  renderQuestion(0);
})();
