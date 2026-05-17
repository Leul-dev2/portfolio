import { useEffect, useRef } from "react";
export default function ScrollProgress() {
  const barRef = useRef(null);
  useEffect(() => {
    const fn = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      if (barRef.current) barRef.current.style.width = (pct * 100) + "%";
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return <div ref={barRef} className="apex-scroll-progress" style={{ width:0 }} />;
}
