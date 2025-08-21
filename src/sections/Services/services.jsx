import { motion, useScroll, useTransform } from "framer-motion";
import { FaCode, FaCogs, FaRobot, FaArrowUp } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import Tilt from "react-parallax-tilt";

export const services = [
  {
    icon: (
      <FaCode
        size={32}
        className="text-pink-500 group-hover:animate-pulse"
        aria-hidden="true"
      />
    ),
    title: "Web Development",
    description:
      "I craft pixel-perfect websites and dynamic frontend experiences that are blazing fast and SEO-friendly.",
  },
  {
    icon: (
      <FaCogs
        size={32}
        className="text-pink-500 group-hover:animate-spin"
        aria-hidden="true"
      />
    ),
    title: "Software Development",
    description:
      "Full-stack solutions using the MERN stack — REST APIs, databases, admin panels, and dashboards that scale.",
  },
  {
    icon: (
      <FaRobot
        size={32}
        className="text-pink-500 group-hover:animate-bounce"
        aria-hidden="true"
      />
    ),
    title: "Cross-platform Development",
    description:
      "One codebase for all screens — beautiful, performant Flutter apps for iOS, Android, and Web.",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 100 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
      duration: 0.8,
    },
  },
};

export default function Services() {
  const [showButton, setShowButton] = useState(false);
  const timeoutRef = useRef(null);
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

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
      className="relative min-h-screen bg-[#0c1221] text-white px-6 py-20 overflow-hidden"
    >
      {/* Background Gradients with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40"
        style={{ y: y1 }}
      >
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-blue-500 rounded-full blur-3xl"
          animate={{ x: ["-10%", "10%", "-10%"], y: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-teal-500 rounded-full blur-3xl"
          animate={{ x: ["-10%", "10%", "-10%"], y: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
        />
      </motion.div>

      {/* Floating Orb with Parallax */}
      <motion.div
        className="absolute w-40 h-40 md:w-60 md:h-60 rounded-full bg-pink-500 opacity-30 blur-3xl z-0"
        animate={{
          x: ["10%", "50%", "10%"],
          y: ["-20%", "20%", "-20%"],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ top: "30%", left: "5%", y: y2 }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-pink-500 text-sm font-semibold mb-2 uppercase tracking-wide"
        >
          FEATURES
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-12 relative inline-block text-white group"
        >
          What I Do
          <span className="block absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
        </motion.h1>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div variants={item} key={index}>
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.4}
                glareColor="#ffffff"
                glarePosition="all"
                scale={1.05}
                transitionSpeed={2000}
                className="group relative p-8 rounded-2xl border border-white/10 transition-all duration-300 shadow-lg hover:shadow-2xl hover:border-pink-500/50 hover:bg-white/5 backdrop-blur-lg cursor-pointer interactive"
                aria-labelledby={`service-${index}-title`}
              >
                {/* Glowing border effect on hover */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(45deg, #a855f7, #ec4899, #fcd34d)",
                    mask: "linear-gradient(#000, #000) content-box, linear-gradient(#000, #000)",
                    WebkitMaskComposite: "exclude",
                    maskComposite: "exclude",
                  }}
                />
                <div className="mb-4 relative z-10">
                  <motion.div
                    className="w-16 h-16 rounded-full flex items-center justify-center bg-white/10"
                    animate={{
                      boxShadow: ["0 0 5px 0px rgba(255, 255, 255, 0.4)", "0 0 10px 5px rgba(255, 255, 255, 0.6)"],
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                  >
                    {service.icon}
                  </motion.div>
                </div>
                <h3
                  id={`service-${index}-title`}
                  className="text-2xl font-bold mb-2 text-white relative z-10"
                >
                  {service.title}
                </h3>
                <p className="text-gray-300 leading-relaxed relative z-10">{service.description}</p>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {showButton && (
        <motion.button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
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
    </section>
  );
}