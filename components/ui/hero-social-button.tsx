"use client";

import { motion } from "framer-motion";
import { RiGithubFill, RiLinkedinFill, RiTwitterXFill } from "@remixicon/react";

interface HeroSocialButtonProps {
  platform: "github" | "linkedin" | "x";
  url: string;
  label: string;
  reducedMotion: boolean;
}

const iconMap = {
  github: RiGithubFill,
  linkedin: RiLinkedinFill,
  x: RiTwitterXFill,
};

export function HeroSocialButton({
  platform,
  url,
  label,
  reducedMotion,
}: HeroSocialButtonProps) {
  const Icon = iconMap[platform];

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center h-11 w-11 rounded-lg border border-zinc-700 bg-zinc-900/80 text-zinc-400 hover:border-blue-500 hover:bg-zinc-800/90 hover:text-blue-400 transition-all duration-300"
      whileHover={{ scale: reducedMotion ? 1 : 1.1 }}
      whileTap={{ scale: reducedMotion ? 1 : 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reducedMotion ? 0 : 0.5 }}
    >
      <Icon className="h-5 w-5" />
    </motion.a>
  );
}
