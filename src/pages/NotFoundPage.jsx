import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFoundPage() {
  const canvasRef = useRef(null);

  /* Starfield canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = canvas.width  = window.innerWidth;
    let h = canvas.height = window.innerHeight;
    let raf;

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random(),
      s: Math.random() * 0.005 + 0.002,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach(s => {
        s.a += s.s;
        if (s.a > 1) { s.a = 0; s.x = Math.random() * w; s.y = Math.random() * h; }
        ctx.globalAlpha = Math.sin(s.a * Math.PI) * 0.6;
        ctx.fillStyle = "#00FFB2";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <main style={{ position: "relative", minHeight: "100vh", background: "var(--c-bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "2rem" }}>

      {/* Starfield */}
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />

      {/* Orbs */}
      <div style={{ position: "absolute", top: "10%", left: "10%", width: 400, height: 400, background: "radial-gradient(circle, rgba(0,255,178,0.06) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "10%", right: "10%", width: 340, height: 340, background: "radial-gradient(circle, rgba(255,77,109,0.05) 0%, transparent 70%)", borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none", zIndex: 0 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 520 }}>

        {/* Big 404 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          style={{ position: "relative", marginBottom: "2rem" }}
        >
          <div style={{
            fontFamily: "var(--f-display)",
            fontSize: "clamp(7rem,20vw,14rem)",
            fontWeight: 800,
            lineHeight: 1,
            background: "linear-gradient(135deg, var(--c-primary) 0%, #00D4FF 40%, var(--c-secondary) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.04em",
            userSelect: "none",
          }}>
            404
          </div>
          {/* Glow under */}
          <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "70%", height: 40, background: "rgba(0,255,178,0.15)", filter: "blur(28px)", borderRadius: "50%", zIndex: -1 }} />
        </motion.div>

        {/* Terminal card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{ background: "var(--c-surface)", border: "1px solid var(--c-border-muted)", borderRadius: 18, padding: "1.5rem", backdropFilter: "blur(16px)", marginBottom: "2rem", textAlign: "left" }}
        >
          {/* Terminal chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: "1rem" }}>
            {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
            <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--c-muted)", marginLeft: 8 }}>bash — leul@portfolio</span>
          </div>
          <div style={{ fontFamily: "var(--f-mono)", fontSize: 13, lineHeight: 1.8 }}>
            <div style={{ color: "var(--c-muted)" }}>$ <span style={{ color: "var(--c-text-2)" }}>navigate to <span style={{ color: "var(--c-primary)" }}>this-page</span></span></div>
            <div style={{ color: "var(--c-secondary)" }}>Error: route not found</div>
            <div style={{ color: "var(--c-muted)" }}>$ <span style={{ color: "var(--c-text-2)" }}>ls available-routes/</span></div>
            <div style={{ color: "var(--c-primary)" }}>home/&nbsp;&nbsp;projects/&nbsp;&nbsp;blog/&nbsp;&nbsp;contact/</div>
            <div style={{ color: "var(--c-muted)" }}>$ <span style={{ display: "inline-block" }}>
              <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1 }} style={{ color: "var(--c-primary)" }}>▌</motion.span>
            </span></div>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          style={{ fontFamily: "var(--f-display)", fontSize: "clamp(1.2rem,3vw,1.6rem)", fontWeight: 700, color: "var(--c-text)", marginBottom: "0.75rem" }}
        >
          Page Not Found
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          style={{ fontSize: "clamp(0.9rem,1.6vw,1rem)", color: "var(--c-text-2)", lineHeight: 1.7, marginBottom: "2rem" }}
        >
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}
        >
          <Link to="/"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "var(--c-primary)", color: "var(--c-bg)", fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 14, borderRadius: 12, textDecoration: "none", transition: "transform .2s, box-shadow .2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,255,178,0.3)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
          >
            ← Back Home
          </Link>
          <Link to="/projects"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px", background: "var(--c-surface)", border: "1px solid var(--c-border-muted)", color: "var(--c-text)", fontFamily: "var(--f-body)", fontWeight: 600, fontSize: 14, borderRadius: 12, textDecoration: "none", backdropFilter: "blur(12px)", transition: "border-color .2s, color .2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--c-border)"; e.currentTarget.style.color = "var(--c-primary)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--c-border-muted)"; e.currentTarget.style.color = "var(--c-text)"; }}
          >
            View Projects
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
