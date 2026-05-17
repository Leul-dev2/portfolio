import { motion } from "framer-motion";

export default function GradientBlob({ color1, color2 }) {
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
      <motion.div
        animate={{ x:[0,40,0], y:[0,60,0], scale:[1,1.15,1] }}
        transition={{ duration:20, repeat:Infinity, ease:"easeInOut" }}
        style={{ position:"absolute", top:"-20%", left:"-10%", width:"60%", height:"60%", background:"radial-gradient(circle, rgba(0,255,178,0.08) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(80px)" }}
      />
      <motion.div
        animate={{ x:[0,-40,0], y:[0,-60,0], scale:[1.1,1,1.1] }}
        transition={{ duration:17, repeat:Infinity, ease:"easeInOut" }}
        style={{ position:"absolute", bottom:"-20%", right:"-10%", width:"50%", height:"50%", background:"radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(80px)" }}
      />
      <motion.div
        animate={{ x:[0,-30,30,0], y:[0,40,-20,0] }}
        transition={{ duration:25, repeat:Infinity, ease:"easeInOut" }}
        style={{ position:"absolute", top:"30%", right:"20%", width:"30%", height:"30%", background:"radial-gradient(circle, rgba(0,212,255,0.05) 0%, transparent 70%)", borderRadius:"50%", filter:"blur(60px)" }}
      />
    </div>
  );
}
