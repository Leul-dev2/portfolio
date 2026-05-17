import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { FaHeart, FaExternalLinkAlt, FaStar } from "react-icons/fa";
import Tilt from "react-parallax-tilt";

const projects = [
  { title:"Ecommerce Fashion Website", image:"/ecomm.jpg",   likes:14, link:"#", tag:"MERN Stack",  color:"#00FFB2" },
  { title:"Quiz Builder Application",  image:"/hom.png",     likes:4,  link:"#", tag:"Flutter",     color:"#60A5FA" },
  { title:"Notes Keeping App",         image:"/recipes.png", likes:26, link:"#", tag:"Full-Stack",  color:"#A78BFA" },
];

function SideCard({ project, index }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-50px" });
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(project.likes);

  const handleLike = (e) => {
    e.preventDefault();
    setLiked(v => !v);
    setLikes(v => liked ? v - 1 : v + 1);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:32 }}
      animate={inView ? { opacity:1, y:0 } : {}}
      transition={{ duration:0.65, delay:index*0.12, ease:[0.23,1,0.32,1] }}
    >
      <Tilt tiltMaxAngleX={7} tiltMaxAngleY={7} scale={1.02} transitionSpeed={2200} glareEnable glareMaxOpacity={0.06}>
        <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", display:"block" }}>
          <div style={{
            borderRadius:20, overflow:"hidden",
            background:"var(--c-surface)", backdropFilter:"blur(16px)",
            border:`1px solid var(--c-border-muted)`,
            transition:"border-color .35s, box-shadow .35s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor=`${project.color}30`; e.currentTarget.style.boxShadow=`0 20px 48px ${project.color}12`; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor="var(--c-border-muted)"; e.currentTarget.style.boxShadow="none"; }}>

            {/* Image */}
            <div style={{ position:"relative", height:200, overflow:"hidden" }}>
              <img src={project.image} alt={project.title}
                style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transition:"transform .6s cubic-bezier(.23,1,.32,1)" }}
                onMouseEnter={e => e.currentTarget.style.transform="scale(1.08)"}
                onMouseLeave={e => e.currentTarget.style.transform="scale(1)"} />
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 35%, rgba(5,10,15,0.85) 100%)" }} />

              {/* Tag */}
              <div style={{ position:"absolute", top:12, left:12, padding:"3px 10px", borderRadius:7, background:`${project.color}18`, border:`1px solid ${project.color}35`, fontFamily:"var(--f-mono)", fontSize:10, color:project.color, fontWeight:600 }}>
                {project.tag}
              </div>

              {/* External link icon */}
              <div style={{ position:"absolute", top:12, right:12, width:30, height:30, borderRadius:8, background:"rgba(5,10,15,0.75)", border:"1px solid var(--c-border-muted)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--c-muted)", opacity:0, transition:"opacity .25s" }}
                onMouseEnter={e => e.currentTarget.style.opacity=1}
                className="ext-icon">
                <FaExternalLinkAlt size={11} />
              </div>
            </div>

            {/* Body */}
            <div style={{ padding:"clamp(1rem,2.5vw,1.3rem)", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"0.75rem" }}>
              <div>
                <div style={{ fontFamily:"var(--f-mono)", fontSize:10, color:project.color, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>Side Project</div>
                <h3 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(0.95rem,1.8vw,1.05rem)", fontWeight:700, color:"var(--c-text)", lineHeight:1.3 }}>{project.title}</h3>
              </div>
              <button
                onClick={handleLike}
                style={{ display:"flex", alignItems:"center", gap:5, flexShrink:0, padding:"6px 12px", borderRadius:8, background: liked ? `${project.color}18` : "var(--c-surface-2)", border:`1px solid ${liked ? project.color+"35" : "var(--c-border-muted)"}`, color: liked ? project.color : "var(--c-muted)", fontFamily:"var(--f-mono)", fontSize:12, fontWeight:600, cursor:"pointer", transition:"all .25s" }}>
                <FaHeart size={11} style={{ color: liked ? project.color : "var(--c-muted)" }} />
                {likes}
              </button>
            </div>
          </div>
        </a>
      </Tilt>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section id="skills" style={{ position:"relative", padding:"clamp(4rem,8vw,6rem) 0", overflow:"hidden", background:"var(--c-bg)" }}>
      <div style={{ position:"absolute", inset:0, zIndex:0, pointerEvents:"none", opacity:0.02, backgroundImage:"radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 1px)", backgroundSize:"36px 36px" }} />
      <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translateX(-50%)", width:"60vw", height:"40vw", maxWidth:700, background:"radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(80px)", pointerEvents:"none", zIndex:0 }} />

      <div style={{ position:"relative", zIndex:10, maxWidth:1280, margin:"0 auto", padding:"0 clamp(1.5rem,5vw,3rem)" }}>
        <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.65 }} style={{ marginBottom:"3rem" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:"0.75rem" }}>
            <div style={{ width:22,height:1,background:"var(--c-primary)" }} />
            <span style={{ fontFamily:"var(--f-mono)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--c-primary)" }}>Side Projects</span>
            <div style={{ width:6,height:1,background:"var(--c-primary)",opacity:0.4 }} />
          </div>
          <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.9rem,4.5vw,3rem)", fontWeight:800, lineHeight:1.1, color:"var(--c-text)", maxWidth:540 }}>
            Built for <span className="gradient-text">Fun & Learning</span>
          </h2>
          <p style={{ color:"var(--c-text-2)", fontSize:"clamp(0.9rem,1.6vw,1rem)", marginTop:"0.85rem", maxWidth:480, lineHeight:1.7 }}>
            Personal experiments and side builds outside of client work.
          </p>
        </motion.div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(min(100%,280px),1fr))", gap:"clamp(1rem,2.5vw,1.4rem)" }}>
          {projects.map((p, i) => <SideCard key={i} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}
