import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback, useEffect, useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaStackOverflow } from "react-icons/fa";
import { MdEmail, MdLocationOn, MdPhone } from "react-icons/md";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";

// Framer Motion variants for a more dynamic and layered reveal
const parentVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
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

const ContactSection = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  // Updated particles options for a different feel
  const particlesOptions = {
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: {
        value: 0.5,
        random: true,
        anim: { enable: false },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false },
      },
      line_linked: {
        enable: false,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "top",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: { enable: false },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
      },
    },
  };

  const sectionRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Parallax effect on the entire section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      style={{ y }}
      className="relative min-h-screen bg-[#010101] text-white px-6 py-20 flex items-center justify-center overflow-hidden"
    >
      <Particles
        id="tsparticles-contact"
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0 z-0"
      />

      <div className="absolute inset-0 z-0 opacity-40">
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
      </div>

      <motion.div
        variants={parentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        onMouseMove={handleMouseMove}
        className="group relative z-10 max-w-6xl w-full flex flex-col lg:flex-row gap-12 bg-[#0c1221]/80 p-8 md:p-16 rounded-3xl shadow-2xl shadow-zinc-900/50 border border-white/10 backdrop-blur-xl transition-all duration-500"
      >
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                #64ffda80,
                transparent 80%
              )
            `,
          }}
        />

        <motion.div variants={childVariants} className="flex-1 relative z-10">
          <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
            Let’s Connect
          </h2>
          <p className="text-gray-400 mb-6 leading-relaxed">
            I’m a passionate <strong className="text-teal-400">Software Developer</strong> focused on building clean, intuitive, and performant user interfaces. Let's create something great together.
          </p>
          <form className="space-y-6">
            <motion.input
              variants={childVariants}
              type="text"
              placeholder="Your Name"
              className="w-full p-4 bg-[#111827] text-white rounded-xl border border-white/10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 focus:shadow-[0_0_10px_2px_#64ffda50]"
              required
            />
            <motion.input
              variants={childVariants}
              type="email"
              placeholder="Your Email"
              className="w-full p-4 bg-[#111827] text-white rounded-xl border border-white/10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 focus:shadow-[0_0_10px_2px_#64ffda50]"
              required
            />
            <motion.textarea
              variants={childVariants}
              placeholder="Your Message"
              rows="5"
              className="w-full p-4 bg-[#111827] text-white rounded-xl border border-white/10 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all duration-300 focus:shadow-[0_0_10px_2px_#64ffda50]"
              required
            ></motion.textarea>
            <motion.button
              variants={childVariants}
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-cyan-500 text-gray-900 rounded-full py-4 font-bold shadow-lg shadow-teal-400/20 transition-all duration-300 hover:scale-[1.01]"
            >
              Send Message <HiOutlineArrowNarrowRight />
            </motion.button>
          </form>
        </motion.div>

        <motion.div variants={childVariants} className="flex-1 lg:pl-12 lg:border-l lg:border-white/10 relative z-10">
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-8 text-gray-300">
              <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
                Get In Touch
              </h3>
              <p className="leading-relaxed">
                Whether you have a question, a project proposal, or just want to chat about tech, my inbox is always open. I'll get back to you as soon as I can.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <MdEmail size={28} className="text-teal-400" />
                  <a href="mailto:Leulseyoum103@gmail.com" className="hover:text-white transition-colors duration-300">
                    Leulseyoum103@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <MdPhone size={28} className="text-teal-400" />
                  <a href="tel:+251989905112" className="hover:text-white transition-colors duration-300">
                    +251 989 905 112
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <MdLocationOn size={28} className="text-teal-400" />
                  <span>Addis Ababa, Ethiopia</span>
                </div>
              </div>
            </div>
            <div className="flex gap-6 mt-10 text-3xl">
              <motion.a
                href="https://linkedin.com/in/leulseyoum"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 8px #64ffda)" }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-teal-400 transition-all duration-300"
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 8px #64ffda)" }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-teal-400 transition-all duration-300"
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://stackoverflow.com/users/your_id/leulseyoum"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 8px #64ffda)" }}
                whileTap={{ scale: 0.95 }}
                className="text-white hover:text-teal-400 transition-all duration-300"
              >
                <FaStackOverflow />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default ContactSection;