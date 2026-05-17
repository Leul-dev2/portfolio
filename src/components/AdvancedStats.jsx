import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";

export const AnimatedCounter = ({
  value,
  suffix = "",
  prefix = "",
  duration = 2000,
  className = "",
  size = "large"
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { duration: duration });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
    return unsubscribe;
  }, [springValue]);

  const sizeClasses = {
    small: "text-2xl",
    medium: "text-4xl",
    large: "text-6xl",
    xl: "text-8xl"
  };

  return (
    <motion.div
      ref={ref}
      className={`font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent ${sizeClasses[size]} ${className}`}
      initial={{ scale: 0.5, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      {prefix}{displayValue.toLocaleString()}{suffix}
    </motion.div>
  );
};

export const StatsCard3D = ({ stat, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.23, 1, 0.32, 1]
      }}
      whileHover={{
        scale: 1.05,
        rotateY: 5,
        rotateX: -5,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center hover:border-pink-500/30 transition-all duration-300 transform-gpu min-h-[200px] flex flex-col justify-center">
        {/* Animated counter */}
        <AnimatedCounter
          value={stat.value}
          suffix={stat.suffix}
          size="xl"
          className="mb-4"
        />

        {/* Label */}
        <motion.h3
          className="text-white font-semibold text-lg mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: index * 0.2 + 0.3 }}
        >
          {stat.label}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="text-gray-400 text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 10 }}
          transition={{ delay: index * 0.2 + 0.5 }}
        >
          {stat.description || "Achievement unlocked"}
        </motion.p>

        {/* Progress indicator */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-b-2xl"
          initial={{ width: 0 }}
          animate={{ width: isInView ? "100%" : "0%" }}
          transition={{ duration: 2, delay: index * 0.2 + 0.8 }}
        />
      </div>

      {/* Hover effects */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-violet-500/10 rounded-2xl blur-xl"
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ zIndex: -1 }}
      />

      {/* Floating particles */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
          {Array.from({ length: 12 }, (_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-500 rounded-full"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 60}%`,
              }}
              animate={{
                scale: [0, 1, 0],
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

export const LiveStatsCounter = ({ stats }) => {
  const [currentStats, setCurrentStats] = useState(stats.map(() => 0));
  const intervalRef = useRef(null);

  useEffect(() => {
    const incrementStats = () => {
      setCurrentStats(prevStats =>
        prevStats.map((current, index) => {
          const target = stats[index].value;
          const increment = Math.ceil(target / 100);
          return Math.min(current + increment, target);
        })
      );
    };

    intervalRef.current = setInterval(incrementStats, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [stats]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
          className="text-center"
        >
          <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent mb-2">
            {currentStats[index].toLocaleString()}{stat.suffix}
          </div>
          <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

export default { AnimatedCounter, StatsCard3D, LiveStatsCounter };