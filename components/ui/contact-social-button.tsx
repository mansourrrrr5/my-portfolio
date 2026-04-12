"use client";

import { motion } from "framer-motion";
import { RiGithubFill, RiLinkedinFill, RiTwitterXFill, RiDownload2Line } from "@remixicon/react";

interface ContactSocialButtonProps {
  platform: "github" | "linkedin" | "X" | "resume";
  url: string;
  label: string;
  isResume?: boolean;
}

const iconMap = {
  github: RiGithubFill,
  linkedin: RiLinkedinFill,
  X: RiTwitterXFill,
  resume: RiDownload2Line,
};

export function ContactSocialButton({
  platform,
  url,
  label,
  isResume = false,
}: ContactSocialButtonProps) {
  const Icon = iconMap[platform as keyof typeof iconMap];

  return (
    <motion.a
      href={url}
      target={isResume ? undefined : "_blank"}
      rel={isResume ? undefined : "noopener noreferrer"}
      download={isResume ? true : undefined}
      aria-label={label}
      className="inline-flex items-center justify-center h-9 w-9 rounded-lg border border-zinc-700 bg-zinc-900/80 text-zinc-400 hover:border-blue-500 hover:bg-zinc-800/90 hover:text-blue-400 transition-all duration-300"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Icon className="h-4 w-4" />
    </motion.a>
  );
}
