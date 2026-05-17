import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SkillBar({ name, level, color = "from-pink-500 to-purple-500", delay = 0 }) {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  /* Support both Tailwind gradient strings (legacy) and CSS gradient strings (new) */
  const isGrad = color.startsWith("linear-gradient") || color.startsWith("from-");
  const background = color.startsWith("linear-gradient")
    ? color
    : "linear-gradient(90deg, var(--c-primary), #00D4FF)";

  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 7 }}>
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 13.5, fontWeight: 500, color: "var(--c-text)" }}>{name}</span>
        <span style={{ fontFamily: "var(--f-mono)", fontSize: 11, color: "var(--c-primary)" }}>{level}%</span>
      </div>
      <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, delay, ease: [0.23, 1, 0.32, 1] }}
          style={{ height: "100%", borderRadius: 2, background }}
        />
      </div>
    </div>
  );
}
