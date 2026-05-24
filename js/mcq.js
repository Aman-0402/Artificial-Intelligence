/**
 * MCQ ENGINE
 * Reads inline <script type="application/json" id="mcq-data"> from topic page.
 * Renders interactive question cards with scoring.
 * Included in every topic page via _template.html.
 */

(function () {
  'use strict';

  const LETTERS = ['A', 'B', 'C', 'D'];

  function init() {
    const dataEl = document.getElementById('mcq-data');
    const mount  = document.getElementById('mcq-mount');
    if (!dataEl || !mount) return;

    let questions;
    try {
      questions = JSON.parse(dataEl.textContent);
    } catch (e) {
      console.error('[MCQ] Invalid JSON in #mcq-data', e);
      return;
    }

    if (!Array.isArray(questions) || questions.length === 0) return;

    renderQuestions(mount, questions);
  }

  /* ------------------------------------------------
     RENDER ALL QUESTION CARDS
  ------------------------------------------------ */
  function renderQuestions(mount, questions) {
    let answeredCount = 0;
    let correctCount  = 0;
    const total = questions.length;

    // Score element (hidden until all answered)
    const scoreEl = document.createElement('div');
    scoreEl.className = 'mcq-score';
    scoreEl.id = 'mcq-score-box';

    const cards = questions.map((q, idx) => {
      return buildCard(q, idx, {
        onAnswer: (isCorrect) => {
          answeredCount++;
          if (isCorrect) correctCount++;
          if (answeredCount === total) {
            showScore(scoreEl, correctCount, total);
          }
        },
      });
    });

    // Retry button
    const retryBtn = document.createElement('button');
    retryBtn.className = 'btn btn-outline btn-sm mcq-score__retry';
    retryBtn.textContent = '↺ Retry All Questions';
    retryBtn.addEventListener('click', () => {
      answeredCount = 0;
      correctCount  = 0;
      scoreEl.classList.remove('is-visible');
      mount.innerHTML = '';
      renderQuestions(mount, questions);
    });

    scoreEl.innerHTML = `
      <div class="mcq-score__number" id="score-number">0 / ${total}</div>
      <div class="mcq-score__label">Questions answered correctly</div>
    `;
    scoreEl.appendChild(retryBtn);

    const container = document.createElement('div');
    container.className = 'mcq-container';
    cards.forEach(c => container.appendChild(c));

    mount.appendChild(container);
    mount.appendChild(scoreEl);
  }

  /* ------------------------------------------------
     BUILD SINGLE QUESTION CARD
  ------------------------------------------------ */
  function buildCard(q, idx, { onAnswer }) {
    const card = document.createElement('div');
    card.className = 'mcq-card';
    card.dataset.answered = 'false';

    const num = document.createElement('div');
    num.className = 'mcq-number';
    num.textContent = `Question ${idx + 1}`;

    const question = document.createElement('div');
    question.className = 'mcq-question';
    question.textContent = q.q;

    const optionsEl = document.createElement('div');
    optionsEl.className = 'mcq-options';

    const explanationEl = document.createElement('div');
    explanationEl.className = 'mcq-explanation';
    explanationEl.innerHTML = `<strong>Explanation:</strong> ${q.explanation}`;

    q.options.forEach((opt, i) => {
      const btn = document.createElement('button');
      btn.className = 'mcq-option';
      btn.setAttribute('type', 'button');
      btn.innerHTML = `
        <span class="mcq-option__letter">${LETTERS[i]}</span>
        <span>${opt}</span>
      `;

      btn.addEventListener('click', () => {
        if (card.dataset.answered === 'true') return;
        card.dataset.answered = 'true';
        card.classList.add('is-answered');

        const isCorrect = i === q.answer;

        // Mark all options
        optionsEl.querySelectorAll('.mcq-option').forEach((b, j) => {
          b.disabled = true;
          if (j === q.answer) {
            b.classList.add(isCorrect && j === i ? 'is-correct' : 'is-reveal');
          }
          if (j === i && !isCorrect) {
            b.classList.add('is-wrong');
          }
        });

        // Show explanation
        explanationEl.classList.add('is-visible');

        onAnswer(isCorrect);
      });

      optionsEl.appendChild(btn);
    });

    card.appendChild(num);
    card.appendChild(question);
    card.appendChild(optionsEl);
    card.appendChild(explanationEl);
    return card;
  }

  /* ------------------------------------------------
     SHOW SCORE
  ------------------------------------------------ */
  function showScore(scoreEl, correct, total) {
    const numEl = scoreEl.querySelector('#score-number');
    if (numEl) numEl.textContent = `${correct} / ${total}`;

    // Color code score
    const pct = correct / total;
    if (numEl) {
      numEl.style.color = pct >= 0.8
        ? 'var(--accent-green)'
        : pct >= 0.5
          ? 'var(--accent-cyan)'
          : 'var(--accent-red)';
    }

    scoreEl.classList.add('is-visible');
    scoreEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  // Auto-init when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
