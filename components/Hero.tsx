"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { portfolioConfig } from "@/data/content";
import { useTypewriter } from "@/hooks/useTypewriter";
import { useState, useRef, useEffect } from "react";

const socialIcons: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "𝕏",
  email: "Email",
  resume: "Resume",
};

const titles = ["Software Engineer", "AI Specialist", "Computer Vision Engineer"];

// CSS animations for Hero effects - with reduced motion support
const getHeroStyles = (reducedMotion: boolean) => `
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
    animation: ${reducedMotion ? 'none' : 'rotate-border 8s linear infinite'};
    z-index: -1;
  }

  .float-particle {
    animation: ${reducedMotion ? 'none' : 'float-particle ease-in-out infinite'};
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

  .typewriter-glow {
    animation: ${reducedMotion ? 'none' : 'text-glow-pulse 2s ease-in-out infinite'};
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
    animation: ${reducedMotion ? 'none' : 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'};
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  .magnetic-button {
    transition: ${reducedMotion ? 'none' : 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)'};
    will-change: transform;
  }
`;

// Deterministic seeded random number generator (Mulberry32 - standard algorithm)
function seededRandom(seed: number) {
  let x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate particles with deterministic values (same on server and client)
function generateParticles(count: number) {
  const colors = ["bg-purple-500", "bg-blue-500", "bg-cyan-500"];
  const particles = [];
  
  for (let i = 0; i < count; i++) {
    // Use consistent seed multipliers
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

export default function Hero() {
  const [particles] = useState(() => generateParticles(12));
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const button1Ref = useRef<HTMLAnchorElement>(null);
  const button2Ref = useRef<HTMLAnchorElement>(null);
  const [button1Transform, setButton1Transform] = useState("translate(0, 0)");
  const [button2Transform, setButton2Transform] = useState("translate(0, 0)");
  const animationRef = useRef<number | null>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Check for reduced motion preference
  const [reducedMotion, setReducedMotion] = useState(false);

  // Scroll-linked parallax using Framer Motion
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Text moves up by 60px, opacity fades to 0 at 60% scroll
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, -60]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Avatar scales from 1 to 0.85
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
    link.href = "/resume.pdf";
    link.download = "Aziz_Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const createParticleBurst = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reducedMotion || !particleContainerRef.current) return;

    const rect = (e.currentTarget as HTMLAnchorElement).getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    const colors = ["bg-purple-500", "bg-blue-500"];

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div");
      particle.className = `${colors[Math.floor(Math.random() * colors.length)]} rounded-full`;
      particle.style.position = "fixed";
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particle.style.width = `${8 + Math.random() * 4}px`;
      particle.style.height = `${8 + Math.random() * 4}px`;
      particle.style.pointerEvents = "none";
      particle.style.zIndex = "9999";

      const angle = (Math.PI * 2 * i) / 12 + (Math.random() - 0.5) * 0.5;
      const velocity = 80 + Math.random() * 120;
      const randomX = Math.cos(angle) * velocity;
      const randomY = Math.sin(angle) * velocity;

      particleContainerRef.current.appendChild(particle);

      // Use Framer Motion animate with duration and ease
      const startTime = Date.now();
      const duration = 600;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // easeOut

        particle.style.transform = `translate(${randomX * easeProgress}px, ${randomY * easeProgress}px)`;
        particle.style.opacity = String(1 - easeProgress);
        particle.style.scale = String(1 - easeProgress);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          if (particleContainerRef.current?.contains(particle)) {
            particleContainerRef.current.removeChild(particle);
          }
        }
      };

      requestAnimationFrame(animate);
    }
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
      className="relative min-h-[85vh] flex items-center justify-between bg-grid pt-20"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div ref={particleContainerRef} className="fixed inset-0 pointer-events-none z-[9999]" />
      <style>{getHeroStyles(reducedMotion)}</style>

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
          suppressHydrationWarning
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
          transition={{ duration: reducedMotion ? 0 : 0.6 }}
          style={{ y: textY, opacity: heroOpacity }}
        >
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reducedMotion ? 0 : 0.2, duration: reducedMotion ? 0 : 0.6 }}
          >
            <motion.p
              className="text-sm uppercase tracking-widest text-zinc-400"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reducedMotion ? 0 : 0.1, duration: reducedMotion ? 0 : 0.5 }}
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
                      delay: reducedMotion ? 0 : 0.3 + index * 0.1,
                      duration: reducedMotion ? 0 : 0.5,
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
              transition={{ delay: reducedMotion ? 0 : 0.5, duration: reducedMotion ? 0 : 0.6 }}
            >
              <span className="inline-block min-w-[280px] h-8">
                <span className="typewriter-glow">{typewriterText}</span>
                <motion.span
                  className="ml-1 inline-block w-2 h-8 bg-purple-400"
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: reducedMotion ? 0 : 0.6, repeat: reducedMotion ? 0 : Infinity }}
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
            transition={{ delay: reducedMotion ? 0 : 0.6, duration: reducedMotion ? 0 : 0.6, staggerChildren: reducedMotion ? 0 : 0.05 }}
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
                transition={{ delay: reducedMotion ? 0 : 0.6 + index * 0.05, duration: reducedMotion ? 0 : 0.4 }}
                whileHover={{ scale: reducedMotion ? 1 : 1.05, y: reducedMotion ? 0 : -4 }}
                whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
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
            transition={{ delay: reducedMotion ? 0 : 0.8, duration: reducedMotion ? 0 : 0.6 }}
          >
            <motion.a
              ref={button1Ref}
              href="#projects"
              className="magnetic-button relative rounded-xl border border-purple-500 bg-purple-500/10 px-6 py-3 text-sm font-semibold text-purple-400 hover:bg-purple-500/20 transition shimmer-button overflow-hidden"
              style={{ transform: button1Transform }}
              onMouseMove={(e) => handleButtonMouseMove(e, button1Ref, setButton1Transform)}
              onMouseLeave={() => handleButtonMouseLeave(setButton1Transform)}
              onClick={createParticleBurst}
              whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
            >
              View my work →
            </motion.a>

            <motion.a
              ref={button2Ref}
              href="#contact"
              className="magnetic-button relative rounded-xl border border-zinc-700 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition shimmer-button overflow-hidden"
              style={{ transform: button2Transform }}
              onMouseMove={(e) => handleButtonMouseMove(e, button2Ref, setButton2Transform)}
              onMouseLeave={() => handleButtonMouseLeave(setButton2Transform)}
              onClick={createParticleBurst}
              whileHover={{ scale: reducedMotion ? 1 : 1.05 }}
              whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
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
            transition: reducedMotion ? 'none' : 'transform 0.1s ease-out',
            scale: avatarScale,
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
