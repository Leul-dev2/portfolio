import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaClock, FaTags, FaArrowLeft, FaUser } from "react-icons/fa";
import { articles } from "../data/content";
import Footer from "../sections/fotter/footer";

const tagColor = {
  Trends:  "#00FFB2",
  Flutter: "#60A5FA",
  MERN:    "#A78BFA",
  React:   "#22D3EE",
  Node:    "#4ADE80",
  Design:  "#FF4D6D",
};
const getColor = (tag) => tagColor[tag] || "var(--c-primary)";

export default function ArticlePage() {
  const { slug }   = useParams();
  const article    = useMemo(() => articles.find(a => a.slug === slug), [slug]);

  /* ── Not found ── */
  if (!article) {
    return (
      <main style={{ paddingTop: 88, minHeight: "100vh", background: "var(--c-bg)", color: "var(--c-text)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "4rem 1.5rem" }}>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--c-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>404</div>
          <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, marginBottom: "1rem" }}>Article Not Found</h1>
          <p style={{ color: "var(--c-text-2)", marginBottom: "2rem" }}>This article doesn't exist or was moved.</p>
          <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", background: "var(--c-primary)", color: "var(--c-bg)", borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
            <FaArrowLeft size={12} /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const accent = getColor(article.tag);

  return (
    <main style={{ paddingTop: 88, background: "var(--c-bg)", color: "var(--c-text)", minHeight: "100vh" }}>

      {/* ── Hero ── */}
      <div style={{ position: "relative", height: "clamp(240px,36vw,440px)", overflow: "hidden" }}>
        <img src={article.image} alt={article.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,10,15,0.3) 0%, rgba(5,10,15,0.92) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 55% 45% at 15% 85%, ${accent}16, transparent)` }} />

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(1.5rem,4vw,3rem)", maxWidth: 1280, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {/* Tag */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 100, background: `${accent}18`, border: `1px solid ${accent}38`, fontFamily: "var(--f-mono)", fontSize: 11, color: accent, marginBottom: "0.85rem" }}>
              <FaTags size={9} /> {article.tag}
            </div>
            <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(1.6rem,4.5vw,3.2rem)", fontWeight: 800, lineHeight: 1.12, color: "#fff", marginBottom: "0.75rem", textShadow: "0 2px 20px rgba(0,0,0,0.5)", maxWidth: 720 }}>
              {article.title}
            </h1>
            <p style={{ fontSize: "clamp(0.9rem,1.8vw,1.05rem)", color: "rgba(255,255,255,0.6)", maxWidth: 580, lineHeight: 1.65 }}>
              {article.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Content area ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(2rem,5vw,3.5rem) clamp(1.5rem,5vw,3rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,300px),1fr))", gap: "clamp(1.5rem,4vw,3rem)", alignItems: "start" }}>

          {/* ── Article body ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem", minWidth: 0 }}
          >
            {/* Back link */}
            <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--c-text-2)", textDecoration: "none", fontSize: 13.5, fontWeight: 500, width: "fit-content", transition: "color .2s" }}
              onMouseEnter={e => e.currentTarget.style.color = accent}
              onMouseLeave={e => e.currentTarget.style.color = "var(--c-text-2)"}>
              <FaArrowLeft size={11} /> Back to Blog
            </Link>

            {/* Meta strip */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", padding: "14px 18px", background: "var(--c-surface)", border: "1px solid var(--c-border-muted)", borderRadius: 14, backdropFilter: "blur(14px)" }}>
              {[
                { icon: <FaCalendarAlt size={10} style={{ color: accent }} />,       label: article.date      },
                { icon: <FaClock size={10} style={{ color: "var(--c-accent)" }} />,  label: article.readTime  },
                { icon: <FaUser size={10} style={{ color: "#60A5FA" }} />,           label: article.author || "Leul Seyoum" },
              ].map(m => (
                <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--f-mono)", fontSize: 11.5, color: "var(--c-text-2)" }}>
                  {m.icon} {m.label}
                </div>
              ))}
            </div>

            {/* HTML content */}
            <div
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                fontSize: "clamp(0.93rem,1.6vw,1.02rem)",
                lineHeight: 1.85,
                color: "var(--c-text-2)",
              }}
              className="apex-article-content"
            />

            {/* Bottom nav */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginTop: "1rem", padding: "16px 20px", background: "var(--c-surface)", border: "1px solid var(--c-border-muted)", borderRadius: 14, backdropFilter: "blur(14px)" }}>
              <span style={{ fontFamily: "var(--f-mono)", fontSize: 12, color: "var(--c-muted)" }}>
                Published · {article.date}
              </span>
              <Link to="/blog" style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "9px 18px", background: "var(--c-primary)", color: "var(--c-bg)", borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                <FaArrowLeft size={10} /> All Articles
              </Link>
            </div>
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.div
            initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "sticky", top: 96 }}
          >
            {/* Article info */}
            <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border-muted)", borderRadius: 18, padding: "clamp(1.2rem,3vw,1.6rem)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, color: "var(--c-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.2rem" }}>
                About This Article
              </h3>
              {[
                { label: "Topic",     value: article.tag },
                { label: "Author",    value: article.author || "Leul Seyoum" },
                { label: "Read Time", value: article.readTime },
                { label: "Published", value: article.date },
              ].map((row, i, arr) => (
                <div key={row.label} style={{ paddingBottom: i < arr.length - 1 ? "0.85rem" : 0, marginBottom: i < arr.length - 1 ? "0.85rem" : 0, borderBottom: i < arr.length - 1 ? "1px solid var(--c-border-muted)" : "none" }}>
                  <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--c-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{row.label}</div>
                  <div style={{ fontSize: 13.5, color: "var(--c-text)", fontWeight: 500 }}>{row.value}</div>
                </div>
              ))}
            </div>

            {/* Tag pill */}
            <div style={{ padding: "14px 18px", background: `${accent}08`, border: `1px solid ${accent}22`, borderRadius: 14, display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: accent, flexShrink: 0 }} />
              <div>
                <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--c-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>Category</div>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: accent }}>{article.tag}</div>
              </div>
            </div>

            {/* More articles */}
            <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border-muted)", borderRadius: 18, padding: "clamp(1rem,2.5vw,1.4rem)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, color: "var(--c-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>More Articles</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {articles.filter(a => a.slug !== slug).slice(0, 3).map(a => (
                  <Link key={a.slug} to={`/article/${a.slug}`} style={{ display: "flex", gap: 10, textDecoration: "none", padding: "8px", borderRadius: 10, transition: "background .2s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "var(--c-surface-2)"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <img src={a.image} alt={a.title} style={{ width: 44, height: 44, borderRadius: 8, objectFit: "cover", flexShrink: 0 }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ fontSize: 12.5, fontWeight: 600, color: "var(--c-text)", lineHeight: 1.35, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{a.title}</div>
                      <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--c-muted)", marginTop: 3 }}>{a.readTime}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Prose content styles injected globally */}
      <style>{`
        .apex-article-content h1,
        .apex-article-content h2,
        .apex-article-content h3 {
          font-family: var(--f-display);
          font-weight: 700;
          color: var(--c-text);
          margin: 2rem 0 0.85rem;
          line-height: 1.25;
        }
        .apex-article-content h2 { font-size: clamp(1.2rem,2.5vw,1.5rem); }
        .apex-article-content h3 { font-size: clamp(1rem,2vw,1.2rem); }
        .apex-article-content p  { margin-bottom: 1.25rem; }
        .apex-article-content strong { color: var(--c-text); font-weight: 600; }
        .apex-article-content code {
          font-family: var(--f-mono);
          font-size: 0.88em;
          padding: 2px 7px;
          border-radius: 5px;
          background: var(--c-surface-2);
          border: 1px solid var(--c-border-muted);
          color: var(--c-primary);
        }
        .apex-article-content pre {
          background: var(--c-surface);
          border: 1px solid var(--c-border-muted);
          border-radius: 12px;
          padding: 1.25rem;
          overflow-x: auto;
          margin-bottom: 1.5rem;
        }
        .apex-article-content pre code {
          background: none;
          border: none;
          padding: 0;
          font-size: 13px;
          color: var(--c-text-2);
        }
        .apex-article-content a {
          color: var(--c-primary);
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .apex-article-content ul,
        .apex-article-content ol {
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
          color: var(--c-text-2);
        }
        .apex-article-content li { margin-bottom: 0.5rem; }
        .apex-article-content blockquote {
          border-left: 3px solid var(--c-primary);
          padding: 0.75rem 1.25rem;
          margin: 1.5rem 0;
          background: var(--c-surface);
          border-radius: 0 10px 10px 0;
          color: var(--c-text-2);
          font-style: italic;
        }
      `}</style>

      <Footer />
    </main>
  );
}
