import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "../pages/Root";

type Theme = "dark" | "light" | "auto";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    const onOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
    };
  }, [open]);

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    {
      value: "dark",
      label: "Dark",
      icon: (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M10.5 6.5A4.5 4.5 0 0 1 5 1.5a.5.5 0 0 0-.6-.6A5 5 0 1 0 11.1 7a.5.5 0 0 0-.6-.5z" fill="currentColor"/>
        </svg>
      ),
    },
    {
      value: "light",
      label: "Light",
      icon: (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="2.5" fill="currentColor"/>
          <line x1="6" y1="0.5" x2="6" y2="2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="6" y1="10" x2="6" y2="11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="0.5" y1="6" x2="2" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="10" y1="6" x2="11.5" y2="6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="2.05" y1="2.05" x2="3.1" y2="3.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="8.9" y1="8.9" x2="9.95" y2="9.95" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="9.95" y1="2.05" x2="8.9" y2="3.1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <line x1="3.1" y1="8.9" x2="2.05" y2="9.95" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      value: "auto",
      label: "Auto",
      icon: (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M6 1v10M1 6h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <path d="M6 1a5 5 0 0 1 0 10z" fill="currentColor"/>
        </svg>
      ),
    },
  ];

  const current = options.find((o) => o.value === theme)!;

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 border border-[var(--cinema-border)] hover:border-[var(--cinema-accent)] transition-colors duration-300 opacity-70 hover:opacity-100"
        aria-label="Toggle theme"
        aria-expanded={open}
      >
        <span style={{ color: "var(--cinema-white)" }}>{current.icon}</span>
        <span
          className="text-[9px] tracking-[0.06em] uppercase hidden sm:inline"
          style={{ fontWeight: 500, color: "var(--cinema-white)" }}
        >
          {current.label}
        </span>
        <svg
          width="8"
          height="8"
          viewBox="0 0 8 8"
          fill="none"
          style={{ color: "var(--cinema-muted)", opacity: 0.5 }}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path d="M1 2.5L4 5.5L7 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-1 border border-[var(--cinema-border)] bg-[var(--cinema-surface)] min-w-[100px] z-[60]"
          >
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setTheme(opt.value); setOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left hover:bg-[var(--cinema-border)] transition-colors duration-150 ${
                  theme === opt.value ? "opacity-100" : "opacity-50 hover:opacity-80"
                }`}
              >
                <span style={{ color: "var(--cinema-white)" }}>{opt.icon}</span>
                <span
                  className="text-[9px] tracking-[0.06em] uppercase"
                  style={{ fontWeight: 500, color: "var(--cinema-white)" }}
                >
                  {opt.label}
                </span>
                {theme === opt.value && (
                  <span className="ml-auto">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1 4L3.2 6.2L7 2" stroke="var(--cinema-accent)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const canGoBack = location.pathname !== "/";

  useEffect(() => {
    const handleScroll = () => { setIsScrolled(window.scrollY > 50); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  // Main navigation excludes Writing until the page has published content.
  const navLinks = [
    { path: "/work", label: "Work" },
    { path: "/timeline", label: "Timeline" },
    { path: "/principles", label: "Principles" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || isMobileMenuOpen
            ? "bg-[var(--cinema-black)] border-b border-[var(--cinema-border)]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-5">
          <div className="flex items-center justify-between">

            {/* Left: Back button (→ home) + logo */}
            <div className="flex items-center gap-4">
              {canGoBack && (
                <Link
                  to="/"
                  className="flex items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300 mr-1"
                  aria-label="Go home"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L4 7L9 12" stroke="var(--cinema-white)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              )}
              <Link to="/" className="group">
                <span
                  className="hidden lg:inline text-base tracking-tight transition-colors duration-300 group-hover:text-[var(--cinema-accent)]"
                  style={{ fontWeight: 600, color: "var(--cinema-white)", letterSpacing: "-0.02em" }}
                >
                  Sanket Bhor
                </span>
                <span
                  className="lg:hidden flex items-center justify-center w-8 h-8 border border-[var(--cinema-border)] group-hover:border-[var(--cinema-accent)] transition-colors duration-300"
                  style={{ fontWeight: 700, color: "var(--cinema-white)", fontSize: "0.75rem", letterSpacing: "0.05em" }}
                >
                  SB
                </span>
              </Link>
            </div>

            {/* Desktop Navigation + Theme toggle */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`text-[11px] tracking-[0.06em] uppercase transition-colors duration-300 hover:text-[var(--cinema-accent)] ${
                      isActive ? "text-[var(--cinema-accent)]" : "text-[var(--cinema-white)] opacity-70"
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <ThemeToggle />
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="lg:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[var(--cinema-white)]"
                aria-label="Toggle menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between" aria-hidden="true">
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                    className="w-full h-[1.5px] bg-current origin-center"
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    className="w-full h-[1.5px] bg-current"
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                    className="w-full h-[1.5px] bg-current origin-center"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[var(--cinema-black)] lg:hidden flex flex-col pt-24 px-8 pb-12"
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-5 right-6 p-3 min-w-[44px] min-h-[44px] flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity duration-200"
              aria-label="Close menu"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2L16 16M16 2L2 16" stroke="var(--cinema-white)" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            <nav className="flex flex-col gap-1">
              <Link
                to="/"
                className={`text-[clamp(1.5rem,6vw,2rem)] tracking-tight py-3 border-b border-[var(--cinema-border)] transition-colors duration-300 hover:text-[var(--cinema-accent)] ${
                  location.pathname === "/" ? "text-[var(--cinema-accent)]" : "text-[var(--cinema-white)] opacity-70"
                }`}
                style={{ fontWeight: 500, letterSpacing: "-0.02em" }}
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[clamp(1.5rem,6vw,2rem)] tracking-tight py-3 border-b border-[var(--cinema-border)] transition-colors duration-300 hover:text-[var(--cinema-accent)] ${
                    location.pathname === link.path ? "text-[var(--cinema-accent)]" : "text-[var(--cinema-white)] opacity-70"
                  }`}
                  style={{ fontWeight: 500, letterSpacing: "-0.02em" }}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto pt-8 space-y-6">
              <div className="flex items-center gap-4">
                {[
                  { label: "LinkedIn", href: "https://linkedin.com/in/sanket-bhor", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { label: "GitHub", href: "https://github.com/sanketbhor1992", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg> },
                  { label: "Email", href: "mailto:sanket.d.bhor@gmail.com", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="m4 6 8 6 8-6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 flex items-center justify-center border border-[var(--cinema-border)] hover:border-[var(--cinema-accent)] hover:text-[var(--cinema-accent)] transition-all duration-300"
                    style={{ color: "var(--cinema-muted)" }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
              <p
                className="text-xs tracking-[0.08em] uppercase opacity-20"
                style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
              >
                Sanket Bhor · Navi Mumbai
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}