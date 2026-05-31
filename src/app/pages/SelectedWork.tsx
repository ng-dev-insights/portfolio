import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";

interface WorkArtifact {
  number: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  decision: string;
  outcome: string;
  impact: string;
  ripple: string;
  tradeoff: string;
  tags: string[];
}

export function SelectedWork() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const itemRefs = useRef<Record<number, HTMLElement | null>>({});

  const works: WorkArtifact[] = [
    {
      number: "01",
      title: "Angular Modernization at Scale",
      category: "Platform Architecture",
      summary: "A phased migration from Angular v15 to v21 for a 500+ component enterprise platform serving global concierge clients.",
      problem: "A large-scale Angular platform with years of accumulated patterns was blocking new capabilities. Outdated lifecycle hooks, deprecated APIs, and mismatched module strategies made routine work expensive. The platform served global enterprise clients at scale — any disruption had real consequences.",
      decision: "Phased, zero-downtime migration adopting standalone component architecture, modern control flow syntax (@if / @for / @defer), inject()-based DI, and esbuild tooling — all while maintaining backward compatibility across active enterprise client deployments. No big-bang rewrites. Every step had a rollback plan.",
      outcome: "Successfully migrated from Angular v15 to v21 with zero downtime across enterprise deployments. Build feedback moved from legacy webpack-era waits toward faster esbuild-based iteration. Bundle size: ~12.8MB initial → optimized through route lazy-loading and dependency pruning. Standalone components enable future feature velocity.",
      impact: "Unblocked client feature delivery. Removed years of technical debt without disrupting live enterprise environments. Teams shipped faster with confidence.",
      ripple: "The migration playbook became a reference document for the wider platform team. The patterns adopted here influenced how version upgrades were approached going forward. Having worked across Angular v1 through v21 over the course of a career meant the trade-offs at each version were understood, not guessed.",
      tradeoff: "We chose gradual migration over a full rewrite. It took longer — but at enterprise scale with live client environments, a phased approach with rollback at every step was the only responsible choice. Speed would have meant risk. We chose confidence.",
      tags: ["Angular", "Migration", "Enterprise", "Architecture"],
    },
    {
      number: "02",
      title: "Enterprise Accessibility System",
      category: "Accessibility Engineering",
      summary: "Built accessibility compliance infrastructure from scratch — automated testing, component-level standards, and CI/CD enforcement.",
      problem: "Accessibility was treated as a post-launch checkbox. Issues were discovered through complaints, not prevention. The platform had no systematic approach to testing, no shared standards, and accessibility debt scattered across a large component library.",
      decision: "Playwright + axe-core in CI, component-level ARIA contracts, SCSS safeguard tests (iOS prevention), documented exception handling for known false positives.",
      outcome: "Accessibility embedded in workflow. New components ship accessible by default. Regressions caught before merge.",
      impact: "Regressions prevented before merge. Compliance overhead removed from client-facing conversations. Engineers build with accessibility as a constraint, not an afterthought.",
      ripple: "axe-core CI pattern adopted across project streams. SCSS safeguard approach became documented standard.",
      tradeoff: "We chose enforcement over education. Embedding accessibility into CI meant engineers couldn't bypass it — but it also meant some friction on teams unfamiliar with ARIA patterns. We accepted that friction because the alternative was continued inconsistency.",
      tags: ["Accessibility", "axe-core", "Playwright", "CI/CD"],
    },
    {
      number: "03",
      title: "White-Label Theming Architecture",
      category: "Design System",
      summary: "Designed a 3-tier SCSS theming system that supports global enterprise client brands from a single codebase.",
      problem: "Each client required a distinct visual identity — logo, brand colours, typography, component overrides. The naive approach meant duplicating UI logic or managing divergent codebases. Neither scaled to the growing roster of enterprise clients.",
      decision: "CSS custom property cascades with a 3-tier SCSS token layer (backend override → client config → default fallback). Each client theme overrides only what diverges. Component styles reference tokens, never hard-coded values. A validation layer prevents theme breakage during Angular Material upgrades.",
      outcome: "Single source of truth for all themes. Estimated client onboarding shifted from weeks to days by eliminating per-client UI forks. Theme updates propagate without component changes.",
      impact: "Revenue-generating feature unlocked at scale. Sales could promise custom branding. Engineering could deliver it without bespoke work per client.",
      ripple: "Token layer pattern became default for all new components. Reduced theming-related support overhead.",
      tradeoff: "CSS custom property cascades over compile-time SCSS maps. Runtime flexibility came at the cost of slightly more complex debugging. For a multi-client platform, the flexibility was worth the debugging overhead.",
      tags: ["SCSS", "Design Tokens", "White-Label", "Angular Material"],
    },
    {
      number: "04",
      title: "Application Performance Overhaul",
      category: "Frontend Performance",
      summary: "Inherited a 12.8MB Angular bundle. Diagnosed every root cause, designed the full remediation plan, refactored the architecture, and wrote the coding standards that prevent it happening again.",
      problem: "12.8MB bundle with root causes: NgRx booting entire state layer on startup, CommonJS deps on critical path, no lazy loading, duplicated code. No architectural standards to prevent recurrence.",
      decision: "Route-level NgRx providers, eliminate CommonJS deps, lazy load all routes, refactor duplicated code (DRY), document coding standards. Phased approach with independent validation at each step.",
      outcome: "Bundle reduced from 12.8MB to ~4.2MB (67% reduction). Bootstrap time improved 340ms → 89ms. State layer now loads per-route, not at startup. Coding standards document became living governance — new features validated against standards before merge.",
      impact: "Users experience a meaningfully faster application. Engineers have a clear standard for where providers live and how dependencies are imported. Architecture discussions now start from a defined baseline rather than guesswork.",
      ripple: "Performance methodology became the team's standard approach. Bundle discipline shifted engineer mindset: they now think about load cost at dependency-selection time, not after damage is done.",
      tradeoff: "We chose phased, auditable remediation over a big-bang rewrite. Each phase was independently verifiable, which meant more coordination overhead — but it kept the platform deployable throughout. The alternative was a risky freeze of all feature work.",
      tags: ["Bundle Optimization", "Performance", "Architecture", "Coding Standards"],
    },
    {
      number: "05",
      title: "AI-Powered Test Generation CLI",
      category: "Developer Tooling",
      summary: "Built angular-vitest-gen — an AI CLI that generates production-quality Vitest unit tests from Angular component analysis.",
      problem: "Test coverage was low, inconsistently structured, and expensive to write. Engineers were avoiding tests not because they didn't value them, but because writing them for complex Angular components with signals, NgRx, and Material dependencies was genuinely laborious.",
      decision: "Built a CLI (angular-vitest-gen) using Groq's llama-3.3-70b-versatile that analyses component source, detects standalone vs module structure, resolves imports, validates computed signal behaviour, and generates test files with correct assertions. Post-write validation ensures output compiles.",
      outcome: "v3.1 production-ready. Generates Vitest tests for Angular 17+, signals, and typed mocks. Eliminates boilerplate friction.",
      impact: "Reduced the activation energy of writing tests. Engineers adopt it naturally because it meets them where they are rather than requiring a workflow change.",
      ripple: "Proved AI tooling can address real friction. Analysis→Generation→Validation pattern applied to other internal tools.",
      tradeoff: "AI generation with post-write validation versus purely template-based generation. AI produces better contextual tests — but requires validation to catch structural mistakes. The validation layer was the deciding architectural choice: don't trust the output, verify it.",
      tags: ["AI-Powered", "Vitest", "CLI", "Developer Tooling"],
    },
    {
      number: "06",
      title: "Testing Infrastructure Modernisation",
      category: "Testing Platform",
      summary: "Migrated from Jest to a Vitest-based infrastructure across a large Angular component library.",
      problem: "The existing Jest suite was slow to run and increasingly painful to maintain on newer Angular modules. Developers were finding workarounds, committing with local bypasses, and treating tests as a box-ticking exercise. The infrastructure was creating friction rather than removing it.",
      decision: "Migrated updated modules to Vitest with parallel execution and deterministic environments. Flaky tests were quarantined and rewritten with stable async patterns. Smart test selection reduced unnecessary runs on unchanged modules.",
      outcome: "Test execution time dropped. Flake near-eliminated. Coverage became systematic as friction disappeared.",
      impact: "Tests went from being avoided to being the default. PR pipelines became trustworthy. Teams stopped debating whether to run tests and focused on what to test.",
      ripple: "Fast tests changed development loop. Engineers ran tests locally by default. Tooling shift caused cultural change no training could achieve.",
      tradeoff: "Gradual migration of modules over a full suite rewrite. Meant running two test frameworks simultaneously for a period — operational complexity in exchange for zero disruption to ongoing development. Teams continued shipping while the infrastructure changed underneath them.",
      tags: ["Test Optimization", "CI/CD", "Testing Framework"],
    },
    {
      number: "07",
      title: "Playwright E2E Parallelisation",
      category: "Engineering Infrastructure",
      summary: "Redesigned the GitHub Actions test matrix to run multi-client, multi-device E2E tests in parallel — replacing a slow sequential pipeline.",
      problem: "E2E tests for multi-client, multi-device configurations were running sequentially in a single GitHub Actions workflow. Long-running CI meant feedback arrived after context had switched. Release confidence suffered as coverage was intentionally kept thin to avoid pipeline pain.",
      decision: "GitHub Actions matrix strategy with parallel job sharding across a 24-job configuration covering client, environment, and device combinations. Each combination runs independently. Results aggregate into a single pass/fail gate. Failure isolation became possible for the first time.",
      outcome: "Sequential pipeline → concurrent runs. Failures isolated to specific client-device combinations.",
      impact: "Release cycles shortened. Actionable feedback while change is fresh. E2E coverage extensible without proportional cost.",
      ripple: "Matrix pattern became default for multi-tenant configs. Reduced barrier to thorough E2E coverage.",
      tradeoff: "24-job parallel matrix over a single comprehensive run. More parallel jobs means higher GitHub Actions concurrent runner cost. We accepted that cost because fast, isolated feedback was worth more than the infrastructure saving of sequential runs.",
      tags: ["E2E Testing", "GitHub Actions", "Infrastructure"],
    },
    {
      number: "08",
      title: "NgRx Signal Migration",
      category: "State Architecture",
      summary: "Led platform migration from async pipe patterns to toSignal() for NgRx store selects across a large Angular codebase.",
      problem: "The platform was mixing async pipe subscriptions, manual subscribe/unsubscribe patterns, and early signal experiments inconsistently. This created performance inconsistencies, memory leak risks, and made onboarding to the codebase harder than it needed to be.",
      decision: "Standardised on toSignal() for all NgRx store selects. Async pipe retained only for HTTP streams not yet in store. Established lint rules to enforce consistency. Documented the architectural reasoning to prevent regression.",
      outcome: "Consistent reactive pattern. Change detection simplified. Zone.js overhead reduced. Pattern becomes default naturally.",
      impact: "Reduced subscription-related bugs. Improved readability. Enabled signal-based optimizations.",
      ripple: "Decision raised baseline for state management discussions. Consistent reactivity reasoning across platform.",
      tradeoff: "Standardise on toSignal() or allow team preference. Standardisation meant enforcing a single pattern across a large existing codebase — migration effort upfront, but consistency and predictability long-term. Mixed patterns would have been easier short-term and created cognitive overhead forever.",
      tags: ["State Management", "Signal Migration", "Architecture"],
    },
  ];

  // FIX: Removed expandedIndex from deps — functional updater prevents stale closure
  // and stops all article buttons re-rendering on every expand/collapse.
  const handleToggle = useCallback((index: number) => {
    setExpandedIndex((prev) => {
      const isOpening = prev !== index;
      if (isOpening) {
        setTimeout(() => {
          const el = itemRefs.current[index];
          if (el) {
            const navHeight = 80;
            const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }, 60);
        return index;
      }
      return null;
    });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[var(--cinema-black)] pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 space-y-5"
        >
          {/* FIX: Was opacity-40 on muted (double-dimmed) */}
          <p
            className="text-xs tracking-[0.08em] uppercase"
            style={{ fontWeight: 400, color: "var(--cinema-muted)", letterSpacing: "0.08em" }}
          >
            Engineering Artifacts
          </p>

          <h1
            className="text-[clamp(3rem,8vw,6rem)] tracking-tight leading-[0.92]"
            style={{ fontWeight: 700, color: "var(--cinema-white)", letterSpacing: "-0.03em" }}
          >
            Selected Work
          </h1>

          <div className="h-px w-16 bg-[var(--cinema-accent)] opacity-40" />

          {/* FIX: Was opacity-60 on muted (double-dimmed) */}
          <p
            className="text-[clamp(1.125rem,2.5vw,1.4rem)] leading-[1.7] max-w-2xl"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            Eight engineering decisions with lasting consequences — plus two side projects
            built outside of work. Each entry covers the problem, the thinking, and what happened after.
          </p>
        </motion.div>

        {/* Artifacts */}
        <div className="space-y-0">
          {works.map((work, index) => (
            <motion.article
              key={work.title}
              ref={(el) => { itemRefs.current[index] = el; }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className="border-b border-[var(--cinema-border)]"
            >
              {/* Artifact Header */}
              <button
                onClick={() => handleToggle(index)}
                className="w-full text-left group"
                aria-expanded={expandedIndex === index}
              >
                <div className="py-8 md:py-10 space-y-3">
                  {/* Category label above — keeps number baseline-locked to title */}
                  <p
                    className="text-xs tracking-[0.08em] uppercase group-hover:opacity-80 transition-opacity duration-300 leading-none"
                    style={{ fontWeight: 400, color: "var(--cinema-accent)", letterSpacing: "0.08em", opacity: 0.6 }}
                  >
                    {work.category}
                  </p>
                  <div className="flex items-baseline gap-6 md:gap-10">

                    <h2
                      className="flex-1 text-[clamp(1.25rem,3vw,2rem)] leading-[1.2] group-hover:text-[var(--cinema-accent)] transition-colors duration-300"
                      style={{ fontWeight: 600, color: "var(--cinema-white)", letterSpacing: "-0.02em" }}
                    >
                      {work.title}
                    </h2>

                    <div
                      className="shrink-0 opacity-40 group-hover:opacity-80 transition-all duration-300 self-start pt-1"
                      style={{ color: "var(--cinema-accent)" }}
                    >
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>

                  {/* Summary + tags */}
                  <div className="space-y-3">
                    <p
                      className="text-sm leading-[1.7] max-w-2xl"
                      style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
                    >
                      {work.summary}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      {work.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] tracking-[0.06em] uppercase px-2.5 py-1 border border-[var(--cinema-border)]"
                          style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>

              {/* Expanded Detail */}
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    {/*
                      FIX: Replaced hardcoded pl-14 md:pl-20 with grid-aligned value.
                      number col (w-8=2rem) + gap (gap-6=1.5rem on mobile, gap-10=2.5rem on md)
                    */}
                    <div className="pb-16 space-y-0" style={{ paddingLeft: "calc(2rem + 1.5rem)" }}>
                      {/* FIX: Was text-[10px] + opacity-50 on muted */}
                      <p
                        className="text-xs tracking-[0.08em] uppercase mb-12"
                        style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
                      >
                        Chapter {work.number} — Full Account
                      </p>

                      <div className="grid md:grid-cols-2 gap-x-16 gap-y-12 max-w-5xl">
                        {[
                          { label: "The Problem", content: work.problem },
                          { label: "The Decision", content: work.decision },
                          { label: "The Outcome", content: work.outcome },
                          { label: "The Impact", content: work.impact },
                          { label: "The Tradeoff", content: work.tradeoff },
                        ].map((section) => (
                          <div key={section.label} className="space-y-4">
                            {/* FIX: Was text-[10px] + opacity-40 on muted — section headers must be readable */}
                            <h3
                              className="text-xs tracking-[0.08em] uppercase"
                              style={{ fontWeight: 500, color: "var(--cinema-muted)" }}
                            >
                              {section.label}
                            </h3>
                            <div className="h-px w-8 bg-[var(--cinema-border)]" />
                            <p
                              className="text-[0.95rem] leading-[1.7]"
                              style={{ fontWeight: 400, color: "var(--cinema-white)", opacity: 0.85 }}
                            >
                              {section.content}
                            </p>
                          </div>
                        ))}
                      </div>

                      {/* Ripple Effect */}
                      <div className="mt-12 max-w-5xl pl-8 py-2" style={{ borderLeft: "2px solid var(--cinema-accent)", borderLeftOpacity: 0.4 }}>
                        {/* FIX: Was text-[10px] + opacity-40 on accent */}
                        <h3
                          className="text-xs tracking-[0.08em] uppercase mb-4"
                          style={{ fontWeight: 500, color: "var(--cinema-accent)", opacity: 0.75 }}
                        >
                          The Ripple Effect
                        </h3>
                        {/* FIX: Was opacity-60 italic — italic body text needs higher opacity */}
                        <p
                          className="text-[0.95rem] leading-[1.7] italic max-w-3xl"
                          style={{ fontWeight: 400, color: "var(--cinema-white)", opacity: 0.80 }}
                        >
                          {work.ripple}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </div>

        {/* Side Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-0 border-t-2 border-[var(--cinema-border)]"
        >
          <div className="py-12 space-y-2">
            {/* FIX: Was opacity-50 on muted */}
            <p
              className="text-xs tracking-[0.08em] uppercase mb-10"
              style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
            >
              Side Projects
            </p>

            {/* Farelo */}
            <a
              href="https://www.farelo.in"
              target="_blank"
              rel="noopener noreferrer"
              className="block group border border-[var(--cinema-border)] hover:border-[var(--cinema-accent)] transition-all duration-300"
            >
              <div className="p-8 md:p-10 flex items-start justify-between gap-8">
                <div className="space-y-4 flex-1 min-w-0">
                  <div className="flex items-center gap-4">
                    <span
                      className="text-[10px] tracking-[0.08em] uppercase"
                      style={{ fontWeight: 500, color: "var(--cinema-accent)", opacity: 0.70 }}
                    >
                      React · FastAPI · AI
                    </span>
                    {/* FIX: Was opacity-25 on muted — invisible */}
                    <span
                      className="text-[10px] tracking-[0.06em] uppercase"
                      style={{ color: "var(--cinema-muted)", opacity: 0.55 }}
                    >
                      Live
                    </span>
                  </div>

                  <h2
                    className="text-[clamp(1.25rem,3vw,2rem)] leading-[1.2] tracking-tight group-hover:text-[var(--cinema-accent)] transition-colors duration-300"
                    style={{ fontWeight: 600, color: "var(--cinema-white)", letterSpacing: "-0.02em" }}
                  >
                    Farelo — AI Travel Budget Estimator
                  </h2>

                  {/* FIX: Was opacity-60 on muted */}
                  <p
                    className="text-sm leading-[1.7] max-w-2xl"
                    style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
                  >
                    Free, instant travel budget breakdowns with no login required.
                    Built with a hybrid AI/deterministic pricing engine — React + Vite frontend,
                    FastAPI backend. Demonstrates the full-stack capability beyond just Angular.
                  </p>

                  <div className="grid sm:grid-cols-3 gap-8 pt-4 max-w-3xl">
                    {[
                      { label: "Problem", content: "Budget planning for trips requires scraping across 6–8 fragmented sources. Most tools require sign-up. Travelers abandon the research before they start." },
                      { label: "Decision", content: "Hybrid engine: LLM for fuzzy cost estimation where data is sparse, deterministic calculation where reliable pricing exists. FastAPI keeps latency predictable. No auth friction." },
                      { label: "Outcome", content: "Live at farelo.in. Produces itemised budgets in under 3 seconds. Zero-login UX. Proved a full-stack AI product can be solo-built and shipped in a weekend sprint." },
                    ].map(({ label, content }) => (
                      <div key={label} className="space-y-2">
                        {/* FIX: Was text-[10px] + opacity-40 on accent */}
                        <p className="text-xs tracking-[0.08em] uppercase" style={{ fontWeight: 500, color: "var(--cinema-accent)", opacity: 0.75 }}>{label}</p>
                        <div className="h-px w-6 bg-[var(--cinema-border)]" />
                        {/* FIX: Was opacity-60 on white */}
                        <p className="text-xs leading-[1.7]" style={{ fontWeight: 400, color: "var(--cinema-white)", opacity: 0.80 }}>{content}</p>
                      </div>
                    ))}
                  </div>

                  {/* FIX: Was opacity-50 on accent */}
                  <p
                    className="text-xs group-hover:opacity-90 transition-opacity duration-300"
                    style={{ color: "var(--cinema-accent)", opacity: 0.70 }}
                  >
                    farelo.in →
                  </p>
                </div>

                <svg
                  width="16" height="16" viewBox="0 0 16 16" fill="none"
                  className="opacity-45 group-hover:opacity-80 transition-opacity duration-300 shrink-0 mt-1"
                >
                  <path d="M3 13L13 3M13 3H6M13 3V10" stroke="var(--cinema-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </a>

            {/* angular-vitest-gen */}
            <div className="block border border-[var(--cinema-border)] mt-4">
              <div className="p-8 md:p-10 flex items-start justify-between gap-8">
                <div className="space-y-4 flex-1 min-w-0">
                  <div className="flex items-center gap-4">
                    <span
                      className="text-[10px] tracking-[0.08em] uppercase"
                      style={{ fontWeight: 500, color: "var(--cinema-accent)", opacity: 0.70 }}
                    >
                      Node.js · TypeScript · Groq API
                    </span>
                    {/* FIX: Was opacity-25 — invisible */}
                    <span
                      className="text-[10px] tracking-[0.06em] uppercase"
                      style={{ color: "var(--cinema-muted)", opacity: 0.55 }}
                    >
                      Personal Tool · v3.1
                    </span>
                  </div>

                  <h2
                    className="text-[clamp(1.25rem,3vw,2rem)] leading-[1.2] tracking-tight"
                    style={{ fontWeight: 600, color: "var(--cinema-white)", letterSpacing: "-0.02em" }}
                  >
                    angular-vitest-gen
                  </h2>

                  {/* FIX: Was opacity-60 on muted */}
                  <p
                    className="text-sm leading-[1.7] max-w-2xl"
                    style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
                  >
                    CLI I built for internal use that auto-generates Vitest unit tests for Angular
                    components, services, and directives using LLMs (Groq llama-3.3-70b-versatile).
                    Handles Angular Signals, standalone architecture, import path rules, and
                    post-write structural validation with retry logic.
                  </p>

                  {/* FIX: Was opacity-50 on muted */}
                  <p
                    className="text-xs"
                    style={{ color: "var(--cinema-muted)" }}
                  >
                    Built to solve real friction in the team's testing workflow
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="pt-24 flex flex-col sm:flex-row items-start sm:items-center gap-8"
        >
          {/* FIX: Was opacity-40 on muted */}
          <p
            className="text-sm"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            The principles that shaped these decisions —
          </p>
          <Link to="/principles">
            <motion.span
              whileHover={{ color: "var(--cinema-accent)", x: 4 }}
              className="text-sm tracking-[0.06em] uppercase transition-all duration-300"
              style={{ fontWeight: 500, color: "var(--cinema-white)" }}
            >
              Engineering Principles →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}