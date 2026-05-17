import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCode, FaLayerGroup, FaUser } from "react-icons/fa";
import { projects } from "../data/content";
import Footer from "../sections/fotter/footer";

const catColor = {
  MERN:         "#00FFB2",
  Flutter:      "#60A5FA",
  "Full-Stack":  "#A78BFA",
  "UI/UX":      "#FF4D6D",
};

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const project  = useMemo(() => projects.find(p => p.slug === slug), [slug]);

  /* ── Not found ── */
  if (!project) {
    return (
      <main style={{ paddingTop: 88, minHeight: "100vh", background: "var(--c-bg)", color: "var(--c-text)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "4rem 1.5rem" }}>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--c-muted)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1rem" }}>404</div>
          <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 800, marginBottom: "1rem" }}>Project Not Found</h1>
          <p style={{ color: "var(--c-text-2)", marginBottom: "2rem" }}>The project you're looking for doesn't exist or was moved.</p>
          <Link to="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "11px 22px", background: "var(--c-primary)", color: "var(--c-bg)", borderRadius: 12, fontWeight: 700, fontSize: 14, textDecoration: "none" }}>
            <FaArrowLeft size={12} /> Back to Projects
          </Link>
        </div>
      </main>
    );
  }

  const accent = catColor[project.category] || "var(--c-primary)";
  /* safely get tech array — supports both .tech and .tags field names */
  const techList = project.tech || project.tags || [];

  return (
    <main style={{ paddingTop: 88, background: "var(--c-bg)", color: "var(--c-text)", minHeight: "100vh" }}>

      {/* ── Hero banner ── */}
      <div style={{ position: "relative", height: "clamp(260px,40vw,480px)", overflow: "hidden" }}>
        <img
          src={project.image} alt={project.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
        {/* Overlays */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(5,10,15,0.35) 0%, rgba(5,10,15,0.9) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse 60% 50% at 20% 80%, ${accent}18, transparent)` }} />

        {/* Hero text */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(1.5rem,4vw,3rem)", maxWidth: 1280, margin: "0 auto" }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 12px", borderRadius: 100, background: `${accent}18`, border: `1px solid ${accent}35`, fontFamily: "var(--f-mono)", fontSize: 11, color: accent, marginBottom: "0.85rem" }}>
              {project.category}
              {project.featured && <span style={{ marginLeft: 4, opacity: 0.7 }}>· Featured</span>}
            </div>
            <h1 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(1.8rem,5vw,3.5rem)", fontWeight: 800, lineHeight: 1.1, color: "#fff", marginBottom: "0.65rem", textShadow: "0 2px 20px rgba(0,0,0,0.5)" }}>
              {project.title}
            </h1>
            <p style={{ fontSize: "clamp(0.9rem,1.8vw,1.05rem)", color: "rgba(255,255,255,0.65)", maxWidth: 600, lineHeight: 1.65 }}>
              {project.description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ── Content ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "clamp(2rem,5vw,3.5rem) clamp(1.5rem,5vw,3rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,320px),1fr))", gap: "clamp(1.5rem,4vw,2.5rem)", alignItems: "start" }}>

          {/* ── Main content ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Back button */}
            <Link to="/projects" style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--c-text-2)", textDecoration: "none", fontSize: 13.5, fontWeight: 500, transition: "color .2s", width: "fit-content" }}
              onMouseEnter={e => e.currentTarget.style.color = accent}
              onMouseLeave={e => e.currentTarget.style.color = "var(--c-text-2)"}>
              <FaArrowLeft size={11} /> Back to Projects
            </Link>

            {/* Overview */}
            {project.longDesc && (
              <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border-muted)", borderRadius: 18, padding: "clamp(1.2rem,3vw,1.8rem)", backdropFilter: "blur(14px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${accent}18`, display: "flex", alignItems: "center", justifyContent: "center", color: accent, fontSize: 13 }}><FaLayerGroup /></div>
                  <h2 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(1rem,2vw,1.2rem)", fontWeight: 700, color: "var(--c-text)" }}>Project Overview</h2>
                </div>
                <p style={{ fontSize: 14.5, color: "var(--c-text-2)", lineHeight: 1.75 }}>{project.longDesc}</p>
              </div>
            )}

            {/* Details */}
            {project.details && (
              <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border-muted)", borderRadius: 18, padding: "clamp(1.2rem,3vw,1.8rem)", backdropFilter: "blur(14px)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${accent}18`, display: "flex", alignItems: "center", justifyContent: "center", color: accent, fontSize: 13 }}><FaCode /></div>
                  <h2 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(1rem,2vw,1.2rem)", fontWeight: 700, color: "var(--c-text)" }}>Why It Stands Out</h2>
                </div>
                <p style={{ fontSize: 14.5, color: "var(--c-text-2)", lineHeight: 1.75 }}>{project.details}</p>
              </div>
            )}

            {/* Tech stack full list */}
            {techList.length > 0 && (
              <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border-muted)", borderRadius: 18, padding: "clamp(1.2rem,3vw,1.8rem)", backdropFilter: "blur(14px)" }}>
                <h2 style={{ fontFamily: "var(--f-display)", fontSize: "clamp(1rem,2vw,1.15rem)", fontWeight: 700, color: "var(--c-text)", marginBottom: "1rem" }}>Tech Stack</h2>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {techList.map(t => (
                    <span key={t} style={{ fontSize: 12.5, padding: "5px 13px", borderRadius: 8, background: `${accent}12`, border: `1px solid ${accent}28`, color: accent, fontFamily: "var(--f-mono)" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* ── Sidebar ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: "1rem", position: "sticky", top: 96 }}
          >
            {/* Meta card */}
            <div style={{ background: "var(--c-surface)", border: "1px solid var(--c-border-muted)", borderRadius: 18, padding: "clamp(1.2rem,3vw,1.6rem)", backdropFilter: "blur(14px)" }}>
              <h3 style={{ fontFamily: "var(--f-mono)", fontSize: 10.5, color: "var(--c-muted)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.2rem" }}>Project Info</h3>

              {[
                { label: "Category", value: project.category, icon: <FaLayerGroup size={12} /> },
                { label: "Role",     value: project.role ?? "Full-Stack Developer", icon: <FaUser size={12} /> },
                { label: "Tools",    value: techList.join(", "), icon: <FaCode size={12} /> },
              ].map(row => (
                <div key={row.label} style={{ display: "flex", gap: 12, paddingBottom: "1rem", marginBottom: "1rem", borderBottom: "1px solid var(--c-border-muted)" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${accent}12`, display: "flex", alignItems: "center", justifyContent: "center", color: accent, flexShrink: 0, marginTop: 2 }}>
                    {row.icon}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--f-mono)", fontSize: 10, color: "var(--c-muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 3 }}>{row.label}</div>
                    <div style={{ fontSize: 13.5, color: "var(--c-text)", fontWeight: 500 }}>{row.value}</div>
                  </div>
                </div>
              ))}

              {/* Links */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px", background: "var(--c-surface-2)", border: "1px solid var(--c-border-muted)", borderRadius: 12, color: "var(--c-text)", fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 13.5, textDecoration: "none", transition: "all .25s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = accent; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--c-border-muted)"; e.currentTarget.style.color = "var(--c-text)"; }}>
                    <FaGithub size={14} /> View Repository
                  </a>
                )}
                {project.demo && project.demo !== project.github && (
                  <a href={project.demo} target="_blank" rel="noopener noreferrer"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px", background: accent, color: "var(--c-bg)", borderRadius: 12, fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 13.5, textDecoration: "none", transition: "transform .2s, box-shadow .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 28px ${accent}45`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                    <FaExternalLinkAlt size={12} /> Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* More projects nudge */}
            <Link to="/projects"
              style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "11px", background: "var(--c-surface)", border: "1px solid var(--c-border-muted)", borderRadius: 12, color: "var(--c-text-2)", fontSize: 13, fontWeight: 500, textDecoration: "none", transition: "all .25s" }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--c-text)"; e.currentTarget.style.borderColor = "var(--c-border)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--c-text-2)"; e.currentTarget.style.borderColor = "var(--c-border-muted)"; }}>
              <FaArrowLeft size={11} /> All Projects
            </Link>
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
