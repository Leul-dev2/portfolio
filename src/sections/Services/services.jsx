import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { FaLaptopCode, FaRocket, FaMobileAlt, FaDatabase, FaArrowUp, FaPalette, FaShieldAlt, FaCloud } from "react-icons/fa";

const services = [
  { icon:<FaLaptopCode size={22}/>, title:"MERN Stack Development",  desc:"Architecting robust full-stack apps with MongoDB, Express, React, and Node.js. From RESTful APIs to real-time dashboards.", tags:["MongoDB","Express","React","Node.js"],   color:"#00FFB2", grad:"linear-gradient(135deg,#00FFB2,#00D4FF)" },
  { icon:<FaMobileAlt  size={22}/>, title:"Cross-Platform Apps",     desc:"Building beautiful native-like mobile and web apps from a single codebase using Flutter & Dart. Fast, flexible, feature-rich.", tags:["Flutter","Dart","iOS","Android"],        color:"#7C3AED", grad:"linear-gradient(135deg,#7C3AED,#A78BFA)" },
  { icon:<FaDatabase   size={22}/>, title:"Database & API Design",   desc:"Designing optimized database schemas, ensuring data integrity, and building high-performance APIs for seamless communication.", tags:["REST APIs","GraphQL","SQL","NoSQL"],       color:"#4ADE80", grad:"linear-gradient(135deg,#4ADE80,#22D3EE)" },
  { icon:<FaPalette    size={22}/>, title:"UI/UX Design",            desc:"Creating intuitive, pixel-perfect interfaces with a focus on user experience. From wireframes to polished prototypes.",          tags:["Figma","Prototyping","Design Systems","A11y"], color:"#FF4D6D", grad:"linear-gradient(135deg,#FF4D6D,#F97316)" },
  { icon:<FaShieldAlt  size={22}/>, title:"Security & Performance",  desc:"Implementing best practices for application security, performance optimization, and scalability for production-grade apps.",      tags:["Auth","Optimization","Testing","CI/CD"],  color:"#F59E0B", grad:"linear-gradient(135deg,#F59E0B,#F97316)" },
  { icon:<FaCloud      size={22}/>, title:"Cloud & DevOps",          desc:"Deploying and managing apps on cloud platforms. Setting up CI/CD pipelines, containerization, and monitoring.",                   tags:["AWS","Docker","Vercel","GitHub Actions"],  color:"#60A5FA", grad:"linear-gradient(135deg,#60A5FA,#818CF8)" },
];

function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.09, ease: [0.23, 1, 0.32, 1] }}
    >
      <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7} scale={1.025} transitionSpeed={2200} glareEnable glareMaxOpacity={0.06} glareColor="#ffffff">
        <div
          style={{ height: "100%", position: "relative", borderRadius: 20, cursor: "default" }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          {/* Glow */}
          <div style={{
            position: "absolute", inset: -1, borderRadius: 21,
            background: hovered ? `linear-gradient(135deg, ${service.color}22, transparent)` : "transparent",
            transition: "background 0.5s ease", zIndex: 0,
          }} />

          <div style={{
            position: "relative", zIndex: 1, height: "100%", minHeight: 270,
            background: "var(--c-surface)", backdropFilter: "blur(16px)",
            border: `1px solid ${hovered ? service.color + "28" : "var(--c-border-muted)"}`,
            borderRadius: 20, padding: "clamp(1.2rem,3vw,1.8rem)",
            display: "flex", flexDirection: "column",
            transition: "border-color 0.4s ease, box-shadow 0.4s ease",
            boxShadow: hovered ? `0 20px 48px ${service.color}14` : "none",
          }}>
            {/* Icon */}
            <div style={{
              width: 48, height: 48, borderRadius: 14,
              background: hovered ? service.grad : "var(--c-surface-2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: hovered ? "var(--c-bg)" : service.color,
              marginBottom: "1.2rem",
              transition: "background 0.4s ease, color 0.4s ease, transform 0.4s ease",
              transform: hovered ? "scale(1.1)" : "scale(1)",
              boxShadow: hovered ? `0 8px 20px ${service.color}40` : "none",
            }}>
              {service.icon}
            </div>

            {/* Title */}
            <h3 style={{
              fontFamily: "var(--f-display)", fontSize: "clamp(0.95rem,1.8vw,1.1rem)",
              fontWeight: 700, color: "var(--c-text)", marginBottom: "0.6rem",
              transition: "color 0.3s",
            }}>
              {service.title}
            </h3>

            {/* Desc */}
            <p style={{
              fontSize: 13.5, color: "var(--c-text-2)", lineHeight: 1.68,
              marginBottom: "1.2rem", flex: 1,
            }}>
              {service.desc}
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
              {service.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 11, padding: "3px 10px", borderRadius: 6,
                  background: hovered ? `${service.color}12` : "var(--c-surface-2)",
                  border: `1px solid ${hovered ? service.color + "28" : "var(--c-border-muted)"}`,
                  color: hovered ? service.color : "var(--c-text-2)",
                  fontFamily: "var(--f-mono)",
                  transition: "all 0.35s ease",
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <motion.div
              animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.7 }}
              transition={{ duration: 0.25 }}
              style={{
                position: "absolute", bottom: 18, right: 18,
                width: 32, height: 32, borderRadius: "50%",
                background: service.grad,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "var(--c-bg)", fontSize: 13, fontWeight: 700,
              }}
            >
              ↗
            </motion.div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <section id="services" style={{ position: "relative", padding: "clamp(4rem,9vw,7rem) 0", overflow: "hidden", background: "var(--c-bg)" }}>

      {/* BG */}
      <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", opacity:0.02, backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize:"40px 40px" }} />
      <div style={{ position:"absolute", top:"10%", right:"-15%", width:"50vw", height:"50vw", maxWidth:600, background:"radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(70px)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", bottom:"5%", left:"-12%", width:"40vw", height:"40vw", maxWidth:500, background:"radial-gradient(circle, rgba(0,255,178,0.05) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(70px)", pointerEvents:"none", zIndex:0 }} />

      <div style={{ position:"relative", zIndex:10, maxWidth:1280, margin:"0 auto", padding:"0 clamp(1.5rem,5vw,3rem)" }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.65 }} style={{ marginBottom:"3.5rem" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:"0.75rem" }}>
            <div style={{ width:22,height:1,background:"var(--c-primary)" }} />
            <span style={{ fontFamily:"var(--f-mono)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--c-primary)" }}>What I Do</span>
            <div style={{ width:6,height:1,background:"var(--c-primary)",opacity:0.4 }} />
          </div>
          <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.9rem,4.5vw,3rem)", fontWeight:800, lineHeight:1.1, color:"var(--c-text)", maxWidth:580, marginBottom:"0.85rem" }}>
            Services &amp; <span className="gradient-text">Expertise</span>
          </h2>
          <p style={{ color:"var(--c-text-2)", fontSize:"clamp(0.9rem,1.6vw,1rem)", maxWidth:500, lineHeight:1.7 }}>
            End-to-end digital solutions tailored to bring your vision to life.
          </p>
        </motion.div>

        {/* Grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(min(100%,300px),1fr))", gap:"1.25rem" }}>
          {services.map((s, i) => <ServiceCard key={i} service={s} index={i} />)}
        </div>

        {/* CTA */}
        <motion.div initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.4 }} style={{ textAlign:"center", marginTop:"3.5rem" }}>
          <p style={{ color:"var(--c-text-2)", fontSize:14, marginBottom:"1.2rem" }}>Have a project in mind? Let's make it happen.</p>
          <motion.a
            href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" }); }}
            whileHover={{ y:-2, boxShadow:"0 14px 36px rgba(0,255,178,0.28)" }}
            whileTap={{ scale:0.97 }}
            style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"13px 28px", background:"var(--c-primary)", color:"var(--c-bg)", fontFamily:"var(--f-body)", fontWeight:700, fontSize:14, borderRadius:12, textDecoration:"none", boxShadow:"0 4px 20px rgba(0,255,178,0.2)" }}
          >
            <FaRocket size={13} /> Start a Project
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
            initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.8 }}
            whileHover={{ scale:1.1 }}
            style={{ position:"fixed", bottom:24, right:24, width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg, var(--c-primary), #00D4FF)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--c-bg)", border:"none", cursor:"pointer", boxShadow:"0 8px 24px rgba(0,255,178,0.3)", zIndex:50 }}
          >
            <FaArrowUp size={14} />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}
