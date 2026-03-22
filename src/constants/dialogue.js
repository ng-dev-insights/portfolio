export const DIALOGUE={
  // Multiple messages per state — rotated randomly so it feels alive
  home:[
    "Hi! I'm Sanket. This isn't a resume — it's a live system dashboard.",
    "I build frontend systems that scale to millions. Let me show you.",
    "Scroll down → the architecture tells the story better than bullet points.",
    "Every metric you'll see was measured in production. Real systems. Real impact.",
  ],
  systems:[
    "Click any node. I'll look at it — each one is a real system I architected.",
    "This is how I think: nodes, connections, failure modes, and performance.",
    "Hover a node → I'll look at it. Click → deep-dive case study with architecture diagrams.",
    "Five systems. Five different problems. One consistent approach: design for failure first.",
  ],
  experience:[
    "8 years. 4 companies. Each one added a new layer of complexity.",
    "From migrating 100K LOC to architecting platforms for 50+ enterprise clients.",
    "Every role progressively harder. That's not luck — that's intentional growth.",
    "The timeline isn't just years — it's decisions, trade-offs, and systems shipped.",
  ],
  skills:[
    "Angular at the core. Proximity to center = depth of expertise.",
    "I don't list skills I haven't shipped. Everything here has production use.",
    "Inner ring: tools I use daily. Outer ring: full-stack capability when needed.",
    "94% TypeScript proficiency means: no runtime surprises, ever.",
  ],
  performance:[
    "Every number here is production-verified. I ran the profiler. I made the change.",
    "40% bundle reduction. 60fps. These aren't estimates — I have the before/after.",
    "Performance work is architecture work. You can't optimize what you don't measure.",
    "8.4× faster API response. The data came from real users, not benchmarks.",
  ],
  contact:[
    "Let's build something great. Open to Senior, Lead, and Architect roles.",
    "If you got here, you're the kind of person I want to work with.",
    "Navi Mumbai → anywhere. Remote-first, but open to relocation for the right team.",
    "Best way to reach me: email below. I respond within 24 hours.",
  ],
};
export const NODE_DIALOGUE={
  comp:[
    "Component Library — 40+ modules. One fix ships to every product simultaneously.",
    "This eliminated three teams building the same Button. Design consistency became automatic.",
    "Storybook, Jest, TypeScript strict. It's not just a library — it's a design system.",
  ],
  rtdata:[
    "Real-time data — 60fps under 1000+ updates/second. OnPush + Web Workers made that possible.",
    "I'm watching the WebSocket stream right now. Every frame counts in financial data.",
    "bufferTime(16ms) aligns updates to requestAnimationFrame. That's the secret.",
  ],
  api:[
    "API Gateway — where 15 services feel like one. Circuit breakers keep everything alive.",
    "Failure rate: 12% → under 1%. That's not optimization — that's architectural redesign.",
    "One slow service can't cascade anymore. The architecture absorbs failure silently.",
  ],
  micro:[
    "Microservices — intelligent caching, event-driven, zero cascade failures.",
    "97% → 99.9% uptime. That's 87 fewer hours of downtime per year.",
    "18% infrastructure cost reduction through caching strategy alone. Not magic — design.",
  ],
  cicd:[
    "12 parallel test jobs. Engineers deploy on Fridays. That's what good CI/CD feels like.",
    "4 clients × 3 devices = 12 combinations verified on every commit. Regressions die here.",
    "85% coverage. 65% fewer production bugs. This pipeline is the last line of defence.",
  ],
};
export const CELEBRATE_MSGS=[
  "Nice — you explored deep. Most people don't get this far.",
  "You found the good stuff. That curiosity is why great products get built.",
  "Explorer unlocked 🎯 You've seen more of this system than most.",
  "You think in systems. Let's talk.",
];

/* ═══ ACHIEVEMENT SYSTEM ═══ */
export const ACHIEVEMENTS={
  explorer:  {icon:'🗺️', label:'System Explorer',   desc:'Hovered all 5 nodes'},
  diver:     {icon:'🤿', label:'Deep Diver',         desc:'Opened a case study'},
  thinker:   {icon:'🧠', label:'Systems Thinker',    desc:'Scrolled the full portfolio'},
  curious:   {icon:'👀', label:'Curious Engineer',   desc:'Spent 3+ minutes exploring'},
};

/* ═══ CHARACTER POSITIONS + POSES ═══ */
export const CHAR_POSITIONS={
  home:{bottom:0,left:'5vw'},
  systems:{bottom:0,left:'3vw'},
  experience:{bottom:0,right:'3vw',left:'auto'},
  skills:{bottom:0,left:'3vw'},
  performance:{bottom:0,right:'3vw',left:'auto'},
  contact:{bottom:0,left:'5vw'},
};
export const CHAR_POSES={
  home:'idle', systems:'point', experience:'think',
  skills:'idle', performance:'point', contact:'idle',
};