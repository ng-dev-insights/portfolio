import { C } from './colors.js';

export const NODES = [
  { id:'comp',  x:170, y:125, label:'Component\nLibrary', short:'Component Library', color:C.ind, icon:'◈', status:'live',
    metrics:[{l:'Reusable Modules',v:'40+'},{l:'Dev Speed',v:'~30% faster'},{l:'Test Coverage',v:'~85%'}],
    tech:['Angular','Storybook','Jest','TypeScript','Angular Material'],
    desc:'Reusable component system adopted across multiple product lines — significantly reducing development time and enforcing design system consistency at enterprise scale.',
    why:'Engineers stop rebuilding the same Button for the third time. One fix ships to every product simultaneously. Design consistency becomes automatic, not aspirational.' },
  { id:'rtdata', x:680, y:125, label:'Real-Time\nData System', short:'Real-Time Data System', color:C.vio, icon:'⬡', status:'live',
    metrics:[{l:'Update frequency',v:'100s–1000+/sec'},{l:'Target render',v:'60 FPS'},{l:'Perceived latency',v:'<100ms'}],
    tech:['RxJS','OnPush Strategy','Web Workers','Virtual Scroll','WebSocket'],
    desc:'High-frequency data visualization optimized for sustained smooth rendering — built using OnPush change detection, RxJS batching aligned to rAF, and Web Worker offloading for heavy computation.',
    why:'Users trust the system because it never drops a frame — even under maximum market data load. The UI feels instant because it actually is.' },
  { id:'api',   x:425, y:258, label:'API Gateway\n& Orchestration', short:'API Gateway', color:C.cya, icon:'⬢', status:'live',
    metrics:[{l:'Target reliability',v:'~99.9%'},{l:'Services managed',v:'15+'},{l:'Failure rate (after)',v:'<1%'}],
    tech:['Node.js','Express.js','Circuit Breakers','Load Balancing','REST APIs'],
    desc:'Central orchestration layer coordinating 15+ microservices — significantly reducing API failure rates through circuit breaker patterns, exponential backoff, and intelligent retry logic.',
    why:'One slow service can\'t take down the rest. 15 independent services feel like a single, reliable platform. The architecture absorbs failure so users never see it.' },
  { id:'micro', x:680, y:375, label:'Microservices\nIntegration', short:'Microservices Layer', color:C.em, icon:'◉', status:'live',
    metrics:[{l:'Services connected',v:'15+'},{l:'Infra cost trend',v:'reduced ~18%'},{l:'Uptime (target)',v:'~99.9%'}],
    tech:['Node.js','AWS','Load Balancing','Event-Driven Architecture','RxJS'],
    desc:'Fault-tolerant distributed service mesh with intelligent caching, observability pipelines, and graceful degradation — driving meaningful improvements in reliability and operating cost.',
    why:'The system degrades gracefully instead of crashing completely. Infra spend drops because architecture absorbs spikes intelligently. Engineers sleep through the night.' },
  { id:'cicd',  x:170, y:375, label:'CI/CD &\nTest Infra', short:'CI/CD Pipeline', color:C.amb, icon:'◎', status:'live',
    metrics:[{l:'Coverage achieved',v:'~85%'},{l:'Regression trend',v:'significantly down'},{l:'Deploy confidence',v:'high ✓'}],
    tech:['GitHub Actions','Playwright','Jest','esbuild','TeamCity'],
    desc:'Parallel E2E test matrix across 4 enterprise clients × 3 device profiles with automated quality gates — catching regressions before they reach production and enabling confident continuous deployment.',
    why:'Engineers deploy on Friday without a war room. Every merge is tested against 12 environment combinations before it ships. Regressions are caught by automation, not customers.' },
];
export const EDGES = [
  {f:'comp',t:'api'},{f:'rtdata',t:'api'},{f:'micro',t:'api'},{f:'cicd',t:'api'},
  {f:'comp',t:'cicd'},{f:'rtdata',t:'micro'},
];
export const INNER = [
  {name:'RxJS',    color:'#b7178c',level:92},
  {name:'NgRx',    color:'#8b5cf6',level:88},
  {name:'TypeScript',color:'#3178c6',level:94},
  {name:'Node.js', color:'#339933', level:82},
];
export const OUTER = [
  {name:'AWS',             color:'#ff9900',level:78},
  {name:'Jest',            color:'#c21325',level:88},
  {name:'Angular Material',color:'#dd0031',level:85},
  {name:'GitHub Actions',  color:'#2088ff',level:82},
  {name:'Playwright',      color:'#2ead33',level:84},
];
export const EXP = [
  { role:'Senior Engineer', co:'TEN Lifestyle Group', period:'Aug 2021 – Present', color:C.ind, tag:'Current',
    metrics:[{l:'Bundle Reduction',v:'40%'},{l:'Render Cycles Cut',v:'50%'},{l:'Test Coverage',v:'85%'},{l:'Team Velocity',v:'+25%'}],
    stack:['Angular 16-17','RxJS','NgRx','Node.js','AWS','Playwright','GitHub Actions'],
    highlight:'Led the modernization of a 250K+ LOC Angular platform serving 50+ enterprise clients — achieving 40% bundle reduction while maintaining zero downtime. Built a 40-module component library now used across all product lines. Grew a 5-engineer team to deliver 25% faster through architecture mentorship.',
    scale:'250,000+ LOC · 50+ enterprise clients · 600+ components · 5 engineers mentored' },
  { role:'Senior Software Engineer', co:'63 Moons Technologies', period:'Aug 2018 – Aug 2021', color:C.vio, tag:'3 Years',
    metrics:[{l:'API Failure Rate',v:'12%→<1%'},{l:'System Uptime',v:'99.9%'},{l:'Reusable Widgets',v:'35+'},{l:'Hackathon Wins',v:'2×🏆'}],
    stack:['Angular 2-9','RxJS','NgRx','Node.js','WebSocket','MySQL','MongoDB'],
    highlight:'Architected Voice Logger and Voice Cast — real-time call recording platforms for financial institutions processing live audio streams. Designed a distributed system achieving 99.9% uptime via horizontal scaling, then reduced API failure rates from 12% to under 1% using circuit breaker architecture.',
    scale:'Financial sector · Real-time WebSocket · 35+ widget library · Regulatory compliance' },
  { role:'Software Engineer', co:'WhiteCrow Research', period:'Jan – Aug 2018', color:C.amb, tag:'7 Months',
    metrics:[{l:'Load Time',v:'−40%'},{l:'Process Efficiency',v:'+35%'},{l:'Data Accuracy',v:'+45%'},{l:'Platform Users',v:'1000+'}],
    stack:['Angular 4-5','TypeScript','Node.js','CoreUI','Bootstrap'],
    highlight:'Built a candidate engagement platform for 1000+ business users with advanced filtering, matching algorithms, and analytics dashboards — cutting page load times by 40% through API optimization and caching strategies.',
    scale:'1000+ business users · Recruitment SaaS · REST API integration' },
  { role:'Junior Software Engineer', co:'Emqube Software Solution', period:'Aug 2016 – Aug 2017', color:C.em, tag:'1 Year',
    metrics:[{l:'Codebase Migrated',v:'100K+ LOC'},{l:'Client Projects',v:'5+'},{l:'Production Bugs',v:'150+ fixed'},{l:'Customer Sat.',v:'+20%'}],
    stack:['AngularJS','Angular 2','TypeScript','Bootstrap','MySQL'],
    highlight:'Led the AngularJS to Angular 2 migration across multiple enterprise applications while building a Common Component Library adopted by 5+ client projects — establishing patterns that reduced cross-team development time by 30%.',
    scale:'5+ enterprise clients · Migration ownership · Common library author' },
];
export const ROLES = ['Frontend Architect','Angular Specialist','Performance Engineer','UI Systems Builder','Engineering Lead'];
export const TOUR_STEPS = [
  { section:null,   icon:'👋', title:'Welcome to my engineering portfolio', desc:'This isn\'t a resume — it\'s a live system dashboard. I\'ll guide you through the architecture in 60 seconds.', cta:'Start Tour →' },
  { section:'systems',  icon:'🗺️', title:'The Live System Map', desc:'Each node is a system I architected. Click any node to inspect its metrics, tech stack, and why it matters.', cta:'Explore Next →' },
  { section:'experience',icon:'⏱️', title:'Engineering Timeline', desc:'8+ years of progressively complex challenges — from migrating 100K LOC to architecting platforms for enterprise luxury travel clients.', cta:'Next →' },
  { section:'skills',   icon:'🌐', title:'Tech Orbit System', desc:'Angular at the core. The closer to center, the deeper the expertise. Inner ring: daily drivers. Outer ring: full stack capability.', cta:'Next →' },
  { section:'performance',icon:'📊', title:'Real Performance Numbers', desc:'Every metric here came from production systems I built and optimized. 40% bundle cut. 60fps. 99.9% uptime. Real systems.', cta:'Finish Tour ✓' },
];
export const CASE_STUDIES = {
  comp:{
    challenge:'Three product teams were duplicating Angular components with diverging implementations. The same Button existed in 3 slightly different versions. Form validation logic was copy-pasted across codebases. Every bug needed three separate fixes, and design drift made products look inconsistent.',
    approach:'Designed a single-source-of-truth Angular component library using secondary entry points for tree-shaking, Storybook for living documentation and visual regression, and strict TypeScript API contracts to enforce correct usage patterns.',
    decisions:[
      {t:'Angular CDK primitives',r:'Accessibility built-in — WCAG 2.1 compliance without custom a11y code in every component'},
      {t:'CSS Custom Properties',r:'Products can brand the library without coupling to Angular Material internals'},
      {t:'Secondary entry points',r:'Consumers only bundle what they import — zero dead code shipped to end users'},
      {t:'Visual regression (Chromatic)',r:'Screenshot diffing on every PR — UI changes are explicit and intentional, never accidental'},
    ],
    outcome:'30% faster feature development across all product teams. One bug fix reaches every product in a single PR. Zero design inconsistencies across 3+ products.',
  },
  rtdata:{
    challenge:'A financial dashboard was freezing for 3–5 seconds during peak market activity. Chrome DevTools profiling revealed 80% of CPU time spent in Angular\'s default change detection — triggering on every WebSocket message, even for completely unrelated components.',
    approach:'Profiled the full component render tree with Angular DevTools. Migrated all hot components to OnPush strategy. Batched WebSocket events with RxJS bufferTime to align with requestAnimationFrame. Offloaded data transformation to a dedicated Web Worker thread.',
    decisions:[
      {t:'OnPush everywhere',r:'Change detection only fires when inputs change — not on every event in the application'},
      {t:'RxJS bufferTime(16ms)',r:'Batch all updates to match the 60fps refresh rate — render once per frame maximum'},
      {t:'Web Worker pipeline',r:'Data normalization runs off the main thread — UI stays responsive during heavy computation'},
      {t:'CDK Virtual Scroll',r:'Only render visible rows regardless of dataset size — 100K rows costs the same as 10'},
    ],
    outcome:'60fps sustained across all market conditions. <100ms UI response time. 1000+ WebSocket messages per second processed with zero visible jank.',
  },
  api:{
    challenge:'15 microservices calling each other directly with no isolation. One slow service caused cascading timeouts across unrelated features. 12% of all API calls were failing under normal load — users were experiencing constant errors in a production system.',
    approach:'Introduced a Node.js API orchestration layer with per-service circuit breakers using exponential backoff retry, request deduplication, health-check endpoints, and a real-time observability dashboard for the operations team.',
    decisions:[
      {t:'Per-service circuit breakers',r:'One failing service cannot cascade — it opens its breaker and lets the rest of the system operate normally'},
      {t:'Exponential backoff',r:'Retries back off intelligently under load — recovery attempts don\'t amplify pressure on struggling services'},
      {t:'Request caching layer',r:'Identical reads served from memory — reduces downstream service pressure significantly'},
      {t:'Health endpoint matrix',r:'Ops team sees every service\'s real-time state — MTTR drops because problems are visible immediately'},
    ],
    outcome:'API failure rate: 12% → <1%. System uptime: 97% → 99.9%. That\'s 87 fewer hours of annual downtime.',
  },
  micro:{
    challenge:'Direct service-to-service coupling meant any deployment could silently break unexpected consumers. Infrastructure costs grew linearly with traffic. A 97% uptime ceiling caused by deployment-window downtime was unacceptable for enterprise SLA commitments.',
    approach:'Redesigned the service mesh with event-driven async communication via message queues, blue/green deployments for zero-downtime releases, intelligent CDN-backed caching to flatten traffic spikes, and per-service SLA contracts.',
    decisions:[
      {t:'Event-driven async',r:'Services communicate via events — callers don\'t block waiting for responses from downstream dependencies'},
      {t:'Blue/Green deployment',r:'New version runs alongside the existing one before any traffic shifts — zero-downtime guaranteed on every release'},
      {t:'Intelligent caching',r:'40% of requests never reach downstream services — served from cache while still respecting TTL contracts'},
      {t:'SLA health contracts',r:'Each service declares its degraded-mode behaviour — consumers know what to expect when things slow down'},
    ],
    outcome:'18% infrastructure cost reduction. Uptime: 97% → 99.9%. Zero-downtime deployments for all 15 services. Engineers deploy independently without coordination overhead.',
  },
  cicd:{
    challenge:'Manual QA across 4 enterprise clients, 3 device profiles, and 2 browsers took 6+ hours before every release. Regression bugs were reaching production because no single engineer could manually verify every client-specific configuration on every device.',
    approach:'Built a GitHub Actions CI pipeline with dynamic matrix generation creating 12 parallel test jobs (4 clients × 3 devices). A fan-in gate job blocks branch merges until every combination passes. Added Jest-based SCSS safeguards for design system enforcement.',
    decisions:[
      {t:'Dynamic matrix generation',r:'Adding a new enterprise client is a one-line config change — no pipeline duplication, no manual setup'},
      {t:'Playwright over Selenium',r:'Native async/await, built-in retries, auto-waiting — tests are fast, reliable, and readable'},
      {t:'Fan-in gate job',r:'Branch protection requires ALL 12 matrix jobs to pass — regressions cannot slip through any configuration'},
      {t:'Jest SCSS tokenizer',r:'Custom parser catches Angular Material form-field styling regressions at unit test time, before E2E'},
    ],
    outcome:'85% test coverage. 65% fewer regression bugs reaching production. Deployment confidence is now a property of the pipeline, not a feeling.',
  },
};