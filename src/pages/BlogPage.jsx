import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaSearch, FaClock, FaCalendarAlt, FaFire, FaBookOpen } from "react-icons/fa";
import { articles } from "../data/content";
import Footer from "../sections/fotter/footer";

const TAG_COLOR = {
  Trends:  { bg:"#00FFB2", text:"#050A0F" },
  Flutter: { bg:"#60A5FA", text:"#050A0F" },
  MERN:    { bg:"#A78BFA", text:"#050A0F" },
  React:   { bg:"#22D3EE", text:"#050A0F" },
  Node:    { bg:"#4ADE80", text:"#050A0F" },
  Design:  { bg:"#FF4D6D", text:"#fff"    },
  Career:  { bg:"#F59E0B", text:"#050A0F" },
};
const tc   = (tag) => TAG_COLOR[tag] || { bg:"var(--c-primary)", text:"#050A0F" };
const tags = ["All", ...new Set(articles.map(a => a.tag))];

function ReadDots({ readTime }) {
  const n = Math.min(Math.ceil((parseInt(readTime)||5)/2), 6);
  return (
    <div style={{ display:"flex", gap:3 }}>
      {Array.from({length:6}).map((_,i) => (
        <div key={i} style={{ width:5,height:5,borderRadius:"50%", background: i<n ? "var(--c-primary)" : "rgba(255,255,255,0.08)" }} />
      ))}
    </div>
  );
}

function FeaturedHero({ article }) {
  const [hov, setHov] = useState(false);
  const t = tc(article.tag);
  return (
    <Link to={`/article/${article.slug}`} style={{ textDecoration:"none", display:"block", marginBottom:"clamp(2rem,5vw,3.5rem)" }}>
      <motion.div
        initial={{ opacity:0, y:32 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, ease:[0.23,1,0.32,1] }}
        onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ position:"relative", borderRadius:24, overflow:"hidden", border:`1px solid ${hov ? t.bg+"35":"var(--c-border-muted)"}`, boxShadow:hov?`0 32px 64px ${t.bg}12`:"none", transition:"border-color .4s, box-shadow .4s" }}
      >
        <div style={{ position:"relative", height:"clamp(320px,45vw,560px)", overflow:"hidden" }}>
          <img src={article.image} alt={article.title}
            style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform:hov?"scale(1.04)":"scale(1)", transition:"transform .8s cubic-bezier(.23,1,.32,1)" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(0deg, rgba(5,10,15,0.97) 0%, rgba(5,10,15,0.4) 50%, transparent 100%)" }} />
          <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 60% 50% at 20% 80%, ${t.bg}18, transparent)` }} />
          <div style={{ position:"absolute", top:20, left:20, display:"flex", gap:8 }}>
            <span style={{ padding:"5px 13px", borderRadius:8, background:"linear-gradient(90deg, var(--c-primary), #00D4FF)", color:"#000", fontFamily:"var(--f-mono)", fontSize:10, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" }}>✦ Featured</span>
            <span style={{ padding:"5px 13px", borderRadius:8, background:t.bg, color:t.text, fontFamily:"var(--f-mono)", fontSize:10, fontWeight:700 }}>{article.tag}</span>
          </div>
          <div style={{ position:"absolute", bottom:0, left:0, right:0, padding:"clamp(1.5rem,4vw,3rem)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"1.2rem", marginBottom:"1rem" }}>
              <span style={{ display:"flex", alignItems:"center", gap:5, fontFamily:"var(--f-mono)", fontSize:11, color:"rgba(255,255,255,0.5)" }}><FaCalendarAlt size={9} style={{ color:t.bg }}/> {article.date}</span>
              <span style={{ display:"flex", alignItems:"center", gap:5, fontFamily:"var(--f-mono)", fontSize:11, color:"rgba(255,255,255,0.5)" }}><FaClock size={9} style={{ color:"var(--c-accent)"}}/> {article.readTime}</span>
              <ReadDots readTime={article.readTime} />
            </div>
            <h2 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.5rem,4vw,2.8rem)", fontWeight:800, color:"#fff", lineHeight:1.12, marginBottom:"0.75rem", maxWidth:700, textShadow:"0 2px 24px rgba(0,0,0,0.5)" }}>{article.title}</h2>
            <p style={{ fontSize:"clamp(13px,1.6vw,15px)", color:"rgba(255,255,255,0.6)", lineHeight:1.7, maxWidth:560, marginBottom:"1.4rem" }}>{article.description}</p>
            <motion.div animate={{ gap:hov?12:7 }} style={{ display:"flex", alignItems:"center", color:t.bg, fontWeight:700, fontSize:14 }}>
              Read Article <FaArrowRight size={12}/>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

function ArticleCard({ article, index }) {
  const [hov, setHov] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-60px" });
  const t = tc(article.tag);
  return (
    <motion.div ref={ref} initial={{ opacity:0, y:28 }} animate={inView?{opacity:1,y:0}:{}} transition={{ duration:0.6, delay:index*0.1, ease:[0.23,1,0.32,1] }}>
      <Link to={`/article/${article.slug}`} style={{ textDecoration:"none", display:"block", height:"100%" }}>
        <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
          style={{ height:"100%", borderRadius:20, overflow:"hidden", background:"var(--c-surface)", backdropFilter:"blur(16px)", border:`1px solid ${hov?t.bg+"30":"var(--c-border-muted)"}`, display:"flex", flexDirection:"column", boxShadow:hov?`0 24px 56px ${t.bg}10`:"none", transition:"border-color .35s, box-shadow .35s" }}>
          <div style={{ position:"relative", height:200, overflow:"hidden", flexShrink:0 }}>
            <img src={article.image} alt={article.title}
              style={{ width:"100%", height:"100%", objectFit:"cover", display:"block", transform:hov?"scale(1.07)":"scale(1)", transition:"transform .6s cubic-bezier(.23,1,.32,1)" }} />
            <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg, transparent 35%, rgba(5,10,15,0.9) 100%)" }} />
            <div style={{ position:"absolute", top:12, right:12, padding:"3px 10px", borderRadius:7, background:t.bg, color:t.text, fontFamily:"var(--f-mono)", fontSize:10, fontWeight:700 }}>{article.tag}</div>
            <div style={{ position:"absolute", bottom:12, left:14, display:"flex", alignItems:"center", gap:7 }}>
              <ReadDots readTime={article.readTime}/>
              <span style={{ fontFamily:"var(--f-mono)", fontSize:10, color:"rgba(255,255,255,0.45)" }}>{article.readTime}</span>
            </div>
          </div>
          <div style={{ padding:"clamp(1rem,2.5vw,1.3rem)", display:"flex", flexDirection:"column", gap:"0.55rem", flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6, fontFamily:"var(--f-mono)", fontSize:10.5, color:"var(--c-muted)" }}>
              <FaCalendarAlt size={9} style={{ color:t.bg }}/> {article.date}
            </div>
            <h3 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(0.95rem,1.8vw,1.08rem)", fontWeight:700, lineHeight:1.3, color:hov?t.bg:"var(--c-text)", transition:"color .3s" }}>{article.title}</h3>
            <p style={{ fontSize:13, color:"var(--c-text-2)", lineHeight:1.65, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden", flex:1 }}>{article.description}</p>
            <motion.div animate={{ gap:hov?8:5 }} style={{ display:"flex", alignItems:"center", color:t.bg, fontWeight:700, fontSize:12.5, marginTop:"auto", paddingTop:"0.5rem" }}>
              Read more <FaArrowRight size={10}/>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BlogPage() {
  const [activeTag, setActiveTag] = useState("All");
  const [query,     setQuery]     = useState("");

  const filtered = articles.filter(a => {
    const matchTag = activeTag === "All" || a.tag === activeTag;
    const matchQ   = !query || a.title.toLowerCase().includes(query.toLowerCase()) || a.description.toLowerCase().includes(query.toLowerCase());
    return matchTag && matchQ;
  });

  const showFeatured = activeTag === "All" && !query;
  const featured     = articles[0];
  const gridItems    = showFeatured ? filtered.filter(a => a.slug !== featured.slug) : filtered;

  return (
    <main style={{ paddingTop:68, background:"var(--c-bg)", minHeight:"100vh" }}>

      {/* ── PAGE HEADER ── */}
      <div style={{ position:"relative", overflow:"hidden", background:"var(--c-bg-alt)", borderBottom:"1px solid var(--c-border-muted)" }}>
        <div style={{ position:"absolute", top:"-30%", right:"-10%", width:"50vw", height:"50vw", background:"radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(70px)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"-20%", left:"-8%", width:"40vw", height:"40vw", background:"radial-gradient(circle, rgba(0,255,178,0.05) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(70px)", pointerEvents:"none" }} />
        <div style={{ position:"relative", zIndex:10, maxWidth:1280, margin:"0 auto", padding:"clamp(3rem,6vw,5rem) clamp(1.5rem,5vw,3rem)" }}>
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65 }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:8, marginBottom:"0.85rem" }}>
              <div style={{ width:22,height:1,background:"var(--c-primary)" }} />
              <span style={{ fontFamily:"var(--f-mono)",fontSize:11,letterSpacing:"0.12em",textTransform:"uppercase",color:"var(--c-primary)" }}>Blog & Writing</span>
              <div style={{ width:6,height:1,background:"var(--c-primary)",opacity:0.4 }} />
            </div>
            <h1 style={{ fontFamily:"var(--f-display)", fontWeight:800, fontSize:"clamp(2.5rem,7vw,6rem)", lineHeight:0.95, letterSpacing:"-0.04em", marginBottom:"clamp(1rem,3vw,1.5rem)" }}>
              <span style={{ display:"block", color:"var(--c-text)" }}>Thoughts,</span>
              <span className="gradient-text">Tutorials</span>
              <span style={{ color:"var(--c-text)", fontWeight:300, fontSize:"0.5em", letterSpacing:"0", marginLeft:"0.3em" }}>&amp; deep dives.</span>
            </h1>
            <p style={{ fontSize:"clamp(0.9rem,1.6vw,1rem)", color:"var(--c-text-2)", maxWidth:480, lineHeight:1.7, marginBottom:"2rem" }}>
              Writing about Flutter, MERN stack, architecture patterns, and things I learn while building real stuff.
            </p>
            <div style={{ display:"flex", gap:"2rem", flexWrap:"wrap" }}>
              {[
                { icon:<FaBookOpen size={12}/>, label:`${articles.length} Articles` },
                { icon:<FaFire size={12}/>,     label:"Updated regularly"           },
                { icon:<FaClock size={12}/>,    label:"Avg 6 min read"              },
              ].map(s => (
                <div key={s.label} style={{ display:"flex", alignItems:"center", gap:6, fontFamily:"var(--f-mono)", fontSize:11.5, color:"var(--c-text-2)" }}>
                  <span style={{ color:"var(--c-primary)" }}>{s.icon}</span> {s.label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── STICKY FILTER BAR ── */}
      <div style={{ position:"sticky", top:68, zIndex:100, background:"rgba(5,10,15,0.88)", backdropFilter:"blur(20px)", borderBottom:"1px solid var(--c-border-muted)" }}>
        <div style={{ maxWidth:1280, margin:"0 auto", padding:"0.85rem clamp(1.5rem,5vw,3rem)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"0.85rem" }}>
          <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
            {tags.map(tag => {
              const active = activeTag === tag;
              const t = tc(tag);
              return (
                <motion.button key={tag} whileHover={{ y:-1 }} whileTap={{ scale:0.96 }} onClick={() => setActiveTag(tag)}
                  style={{ padding:"6px 14px", borderRadius:8, fontSize:12.5, fontWeight:600, fontFamily:"var(--f-body)", cursor:"pointer", border:"1px solid", transition:"all .2s",
                    background: active ? (tag==="All"?"var(--c-primary)":t.bg) : "var(--c-surface)",
                    borderColor: active ? (tag==="All"?"var(--c-primary)":t.bg) : "var(--c-border-muted)",
                    color: active ? (tag==="All"?"var(--c-bg)":t.text) : "var(--c-text-2)",
                    boxShadow: active ? `0 4px 16px ${tag==="All"?"rgba(0,255,178,0.25)":t.bg+"40"}` : "none",
                  }}>
                  {tag}
                </motion.button>
              );
            })}
          </div>
          {/* Search */}
          <div style={{ position:"relative", maxWidth:340, flex:1 }}>
            <FaSearch size={12} style={{ position:"absolute", left:13, top:"50%", transform:"translateY(-50%)", color:"var(--c-muted)", pointerEvents:"none" }} />
            <input type="text" value={query} onChange={e => setQuery(e.target.value)} placeholder="Search articles…"
              style={{ width:"100%", padding:"10px 14px 10px 38px", background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", borderRadius:10, fontFamily:"var(--f-body)", fontSize:13.5, color:"var(--c-text)", outline:"none", caretColor:"var(--c-primary)" }}
              onFocus={e => { e.target.style.borderColor="rgba(0,255,178,0.45)"; e.target.style.boxShadow="0 0 0 3px rgba(0,255,178,0.08)"; }}
              onBlur={e => { e.target.style.borderColor="var(--c-border-muted)"; e.target.style.boxShadow="none"; }} />
          </div>
        </div>
      </div>

      {/* ── CONTENT ── */}
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"clamp(2rem,5vw,3.5rem) clamp(1.5rem,5vw,3rem)" }}>
        {showFeatured && <FeaturedHero article={featured} />}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div key="empty" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              style={{ textAlign:"center", padding:"5rem 2rem", color:"var(--c-muted)" }}>
              <div style={{ fontSize:"3rem", marginBottom:"1rem" }}>📭</div>
              <div style={{ fontFamily:"var(--f-display)", fontSize:"1.3rem", fontWeight:700, color:"var(--c-text-2)", marginBottom:"0.5rem" }}>No articles found</div>
              <div style={{ fontFamily:"var(--f-mono)", fontSize:12 }}>Try a different tag or search term</div>
            </motion.div>
          ) : (
            <motion.div key="grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(min(100%,300px),1fr))", gap:"clamp(1rem,2.5vw,1.4rem)" }}>
              {gridItems.map((article, i) => <ArticleCard key={article.slug} article={article} index={i} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </main>
  );
}
