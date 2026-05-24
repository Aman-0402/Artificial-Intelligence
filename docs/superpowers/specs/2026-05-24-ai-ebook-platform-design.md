# AI eBook Platform — Design Spec
**Date:** 2026-05-24  
**Stack:** HTML5 + CSS3 + Vanilla JavaScript only  
**Protocol:** `file://` (no server required)

---

## 1. Project Overview

Futuristic AI-themed eBook/learning platform. Static site, no build tools, no frameworks. Opens directly via `index.html` in a browser.

**Target feel:** Premium AI encyclopedia + developer docs + interactive eLearning.

---

## 2. Architecture

### Content Loading Strategy
**iframe-based dynamic loading.** `index.html` is a permanent shell (header + sidebar + iframe wrapper). Topic pages load inside `<iframe id="content-frame">` via `src` attribute swap. Works on `file://` — no fetch/CORS issues.

### Theme Sync
Both shell and topic iframes read `localStorage.getItem('ai-theme')` on load. Theme toggle in shell sets localStorage + dispatches `storage` event. Topic iframes listen for `storage` event and apply theme class.

### Libraries (CDN)
- **Prism.js** — syntax highlighting in topic pages
- **AOS** — scroll reveal animations
- **Typed.js** — typing animation on hero page

---

## 3. Folder Structure

```
/
├── index.html                    ← permanent shell
├── docs/                         ← specs (not served)
├── assets/
│   └── icons/                    ← SVG icons
├── css/
│   ├── variables.css             ← all CSS custom properties
│   ├── base.css                  ← reset + global typography
│   ├── header.css                ← sticky header styles
│   ├── sidebar.css               ← sidebar + accordion nav
│   ├── content.css               ← iframe wrapper + layout grid
│   ├── components.css            ← cards, alerts, code blocks, quiz, MCQ
│   ├── animations.css            ← particles, glows, keyframes
│   └── theme-light.css           ← light mode variable overrides
├── js/
│   ├── app.js                    ← init orchestrator, event wiring
│   ├── sidebar.js                ← accordion, search, active highlight, auto-scroll
│   ├── theme.js                  ← dark/light toggle + localStorage persistence
│   ├── navigation.js             ← iframe src swap, prev/next, history state
│   ├── particles.js              ← neural network canvas animation
│   └── tts.js                    ← Web Speech API text-to-speech
├── data/
│   └── topics.js                 ← sidebar nav tree (metadata + file paths)
└── topics/
    ├── _template.html            ← base HTML all topics extend
    ├── welcome.html              ← hero landing page
    ├── what-is-ai.html
    ├── history-of-ai.html
    ├── applications-ai.html
    ├── supervised-learning.html
    ├── unsupervised-learning.html
    ├── reinforcement-learning.html
    ├── neural-networks.html
    ├── cnn-basics.html
    ├── rnn-lstm.html
    ├── nlp-intro.html
    ├── transformers.html
    ├── llms-chatgpt.html
    ├── interview-questions.html
    ├── mcq-bank.html             ← aggregated MCQ page
    └── quiz-challenge.html       ← timed quiz challenge
```

---

## 4. Design System

### Color Tokens
```css
--bg-primary:     #050810        /* deep space black */
--bg-secondary:   #0a0f1e        /* dark navy */
--bg-card:        #0d1428        /* card surface */
--bg-glass:       rgba(13,20,40,0.7)
--accent-cyan:    #00d4ff        /* primary glow / CTA */
--accent-cyan-dim:#0099bb        /* hover */
--accent-purple:  #7b2fff        /* secondary accent */
--text-primary:   #e8f4ff
--text-secondary: #8ba8c8
--border-glow:    rgba(0,212,255,0.3)
--sidebar-width:  280px
--header-height:  64px
```

### Typography
| Font | Use |
|------|-----|
| Orbitron | Logo, H1, topic page titles |
| Poppins | Body, paragraphs, descriptions |
| JetBrains Mono | Code blocks |
| Rajdhani | Sidebar nav labels, badges |

### Light Mode
CSS variable swap only. White bg, dark text, blue accent. No layout changes.

---

## 5. Layout

### Desktop (≥1024px)
```
┌─────────────────────────────────────────────────┐
│  HEADER (fixed, 64px, glassmorphism)            │
├──────────────┬──────────────────────────────────┤
│              │                                  │
│   SIDEBAR    │        CONTENT IFRAME            │
│   (280px)    │   (fills remaining width)        │
│   fixed      │   scrolls independently          │
│              │                                  │
└──────────────┴──────────────────────────────────┘
```

### Mobile/Tablet (<1024px)
- Sidebar hidden off-screen left (`transform: translateX(-100%)`)
- Hamburger opens sidebar → dark overlay covers content
- Selecting topic closes sidebar automatically
- Content iframe = full viewport width

---

## 6. Header Components
- Hamburger menu (mobile) / sidebar toggle (desktop)
- Logo: "AI.learn" in Orbitron font + cyan glow
- Reading progress bar (thin cyan line below header, width = scroll %; iframe posts scroll % to parent via `window.parent.postMessage` — same origin on `file://` so this works)
- Search icon (opens inline search overlay)
- Theme toggle (sun/moon icon)
- Fullscreen reading button

---

## 7. Sidebar Components
- Logo repeat (mobile only, inside sidebar)
- Search input (filters topics in real-time)
- Accordion nav (parent topics expand/collapse)
- Each leaf: icon + label + active cyan highlight + left border glow
- Auto-scroll: active item scrolls into view on load

### Nav Tree Data Shape (`data/topics.js`)
```js
const TOPICS = [
  {
    id: "intro",
    label: "Introduction to AI",
    icon: "🤖",
    children: [
      { id: "what-is-ai", label: "What is AI", file: "topics/what-is-ai.html" },
      { id: "history-of-ai", label: "History of AI", file: "topics/history-of-ai.html" },
      { id: "applications-ai", label: "Applications", file: "topics/applications-ai.html" }
    ]
  },
  // ... more categories
];
```

---

## 8. Topic Page Structure (`_template.html`)

Every topic page includes:
1. **Theme class** applied on load from localStorage
2. **Topic header** — breadcrumb + title + reading time estimate
3. **Content body** — explanations, code blocks (Prism.js), info/warning/tip alert boxes, images, tables
4. **MCQ Bank section** — 5 questions per topic (see §9)
5. **Navigation footer** — ← Previous Topic | Next Topic → buttons
6. **Scroll-to-top button** (fixed, bottom-right)
7. **TTS button** — reads page content aloud via Web Speech API (Chrome on `file://`; Firefox blocks speech synthesis on file protocol)
8. **AOS scroll reveal** on content sections

Topic pages link to shared CSS files (`../css/variables.css`, `../css/base.css`, `../css/components.css`) and shared JS (`../js/mcq.js`, `../js/tts.js`). No inline styles.

---

## 9. MCQ System

### Data (inline per topic file)
```html
<script type="application/json" id="mcq-data">
[
  {
    "q": "Question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": 1,
    "explanation": "Why this answer is correct."
  }
]
</script>
```
5 questions per topic file.

### Behavior (`mcq.js` included in `_template.html`)
1. Reads `#mcq-data` JSON on load
2. Renders question cards with 4 clickable option buttons
3. On selection: correct = green glow, wrong = red glow + correct highlighted
4. Shows explanation text below answer
5. Score tracker: `X / 5 correct` shown after all answered
6. "Retry" button resets all questions

---

## 10. Quiz Challenge Page (`quiz-challenge.html`)

- 15 questions from `data/quiz-bank.js`
- 60-second countdown timer (configurable)
- Progress bar shows question position
- Final score screen: score + grade + "Try Again" button
- No explanation shown (challenge mode)

---

## 11. Hero / Welcome Page (`topics/welcome.html`)

- Full-viewport hero section
- Neural network particle canvas (animated)
- Headline: "Master Artificial Intelligence" with Typed.js cycling subtitles
- Two CTA buttons: "Start Learning →" + "Take Quiz"
- Feature cards below (4 cards: Topics, MCQs, Quizzes, Resources)
- Scroll reveal on feature cards (AOS)

---

## 12. Special Effects

| Effect | Implementation |
|--------|---------------|
| Neural network background | `<canvas>` + `particles.js` — animated nodes + connecting lines |
| Glow hover | `box-shadow: 0 0 20px var(--accent-cyan)` on hover |
| Glassmorphism | `backdrop-filter: blur(12px)` + semi-transparent bg |
| Animated gradient border | CSS `@keyframes` rotating conic-gradient |
| Typing animation | Typed.js on hero headline |
| Scroll reveal | AOS library, `data-aos="fade-up"` attributes |
| Smooth sidebar slide | CSS `transition: transform 0.3s ease` |

---

## 13. Topic Content (Sample — 13 topics)

| File | Title | Category |
|------|-------|----------|
| welcome.html | Welcome / Hero | — |
| what-is-ai.html | What is AI | Intro |
| history-of-ai.html | History of AI | Intro |
| applications-ai.html | Applications of AI | Intro |
| supervised-learning.html | Supervised Learning | ML |
| unsupervised-learning.html | Unsupervised Learning | ML |
| reinforcement-learning.html | Reinforcement Learning | ML |
| neural-networks.html | Neural Networks | Deep Learning |
| cnn-basics.html | CNN Basics | Deep Learning |
| rnn-lstm.html | RNN & LSTM | Deep Learning |
| nlp-intro.html | NLP Introduction | NLP |
| transformers.html | Transformers & Attention | NLP |
| llms-chatgpt.html | LLMs & ChatGPT | NLP |
| interview-questions.html | Interview Questions | Practice |
| mcq-bank.html | MCQ Bank (aggregated) | Practice |
| quiz-challenge.html | Quiz Challenge | Practice |

Each content topic (all except welcome, mcq-bank, quiz-challenge) includes 5 MCQ questions.

---

## 14. Responsiveness Breakpoints

```css
/* Mobile first breakpoints */
@media (max-width: 480px)  { /* small mobile */ }
@media (max-width: 768px)  { /* tablet */       }
@media (max-width: 1024px) { /* sidebar hides */ }
```

---

## 15. Development Phases

| Phase | Deliverable |
|-------|-------------|
| 1 | Folder structure + CSS variables + base styles |
| 2 | Shell `index.html` + header + layout grid |
| 3 | Sidebar navigation + accordion + `topics.js` data |
| 4 | Mobile responsive layout + hamburger + overlay |
| 5 | Theme toggle system (dark/light + localStorage) |
| 6 | Hero / welcome page + particles + Typed.js |
| 7 | `_template.html` + 3 sample content topic pages |
| 8 | MCQ system (`mcq.js` + questions in all topics) |
| 9 | Quiz challenge page + timer + scoring |
| 10 | Interview questions page + remaining topic pages |
| 11 | TTS system + reading progress + scroll-to-top |
| 12 | Animations polish + AOS + glow effects |
| 13 | Final QA: mobile testing, file:// verification, cleanup |
