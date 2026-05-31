import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";

// Glitch effect: renders text with randomised character corruption
function GlitchText({ text, className, style }: { text: string; className?: string; style?: React.CSSProperties }) {
  const [displayed, setDisplayed] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&";

  useEffect(() => {
    let frame = 0;
    let raf: number;

    const scramble = () => {
      frame++;
      // Settle after ~40 frames (~660ms at 60fps)
      const progress = Math.min(frame / 40, 1);
      setDisplayed(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i / text.length < progress) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      if (progress < 1) raf = requestAnimationFrame(scramble);
    };

    raf = requestAnimationFrame(scramble);
    return () => cancelAnimationFrame(raf);
  }, [text]);

  return (
    <span className={className} style={style}>
      {displayed}
    </span>
  );
}

// Animated scan-line bar that sweeps down the 404
function ScanLine() {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] pointer-events-none"
      style={{ background: "linear-gradient(90deg, transparent, var(--cinema-accent), transparent)", opacity: 0.4 }}
      initial={{ top: "0%" }}
      animate={{ top: ["0%", "100%", "0%"] }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
    />
  );
}

const navLinks = [
  { path: "/work", label: "Work" },
  { path: "/principles", label: "Principles" },
  { path: "/timeline", label: "Timeline" },
  { path: "/about", label: "About" },
  { path: "/contact", label: "Contact" },
];

export function NotFound() {
  return (
    <div className="min-h-screen w-full bg-[var(--cinema-black)] flex flex-col items-center justify-center px-6 md:px-12 overflow-hidden">

      {/* Background noise — subtle repeated grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, var(--cinema-border) 0px, transparent 1px, transparent 40px), repeating-linear-gradient(90deg, var(--cinema-border) 0px, transparent 1px, transparent 40px)",
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center space-y-16 z-10">

        {/* 404 with glitch + scan line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="relative inline-block"
        >
          <div
            className="text-[clamp(8rem,22vw,14rem)] leading-[0.8] select-none"
            style={{ fontWeight: 900, color: "var(--cinema-white)", letterSpacing: "-0.05em", opacity: 0.08 }}
          >
            404
          </div>

          {/* Glitch overlay */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: [0, 1, 0.8, 1], x: [-4, 0, -2, 0] }}
            transition={{ duration: 0.6, times: [0, 0.3, 0.6, 1] }}
          >
            <div
              className="text-[clamp(8rem,22vw,14rem)] leading-[0.8] select-none"
              style={{ fontWeight: 900, color: "var(--cinema-accent)", letterSpacing: "-0.05em", opacity: 0.06 }}
            >
              404
            </div>
          </motion.div>

          <ScanLine />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <h1
            className="text-[clamp(1.5rem,5vw,3rem)] tracking-tight leading-[1.1]"
            style={{ fontWeight: 700, color: "var(--cinema-white)", letterSpacing: "-0.025em" }}
          >
            <GlitchText text="PAGE NOT FOUND" />
          </h1>

          <p
            className="text-[clamp(0.9rem,2vw,1.2rem)] leading-[1.7] opacity-40 max-w-xl mx-auto"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            This chapter doesn't exist. The story continues elsewhere.
          </p>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="h-px w-16 mx-auto bg-[var(--cinema-accent)] opacity-30"
          style={{ transformOrigin: "left" }}
        />

        {/* Navigation shortcuts */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="space-y-8"
        >
          <p
            className="text-xs tracking-[0.08em] uppercase opacity-50"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            Where would you like to go?
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/">
              <motion.span
                whileHover={{ borderColor: "var(--cinema-accent)", color: "var(--cinema-accent)" }}
                className="block px-5 py-2.5 border border-[var(--cinema-border)] text-[var(--cinema-white)] opacity-80 hover:opacity-100 tracking-[0.15em] uppercase transition-all duration-300 text-[10px] cursor-pointer"
                style={{ fontWeight: 500 }}
              >
                Home
              </motion.span>
            </Link>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + i * 0.07 }}
              >
                <Link to={link.path}>
                  <motion.span
                    whileHover={{ borderColor: "var(--cinema-accent)", color: "var(--cinema-accent)" }}
                    className="block px-5 py-2.5 border border-[var(--cinema-border)] text-[var(--cinema-white)] opacity-50 hover:opacity-100 tracking-[0.15em] uppercase transition-all duration-300 text-[10px] cursor-pointer"
                    style={{ fontWeight: 500 }}
                  >
                    {link.label}
                  </motion.span>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Error code label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="text-[10px] tracking-[0.08em] uppercase opacity-30"
          style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
        >
          Error 404 · Route not matched · Sanket Bhor Portfolio
        </motion.p>
      </div>
    </div>
  );
}