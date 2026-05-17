import { useMemo, useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { FaCalendarAlt, FaClock, FaArrowLeft, FaUser, FaTwitter, FaLinkedin, FaCopy, FaCheck } from "react-icons/fa";
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
const tc = (tag) => TAG_COLOR[tag] || { bg:"var(--c-primary)", text:"#050A0F" };

/* ── Reading progress bar (separate from global scroll bar) ── */
function ReadingProgress({ accent }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness:100, damping:30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin:"left", position:"fixed", top:68, left:0, right:0, height:2, background:accent, zIndex:200 }}
    />
  );
}

/* ── Estimated reading progress text ── */
function useReadProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const el  = document.documentElement;
      const top = el.scrollTop || document.body.scrollTop;
      const h   = el.scrollHeight - el.clientHeight;
      setPct(h > 0 ? Math.round((top / h) * 100) : 0);
    };
    window.addEventListener("scroll", fn, { passive:true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return pct;
}

/* ── Copy link button ── */
function CopyLink() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <motion.button whileHover={{ scale:1.08 }} whileTap={{ scale:0.95 }} onClick={copy}
      style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:9, background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", color:copied?"var(--c-primary)":"var(--c-muted)", fontFamily:"var(--f-mono)", fontSize:11, cursor:"pointer", transition:"color .2s, border-color .2s",
        borderColor: copied ? "rgba(0,255,178,0.4)" : "var(--c-border-muted)" }}>
      {copied ? <FaCheck size={11}/> : <FaCopy size={11}/>}
      {copied ? "Copied!" : "Copy link"}
    </motion.button>
  );
}

/* ── Related card ── */
function RelatedCard({ article }) {
  const [hov, setHov] = useState(false);
  const t = tc(article.tag);
  return (
    <Link to={`/article/${article.slug}`} style={{ textDecoration:"none" }}>
      <motion.div whileHover={{ y:-4 }} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
        style={{ display:"flex", gap:12, padding:"12px", borderRadius:14, background:"var(--c-surface)", border:`1px solid ${hov?t.bg+"30":"var(--c-border-muted)"}`, transition:"border-color .3s", cursor:"pointer" }}>
        <img src={article.image} alt={article.title}
          style={{ width:56, height:56, borderRadius:10, objectFit:"cover", flexShrink:0 }} />
        <div style={{ minWidth:0 }}>
          <div style={{ display:"inline-block", padding:"2px 7px", borderRadius:5, background:t.bg, color:t.text, fontFamily:"var(--f-mono)", fontSize:9, fontWeight:700, marginBottom:5 }}>{article.tag}</div>
          <div style={{ fontSize:13, fontWeight:600, color: hov ? t.bg : "var(--c-text)", lineHeight:1.35, transition:"color .25s", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
            {article.title}
          </div>
          <div style={{ fontFamily:"var(--f-mono)", fontSize:10, color:"var(--c-muted)", marginTop:4 }}>{article.readTime}</div>
        </div>
      </motion.div>
    </Link>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const article  = useMemo(() => articles.find(a => a.slug === slug), [slug]);
  const pct      = useReadProgress();
  const related  = useMemo(() => articles.filter(a => a.slug !== slug).slice(0, 3), [slug]);

  if (!article) {
    return (
      <main style={{ paddingTop:88, minHeight:"100vh", background:"var(--c-bg)", color:"var(--c-text)", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ textAlign:"center", padding:"4rem 1.5rem" }}>
          <div style={{ fontFamily:"var(--f-display)", fontSize:"clamp(5rem,15vw,10rem)", fontWeight:800, lineHeight:1, background:"linear-gradient(135deg, var(--c-primary), var(--c-secondary))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>404</div>
          <h1 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.5rem,4vw,2.2rem)", fontWeight:800, marginBottom:"1rem", color:"var(--c-text)" }}>Article not found</h1>
          <p style={{ color:"var(--c-text-2)", marginBottom:"2rem" }}>This article doesn't exist or was moved.</p>
          <Link to="/blog" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"11px 22px", background:"var(--c-primary)", color:"var(--c-bg)", borderRadius:12, fontWeight:700, fontSize:14, textDecoration:"none" }}>
            <FaArrowLeft size={12}/> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  const accent = tc(article.tag).bg;
  const tStyle = tc(article.tag);

  return (
    <main style={{ paddingTop:68, background:"var(--c-bg)", color:"var(--c-text)", minHeight:"100vh" }}>

      {/* Reading progress bar */}
      <ReadingProgress accent={accent} />

      {/* ── HERO ── */}
      <div style={{ position:"relative", minHeight:"clamp(380px,55vw,620px)", overflow:"hidden", display:"flex", alignItems:"flex-end" }}>
        {/* Background image with strong overlay */}
        <div style={{ position:"absolute", inset:0 }}>
          <img src={article.image} alt={article.title} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(0deg, rgba(5,10,15,1) 0%, rgba(5,10,15,0.75) 40%, rgba(5,10,15,0.35) 100%)" }} />
          {/* Accent color bleed */}
          <div style={{ position:"absolute", inset:0, background:`radial-gradient(ellipse 70% 60% at 10% 90%, ${accent}20, transparent 60%)` }} />
        </div>

        {/* Content */}
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:1280, margin:"0 auto", padding:"clamp(2rem,5vw,4rem) clamp(1.5rem,5vw,3rem)" }}>
          <motion.div initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.75, ease:[0.23,1,0.32,1] }}>

            {/* Back + Tag row */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:"1.5rem", flexWrap:"wrap" }}>
              <Link to="/blog" style={{ display:"inline-flex", alignItems:"center", gap:6, padding:"6px 12px", borderRadius:8, background:"rgba(5,10,15,0.6)", backdropFilter:"blur(12px)", border:"1px solid rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.6)", textDecoration:"none", fontFamily:"var(--f-mono)", fontSize:11, transition:"color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color="#fff"}
                onMouseLeave={e => e.currentTarget.style.color="rgba(255,255,255,0.6)"}>
                <FaArrowLeft size={10}/> All Articles
              </Link>
              <span style={{ padding:"5px 13px", borderRadius:8, background:tStyle.bg, color:tStyle.text, fontFamily:"var(--f-mono)", fontSize:10.5, fontWeight:700 }}>
                {article.tag}
              </span>
            </div>

            {/* Title */}
            <h1 style={{ fontFamily:"var(--f-display)", fontSize:"clamp(1.8rem,5vw,4rem)", fontWeight:800, lineHeight:1.08, color:"#fff", maxWidth:820, marginBottom:"1.2rem", textShadow:"0 2px 32px rgba(0,0,0,0.5)", letterSpacing:"-0.02em" }}>
              {article.title}
            </h1>

            {/* Meta + share row */}
            <div style={{ display:"flex", alignItems:"center", flexWrap:"wrap", gap:"1.5rem" }}>
              <div style={{ display:"flex", alignItems:"center", gap:"1.2rem", flexWrap:"wrap" }}>
                {[
                  { icon:<FaUser size={10}/>,        text: article.author || "Leul Seyoum" },
                  { icon:<FaCalendarAlt size={10}/>,  text: article.date                   },
                  { icon:<FaClock size={10}/>,        text: article.readTime               },
                ].map(m => (
                  <div key={m.text} style={{ display:"flex", alignItems:"center", gap:5, fontFamily:"var(--f-mono)", fontSize:11.5, color:"rgba(255,255,255,0.55)" }}>
                    <span style={{ color:accent }}>{m.icon}</span> {m.text}
                  </div>
                ))}
              </div>

              {/* Reading pct */}
              <div style={{ marginLeft:"auto", display:"flex", alignItems:"center", gap:8, fontFamily:"var(--f-mono)", fontSize:11, color:"rgba(255,255,255,0.45)" }}>
                <div style={{ width:60, height:2, borderRadius:1, background:"rgba(255,255,255,0.1)", overflow:"hidden" }}>
                  <motion.div style={{ height:"100%", borderRadius:1, background:accent, width:`${pct}%` }} />
                </div>
                {pct}% read
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── ARTICLE BODY + SIDEBAR ── */}
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"clamp(2.5rem,5vw,4rem) clamp(1.5rem,5vw,3rem)", display:"grid", gridTemplateColumns:"minmax(0,1fr) clamp(240px,28vw,300px)", gap:"clamp(2rem,4vw,4rem)", alignItems:"start" }}>

        {/* Main article column */}
        <motion.div initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.65, delay:0.2 }}>

          {/* Description callout */}
          <div style={{ padding:"1.2rem 1.4rem", borderLeft:`3px solid ${accent}`, background:`${accent}08`, borderRadius:"0 12px 12px 0", marginBottom:"2.5rem" }}>
            <p style={{ fontSize:"clamp(14px,1.7vw,16px)", color:"var(--c-text)", lineHeight:1.75, margin:0, fontStyle:"italic" }}>
              {article.description}
            </p>
          </div>

          {/* Article content */}
          <div
            dangerouslySetInnerHTML={{ __html: article.content }}
            className="apex-prose"
          />

          {/* Share strip */}
          <div style={{ marginTop:"3rem", padding:"1.4rem 1.6rem", background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", borderRadius:16, backdropFilter:"blur(14px)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"1rem" }}>
            <div>
              <div style={{ fontFamily:"var(--f-display)", fontSize:15, fontWeight:700, color:"var(--c-text)", marginBottom:3 }}>Enjoyed this article?</div>
              <div style={{ fontFamily:"var(--f-mono)", fontSize:11, color:"var(--c-muted)" }}>Share it or copy the link</div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <motion.a whileHover={{ scale:1.08 }}
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank" rel="noopener"
                style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:9, background:"var(--c-surface-2)", border:"1px solid var(--c-border-muted)", color:"#1DA1F2", fontFamily:"var(--f-mono)", fontSize:11, textDecoration:"none" }}>
                <FaTwitter size={12}/> Tweet
              </motion.a>
              <motion.a whileHover={{ scale:1.08 }}
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank" rel="noopener"
                style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:9, background:"var(--c-surface-2)", border:"1px solid var(--c-border-muted)", color:"#0A66C2", fontFamily:"var(--f-mono)", fontSize:11, textDecoration:"none" }}>
                <FaLinkedin size={12}/> Share
              </motion.a>
              <CopyLink />
            </div>
          </div>

          {/* Author card */}
          <div style={{ marginTop:"2rem", padding:"1.4rem 1.6rem", background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", borderRadius:16, backdropFilter:"blur(14px)", display:"flex", alignItems:"center", gap:"1.2rem", flexWrap:"wrap" }}>
            <div style={{ width:52, height:52, borderRadius:"50%", background:`linear-gradient(135deg, ${accent}, #00D4FF)`, display:"flex", alignItems:"center", justifyContent:"center", color:"#000", fontFamily:"var(--f-display)", fontWeight:800, fontSize:20, flexShrink:0 }}>
              L
            </div>
            <div>
              <div style={{ fontFamily:"var(--f-display)", fontSize:15, fontWeight:700, color:"var(--c-text)" }}>{article.author || "Leul Seyoum"}</div>
              <div style={{ fontFamily:"var(--f-mono)", fontSize:11, color:"var(--c-muted)", marginTop:3 }}>Flutter & Full-Stack Developer · Addis Ababa</div>
            </div>
            <Link to="/blog" style={{ marginLeft:"auto", display:"inline-flex", alignItems:"center", gap:6, padding:"8px 16px", borderRadius:9, background:`${accent}18`, border:`1px solid ${accent}35`, color:accent, fontFamily:"var(--f-mono)", fontSize:11, fontWeight:700, textDecoration:"none" }}>
              More articles →
            </Link>
          </div>
        </motion.div>

        {/* ── Sidebar ── */}
        <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.65, delay:0.3 }}
          style={{ display:"flex", flexDirection:"column", gap:"1.2rem", position:"sticky", top:88 }}>

          {/* Article info */}
          <div style={{ background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", borderRadius:18, padding:"clamp(1rem,2.5vw,1.4rem)", backdropFilter:"blur(14px)" }}>
            <div style={{ fontFamily:"var(--f-mono)", fontSize:10, color:"var(--c-muted)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"1rem" }}>About This Article</div>
            {[
              { label:"Tag",       value:article.tag                   },
              { label:"Author",    value:article.author||"Leul Seyoum" },
              { label:"Read Time", value:article.readTime              },
              { label:"Published", value:article.date                  },
            ].map((row, i, arr) => (
              <div key={row.label} style={{ paddingBottom:i<arr.length-1?"0.85rem":0, marginBottom:i<arr.length-1?"0.85rem":0, borderBottom:i<arr.length-1?"1px solid var(--c-border-muted)":"none" }}>
                <div style={{ fontFamily:"var(--f-mono)", fontSize:10, color:"var(--c-muted)", textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:3 }}>{row.label}</div>
                {row.label === "Tag" ? (
                  <span style={{ padding:"3px 10px", borderRadius:6, background:tStyle.bg, color:tStyle.text, fontFamily:"var(--f-mono)", fontSize:11, fontWeight:700 }}>{row.value}</span>
                ) : (
                  <div style={{ fontSize:13.5, color:"var(--c-text)", fontWeight:500 }}>{row.value}</div>
                )}
              </div>
            ))}
          </div>

          {/* Reading progress */}
          <div style={{ background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", borderRadius:14, padding:"1rem 1.2rem", backdropFilter:"blur(14px)" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontFamily:"var(--f-mono)", fontSize:10, color:"var(--c-muted)", textTransform:"uppercase", letterSpacing:"0.1em" }}>Reading Progress</span>
              <span style={{ fontFamily:"var(--f-mono)", fontSize:11, color:accent, fontWeight:700 }}>{pct}%</span>
            </div>
            <div style={{ height:4, borderRadius:2, background:"rgba(255,255,255,0.05)", overflow:"hidden" }}>
              <motion.div style={{ height:"100%", borderRadius:2, background:`linear-gradient(90deg, ${accent}, #00D4FF)`, width:`${pct}%` }} />
            </div>
          </div>

          {/* Related articles */}
          {related.length > 0 && (
            <div style={{ background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", borderRadius:18, padding:"clamp(1rem,2.5vw,1.4rem)", backdropFilter:"blur(14px)" }}>
              <div style={{ fontFamily:"var(--f-mono)", fontSize:10, color:"var(--c-muted)", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:"1rem" }}>More Articles</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {related.map(a => <RelatedCard key={a.slug} article={a} />)}
              </div>
            </div>
          )}

          {/* Back button */}
          <Link to="/blog" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, padding:"11px", background:"var(--c-surface)", border:"1px solid var(--c-border-muted)", borderRadius:12, color:"var(--c-text-2)", fontSize:13, fontWeight:600, textDecoration:"none", transition:"all .25s" }}
            onMouseEnter={e => { e.currentTarget.style.color="var(--c-text)"; e.currentTarget.style.borderColor="var(--c-border)"; }}
            onMouseLeave={e => { e.currentTarget.style.color="var(--c-text-2)"; e.currentTarget.style.borderColor="var(--c-border-muted)"; }}>
            <FaArrowLeft size={11}/> All Articles
          </Link>
        </motion.div>
      </div>

      {/* ── Prose styles ── */}
      <style>{`
        .apex-prose {
          font-size: clamp(15px,1.8vw,17px);
          line-height: 1.85;
          color: var(--c-text-2);
        }
        .apex-prose h1,.apex-prose h2,.apex-prose h3 {
          font-family: var(--f-display);
          font-weight: 800;
          color: var(--c-text);
          line-height: 1.2;
          margin: 2.2rem 0 0.9rem;
          letter-spacing: -0.02em;
        }
        .apex-prose h2 { font-size: clamp(1.2rem,2.5vw,1.6rem); }
        .apex-prose h3 { font-size: clamp(1rem,2vw,1.25rem); }
        .apex-prose p  { margin-bottom: 1.4rem; }
        .apex-prose strong { color: var(--c-text); font-weight: 700; }
        .apex-prose em { color: var(--c-text-2); font-style: italic; }
        .apex-prose a { color: var(--c-primary); text-underline-offset: 3px; text-decoration: underline; }
        .apex-prose code {
          font-family: var(--f-mono);
          font-size: 0.85em;
          padding: 2px 8px;
          border-radius: 5px;
          background: var(--c-surface-2);
          border: 1px solid var(--c-border-muted);
          color: var(--c-primary);
        }
        .apex-prose pre {
          background: #020609;
          border: 1px solid var(--c-border-muted);
          border-radius: 14px;
          padding: 1.4rem;
          overflow-x: auto;
          margin: 1.8rem 0;
          border-left: 3px solid var(--c-primary);
        }
        .apex-prose pre code {
          background: none; border: none; padding: 0;
          font-size: 13px; color: #a8b8c8;
        }
        .apex-prose ul, .apex-prose ol {
          padding-left: 1.5rem;
          margin-bottom: 1.4rem;
        }
        .apex-prose li { margin-bottom: 0.5rem; }
        .apex-prose blockquote {
          border-left: 3px solid var(--c-primary);
          padding: 1rem 1.4rem;
          margin: 2rem 0;
          background: rgba(0,255,178,0.04);
          border-radius: 0 12px 12px 0;
          color: var(--c-text);
          font-size: 1.05em;
          font-style: italic;
        }
        .apex-prose hr {
          border: none;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--c-border-muted), transparent);
          margin: 2.5rem 0;
        }

        @media (max-width: 860px) {
          .apex-article-grid {
            grid-template-columns: 1fr !important;
          }
          .apex-article-sidebar {
            position: static !important;
          }
        }
      `}</style>

      {/* Responsive fix for sidebar */}
      <style>{`
        @media (max-width: 860px) {
          [style*="grid-template-columns: minmax(0, 1fr) clamp(240px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <Footer />
    </main>
  );
}
