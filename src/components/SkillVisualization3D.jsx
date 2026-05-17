import React, { useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

export const SkillSphere3D = ({ skill, level, color, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    x.set(mouseX / rect.width);
    y.set(mouseY / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
      animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      <div className="w-32 h-32 relative">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10" />

        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            className="text-gray-700"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke={`url(#gradient-${index})`}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: isInView ? level / 100 : 0 }}
            transition={{ duration: 2, delay: index * 0.1 + 0.5 }}
            className="drop-shadow-lg"
          />
          <defs>
            <linearGradient id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color.split(' ')[0].replace('from-', '')} />
              <stop offset="100%" stopColor={color.split(' ')[2].replace('to-', '')} />
            </linearGradient>
          </defs>
        </svg>

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: isInView ? 1 : 0 }}
            transition={{ delay: index * 0.1 + 1, duration: 0.5 }}
            className="text-2xl font-bold text-white mb-1"
          >
            {level}%
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
            transition={{ delay: index * 0.1 + 1.2, duration: 0.5 }}
            className="text-xs text-gray-400 font-medium px-2"
          >
            {skill}
          </motion.div>
        </div>

        {/* Hover effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500/20 to-violet-500/20 blur-xl"
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Floating particles on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-500 rounded-full"
              style={{
                left: '50%',
                top: '50%',
              }}
              animate={{
                x: Math.cos((i / 8) * Math.PI * 2) * 60,
                y: Math.sin((i / 8) * Math.PI * 2) * 60,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export const SkillBar3D = ({ skill, level, color, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-6"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-white font-medium">{skill}</span>
        <span className="text-pink-400 font-mono text-sm">{level}%</span>
      </div>

      <div className="relative h-3 bg-gray-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={{ width: isInView ? `${level}%` : 0 }}
          transition={{ duration: 2, delay: index * 0.1 + 0.3, ease: "easeOut" }}
        >
          {/* Animated shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-sm"
          animate={{ opacity: isInView ? 0.5 : 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export const TechStack3D = ({ technologies }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {technologies.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{
            duration: 0.8,
            delay: index * 0.1,
            ease: [0.23, 1, 0.32, 1]
          }}
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            rotateX: 5,
          }}
          className="group relative"
        >
          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center hover:border-pink-500/30 transition-all duration-300 transform-gpu">
            <motion.div
              className="text-3xl mb-2"
              style={{ color: tech.color }}
              whileHover={{ scale: 1.1 }}
            >
              {tech.icon || tech.name.charAt(0)}
            </motion.div>
            <div className="text-white font-medium text-sm">{tech.name}</div>
          </div>

          {/* Hover glow */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-violet-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ zIndex: -1 }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default { SkillSphere3D, SkillBar3D, TechStack3D };