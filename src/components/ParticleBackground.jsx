import { useCallback, useMemo } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function ParticleBackground({ id, color = "#ec4899", density = 50, speed = 1 }) {
  const particlesInit = useCallback(async (engine) => await loadFull(engine), []);

  const options = useMemo(() => ({
    fullScreen: { enable: false },
    background: { color: { value: "transparent" } },
    particles: {
      number: { value: density, density: { enable: true, value_area: 800 } },
      color: { value: [color, "#8b5cf6", "#06b6d4"] },
      shape: { type: "circle" },
      opacity: { value: 0.4, random: true },
      size: { value: 2.5, random: true },
      links: { enable: true, distance: 140, color: "#ffffff", opacity: 0.08, width: 1 },
      move: { enable: true, speed, direction: "none", random: true, straight: false, outModes: "out" },
    },
    interactivity: {
      detectsOn: "canvas",
      events: {
        onHover: { enable: true, mode: "grab" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        grab: { distance: 180, links: { opacity: 0.15 } },
        push: { quantity: 3 },
      },
    },
  }), [color, density, speed]);

  return (
    <Particles
      id={id}
      init={particlesInit}
      options={options}
      className="absolute inset-0 z-0"
    />
  );
}
