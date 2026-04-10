"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioConfig } from "@/data/content";
import { useTypewriter } from "@/hooks/useTypewriter";
import { DottedSurface } from "@/components/ui/dotted-surface";
import { useState, useRef, useEffect } from "react";

const titles = ["Software Engineer", "AI Specialist", "IT Engineer"];

// CSS animations for Hero effects - minimal and elegant
const getHeroStyles = (reducedMotion: boolean) => `
  @keyframes shimmer {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  @keyframes subtle-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(168, 85, 247, 0.15); }
    50% { box-shadow: 0 0 30px rgba(168, 85, 247, 0.25); }
  }

  .portrait-container {
    animation: ${reducedMotion ? 'none' : 'subtle-glow 3s ease-in-out infinite'};
  }

  .shimmer-button::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    animation: ${reducedMotion ? 'none' : 'shimmer 0.6s ease-in-out'};
  }

  .shimmer-button:hover::after {
    animation: ${reducedMotion ? 'none' : 'shimmer 0.6s ease-in-out infinite 0.3s'};
  }

  .magnetic-button {
    transition: ${reducedMotion ? 'none' : 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'};
    will-change: transform;
  }

  .specialty-text {
    font-size: 0.95rem;
    letter-spacing: 0.05em;
  }
`;

// Deterministic seeded random number generator
function seededRandom(seed: number) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate particles with deterministic values
function generateParticles(count: number) {
  const colors = ["bg-purple-500", "bg-blue-500", "bg-cyan-500"];
  const particles = [];
  
  for (let i = 0; i < count; i++) {
    const leftVal = seededRandom(i * 12.9898 + 78.233);
    const topVal = seededRandom(i * 78.233 + 43.141);
    const sizeVal = seededRandom(i * 43.141 + 94.673);
    const durationVal = seededRandom(i * 94.673 + 33.141);
    const colorIdx = Math.floor(seededRandom(i * 33.141 + 12.9898) * 3);
    
    particles.push({
      id: i,
      left: Number((leftVal * 100).toFixed(2)),
      top: Number((topVal * 100).toFixed(2)),
      size: Number((sizeVal * 2 + 2).toFixed(2)),
      duration: Number((durationVal * 4 + 3).toFixed(3)),
      color: colors[colorIdx],
    });
  }
  
  return particles;
}

// Specialties list
const specialties = ["Computer Vision", "AI Systems", "Full-Stack Development"];

export default function Hero() {
  const [particles] = useState(() => generateParticles(8));
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const button1Ref = useRef<HTMLAnchorElement>(null);
  const button2Ref = useRef<HTMLAnchorElement>(null);
  const [button1Transform, setButton1Transform] = useState("translate(0, 0)");
  const [button2Transform, setButton2Transform] = useState("translate(0, 0)");
  const animationRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [reducedMotion, setReducedMotion] = useState(false);

  // Scroll-linked parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const avatarScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.85]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReducedMotion(prefersReducedMotion);
  }, []);

  const typewriterText = useTypewriter({
    words: titles,
    speed: 80,
    delayBetweenWords: 2000,
    loop: true,
  });

  const handleResumeDownload = () => {
    const link = document.createElement("a");
    link.href = "/Lebenslauf_.pdf";
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
      x: -distX * 8,
      y: -distY * 8,
    });
  };

  const handleMouseLeave = () => {
    setParallax({ x: 0, y: 0 });
  };

  const handleButtonMouseMove = (
    e: React.MouseEvent<HTMLAnchorElement>,
    buttonRef: React.RefObject<HTMLAnchorElement | null>,
    setTransform: (transform: string) => void
  ) => {
    const button = buttonRef.current;
    if (!button) return;

    const rect = button.getBoundingClientRect();
    const buttonCenterX = rect.left + rect.width / 2;
    const buttonCenterY = rect.top + rect.height / 2;

    const distance = Math.hypot(e.clientX - buttonCenterX, e.clientY - buttonCenterY);
    const maxDistance = 60;

    if (distance < maxDistance) {
      const angle = Math.atan2(e.clientY - buttonCenterY, e.clientX - buttonCenterX);
      const strength = (maxDistance - distance) / maxDistance;
      const pullX = Math.cos(angle) * strength * 8;
      const pullY = Math.sin(angle) * strength * 8;

      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }

      animationRef.current = requestAnimationFrame(() => {
        setTransform(`translate(${pullX}px, ${pullY}px)`);
      });
    }
  };

  const handleButtonMouseLeave = (setTransform: (transform: string) => void) => {
    setTransform("translate(0, 0)");
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const nameLetters = portfolioConfig.name.split("");

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden min-h-[90vh] w-screen -ml-[calc(50vw-50%)] bg-zinc-950"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background layer - full width and height */}
      <div className="absolute inset-0 z-0">
        <DottedSurface className="w-full h-full" />
      </div>
      
      {/* Subtle background particles - reduced */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`absolute pointer-events-none ${particle.color}`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              borderRadius: '50%',
              opacity: 0.08,
            }}
          />
        ))}
      </div>

      <style>{getHeroStyles(reducedMotion)}</style>

      {/* Content layer - centered with max-width constraint */}
      <div className="relative z-10 flex items-center justify-center pt-28 pb-20 md:pt-32 md:pb-24">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 px-6 md:gap-16 md:grid-cols-2">
        {/* LEFT SIDE - Content */}
        <motion.div
          className="space-y-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          style={{ y: textY, opacity: heroOpacity }}
        >
          {/* Subtitle */}
          <motion.p
            className="text-sm uppercase tracking-widest text-zinc-400 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.15, duration: reducedMotion ? 0 : 0.5 }}
          >
            Welcome to my portfolio
          </motion.p>

          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.2, duration: reducedMotion ? 0 : 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
              I'm{" "}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                {nameLetters.map((letter, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: reducedMotion ? 0 : 0.3 + index * 0.08,
                      duration: reducedMotion ? 0 : 0.5,
                    }}
                    className="inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </span>
            </h1>
          </motion.div>

          {/* Role and description */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.4, duration: reducedMotion ? 0 : 0.6 }}
          >
            <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-lg">
              <span className="font-semibold text-white">{typewriterText}</span> building intelligent  and scalable applications that push the boundaries of what's possible.
            </p>

            {/* Specialties */}
            <p className="text-sm text-zinc-400 specialty-text">
              {specialties.join(" • ")}
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex gap-2 flex-wrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.5, duration: reducedMotion ? 0 : 0.5 }}
          >
            {portfolioConfig.socials.map((social) => (
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
                className="px-4 py-2 text-xs font-medium border border-zinc-700 rounded-lg text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900/50 hover:text-white transition-colors backdrop-blur-sm"
                whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
                whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
              >
                {social.label}
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.6, duration: reducedMotion ? 0 : 0.6 }}
          >
            {/* Primary Button */}
            <motion.a
              ref={button1Ref}
              href="#projects"
              className="magnetic-button relative group rounded-xl border border-purple-500/50 bg-gradient-to-r from-purple-600/30 to-blue-600/30 px-7 py-3.5 text-sm font-semibold text-purple-300 hover:border-purple-400 hover:from-purple-600/50 hover:to-blue-600/50 transition-all shimmer-button overflow-hidden backdrop-blur-sm"
              style={{ transform: button1Transform }}
              onMouseMove={(e) => handleButtonMouseMove(e, button1Ref, setButton1Transform)}
              onMouseLeave={() => handleButtonMouseLeave(setButton1Transform)}
              whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
            >
              View my work
              <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">→</span>
            </motion.a>

            {/* Secondary Button */}
            <motion.a
              ref={button2Ref}
              href="#contact"
              className="magnetic-button relative rounded-xl border border-zinc-600 bg-zinc-900/30 px-7 py-3.5 text-sm font-semibold text-white hover:border-zinc-500 hover:bg-zinc-900/60 transition-all backdrop-blur-sm"
              style={{ transform: button2Transform }}
              onMouseMove={(e) => handleButtonMouseMove(e, button2Ref, setButton2Transform)}
              onMouseLeave={() => handleButtonMouseLeave(setButton2Transform)}
              whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
            >
              Let's connect
            </motion.a>
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE - Portrait */}
        <motion.div
          className="relative flex justify-center items-center"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            transform: `translate(${parallax.x}px, ${parallax.y}px)`,
            transition: reducedMotion ? 'none' : 'transform 0.08s ease-out',
            scale: avatarScale,
          }}
        >
          {/* Subtle gradient background card */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-purple-500/10 to-transparent opacity-50 blur-2xl" />

          {/* Portrait frame */}
          <div className="portrait-container relative z-10 rounded-2xl border border-white/10 overflow-hidden backdrop-blur-sm shadow-2xl shadow-purple-500/20 w-[300px] h-[400px] md:w-[350px] md:h-[450px]">
            <Image
              src="/Untitled.jpeg"
              alt="Aziz Avatar"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 300px, 350px"
            />
            
            {/* Subtle top light effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
        </div>
    </section>
  );
}