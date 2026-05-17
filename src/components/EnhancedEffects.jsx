import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const FloatingOrbs = ({ count = 6, colors = ["pink", "violet", "cyan"] }) => {
  const [orbs, setOrbs] = useState([]);

  useEffect(() => {
    const newOrbs = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      duration: Math.random() * 20 + 20,
      delay: Math.random() * 5,
    }));
    setOrbs(newOrbs);
  }, [count, colors]);

  const colorClasses = {
    pink: "bg-pink-500/20",
    violet: "bg-violet-500/20",
    cyan: "bg-cyan-500/20",
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full blur-3xl ${colorClasses[orb.color]}`}
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.x}%`,
            top: `${orb.y}%`,
          }}
          animate={{
            x: [0, Math.random() * 200 - 100, 0],
            y: [0, Math.random() * 200 - 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
};

export const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  if (!isHovering) return null;

  return (
    <motion.div
      className="fixed pointer-events-none z-0 w-80 h-80"
      style={{
        left: mousePosition.x - 160,
        top: mousePosition.y - 160,
      }}
    >
      <div className="absolute inset-0 bg-gradient-radial from-pink-500/30 via-violet-500/20 to-transparent rounded-full blur-3xl" />
    </motion.div>
  );
};

export const CodeBlock = ({ code, language = "javascript" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="glass rounded-xl p-4 border border-white/10 overflow-x-auto"
    >
      <pre className={`language-${language} text-xs md:text-sm text-gray-300`}>
        <code>{code}</code>
      </pre>
    </motion.div>
  );
};

export const FeatureGrid = ({ features }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20, rotateY: -20 }}
          whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05, rotateY: 5 }}
          className="group glass rounded-xl p-6 border border-white/5 hover:border-pink-500/20 transition-all duration-300"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="text-3xl mb-3">{feature.icon}</div>
          <h3 className="text-lg font-bold mb-2 group-hover:text-pink-400 transition-colors">
            {feature.title}
          </h3>
          <p className="text-gray-400 text-sm">{feature.description}</p>

          {/* Hover border animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-violet-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
            style={{ zIndex: -1 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default { FloatingOrbs, CursorGlow, CodeBlock, FeatureGrid };