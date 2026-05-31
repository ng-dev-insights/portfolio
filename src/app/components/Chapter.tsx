import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface ChapterProps {
  number: string;
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
  focus,
  index,
  chapterKey
}: ChapterProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.95, 1, 1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [80, 0, 0, -40]);

  // Per-chapter accent color for visual differentiation
  const chapterAccents: Record<string, string> = {
    builder: 'var(--chapter-builder)',
    solver: 'var(--chapter-solver)',
    architect: 'var(--chapter-architect)',
    multiplier: 'var(--chapter-multiplier)',
    mentor: 'var(--chapter-mentor)',
    explorer: 'var(--chapter-explorer)',
  };
  const accentColor = chapterKey ? chapterAccents[chapterKey] ?? 'var(--cinema-accent)' : 'var(--cinema-accent)';

  // Subtle background variation for visual rhythm
  const getBackgroundShade = () => {
    if (isCenter) return 'var(--cinema-surface)'; // Emotional center gets subtle elevation
    return index % 2 === 0 ? 'var(--cinema-black)' : 'var(--cinema-surface-alt)';
  };

  return (
    <motion.section
      ref={sectionRef}
      style={{
        opacity,
        scale,
        y,
        backgroundColor: getBackgroundShade()
      }}
      className={`min-h-screen w-full flex items-center justify-center px-8 md:px-16 lg:px-24 py-32 ${
        isCenter ? 'py-48' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-32 items-start">
          {/* Chapter Number - Massive and subtle */}
          <div className="lg:col-span-3 flex items-start">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div
                className="text-[clamp(10rem,22vw,18rem)] leading-[0.75] tracking-tighter opacity-[0.08]"
                style={{
                  fontWeight: 900,
                  color: 'var(--cinema-white)',
                  letterSpacing: '-0.06em'
                }}
              >
                {number}
              </div>
            </motion.div>
          </div>

          {/* Chapter Content */}
          <div className="lg:col-span-9 space-y-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
              className="space-y-10"
            >
              {/* Title */}
              <div className="space-y-4">
                <h2
                  className="text-[clamp(2.5rem,7vw,5.5rem)] leading-[1] tracking-tight"
                  style={{
                    fontWeight: 700,
                    color: 'var(--cinema-white)',
                    letterSpacing: '-0.03em'
                  }}
                >
                  {title}
                </h2>

                {/* Subtitle if exists */}
                {subtitle && (
                  <p
                    className="text-[clamp(1rem,2.5vw,1.5rem)] opacity-50 italic"
                    style={{
                      fontWeight: 400,
                      color: 'var(--cinema-muted)'
                    }}
                  >
                    {subtitle}
                  </p>
                )}
              </div>

              {/* Divider */}
              <div
                className="h-[1px] w-32 opacity-40"
                style={{
                  backgroundColor: accentColor
                }}
              />

              {/* Narrative */}
              <p
                className="text-[clamp(1.5rem,3.5vw,2.5rem)] leading-[1.4] max-w-3xl"
                style={{
                  fontWeight: 400,
                  color: 'var(--cinema-white)'
                }}
              >
                {narrative}
              </p>
            </motion.div>

            {/* Visual Description - the feeling */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.7 }}
              viewport={{ once: true, margin: "-100px" }}
              className="pt-8 max-w-2xl pl-6"
              style={{ borderLeft: `1px solid ${accentColor}` }}
            >
              <p
                className="text-[clamp(1.125rem,2.25vw,1.5rem)] leading-[2] italic opacity-50"
                style={{
                  fontWeight: 400,
                  color: 'var(--cinema-muted)',
                  lineHeight: '2'
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
                  className="text-sm tracking-[0.08em] uppercase opacity-50"
                  style={{
                    fontWeight: 500,
                    color: accentColor,
                    letterSpacing: '0.08em'
                  }}
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