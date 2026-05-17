import { useEffect, useRef } from "react";

export default function Cursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: 0, y: 0 });
  const ring    = useRef({ x: 0, y: 0 });
  const raf     = useRef(null);

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("pointermove", onMove);

    const tick = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.13;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.13;

      if (dotRef.current) {
        dotRef.current.style.left = mouse.current.x + "px";
        dotRef.current.style.top  = mouse.current.y + "px";
      }
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + "px";
        ringRef.current.style.top  = ring.current.y + "px";
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    // Grow ring on interactive elements
    const grow = () => ringRef.current && (ringRef.current.style.transform = "translate(-50%,-50%) scale(2.2)");
    const shrink = () => ringRef.current && (ringRef.current.style.transform = "translate(-50%,-50%) scale(1)");
    document.querySelectorAll("a,button,[role=button]").forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="apex-cursor-dot"  style={{ pointerEvents:"none", transition:"width .15s,height .15s" }} />
      <div ref={ringRef} className="apex-cursor-ring" style={{ transition:"transform .3s cubic-bezier(.23,1,.32,1), border-color .3s" }} />
    </>
  );
}
