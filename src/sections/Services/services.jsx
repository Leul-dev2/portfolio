import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaCode, FaLaptopCode, FaRocket, FaMobileAlt, FaDatabase, FaArrowUp } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import Tilt from "react-parallax-tilt";

// Service data with enhanced details
export const services = [
  {
    icon: <FaLaptopCode size={32} className="text-cyan-400 group-hover:scale-125 transition-transform duration-500" />,
    title: "MERN Stack Development",
    description: "Architecting robust and scalable full-stack applications with MongoDB, Express, React, and Node.js. Crafting RESTful APIs and dynamic dashboards.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    color: "from-blue-600 to-cyan-500"
  },
  {
    icon: <FaMobileAlt size={32} className="text-fuchsia-400 group-hover:scale-125 transition-transform duration-500" />,
    title: "Cross-Platform Apps",
    description: "Building beautiful, native-like mobile and web applications from a single codebase using the power of Flutter and Dart. Fast, flexible, and feature-rich.",
    tags: ["Flutter", "Dart", "iOS", "Android"],
    color: "from-purple-600 to-fuchsia-500"
  },
  {
    icon: <FaDatabase size={32} className="text-emerald-400 group-hover:scale-125 transition-transform duration-500" />,
    title: "Database Management & APIs",
    description: "Designing and optimizing database schemas, ensuring data integrity, and building high-performance APIs for seamless frontend-backend communication.",
    tags: ["REST APIs", "GraphQL", "SQL", "NoSQL"],
    color: "from-green-600 to-emerald-500"
  },
];

// Animation variants for the card reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const ServiceCard = ({ service }) => {
  return (
    <motion.div
      variants={cardVariants}
      className="p-1 rounded-2xl relative overflow-hidden group hover:scale-[1.03] transition-transform duration-500"
    >
      <div className={`absolute inset-0 z-0 bg-gradient-to-br ${service.color} opacity-20 group-hover:opacity-60 transition-opacity duration-700 blur-2xl`} />
      <div className="relative z-10 p-8 bg-black/50 backdrop-blur-md rounded-xl border border-white/5 transition-all duration-300">
        <motion.div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-white/20 relative before:absolute before:inset-0 before:rounded-full before:bg-white/20 before:animate-ping-slow"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        >
          {service.icon}
        </motion.div>
        <h3 className="text-3xl font-bold mb-2 text-white">{service.title}</h3>
        <p className="text-gray-300 leading-relaxed text-lg">{service.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {service.tags.map((tag, i) => (
            <span key={i} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/70 font-mono border border-white/10">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default function ServicesSection() {
  const [showButton, setShowButton] = useState(false);
  const timeoutRef = useRef(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };

    const debounce = (func, wait = 100) => {
      return () => {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(func, wait);
      };
    };

    const debouncedScroll = debounce(handleScroll);
    window.addEventListener("scroll", debouncedScroll);

    return () => window.removeEventListener("scroll", debouncedScroll);
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white px-4 md:px-6 py-20 overflow-hidden"
    >
      {/* Dynamic Background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        style={{ y: y }}
      >
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950 to-transparent"
          style={{ opacity: opacity }}
        />
        {/* Animated Code Grid */}
        <div className="absolute inset-0 z-0 opacity-50 [mask-image:radial-gradient(transparent,black)]">
          <div className="w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat-space" />
          <motion.div
            className="absolute inset-0 bg-[conic-gradient(from_270deg_at_bottom_center,_var(--tw-gradient-stops))] from-transparent via-blue-500/50 to-transparent animate-spin-slow-reverse"
            style={{ y: useTransform(scrollYProgress, [0, 1], ["100%", "0%"]) }}
          />
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-pink-500 text-lg font-semibold uppercase tracking-widest mb-2"
        >
          My Expertise
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-extrabold mb-12 relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"
        >
          Digital Alchemy
          <span className="block absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
        </motion.h1>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16"
        >
          {services.map((service, index) => (
            <Tilt
              key={index}
              options={{ max: 10, scale: 1.05, speed: 1000, glare: true, 'max-glare': 0.4 }}
              className="interactive"
            >
              <ServiceCard service={service} />
            </Tilt>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {showButton && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-6 right-6 bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-full shadow-xl z-50 focus:outline-none focus:ring-4 focus:ring-pink-400 transition-all duration-300 animate-bounce interactive"
            aria-label="Scroll to top"
          >
            <FaArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </section>
  );
}