import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Typed from "typed.js";
import { FaGithub, FaLinkedin, FaEnvelope, FaDownload } from "react-icons/fa";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

/* ─── 3D Sphere ─── */
function DistortSphere() {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.elapsedTime * 0.18;
      mesh.current.rotation.x = clock.elapsedTime * 0.08;
    }
  });
  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={mesh} args={[1, 96, 96]} scale={2.2}>
        <MeshDistortMaterial
          color="#00FFB2"
          distort={0.38}
          speed={2.5}
          roughness={0.05}
          metalness={0.92}
          transparent
          opacity={0.85}
        />
      </Sphere>
    </Float>
  );
}

/* ─── Mini Live Terminal ─── */
const TERMINAL_SEQUENCE = [
  { text: "$ whoami",                   delay: 0 },
  { text: "leul_seyoum",                delay: 400,  color: "var(--c-primary)" },
  { text: "$ cat skills.txt",           delay: 900 },
  { text: "Flutter • React • Node.js",  delay: 1400, color: "#60A5FA" },
  { text: "Three.js • Firebase • AWS",  delay: 1800, color: "#60A5FA" },
  { text: "$ status",                   delay: 2400 },
  { text: "✓ Available for work",       delay: 2900, color: "var(--c-primary)" },
  { text: "$ _",                        delay: 3400, blink: true },
];

function MiniTerminal() {
  const [lines, setLines] = useState([]);
  const bodyRef = useRef(null);

  useEffect(() => {
    let timers = [];
    TERMINAL_SEQUENCE.forEach((item, i) => {
      const t = setTimeout(() => {
        setLines(prev => [...prev, item]);
        if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
      }, item.delay + i * 20);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="apex-terminal">
      <div className="apex-terminal-header">
        <div style={{ display:"flex", gap:6 }}>
          {["#FF5F57","#FEBC2E","#28C840"].map(c => (
            <div key={c} style={{ width:11,height:11,borderRadius:"50%",background:c }} />
          ))}
        </div>
        <span style={{ fontFamily:"var(--f-mono)", fontSize:11, color:"var(--c-muted)" }}>
          leul@portfolio ~ bash
        </span>
        <div style={{ width:50 }} />
      </div>
      <div ref={bodyRef} className="apex-terminal-body">
        {lines.map((line, i) => (
          <div key={i} style={{
            color: line.color || "var(--c-text-2)",
            animation: "apex-data-in 0.2s ease",
          }}>
            {line.blink ? (
              <span>
                {"$ "}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  style={{ color:"var(--c-primary)" }}
                >▌</motion.span>
              </span>
            ) : line.text}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Counter ─── */
function Counter({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const step = Math.ceil(target / 40);
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + step, target);
          setVal(cur);
          if (cur >= target) clearInterval(t);
        }, 40);
      }
    });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Floating badge ─── */
function Badge({ text, color, style, delay = 0 }) {
  return (
    <motion.div
      className="apex-badge"
      style={style}
      animate={{ y: [0, -9, 0] }}
      transition={{ duration: 4.5 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <div className="apex-badge-dot" style={{ background: color }} />
      <span style={{ fontFamily:"var(--f-mono)", fontSize:11, color:"var(--c-text)" }}>{text}</span>
    </motion.div>
  );
}

const STATS = [
  { value: 3,  suffix: "+", label: "Years Experience", sub: "since 2022" },
  { value: 25, suffix: "+", label: "Projects Shipped",  sub: "web & mobile" },
  { value: 15, suffix: "+", label: "Happy Clients",     sub: "worldwide" },
  { value: 99, suffix: "%", label: "Satisfaction",      sub: "rate" },
];

/* ─── Main Home ─── */
export default function Home() {
  const typedRef = useRef(null);
  const { scrollY } = useScroll();
  const springY = useSpring(scrollY, { stiffness: 90, damping: 28 });
  const heroOpacity = useTransform(springY, [0, 480], [1, 0]);
  const heroScale   = useTransform(springY, [0, 480], [1, 0.94]);
  const heroY       = useTransform(springY, [0, 480], [0, 80]);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Flutter Developer", "MERN Stack Engineer", "UI/UX Craftsman", "Full-Stack Builder", "Problem Solver"],
      typeSpeed: 55,
      backSpeed: 35,
      backDelay: 2200,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });
    return () => typed.destroy();
  }, []);

  const particlesInit = useCallback(async (main) => await loadFull(main), []);
  const particlesOpts = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    interactivity: {
      events: { onHover: { enable: true, mode: "bubble" }, onClick: { enable: true, mode: "repulse" } },
      modes: { bubble: { distance: 100, size: 4, duration: 2, opacity: 0.5 }, repulse: { distance: 120, duration: 0.4 } },
    },
    particles: {
      color: { value: ["#00FFB2", "#FF4D6D", "#7C3AED"] },
      links: { enable: true, color: "#00FFB2", distance: 120, opacity: 0.04, width: 1 },
      move: { enable: true, speed: 0.9, direction: "none", outModes: "out" },
      number: { density: { enable: true, area: 1000 }, value: 45 },
      opacity: { value: { min: 0.05, max: 0.3 } },
      size: { value: { min: 1, max: 2.5 } },
    },
  };

  return (
    <section id="home" className="apex-home">
      {/* Particles */}
      <Particles
        id="apex-tsparticles"
        init={particlesInit}
        options={particlesOpts}
        style={{ position:"absolute", inset:0, zIndex:1, pointerEvents:"none" }}
      />

      {/* BG grid + orbs */}
      <div className="apex-bg-grid" />
      <div className="apex-orb apex-orb-1" />
      <div className="apex-orb apex-orb-2" />
      <div className="apex-orb apex-orb-3" />

      {/* Hero content */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
        className="apex-home-inner"
      >
        {/* ─── Left ─── */}
        <div className="apex-hero-left">
          {/* Status badge */}
          <motion.div
            className="apex-status-badge"
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.4, duration:0.6 }}
          >
            <div className="apex-pulse-dot" />
            Open to new opportunities
          </motion.div>

          {/* Name */}
          <motion.h1
            className="apex-hero-name"
            initial={{ opacity:0, y:30 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.55, duration:0.9, ease:[0.23,1,0.32,1] }}
          >
            <span
              className="apex-glitch gradient-text"
              data-text="Leul"
            >
              Leul
            </span>
            <br />
            <span style={{ color:"var(--c-text)", WebkitTextFillColor:"var(--c-text)" }}>
              Seyoum
            </span>
          </motion.h1>

          {/* Typed role */}
          <motion.div
            className="apex-hero-role"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:0.8 }}
          >
            <span style={{ color:"var(--c-muted)" }}>~/</span>
            <span ref={typedRef} style={{ color:"var(--c-primary)" }} />
          </motion.div>

          {/* Bio */}
          <motion.p
            className="apex-hero-bio"
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:0.95, duration:0.7 }}
          >
            Crafting{" "}
            <span style={{ color:"var(--c-primary)", fontWeight:600 }}>immersive digital experiences</span>
            {" "}with Flutter & the MERN stack. I transform ambitious ideas into{" "}
            <span style={{ color:"var(--c-secondary)", fontWeight:600 }}>elegant, scalable</span>
            {" "}solutions that leave a lasting impact.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="apex-hero-ctas"
            initial={{ opacity:0, y:16 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:1.1, duration:0.7 }}
          >
            <a href="/#contact" className="apex-btn-primary">
              ✦ Let's Build Together
            </a>
            <a href="/Leul_Resume.pdf" target="_blank" rel="noopener" className="apex-btn-ghost">
              <FaDownload size={13} /> Resume
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div
            className="apex-socials"
            initial={{ opacity:0 }}
            animate={{ opacity:1 }}
            transition={{ delay:1.3 }}
          >
            {[
              { href:"https://github.com/leul-dev2",          icon:<FaGithub size={16} />,   label:"GitHub" },
              { href:"https://www.linkedin.com/in/leul-seyoum/", icon:<FaLinkedin size={16} />, label:"LinkedIn" },
              { href:"mailto:leulsegedseyoum@gmail.com",      icon:<FaEnvelope size={16} />, label:"Email" },
            ].map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener" aria-label={label}
                className="apex-social-icon">
                {icon}
              </a>
            ))}
          </motion.div>
        </div>

        {/* ─── Right ─── */}
        <motion.div
          className="apex-hero-right"
          initial={{ opacity:0, x:40 }}
          animate={{ opacity:1, x:0 }}
          transition={{ delay:0.6, duration:0.9, ease:[0.23,1,0.32,1] }}
        >
          {/* Profile card */}
          <Tilt tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={2500}>
            <div className="apex-profile-wrap">
              {/* 3D canvas behind */}
              <div style={{ position:"absolute", inset:0, zIndex:0, borderRadius:28, overflow:"hidden" }}>
                <Canvas camera={{ position:[0,0,5.5], fov:42 }}>
                  <ambientLight intensity={0.25} />
                  <pointLight position={[-2,4,2]} intensity={2.2} color="#00FFB2" />
                  <pointLight position={[3,-3,-2]} intensity={1.2} color="#FF4D6D" />
                  <DistortSphere />
                  <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.4} />
                </Canvas>
              </div>

              {/* Photo */}
              <div className="apex-profile-img-frame">
                <img src="/leul.jpg" alt="Leul Seyoum" className="apex-profile-img" />
                <div className="apex-profile-img-overlay" />
              </div>

              {/* Floating badges */}
              <Badge text="⚡ React"   color="#00FFB2" delay={0}   style={{ top:"8%",  right:"-14%", zIndex:20 }} />
              <Badge text="💙 Flutter" color="#60A5FA" delay={1}   style={{ bottom:"22%", left:"-14%", zIndex:20 }} />
              <Badge text="🟢 Node.js" color="#4ADE80" delay={1.8} style={{ bottom:"5%",  right:"-12%", zIndex:20 }} />
            </div>
          </Tilt>

          {/* Live Terminal */}
          <motion.div
            style={{ width:"100%" }}
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay:1.4, duration:0.7 }}
          >
            <MiniTerminal />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ─── Stats strip ─── */}
      <motion.div
        className="apex-stats-strip"
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ delay:1.8, duration:0.7 }}
      >
        {STATS.map((s, i) => (
          <motion.div
            key={s.label}
            className="apex-stat"
            initial={{ opacity:0, y:14 }}
            animate={{ opacity:1, y:0 }}
            transition={{ delay: 1.9 + i * 0.1 }}
          >
            <div className="apex-stat-value">
              <Counter target={s.value} suffix={s.suffix} />
            </div>
            <div className="apex-stat-label">{s.label}</div>
            <div className="apex-stat-sub">{s.sub}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="apex-scroll-indicator"
        initial={{ opacity:0 }}
        animate={{ opacity:1 }}
        transition={{ delay:2.4 }}
      >
        <span>scroll</span>
        <div className="apex-scroll-mouse">
          <motion.div
            className="apex-scroll-dot"
            animate={{ y:[0,10,0], opacity:[1,0.3,1] }}
            transition={{ repeat:Infinity, duration:1.6 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
