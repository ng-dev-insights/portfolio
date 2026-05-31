import { motion } from "motion/react";

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export function SocialDock() {
  const links: SocialLink[] = [
    {
      label: "LinkedIn",
      href: "https://linkedin.com/in/sanket-bhor",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
    {
      label: "GitHub",
      href: "https://github.com/sanketbhor1992",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
        </svg>
      ),
    },
    {
      label: "Email",
      href: "mailto:sanket.d.bhor@gmail.com",
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
          <path d="m4 6 8 6 8-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Desktop: fixed left vertical strip */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed left-6 bottom-0 z-40 hidden lg:flex flex-col items-center gap-1"
        style={{ paddingBottom: "0" }}
      >
        <div className="flex flex-col gap-1">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 + i * 0.08 }}
              whileHover={{ scale: 1.15, opacity: 1 }}
              className="w-9 h-9 flex items-center justify-center border border-[var(--cinema-border)] bg-[var(--cinema-black)] hover:border-[var(--cinema-accent)] hover:text-[var(--cinema-accent)] transition-all duration-300"
              style={{ color: "var(--cinema-muted)", opacity: 0.45 }}
            >
              {link.icon}
            </motion.a>
          ))}
        </div>
        {/* Vertical line below icons */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="w-[1px] mt-2"
          style={{
            height: "80px",
            backgroundColor: "var(--cinema-border)",
            transformOrigin: "top",
            opacity: 0.3,
          }}
        />
      </motion.div>

      {/* Mobile: fixed bottom bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden flex items-center justify-center gap-0 border-t border-[var(--cinema-border)] bg-[var(--cinema-black)]"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      >
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="flex-1 flex items-center justify-center py-3.5 hover:bg-[var(--cinema-surface)] hover:text-[var(--cinema-accent)] transition-all duration-300"
            style={{ color: "var(--cinema-muted)", opacity: 0.55 }}
          >
            {link.icon}
          </a>
        ))}
      </motion.div>
    </>
  );
}