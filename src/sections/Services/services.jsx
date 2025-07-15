import { motion } from "framer-motion";
import { FaCode, FaCogs, FaRobot, FaArrowUp } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";

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
      staggerChildren: 0.25,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function Services() {
  const [showButton, setShowButton] = useState(false);
  const timeoutRef = useRef(null);

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
      className="relative min-h-screen bg-[#0c1221] text-white px-6 py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-pink-500 text-sm font-semibold mb-2 uppercase tracking-wide"
        >
          FEATURES
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-4xl md:text-5xl font-bold mb-12 relative inline-block after:block after:absolute after:bottom-0 after:left-0 after:h-1 after:w-full after:bg-gradient-to-r after:from-pink-500 after:to-purple-500 after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100"
        >
          What I Do
        </motion.h1>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.article
              key={index}
              variants={item}
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-[#001a4d]/50 backdrop-blur-lg p-6 rounded-2xl border border-pink-500/30 transition-all duration-300 shadow-lg hover:shadow-pink-500/30"
              aria-labelledby={`service-${index}-title`}
            >
              <div className="mb-4">{service.icon}</div>
              <h3
                id={`service-${index}-title`}
                className="text-xl font-bold mb-2"
              >
                {service.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{service.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {showButton && (
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="fixed bottom-6 right-6 bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-full shadow-xl z-50 focus:outline-none focus:ring-4 focus:ring-pink-400 transition-all duration-300 animate-bounce"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={18} />
        </button>
      )}
    </section>
  );
}
