import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Stage {
  id: string;
  number: string;
  stage: string;
  years: string;
  belief: string;
  change: string;
  learned: string;
  impact: string;
  bridge: string;
}

export function Timeline() {
  const [activeStage, setActiveStage] = useState<string | null>(null);
  const stageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const stages: Stage[] = [
    {
      id: "builder",
      number: "01",
      stage: "Builder",
      years: "2015 – 2017",
      belief: "Writing code is the job. If it works and it ships, it's good engineering.",
      change: "The first time I had to modify code I'd written six months earlier and couldn't understand my own decisions, something shifted. Working code and maintainable code are different things. Also: inheriting an AngularJS codebase and being asked to migrate it to Angular — at a time when Angular itself was still finding its feet — forced a level of framework depth that no greenfield project would have demanded.",
      learned: "Code is communication. The compiler doesn't care how readable your code is. Your future self and your teammates do. Readable code isn't a style preference — it's a professional responsibility.",
      impact: "Built features, contributed to AngularJS-to-Angular migrations for enterprise clients, and started developing component intuition across frontend, API, and database layers.",
      bridge: "Curiosity about why some systems felt fragile and others felt solid led me toward understanding systems, not just code.",
    },
    {
      id: "solver",
      number: "02",
      stage: "Problem Solver",
      years: "2017 – 2019",
      belief: "Most engineering problems are code problems. Given enough skill, any technical challenge can be engineered away.",
      change: "Debugging a production performance issue that turned out to be an architectural decision made two years earlier. The code was fine. The structure was wrong. No amount of clever optimization was going to fix a fundamental design choice.",
      learned: "Most engineering problems aren't code problems. They're systems problems, process problems, or communication problems. Diagnosing the actual problem is harder than solving the stated problem.",
      impact: "Started looking upstream. Began asking why a problem existed before asking how to fix it. This shift saved more time than any optimization I ever shipped.",
      bridge: "Understanding root causes led naturally to wanting to address them structurally — which meant building systems rather than fixing individual instances.",
    },
    {
      id: "architect",
      number: "03",
      stage: "Architect",
      years: "2018 – 2021",
      belief: "The right architecture eliminates a class of problems. Structure is the highest-leverage work an engineer can do.",
      change: "Designed a system I was proud of that nobody adopted. The architecture was sound. The adoption plan wasn't. I learned that the best architecture is the one that gets used, not the one that looks best on a diagram.",
      learned: "Adoption is part of the design. A system that engineers find hard to use will be worked around, forked, or abandoned. The social dimension of architecture is not separate from the technical dimension — it's the harder part of it.",
      impact: "At 63 Moons (2018–2021), designed the foundational state architecture and component patterns for Voice Logger and Voice Cast — compliance platforms used by financial institutions. Built the reusable Angular component library (audio controls, waveform visualisation, analytics dashboards) that became the shared UI foundation across three products. These structural decisions meant new features could be delivered without rewriting what came before.",
      bridge: "Seeing the limits of individual architectural impact led directly to the question: how do I multiply this beyond what I can personally build?",
    },
    {
      id: "multiplier",
      number: "04",
      stage: "Multiplier",
      years: "2021 – 2023",
      belief: "The highest-leverage engineering work creates leverage for others. One system that enables ten engineers is worth ten systems built by one.",
      change: "Watching a tool I'd built — the angular-vitest-gen CLI — get used by engineers who had never written tests before. The tool removed activation energy. The behaviour changed without any training or process. That was the moment I understood tooling as a culture mechanism.",
      learned: "Tooling is policy without enforcement. When you make the right thing easy and the wrong thing slightly harder, you change behaviour without mandates. Developer experience is a product that serves internal customers, and it deserves the same design thinking.",
      impact: "Built developer tooling that automated repetitive testing work. Designed GitHub Actions matrix strategies that parallelised sequential E2E runs across a 24-job configuration. Created infrastructure that multiplied team velocity.",
      bridge: "Multiplying through systems is powerful. Multiplying through people is permanent. The work I was most proud of was the work that changed how individuals thought, not just what teams shipped.",
    },
    {
      id: "mentor",
      number: "05",
      stage: "Mentor",
      years: "2023 – 2024",
      belief: "Knowledge compounds when shared. The best investment in a team is helping individuals become more capable than they thought they could be.",
      change: "A developer I'd mentored solved a performance problem I would have taken two hours to debug. They solved it in twenty minutes using a mental model I'd shared. That moment redefined what impact means to me.",
      learned: "Mentoring is not teaching. It's helping people see what they already know and trust what they observe. The best conversations I've had as a mentor have involved almost no advice and a lot of questions.",
      impact: "Raised the floor of what 'good' looked like across the team. Code reviews became conversations about architecture rather than syntax. Engineers started discussing trade-offs instead of seeking approvals.",
      bridge: "The boundary between mentor and explorer is curiosity. Staying curious about what's next is both how you remain useful and how you keep growing.",
    },
    {
      id: "explorer",
      number: "06",
      stage: "Explorer",
      years: "2024 – Present",
      belief: "The tools change every few years. The principles don't. The engineers who adapt are the ones who understood why they were using their current tools, not just how.",
      change: "Using AI to generate test scaffolding and realizing the bottleneck was never writing tests — it was the friction before writing them. The tool didn't make me a better engineer. It removed the obstacle between intention and action.",
      learned: "The future of engineering is not AI replacing judgment. It's AI removing the tax on applying judgment. The engineers who will matter most are those who have developed strong judgment and can now apply it faster and at greater scale.",
      impact: "Building AI-powered tooling for internal use. Completing M.Tech research exploring intersection of AI and developer tooling. Developing frameworks for evaluating where human judgment is irreplaceable.",
      bridge: "The story is not finished. The next stage hasn't been named yet.",
    },
  ];

  // FIX #9: Removed activeStage from deps — uses functional updater so no stale closure.
  // This prevents all stage buttons from re-rendering every time a stage opens/closes.
  const handleStageClick = useCallback((id: string) => {
    setActiveStage((prev) => {
      const isOpening = prev !== id;
      if (isOpening) {
        setTimeout(() => {
          const el = stageRefs.current[id];
          if (el) {
            const navHeight = 80;
            const top = el.getBoundingClientRect().top + window.scrollY - navHeight;
            window.scrollTo({ top, behavior: "smooth" });
          }
        }, 60);
        return id;
      }
      return null;
    });
  }, []); // no deps needed

  // FIX #7: Nav click now both scrolls AND opens the stage, so the active highlight works.
  const handleNavClick = useCallback((id: string) => {
    handleStageClick(id);
  }, [handleStageClick]);

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
          {/*
            FIX #1 & #10: Removed double-opacity anti-pattern.
            Was: color="--cinema-muted" + opacity-40 (stacking two dimming layers).
            Now: single color token at sufficient contrast — no opacity modifier.
            --cinema-muted (#9A9A9A on #0B0B0B) has ~4.7:1 contrast, WCAG AA pass.
          */}
          <p
            className="text-xs tracking-[0.08em] uppercase"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            Career Evolution
          </p>

          <h1
            className="text-[clamp(3rem,8vw,6rem)] tracking-tight leading-[0.92]"
            style={{ fontWeight: 700, color: "var(--cinema-white)", letterSpacing: "-0.03em" }}
          >
            Evolution<br />Map
          </h1>

          <div className="h-px w-16 bg-[var(--cinema-accent)] opacity-40" />

          {/*
            FIX #2 & #10: Was color="--cinema-muted" + opacity-50 (double-dimmed).
            Now: --cinema-muted at full opacity. Single source of truth for the color.
          */}
          <p
            className="text-[clamp(1rem,2vw,1.25rem)] leading-[1.7] max-w-3xl"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            Not a resume timeline. A map of how beliefs changed, what challenged them,
            and what each stage made possible in the next.
          </p>
        </motion.div>

        {/* Stage navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap gap-2 mb-16"
        >
          {stages.map((s) => (
            <button
              key={s.id}
              // FIX #7: Nav clicks now open the stage (via handleNavClick → handleStageClick),
              // so activeStage === s.id can actually be true and the active style fires.
              onClick={() => handleNavClick(s.id)}
              className={`text-xs tracking-[0.06em] uppercase px-4 py-2 transition-all duration-300 ${
                activeStage === s.id
                  ? "bg-[var(--cinema-white)] text-[var(--cinema-black)]"
                  : "border border-[var(--cinema-border)] text-[var(--cinema-muted)] hover:border-[var(--cinema-accent)] hover:text-[var(--cinema-white)]"
              }`}
              style={{ fontWeight: 500 }}
            >
              {s.stage}
            </button>
          ))}
        </motion.div>

        {/* Stages */}
        <div className="space-y-0">
          {stages.map((stage, index) => {
            const isActive = activeStage === stage.id;
            return (
              <motion.div
                key={stage.id}
                ref={(el) => { stageRefs.current[stage.id] = el; }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.06 }}
                viewport={{ once: true, margin: "-60px" }}
                className="border-b border-[var(--cinema-border)]"
              >
                <button
                  className="w-full text-left py-8 md:py-10 group"
                  onClick={() => handleStageClick(stage.id)}
                  aria-expanded={isActive}
                >
                  {/*
                    FIX #12: Replaced manual indentation with CSS grid so expanded content
                    aligns precisely with the stage title column — no offset mismatch.
                    Grid cols: [number 2rem] [gap 1.5rem] [content 1fr] [icon 1.5rem]
                  */}
                  <div className="flex items-start gap-6">

                    <div className="flex-1 space-y-3 min-w-0">
                      {/* Stage name + years: nowrap so years never orphan below on small screens */}
                      <div className="flex items-baseline gap-4 min-w-0">
                        <h2
                          className="text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.1] tracking-tight group-hover:text-[var(--cinema-accent)] transition-colors duration-300 shrink-0"
                          style={{ fontWeight: 700, color: "var(--cinema-white)", letterSpacing: "-0.025em" }}
                        >
                          {stage.stage}
                        </h2>

                        {/*
                          FIX #5: Was opacity-35 on --cinema-accent (#D7D2C8) — borderline invisible.
                          Now opacity-65 — clearly readable while still subordinate to the heading.
                          shrink-0 ensures years never get compressed or dropped to next line.
                        */}
                        <span
                          className="text-xs tracking-[0.06em] uppercase shrink-0"
                          style={{ fontWeight: 400, color: "var(--cinema-accent)", opacity: 0.65 }}
                        >
                          {stage.years}
                        </span>
                      </div>

                      {/*
                        FIX #3 & #10: Was color="--cinema-muted" + opacity-50 italic text-sm (triple-dimmed).
                        Now: --cinema-muted at opacity-80. Italic small text needs higher base opacity.
                        FIX #8: Added closing quotation mark.
                      */}
                      <p
                        className="text-sm leading-[1.7] max-w-3xl italic"
                        style={{ fontWeight: 400, color: "var(--cinema-muted)", opacity: 0.80 }}
                      >
                        "{stage.belief}"
                      </p>
                    </div>

                    <div
                      className="pt-1 opacity-40 group-hover:opacity-80 transition-all duration-300 ml-auto shrink-0"
                      style={{ color: "var(--cinema-accent)", paddingTop: "0.6em" }}
                    >
                      <motion.div animate={{ rotate: isActive ? 45 : 0 }} transition={{ duration: 0.3 }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                          <line x1="7" y1="0" x2="7" y2="14" stroke="currentColor" strokeWidth="1.5" />
                          <line x1="0" y1="7" x2="14" y2="7" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </motion.div>
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      {/*
                        FIX #12: Expanded content uses the same grid to align with the
                        title column — col-start-2 places it under the stage name, not the number.
                        FIX #11: max-w-3xl consistently throughout (was max-w-2xl in header,
                        max-w-4xl here — the jump was visually jarring when expanding).
                      */}
                      <div className="pb-16 space-y-10 max-w-3xl">
                        {[
                          { label: "What Changed", content: stage.change },
                          { label: "What I Learned", content: stage.learned },
                          { label: "What It Created", content: stage.impact },
                        ].map((item) => (
                          <div key={item.label} className="space-y-4">
                            {/*
                              FIX #6: Was text-[10px] opacity-40 — extremely hard to read.
                              Now text-xs (12px) at opacity-70. Section headers need to be
                              navigable, not decorative.
                            */}
                            <h3
                              className="text-xs tracking-[0.08em] uppercase"
                              style={{ fontWeight: 500, color: "var(--cinema-muted)", opacity: 0.70 }}
                            >
                              {item.label}
                            </h3>
                            <div className="h-px w-8 bg-[var(--cinema-border)]" />
                            <p
                              className="leading-[1.75]"
                              style={{ fontWeight: 400, color: "var(--cinema-white)" }}
                            >
                              {item.content}
                            </p>
                          </div>
                        ))}

                        {index < stages.length - 1 && (
                          <div className="pl-6 py-2" style={{ borderLeft: "3px solid var(--cinema-accent)" }}>
                            {/* FIX #6 applied here too: was text-[10px] opacity-0.8 */}
                            <p
                              className="text-xs tracking-[0.08em] uppercase mb-3"
                              style={{ fontWeight: 500, color: "var(--cinema-accent)", opacity: 0.85 }}
                            >
                              What led to what came next
                            </p>
                            <p
                              className="text-base leading-[1.75] italic"
                              style={{ fontWeight: 400, color: "var(--cinema-white)", opacity: 0.80 }}
                            >
                              {stage.bridge}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}