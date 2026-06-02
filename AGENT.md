# AI eBook Platform — Agent Reference

## Project
Futuristic AI-themed eBook/learning platform. Static site. HTML5 + CSS3 + Vanilla JS only. No frameworks, no build tools. Opens via `index.html` on `file://` protocol or GitHub Pages.

**Live:** https://aman-0402.github.io/Artificial-Intelligence/

## Spec
Full design spec: `docs/superpowers/specs/2026-05-24-ai-ebook-platform-design.md`

## Key Architecture Decisions
- **Content loading:** iframe-based (`<iframe id="content-frame">`). Swap `src` on topic select. Works on `file://` — no CORS.
- **Theme:** Dark only. Light theme removed. No toggle.
- **Reading progress:** Topic iframe posts scroll % to parent via `window.parent.postMessage`.
- **MCQ data:** Inline `<script type="application/json" id="mcq-data">` in each topic file. Parsed by `js/mcq.js`.
- **No TTS.** Web Speech API removed entirely.
- **No search.** Search overlay and sidebar search removed.
- **No breadcrumbs.** Removed from all topic pages.
- **No reading time.** Removed from all topic pages.

## Libraries (CDN only)
- Prism.js — syntax highlighting
- AOS — scroll reveal animations
- Typed.js — typing animation (welcome hero only)

## Folder Structure
```
/
├── index.html               ← permanent shell
├── AGENT.md                 ← this file
├── README.md
├── css/
│   ├── variables.css        ← ALL design tokens
│   ├── base.css             ← reset + Google Fonts + typography
│   ├── animations.css       ← @keyframes
│   ├── header.css
│   ├── sidebar.css
│   ├── content.css
│   └── components.css
├── js/
│   ├── app.js               ← boot orchestrator (4 lines)
│   ├── sidebar.js           ← accordion nav, mobile overlay
│   ├── navigation.js        ← iframe swap, loader, hash routing
│   ├── particles.js         ← canvas particle background
│   └── mcq.js               ← MCQ engine
├── data/
│   ├── topics.js            ← sidebar nav tree (5 groups / 20 topics)
│   └── quiz-bank.js
├── assets/
│   └── images/              ← topic diagrams and infographics
└── topics/
    ├── welcome.html          ← hero landing page
    ├── _template.html        ← base template for new topics
    ├── intro/
    │   ├── what-is-ai.html               ✅ content
    │   ├── history-of-ai.html            ✅ content
    │   ├── types-of-ai.html              ✅ content
    │   ├── ai-vs-ml.html                 ✅ content
    │   ├── applications-ai.html          ✅ content
    │   ├── how-ai-works.html             ✅ content
    │   ├── branches-of-ai.html           ✅ content
    │   └── advantages-limitations-ai.html ✅ content
    ├── ml/
    │   ├── what-is-ml.html               ✅ content
    │   ├── types-of-ml.html              ✅ content
    │   └── supervised-learning.html      ✅ content
    ├── dl/
    │   ├── neural-networks.html          🔲 placeholder
    │   ├── cnn-basics.html               🔲 placeholder
    │   └── rnn-lstm.html                 🔲 placeholder
    ├── nlp/
    │   ├── nlp-intro.html                🔲 placeholder
    │   ├── transformers.html             🔲 placeholder
    │   └── llms-chatgpt.html             🔲 placeholder
    └── practice/
        ├── interview-questions.html      🔲 placeholder
        ├── mcq-bank.html                 🔲 placeholder
        └── quiz-challenge.html           🔲 placeholder
```

**Deleted files (intentional):** `css/theme-light.css`, `js/theme.js`, `js/tts.js`

## Build Phases

| # | Phase | Status | Commit |
|---|-------|--------|--------|
| 1 | Folder structure + CSS variables + base styles | ✅ Done | `6c20b80` |
| 2 | Shell `index.html` + all JS modules | ✅ Done | `d4cde2b` |
| 3 | Welcome hero page + `_template.html` + MCQ engine | ✅ Done | `2373ac6` |
| 4 | Topic content pages | 🔄 In progress | — |
| 5 | Quiz challenge page + timer + scoring | 🔲 Todo | — |
| 6 | Interview questions page | 🔲 Todo | — |
| 7 | MCQ Bank aggregated page | 🔲 Todo | — |
| 8 | Animations polish + AOS + glow effects | 🔲 Todo | — |
| 9 | Final QA: mobile test, file:// verify, cleanup | 🔲 Todo | — |

### Phase 4 Progress
| Group | Topics | Status |
|-------|--------|--------|
| Intro to AI | 8 topics | ✅ All done |
| Machine Learning | TBD topics | 🔄 In progress |
| Deep Learning | 3 topics | 🔲 Pending |
| NLP & Transformers | 3 topics | 🔲 Pending |
| Practice & Resources | 3 topics | 🔲 Pending |

## Design Tokens (key values)
```
--bg-primary:    #050810
--bg-secondary:  #0a0f1e
--accent-cyan:   #00d4ff
--accent-purple: #7b2fff
--text-primary:  #e8f4ff
--sidebar-width: 310px        ← was 280px
--header-height: 64px
```

## Fonts
- Orbitron → logo, H1, titles
- Poppins → body text
- JetBrains Mono → code blocks
- Rajdhani → sidebar labels

## Nav Tree (topics.js)
```js
const TOPICS = [
  { id, label, icon, children: [{ id, label, file }] }
]
```
Children with `file` = leaf node = loadable topic.
File paths use subfolder pattern: `'topics/intro/what-is-ai.html'`

### Current Tree
```js
intro    (8) — what-is-ai, history-of-ai, types-of-ai, ai-vs-ml,
               applications, how-ai-works, branches-ai, adv-limit-ai
ml       (3+) — what-is-ml, types-of-ml, supervised-learning
dl       (3) — neural-networks, cnn, rnn-lstm
nlp      (3) — nlp-intro, transformers, llms
practice (3) — interview, mcq-bank, quiz
```

## Topic Page Pattern
Every topic HTML file follows this structure:
1. `<head>` — `../../css/*` links (two levels up), CDN libs, local `<style>`
2. `.topic-wrapper` — `width:100%; padding: clamp()`-based, no max-width
3. `.topic-content` — h2/h3/p/ul/table/img with `data-aos="fade-up"`
4. `.mcq-section` + `<script type="application/json" id="mcq-data">` — 4 MCQs
5. `.topic-nav` — prev/next via postMessage
6. `#scroll-top` button
7. Scripts: Prism, AOS, mcq.js, inline nav wiring

**Asset paths inside topic files:** `../../assets/images/filename.png`
**CSS/JS paths:** `../../css/`, `../../js/`
**All images:** include `onerror="this.style.display='none'"` for safety

## MCQ Data Format
```json
[{ "q": "...", "options": ["A","B","C","D"], "answer": 1, "explanation": "..." }]
```
`answer` = 0-indexed. 4 questions per topic (not 5).

## postMessage Protocol (shell ↔ iframe)

| Direction | type | data |
|-----------|------|------|
| iframe → shell | `scroll-progress` | `{ percent: 0-100 }` |
| iframe → shell | `navigate` | `{ id: topicId }` |
| shell → iframe | `topic-context` | `{ prev: {id,label}, next: {id,label} }` |

Note: `theme-change` message removed — dark-only platform.

## Key JS APIs
```js
// Shell globals (index.html scope)
NavigationManager.loadTopic(id, file)   // load topic into iframe
NavigationManager.loadById(id)          // load by topic id
SidebarManager.setActive(id)            // highlight sidebar item

// data/topics.js globals
TOPICS                   // full nav tree array
TOPICS_FLAT              // flat array of all leaf topics
getTopicById(id)         // → topic object
getAdjacentTopics(id)    // → { prev, next }
```

## Sidebar Behaviour
- Accordion: one group open at a time
- Default open: `group-intro` on load
- Mobile: overlay slide-in, closes on leaf click or ESC
- Desktop: hamburger collapses sidebar (`is-hidden` + `sidebar-hidden` on main)
- No search. No topic count badges.

## Common CSS Classes (topic pages)
```
.topic-image       — full-width img, max 720px, rounded border
.image-caption     — centered muted text below image
.scenario-block    — cyan left-border card for examples/scenarios
.highlight-box     — cyan-border card for key insights
.compare-grid      — 2-col responsive grid
.compare-card      — card inside compare-grid
.question-list     — numbered list with cyan counter (CSS counter)
.workflow          — vertical step flow with arrows
```
