import { motion } from "motion/react";
import { Link } from "react-router";

export function ComingSoon() {
  return (
    <div className="min-h-screen w-full bg-[var(--cinema-black)] flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-10 max-w-2xl"
      >
        {/* Monogram */}
        <div
          className="w-12 h-12 mx-auto flex items-center justify-center border border-[var(--cinema-border)]"
          style={{ background: "var(--cinema-surface)" }}
        >
          <span
            className="text-xs tracking-widest font-bold"
            style={{ color: "var(--cinema-accent)" }}
          >
            SB
          </span>
        </div>

        <div className="space-y-4">
          {/* FIX: Was color=muted + opacity-40 (double-dimmed). Now single color token. */}
          <p
            className="text-xs tracking-[0.08em] uppercase"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            Coming soon
          </p>
          <h1
            className="text-[clamp(2.5rem,7vw,5rem)] tracking-tight leading-[1]"
            style={{
              fontWeight: 700,
              color: "var(--cinema-white)",
              letterSpacing: "-0.03em",
            }}
          >
            Something is being built here.
          </h1>
        </div>

        {/* FIX: Was color=muted + opacity-50 (double-dimmed). Now single. */}
        <p
          className="text-[clamp(1rem,2.5vw,1.25rem)] leading-[1.7] max-w-xl mx-auto"
          style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
        >
          This page is under construction. Check back soon — or explore what's already here.
        </p>

        {/* Animated progress bar */}
        <div className="mx-auto w-48 h-px bg-[var(--cinema-border)] overflow-hidden">
          <motion.div
            className="h-full bg-[var(--cinema-accent)]"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ opacity: 0.6 }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
          {[
            { to: "/", label: "Home" },
            { to: "/work", label: "Selected Work" },
            { to: "/contact", label: "Contact" },
          ].map(({ to, label }) => (
            <Link key={to} to={to}>
              <motion.span
                whileHover={{ color: "var(--cinema-accent)", x: 2 }}
                className="text-xs tracking-[0.08em] uppercase transition-all duration-300"
                style={{ fontWeight: 500, color: "var(--cinema-white)" }}
              >
                {label} →
              </motion.span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}