import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

export default function Counter({ target, suffix = "", prefix = "", duration = 2 }) {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-50px" });
  const motVal   = useMotionValue(0);
  const spring   = useSpring(motVal, { duration: duration * 1000, bounce: 0 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) motVal.set(target);
  }, [inView, target, motVal]);

  useEffect(() => {
    return spring.on("change", v => setDisplay(Math.round(v)));
  }, [spring]);

  return (
    <motion.span ref={ref} style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}{display}{suffix}
    </motion.span>
  );
}
