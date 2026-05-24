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

| # | Phase | Status | Commit |
|---|-------|--------|--------|
| 1 | Folder structure + CSS variables + base styles | ✅ Done | `6c20b80` |
| 2 | Shell `index.html` + all JS modules | ✅ Done | `d4cde2b` |
| 3 | Welcome hero page + `_template.html` + MCQ engine | ✅ Done | `2373ac6` |
| 4 | All 13 topic content pages (AI content + 5 MCQs each) | 🔲 Next | — |
| 5 | Quiz challenge page + timer + scoring | 🔲 Todo | — |
| 6 | Interview questions page | 🔲 Todo | — |
| 7 | MCQ Bank aggregated page | 🔲 Todo | — |
| 8 | Animations polish + AOS + glow effects | 🔲 Todo | — |
| 9 | Final QA: mobile test, file:// verify, cleanup | 🔲 Todo | — |

### Phase 1 delivered
- `css/variables.css` — all design tokens
- `css/base.css` — reset, Google Fonts, typography
- `css/animations.css` — 12 keyframes
- `css/header.css`, `sidebar.css`, `content.css`, `components.css`, `theme-light.css`

### Phase 2 delivered
- `index.html` — full shell (header, sidebar, iframe wrapper, overlays)
- `data/topics.js` — 5 groups / 16 topics + `getTopicById` / `getAdjacentTopics`
- `js/theme.js` — dark/light toggle, localStorage, postMessage to iframe
- `js/sidebar.js` — accordion render, search filter, mobile open/close, active highlight
- `js/navigation.js` — iframe src swap, loader, hash routing, scroll-progress listener
- `js/app.js` — boot orchestrator, search overlay
- `js/tts.js` — Web Speech API
- `js/particles.js` — neural network canvas (`initCanvas()` for topic pages)

### Phase 3 delivered
- `topics/welcome.html` — hero, particle canvas, Typed.js, stats strip, feature cards, topic preview
- `topics/_template.html` — base template (breadcrumb, TTS, reading time, MCQ mount, prev/next nav, scroll-top, Prism.js, AOS)
- `js/mcq.js` — MCQ engine (reads inline JSON, interactive scoring, explanation, retry)

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
**Phase 4** — All 13 topic content pages with real AI content + 5 MCQs each.

Topics remaining to build:
- `what-is-ai.html`
- `history-of-ai.html`
- `applications-ai.html`
- `supervised-learning.html`
- `unsupervised-learning.html`
- `reinforcement-learning.html`
- `neural-networks.html`
- `cnn-basics.html`
- `rnn-lstm.html`
- `nlp-intro.html`
- `transformers.html`
- `llms-chatgpt.html`
- `interview-questions.html`
- `mcq-bank.html`
- `quiz-challenge.html`

## postMessage Protocol (shell ↔ iframe)

| Direction | type | data |
|-----------|------|------|
| iframe → shell | `scroll-progress` | `{ percent: 0-100 }` |
| iframe → shell | `navigate` | `{ id: topicId }` |
| shell → iframe | `theme-change` | `{ theme: 'dark'|'light' }` |
| shell → iframe | `topic-context` | `{ id, theme, prev, next }` |

## Key JS APIs

```js
// Shell globals (available in index.html scope)
NavigationManager.loadTopic(id, file)   // load topic into iframe
NavigationManager.loadById(id)          // load by topic id
SidebarManager.setActive(id)            // highlight sidebar item
ThemeManager.applyTheme('dark'|'light') // set theme

// data/topics.js globals
TOPICS                   // full nav tree array
TOPICS_FLAT              // flat array of all leaf topics
getTopicById(id)         // → topic object
getAdjacentTopics(id)    // → { prev, next }
```
