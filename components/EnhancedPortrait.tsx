"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface EnhancedPortraitProps {
  imageSrc: string;
  imageAlt: string;
  reducedMotion?: boolean;
}

const techBadges = [
  { icon: "🐍", label: "Python", angle: 0 },
  { icon: "⚛️", label: "React", angle: 45 },
  { icon: "🚀", label: "Next.js", angle: 90 },
  { icon: "🧠", label: "AI/ML", angle: 135 },
  { icon: "🐳", label: "Docker", angle: 180 },
  { icon: "⚡", label: "FastAPI", angle: 225 },
  { icon: "📷", label: "OpenCV", angle: 270 },
  { icon: "💻", label: "TypeScript", angle: 315 },
];

export default function EnhancedPortrait({
  imageSrc,
  imageAlt,
  reducedMotion = false,
}: EnhancedPortraitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Handle mouse move for subtle parallax
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || reducedMotion) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;

    setMousePos({ x, y });
    setRotation({
      x: y * 3,
      y: x * 3,
    });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-[300px] h-[400px] md:w-[350px] md:h-[450px] flex items-center justify-center"
      style={{ perspective: "1200px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Outer glow background layers */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{
          scale: reducedMotion ? 1 : [1, 1.1, 1],
          opacity: reducedMotion ? 0.5 : [0.5, 0.7, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Rotating gradient ring background */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: reducedMotion
            ? "conic-gradient(from 0deg, rgba(168, 85, 247, 0.2), rgba(96, 165, 250, 0.2), rgba(168, 85, 247, 0.2))"
            : "conic-gradient(from var(--angle), rgba(168, 85, 247, 0.2), rgba(96, 165, 250, 0.3), rgba(34, 197, 94, 0.15), rgba(168, 85, 247, 0.2))",
          "--angle": "0deg",
        } as React.CSSProperties}
        animate={
          !reducedMotion
            ? {
                "--angle": "360deg",
              }
            : {}
        }
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Inner gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/5 to-blue-500/5" />

      {/* Orbiting tech badges */}
      <div className="absolute inset-0 flex items-center justify-center">
        {techBadges.map((badge, index) => {
          const radius = 180;
          const angle = (badge.angle * Math.PI) / 180;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <motion.div
              key={badge.label}
              className="absolute w-12 h-12 flex items-center justify-center"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              animate={{
                x: reducedMotion ? 0 : x,
                y: reducedMotion ? 0 : y,
                rotateZ: reducedMotion ? 0 : 360,
              }}
              transition={{
                x: {
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: "easeOut",
                },
                y: {
                  duration: 0.6,
                  delay: index * 0.05,
                  ease: "easeOut",
                },
                rotateZ: {
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            >
              {/* Tech badge */}
              <motion.div
                className="relative w-full h-full flex items-center justify-center rounded-full bg-zinc-900/70 border border-purple-500/40 backdrop-blur-sm shadow-lg shadow-purple-500/20"
                animate={{
                  rotateZ: reducedMotion ? 0 : -360,
                  scale: reducedMotion ? 1 : [1, 1.1, 1],
                }}
                transition={{
                  rotateZ: {
                    duration: 12,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                {/* Icon */}
                <span className="text-lg font-bold">{badge.icon}</span>

                {/* Subtle glow */}
                <div
                  className={`absolute inset-0 rounded-full opacity-40 blur-md ${
                    index % 2 === 0 ? "bg-purple-500" : "bg-blue-500"
                  }`}
                  style={{ filter: "blur(8px)" }}
                />
              </motion.div>

              {/* Label tooltip */}
              <motion.div
                className="absolute bottom-full mb-3 whitespace-nowrap text-xs font-medium text-zinc-300 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  delay: index * 0.05 + 0.3,
                  duration: 0.3,
                }}
              >
                {badge.label}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Main portrait frame - slightly tilted by mouse movement */}
      <motion.div
        className="relative z-20"
        animate={{
          rotateX: reducedMotion ? 0 : rotation.x,
          rotateY: reducedMotion ? 0 : rotation.y,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 30,
        }}
      >
        {/* Portrait container */}
        <div className="portrait-container relative rounded-2xl border border-white/20 overflow-hidden backdrop-blur-sm shadow-2xl shadow-purple-500/30 w-[300px] h-[400px] md:w-[350px] md:h-[450px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 768px) 300px, 350px"
          />

          {/* Top light effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/8 to-transparent pointer-events-none" />

          {/* Vignette effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/20 pointer-events-none rounded-2xl" />
        </div>
      </motion.div>

      {/* Animated halo glow behind portrait */}
      <motion.div
        className="absolute inset-0 rounded-2xl -z-10"
        style={{
          background: "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(96, 165, 250, 0.2) 40%, transparent 70%)",
          filter: "blur(20px)",
        }}
        animate={{
          opacity: reducedMotion ? 0.3 : [0.3, 0.6, 0.3],
          scale: reducedMotion ? 1 : [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Extra depth layer */}
      <div className="absolute inset-0 rounded-2xl -z-20 bg-gradient-to-b from-purple-600/5 via-transparent to-blue-600/5 blur-3xl" />
    </div>
  );
}
