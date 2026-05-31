import { motion } from "motion/react";

export function About() {
  const essays = [
    {
      question: "Why engineering?",
      answer: `Engineering is the practice of turning constraints into systems. Every problem is an architecture decision. Every solution should enable ten more.\n\nMy day-to-day is as much about the invisible work as the shipped feature: a remediation plan written before the refactor starts, a coding standard that prevents the same mistake from recurring, an architecture discussion where someone needs a position not a question. That's what senior engineering actually looks like.\n\nA feature that ships is the beginning of a commitment, not the end of one.`,
    },
    {
      question: "Why systems thinking?",
      answer: `Features are temporary. Systems are permanent.\n\nThe first time I heard this it sounded like a cliché. The tenth time I was debugging something that should have been made impossible by the architecture, it became a principle.\n\nSystems thinking in engineering isn't an abstract discipline — it's the practice of asking "how does this decision compound over time?" before you commit to it. Most technical debt isn't caused by bad developers. It's caused by good developers optimizing for the wrong time horizon.`,
    },
    {
      question: "Why mentoring?",
      answer: `The best code I've written has been deleted. The best impact I've had is still running in how certain engineers approach problems.\n\nMentoring is the only form of engineering work with a multiplier that doesn't degrade. A tool you build gets replaced. An architecture you design gets superseded. A way of thinking you help someone develop compounds indefinitely.\n\nI mentor because it makes the people around me more capable than they thought they could be. That changes what's possible for everyone they work with afterward.`,
    },
    {
      question: "Why AI — and why now?",
      answer: `AI is the biggest productivity multiplier I've found in 9 years of engineering. Not a novelty, not a search engine — infrastructure that removes activation energy from things engineers know they should do but find expensive. Writing tests. Drafting remediation plans. Reviewing patterns before a PR opens.\n\nThe result: I move faster without moving sloppily. Architecture decisions still require judgment. AI amplifies execution of those decisions. That's the distinction that matters.\n\nI built angular-vitest-gen because AI let me close the gap between "we should test this" and "the test exists." Same philosophy applied daily: remove the effort tax, then apply the judgment more.`,
    },
    {
      question: "How I approach unfamiliar problems",
      answer: `The pattern is consistent: go deep enough to understand the failure modes before shipping. I've debugged CommonJS interop issues in Webpack, traced NgRx provider placement bloating a bundle to 12.8MB, caught SCSS linting rules silently corrupting colour values. None of these were in the docs.\n\nThe mental model I've developed: new technology is a set of tradeoffs, not a set of features. Understanding what a tool fails at tells you more than understanding what it's designed for. That's what fast learning actually looks like in practice.\n\nIn architecture discussions I come in with a position, not a question. New domain: figure it out. New team: earn trust by being useful before being vocal.`,
    },
    {
      question: "What mistakes changed my thinking?",
      answer: `Designing a system that was architecturally excellent and organizationally ignored. That taught me adoption is part of design. The failure wasn't in the architecture — it was in not treating adoption as a design constraint from the start. I now write adoption plans alongside implementation plans.\n\nOver-engineering a solution for a problem that should have been solved by a conversation. That taught me to diagnose before building.\n\nAssigning timeline estimates to uncertainty. That taught me the difference between precision and accuracy.\n\nThese aren't failures I'm proud of. They're the ones I reference most often when I see a team about to make the same choice.`,
    },
    {
      question: "What am I still learning?",
      answer: `How to be a better explainer. Technical clarity is a skill I've improved at, but explaining complex systems to people without shared context — really explaining them, in a way that creates understanding rather than information — is something I'm actively working on.\n\nAlso: the intersection of AI and engineering tooling. Not theoretically. In production, with real feedback loops, measuring what actually changed about how engineers work rather than what we assumed would change.`,
    },
    {
      question: "What kind of work am I looking for next?",
      answer: `I'm looking for platform-level problems — work that affects how multiple teams build, not feature delivery for a single product. Frontend platforms, shared design systems, developer tooling that changes how engineers across an organisation operate.\n\nThe companies that interest me most are those where the frontend isn't an afterthought: where architecture decisions compound, where accessibility and performance are constraints rather than checklists, and where engineering effectiveness is valued alongside shipping velocity.\n\nIf the hardest problems on the frontend roadmap involve systems design, team enablement, or sustained technical quality — that's where I do my best work.`,
    },
  ];

  const experienceJourney = [
    {
      period: "Aug 2021 – Present",
      company: "Ten Lifestyle Group",
      role: "Senior Frontend Engineer",
      location: "Mumbai, India",
      highlights: [
        "Led Angular modernisation from v15 → v21 with zero downtime",
        "Inherited a 12.8MB bundle — diagnosed root causes (NgRx in main.ts, CommonJS deps, no lazy loading, no DRY), designed the full remediation plan, refactored the architecture, wrote the coding standards",
        "Built 3-tier SCSS theming system supporting 30–40 enterprise clients from a single codebase",
        "Embedded accessibility into CI with Playwright + axe-core — compliance is now a merge gate, not a post-launch checkbox",
        "Authored angular-vitest-gen — AI CLI that generates production-quality Vitest tests for Angular components",
        "24-job Playwright E2E matrix covering client × environment × device — cut feedback time and enabled thorough coverage without CI cost",
      ],
    },
    {
      period: "Aug 2018 – Aug 2021",
      company: "63 Moons Technologies",
      role: "Senior Software Engineer",
      location: "Mumbai, India",
      highlights: [
        "Built Voice Logger & Voice Cast — real-time compliance platforms for financial institutions",
        "Led frontend delivery across 3 greenfield Angular projects using NgRx",
        "Engineered resilient integration layer with retry logic & offline-tolerant state",
        "Implemented GitHub Actions CI for automated unit testing",
      ],
    },
    {
      period: "Jan 2018 – Aug 2018",
      company: "WhiteCrow Research",
      role: "Software Engineer",
      location: "Mumbai, India",
      highlights: [
        "Candidate engagement platform with AI-assisted profile matching",
        "Multi-filter candidate discovery and analytics dashboards",
        "Client-side caching strategies reducing load times on high-frequency search ops",
      ],
    },
    {
      period: "Aug 2016 – Aug 2017",
      company: "Emqube Software Solutions",
      role: "Junior Software Engineer",
      location: "Mumbai, India",
      highlights: [
        "AngularJS → Angular migration for enterprise clients (GST Admin, PM System, SalesPro CRM)",
        "Reusable Angular component library: multiselect, query builders, data visualisation",
      ],
    },
  ];

  const skillGroups = [
    {
      label: "Core Stack",
      skills: ["Angular (v2–v21)", "TypeScript", "JavaScript (ES6+)", "RxJS", "Angular Signals", "React"],
    },
    {
      label: "UI & Styling",
      skills: ["SCSS", "Angular Material", "Design Systems", "Responsive UI"],
    },
    {
      label: "Architecture",
      skills: ["Standalone Components", "NgRx Store", "Lazy Loading", "OnPush Change Detection", "inject() DI"],
    },
    {
      label: "Performance",
      skills: ["Core Web Vitals", "Lighthouse", "Code Splitting", "Image Optimisation"],
    },
    {
      label: "Testing & Quality",
      skills: ["Vitest", "Playwright E2E", "Jest", "axe-core", "WCAG 2.1 AA", "SonarQube", "TDD"],
    },
    {
      label: "AI & Tooling",
      skills: ["GitHub Copilot", "Groq API", "LLM CLI Tooling", "GitHub Actions", "Docker"],
    },
    {
      label: "Backend & Infra",
      skills: ["NestJS", "FastAPI", "MySQL", "MongoDB", "AWS", "Vercel"],
    },
  ];

  const languages = [
    { name: "English", level: "Professional" },
    { name: "Hindi", level: "Native" },
    { name: "Marathi", level: "Native" },
  ];

  return (
    <div className="min-h-screen w-full bg-[var(--cinema-black)] pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 space-y-5"
        >
          {/* FIX: Removed double-opacity. Was: color=muted + opacity-0.55 */}
          <p
            className="text-xs tracking-[0.08em] uppercase"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            Personal Essay
          </p>

          <h1
            className="text-[clamp(3rem,8vw,6rem)] tracking-tight leading-[0.92]"
            style={{ fontWeight: 700, color: "var(--cinema-white)", letterSpacing: "-0.03em" }}
          >
            About
          </h1>

          <div className="h-px w-16 bg-[var(--cinema-accent)] opacity-40" />
        </motion.div>

        {/* Opening */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-14 max-w-[680px]"
        >
          <p
            className="text-[clamp(1.125rem,2.5vw,1.5rem)] leading-[1.6] tracking-tight"
            style={{ fontWeight: 400, color: "var(--cinema-white)", letterSpacing: "-0.01em", opacity: 0.9 }}
          >
            I'm a Senior Frontend Engineer based in Navi Mumbai. Over the last 9 years I've focused on modernizing Angular platforms, improving developer experience, and creating frontend systems that remain maintainable as products grow.
          </p>
        </motion.div>

        {/*
          ── Photo ──
          Hidden for now — uncomment the `hidden` class removal when a photo is ready.
          To show: remove `hidden` from the outer div, then set `src` on the img tag.
          Recommended: square crop, min 600×600px, monochrome or desaturated to match theme.
        */}
        <div className="hidden mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-start gap-12"
          >
            {/* Photo container */}
            <div
              className="shrink-0 border border-[var(--cinema-border)] overflow-hidden"
              style={{ width: 200, height: 200 }}
            >
              <img
                src=""
                alt="Sanket Bhor"
                className="w-full h-full object-cover grayscale"
                style={{ filter: "grayscale(1) contrast(1.05)" }}
              />
            </div>

            {/* Caption */}
            <div className="space-y-3 pt-2">
              <p
                className="text-[10px] tracking-[0.3em] uppercase opacity-30"
                style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
              >
                Sanket Bhor
              </p>
              <p
                className="text-sm leading-[1.7] max-w-xs opacity-60"
                style={{ fontWeight: 300, color: "var(--cinema-muted)" }}
              >
                Senior Engineer · Navi Mumbai
              </p>
            </div>
          </motion.div>
        </div>

        {/* Essays */}
        <div className="space-y-20 mb-16">
          {essays.map((essay, index) => (
            <motion.div
              key={essay.question}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              viewport={{ once: true, margin: "-60px" }}
              className="grid md:grid-cols-[240px_1fr] gap-8 md:gap-16 border-t border-[var(--cinema-border)] pt-10"
            >
              <div className="space-y-3">
                {/* FIX: Was color=muted + opacity-0.7 italic (double-dimmed). Now single value. */}
                <p
                  className="text-sm leading-[1.5] italic"
                  style={{ fontWeight: 500, color: "var(--cinema-muted)" }}
                >
                  {essay.question}
                </p>
              </div>

              <div className="space-y-5 max-w-[640px]">
                {essay.answer.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="leading-[1.75]"
                    style={{ fontWeight: 400, color: "var(--cinema-white)", opacity: 0.85, fontSize: "1rem" }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── Experience Journey ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="border-t border-[var(--cinema-border)] pt-16 mb-16 space-y-12"
        >
          {/* FIX: Section headers — was text-xs + opacity-0.55 on muted (double-dim). Now single. */}
          <h2
            className="text-xs tracking-[0.08em] uppercase"
            style={{ fontWeight: 500, color: "var(--cinema-muted)" }}
          >
            Experience Journey
          </h2>

          <div className="space-y-12">
            {experienceJourney.map((job, index) => (
              <motion.div
                key={job.company}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.07 }}
                viewport={{ once: true, margin: "-40px" }}
                className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-12"
              >
                <div className="space-y-1">
                  {/* FIX: Was text-[10px] + opacity-0.55 — illegibly small + double-dimmed */}
                  <p
                    className="text-xs tracking-[0.08em] uppercase"
                    style={{ fontWeight: 500, color: "var(--cinema-muted)" }}
                  >
                    {job.period}
                  </p>
                  <div className="h-px w-8 bg-[var(--cinema-border)] my-2" />
                  <p
                    className="text-sm leading-[1.5]"
                    style={{ fontWeight: 500, color: "var(--cinema-white)", opacity: 0.9 }}
                  >
                    {job.company}
                  </p>
                  {/* FIX: Was opacity-0.55 on muted — double-dimmed */}
                  <p
                    className="text-xs leading-[1.5]"
                    style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
                  >
                    {job.role} · {job.location}
                  </p>
                </div>

                <ul className="space-y-2 pt-1">
                  {job.highlights.map((item) => (
                    <li
                      key={item}
                      className="text-sm leading-[1.7] flex gap-3"
                      style={{ fontWeight: 400, color: "var(--cinema-white)", opacity: 0.75 }}
                    >
                      <span style={{ color: "var(--cinema-muted)" }} className="shrink-0 mt-[0.35em]">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Technical Skills ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="border-t border-[var(--cinema-border)] pt-16 mb-16 space-y-10"
        >
          <h2
            className="text-xs tracking-[0.08em] uppercase"
            style={{ fontWeight: 500, color: "var(--cinema-muted)" }}
          >
            Technical Skills
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-10 gap-y-10">
            {skillGroups.map((group, index) => (
              <motion.div
                key={group.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                {/* FIX: Was text-[10px] + opacity-0.55 on muted. Bumped size and removed double-dim. */}
                <h3
                  className="text-xs tracking-[0.08em] uppercase"
                  style={{ fontWeight: 500, color: "var(--cinema-muted)" }}
                >
                  {group.label}
                </h3>
                <div className="h-px w-8 bg-[var(--cinema-border)]" />
                <div className="flex flex-col gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs leading-[1.5] border border-[var(--cinema-border)] px-2 py-0.5 inline-block"
                      style={{ fontWeight: 400, color: "var(--cinema-white)", opacity: 0.85 }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── Languages ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="border-t border-[var(--cinema-border)] pt-16 mb-16 space-y-10"
        >
          <h2
            className="text-xs tracking-[0.08em] uppercase"
            style={{ fontWeight: 500, color: "var(--cinema-muted)" }}
          >
            Languages
          </h2>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            {languages.map((lang) => (
              <div key={lang.name} className="space-y-1">
                <p
                  className="text-base leading-[1.4]"
                  style={{ fontWeight: 400, color: "var(--cinema-white)", opacity: 0.85 }}
                >
                  {lang.name}
                </p>
                {/* FIX: Was text-[10px] + opacity-0.55 on muted */}
                <p
                  className="text-xs tracking-[0.08em] uppercase"
                  style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
                >
                  {lang.level}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Interests ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="border-t border-[var(--cinema-border)] pt-16 mb-16 space-y-10"
        >
          <h2
            className="text-xs tracking-[0.08em] uppercase"
            style={{ fontWeight: 500, color: "var(--cinema-muted)" }}
          >
            Interests
          </h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
            {[
              {
                label: "Outside Engineering",
                items: [
                  "Cricket — following Test matches more than T20",
                  "Reading: systems thinking, decision-making, design history",
                  "Long walks — most architecture ideas arrive mid-walk",
                  "Cooking: the process as much as the result",
                ],
              },
              {
                label: "Inside Engineering",
                items: [
                  "Developer tooling that changes behaviour without mandates",
                  "Accessibility as a design constraint, not a checklist",
                  "The intersection of AI and engineering workflows",
                  "How organisations adopt (or resist) technical change",
                ],
              },
              {
                label: "Currently Reading / Watching",
                items: [
                  "The Design of Everyday Things — Don Norman",
                  "Thinking in Systems — Donella Meadows",
                  "Anything on the history of the web platform",
                ],
              },
              {
                label: "Side Curiosities",
                items: [
                  "How LLMs fail — edge cases more than capabilities",
                  "Exploring different AI tools — what they're actually good at",
                  "Typography and why it matters in UI",
                  "Urban design and how cities shape behaviour",
                ],
              },
            ].map((section) => (
              <div key={section.label} className="space-y-4">
                <h3
                  className="text-xs tracking-[0.08em] uppercase"
                  style={{ fontWeight: 500, color: "var(--cinema-muted)" }}
                >
                  {section.label}
                </h3>
                <div className="h-px w-8 bg-[var(--cinema-border)]" />
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm leading-[1.6] flex gap-3"
                      style={{ fontWeight: 400, color: "var(--cinema-white)", opacity: 0.75 }}
                    >
                      <span style={{ color: "var(--cinema-muted)" }} className="shrink-0 mt-[0.35em]">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Background / Context */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="border-t border-[var(--cinema-border)] pt-16 space-y-12"
        >
          <h2
            className="text-xs tracking-[0.08em] uppercase"
            style={{ fontWeight: 500, color: "var(--cinema-muted)" }}
          >
            Context
          </h2>

          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                label: "Formation",
                items: [
                  "B.E. in Computer Engineering",
                  "M.Tech — Ramrao Adik Institute of Technology (D.Y. Patil University)",
                  "Research focus: AI × developer tooling",
                  "9 years engineering, 8 years in Angular (v2 through v21)",
                ],
              },
              {
                label: "Current Work",
                items: [
                  "Senior Frontend Engineer, Ten Lifestyle Group",
                  "Frontend architecture & tech lead",
                  "500+ component library, 3-tier SCSS theming system",
                  "Multi-tenant SPA serving global enterprise clients",
                ],
              },
              {
                label: "Building",
                items: [
                  "angular-vitest-gen CLI (v3.1) — AI-powered test generation",
                  "Playwright + axe-core accessibility automation",
                  "Farelo — AI travel budget estimator (React + FastAPI)",
                  "Internal AI tooling experiments with Groq API",
                ],
              },
              {
                label: "Exposure Beyond Frontend",
                items: [
                  "Backend: NestJS, FastAPI, MySQL, MongoDB",
                  "DevOps: GitHub Actions, Docker, AWS, Vercel, TeamCity",
                  "AI: LLM tooling, Groq API, GitHub Copilot, Claude",
                  "Will do backend when needed — frontend is the primary focus",
                ],
              },
            ].map((section) => (
              <div key={section.label} className="space-y-4">
                {/* FIX: Was text-[10px] + opacity-0.55 on muted throughout Context section */}
                <h3
                  className="text-xs tracking-[0.08em] uppercase"
                  style={{ fontWeight: 500, color: "var(--cinema-muted)" }}
                >
                  {section.label}
                </h3>
                <div className="h-px w-8 bg-[var(--cinema-border)]" />
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm leading-[1.6]"
                      style={{ fontWeight: 400, color: "var(--cinema-white)", opacity: 0.75 }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}