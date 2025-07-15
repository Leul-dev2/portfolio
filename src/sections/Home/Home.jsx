import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Lottie from "lottie-react";
import robotAnimation from "../../assets/AI Robot.json"; // ✅ update path!
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const navLinks = ["Home", "About", "Projects", "Contact"];

const socialIcons = [
  { Icon: FaGithub, url: "https://github.com" },
  { Icon: FaLinkedin, url: "https://linkedin.com" },
  { Icon: FaEnvelope, url: "mailto:you@example.com" },
];

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("Home");

  const particlesInit = useCallback(async (main) => {
    await loadFull(main);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const handleNavClick = (e, link) => {
    e.preventDefault();
    setActiveLink(link);
    setMenuOpen(false);
    const target = document.getElementById(link.toLowerCase());
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen bg-[#0c1221] text-white overflow-hidden"
    >
      {/* Particles */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          detectRetina: true,
          interactivity: {
            events: { onHover: { enable: true, mode: "repulse" } },
            modes: { repulse: { distance: 100 } },
          },
          particles: {
            color: { value: "#ffffff" },
            links: { enable: true, color: "#aaa", distance: 140 },
            move: { enable: true, speed: 1 },
            number: { density: { enable: true, area: 800 }, value: 50 },
            opacity: { value: 0.15 },
            size: { value: { min: 1, max: 3 } },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Animated Blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob"></div>
      <div className="absolute top-40 right-40 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-blob animation-delay-2000"></div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-transparent backdrop-blur-lg"
      >
        <motion.h1
          className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-yellow-400 cursor-pointer"
          whileHover={{ scale: 1.05 }}
        >
          Leul.dev ⚡
        </motion.h1>

        <div className="hidden md:flex gap-10 text-lg font-medium text-gray-300">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={(e) => handleNavClick(e, link)}
              className={`relative transition duration-300 hover:text-white ${
                activeLink === link ? "text-white" : ""
              }`}
            >
              {link}
              {activeLink === link && (
                <motion.span
                  layoutId="underline"
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 rounded"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          className="md:hidden text-3xl text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-4/5 max-w-xs h-full bg-[#0c1221] backdrop-blur-lg border-l border-gray-700 z-50 px-8 py-16 space-y-10"
          >
            {navLinks.map((link) => (
              <motion.button
                key={link}
                onClick={(e) => handleNavClick(e, link)}
                className={`block w-full text-left text-2xl font-semibold px-4 py-2 rounded transition-colors ${
                  activeLink === link
                    ? "text-white bg-pink-600/20"
                    : "text-gray-300 hover:bg-white/10"
                }`}
              >
                {link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center max-w-7xl px-6 md:px-12 py-28 mx-auto gap-16">
        {/* Hero Text */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 80 }}
          className="flex-1"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400 text-transparent bg-clip-text">
            Hey! I’m <br />
            <span className="underline decoration-yellow-400">Leul</span>{" "}
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              👋
            </motion.span>
          </h1>
          <p className="mt-6 text-2xl text-gray-200 max-w-xl font-medium">
            🚀 Flutter + MERN Stack Pro — I craft magical UIs that impress.
          </p>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "Contact")}
            className="inline-block mt-10 px-12 py-5 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 text-black text-xl font-bold rounded-full shadow-lg hover:scale-105 transition-transform"
          >
            Let’s Connect ⚡
          </a>
          <div className="flex mt-12 space-x-6">
            {socialIcons.map(({ Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl bg-white/10 p-3 rounded-full hover:bg-white/20 transition"
              >
                <Icon />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Hero Lottie */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex-1 flex justify-center"
        >
          <Tilt glareEnable glareMaxOpacity={0.3} scale={1.05} className="max-w-md w-full">
            <Lottie
              animationData={robotAnimation}
              loop
              autoplay
              className="w-full h-auto"
            />
          </Tilt>
        </motion.div>
      </div>
    </section>
  );
};

export default Home;
