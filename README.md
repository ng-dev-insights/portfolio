# Engineering Through Time

> A cinematic journey through the evolution of an engineer. Not a portfolio. A story.

**Live:** [sanketbhor.dev](https://sanketbhor.dev)

---

## What This Is

Most engineering portfolios answer: *"Here is what I have built."*

This one asks: *"Here is how I became capable of building it."*

Engineering Through Time is a personal website structured as an interactive documentary — six chapters, each representing a distinct mode of thinking across nine years of building, breaking, and growing as a frontend engineer. The experience is designed to be read, not scanned.

---

## The Six Chapters

| # | Chapter | Core Insight |
|---|---|---|
| 01 | **The Builder** | Curiosity was enough — until it wasn't |
| 02 | **The Problem Solver** | Most engineering problems aren't code problems |
| 03 | **The Architect** | The best architecture is the one that gets used |
| 04 | **The Multiplier** | The biggest impact wasn't what I built |
| 05 | **The Mentor** | Knowledge compounds when shared |
| 06 | **The Explorer** | The tools change. The mission stays the same |

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — cinematic chapter journey |
| `/work` | 8 case studies with full engineering context |
| `/principles` | 10 engineering beliefs formed through consequence |
| `/timeline` | Career progression through six mindset stages |
| `/about` | Essay-format biography and engineering philosophy |
| `/contact` | How to reach me |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Routing | React Router v7 |
| Bundler | Vite 8 |
| Styling | Tailwind CSS v4 |
| Animation | Motion (Framer Motion) |
| UI Primitives | Radix UI |
| Icons | Lucide React |
| Components | MUI + shadcn/ui |

---

## Design System

The visual language is a restrained cinematic monochrome palette — built to feel like a luxury editorial publication, not a SaaS dashboard.

```
Background:   #0B0B0B   — cinema black
Surface:      #141414   — elevated surface
Primary text: #F5F5F5   — near white
Muted text:   #9A9A9A   — secondary content
Borders:      #232323   — structural separation
Accent:       #D7D2C8   — warm parchment
```

Each chapter carries a distinct tonal accent:

```
Builder:     #C8A96E   — amber
Solver:      #7A9E8E   — sage
Architect:   #8FA3B8   — steel
Multiplier:  #C8A96E   — gold
Mentor:      #B89E8F   — terracotta
Explorer:    #9B9EC8   — indigo mist
```

---

## Running Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Requires Node 20+. The dev server runs at `http://localhost:5173`.

---

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── Chapter.tsx        # Homepage chapter cards
│   │   ├── FinalScene.tsx     # End of homepage journey
│   │   ├── Navigation.tsx     # Site-wide nav with theme toggle
│   │   └── SocialDock.tsx     # Social links
│   ├── pages/
│   │   ├── Home.tsx           # Two-state homepage (hero + chapters)
│   │   ├── SelectedWork.tsx   # 8 case studies, accordion layout
│   │   ├── EngineeringPrinciples.tsx
│   │   ├── Timeline.tsx       # Six-stage career progression
│   │   ├── About.tsx          # Essay-format biography
│   │   └── Contact.tsx
│   └── routes.tsx             # React Router config, lazy-loaded
├── styles/
│   └── theme.css              # Cinema token system, light/dark modes
└── main.tsx
```

---

## Deployment

Deployed on **Vercel** with automatic deploys on push to `main`.

Domain managed via **Hostinger**, DNS pointed to Vercel.

SSL auto-provisioned by Vercel — required for `.dev` TLD (HSTS preloaded).

---

## License

The code structure and implementation are open for reference.

The content — writing, case studies, principles, and personal narrative — belongs to Sanket Bhor and should not be reproduced.
