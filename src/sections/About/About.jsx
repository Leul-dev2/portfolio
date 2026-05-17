import React, { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Tilt from "react-parallax-tilt";
import {
  FaGraduationCap, FaBriefcase, FaAward, FaHeart,
  FaDownload, FaCoffee, FaCode, FaRocket,
} from "react-icons/fa";
import { TechStack3D } from "../../components/SkillVisualization3D";

/* ─── DATA ─── */
const timeline = [
  { year:"2022", title:"Started My Journey",  desc:"Began learning programming with a passion for building things that matter. Dived deep into web technologies.",                    icon:<FaGraduationCap/>, side:"left"  },
  { year:"2023", title:"Flutter Developer",    desc:"Built cross-platform mobile applications with Flutter & Dart. Delivered 5+ production apps for clients.",                       icon:<FaBriefcase/>,     side:"right" },
  { year:"2024", title:"MERN Stack Mastery",   desc:"Expanded into full-stack development. Built scalable applications with React, Node.js, and MongoDB.",                          icon:<FaAward/>,         side:"left"  },
  { year:"2025", title:"Open Source & Beyond", desc:"Contributing to open source, mentoring junior developers, and building products that impact thousands.",                         icon:<FaHeart/>,         side:"right" },
];

const skillCategories = [
  {
    title:"Frontend", icon:<FaCode/>, ci:0,
    skills:[
      { name:"React / Next.js",  level:92 },
      { name:"Flutter / Dart",   level:90 },
      { name:"TypeScript",       level:85 },
      { name:"Tailwind CSS",     level:95 },
    ],
  },
  {
    title:"Backend", icon:<FaRocket/>, ci:1,
    skills:[
      { name:"Node.js / Express",   level:88 },
      { name:"MongoDB",             level:85 },
      { name:"REST APIs / GraphQL", level:82 },
      { name:"Firebase",            level:87 },
    ],
  },
];

const techStack = [
  { name:"React",      color:"#61DAFB" },
  { name:"Flutter",    color:"#02569B" },
  { name:"Node.js",    color:"#3C873A" },
  { name:"MongoDB",    color:"#47A248" },
  { name:"TypeScript", color:"#3178C6" },
  { name:"Tailwind",   color:"#38B2AC" },
  { name:"Firebase",   color:"#FFCA28" },
  { name:"Git",        color:"#F05032" },
  { name:"Figma",      color:"#F24E1E" },
  { name:"Next.js",    color:"#ffffff" },
  { name:"Docker",     color:"#2496ED" },
  { name:"AWS",        color:"#FF9900" },
];

const traits = ["Problem Solver","Team Player","Quick Learner","Detail Oriented","Open Source Contributor"];

/* ─── helpers ─── */
function Tag({ label }) {
  return (
    <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:"0.75rem" }}>
      <div style={{ width:22,height:1,background:"var(--c-primary)" }} />
      <span style={{ fontFamily:"var(--f-mono)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--c-primary)" }}>{label}</span>
      <div style={{ width:6,height:1,background:"var(--c-primary)",opacity:0.4 }} />
    </div>
  );
}

function Counter({ target, suffix="" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        let cur = 0;
        const step = Math.ceil(target / 40);
        const t = setInterval(() => { cur = Math.min(cur+step,target); setVal(cur); if (cur>=target) clearInterval(t); }, 38);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

function SkillBar({ name, level, grad, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-40px" });
  return (
    <div ref={ref} style={{ marginBottom:"1.1rem" }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontFamily:"var(--f-body)", fontSize:13.5, fontWeight:500, color:"var(--c-text)" }}>{name}</span>
        <span style={{ fontFamily:"var(--f-mono)", fontSize:11, color:"var(--c-primary)" }}>{level}%</span>
      </div>
      <div style={{ height:3, borderRadius:2, background:"rgba(255,255,255,0.05)", overflow:"hidden" }}>
        <motion.div
          initial={{ width:0 }}
          animate={inView ? { width:`${level}%` } : {}}
          transition={{ duration:1.1, delay, ease:[0.23,1,0.32,1] }}
          style={{ height:"100%", borderRadius:2, background:grad }}
        />
      </div>
    </div>
  );
}

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-50px" });
  const isRight = item.side === "right";
  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, x: isRight ? 50 : -50 }}
      animate={inView ? { opacity:1, x:0 } : {}}
      transition={{ duration:0.75, delay:index*0.13, ease:[0.23,1,0.32,1] }}
      style={{
        display:"flex", alignItems:"flex-start",
        gap:"clamp(1rem,3vw,2rem)", marginBottom:"clamp(1.5rem,4vw,2.5rem)",
        flexDirection: isRight ? "row-reverse" : "row",
      }}
    >
      <div style={{ flex:1, display:"flex", justifyContent: isRight ? "flex-start" : "flex-end" }}>
        <motion.div
          whileHover={{ y:-4, borderColor:"var(--c-border)" }}
          style={{
            background:"var(--c-surface)", border:"1px solid var(--c-border-muted)",
            borderRadius:"var(--r-lg)", padding:"clamp(1rem,2.5vw,1.4rem)",
            maxWidth:320, backdropFilter:"blur(14px)",
            transition:"border-color var(--t-normal), transform var(--t-normal)",
          }}
        >
          <span style={{ fontFamily:"var(--f-mono)", fontSize:11, color:"var(--c-primary)", letterSpacing:"0.08em" }}>{item.year}</span>
          <h3 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(0.95rem,2vw,1.1rem)", fontWeight:700, marginTop:4, color:"var(--c-text)" }}>{item.title}</h3>
          <p style={{ fontSize:13, color:"var(--c-text-2)", marginTop:7, lineHeight:1.65 }}>{item.desc}</p>
        </motion.div>
      </div>
      <div style={{ flexShrink:0, position:"relative", zIndex:10 }}>
        <motion.div
          animate={inView ? { scale:[0,1.3,1] } : {}}
          transition={{ duration:0.55, delay:index*0.13+0.22 }}
          style={{
            width:42, height:42, borderRadius:"50%",
            background:"linear-gradient(135deg, var(--c-primary), #00D4FF)",
            display:"flex", alignItems:"center", justifyContent:"center",
            color:"var(--c-bg)", fontSize:15,
            boxShadow:"0 0 24px rgba(0,255,178,0.22)",
          }}
        >
          {item.icon}
        </motion.div>
      </div>
      <div style={{ flex:1 }} />
    </motion.div>
  );
}

/* ─── MAIN ─── */
export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target:sectionRef, offset:["start end","end start"] });
  const bgY = useTransform(scrollYProgress, [0,1], ["-5%","5%"]);

  return (
    <section id="about" ref={sectionRef} style={{ position:"relative", padding:"clamp(4rem,9vw,7rem) 0", overflow:"hidden", background:"var(--c-bg-alt)" }}>

      {/* BG layers */}
      <motion.div style={{ y:bgY, position:"absolute", inset:0, zIndex:0, pointerEvents:"none" }}>
        <div style={{ position:"absolute", top:"-20%", left:"-10%", width:"50vw", height:"50vw", maxWidth:600, background:"radial-gradient(circle, rgba(0,255,178,0.06) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(60px)" }} />
        <div style={{ position:"absolute", bottom:"-15%", right:"-8%",  width:"40vw", height:"40vw", maxWidth:500, background:"radial-gradient(circle, rgba(255,77,109,0.05) 0%, transparent 70%)",  borderRadius:"50%", filter:"blur(60px)" }} />
      </motion.div>
      <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", opacity:0.022, backgroundImage:"linear-gradient(rgba(0,255,178,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,178,0.15) 1px, transparent 1px)", backgroundSize:"48px 48px" }} />

      <div style={{ position:"relative", zIndex:10, maxWidth:1280, margin:"0 auto", padding:"0 clamp(1.5rem,5vw,3rem)" }}>

        {/* ══ HEADER ══ */}
        <motion.div initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.65 }}>
          <Tag label="About Me" />
          <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.9rem,4.5vw,3rem)", fontWeight:800, lineHeight:1.1, color:"var(--c-text)", maxWidth:640 }}>
            Passionate About <span className="gradient-text">Digital Excellence</span>
          </h2>
          <p style={{ fontSize:"clamp(0.9rem,1.6vw,1rem)", color:"var(--c-text-2)", marginTop:"0.85rem", maxWidth:520, lineHeight:1.7 }}>
            A self-taught developer on a mission to build beautiful, performant, and impactful digital experiences.
          </p>
        </motion.div>

        {/* ══ BIO + PHOTO ══ */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%,340px),1fr))", gap:"clamp(2rem,5vw,4rem)", alignItems:"center", marginTop:"3rem", marginBottom:"5rem" }}>

          {/* Bio */}
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.75 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"5px 13px", borderRadius:100, background:"var(--c-primary-dim)", border:"1px solid rgba(0,255,178,0.2)", fontFamily:"var(--f-mono)", fontSize:11.5, color:"var(--c-primary)", marginBottom:"1.4rem" }}>
              <FaCoffee size={11}/> Fueled by coffee & curiosity
            </div>
            <h3 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.4rem,3vw,1.9rem)", fontWeight:800, lineHeight:1.2, marginBottom:"1.2rem", color:"var(--c-text)" }}>
              I'm <span className="gradient-text">Leul Seyoum</span>,<br/>Full-Stack Developer
            </h3>
            <div style={{ display:"flex", flexDirection:"column", gap:"0.85rem", color:"var(--c-text-2)", lineHeight:1.75, fontSize:"clamp(0.87rem,1.5vw,0.97rem)" }}>
              <p>With over <strong style={{ color:"var(--c-text)" }}>3 years</strong> of hands-on experience, I specialize in building modern web and mobile apps using Flutter and the MERN stack. My journey started with curiosity about how things work on the web.</p>
              <p>I believe in writing <strong style={{ color:"var(--c-primary)" }}>clean, maintainable code</strong> that scales. Every project is an opportunity to push the boundaries of what's possible.</p>
              <p>When I'm not coding, you'll find me contributing to open source, writing technical articles, or exploring the latest in AI and machine learning.</p>
            </div>
            <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:"1.4rem" }}>
              {traits.map((t,i) => (
                <motion.span key={t} initial={{ opacity:0, scale:0.85 }} whileInView={{ opacity:1, scale:1 }} viewport={{ once:true }} transition={{ delay:0.4+i*0.07 }}
                  style={{ padding:"5px 13px", borderRadius:100, background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", fontSize:11.5, fontWeight:500, color:"var(--c-text-2)", fontFamily:"var(--f-mono)" }}>
                  {t}
                </motion.span>
              ))}
            </div>
            <motion.a href="/Leul_Resume.pdf" target="_blank"
              whileHover={{ y:-2, boxShadow:"0 14px 34px rgba(0,255,178,0.28)" }}
              whileTap={{ scale:0.97 }}
              style={{ display:"inline-flex", alignItems:"center", gap:8, marginTop:"1.8rem", padding:"11px 22px", background:"var(--c-primary)", color:"var(--c-bg)", fontFamily:"var(--f-body)", fontWeight:700, fontSize:13.5, borderRadius:12, textDecoration:"none", boxShadow:"0 4px 20px rgba(0,255,178,0.18)", transition:"transform var(--t-fast), box-shadow var(--t-fast)" }}>
              <FaDownload size={13}/> Download Resume
            </motion.a>
          </motion.div>

          {/* Photo */}
          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.75, delay:0.12 }}>
            <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7} scale={1.02} transitionSpeed={2200}>
              <div style={{ position:"relative" }}>
                <div style={{ position:"absolute", inset:-12, background:"linear-gradient(135deg, rgba(0,255,178,0.12), rgba(255,77,109,0.07))", borderRadius:36, filter:"blur(18px)", zIndex:0 }} />
                <div style={{ position:"relative", borderRadius:28, overflow:"hidden", border:"1px solid var(--c-border)", zIndex:1 }}>
                  <img src="/leul.jpg" alt="Leul Seyoum" style={{ width:"100%", height:"clamp(300px,42vw,420px)", objectFit:"cover", objectPosition:"top center", display:"block" }} />
                  <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 52%, rgba(5,10,15,0.68) 100%)" }} />
                  {/* Stats bar */}
                  <div style={{ position:"absolute", bottom:14, left:14, right:14 }}>
                    <div style={{ background:"rgba(5,10,15,0.84)", backdropFilter:"blur(16px)", border:"1px solid var(--c-border-muted)", borderRadius:14, padding:"11px 16px", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, textAlign:"center" }}>
                      {[{val:3,sfx:"+",lbl:"Years Exp."},{val:25,sfx:"+",lbl:"Projects"},{val:15,sfx:"+",lbl:"Clients"}].map(s => (
                        <div key={s.lbl}>
                          <div style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.1rem,2.5vw,1.4rem)", fontWeight:800, color:"var(--c-primary)" }}><Counter target={s.val} suffix={s.sfx}/></div>
                          <div style={{ fontSize:10, color:"var(--c-muted)", fontFamily:"var(--f-mono)", marginTop:2 }}>{s.lbl}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Tilt>
          </motion.div>
        </div>

        {/* ══ SKILLS ══ */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }} style={{ marginBottom:"5rem" }}>
          <Tag label="My Skills" />
          <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.6rem,3.5vw,2.4rem)", fontWeight:800, color:"var(--c-text)", marginBottom:"0.5rem" }}>
            Technologies I <span className="gradient-text">Work With</span>
          </h2>
          <p style={{ color:"var(--c-text-2)", fontSize:"clamp(0.87rem,1.5vw,0.97rem)", marginBottom:"2.4rem", maxWidth:480 }}>
            Continuously learning and mastering new tools to deliver the best results.
          </p>

          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%,300px),1fr))", gap:"1.4rem", marginBottom:"3rem" }}>
            {skillCategories.map((cat) => (
              <motion.div key={cat.title}
                initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:cat.ci*0.14 }}
                style={{ background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", borderRadius:"var(--r-lg)", padding:"clamp(1.2rem,3vw,1.7rem)", backdropFilter:"blur(14px)" }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1.4rem" }}>
                  <div style={{ width:28,height:28,borderRadius:8, background:cat.ci===0?"var(--c-primary-dim)":"var(--c-secondary-dim)", display:"flex",alignItems:"center",justifyContent:"center", color:cat.ci===0?"var(--c-primary)":"var(--c-secondary)", fontSize:13 }}>{cat.icon}</div>
                  <h3 style={{ fontFamily:"var(--f-display)", fontSize:16, fontWeight:700, color:"var(--c-text)" }}>{cat.title}</h3>
                </div>
                {cat.skills.map((sk, si) => (
                  <SkillBar key={sk.name} name={sk.name} level={sk.level}
                    grad={`linear-gradient(90deg, ${cat.ci===0?"#00FFB2, #00D4FF":"#FF4D6D, #7C3AED"})`}
                    delay={cat.ci*0.18 + si*0.09} />
                ))}
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.3 }}>
            <h3 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1rem,2vw,1.2rem)", fontWeight:700, textAlign:"center", color:"var(--c-text)", marginBottom:"2rem" }}>Complete Tech Arsenal</h3>
            <TechStack3D technologies={techStack.map(t => ({ ...t, icon:t.name.charAt(0) }))} />
          </motion.div>
        </motion.div>

        {/* ══ TIMELINE ══ */}
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.6 }}>
          <Tag label="My Journey" />
          <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.6rem,3.5vw,2.4rem)", fontWeight:800, color:"var(--c-text)", marginBottom:"0.5rem" }}>
            The Path I've <span className="gradient-text">Walked</span>
          </h2>
          <p style={{ color:"var(--c-text-2)", fontSize:"clamp(0.87rem,1.5vw,0.97rem)", marginBottom:"3rem", maxWidth:480 }}>
            Key milestones in my development journey.
          </p>
          <div style={{ position:"relative", maxWidth:760, margin:"0 auto" }}>
            <div style={{ position:"absolute", left:"clamp(22px,50%,50%)", top:0, bottom:0, width:1, background:"linear-gradient(180deg, var(--c-primary) 0%, rgba(0,255,178,0.1) 100%)", transform:"translateX(-50%)" }} />
            {timeline.map((item, i) => <TimelineItem key={i} item={item} index={i} />)}
          </div>
        </motion.div>

      </div>
    </section>
  );
}
