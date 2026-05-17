import { motion } from "framer-motion";

export default function SectionHeading({ tag, title, subtitle }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "clamp(2.5rem,5vw,4rem)" }}>
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "1rem" }}
      >
        <div style={{ width: 22, height: 1, background: "var(--c-primary)" }} />
        <span style={{
          fontFamily: "var(--f-mono)", fontSize: 11,
          letterSpacing: "0.12em", textTransform: "uppercase",
          color: "var(--c-primary)",
        }}>
          {tag}
        </span>
        <div style={{ width: 6, height: 1, background: "var(--c-primary)", opacity: 0.4 }} />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.65, delay: 0.1 }}
        style={{
          fontFamily: "var(--f-display)",
          fontSize: "clamp(1.9rem,4.5vw,3rem)",
          fontWeight: 800,
          lineHeight: 1.1,
          color: "var(--c-text)",
          marginBottom: subtitle ? "0.85rem" : 0,
        }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "clamp(0.9rem,1.6vw,1rem)",
            color: "var(--c-text-2)",
            maxWidth: 560,
            margin: "0 auto",
            lineHeight: 1.72,
          }}
        >
          {subtitle}
        </motion.p>
      )}

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.75, delay: 0.3 }}
        style={{
          marginTop: "1.25rem",
          width: 44, height: 3,
          borderRadius: 2,
          background: "linear-gradient(90deg, var(--c-primary), var(--c-secondary))",
          margin: "1.25rem auto 0",
          transformOrigin: "center",
        }}
      />
    </div>
  );
}
