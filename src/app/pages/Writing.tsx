import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  positive_reactions_count: number;
  comments_count: number;
}

interface UpcomingTopic {
  category: string;
  title: string;
  teaser: string;
}

const upcomingTopics: UpcomingTopic[] = [
  { category: "Bundle Architecture", title: "How a 12.8MB Bundle Happens (And How To Fix It)", teaser: "Every root cause is an architecture decision someone made without visibility." },
  { category: "Architecture", title: "Why Most Design Systems Fail", teaser: "It's always organizational, not technical." },
  { category: "Angular", title: "Lessons From Enterprise Angular", teaser: "Modernizing large platforms taught me more about teams than technology." },
  { category: "Coding Standards", title: "The Coding Standards Doc That Pays For Itself", teaser: "One document. Enforced in every PR. Permanent leverage." },
  { category: "AI", title: "How AI Changed My Workflow", teaser: "It didn't replace my job. It removed the boring parts." },
  { category: "Leadership", title: "The Invisible Work Of Senior Engineers", teaser: "The best work isn't code — it's the decision that prevents bad code from being written." },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { month: "short", year: "numeric" });
}

function tagToCategory(tags: string[]) {
  const map: Record<string, string> = {
    angular: "Angular",
    react: "React",
    scss: "SCSS · CSS",
    css: "SCSS · CSS",
    typescript: "TypeScript",
    accessibility: "Accessibility",
    performance: "Performance",
    testing: "Testing",
    webdev: "Web Dev",
    javascript: "JavaScript",
    tooling: "Tooling",
    ai: "AI",
    devops: "DevOps",
  };
  for (const tag of tags) {
    const hit = map[tag.toLowerCase()];
    if (hit) return hit;
  }
  return tags.slice(0, 2).join(" · ") || "Engineering";
}

// Skeleton card shown while fetching
function ArticleSkeleton() {
  return (
    <div className="border border-[var(--cinema-border)] p-8 md:p-10 space-y-5 mb-4 animate-pulse">
      <div className="flex gap-4">
        <div className="h-3 w-24 bg-[var(--cinema-border)] rounded-none" />
        <div className="h-3 w-16 bg-[var(--cinema-border)] rounded-none opacity-50" />
      </div>
      <div className="h-6 w-3/4 bg-[var(--cinema-border)] rounded-none" />
      <div className="space-y-2">
        <div className="h-3 w-full bg-[var(--cinema-border)] rounded-none opacity-60" />
        <div className="h-3 w-5/6 bg-[var(--cinema-border)] rounded-none opacity-60" />
      </div>
      <div className="flex gap-5">
        <div className="h-2 w-16 bg-[var(--cinema-border)] rounded-none opacity-40" />
        <div className="h-2 w-12 bg-[var(--cinema-border)] rounded-none opacity-40" />
      </div>
    </div>
  );
}

export function Writing() {
  const [articles, setArticles] = useState<DevToArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://dev.to/api/articles?username=shanky1992&per_page=20", {
      signal: controller.signal,
    })
      .then((r) => {
        if (!r.ok) throw new Error("non-200");
        return r.json();
      })
      .then((data: DevToArticle[]) => {
        // Sort newest first
        const sorted = data.sort(
          (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
        );
        setArticles(sorted);
        setLoading(false);
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setError(true);
          setLoading(false);
        }
      });
    return () => controller.abort();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[var(--cinema-black)] pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14 space-y-8"
        >
          <p
            className="text-xs tracking-[0.08em] uppercase opacity-40"
            style={{ fontWeight: 400, color: "var(--cinema-muted)", letterSpacing: "0.08em" }}
          >
            Field Notes
          </p>

          <h1
            className="text-[clamp(3rem,8vw,6rem)] tracking-tight leading-[0.92]"
            style={{ fontWeight: 700, color: "var(--cinema-white)", letterSpacing: "-0.03em" }}
          >
            Engineering<br />Journal
          </h1>

          <div className="h-px w-16 bg-[var(--cinema-accent)] opacity-40" />

          <p
            className="text-[clamp(1rem,2vw,1.25rem)] leading-[1.7] max-w-2xl opacity-50"
            style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
          >
            Writing on architecture, systems, and the practice of engineering.
            Published on Dev.to — more articles in progress.
          </p>
        </motion.div>

        {/* Published Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-14"
        >
          <div className="flex items-center justify-between mb-10">
            <p
              className="text-[10px] tracking-[0.08em] uppercase opacity-30"
              style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
            >
              Published
            </p>
            {!loading && !error && articles.length > 0 && (
              <a
                href="https://dev.to/shanky1992"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.06em] uppercase opacity-30 hover:opacity-70 transition-opacity duration-200"
                style={{ color: "var(--cinema-accent)" }}
              >
                All articles on Dev.to →
              </a>
            )}
          </div>

          {/* Loading skeletons */}
          {loading && (
            <>
              <ArticleSkeleton />
              <ArticleSkeleton />
            </>
          )}

          {/* Error state — fall back to the known article hardcoded */}
          {error && (
            <div>
              <p className="text-[10px] tracking-[0.08em] uppercase opacity-30 mb-6" style={{ color: "var(--cinema-muted)" }}>
                Live feed unavailable — showing curated articles
              </p>
              {[
                {
                  href: "https://dev.to/shanky1992/the-stylelint-rule-that-was-silently-rewriting-our-scss-colors-15pb",
                  category: "SCSS · Tooling",
                  title: "The Stylelint Rule That Was Silently Rewriting Our SCSS Colors",
                  description: "How color-function-notation silently rewrote rgba() to rgb() across our codebase — and three ways to fix it.",
                  date: "May 2026",
                  readTime: "5 min read",
                },
                {
                  href: "https://dev.to/shanky1992",
                  category: "Accessibility",
                  title: "Building Accessibility Into the CI Pipeline",
                  description: "How we embedded axe-core into GitHub Actions and turned accessibility from a checkbox into an engineering constraint.",
                  date: "2025",
                  readTime: "8 min read",
                },
                {
                  href: "https://dev.to/shanky1992",
                  category: "Performance",
                  title: "From 9s to 2.5s: Diagnosing LCP in an NgRx Platform",
                  description: "Tracing a slow LCP to its root — blocking NgRx asset resolution in the critical path — and the fix that changed the score by 40 points.",
                  date: "2025",
                  readTime: "7 min read",
                },
              ].map((article) => (
                <a
                  key={article.title}
                  href={article.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group border border-[var(--cinema-accent)] border-opacity-25 hover:border-opacity-60 transition-all duration-300 mb-4"
                >
                  <div className="p-8 md:p-10 space-y-5">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] tracking-[0.08em] uppercase" style={{ fontWeight: 500, color: "var(--cinema-accent)", opacity: 0.8 }}>
                          {article.category}
                        </span>
                        <span className="text-[10px] tracking-[0.06em] uppercase opacity-30" style={{ color: "var(--cinema-muted)" }}>Dev.to</span>
                      </div>
                      <ExternalLink size={14} className="opacity-30 group-hover:opacity-80 transition-opacity duration-300 shrink-0" style={{ color: "var(--cinema-accent)" }} />
                    </div>
                    <h2
                      className="text-[clamp(1.125rem,2.5vw,1.75rem)] leading-[1.25] tracking-tight group-hover:text-[var(--cinema-accent)] transition-colors duration-300"
                      style={{ fontWeight: 600, color: "var(--cinema-white)", letterSpacing: "-0.02em" }}
                    >
                      {article.title}
                    </h2>
                    <p className="text-sm leading-[1.7] max-w-2xl opacity-60" style={{ fontWeight: 400, color: "var(--cinema-muted)" }}>
                      {article.description}
                    </p>
                    <div className="flex items-center gap-5 pt-1">
                      <span className="text-[10px] opacity-30" style={{ color: "var(--cinema-muted)" }}>{article.date}</span>
                      <span className="text-[10px] opacity-30" style={{ color: "var(--cinema-muted)" }}>{article.readTime}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Live articles from Dev.to */}
          {!loading && !error && articles.map((article, index) => (
            <motion.a
              key={article.id}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="block group border border-[var(--cinema-accent)] border-opacity-25 hover:border-opacity-60 transition-all duration-300 mb-4"
            >
              <div className="p-8 md:p-10 space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span
                      className="text-[10px] tracking-[0.08em] uppercase"
                      style={{ fontWeight: 500, color: "var(--cinema-accent)", opacity: 0.8 }}
                    >
                      {tagToCategory(article.tag_list)}
                    </span>
                    <span className="text-[10px] tracking-[0.06em] uppercase opacity-30" style={{ color: "var(--cinema-muted)" }}>
                      Dev.to
                    </span>
                  </div>
                  <ExternalLink
                    size={14}
                    className="opacity-30 group-hover:opacity-80 transition-opacity duration-300 shrink-0"
                    style={{ color: "var(--cinema-accent)" }}
                  />
                </div>

                <h2
                  className="text-[clamp(1.125rem,2.5vw,1.75rem)] leading-[1.25] tracking-tight group-hover:text-[var(--cinema-accent)] transition-colors duration-300"
                  style={{ fontWeight: 600, color: "var(--cinema-white)", letterSpacing: "-0.02em" }}
                >
                  {article.title}
                </h2>

                {article.description && (
                  <p className="text-sm leading-[1.7] max-w-2xl opacity-60" style={{ fontWeight: 400, color: "var(--cinema-muted)" }}>
                    {article.description}
                  </p>
                )}

                <div className="flex items-center gap-5 pt-1">
                  <span className="text-[10px] opacity-30" style={{ color: "var(--cinema-muted)" }}>
                    {formatDate(article.published_at)}
                  </span>
                  <span className="text-[10px] opacity-30" style={{ color: "var(--cinema-muted)" }}>
                    {article.reading_time_minutes} min read
                  </span>
                  {article.positive_reactions_count > 0 && (
                    <span className="text-[10px] opacity-25" style={{ color: "var(--cinema-muted)" }}>
                      ♥ {article.positive_reactions_count}
                    </span>
                  )}
                  <span
                    className="text-[10px] tracking-[0.06em] uppercase opacity-0 group-hover:opacity-70 transition-opacity duration-300 ml-auto"
                    style={{ color: "var(--cinema-accent)" }}
                  >
                    Read on Dev.to →
                  </span>
                </div>
              </div>
            </motion.a>
          ))}

          {/* Empty state */}
          {!loading && !error && articles.length === 0 && (
            <p className="text-sm opacity-30 italic" style={{ color: "var(--cinema-muted)" }}>
              No articles found. Check{" "}
              <a href="https://dev.to/shanky1992" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
                dev.to/shanky1992
              </a>{" "}
              directly.
            </p>
          )}
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-[var(--cinema-border)] mb-16 opacity-50" />

        {/* Upcoming */}
        <div className="space-y-0">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-6 mb-10"
          >
            <p
              className="text-[10px] tracking-[0.08em] uppercase opacity-30"
              style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
            >
              Ideas in the Queue
            </p>
            <div className="h-px flex-1 bg-[var(--cinema-border)] opacity-40" />
          </motion.div>

          {upcomingTopics.map((topic, index) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="border-b border-[var(--cinema-border)] py-7"
            >
              <div className="flex items-start gap-8">
                <div className="flex-1 space-y-2 min-w-0">
                  <span
                    className="text-[10px] tracking-[0.06em] uppercase opacity-50"
                    style={{ fontWeight: 400, color: "var(--cinema-accent)" }}
                  >
                    {topic.category}
                  </span>
                  <h2
                    className="text-[clamp(0.95rem,2vw,1.35rem)] leading-[1.35] tracking-tight"
                    style={{ fontWeight: 500, color: "var(--cinema-white)", opacity: 0.45, letterSpacing: "-0.015em" }}
                  >
                    {topic.title}
                  </h2>
                  <p
                    className="text-xs leading-[1.7] max-w-2xl opacity-30"
                    style={{ fontWeight: 400, color: "var(--cinema-muted)", fontStyle: "italic" }}
                  >
                    {topic.teaser}
                  </p>
                </div>
                <span
                  className="text-[9px] tracking-[0.08em] uppercase opacity-20 shrink-0 pt-1"
                  style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
                >
                  Soon
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-16 text-sm opacity-20 italic"
          style={{ fontWeight: 400, color: "var(--cinema-muted)" }}
        >
          More articles published at{" "}
          <a
            href="https://dev.to/shanky1992"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 hover:opacity-60 transition-opacity duration-200"
          >
            dev.to/shanky1992
          </a>
        </motion.p>
      </div>
    </div>
  );
}