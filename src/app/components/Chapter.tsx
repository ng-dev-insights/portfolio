import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ChapterProps {
  number: number;
  title: string;
  subtitle?: string;
  narrative: string;
  visualDescription: string;
  emotion: string;
  isCenter?: boolean;
  focus?: string;
  index: number;
  chapterKey?: string;
}

export function Chapter({
  number,
  title,
  subtitle,
  narrative,
  visualDescription,
  emotion,
  isCenter = false,
  index,
  chapterKey,
}: ChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [80, 0, 0, -40]);

  const chapterAccents: Record<string, string> = {
    builder: "var(--chapter-builder)",
    solver: "var(--chapter-solver)",
    architect: "var(--chapter-architect)",
    multiplier: "var(--chapter-multiplier)",
    mentor: "var(--chapter-mentor)",
    explorer: "var(--chapter-explorer)",
  };
  const accentColor =
    chapterKey ? (chapterAccents[chapterKey] ?? "var(--cinema-accent)") : "var(--cinema-accent)";

  const getBackgroundShade = () => {
    if (isCenter) return "var(--cinema-surface)";
    return index % 2 === 0 ? "var(--cinema-black)" : "var(--cinema-surface-alt)";
  };

  // Zero-pad for display: "01", "02", etc.
  const paddedNumber = String(number).padStart(2, "0");

  return (
    <motion.section
      ref={sectionRef}
      style={{
        opacity,
        scale,
        y,
        backgroundColor: getBackgroundShade(),
      }}
      className={`min-h-screen w-full flex items-center justify-center px-8 md:px-16 lg:px-24 ${
        isCenter ? "py-48" : "py-32"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">

          {/* ── Chapter Number Column ── */}
          <div className="lg:col-span-3 flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative flex flex-row lg:flex-col items-center lg:items-start gap-4 lg:gap-3"
            >
              {/* Accent line — horizontal on mobile, vertical on desktop */}
              <div
                className="w-8 h-[1px] lg:w-[1px] lg:h-16"
                style={{ backgroundColor: accentColor, opacity: 0.5 }}
              />

              {/* Chapter label */}
              <div className="flex flex-col gap-1">
                <span
                  className="text-[0.6rem] uppercase tracking-[0.18em]"
                  style={{ color: accentColor, fontWeight: 600, opacity: 0.7 }}
                >
                  Chapter
                </span>
                <span
                  className="text-[clamp(2.5rem,6vw,5rem)] leading-[1] tabular-nums"
                  style={{
                    fontWeight: 800,
                    color: "var(--cinema-white)",
                    letterSpacing: "-0.04em",
                    opacity: 0.12,
                  }}
                >
                  {paddedNumber}
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── Chapter Content ── */}
          <div className="lg:col-span-9 space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-10"
            >
              {/* Title block */}
              <div className="space-y-4">
                <h2
                  className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[1] tracking-tight"
                  style={{
                    fontWeight: 700,
                    color: "var(--cinema-white)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {title}
                </h2>

                {subtitle && (
                  <p
                    className="text-[clamp(1rem,2.5vw,1.5rem)] opacity-50 italic"
                    style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Accent divider */}
              <div
                className="h-[1px] w-24 opacity-40"
                style={{ backgroundColor: accentColor }}
              />

              {/* Narrative */}
              <p
                className="text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.4] max-w-3xl"
                style={{ fontWeight: 400, color: "var(--cinema-white)" }}
              >
                {narrative}
              </p>
            </motion.div>

            {/* Visual description */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="pt-8 max-w-2xl pl-6"
              style={{ borderLeft: `1px solid ${accentColor}` }}
            >
              <p
                className="text-[clamp(1.125rem,2.25vw,1.5rem)] italic opacity-50"
                style={{
                  fontWeight: 400,
                  color: "var(--cinema-muted)",
                  lineHeight: "2",
                  whiteSpace: "pre-line",
                }}
              >
                {visualDescription}
              </p>

              {/* Emotion label */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                viewport={{ once: true }}
                className="mt-12 pt-8 border-t border-[var(--cinema-border)]"
              >
                <p
                  className="text-[0.65rem] tracking-[0.16em] uppercase opacity-60"
                  style={{ fontWeight: 600, color: accentColor }}
                >
                  {emotion}
                </p>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.section>
  );
}