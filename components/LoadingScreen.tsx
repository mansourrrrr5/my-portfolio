"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = typeof window !== "undefined" && sessionStorage.getItem("visited");
    
    if (!hasVisited) {
      setIsVisible(true);
      // Mark as visited
      sessionStorage.setItem("visited", "1");
    }
  }, []);

  const letters = "AZIZ".split("");
  
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return isVisible ? (
    <motion.div
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ y: "-100%", opacity: 0 }}
      transition={{
        delay: 1.2, // 0.8s for letters + 0.4s hold
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      }}
      onAnimationComplete={() => {
        if (isVisible) {
          setIsVisible(false);
        }
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex gap-8"
      >
        {letters.map((letter, index) => (
          <motion.div
            key={index}
            variants={letterVariants}
            className="text-8xl font-medium text-white tracking-wider"
          >
            {letter}
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  ) : null;
}
