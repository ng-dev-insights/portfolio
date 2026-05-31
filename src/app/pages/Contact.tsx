import { motion } from "motion/react";
import { useState } from "react";

export function Contact() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, message } = formState;
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`Hi Sanket,\n\n${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:sanket.d.bhor@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const links = [
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      ),
      label: "GitHub",
      href: "https://github.com/sanketbhor1992",
      description: "Code, tools, and experiments",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: "LinkedIn",
      href: "https://linkedin.com/in/sanket-bhor",
      description: "Professional network",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L2.25 2.25h6.961l4.216 5.58 4.817-5.58zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
      label: "X / Twitter",
      href: "https://x.com/sanketbhor",
      description: "Engineering thoughts",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          <polyline points="15 3 21 3 21 9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      ),
      label: "Dev.to",
      href: "https://dev.to/shanky1992",
      description: "Engineering articles",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="16" />
          <line x1="8" y1="12" x2="16" y2="12" />
        </svg>
      ),
      label: "Farelo",
      href: "https://www.farelo.in",
      description: "AI travel budget estimator — side project",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <path d="m4 6 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
      label: "Email",
      href: "mailto:sanket.d.bhor@gmail.com",
      description: "sanket.d.bhor@gmail.com",
    },
    {
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
          <polyline points="13 2 13 9 20 9" />
        </svg>
      ),
      label: "Resume",
      href: "/resume.pdf",
      description: "Download PDF",
      isDownload: true,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[var(--cinema-black)] flex flex-col">
      <div className="flex-1 flex flex-col justify-between pt-24 pb-16 px-6 md:px-12 lg:px-24 max-w-5xl mx-auto w-full">

        {/* Main statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-10"
        >
          {/* FIX: Was color=muted + opacity-40 (double-dimmed) */}
          <p
            className="text-xs tracking-[0.08em] uppercase"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            Get in touch
          </p>

          <h1
            className="text-[clamp(2rem,5.5vw,4rem)] tracking-tight leading-[1.15] max-w-3xl"
            style={{ fontWeight: 600, color: "var(--cinema-white)", letterSpacing: "-0.03em" }}
          >
            Let's build things that continue creating value long after they're shipped.
          </h1>
        </motion.div>

        {/* Email form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-16 border border-[var(--cinema-border)] p-8 md:p-10 space-y-6"
        >
          {/* FIX: Was color=muted + opacity-40 */}
          <p
            className="text-xs tracking-[0.08em] uppercase"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            Send a message
          </p>
          {submitted ? (
            <p
              className="text-sm opacity-60 py-4"
              style={{ fontWeight: 400, color: "var(--cinema-white)" }}
            >
              Your email client should have opened. If not, write to sanket.d.bhor@gmail.com directly.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  {/* FIX: Form labels were text-[10px] + opacity-40 on muted — illegible */}
                  <label
                    htmlFor="contact-name"
                    className="text-xs tracking-[0.08em] uppercase block"
                    style={{ color: "var(--cinema-muted)" }}
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState(s => ({ ...s, name: e.target.value }))}
                    className="w-full bg-transparent border-b border-[var(--cinema-border)] focus:border-[var(--cinema-accent)] outline-none py-2 text-sm transition-colors duration-300"
                    style={{ color: "var(--cinema-white)", fontWeight: 400 }}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-xs tracking-[0.08em] uppercase block"
                    style={{ color: "var(--cinema-muted)" }}
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState(s => ({ ...s, email: e.target.value }))}
                    className="w-full bg-transparent border-b border-[var(--cinema-border)] focus:border-[var(--cinema-accent)] outline-none py-2 text-sm transition-colors duration-300"
                    style={{ color: "var(--cinema-white)", fontWeight: 400 }}
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="contact-message"
                  className="text-xs tracking-[0.08em] uppercase block"
                  style={{ color: "var(--cinema-muted)" }}
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={(e) => setFormState(s => ({ ...s, message: e.target.value }))}
                  className="w-full bg-transparent border-b border-[var(--cinema-border)] focus:border-[var(--cinema-accent)] outline-none py-2 text-sm resize-none transition-colors duration-300"
                  style={{ color: "var(--cinema-white)", fontWeight: 400 }}
                  placeholder="What's on your mind?"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ backgroundColor: "var(--cinema-white)", color: "var(--cinema-black)" }}
                whileTap={{ scale: 0.98 }}
                className="px-10 py-3 border border-[var(--cinema-border)] text-[var(--cinema-white)] tracking-[0.08em] uppercase transition-all duration-500 text-xs"
                style={{ fontWeight: 500 }}
              >
                Send →
              </motion.button>
            </form>
          )}
        </motion.div>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 space-y-0 border-t border-[var(--cinema-border)]"
        >
          {links.map((link, index) => {
            const isExternal = link.href.startsWith("http");
            const isMailto = link.href.startsWith("mailto");
            const isDownload = (link as any).isDownload;

            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={isExternal ? "_blank" : undefined}
                rel={isExternal ? "noopener noreferrer" : undefined}
                download={isDownload ? true : undefined}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.08 }}
                whileHover={{ x: 8 }}
                className="flex items-center justify-between py-7 group transition-all duration-300 border-b border-[var(--cinema-border)]"
              >
                <div className="flex items-center gap-6">
                  <div
                    className="opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: "var(--cinema-accent)" }}
                  >
                    {(link as any).icon}
                  </div>
                  <div className="space-y-1">
                    <p
                      className="text-base tracking-tight leading-none group-hover:text-[var(--cinema-accent)] transition-colors duration-300"
                      style={{ fontWeight: 500, color: "var(--cinema-white)" }}
                    >
                      {link.label}
                    </p>
                    {/* FIX: Was opacity-50 on muted — double-dimmed */}
                    <p
                      className="text-xs"
                      style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
                    >
                      {link.description}
                    </p>
                  </div>
                </div>

                <span
                  className="text-xs tracking-[0.06em] uppercase opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                  style={{ color: "var(--cinema-accent)" }}
                >
                  {isDownload ? "Download →" : isMailto ? "Write →" : "Open →"}
                </span>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Final statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-24 pt-8"
        >
          <p
            className="text-[clamp(1.5rem,4vw,2.5rem)] tracking-tight leading-[1.3]"
            style={{ fontWeight: 400, color: "var(--cinema-white)", letterSpacing: "-0.02em" }}
          >
            The story isn't finished.
          </p>
          {/* FIX: Was opacity-50 on muted — double-dimmed. Also removed conflicting -mt-5 + mt-24 */}
          <p
            className="text-sm mt-4"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            Navi Mumbai, India
          </p>
        </motion.div>
      </div>
    </div>
  );
}