"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const themeToggleStyles = `
  .theme-toggle {
    position: fixed;
    top: 4rem;
    right: 2rem;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .theme-toggle-button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid rgba(168, 85, 247, 0.5);
    background: rgba(24, 24, 27, 0.6);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 1.5rem;
  }

  .theme-toggle-button:hover {
    border-color: #a855f7;
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
    transform: scale(1.05);
  }

  .theme-toggle-button:active {
    transform: scale(0.95);
  }

  .light .theme-toggle-button {
    background: rgba(245, 245, 244, 0.6);
    border-color: rgba(168, 85, 247, 0.6);
  }

  .light .theme-toggle-button:hover {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
  }
`;

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Only render after client mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <>
      <style>{themeToggleStyles}</style>
      <motion.div
        className="theme-toggle"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          className="theme-toggle-button"
          onClick={toggleTheme}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          title={`Switch to ${isDark ? "light" : "dark"} mode`}
        >
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ display: "inline-block" }}
          >
            {isDark ? "☀️" : "🌙"}
          </motion.span>
        </motion.button>
      </motion.div>
    </>
  );
}
