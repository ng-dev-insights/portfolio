import { motion } from "motion/react";
import { useState } from "react";
import { Github, Linkedin, Mail, FileText, ExternalLink, Globe, Twitter } from "lucide-react";export function Contact() {
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
      icon: Github,
      label: "GitHub",
      href: "https://github.com/sanketbhor1992",
      description: "Code, tools, and experiments",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/sanket-bhor",
      description: "Professional network",
    },
    {
      icon: Twitter,
      label: "X / Twitter",
      href: "https://x.com/sanketbhor",
      description: "Engineering thoughts",
    },
    {
      icon: ExternalLink,
      label: "Dev.to",
      href: "https://dev.to/shanky1992",
      description: "Engineering articles",
    },
    {
      icon: Globe,
      label: "Farelo",
      href: "https://www.farelo.in",
      description: "AI travel budget estimator — side project",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:sanket.d.bhor@gmail.com",
      description: "sanket.d.bhor@gmail.com",
    },
    {
      icon: FileText,
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
            const Icon = link.icon;
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
                  <Icon
                    size={16}
                    className="opacity-50 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ color: "var(--cinema-accent)" }}
                  />
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