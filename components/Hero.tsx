"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { portfolioConfig } from "@/data/content";
import { useTypewriter } from "@/hooks/useTypewriter";

const socialIcons: Record<string, string> = {
  github: "GitHub",
  linkedin: "LinkedIn",
  twitter: "𝕏",
  email: "Email",
  resume: "Resume",
};

const titles = ["Software Engineer", "AI Specialist", "Computer Vision Engineer"];

export default function Hero() {
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

  const nameLetters = portfolioConfig.name.split("");

  return (
    <section className="relative min-h-[85vh] flex items-center justify-between bg-grid pt-20">
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
                {typewriterText}
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
              className="rounded-xl border border-purple-500 bg-purple-500/10 px-6 py-3 text-sm font-semibold text-purple-400 hover:bg-purple-500/20 transition"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View my work →
            </motion.a>

            <motion.a
              href="#contact"
              className="rounded-xl border border-zinc-700 px-6 py-3 text-sm font-semibold text-white hover:bg-zinc-800 transition"
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
        >
          {/* Blue glow background */}
          <div className="absolute h-[420px] w-[420px] rounded-full bg-blue-500/30 blur-[120px]" />

          {/* Purple subtle accent */}
          <div className="absolute top-10 h-[350px] w-[350px] rounded-full bg-purple-500/20 blur-[140px]" />

          {/* Bottom fade mask */}
          <div className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-zinc-950 to-transparent" />

          {/* Image */}
          <Image
            src="/Untitled.jpeg"
            alt="Aziz Avatar"
            width={350}
            height={350}
            priority
            className="relative z-10 object-contain rounded-2xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
