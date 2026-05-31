import { Link } from "react-router";
import { motion } from "motion/react";

export function FinalScene() {
  const beliefs = [
    "Software is a team sport.",
    "Developer experience compounds.",
    "Accessibility is architecture.",
    "Standards create freedom.",
    "The best system is the one people actually use.",
    "Good engineering outlives the engineer who built it.",
  ];

  return (
    <section className="min-h-screen w-full flex items-center justify-center px-8 md:px-16 lg:px-24 py-48 bg-[var(--cinema-black)]">
      <div className="max-w-5xl mx-auto text-center space-y-40">

        {/* Final Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.3 }}
          viewport={{ once: true }}
          className="space-y-20"
        >
          <p
            className="text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.4] tracking-tight"
            style={{ fontWeight: 400, color: "var(--cinema-white)" }}
          >
            Most engineering work ends when it's shipped.
          </p>
          <p
            className="text-[clamp(1.75rem,4.5vw,3.25rem)] leading-[1.4] tracking-tight"
            style={{ fontWeight: 400, color: "var(--cinema-white)" }}
          >
            My best work keeps creating value long after.
          </p>
        </motion.div>

        {/* What I Believe Now */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          viewport={{ once: true }}
          className="space-y-12"
        >
          <p
            className="text-xs tracking-[0.08em] uppercase opacity-30"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            What I Believe Now
          </p>

          <div className="space-y-5">
            {beliefs.map((belief, i) => (
              <motion.p
                key={belief}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.1 }}
                viewport={{ once: true }}
                className="text-[clamp(1rem,2.5vw,1.5rem)] leading-[1.6]"
                style={{ fontWeight: 400, color: "var(--cinema-muted)", opacity: 0.55 }}
              >
                {belief}
              </motion.p>
            ))}
          </div>
        </motion.div>

        {/* Name + Roles */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="space-y-16"
        >
          <div className="space-y-12">
            <h3
              className="text-[clamp(2.5rem,6vw,4.5rem)] tracking-tight leading-[1.1]"
              style={{ fontWeight: 700, color: "var(--cinema-white)", letterSpacing: "-0.02em" }}
            >
              Sanket Bhor
            </h3>

            <div className="h-[1px] w-24 mx-auto opacity-20" style={{ backgroundColor: "var(--cinema-accent)" }} />

            <div
              className="text-[clamp(1.125rem,2.75vw,1.75rem)] leading-[2.5] opacity-60"
              style={{ fontWeight: 400, color: "var(--cinema-muted)", letterSpacing: "0.02em" }}
            >
              {["Engineer", "Architect", "Mentor", "System Thinker", "Tool Builder", "Explorer"].map((role) => (
                <p key={role}>{role}</p>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.8 }}
            viewport={{ once: true }}
            className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/contact">
              <motion.button
                whileHover={{ backgroundColor: "var(--cinema-white)", color: "var(--cinema-black)", borderColor: "var(--cinema-white)" }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 bg-[var(--cinema-accent)] text-[var(--cinema-black)] tracking-[0.08em] uppercase transition-all duration-500"
                style={{ fontWeight: 500, fontSize: "clamp(0.7rem, 1.4vw, 0.8rem)", letterSpacing: "0.08em" }}
              >
                Let's Talk Architecture
              </motion.button>
            </Link>

            <a href="/resume.pdf" download target="_blank" rel="noopener noreferrer">
              <motion.button
                whileHover={{ borderColor: "var(--cinema-accent)", color: "var(--cinema-accent)" }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 border border-[var(--cinema-border)] text-[var(--cinema-white)] tracking-[0.08em] uppercase transition-all duration-500 flex items-center gap-3"
                style={{ fontWeight: 400, fontSize: "clamp(0.7rem, 1.4vw, 0.8rem)", letterSpacing: "0.08em" }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M6 1v7M3 5.5L6 8.5L9 5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1 10h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                Download Resume
              </motion.button>
            </a>

            <Link to="/work">
              <motion.button
                whileHover={{ borderColor: "var(--cinema-accent)", color: "var(--cinema-accent)" }}
                whileTap={{ scale: 0.98 }}
                className="px-12 py-5 border border-[var(--cinema-border)] text-[var(--cinema-white)] opacity-60 tracking-[0.08em] uppercase transition-all duration-500 hover:opacity-100"
                style={{ fontWeight: 400, fontSize: "clamp(0.7rem, 1.4vw, 0.8rem)", letterSpacing: "0.08em" }}
              >
                Explore Work
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}