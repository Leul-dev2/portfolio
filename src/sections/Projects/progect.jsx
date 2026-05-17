import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaGithub, FaExternalLinkAlt, FaChevronRight } from "react-icons/fa";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { projects as projectList } from "../../data/content";

const categories = ["All", "MERN", "Flutter", "Full-Stack", "UI/UX"];

/* ── category accent colors ── */
const catColor = {
  MERN:        "#00FFB2",
  Flutter:     "#60A5FA",
  "Full-Stack": "#A78BFA",
  "UI/UX":     "#FF4D6D",
};

/* ── Project Card ── */
function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const accent = catColor[project.category] || "var(--c-primary)";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 28, scale: 0.96 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.23, 1, 0.32, 1] }}
      style={{ height: "100%" }}
    >
      <Link to={`/project/${project.slug}`} style={{ display: "block", height: "100%", textDecoration: "none" }}>
        <Tilt
          glareEnable glareMaxOpacity={0.08} glareColor="#ffffff"
          scale={1.025} transitionSpeed={2200}
          style={{ height: "100%" }}
        >
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              position: "relative", height: "100%",
              borderRadius: 20, overflow: "hidden",
              background: "var(--c-surface)",
              border: `1px solid ${hovered ? accent + "30" : "var(--c-border-muted)"}`,
              backdropFilter: "blur(16px)",
              display: "flex", flexDirection: "column",
              transition: "border-color .4s ease, box-shadow .4s ease",
              boxShadow: hovered ? `0 24px 56px ${accent}12` : "none",
            }}
          >
            {/* ── Image ── */}
            <div style={{ position: "relative", height: 188, overflow: "hidden", flexShrink: 0 }}>
              <img
                src={project.image} alt={project.title}
                style={{
                  width: "100%", height: "100%", objectFit: "cover", display: "block",
                  transform: hovered ? "scale(1.08)" : "scale(1)",
                  transition: "transform .65s cubic-bezier(.23,1,.32,1)",
                }}
              />
              {/* gradient overlay */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 30%, rgba(5,10,15,0.85) 100%)" }} />

              {/* Featured badge */}
              {project.featured && (
                <div style={{
                  position: "absolute", top: 10, left: 10,
                  padding: "3px 10px", borderRadius: 6,
                  background: "linear-gradient(90deg, var(--c-primary), #00D4FF)",
                  color: "var(--c-bg)", fontFamily: "var(--f-mono)",
                  fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
                }}>
                  ✦ Featured
                </div>
              )}

              {/* Category badge */}
              <div style={{
                position: "absolute", top: 10, right: 10,
                padding: "3px 10px", borderRadius: 6,
                background: "rgba(5,10,15,0.72)", backdropFilter: "blur(10px)",
                border: `1px solid ${accent}40`,
                fontFamily: "var(--f-mono)", fontSize: 10, color: accent,
              }}>
                {project.category}
              </div>

              {/* Hover CTA strip */}
              <motion.div
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
                transition={{ duration: 0.25 }}
                style={{
                  position: "absolute", bottom: 0, left: 0, right: 0,
                  padding: "10px 14px",
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                }}
              >
                <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--c-text-2)" }}>
                  View Details
                </span>
                <div style={{ display: "flex", gap: 6 }}>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener"
                      onClick={e => e.stopPropagation()}
                      style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(5,10,15,0.75)", border: "1px solid var(--c-border-muted)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--c-text-2)", textDecoration: "none", transition: "color .2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "var(--c-primary)"}
                      onMouseLeave={e => e.currentTarget.style.color = "var(--c-text-2)"}>
                      <FaGithub size={12} />
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener"
                      onClick={e => e.stopPropagation()}
                      style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(5,10,15,0.75)", border: "1px solid var(--c-border-muted)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--c-text-2)", textDecoration: "none", transition: "color .2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = accent}
                      onMouseLeave={e => e.currentTarget.style.color = "var(--c-text-2)"}>
                      <FaExternalLinkAlt size={10} />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>

            {/* ── Body ── */}
            <div style={{ padding: "clamp(1rem,2.5vw,1.3rem)", display: "flex", flexDirection: "column", gap: "0.65rem", flex: 1 }}>
              <h3 style={{
                fontFamily: "var(--f-display)", fontSize: "clamp(0.95rem,1.8vw,1.05rem)",
                fontWeight: 700, color: hovered ? accent : "var(--c-text)",
                display: "flex", alignItems: "center", gap: 6,
                transition: "color .3s ease", lineHeight: 1.3,
              }}>
                {project.title}
                <motion.span
                  animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
                  transition={{ duration: 0.22 }}
                  style={{ marginLeft: "auto", flexShrink: 0 }}
                >
                  <FaChevronRight size={10} />
                </motion.span>
              </h3>

              <p style={{
                fontSize: 13, color: "var(--c-text-2)", lineHeight: 1.65,
                display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                flex: 1,
              }}>
                {project.description}
              </p>

              {/* Tech stack tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginTop: "auto" }}>
                {project.tech.slice(0, 3).map((t) => (
                  <span key={t} style={{
                    fontSize: 10.5, padding: "3px 9px", borderRadius: 6,
                    background: hovered ? `${accent}12` : "var(--c-surface-2)",
                    border: `1px solid ${hovered ? accent + "25" : "var(--c-border-muted)"}`,
                    color: hovered ? accent : "var(--c-text-2)",
                    fontFamily: "var(--f-mono)",
                    transition: "all .3s ease",
                  }}>
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span style={{
                    fontSize: 10.5, padding: "3px 9px", borderRadius: 6,
                    background: "var(--c-surface-2)", border: "1px solid var(--c-border-muted)",
                    color: "var(--c-muted)", fontFamily: "var(--f-mono)",
                  }}>
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            </div>

            {/* Accent glow on hover */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute", inset: 0, pointerEvents: "none",
                background: `radial-gradient(ellipse 70% 40% at 50% 100%, ${accent}10, transparent)`,
              }}
            />
          </div>
        </Tilt>
      </Link>
    </motion.div>
  );
}

/* ── Featured highlight row ── */
function FeaturedCard({ project }) {
  const [hovered, setHovered] = useState(false);
  const accent = catColor[project.category] || "var(--c-primary)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.7 }}
      style={{ gridColumn: "1 / -1", marginBottom: "0.5rem" }}
    >
      <Link to={`/project/${project.slug}`} style={{ display: "block", textDecoration: "none" }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,320px),1fr))",
            gap: 0,
            borderRadius: 22,
            overflow: "hidden",
            border: `1px solid ${hovered ? accent + "35" : "var(--c-border-muted)"}`,
            background: "var(--c-surface)",
            backdropFilter: "blur(16px)",
            transition: "border-color .4s, box-shadow .4s",
            boxShadow: hovered ? `0 28px 60px ${accent}14` : "none",
          }}
        >
          {/* Image */}
          <div style={{ position: "relative", minHeight: 240, overflow: "hidden" }}>
            <img src={project.image} alt={project.title}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block",
                transform: hovered ? "scale(1.06)" : "scale(1)",
                transition: "transform .65s cubic-bezier(.23,1,.32,1)" }} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg, transparent 60%, rgba(5,10,15,0.9) 100%)" }} />
            <div style={{ position:"absolute", top:14, left:14, padding:"4px 12px", borderRadius:8, background:`linear-gradient(90deg, ${accent}, #00D4FF)`, color:"var(--c-bg)", fontFamily:"var(--f-mono)", fontSize:10.5, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>
              ✦ Featured Project
            </div>
          </div>

          {/* Content */}
          <div style={{ padding: "clamp(1.5rem,4vw,2.5rem)", display:"flex", flexDirection:"column", gap:"1rem" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"4px 12px", borderRadius:100, background:`${accent}14`, border:`1px solid ${accent}28`, fontFamily:"var(--f-mono)", fontSize:10.5, color:accent, width:"fit-content" }}>
              {project.category}
            </div>
            <h3 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.3rem,3vw,1.8rem)", fontWeight:800, color:"var(--c-text)", lineHeight:1.15 }}>
              {project.title}
            </h3>
            <p style={{ fontSize:14, color:"var(--c-text-2)", lineHeight:1.7, maxWidth:420 }}>
              {project.description}
            </p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
              {project.tech.map(t => (
                <span key={t} style={{ fontSize:11.5, padding:"4px 11px", borderRadius:7, background:`${accent}12`, border:`1px solid ${accent}25`, color:accent, fontFamily:"var(--f-mono)" }}>
                  {t}
                </span>
              ))}
            </div>
            <div style={{ display:"flex", gap:10, marginTop:4 }}>
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener"
                  onClick={e => e.stopPropagation()}
                  style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"9px 18px", background:"var(--c-surface-2)", border:"1px solid var(--c-border-muted)", borderRadius:10, color:"var(--c-text)", fontFamily:"var(--f-body)", fontWeight:600, fontSize:13, textDecoration:"none", transition:"all .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor="var(--c-border)"; e.currentTarget.style.color=accent; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor="var(--c-border-muted)"; e.currentTarget.style.color="var(--c-text)"; }}>
                  <FaGithub size={13}/> GitHub
                </a>
              )}
              {project.demo && (
                <a href={project.demo} target="_blank" rel="noopener"
                  onClick={e => e.stopPropagation()}
                  style={{ display:"inline-flex", alignItems:"center", gap:7, padding:"9px 18px", background:accent, color:"var(--c-bg)", borderRadius:10, fontFamily:"var(--f-body)", fontWeight:700, fontSize:13, textDecoration:"none", transition:"transform .2s, box-shadow .2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform="translateY(-2px)"; e.currentTarget.style.boxShadow=`0 10px 28px ${accent}40`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
                  <FaExternalLinkAlt size={11}/> Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

/* ── Main ── */
export default function Projects() {
  const [active, setActive] = useState("All");

  const filtered = active === "All"
    ? projectList
    : projectList.filter(p => p.category === active);

  const featuredProject = projectList.find(p => p.featured);
  const gridProjects    = active === "All"
    ? projectList.filter(p => !p.featured)
    : filtered;
  const showFeatured    = active === "All" && featuredProject;

  return (
    <section id="projects" style={{ position:"relative", padding:"clamp(4rem,9vw,7rem) 0", overflow:"hidden", background:"var(--c-bg)" }}>

      {/* BG */}
      <div style={{ position:"absolute", top:"5%", right:"-18%", width:"55vw", height:"55vw", maxWidth:680, background:"radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(80px)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", bottom:"0%", left:"-14%", width:"45vw", height:"45vw", maxWidth:550, background:"radial-gradient(circle, rgba(0,255,178,0.05) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(80px)", pointerEvents:"none", zIndex:0 }} />

      <div style={{ position:"relative", zIndex:10, maxWidth:1280, margin:"0 auto", padding:"0 clamp(1.5rem,5vw,3rem)" }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.65 }} style={{ marginBottom:"3rem" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:"0.75rem" }}>
            <div style={{ width:22,height:1,background:"var(--c-primary)" }} />
            <span style={{ fontFamily:"var(--f-mono)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--c-primary)" }}>My Work</span>
            <div style={{ width:6,height:1,background:"var(--c-primary)",opacity:0.4 }} />
          </div>
          <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.9rem,4.5vw,3rem)", fontWeight:800, lineHeight:1.1, color:"var(--c-text)", maxWidth:580, marginBottom:"0.85rem" }}>
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p style={{ color:"var(--c-text-2)", fontSize:"clamp(0.9rem,1.6vw,1rem)", maxWidth:520, lineHeight:1.7 }}>
            A selection of projects that showcase my skills and passion for building great software.
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.1 }}
          style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:8, marginBottom:"3rem" }}
        >
          {categories.map(cat => {
            const isActive = active === cat;
            const color = catColor[cat] || "var(--c-primary)";
            return (
              <motion.button
                key={cat}
                onClick={() => setActive(cat)}
                whileHover={{ y:-2 }}
                whileTap={{ scale:0.96 }}
                style={{
                  padding:"8px 18px", borderRadius:10, fontSize:13, fontWeight:600,
                  fontFamily:"var(--f-body)", cursor:"pointer", border:"1px solid",
                  transition:"all .25s ease",
                  background:   isActive ? color : "var(--c-surface)",
                  borderColor:  isActive ? color  : "var(--c-border-muted)",
                  color:        isActive ? "var(--c-bg)" : "var(--c-text-2)",
                  boxShadow:    isActive ? `0 6px 20px ${color}35` : "none",
                }}
              >
                {cat}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Featured full-width card */}
        {showFeatured && <FeaturedCard project={featuredProject} />}

        {/* Grid */}
        <LayoutGroup>
          <motion.div layout style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(min(100%,300px),1fr))", gap:"clamp(1rem,2.5vw,1.4rem)" }}>
            <AnimatePresence mode="popLayout">
              {gridProjects.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* GitHub CTA */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }} transition={{ delay:0.3 }}
          style={{ textAlign:"center", marginTop:"3rem" }}>
          <motion.a
            href="https://github.com/leul-dev2"
            target="_blank" rel="noopener noreferrer"
            whileHover={{ y:-2, borderColor:"var(--c-border)", color:"var(--c-primary)" }}
            style={{
              display:"inline-flex", alignItems:"center", gap:8,
              padding:"11px 22px", borderRadius:12,
              background:"var(--c-surface)", border:"1px solid var(--c-border-muted)",
              color:"var(--c-text-2)", fontSize:13.5, fontWeight:600,
              textDecoration:"none", backdropFilter:"blur(12px)",
              transition:"all .25s",
            }}
          >
            <FaGithub size={15} /> View More on GitHub
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
