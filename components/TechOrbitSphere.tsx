"use client";

import { useRef, useState, useEffect } from "react";
import { motion, Easing } from "framer-motion";

interface TechOrbit {
  label: string;
  icon: string; // emoji or short text
  color: string; // Tailwind color class
}

interface TechOrbitSphereProps {
  orbitItems?: TechOrbit[];
  size?: "sm" | "md" | "lg";
  interactive?: boolean;
  reducedMotion?: boolean;
}

const defaultTechs: TechOrbit[] = [
  { label: "Python", icon: "🐍", color: "text-blue-400" },
  { label: "FastAPI", icon: "⚡", color: "text-red-400" },
  { label: "React", icon: "⚛️", color: "text-cyan-400" },
  { label: "Next.js", icon: "▲", color: "text-white" },
  { label: "TypeScript", icon: "TS", color: "text-blue-300" },
  { label: "Docker", icon: "🐳", color: "text-blue-500" },
  { label: "OpenCV", icon: "📷", color: "text-orange-400" },
  { label: "AI/ML", icon: "🧠", color: "text-purple-400" },
];

export default function TechOrbitSphere({
  orbitItems = defaultTechs,
  size = "md",
  interactive = true,
  reducedMotion = false,
}: TechOrbitSphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Determine sizing based on preset
  const sizeConfig = {
    sm: { sphere: 120, orbit: 180, label: "text-xs", iconSize: "text-lg" },
    md: { sphere: 160, orbit: 240, label: "text-sm", iconSize: "text-2xl" },
    lg: { sphere: 200, orbit: 300, label: "text-base", iconSize: "text-3xl" },
  };

  const config = sizeConfig[size];
  const numItems = orbitItems.length;
  const angleIncrement = 360 / numItems;

  // Handle mouse move for interactive parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!interactive || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;

    setMousePos({ x, y });
    setRotation({
      x: y * 10,
      y: x * 10,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setMousePos({ x: 0, y: 0 });
  };

  // Continuous rotation animation
  const continuousRotation = reducedMotion
    ? { rotateX: 0, rotateY: 0, rotateZ: 0 }
    : {
        rotateX: [0, 360],
        rotateY: [0, 360],
        rotateZ: [0, -360],
      };

  const continuousTransition = reducedMotion
    ? {}
    : {
        duration: 20,
        repeat: Infinity,
        ease: "linear" as Easing,
      };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer glow ring */}
      <div
        className="absolute rounded-full border border-purple-500/20 blur-sm"
        style={{
          width: `${config.orbit + 40}px`,
          height: `${config.orbit + 40}px`,
        }}
      />

      {/* Main rotating container */}
      <motion.div
        className="relative"
        style={{
          width: `${config.orbit}px`,
          height: `${config.orbit}px`,
          transformStyle: "preserve-3d",
        }}
        animate={{
          ...continuousRotation,
          rotateX: reducedMotion ? 0 : rotation.x,
          rotateY: reducedMotion ? 0 : rotation.y,
        }}
        transition={
          reducedMotion
            ? {}
            : {
                rotateX: {
                  type: "spring",
                  stiffness: 50,
                  damping: 30,
                  mass: 1,
                },
                rotateY: {
                  type: "spring",
                  stiffness: 50,
                  damping: 30,
                  mass: 1,
                },
                rotateZ: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                },
              }
        }
      >
        {/* Orbit items */}
        {orbitItems.map((tech, index) => {
          const angle = (index * angleIncrement * Math.PI) / 180;
          const x = Math.cos(angle) * (config.orbit / 2);
          const y = Math.sin(angle) * (config.orbit / 2);
          const z = Math.cos((index / numItems) * Math.PI) * 50;

          return (
            <motion.div
              key={tech.label}
              className="absolute w-12 h-12 flex items-center justify-center"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: (index * 0.05),
                duration: 0.6,
                ease: "easeOut",
              }}
            >
              {/* Tech node card - always faces camera */}
              <motion.div
                className="relative w-full h-full flex flex-col items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                }}
                animate={{
                  rotateX: reducedMotion ? 0 : -rotation.x,
                  rotateY: reducedMotion ? 0 : -rotation.y,
                }}
                transition={{
                  rotateX: {
                    type: "spring",
                    stiffness: 50,
                    damping: 30,
                  },
                  rotateY: {
                    type: "spring",
                    stiffness: 50,
                    damping: 30,
                  },
                }}
              >
                {/* Background glow effect */}
                <div
                  className={`absolute inset-0 rounded-full ${tech.color} opacity-30 blur-lg transition-opacity duration-300 group-hover:opacity-50`}
                />

                {/* Card background */}
                <div className="absolute inset-0 rounded-full bg-zinc-900/60 border border-zinc-700/50 backdrop-blur-sm shadow-lg shadow-purple-500/10" />

                {/* Icon */}
                <div className={`relative z-10 ${config.iconSize} font-bold`}>
                  {tech.icon}
                </div>
              </motion.div>

              {/* Label below node */}
              <motion.div
                className={`absolute top-full mt-2 whitespace-nowrap text-center ${config.label} text-zinc-300 font-medium pointer-events-none`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (index * 0.05) + 0.2, duration: 0.4 }}
              >
                {tech.label}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Center core sphere */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${config.sphere}px`,
            height: `${config.sphere}px`,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Outer pulsing ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-purple-500/40"
            animate={{
              borderColor: reducedMotion
                ? "rgba(168, 85, 247, 0.4)"
                : [
                    "rgba(168, 85, 247, 0.4)",
                    "rgba(96, 165, 250, 0.6)",
                    "rgba(168, 85, 247, 0.4)",
                  ],
              boxShadow: reducedMotion
                ? "0 0 20px rgba(168, 85, 247, 0.3)"
                : [
                    "0 0 20px rgba(168, 85, 247, 0.3)",
                    "0 0 40px rgba(96, 165, 250, 0.5)",
                    "0 0 20px rgba(168, 85, 247, 0.3)",
                  ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Core gradient sphere */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-600 via-blue-600 to-purple-700 shadow-2xl shadow-purple-500/50"
            animate={{
              boxShadow: reducedMotion
                ? "0 0 40px rgba(168, 85, 247, 0.5)"
                : [
                    "0 0 40px rgba(168, 85, 247, 0.5)",
                    "0 0 60px rgba(96, 165, 250, 0.6)",
                    "0 0 40px rgba(168, 85, 247, 0.5)",
                  ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Inner highlight */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Optional: reduced motion indicator (hidden by default) */}
      {reducedMotion && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-xs text-zinc-500">Motion reduced</span>
        </div>
      )}
    </div>
  );
}
