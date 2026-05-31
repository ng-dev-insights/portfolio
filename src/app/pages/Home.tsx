import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Chapter } from "../components/Chapter";
import { FinalScene } from "../components/FinalScene";

const chapters = [
  {
    number: 1,
    title: "The Builder",
    subtitle: "The year curiosity was enough.",
    narrative: "I thought writing code was the job.",
    visualDescription:
      "Every feature was a mystery to solve. Every bug was a puzzle. The feedback loop was pure: write, run, see. Nobody had told me yet that most of the hard problems wouldn't be in the code.",
    emotion: "Possibility",
    chapterKey: "builder",
  },
  {
    number: 2,
    title: "The Problem Solver",
    narrative: "Most engineering problems weren't code problems. They were systems problems.",
    visualDescription:
      "The production issue that changed everything wasn't a bug — it was a design decision made two years earlier by someone who'd since left. No amount of clever optimization was going to fix a structural choice. I learned to look upstream.",
    emotion: "Discovery",
    chapterKey: "solver",
  },
  {
    number: 3,
    title: "The Architect",
    narrative: "Building features stopped being interesting. Building systems became the challenge.",
    visualDescription:
      "I designed a system I was proud of that nobody used. The architecture was sound. The adoption plan didn't exist. The hardest lesson: the best architecture is the one that gets used, not the one that looks best on a diagram.",
    emotion: "Maturity",
    chapterKey: "architect",
  },
  {
    number: 4,
    title: "The Multiplier",
    narrative: "The biggest impact wasn't what I built. It was what others could build because of it.",
    visualDescription:
      "I watched a tool I'd built get used by engineers who had never written tests before. No training. No mandate. The tool removed the activation energy — and the behaviour changed. That was the moment I understood tooling as a culture mechanism.\n\nAccessibility checks became part of CI. The Angular migration framework became the pattern for future upgrades. The theming architecture became how new clients were onboarded. Developer tooling reduced repetitive work. Shared frontend standards reduced implementation variance. These weren't features — they were changes in how the platform grows.",
    emotion: "Scale",
    isCenter: true,
    chapterKey: "multiplier",
  },
  {
    number: 5,
    title: "The Mentor",
    narrative: "Knowledge compounds when shared.",
    visualDescription:
      "A developer I'd mentored solved a performance problem I'd have taken two hours to debug. They solved it in twenty minutes using a mental model I'd shared. That moment redefined what impact means to me.",
    emotion: "Connection",
    chapterKey: "mentor",
  },
  {
    number: 6,
    title: "The Explorer",
    narrative: "The tools change. The mission stays the same. Make engineering better.",
    visualDescription:
      "AI didn't change my job. It removed the boring parts. Writing tests. Drafting remediation plans. Reviewing patterns. What remains is the judgment — which problems to solve, how systems should grow, what matters. That part is still entirely human.\n\nWhat am I learning? How engineering judgment changes when AI handles execution. What assumptions about developer workflow no longer hold. What problems become interesting when the cost of implementation drops to near zero.",
    emotion: "Optimism",
    chapterKey: "explorer",
  },
];

export function Home() {
  const [hasStarted, setHasStarted] = useState(() => {
    try {
      return sessionStorage.getItem("journey-started") === "1";
    } catch {
      return false;
    }
  });

  const journeyRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const handleStart = () => {
    try { sessionStorage.setItem("journey-started", "1"); } catch {}
    setHasStarted(true);
  };

  const handleReturnToHero = () => {
    try { sessionStorage.removeItem("journey-started"); } catch {}
    setHasStarted(false);
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  };

  useEffect(() => {
    if (hasStarted && journeyRef.current) {
      setTimeout(() => {
        journeyRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 80);
    }
  }, [hasStarted]);

  return (
    <div className="w-full overflow-x-hidden">
      {!hasStarted ? (
        /* ── Hero ── */
        <div
          ref={heroRef}
          className="h-screen w-full flex flex-col justify-center px-8 md:px-16 bg-[var(--cinema-black)]"
        >
          <div className="max-w-5xl mx-auto w-full space-y-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <p
                className="text-[10px] tracking-[0.12em] uppercase"
                style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
              >
                Senior Frontend Engineer · Mumbai
              </p>

              <h1
                className="text-[clamp(3rem,9vw,5.5rem)] tracking-tight leading-[1]"
                style={{
                  fontWeight: 700,
                  color: "var(--cinema-white)",
                  letterSpacing: "-0.03em",
                }}
              >
                Sanket Bhor
              </h1>

              <p
                className="text-[clamp(1rem,2.5vw,1.5rem)] tracking-tight leading-[1.4] max-w-2xl mx-auto"
                style={{ fontWeight: 400, color: "var(--cinema-white)", opacity: 0.55 }}
              >
                I build frontend platforms that outlast the engineers who built them.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                onClick={handleStart}
                whileHover={{ backgroundColor: "var(--cinema-white)", color: "var(--cinema-black)" }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-4 bg-[var(--cinema-accent)] text-[var(--cinema-black)] tracking-[0.08em] uppercase transition-all duration-500"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(0.75rem, 1.3vw, 0.85rem)",
                  letterSpacing: "0.08em",
                }}
              >
                Begin the Journey
              </motion.button>

              <Link to="/work">
                <motion.button
                  whileHover={{ borderColor: "var(--cinema-accent)", color: "var(--cinema-accent)" }}
                  whileTap={{ scale: 0.98 }}
                  className="px-10 py-4 border border-[var(--cinema-border)] text-[var(--cinema-white)] tracking-[0.08em] uppercase transition-all duration-500"
                  style={{
                    fontWeight: 400,
                    fontSize: "clamp(0.75rem, 1.3vw, 0.85rem)",
                    letterSpacing: "0.08em",
                  }}
                >
                  View Selected Work
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      ) : (
        /* ── Journey ── */
        <div className="w-full" ref={journeyRef}>

          {/* Section title */}
          <div className="min-h-[60vh] flex items-center justify-center px-8 md:px-16 pt-24 pb-16 bg-[var(--cinema-black)]">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-center space-y-8"
            >
              <button
                onClick={handleReturnToHero}
                className="flex items-center gap-2 mx-auto opacity-30 hover:opacity-70 transition-opacity duration-300 mb-4"
                style={{
                  color: "var(--cinema-muted)",
                  fontSize: "0.75rem",
                  letterSpacing: "0.06em",
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M8 2L3 6L8 10"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="uppercase tracking-[0.06em]" style={{ fontWeight: 400 }}>
                  Back to beginning
                </span>
              </button>

              <h2
                className="text-[clamp(2rem,6vw,4rem)] tracking-tight leading-[1]"
                style={{
                  fontWeight: 700,
                  color: "var(--cinema-white)",
                  letterSpacing: "-0.03em",
                }}
              >
                Engineering Through Time
              </h2>

              <p
                className="text-sm tracking-[0.08em] uppercase"
                style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
              >
                A cinematic journey in six chapters
              </p>
            </motion.div>
          </div>

          {chapters.map((chapter, index) => (
            <Chapter key={chapter.number} {...chapter} index={index} />
          ))}

          <FinalScene />

          {/* Continue exploring */}
          <div className="min-h-[60vh] flex items-center justify-center px-8 md:px-16 py-32 bg-[var(--cinema-surface)] border-t border-[var(--cinema-border)]">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              viewport={{ once: true }}
              className="text-center space-y-12"
            >
              <p
                className="text-[clamp(2rem,5vw,3.5rem)] leading-[1.3] tracking-tight"
                style={{ fontWeight: 400, color: "var(--cinema-white)" }}
              >
                The story isn't finished.
                <br />
                Continue exploring.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-6 pt-8">
                {[
                  { to: "/work", label: "View Work" },
                  { to: "/timeline", label: "Full Timeline" },
                  { to: "/principles", label: "Engineering Principles" },
                ].map(({ to, label }) => (
                  <Link key={to} to={to}>
                    <motion.button
                      whileHover={{ backgroundColor: "var(--cinema-accent)", color: "var(--cinema-black)" }}
                      className="px-10 py-4 border border-[var(--cinema-border)] text-[var(--cinema-white)] tracking-[0.08em] uppercase transition-all duration-500"
                      style={{
                        fontWeight: 400,
                        fontSize: "clamp(0.75rem, 1.2vw, 0.85rem)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {label}
                    </motion.button>
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>

        </div>
      )}
    </div>
  );
}