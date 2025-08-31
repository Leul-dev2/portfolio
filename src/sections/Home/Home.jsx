import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Tilt from "react-parallax-tilt";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { FaGithub, FaLinkedin, FaEnvelope, FaBars, FaTimes, FaRocket, FaCode, FaBrain, FaMagic } from "react-icons/fa";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import Typed from "typed.js";

// FIXED: Using an array of objects for robust navigation
const navLinks = [
  { title: "Home", id: "home" },
  { title: "About", id: "about" },
  { title: "Services", id: "services" },
  { title: "Projects", id: "projects" },
  { title: "Article", id: "blog" },
  { title: "Contact", id: "contact" },
];

const socialIcons = [
  { Icon: FaGithub, url: "https://github.com/leul-dev2" },
  { Icon: FaLinkedin, url: "https://www.linkedin.com/in/leul-seyoum/" },
  { Icon: FaEnvelope, url: "mailto:leulsegedseyoum@gmail.com" }, // TODO: Update with your email
];

const skillSet = [
  { name: "Flutter", level: 90, icon: FaRocket, color: "from-blue-400 to-blue-600" },
  { name: "React", level: 85, icon: FaCode, color: "from-cyan-400 to-cyan-600" },
  { name: "Node.js", level: 80, icon: FaBrain, color: "from-green-400 to-green-600" },
  { name: "UI/UX", level: 95, icon: FaMagic, color: "from-purple-400 to-purple-600" },
];

// REFACTORED: Secure and declarative SVG animation component
const AnimatedStar = () => {
  const starPath = "M256 32L318.6 170.3L472 180.9L354 289.3L387.7 442L256 364.3L124.3 442L158 289.3L40 180.9L193.4 170.3L256 32Z";

  return (
    <svg 
      viewBox="0 0 512 512" 
      fill="transparent" 
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto"
    >
      <defs>
        <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="50%" stopColor="#EC4899" />
          <stop offset="100%" stopColor="#A855F7" />
        </linearGradient>
      </defs>
      <motion.path
        d={starPath}
        stroke="url(#gradient-line)"
        strokeWidth="10"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 4, ease: "easeInOut" }}
      />
    </svg>
  );
};

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const audioRef = useRef(null);
  const typedElement = useRef(null);
  const cursorRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const particlesInit = useCallback(async (main) => {
    await loadFull(main);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";

    const typed = new Typed(typedElement.current, {
      strings: ["Flutter Developer", "MERN Stack Pro", "UI/UX Enthusiast", "Problem Solver"],
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      cursorChar: "|",
    });

    const handleOutsideClick = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && menuOpen) {
        setMenuOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleOutsideClick);
    
    return () => {
      typed.destroy();
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [menuOpen]);

  // REFACTORED: Simplified cursor animation effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleAudio = () => {
    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setActiveLink(id);
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const CustomCursor = () => (
    <motion.div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[99] hidden md:block rounded-full transition-all duration-300 ease-out mix-blend-difference ${
        isHovering ? "w-10 h-10 bg-white/50" : "w-8 h-8 bg-white/20"
      }`}
      style={{ left: "-20px", top: "-20px" }}
      animate={{ scale: isHovering ? 1.5 : 1 }}
    />
  );

  const AnimatedSphere = () => (
    <Canvas className="absolute top-0 right-0 w-full h-full">
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={3} />
      <ambientLight intensity={0.5} />
      <pointLight position={[-2, 5, 2]} intensity={2} />
      <Sphere args={[1, 100, 200]} scale={2.2}>
        <MeshDistortMaterial
          color="#8A2BE2"
          attach="material"
          distort={0.5}
          speed={2}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
    </Canvas>
  );

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="home" className="relative min-h-screen bg-[#0c1221] text-white overflow-hidden pt-24 md:pt-0">
      <audio ref={audioRef} loop src="/ambient-space.mp3" />
      <CustomCursor />
      <button
        onClick={toggleAudio}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-purple-600/30 backdrop-blur-md flex items-center justify-center text-white border border-white/20 hover:bg-purple-600/50 transition-all"
        aria-label="Toggle ambient sound"
      >
        {audioPlaying ? "🔇" : "🔊"}
      </button>

      <div className="absolute inset-0 z-0 opacity-40">
        <motion.div
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-pink-500 rounded-full blur-3xl"
          animate={{ x: ["-10%", "10%", "-10%"], y: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-500 rounded-full blur-3xl"
          animate={{ x: ["-10%", "10%", "-10%"], y: ["-10%", "10%", "-10%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
        />
      </div>

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 120,
          detectRetina: true,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "bubble" },
              onClick: { enable: true, mode: "repulse" },
            },
            modes: {
              bubble: { distance: 100, size: 5, duration: 2, opacity: 0.8 },
              repulse: { distance: 150, duration: 0.4 },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              enable: true,
              color: "#aaa",
              distance: 140,
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 2,
              direction: "none",
              random: true,
              straight: false,
              outModes: "out",
            },
            number: { density: { enable: true, area: 800 }, value: 80 },
            opacity: { value: { min: 0.1, max: 0.3 } },
            size: { value: { min: 1, max: 3 } },
            shape: { type: ["circle", "square", "triangle"] },
          },
        }}
        className="absolute inset-0 z-0"
      />

      <div className="absolute w-64 h-64 md:w-96 md:h-96 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
        <AnimatedSphere />
      </div>

      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-[#0c1221]/80 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 py-5 max-w-7xl mx-auto">
          <motion.div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#home" onClick={(e) => handleNavClick(e, "home")} className="text-3xl font-extrabold tracking-wide cursor-pointer relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-pink-500 to-yellow-400">
                Leul.dev
              </span>
            </a>
          </motion.div>
          <div className="hidden md:flex gap-10 text-lg font-medium text-gray-300">
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className={`group relative transition duration-300 hover:text-white ${
                  activeLink === link.id ? "text-white" : ""
                }`}
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
              >
                {link.title}
                {activeLink === link.id && (
                  <motion.span
                    layoutId="underline"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-gradient-to-r from-pink-500 to-purple-500"
                  />
                )}
              </motion.a>
            ))}
          </div>
          <motion.button
            className="md:hidden text-2xl text-white bg-white/10 p-3 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 w-full max-w-xs h-full bg-[#0c1221]/95 backdrop-blur-2xl border-l border-white/10 z-[60] px-8 py-16"
          >
            <div className="flex flex-col gap-4 mt-16">
              {navLinks.map((link) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`block w-full text-left text-xl font-bold px-4 py-2 rounded-xl transition-all ${
                    activeLink === link.id
                      ? "bg-gradient-to-r from-pink-600/40 to-purple-600/40 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.title}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center min-h-screen max-w-7xl px-6 md:px-12 mx-auto gap-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="flex-1 text-center md:text-left"
        >
          <motion.h1
            variants={wordVariants}
            className="text-4xl md:text-6xl font-extrabold leading-tight text-white"
          >
            Hey! I'm{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-yellow-400">
              Leul
            </span>
            <motion.span
              className="inline-block"
              animate={{ rotate: [0, 20, -20, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 1 }}
            >
              👋
            </motion.span>
          </motion.h1>

          <div className="mt-6 h-12">
            <span className="text-xl text-gray-200 font-medium md:text-2xl">I'm a </span>
            <span ref={typedElement} className="text-xl text-yellow-400 font-bold md:text-2xl" />
          </div>

          <motion.p 
            variants={wordVariants}
            className="mt-6 text-base text-gray-200 md:text-lg max-w-xl mx-auto md:mx-0 font-medium"
          >
            Crafting immersive digital experiences with cutting-edge technology and innovative design.
          </motion.p>
          
          <motion.div variants={wordVariants}>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "contact")}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              className="inline-block mt-10 px-8 py-3 bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 text-black text-lg font-bold rounded-full shadow-lg relative overflow-hidden group"
            >
              <span className="relative z-10">Let's Connect ⚡</span>
            </a>
          </motion.div>
          
          <motion.div variants={wordVariants} className="flex mt-8 space-x-5 justify-center md:justify-start">
            {socialIcons.map(({ Icon, url }, i) => (
              <motion.a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="text-2xl bg-white/10 p-3 rounded-full hover:bg-white/20 transition"
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex-1 flex justify-center items-center w-full max-w-xs md:max-w-md relative"
        >
          <Tilt
            tiltEnable={true}
            glareEnable={true}
            glareMaxOpacity={0.3}
            glareColor="#ffffff"
            glarePosition="all"
            scale={1.05}
            className="w-full h-auto"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity }}
            >
              <AnimatedStar />
            </motion.div>
          </Tilt>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-sm text-gray-400 mb-2">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1"
        >
          <motion.div
            className="w-1 h-2 bg-white rounded-full"
            animate={{ y: [0, 14, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Home;