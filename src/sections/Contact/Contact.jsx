import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useState } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaStackOverflow, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";

const contactInfo = [
  { icon:<MdEmail size={20}/>,      label:"Email",    value:"leulseyoum103@gmail.com", href:"mailto:leulsegedseyoum@gmail.com", color:"var(--c-primary)" },
  { icon:<MdPhone size={20}/>,      label:"Phone",    value:"+251 989 905 112",           href:"tel:+251989905112",                color:"var(--c-accent)"  },
  { icon:<MdLocationOn size={20}/>, label:"Location", value:"Addis Ababa, Ethiopia",      href:null,                               color:"#60A5FA"           },
];

const socials = [
  { Icon:FaLinkedin,      url:"https://linkedin.com/in/leulseyoum",          label:"LinkedIn"       },
  { Icon:FaGithub,        url:"https://github.com/leul-dev2",                label:"GitHub"         },
  { Icon:FaStackOverflow, url:"https://stackoverflow.com/users/leulseyoum", label:"Stack Overflow" },
  { Icon:FaFacebook,      url:"https://facebook.com/leulseyoum",             label:"Facebook"       },
];

function iStyle(focused) {
  return {
    width:"100%", padding:"11px 14px",
    background:"var(--c-surface)", color:"var(--c-text)",
    borderRadius:12, border:`1px solid ${focused ? "rgba(0,255,178,0.45)" : "var(--c-border-muted)"}`,
    outline:"none", fontFamily:"var(--f-body)", fontSize:14,
    boxShadow: focused ? "0 0 0 3px rgba(0,255,178,0.08)" : "none",
    transition:"border-color .25s, box-shadow .25s",
    caretColor:"var(--c-primary)",
  };
}

export default function ContactSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [form,    setForm]    = useState({ name:"", email:"", subject:"", message:"" });
  const [focused, setFocused] = useState(null);
  const [sent,    setSent]    = useState(false);

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left); mouseY.set(clientY - top);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setForm({ name:"", email:"", subject:"", message:"" }); }, 3200);
  }

  const label = (text) => (
    <label style={{ display:"block", fontFamily:"var(--f-mono)", fontSize:10, color:"var(--c-muted)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>
      {text}
    </label>
  );

  return (
    <section id="contact" style={{ position:"relative", padding:"clamp(4rem,9vw,7rem) 0", overflow:"hidden", background:"var(--c-bg-alt)" }}>
      <div style={{ position:"absolute", top:"-20%", right:"-15%", width:"55vw", height:"55vw", maxWidth:650, background:"radial-gradient(circle, rgba(0,212,255,0.06) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(70px)", pointerEvents:"none", zIndex:0 }} />
      <div style={{ position:"absolute", bottom:"-10%", left:"-12%", width:"40vw", height:"40vw", maxWidth:500, background:"radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(70px)", pointerEvents:"none", zIndex:0 }} />

      <div style={{ position:"relative", zIndex:10, maxWidth:1280, margin:"0 auto", padding:"0 clamp(1.5rem,5vw,3rem)" }}>

        {/* Header */}
        <motion.div initial={{ opacity:0, y:22 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ duration:0.65 }} style={{ marginBottom:"3rem" }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:"0.75rem" }}>
            <div style={{ width:22,height:1,background:"var(--c-primary)" }} />
            <span style={{ fontFamily:"var(--f-mono)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--c-primary)" }}>Get In Touch</span>
            <div style={{ width:6,height:1,background:"var(--c-primary)",opacity:0.4 }} />
          </div>
          <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.9rem,4.5vw,3rem)", fontWeight:800, lineHeight:1.1, color:"var(--c-text)", maxWidth:600, marginBottom:"0.85rem" }}>
            {"Let's "}
            <span className="gradient-text">Work Together</span>
          </h2>
          <p style={{ color:"var(--c-text-2)", fontSize:"clamp(0.9rem,1.6vw,1rem)", maxWidth:520, lineHeight:1.7 }}>
            Have a project in mind? Drop me a message and let's create something amazing.
          </p>
        </motion.div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(min(100%,300px),1fr))", gap:"clamp(1.5rem,4vw,2.5rem)", alignItems:"start" }}>

          {/* Info column */}
          <motion.div initial={{ opacity:0, x:-28 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.75 }} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            {contactInfo.map((info, i) => (
              <motion.div key={info.label} initial={{ opacity:0, y:14 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
                whileHover={{ x:4 }}
                style={{ background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", borderRadius:14, padding:"13px 16px", backdropFilter:"blur(14px)", transition:"border-color .3s" }}>
                {info.href ? (
                  <a href={info.href} style={{ display:"flex", alignItems:"center", gap:12, textDecoration:"none" }}>
                    <div style={{ width:36,height:36,borderRadius:10,background:"var(--c-surface-2)",display:"flex",alignItems:"center",justifyContent:"center",color:info.color,flexShrink:0 }}>{info.icon}</div>
                    <div>
                      <div style={{ fontFamily:"var(--f-mono)", fontSize:10, color:"var(--c-muted)", textTransform:"uppercase", letterSpacing:"0.1em" }}>{info.label}</div>
                      <div style={{ fontSize:13.5, fontWeight:500, color:"var(--c-text)", marginTop:2 }}>{info.value}</div>
                    </div>
                  </a>
                ) : (
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:36,height:36,borderRadius:10,background:"var(--c-surface-2)",display:"flex",alignItems:"center",justifyContent:"center",color:info.color,flexShrink:0 }}>{info.icon}</div>
                    <div>
                      <div style={{ fontFamily:"var(--f-mono)", fontSize:10, color:"var(--c-muted)", textTransform:"uppercase", letterSpacing:"0.1em" }}>{info.label}</div>
                      <div style={{ fontSize:13.5, fontWeight:500, color:"var(--c-text)", marginTop:2 }}>{info.value}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Socials */}
            <div style={{ background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", borderRadius:14, padding:"13px 16px", backdropFilter:"blur(14px)" }}>
              <div style={{ fontFamily:"var(--f-mono)", fontSize:10, color:"var(--c-muted)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:12 }}>Follow Me</div>
              <div style={{ display:"flex", gap:8 }}>
                {socials.map(({ Icon, url, label: lbl }) => (
                  <motion.a key={lbl} href={url} target="_blank" rel="noreferrer" aria-label={lbl}
                    whileHover={{ y:-3 }}
                    style={{ width:36,height:36,borderRadius:10,background:"var(--c-surface-2)",border:"1px solid var(--c-border-muted)",display:"flex",alignItems:"center",justifyContent:"center",color:"var(--c-muted)",textDecoration:"none",transition:"color .25s,border-color .25s" }}
                    onMouseEnter={e => { e.currentTarget.style.color="var(--c-primary)"; e.currentTarget.style.borderColor="var(--c-border)"; }}
                    onMouseLeave={e => { e.currentTarget.style.color="var(--c-muted)";   e.currentTarget.style.borderColor="var(--c-border-muted)"; }}>
                    <Icon size={14} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Available badge */}
            <div style={{ background:"rgba(0,255,178,0.04)", border:"1px solid rgba(0,255,178,0.18)", borderRadius:14, padding:"13px 16px" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ width:8,height:8,borderRadius:"50%",background:"var(--c-primary)",animation:"apex-pulse-ring 2s ease-in-out infinite",flexShrink:0 }} />
                <div>
                  <div style={{ fontSize:13.5, fontWeight:700, color:"var(--c-primary)" }}>Currently Available</div>
                  <div style={{ fontSize:12, color:"var(--c-text-2)", marginTop:2 }}>Open for freelance &amp; full-time opportunities</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.div initial={{ opacity:0, x:28 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }} transition={{ duration:0.75, delay:0.12 }}>
            <div style={{ position:"relative", background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", borderRadius:20, padding:"clamp(1.4rem,3.5vw,2rem)", backdropFilter:"blur(16px)" }}
              onMouseMove={onMouseMove}>
              <motion.div style={{ pointerEvents:"none", position:"absolute", inset:-1, borderRadius:21,
                background: useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(0,255,178,0.055), transparent 60%)` }} />

              {sent ? (
                <motion.div initial={{ opacity:0, scale:0.85 }} animate={{ opacity:1, scale:1 }}
                  style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"3.5rem 0", textAlign:"center" }}>
                  <motion.div initial={{ scale:0 }} animate={{ scale:1 }} transition={{ type:"spring", stiffness:200, delay:0.15 }}
                    style={{ width:60,height:60,borderRadius:"50%",background:"rgba(0,255,178,0.1)",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"1.2rem" }}>
                    <FaCheckCircle size={28} style={{ color:"var(--c-primary)" }} />
                  </motion.div>
                  <h3 style={{ fontFamily:"var(--f-display)", fontSize:"1.2rem", fontWeight:700, color:"var(--c-text)", marginBottom:6 }}>Message Sent! 🎉</h3>
                  <p style={{ color:"var(--c-text-2)", fontSize:13.5 }}>{"I'll"} get back to you soon!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} style={{ position:"relative", zIndex:1, display:"flex", flexDirection:"column", gap:"1rem" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:"1rem" }}>
                    <div>
                      {label("Your Name")}
                      <input type="text" value={form.name} placeholder="John Doe" required
                        onChange={e => setForm(p => ({...p,name:e.target.value}))}
                        onFocus={() => setFocused("name")} onBlur={() => setFocused(null)}
                        style={iStyle(focused==="name")} />
                    </div>
                    <div>
                      {label("Your Email")}
                      <input type="email" value={form.email} placeholder="john@example.com" required
                        onChange={e => setForm(p => ({...p,email:e.target.value}))}
                        onFocus={() => setFocused("email")} onBlur={() => setFocused(null)}
                        style={iStyle(focused==="email")} />
                    </div>
                  </div>
                  <div>
                    {label("Subject")}
                    <input type="text" value={form.subject} placeholder="Project Collaboration"
                      onChange={e => setForm(p => ({...p,subject:e.target.value}))}
                      onFocus={() => setFocused("subject")} onBlur={() => setFocused(null)}
                      style={iStyle(focused==="subject")} />
                  </div>
                  <div>
                    {label("Your Message")}
                    <textarea rows={4} value={form.message} placeholder="Tell me about your project..." required
                      onChange={e => setForm(p => ({...p,message:e.target.value}))}
                      onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                      style={{ ...iStyle(focused==="message"), resize:"none" }} />
                  </div>
                  <motion.button type="submit"
                    whileHover={{ y:-2, boxShadow:"0 14px 36px rgba(0,255,178,0.3)" }}
                    whileTap={{ scale:0.97 }}
                    style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:8,padding:"13px 0",background:"var(--c-primary)",color:"var(--c-bg)",fontFamily:"var(--f-body)",fontWeight:700,fontSize:14,borderRadius:12,border:"none",cursor:"pointer",boxShadow:"0 4px 20px rgba(0,255,178,0.2)" }}>
                    <FaPaperPlane size={13} /> Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
