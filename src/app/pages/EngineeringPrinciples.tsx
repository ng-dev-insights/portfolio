import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useCallback } from "react";
import { Link } from "react-router";

interface Principle {
  statement: string;
  explanation: string;
  artifacts: string[];
  relatedWork?: string;
}

export function EngineeringPrinciples() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const itemRefs = useRef<Record<number, HTMLElement | null>>({});

  // FIX: Removed expandedIndex from deps — uses functional updater to avoid stale closure
  // and prevent all items re-rendering on every toggle.
  const handleToggle = useCallback((index: number) => {
    setExpandedIndex((prev) => {
      const isOpening = prev !== index;
      if (isOpening) {
        setTimeout(() => {
          const el = itemRefs.current[index];
          if (el) {
            const navHeight = 88;
            const top = el.getBoundingClientRect().top + window.scrollY - navHeight - 24;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }, 80);
        return index;
      }
      return null;
    });
  }, []);

  const principles: Principle[] = [
    {
      statement: "Good architecture removes future decisions.",
      explanation:
        "The best systems make the right choice the easy choice. When architecture is well-designed, teams naturally follow patterns that scale. Poor architecture forces every decision to be debated every time. Great architecture makes most decisions automatic — because the structure makes the wrong choice harder than the right one.",
      artifacts: ["Design system with smart defaults", "Type-safe API contracts", "Automated testing frameworks", "Standardized deployment pipelines"],
      relatedWork: "Angular Modernization at Scale",
    },
    {
      statement: "Developer experience is a product.",
      explanation:
        "Internal tools deserve the same design thinking as customer-facing products. When developers love their tools, they build better software faster. Poor DX compounds into technical debt and attrition. Great DX compounds into velocity and quality. The angular-vitest-gen CLI exists because of this principle — not to automate tests, but to remove the cost of starting one.",
      artifacts: ["CLI tools with intelligent defaults", "Interactive documentation", "Automated error diagnostics", "One-command setups"],
      relatedWork: "AI-Powered Test Generation CLI",
    },
    {
      statement: "Accessibility is a system.",
      explanation:
        "Treating accessibility as individual feature work guarantees failure. It must be built into components, enforced by tooling, measured in CI/CD, and understood by every engineer. Accessibility isn't a checkbox — it's a fundamental quality metric. When accessibility breaks, it breaks predictably. When it's built in, it's invisible — which is exactly what it should be.",
      artifacts: ["Accessible component library", "Automated accessibility testing (axe-core)", "Keyboard navigation contracts", "CI/CD accessibility gates"],
      relatedWork: "Enterprise Accessibility System",
    },
    {
      statement: "Standards create freedom.",
      explanation:
        "Paradoxically, constraints enable creativity. When basic patterns are standardized, engineers spend less time debating and more time building. Standards remove cognitive load from trivial decisions. The team that has resolved 'how do we handle state?' can focus entirely on 'what should this state represent?'. DRY is not just a style preference — duplicated logic is a bundle size tax, a test surface tax, and a cognitive load tax simultaneously.",
      artifacts: ["Provider placement rules", "Coding standards doc", "Architecture decision records", "DRY enforcement in review"],
    },
    {
      statement: "Documentation scales teams.",
      explanation:
        "I learned this the hard way during upgrade and performance work: the fix was not enough if the reasoning stayed in my head. Provider placement rules, bundle-analysis notes, and rejected migration paths had to become visible artifacts so the next engineer could make the same decision without reopening the whole investigation. Great documentation records the decision, the trade-offs, and the path not taken.",
      artifacts: ["Self-documenting APIs", "Architecture decision logs", "Onboarding runbooks", "RFC templates"],
    },
    {
      statement: "Automation removes repetition.",
      explanation:
        "Any task performed more than twice should be automated. Humans are unreliable at repetitive work — not through lack of care, but because repetition is not what human attention is built for. AI has raised the ceiling on this: writing boilerplate tests, generating component scaffolding, drafting remediation plans — these are now automation targets, not manual tasks.",
      artifacts: ["AI-assisted test generation", "CI/CD pipelines", "Code generation tooling", "Automated monitoring"],
      relatedWork: "Playwright E2E Parallelisation",
    },
    {
      statement: "Performance begins before code.",
      explanation:
        "Bundle size doesn't grow overnight — it accumulates through individually reasonable decisions that nobody audited together. NgRx providers in main.ts. A CommonJS dependency on the critical path. A utility loaded at app init instead of at the route that needs it. Each choice is defensible in isolation. Together they compound into 12.8MB. Performance is a design constraint, not a post-launch audit.",
      artifacts: ["source-map-explorer audits", "Router-level provider placement", "ESM-only dependency policy", "Lazy loading at route boundaries"],
      relatedWork: "Application Performance Overhaul",
    },
    {
      statement: "Systems thinking beats hero engineering.",
      explanation:
        "The strongest work I have done was not a single impressive feature. It was the tooling and standards that changed what other engineers did by default: accessibility checks in CI, route-level provider rules, token-based theming, and test generation that removed the cost of starting. That is the difference between solving a problem once and making the problem harder to reintroduce.",
      artifacts: ["Reusable component libraries", "Shared tooling platforms", "Mentorship structures", "Knowledge sharing infrastructure"],
    },
    {
      statement: "Complexity is expensive. Pay it consciously.",
      explanation:
        "A 12.8MB bundle is what happens when complexity arrives one reasonable decision at a time. A CommonJS dependency here, a provider at bootstrap there, a utility loaded too early because it was convenient. None of those choices looked reckless alone. Together they became load cost, review cost, and debugging cost. Complexity is not forbidden, but it needs a receipt.",
      artifacts: ["Minimal dependency graphs", "Convention over configuration", "Explicit over clever", "Deleted code over maintained code"],
    },
    {
      statement: "Feedback loops determine velocity.",
      explanation:
        "The faster you learn if something works, the faster you can iterate. Long feedback loops kill momentum more reliably than any technical problem. Great engineering systematically shortens the time between intention and validation — at every level, from local test runs to production monitoring.",
      artifacts: ["Fast test execution (Vitest)", "Feature flags", "Incremental rollouts", "Real-time monitoring"],
      relatedWork: "Testing Infrastructure Modernisation",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[var(--cinema-black)] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 space-y-5"
        >
          {/* FIX: Was opacity-50 on muted (double-dimmed). Now single color token. */}
          <p
            className="text-xs tracking-[0.08em] uppercase"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            Beliefs That Guide Decisions
          </p>

          <h1
            className="text-[clamp(3rem,8vw,6rem)] tracking-tight leading-[0.92]"
            style={{ fontWeight: 700, color: "var(--cinema-white)", letterSpacing: "-0.03em" }}
          >
            Engineering<br />Principles
          </h1>

          <div className="h-px w-16 bg-[var(--cinema-accent)] opacity-60" />

          {/* FIX: Was opacity-65 on muted (double-dimmed) */}
          <p
            className="text-[clamp(1rem,2vw,1.25rem)] leading-[1.7] max-w-2xl"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            Ten beliefs, formed through consequence. Each connects to real work where it was tested.
          </p>
        </motion.div>

        {/* Principles list */}
        <div className="space-y-0">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              ref={(el) => { itemRefs.current[index] = el; }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-80px" }}
              className="border-b border-[var(--cinema-border)]"
            >
              <button
                onClick={() => handleToggle(index)}
                className="w-full text-left py-8 md:py-10 group"
                aria-expanded={expandedIndex === index}
              >
                <div className="flex items-start gap-8 md:gap-12">
                  <h2
                    className="flex-1 text-[clamp(1.25rem,3vw,2.25rem)] leading-[1.2] tracking-tight group-hover:text-[var(--cinema-accent)] transition-colors duration-300"
                    style={{
                      fontWeight: 600,
                      color: "var(--cinema-white)",
                      letterSpacing: "-0.025em",
                    }}
                  >
                    {principle.statement}
                  </h2>

                  <motion.div
                    animate={{ rotate: expandedIndex === index ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 pt-2 transition-opacity duration-300"
                    style={{
                      color: "var(--cinema-accent)",
                      opacity: expandedIndex === index ? 1 : 0.5,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="1.5" />
                      <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                  </motion.div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {expandedIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    {/*
                      FIX: Replaced arbitrary pl-[calc(2rem+3rem)] with a value that
                      actually aligns with the grid: number col (w-8=2rem) + gap (gap-8=2rem)
                    */}
                    <div className="pb-14 space-y-8 max-w-3xl">
                      <p
                        className="text-[0.975rem] leading-[1.7]"
                        style={{ fontWeight: 400, color: "var(--cinema-white)", opacity: 0.85 }}
                      >
                        {principle.explanation}
                      </p>

                      <div className="grid sm:grid-cols-2 gap-3">
                        {principle.artifacts.map((artifact, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-1 h-1 shrink-0 rounded-full bg-[var(--cinema-accent)]" style={{ opacity: 0.7 }} />
                            {/* FIX: Was opacity-0.6 on the whole row */}
                            <p
                              className="text-xs tracking-wide"
                              style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
                            >
                              {artifact}
                            </p>
                          </div>
                        ))}
                      </div>

                      {principle.relatedWork && (
                        <div className="pt-2">
                          <Link to="/work">
                            <span
                              className="text-xs tracking-[0.06em] uppercase hover:opacity-100 transition-opacity duration-300"
                              style={{ color: "var(--cinema-accent)", opacity: 0.75 }}
                            >
                              See in practice: {principle.relatedWork} →
                            </span>
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}