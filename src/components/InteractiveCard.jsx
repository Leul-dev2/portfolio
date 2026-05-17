import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export const InteractiveCard = ({ children, className = "" }) => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePosition({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-2xl transition-all duration-300 ${className}`}
    >
      {/* Animated glow background */}
      {isHovering && (
        <motion.div
          className="absolute pointer-events-none"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            width: [0, 400],
            height: [0, 400],
            opacity: [0.8, 0],
          }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-full h-full bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-3xl" />
        </motion.div>
      )}

      {/* Border gradient */}
      {isHovering && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-2xl"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(236, 72, 153, 0.2), transparent 80%)`,
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default InteractiveCard;
