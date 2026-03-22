# Sanket Bhor — Portfolio

A component-level React + Vite portfolio with an animated SVG avatar, guided tour, Web Speech API, and a live system architecture visualizer.

## Stack

- **React 18** + **Vite 5**
- **Tailwind CSS** (CDN)
- **IBM Plex Mono** + **Plus Jakarta Sans** (Google Fonts)

## Project Structure

```
src/
├── main.jsx                    # Entry point
├── App.jsx                     # Root — state, tour, sections
├── index.css                   # All CSS: tokens, animations, layout
│
├── constants/
│   ├── colors.js               # C palette (ind, vio, em, amb, ros, cya)
│   ├── data.js                 # NODES, EDGES, EXP, ROLES, TOUR_STEPS, CASE_STUDIES
│   ├── codeSnippets.js         # CODE_SNIPPETS array + hlLine tokenizer
│   ├── dialogue.js             # DIALOGUE, NODE_DIALOGUE, ACHIEVEMENTS, CHAR_POSES
│   └── speech.js               # speak(), stopSpeech(), INTRO_SPEECH
│
├── hooks/
│   ├── useMousePos.jsx         # Mouse position tracker
│   ├── useInView.jsx           # IntersectionObserver reveal
│   └── useCounter.jsx          # Animated number counter
│
└── components/
    ├── avatar/
    │   ├── AvatarDefs.jsx      # Global SVG <defs> (shared IDs, no duplication)
    │   ├── DevCharacter.jsx    # Geometric stroke-limb SVG avatar
    │   ├── CharacterLayer.jsx  # Fixed overlay: walks, reacts, speaks
    │   ├── AchievementToast.jsx
    │   ├── Confetti.jsx
    │   └── TypedText.jsx
    │
    ├── effects/
    │   ├── ParticleCanvas.jsx  # 40-particle canvas background
    │   └── Cursor.jsx          # Custom indigo cursor
    │
    ├── layout/
    │   ├── Nav.jsx             # Sticky nav + reduce-motion toggle + tour button
    │   ├── Ticker.jsx          # Scrolling status bar
    │   └── Footer.jsx
    │
    ├── hero/
    │   ├── Hero.jsx            # Hero section with avatar + floating cards
    │   └── FloatingCard.jsx    # Glassmorphism stat card
    │
    ├── sections/
    │   ├── SystemViz.jsx       # Interactive SVG node graph + case study modals
    │   ├── CaseDiagram.jsx     # Architecture diagram per case study type
    │   ├── CaseStudyModal.jsx  # Full case study slide-over
    │   ├── Timeline.jsx        # Accordion experience cards
    │   ├── TechOrbit.jsx       # CSS orbital rings (Angular + ecosystem)
    │   ├── PerfDashboard.jsx   # Animated perf metrics dashboard
    │   ├── ComponentShowcase.jsx
    │   ├── Leadership.jsx
    │   ├── FullStack.jsx
    │   └── DevDepth.jsx        # Syntax-highlighted code snippets
    │
    └── ui/
        └── EmailBtn.jsx        # Split mailto + copy-to-clipboard
```

## Getting Started

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # → dist/
npm run preview    # Preview production build
```

## Before Deploying

1. **Resume link** — replace `#resume-link-here` in `Nav.jsx` and `Hero.jsx` with your Google Drive URL:
   ```
   https://drive.google.com/file/d/YOUR_FILE_ID/view?usp=sharing
   ```

2. **WhatsApp link** is in `Footer.jsx` — already set to `+91-9561527671`

## Key Features

| Feature | Location |
|---|---|
| SVG avatar with 7 modes + cursor tracking | `DevCharacter.jsx` |
| Walking between sections | `CharacterLayer.jsx` |
| Web Speech API intro | `speech.js` + `CharacterLayer.jsx` |
| Achievement system (4 unlockables) | `CharacterLayer.jsx` |
| Interactive system graph + case studies | `SystemViz.jsx` |
| Guided tour (5 steps, auto-scrolls + speaks) | `App.jsx` + `CharacterLayer.jsx` |
| Reduce-motion toggle (pause ⏸ / play ▶) | `Nav.jsx` |
| Animated number counters | `useCounter.jsx` |
| Syntax-highlighted code | `hlLine()` in `codeSnippets.js` |
