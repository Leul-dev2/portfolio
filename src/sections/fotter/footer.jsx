import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaHeart, FaArrowUp } from "react-icons/fa";

const footerLinks = [
  { title:"Navigation", links:[
    { name:"Home",     href:"#home"     },
    { name:"About",    href:"#about"    },
    { name:"Services", href:"#services" },
    { name:"Projects", href:"#projects" },
    { name:"Blog",     href:"#blog"     },
    { name:"Contact",  href:"#contact"  },
  ]},
  { title:"Services", links:[
    { name:"MERN Stack",     href:"#services" },
    { name:"Flutter Apps",   href:"#services" },
    { name:"UI/UX Design",   href:"#services" },
    { name:"API Development",href:"#services" },
    { name:"Cloud & DevOps", href:"#services" },
  ]},
];

const socials = [
  { Icon:FaGithub,   url:"https://github.com/leul-dev2",                 label:"GitHub"   },
  { Icon:FaLinkedin, url:"https://linkedin.com/in/leulseyoum",           label:"LinkedIn" },
  { Icon:FaTwitter,  url:"https://twitter.com/leulseyoum",               label:"Twitter"  },
  { Icon:FaEnvelope, url:"mailto:leulsegedseyoum@gmail.com",             label:"Email"    },
];

function scrollTo(e, href) {
  e.preventDefault();
  document.getElementById(href.replace("#",""))?.scrollIntoView({ behavior:"smooth" });
}

export default function Footer() {
  const year = new Date().getFullYear();
  const [email,       setEmail]       = useState("");
  const [subscribed,  setSubscribed]  = useState(false);
  const [showTop,     setShowTop]     = useState(false);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 500);
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  function handleSub(e) {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(""); setTimeout(() => setSubscribed(false), 3000); }
  }

  return (
    <footer style={{ position:"relative", background:"#020508", overflow:"hidden" }}>
      {/* Top gradient line */}
      <div style={{ height:1, background:"linear-gradient(90deg, transparent, rgba(0,255,178,0.35), transparent)" }} />

      {/* BG orbs */}
      <div style={{ position:"absolute", inset:0, pointerEvents:"none", overflow:"hidden" }}>
        <motion.div animate={{ x:[0,28,0], y:[0,18,0] }} transition={{ duration:20, repeat:Infinity }}
          style={{ position:"absolute", top:"-30%", left:"-20%", width:"50%", height:"50%", background:"rgba(0,255,178,0.03)", borderRadius:"50%", filter:"blur(120px)" }} />
        <motion.div animate={{ x:[0,-28,0], y:[0,-18,0] }} transition={{ duration:17, repeat:Infinity }}
          style={{ position:"absolute", bottom:"-30%", right:"-20%", width:"50%", height:"50%", background:"rgba(124,58,237,0.04)", borderRadius:"50%", filter:"blur(120px)" }} />
      </div>

      <div style={{ position:"relative", zIndex:10, maxWidth:1280, margin:"0 auto", padding:"clamp(3rem,6vw,4.5rem) clamp(1.5rem,5vw,3rem) clamp(1.5rem,3vw,2.5rem)" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px,1fr))", gap:"clamp(1.5rem,4vw,2.5rem)", marginBottom:"3rem" }}>

          {/* Brand */}
          <div style={{ gridColumn:"span 1" }}>
            <a href="#home" onClick={e => scrollTo(e,"#home")} style={{ textDecoration:"none", display:"inline-block", marginBottom:"1rem" }}>
              <span style={{ fontFamily:"var(--f-display)", fontSize:"1.5rem", fontWeight:800 }}>
                <span className="gradient-text">Leul</span>
                <span style={{ color:"var(--c-secondary)" }}>.</span>
                <span style={{ color:"var(--c-muted)", fontFamily:"var(--f-mono)", fontSize:"1.1rem" }}>dev</span>
              </span>
            </a>
            <p style={{ fontSize:13.5, lineHeight:1.7, color:"var(--c-muted)", marginBottom:"1.2rem", maxWidth:220 }}>
              Full-Stack Developer crafting immersive digital experiences with cutting-edge technology.
            </p>
            <div style={{ display:"flex", gap:8 }}>
              {socials.map(({ Icon, url, label }) => (
                <motion.a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label}
                  whileHover={{ y:-3 }}
                  style={{ width:34,height:34,borderRadius:9,background:"var(--c-surface)",border:"1px solid var(--c-border-muted)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--c-muted)",textDecoration:"none",transition:"color .25s,border-color .25s" }}
                  onMouseEnter={e => { e.currentTarget.style.color="var(--c-primary)"; e.currentTarget.style.borderColor="var(--c-border)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color="var(--c-muted)";   e.currentTarget.style.borderColor="var(--c-border-muted)"; }}>
                  <Icon size={13} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((section, i) => (
            <motion.div key={section.title} initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}>
              <h4 style={{ fontFamily:"var(--f-mono)", fontSize:10.5, fontWeight:700, color:"var(--c-text)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"1rem" }}>
                {section.title}
              </h4>
              <ul style={{ listStyle:"none" }}>
                {section.links.map(link => (
                  <li key={link.name} style={{ marginBottom:8 }}>
                    <a href={link.href} onClick={e => scrollTo(e,link.href)}
                      style={{ fontSize:13.5, color:"var(--c-muted)", textDecoration:"none", transition:"color .25s", display:"flex", alignItems:"center", gap:5 }}
                      onMouseEnter={e => e.currentTarget.style.color="var(--c-primary)"}
                      onMouseLeave={e => e.currentTarget.style.color="var(--c-muted)"}>
                      <span style={{ fontSize:9, opacity:0.5 }}>→</span>
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Newsletter */}
          <motion.div initial={{ opacity:0, y:18 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:0.3 }}>
            <h4 style={{ fontFamily:"var(--f-mono)", fontSize:10.5, fontWeight:700, color:"var(--c-text)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"0.85rem" }}>
              Stay Updated
            </h4>
            <p style={{ fontSize:13, color:"var(--c-muted)", marginBottom:"0.85rem", lineHeight:1.6 }}>
              Subscribe for the latest articles and updates.
            </p>
            <form onSubmit={handleSub} style={{ display:"flex", gap:8 }}>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" required
                style={{ flex:1, minWidth:0, padding:"9px 12px", background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", borderRadius:10, fontSize:13, color:"var(--c-text)", outline:"none", fontFamily:"var(--f-body)", caretColor:"var(--c-primary)" }} />
              <motion.button type="submit" whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                style={{ flexShrink:0, padding:"9px 14px", background:"var(--c-primary)", color:"var(--c-bg)", fontFamily:"var(--f-body)", fontWeight:700, fontSize:12, borderRadius:10, border:"none", cursor:"pointer" }}>
                {subscribed ? "✓" : "→"}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Divider */}
        <div style={{ height:1, background:"linear-gradient(90deg, transparent, var(--c-border-muted), transparent)", marginBottom:"1.5rem" }} />

        {/* Bottom bar */}
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:"0.75rem" }}>
          <p style={{ fontSize:12, color:"var(--c-muted)", display:"flex", alignItems:"center", gap:5 }}>
            © {year} Leul Seyoum. Made with{" "}
            <FaHeart style={{ color:"var(--c-secondary)", animation:"apex-pulse-ring 2s ease-in-out infinite" }} size={9} />
            {" "}in Addis Ababa, Ethiopia
          </p>
          <p style={{ fontFamily:"var(--f-mono)", fontSize:11, color:"var(--c-muted)" }}>
            Built with{" "}
            <span style={{ color:"#61DAFB" }}>React</span>{" · "}
            <span style={{ color:"var(--c-primary)" }}>Framer Motion</span>{" · "}
            <span style={{ color:"#38B2AC" }}>Tailwind</span>
          </p>
        </div>
      </div>

      {/* Scroll to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
            initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0, scale:0.8 }}
            whileHover={{ scale:1.1 }}
            style={{ position:"fixed", bottom:24, left:24, width:36, height:36, borderRadius:"50%", background:"var(--c-surface)", border:"1px solid var(--c-border)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--c-muted)", cursor:"pointer", zIndex:50, transition:"color .25s" }}
            onMouseEnter={e => e.currentTarget.style.color="var(--c-primary)"}
            onMouseLeave={e => e.currentTarget.style.color="var(--c-muted)"}
          >
            <FaArrowUp size={12} />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
