import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const AmbientLight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Main ambient light */}
      <motion.div
        className="fixed pointer-events-none z-0"
        style={{
          left: springX,
          top: springY,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-96 h-96 bg-gradient-radial from-pink-500/10 via-violet-500/5 to-transparent rounded-full blur-3xl" />
      </motion.div>

      {/* Secondary lights */}
      <motion.div
        className="fixed pointer-events-none z-0"
        style={{
          left: springX,
          top: springY,
          transform: "translate(-30%, -70%)",
        }}
      >
        <div className="w-64 h-64 bg-gradient-radial from-cyan-500/8 to-transparent rounded-full blur-2xl" />
      </motion.div>

      {/* Accent lights */}
      <motion.div
        className="fixed pointer-events-none z-0"
        style={{
          left: springX,
          top: springY,
          transform: "translate(-70%, -30%)",
        }}
      >
        <div className="w-48 h-48 bg-gradient-radial from-yellow-500/6 to-transparent rounded-full blur-xl" />
      </motion.div>
    </>
  );
};

export const FloatingParticles = ({ count = 50 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 1,
    speed: Math.random() * 2 + 0.5,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-gradient-to-r from-pink-500/30 to-violet-500/30"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [particle.opacity, particle.opacity * 0.3, particle.opacity],
          }}
          transition={{
            duration: particle.speed * 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

export const InteractiveParticles = () => {
  const canvasRef = useRef(null);
  const [particles, setParticles] = useState([]);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Create particles
    const particleCount = 100;
    const newParticles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      color: `hsl(${Math.random() * 60 + 300}, 70%, 60%)`,
      life: Math.random() * 100 + 50,
    }));

    setParticles(newParticles);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      newParticles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        // Mouse interaction
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.5;
          particle.vy += (dy / distance) * force * 0.5;
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.life / 150;
        ctx.fill();

        // Update life
        particle.life -= 0.5;
        if (particle.life <= 0) {
          particle.life = 100;
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [mouse]);

  const handleMouseMove = (e) => {
    setMouse({ x: e.clientX, y: e.clientY });
  };

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      onMouseMove={handleMouseMove}
      style={{ background: "transparent" }}
    />
  );
};

export default { AmbientLight, FloatingParticles, InteractiveParticles };