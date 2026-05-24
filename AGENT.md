# AI eBook Platform — Agent Reference

## Project
Futuristic AI-themed eBook/learning platform. Static site. HTML5 + CSS3 + Vanilla JS only. No frameworks, no build tools. Opens via `index.html` on `file://` protocol.

## Spec
Full design spec: `docs/superpowers/specs/2026-05-24-ai-ebook-platform-design.md`

## Key Architecture Decisions
- **Content loading:** iframe-based (`<iframe id="content-frame">`). Swap `src` on topic select. Works on `file://` — no CORS.
- **Theme sync:** Both shell + iframes read `localStorage.getItem('ai-theme')`. Iframe listens to `storage` event.
- **Reading progress:** Topic iframe posts scroll % to parent via `window.parent.postMessage`.
- **MCQ data:** Inline `<script type="application/json" id="mcq-data">` in each topic file. Parsed by `js/mcq.js`.
- **TTS:** Web Speech API. Chrome on `file://` only.

## Libraries (CDN only)
- Prism.js — syntax highlighting
- AOS — scroll reveal animations  
- Typed.js — typing animation (hero page)

## Folder Structure
```
/
├── index.html            ← permanent shell
├── AGENT.md              ← this file
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── header.css
│   ├── sidebar.css
│   ├── content.css
│   ├── components.css
│   ├── animations.css
│   └── theme-light.css
├── js/
│   ├── app.js
│   ├── sidebar.js
│   ├── theme.js
│   ├── navigation.js
│   ├── particles.js
│   ├── mcq.js
│   └── tts.js
├── data/
│   ├── topics.js         ← sidebar nav tree
│   └── quiz-bank.js      ← quiz challenge questions
├── assets/
│   └── icons/
└── topics/
    ├── _template.html    ← base all topics extend
    ├── welcome.html
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
    ├── mcq-bank.html
    └── quiz-challenge.html
```

## Build Phases

| # | Phase | Status |
|---|-------|--------|
| 1 | Folder structure + CSS variables + base styles | ⬜ |
| 2 | Shell `index.html` + header + layout grid | ⬜ |
| 3 | Sidebar navigation + accordion + `topics.js` data | ⬜ |
| 4 | Mobile responsive layout + hamburger + overlay | ⬜ |
| 5 | Theme toggle system (dark/light + localStorage) | ⬜ |
| 6 | Hero / welcome page + particles + Typed.js | ⬜ |
| 7 | `_template.html` + 3 sample content topic pages | ⬜ |
| 8 | MCQ system (`mcq.js` + questions in all topics) | ⬜ |
| 9 | Quiz challenge page + timer + scoring | ⬜ |
| 10 | Interview questions + remaining topic pages | ⬜ |
| 11 | TTS + reading progress + scroll-to-top | ⬜ |
| 12 | Animations polish + AOS + glow effects | ⬜ |
| 13 | Final QA: mobile test, file:// verify, cleanup | ⬜ |

## Design Tokens
```
--bg-primary:    #050810
--bg-secondary:  #0a0f1e
--accent-cyan:   #00d4ff
--accent-purple: #7b2fff
--text-primary:  #e8f4ff
--sidebar-width: 280px
--header-height: 64px
```

## Fonts
- Orbitron → logo, H1, titles
- Poppins → body text
- JetBrains Mono → code blocks
- Rajdhani → sidebar labels

## Nav Tree Structure (topics.js)
```js
const TOPICS = [
  { id, label, icon, children: [{ id, label, file }] }
]
```
Children with `file` property = leaf nodes = loadable topics.

## MCQ Data Format (per topic)
```json
[{ "q": "...", "options": ["A","B","C","D"], "answer": 1, "explanation": "..." }]
```
5 questions per topic. `answer` = 0-indexed.

## Current Phase
Starting Phase 1.
