import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { FaGraduationCap, FaBriefcase, FaAward, FaHeart, FaDownload, FaTerminal, FaMobile, FaServer, FaArrowRight } from "react-icons/fa";
import { TechStack3D } from "../../components/SkillVisualization3D";

/* ═══ DATA ═══════════════════════════════════════════════════════════ */
const timeline = [
  { year:"2022", icon:<FaGraduationCap/>, title:"The Spark",    sub:"Started My Journey",  desc:"Wrote my first lines of code late at night with nothing but curiosity and a browser. Fell in love with how a few characters could make something real.",                                    color:"#00FFB2" },
  { year:"2023", icon:<FaMobile/>,        title:"Going Mobile",  sub:"Flutter Developer",   desc:"Discovered Flutter and never looked back. Built cross-platform apps that felt native — smooth animations, real state management, production deployments.",                                    color:"#60A5FA" },
  { year:"2024", icon:<FaServer/>,        title:"Full-Stack",    sub:"MERN Stack",          desc:"APIs, databases, auth systems — learned to own the entire feature. From MongoDB schemas to React UIs, no more hand-offs.",                                                                    color:"#A78BFA" },
  { year:"2025", icon:<FaHeart/>,         title:"Building in Public", sub:"Open Source",    desc:"Shipping real things, helping others learn, and pushing code that people actually use. The journey continues.",                                                                              color:"#FF4D6D" },
];

const skills = [
  { name:"Flutter",    level:93, icon:"💙", color:"#60A5FA", cat:"Mobile"   },
  { name:"React",      level:88, icon:"⚛️",  color:"#00FFB2", cat:"Frontend" },
  { name:"Firebase",   level:90, icon:"🔥", color:"#FFCA28", cat:"Backend"  },
  { name:"Node.js",    level:85, icon:"🟢", color:"#4ADE80", cat:"Backend"  },
  { name:"MongoDB",    level:83, icon:"🍃", color:"#4ADE80", cat:"Database" },
  { name:"Dart",       level:91, icon:"🎯", color:"#60A5FA", cat:"Mobile"   },
  { name:"TypeScript", level:80, icon:"📘", color:"#3178C6", cat:"Frontend" },
  { name:"Figma",      level:75, icon:"🎨", color:"#FF4D6D", cat:"Design"   },
];

const techStack = [
  { name:"React",color:"#61DAFB"},{name:"Flutter",color:"#02569B"},{name:"Node.js",color:"#3C873A"},
  { name:"MongoDB",color:"#47A248"},{name:"TypeScript",color:"#3178C6"},{name:"Tailwind",color:"#38B2AC"},
  { name:"Firebase",color:"#FFCA28"},{name:"Git",color:"#F05032"},{name:"Figma",color:"#F24E1E"},
  { name:"Next.js",color:"#ffffff"},{name:"Docker",color:"#2496ED"},{name:"AWS",color:"#FF9900"},
];

const STRIP = ["Flutter","⚡","React","✦","Firebase","⚡","Node.js","✦","MongoDB","⚡","TypeScript","✦","Dart","⚡","Next.js","✦","Figma","⚡","Flutter","⚡","React","✦","Firebase","⚡","Node.js","✦","MongoDB","⚡","TypeScript","✦"];

const TERMINAL_SCRIPT = [
  { prompt:true,  text:"cat about.json",                             delay:0    },
  { prompt:false, text:"{",                                          delay:500  },
  { prompt:false, text:'  "name": "Leul Seyoum",',                  delay:700  },
  { prompt:false, text:'  "role": "Flutter & Full-Stack Dev",',      delay:900  },
  { prompt:false, text:'  "location": "Addis Ababa, Ethiopia",',     delay:1100 },
  { prompt:false, text:'  "experience": "3+ years",',                delay:1300 },
  { prompt:false, text:'  "stack": ["Flutter","React","Node","Firebase"],', delay:1500 },
  { prompt:false, text:'  "status": "open to work",',                delay:1700 },
  { prompt:false, text:'  "superpower": "ships things fast"',        delay:1900 },
  { prompt:false, text:"}",                                          delay:2100 },
  { prompt:true,  text:"_",                                          delay:2400, blink:true },
];

/* ═══ TERMINAL BIO ═════════════════════════════════════════════════ */
function TerminalBio() {
  const [lines, setLines] = useState([]);
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-80px" });
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const timers = TERMINAL_SCRIPT.map(line =>
      setTimeout(() => setLines(prev => [...prev, line]), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, [inView]);

  const color = (line) => {
    if (line.prompt)                     return "var(--c-primary)";
    if (line.text.includes('"name"'))    return "#60A5FA";
    if (line.text.includes('"role"'))    return "#A78BFA";
    if (line.text.includes('"status"')) return "#4ADE80";
    if (line.text.includes('"superpower"')) return "#FF4D6D";
    if (line.text === "{" || line.text === "}") return "var(--c-muted)";
    if (line.text.startsWith("  \""))   return "var(--c-text-2)";
    return "var(--c-text)";
  };

  return (
    <motion.div ref={ref} initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.7 }}
      style={{ background:"rgba(5,10,15,0.92)", border:"1px solid rgba(0,255,178,0.12)", borderRadius:18, overflow:"hidden", boxShadow:"0 32px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,255,178,0.06)" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 16px", background:"rgba(255,255,255,0.03)", borderBottom:"1px solid rgba(0,255,178,0.06)" }}>
        <div style={{ display:"flex", gap:6 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map(c => <div key={c} style={{ width:11,height:11,borderRadius:"50%",background:c }} />)}
        </div>
        <span style={{ fontFamily:"var(--f-mono)", fontSize:11, color:"var(--c-muted)" }}>leul@portfolio — bash</span>
        <FaTerminal size={11} style={{ color:"var(--c-muted)" }} />
      </div>
      <div style={{ padding:"18px 20px", fontFamily:"var(--f-mono)", fontSize:"clamp(11px,1.5vw,13px)", lineHeight:1.75, minHeight:240 }}>
        {lines.map((line, i) => (
          <div key={i} style={{ display:"flex", gap:8, animation:"apex-data-in 0.18s ease" }}>
            {line.prompt && <span style={{ color:"var(--c-primary)", userSelect:"none" }}>$</span>}
            {!line.prompt && <span style={{ width:16, flexShrink:0 }} />}
            <span style={{ color:color(line) }}>
              {line.blink
                ? <motion.span animate={{ opacity:[1,0,1] }} transition={{ repeat:Infinity, duration:1 }}>▌</motion.span>
                : line.text}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ═══ HEX SKILL CARD ═══════════════════════════════════════════════ */
function HexSkill({ skill, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-50px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity:0, scale:0.7, rotate:-8 }}
      animate={inView ? { opacity:1, scale:1, rotate:0 } : {}}
      transition={{ duration:0.6, delay:index*0.07, ease:[0.23,1,0.32,1] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position:"relative", cursor:"default" }}
    >
      <motion.div
        animate={{ y:hovered ? -8 : 0, scale:hovered ? 1.06 : 1 }}
        transition={{ duration:0.35, ease:[0.23,1,0.32,1] }}
        style={{
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:6,
          width:"clamp(88px,11vw,116px)", height:"clamp(88px,11vw,116px)",
          background: hovered ? `linear-gradient(135deg, ${skill.color}22, ${skill.color}08)` : "var(--c-surface)",
          border:`1.5px solid ${hovered ? skill.color+"55" : "var(--c-border-muted)"}`,
          borderRadius:20,
          boxShadow: hovered ? `0 20px 40px ${skill.color}22, 0 0 0 1px ${skill.color}20` : "none",
          transition:"background .35s, border-color .35s, box-shadow .35s",
          backdropFilter:"blur(14px)",
        }}
      >
        <span style={{ fontSize:"clamp(18px,2.8vw,24px)" }}>{skill.icon}</span>
        <span style={{ fontFamily:"var(--f-display)", fontSize:"clamp(9px,1.3vw,11.5px)", fontWeight:700, color:hovered ? skill.color : "var(--c-text)", textAlign:"center", transition:"color .3s", lineHeight:1.2 }}>
          {skill.name}
        </span>
        <div style={{ width:32, height:3, borderRadius:2, background:"rgba(255,255,255,0.05)", overflow:"hidden" }}>
          <motion.div
            initial={{ width:0 }}
            animate={inView ? { width:`${skill.level}%` } : {}}
            transition={{ duration:1.2, delay:index*0.07+0.5, ease:[0.23,1,0.32,1] }}
            style={{ height:"100%", borderRadius:2, background:skill.color }}
          />
        </div>
        <span style={{ fontFamily:"var(--f-mono)", fontSize:9, color:hovered ? skill.color : "var(--c-muted)", transition:"color .3s" }}>
          {skill.level}%
        </span>
      </motion.div>
      <AnimatePresence>
        {hovered && (
          <motion.div initial={{ opacity:0, y:6 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:4 }}
            style={{ position:"absolute", bottom:-28, left:"50%", transform:"translateX(-50%)", padding:"2px 8px", borderRadius:4, background:skill.color, color:"#000", fontFamily:"var(--f-mono)", fontSize:9, fontWeight:700, whiteSpace:"nowrap", zIndex:10 }}>
            {skill.cat}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ═══ BIG COUNTER ═════════════════════════════════════════════════ */
function BigCounter({ value, suffix, label, color, index }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    let cur = 0;
    const step = Math.ceil(value/50);
    const t = setInterval(() => { cur = Math.min(cur+step, value); setVal(cur); if (cur >= value) clearInterval(t); }, 35);
    return () => clearInterval(t);
  }, [inView, value]);

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, y:28 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6, delay:index*0.11 }}
      style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, padding:"clamp(1.2rem,3vw,1.8rem) 1rem", position:"relative" }}>
      <div style={{ fontFamily:"var(--f-display)", fontSize:"clamp(2.4rem,5.5vw,4rem)", fontWeight:800, lineHeight:1, color, textShadow:`0 0 40px ${color}55`, letterSpacing:"-0.03em" }}>
        {val}{suffix}
      </div>
      <div style={{ fontFamily:"var(--f-body)", fontSize:"clamp(11px,1.4vw,13px)", fontWeight:600, color:"var(--c-text)", textAlign:"center" }}>
        {label}
      </div>
      <div style={{ position:"absolute", bottom:0, left:"20%", right:"20%", height:1, background:`linear-gradient(90deg, transparent, ${color}40, transparent)` }} />
    </motion.div>
  );
}

/* ═══ TIMELINE PANEL ═══════════════════════════════════════════════ */
function TimelinePanel({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  const isEven = index % 2 === 0;

  const Card = () => (
    <motion.div whileHover={{ y:-4 }}
      style={{ maxWidth:320, width:"100%", background:"var(--c-surface)", backdropFilter:"blur(16px)", border:`1px solid ${item.color}25`, borderRadius:18, padding:"clamp(1rem,2.5vw,1.4rem)", boxShadow:`0 12px 32px ${item.color}10` }}>
      <div style={{ fontFamily:"var(--f-mono)", fontSize:10, color:item.color, letterSpacing:"0.12em", textTransform:"uppercase", marginBottom:8 }}>{item.sub}</div>
      <h3 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1rem,2vw,1.2rem)", fontWeight:800, color:"var(--c-text)", marginBottom:8, lineHeight:1.2 }}>{item.title}</h3>
      <p style={{ fontSize:"clamp(12px,1.4vw,13.5px)", color:"var(--c-text-2)", lineHeight:1.7 }}>{item.desc}</p>
    </motion.div>
  );

  return (
    <motion.div ref={ref}
      initial={{ opacity:0, x:isEven ? -60 : 60 }}
      animate={inView ? { opacity:1, x:0 } : {}}
      transition={{ duration:0.8, delay:index*0.15, ease:[0.23,1,0.32,1] }}
      style={{ display:"grid", gridTemplateColumns:"1fr 52px 1fr", gap:0, marginBottom:"clamp(1rem,3vw,1.5rem)", alignItems:"stretch" }}
    >
      <div style={{ display:"flex", justifyContent:"flex-end", paddingRight:"clamp(1rem,3vw,2rem)", paddingBottom:"1rem" }}>
        {isEven ? <Card /> : <div />}
      </div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", position:"relative" }}>
        <div style={{ flex:1, width:1, background:`linear-gradient(180deg, ${item.color}50, ${item.color}10)` }} />
        <motion.div
          animate={inView ? { scale:[0,1.4,1] } : {}}
          transition={{ duration:0.6, delay:index*0.15+0.25 }}
          style={{ width:46, height:46, borderRadius:"50%", flexShrink:0, background:`linear-gradient(135deg, ${item.color}, ${item.color}88)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#000", fontSize:16, boxShadow:`0 0 0 6px ${item.color}18, 0 0 24px ${item.color}40`, position:"relative", zIndex:2 }}>
          {item.icon}
        </motion.div>
        <motion.div initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:index*0.15+0.4 }}
          style={{ fontFamily:"var(--f-mono)", fontSize:11, fontWeight:700, color:item.color, marginTop:6, letterSpacing:"0.06em" }}>
          {item.year}
        </motion.div>
        <div style={{ flex:1, width:1, background:`linear-gradient(180deg, ${item.color}10, transparent)` }} />
      </div>
      <div style={{ paddingLeft:"clamp(1rem,3vw,2rem)", paddingBottom:"1rem" }}>
        {!isEven ? <Card /> : <div />}
      </div>
    </motion.div>
  );
}

/* ═══ MARQUEE ══════════════════════════════════════════════════════ */
function MarqueeStrip() {
  return (
    <div style={{ overflow:"hidden", margin:"0 calc(-1 * clamp(1.5rem,5vw,3rem))", borderTop:"1px solid var(--c-border-muted)", borderBottom:"1px solid var(--c-border-muted)", background:"var(--c-surface)", padding:"10px 0" }}>
      <div style={{ display:"flex", gap:"1.5rem", animation:"infinite-scroll 22s linear infinite", whiteSpace:"nowrap" }}>
        {STRIP.map((item, i) => (
          <span key={i} style={{ fontFamily: (item==="✦"||item==="⚡") ? "inherit" : "var(--f-mono)", fontSize:(item==="✦"||item==="⚡") ? 12 : 12.5, color:(item==="✦"||item==="⚡") ? "var(--c-primary)" : "var(--c-text-2)", fontWeight:600, letterSpacing:"0.05em", textTransform:"uppercase" }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ═══ MAIN ═════════════════════════════════════════════════════════ */
export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:sectionRef, offset:["start end","end start"] });
  const bgY      = useTransform(scrollYProgress, [0,1], ["-6%","6%"]);
  const photoScale = useTransform(scrollYProgress, [0,0.5], [0.96, 1.04]);

  return (
    <section id="about" ref={sectionRef} style={{ position:"relative", overflow:"hidden", background:"var(--c-bg-alt)" }}>

      {/* Ambient BG */}
      <motion.div style={{ y:bgY, position:"absolute", inset:0, zIndex:0, pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:"-15%", left:"-8%", width:"55vw", height:"55vw", maxWidth:700, background:"radial-gradient(circle, rgba(0,255,178,0.055) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(70px)" }} />
        <div style={{ position:"absolute", bottom:"-10%", right:"-6%", width:"45vw", height:"45vw", maxWidth:600, background:"radial-gradient(circle, rgba(124,58,237,0.055) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(70px)" }} />
        <div style={{ position:"absolute", top:"40%", right:"25%", width:"30vw", height:"30vw", maxWidth:400, background:"radial-gradient(circle, rgba(255,77,109,0.04) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(60px)" }} />
      </motion.div>
      <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", opacity:0.022, backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize:"32px 32px" }} />

      {/* ══ SECTION 1 — HERO BIO ══ */}
      <div style={{ position:"relative", zIndex:10, padding:"clamp(4rem,9vw,7rem) clamp(1.5rem,5vw,3rem) 0" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>

          {/* Big editorial headline */}
          <motion.div initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.65 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:"0.85rem" }}>
              <div style={{ width:22,height:1,background:"var(--c-primary)" }} />
              <span style={{ fontFamily:"var(--f-mono)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--c-primary)" }}>About Me</span>
              <div style={{ width:6,height:1,background:"var(--c-primary)",opacity:0.4 }} />
            </div>
            <h2 style={{ fontFamily:"var(--f-display)", fontWeight:800, lineHeight:0.95, fontSize:"clamp(3rem,8vw,7rem)", letterSpacing:"-0.04em", marginBottom:"clamp(1.5rem,4vw,2.5rem)" }}>
              <span style={{ display:"block", color:"var(--c-text)" }}>I Build</span>
              <span style={{ display:"block" }}>
                <span className="gradient-text">Things</span>
                <span style={{ color:"var(--c-muted)", fontWeight:300, fontSize:"0.55em", letterSpacing:"-0.01em", marginLeft:"0.3em" }}>that work.</span>
              </span>
            </h2>
          </motion.div>

          {/* Photo + Terminal two-col */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%,320px),1fr))", gap:"clamp(1.5rem,4vw,3rem)", alignItems:"start", marginBottom:"clamp(3rem,6vw,5rem)" }}>

            {/* Photo */}
            <motion.div style={{ scale:photoScale, position:"relative" }}
              initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8 }}>
              <Tilt tiltMaxAngleX={6} tiltMaxAngleY={6} scale={1.02} transitionSpeed={2400}>
                <div style={{ position:"relative", borderRadius:24, overflow:"hidden", aspectRatio:"4/5", maxHeight:520, border:"1px solid var(--c-border)" }}>
                  <img src="/leul.jpg" alt="Leul Seyoum" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"top center", display:"block" }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 55%, rgba(5,10,15,0.78) 100%)" }} />
                  <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"1.2rem 1.4rem" }}>
                    <div style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.4rem,3vw,1.8rem)", fontWeight:800, color:"#fff", lineHeight:1 }}>Leul Seyoum</div>
                    <div style={{ fontFamily:"var(--f-mono)", fontSize:11.5, color:"var(--c-primary)", marginTop:4, letterSpacing:"0.05em" }}>Flutter · Full-Stack · Addis Ababa</div>
                  </div>
                  <motion.div animate={{ y:[0,-8,0] }} transition={{ duration:3.5, repeat:Infinity, ease:"easeInOut" }}
                    style={{ position:"absolute", top:16, right:16, padding:"6px 13px", borderRadius:100, background:"rgba(5,10,15,0.82)", backdropFilter:"blur(12px)", border:"1px solid rgba(0,255,178,0.3)", display:"flex", alignItems:"center", gap:7 }}>
                    <span style={{ width:7,height:7,borderRadius:"50%",background:"#4ADE80",animation:"apex-pulse-ring 2s ease-in-out infinite",flexShrink:0 }} />
                    <span style={{ fontFamily:"var(--f-mono)", fontSize:10.5, color:"var(--c-primary)", fontWeight:600 }}>Available for work</span>
                  </motion.div>
                  <motion.div animate={{ y:[0,7,0] }} transition={{ duration:4, repeat:Infinity, ease:"easeInOut", delay:1 }}
                    style={{ position:"absolute", top:60, left:-14, padding:"6px 12px", borderRadius:10, background:"rgba(5,10,15,0.88)", backdropFilter:"blur(12px)", border:"1px solid rgba(96,165,250,0.3)", fontFamily:"var(--f-mono)", fontSize:10.5, color:"#60A5FA" }}>
                    💙 Flutter Expert
                  </motion.div>
                </div>
              </Tilt>
            </motion.div>

            {/* Right: terminal + bio + traits + CTA */}
            <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.8, delay:0.1 }}
              style={{ display:"flex", flexDirection:"column", gap:"clamp(1.2rem,3vw,1.8rem)" }}>
              <TerminalBio />
              <div style={{ background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", borderRadius:16, padding:"clamp(1rem,2.5vw,1.4rem)", backdropFilter:"blur(14px)" }}>
                <p style={{ fontSize:"clamp(13.5px,1.6vw,15px)", color:"var(--c-text-2)", lineHeight:1.8, margin:0 }}>
                  CS student graduating December 2026, self-teaching since 2022. I build{" "}
                  <span style={{ color:"var(--c-primary)", fontWeight:600 }}>Flutter apps</span>{" "}that feel native, and{" "}
                  <span style={{ color:"#60A5FA", fontWeight:600 }}>MERN web apps</span>{" "}that scale. I care about architecture, clean state management, and user experiences that don't suck.
                </p>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {[{ label:"Problem Solver",icon:"🧩"},{ label:"Self-Taught",icon:"📚"},{ label:"Ships Fast",icon:"🚀"},{ label:"Detail-Oriented",icon:"🎯"},{ label:"Team Player",icon:"🤝"}].map((t,i) => (
                  <motion.span key={t.label}
                    initial={{ opacity:0, scale:0.8 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:0.5+i*0.08 }}
                    whileHover={{ y:-2 }}
                    style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"6px 13px", borderRadius:100, background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", fontSize:12, fontWeight:600, color:"var(--c-text-2)", fontFamily:"var(--f-mono)", cursor:"default" }}>
                    <span>{t.icon}</span> {t.label}
                  </motion.span>
                ))}
              </div>
              <motion.a href="/Leul_Resume.pdf" target="_blank"
                whileHover={{ y:-2, boxShadow:"0 14px 34px rgba(0,255,178,0.28)" }} whileTap={{ scale:0.97 }}
                style={{ display:"inline-flex", alignItems:"center", gap:10, padding:"13px 24px", background:"var(--c-primary)", color:"var(--c-bg)", fontFamily:"var(--f-body)", fontWeight:700, fontSize:14, borderRadius:12, textDecoration:"none", width:"fit-content", boxShadow:"0 4px 20px rgba(0,255,178,0.2)" }}>
                <FaDownload size={13}/> Download Resume <FaArrowRight size={11} style={{ opacity:0.7 }}/>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ══ STATS STRIP ══ */}
      <div style={{ position:"relative", zIndex:10, borderTop:"1px solid var(--c-border-muted)", borderBottom:"1px solid var(--c-border-muted)", background:"var(--c-surface)", backdropFilter:"blur(16px)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", padding:"0 clamp(1.5rem,5vw,3rem)" }}>
          {[
            { value:3,   suffix:"+", label:"Years Experience", color:"#00FFB2" },
            { value:8,   suffix:"",  label:"Apps Shipped",     color:"#60A5FA" },
            { value:5,   suffix:"+", label:"Tech Stacks",      color:"#A78BFA" },
            { value:100, suffix:"%", label:"Self-Motivated",   color:"#FF4D6D" },
          ].map((s,i) => <BigCounter key={s.label} {...s} index={i} />)}
        </div>
      </div>

      {/* ══ SKILLS ══ */}
      <div style={{ position:"relative", zIndex:10, padding:"clamp(4rem,8vw,6rem) clamp(1.5rem,5vw,3rem)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ marginBottom:"2.5rem" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:"0.75rem" }}>
              <div style={{ width:22,height:1,background:"var(--c-primary)" }} />
              <span style={{ fontFamily:"var(--f-mono)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--c-primary)" }}>Skills</span>
              <div style={{ width:6,height:1,background:"var(--c-primary)",opacity:0.4 }} />
            </div>
            <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:800, lineHeight:1.05, color:"var(--c-text)" }}>
              Technologies I <span className="gradient-text">Reach For</span>
            </h2>
          </motion.div>

          <div style={{ display:"flex", flexWrap:"wrap", gap:"clamp(10px,2vw,18px)", justifyContent:"center", marginBottom:"3.5rem" }}>
            {skills.map((sk,i) => <HexSkill key={sk.name} skill={sk} index={i} />)}
          </div>

          <MarqueeStrip />

          <motion.div initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.3 }} style={{ marginTop:"3rem" }}>
            <h3 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1rem,2vw,1.2rem)", fontWeight:700, textAlign:"center", color:"var(--c-text)", marginBottom:"2rem" }}>Full Tech Arsenal</h3>
            <TechStack3D technologies={techStack.map(t => ({ ...t, icon:t.name.charAt(0) }))} />
          </motion.div>
        </div>
      </div>

      {/* ══ TIMELINE ══ */}
      <div style={{ position:"relative", zIndex:10, padding:"0 clamp(1.5rem,5vw,3rem) clamp(4rem,8vw,6rem)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto" }}>
          <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} style={{ marginBottom:"3rem" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:"0.75rem" }}>
              <div style={{ width:22,height:1,background:"var(--c-primary)" }} />
              <span style={{ fontFamily:"var(--f-mono)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--c-primary)" }}>Journey</span>
              <div style={{ width:6,height:1,background:"var(--c-primary)",opacity:0.4 }} />
            </div>
            <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.8rem,4vw,2.8rem)", fontWeight:800, lineHeight:1.05, color:"var(--c-text)" }}>
              The Path <span className="gradient-text">So Far</span>
            </h2>
          </motion.div>
          {timeline.map((item,i) => <TimelinePanel key={i} item={item} index={i} />)}
        </div>
      </div>

    </section>
  );
}
