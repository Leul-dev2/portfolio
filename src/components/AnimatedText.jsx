import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

export const AnimatedText = ({
  text,
  className = "",
  type = "words", // "words", "chars", "lines"
  delay = 0,
  duration = 0.8,
  stagger = 0.05,
  once = true
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setDisplayText(text);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, text, delay]);

  const renderAnimatedText = () => {
    if (!displayText) return null;

    switch (type) {
      case "chars":
        return displayText.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{
              duration,
              delay: index * stagger,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ));

      case "words":
        return displayText.split(" ").map((word, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration,
              delay: index * stagger,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="inline-block mr-1"
          >
            {word}
          </motion.span>
        ));

      case "lines":
        return displayText.split("\n").map((line, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration,
              delay: index * stagger,
              ease: [0.23, 1, 0.32, 1]
            }}
            className="block"
          >
            {line}
          </motion.div>
        ));

      default:
        return displayText;
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {renderAnimatedText()}
    </motion.div>
  );
};

export const HighlightedText = ({
  text,
  highlights = [],
  className = ""
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const renderHighlightedText = () => {
    if (!text) return null;

    let parts = [text];
    highlights.forEach(({ word, className: highlightClass }) => {
      parts = parts.flatMap(part => {
        if (typeof part === 'string') {
          const regex = new RegExp(`(${word})`, 'gi');
          const matches = part.split(regex);
          return matches.map(match =>
            match.toLowerCase() === word.toLowerCase()
              ? { text: match, highlight: true, className: highlightClass }
              : match
          );
        }
        return part;
      });
    });

    return parts.map((part, index) => {
      if (typeof part === 'object' && part.highlight) {
        return (
          <motion.span
            key={index}
            initial={{ backgroundSize: "0% 100%" }}
            animate={{ backgroundSize: isInView ? "100% 100%" : "0% 100%" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            className={`bg-gradient-to-r from-pink-500/20 to-violet-500/20 px-1 rounded ${part.className}`}
          >
            {part.text}
          </motion.span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
      transition={{ duration: 0.6 }}
    >
      {renderHighlightedText()}
    </motion.div>
  );
};

export const TypewriterText = ({
  texts,
  className = "",
  typeSpeed = 100,
  deleteSpeed = 50,
  delay = 2000
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const text = texts[currentTextIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (currentText.length < text.length) {
          setCurrentText(text.slice(0, currentText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      } else {
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, texts, typeSpeed, deleteSpeed, delay]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="text-pink-500"
      >
        |
      </motion.span>
    </span>
  );
};

export default AnimatedText;