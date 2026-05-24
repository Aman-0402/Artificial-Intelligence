# AI.learn — Artificial Intelligence eBook Platform

> A futuristic, interactive AI learning platform built with pure HTML5, CSS3, and Vanilla JavaScript.

**Live Site:** [https://aman-0402.github.io/Artificial-Intelligence/](https://aman-0402.github.io/Artificial-Intelligence/)

---

## What Is This?

AI.learn is a self-contained, browser-based eBook for learning Artificial Intelligence from the ground up. No server required — opens directly via `file://` or GitHub Pages. Topics load inside an iframe shell with animated transitions, scroll progress tracking, and MCQ quizzes per topic.

---

## Tech Stack

- **HTML5** — semantic markup, iframe-based content loading
- **CSS3** — custom properties, `clamp()` fluid layout, glassmorphism, AOS animations
- **Vanilla JavaScript** — no frameworks, no build tools
- **Prism.js** — syntax highlighting (CDN)
- **AOS** — scroll-reveal animations (CDN)
- **Typed.js** — typewriter effect on welcome page (CDN)

---

## Project Structure

```
├── index.html               # App shell (sidebar + iframe layout)
├── css/
│   ├── variables.css        # All design tokens (colors, spacing, fonts)
│   ├── base.css             # Reset + global typography
│   ├── animations.css       # Keyframe animations
│   ├── components.css       # Cards, MCQ shell, alerts, buttons
│   ├── header.css           # Fixed header + progress bar
│   ├── sidebar.css          # Accordion nav sidebar
│   └── content.css          # Main content area + iframe wrapper
├── js/
│   ├── app.js               # Bootstrap — init all managers
│   ├── sidebar.js           # Sidebar accordion, active state, mobile overlay
│   ├── navigation.js        # iframe loading, postMessage protocol, prev/next
│   ├── mcq.js               # MCQ engine (reads JSON from each topic page)
│   └── particles.js         # Canvas particle background
├── data/
│   ├── topics.js            # Topic tree + flat list + adjacency helpers
│   └── quiz-bank.js         # Shared quiz question bank
├── topics/
│   ├── welcome.html              # Hero landing page
│   ├── _template.html            # Base template for new topics
│   ├── intro/
│   │   ├── what-is-ai.html
│   │   ├── history-of-ai.html
│   │   ├── types-of-ai.html
│   │   ├── ai-vs-ml.html
│   │   ├── applications-ai.html
│   │   ├── how-ai-works.html
│   │   └── branches-of-ai.html
│   ├── ml/
│   │   ├── supervised-learning.html
│   │   ├── unsupervised-learning.html
│   │   └── reinforcement-learning.html
│   ├── dl/
│   │   ├── neural-networks.html
│   │   ├── cnn-basics.html
│   │   └── rnn-lstm.html
│   ├── nlp/
│   │   ├── nlp-intro.html
│   │   ├── transformers.html
│   │   └── llms-chatgpt.html
│   └── practice/
│       ├── interview-questions.html
│       ├── mcq-bank.html
│       └── quiz-challenge.html
└── assets/
    └── images/              # Topic diagrams and infographics
```

---

## Curriculum

### 🤖 Introduction to Artificial Intelligence
- What is Artificial Intelligence?
- History of Artificial Intelligence
- Types of Artificial Intelligence
- AI vs ML vs Deep Learning vs Generative AI
- Real-World Applications of Artificial Intelligence
- How AI Actually Works
- Branches of Artificial Intelligence

### 📊 Machine Learning
- Supervised Learning
- Unsupervised Learning
- Reinforcement Learning

### 🧠 Deep Learning
- Neural Networks
- CNN Basics
- RNN & LSTM

### 💬 NLP & Transformers
- NLP Introduction
- Transformers & Attention
- LLMs & ChatGPT

### 🏆 Practice & Resources
- Interview Questions
- MCQ Bank
- Quiz Challenge

---

## Features

- Dark theme UI with cyan accent glow
- Iframe-based topic loading (works on `file://`)
- Scroll progress bar synced from iframe to shell via `postMessage`
- Previous / Next topic navigation per page
- Per-topic MCQ quizzes with instant feedback and explanations
- Animated particle background on welcome page
- Responsive layout — fluid padding with `clamp()`, mobile sidebar overlay
- AOS scroll-reveal animations on topic content
- Syntax highlighting via Prism.js

---

## postMessage Protocol

Topics communicate with the parent shell via `window.parent.postMessage`:

| Direction | Type | Payload |
|---|---|---|
| iframe → shell | `scroll-progress` | `{ percent: number }` |
| iframe → shell | `navigate` | `{ id: string }` |
| shell → iframe | `topic-context` | `{ prev: {id, label}, next: {id, label} }` |

---

## Running Locally

No build step. Open `index.html` in any modern browser.

```bash
# Clone
git clone https://github.com/aman-0402/Artificial-Intelligence.git
cd Artificial-Intelligence

# Open (Windows)
start index.html

# Open (macOS)
open index.html
```

---

## License

MIT
