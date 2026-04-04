"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioConfig } from "@/data/content";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useState } from "react";

const socialIcons: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "𝕏",
  email: "Email",
  resume: "Resume",
};

const titles = ["Software Engineer", "AI Specialist", "Computer Vision Engineer"];

// CSS animations for Hero effects
const heroStyles = `
  @keyframes rotate-border {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @keyframes float-particle {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }

  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @keyframes text-glow-pulse {
    0%, 100% { text-shadow: 0 0 10px rgba(168, 85, 247, 0.4); }
    50% { text-shadow: 0 0 20px rgba(168, 85, 247, 0.8), 0 0 30px rgba(168, 85, 247, 0.4); }
  }

  .animated-border {
    position: relative;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1));
  }

  .animated-border::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1.5rem;
    padding: 2px;
    background: conic-gradient(
      from 0deg,
      #a855f7 0%,
      #3b82f6 25%,
      #06b6d4 50%,
      #a855f7 75%,
      #a855f7 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    animation: rotate-border 8s linear infinite;
    z-index: -1;
  }

  .float-particle {
    animation: float-particle ease-in-out infinite;
  }

  .shimmer-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: shimmer 0.6s ease-in-out;
  }

  .shimmer-button:hover::after {
    animation: shimmer 0.6s ease-in-out infinite 0.3s;
  }

  .typewriter-glow {
    animation: text-glow-pulse 2s ease-in-out infinite;
  }

  .pulse-badge {
    position: relative;
  }

  .pulse-badge::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 6px;
    transform: translate(-50%, -50%);
    width: 8px;
    height: 8px;
    background-color: #10b981;
    border-radius: 50%;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

// Generate random particles
function generateParticles(count: number) {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2 + 2,
    duration: Math.random() * 4 + 3,
    color: ["bg-purple-500", "bg-blue-500", "bg-cyan-500"][Math.floor(Math.random() * 3)],
  }));
}

export default function Hero() {
  const [particles] = useState(() => generateParticles(12));
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const typewriterText = useTypewriter({
    words: titles,
    speed: 80,
    delayBetweenWords: 2000,
    loop: true,
  });

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Aziz_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const section = e.currentTarget;
    const rect = section.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const distX = (mouseX - centerX) / centerX;
    const distY = (mouseY - centerY) / centerY;
    
    setParallax({
      x: -distX * 10,
      y: -distY * 10,
    });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  const nameLetters = portfolioConfig.name.split("");

  return (
    <section 
      className="relative min-h-[85vh] flex items-center justify-between bg-grid pt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <style>{heroStyles}</style>

      {/* Floating particle dots */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute pointer-events-none float-particle ${particle.color} opacity-20`}
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            borderRadius: '50%',
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Glow blobs */}
      <div className="pointer-events-none absolute left-0 top-0 h-72 w-72 bg-blue-600/30 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-20 h-72 w-72 bg-purple-600/30 blur-[120px]" />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 px-6 md:grid-cols-2">
        {/* LEFT SIDE */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.p
              className="text-sm uppercase tracking-widest text-zinc-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Welcome! Let's build together.
            </motion.p>

            {/* Available for work badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-green-500/30 bg-green-500/5 w-fit pulse-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-xs font-medium text-green-400">Available for work</span>
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </motion.div>

            {/* Animated heading with staggered letters */}
            <motion.h1 className="text-5xl font-bold md:text-6xl leading-tight">
              I'm{" "}
              <motion.span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent inline-block">
                {nameLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.3 + index * 0.1,
                      duration: 0.5,
                    }}
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.span>
            </motion.h1>

            {/* Typewriter effect on subtitle */}
            <motion.p
              className="text-lg text-zinc-300 leading-relaxed max-w-xl min-h-8"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <span className="inline-block min-w-[280px] h-8">
                <span className="typewriter-glow">{typewriterText}</span>
                <motion.span
                  className="ml-1 inline-block w-2 h-8 bg-purple-400"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.6, repeat: Infinity }}
                />
              </span>
              . I build{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                intelligent systems
              </span>{" "}
              and{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                scalable applications
              </span>
              .
            </motion.p>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            className="flex gap-3 flex-wrap pt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, staggerChildren: 0.05 }}
          >
            {portfolioConfig.socials.map((social, index) => (
              <motion.a
                key={social.platform}
                href={
                  social.platform === "resume"
                    ? "javascript:void(0)"
                    : social.url
                }
                onClick={
                  social.platform === "resume"
                    ? (e) => {
                        e.preventDefault();
                        handleResumeDownload();
                      }
                    : undefined
                }
                target={social.platform === "resume" ? undefined : "_blank"}
                rel={social.platform === "resume" ? undefined : "noopener noreferrer"}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2 text-sm font-medium text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800 transition"
                aria-label={social.label}
                title={social.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05, duration: 0.4 }}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                {socialIcons[social.platform]}
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.a
              href="#projects"
              className="relative rounded-xl border border-purple-500 bg-purple-500/10 px-6 py-3 text-sm font-semibold text-purple-400 hover:bg-purple-500/20 transition shimmer-button overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View my work →
            </motion.a>

            <motion.a
              href="#contact"
              className="relative rounded-xl border border-zinc-700 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition shimmer-button overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get in touch
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE - Image */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            transform: `translate(${parallax.x}px, ${parallax.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          {/* Blue glow background */}
          <div className="absolute h-[420px] w-[420px] rounded-full bg-blue-500/30 blur-[120px]" />

          {/* Purple subtle accent */}
          <div className="absolute top-10 h-[350px] w-[350px] rounded-full bg-purple-500/20 blur-[140px]" />

          {/* Bottom fade mask */}
          <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-zinc-950 to-transparent" />

          {/* Animated border wrapper */}
          <div className="relative z-10 animated-border rounded-2xl p-[2px] w-[350px] h-[350px] flex items-center justify-center">
            {/* Image */}
            <Image
              src="/Untitled.jpeg"
              alt="Aziz Avatar"
              width={350}
              height={350}
              priority
              className="object-contain rounded-[15px]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
