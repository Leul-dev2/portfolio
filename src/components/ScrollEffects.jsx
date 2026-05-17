import React from "react";
import { motion } from "framer-motion";

export const SectionDivider = ({ color = "pink" }) => {
  const colors = {
    pink: { from: "from-pink-500", to: "to-violet-500" },
    violet: { from: "from-violet-500", to: "to-cyan-500" },
    cyan: { from: "from-cyan-500", to: "to-pink-500" },
  };

  const selectedColor = colors[color] || colors.pink;

  return (
    <div className="relative h-32 flex items-center justify-center overflow-hidden">
      {/* Animated line */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${selectedColor.from} ${selectedColor.to} opacity-5 blur-3xl`}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Decorative elements */}
      <div className="relative z-10 flex items-center justify-center gap-8">
        <motion.div
          className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="w-1 h-12 bg-gradient-to-b from-pink-500/50 to-transparent"
          animate={{ height: [48, 64, 48] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.1 }}
        />
        <motion.div
          className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-pink-500"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        />
      </div>
    </div>
  );
};

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={scrollToTop}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition-shadow"
        >
          <motion.span
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ↑
          </motion.span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export const RevealOnScroll = ({ children, delay = 0 }) => {
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["0 1", "1.33 1"],
  });

  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={ref}
      style={{
        scale: scaleProgress,
        opacity: opacityProgress,
      }}
    >
      {children}
    </motion.div>
  );
};

import { useScroll, useTransform, AnimatePresence } from "framer-motion";

export default { SectionDivider, ScrollToTopButton, RevealOnScroll };