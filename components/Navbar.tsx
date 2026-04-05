"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Experience", link: "#experience" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

const scrollProgressStyles = `
  .scroll-progress-bar {
    position: fixed;
    right: 0;
    top: 0;
    width: 2px;
    height: 0;
    background: linear-gradient(to bottom, #a855f7, #3b82f6);
    z-index: 100;
    transition: height 0.1s linear;
  }

  .scroll-progress-dot {
    position: absolute;
    right: -3px;
    width: 8px;
    height: 8px;
    background: #a855f7;
    border-radius: 50%;
    border: 2px solid #18181b;
    box-shadow: 0 0 8px rgba(168, 85, 247, 0.5);
    transform: translateX(50%);
    top: 0;
  }
`;

export default function Navbar() {
  const [active, setActive] = useState("#about");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  useEffect(() => {
    // Set up IntersectionObserver for section tracking
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when section is in center of viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = `#${entry.target.id}`;
          setActive(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    navItems.forEach((item) => {
      const element = document.querySelector(item.link);
      if (element) {
        observer.observe(element);
      }
    });

    // Handle scroll for blur intensification and progress tracking
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setHasScrolled(scrolled);

      // Calculate scroll progress
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <style>{scrollProgressStyles}</style>
      
      {/* Scroll Progress Bar */}
      <div
        className="scroll-progress-bar"
        style={{ height: `${scrollProgress}%` }}
      >
        <div
          className="scroll-progress-dot"
          style={{ top: `${scrollProgress}%` }}
        />
      </div>

      {/* Desktop Navigation - Pill Navbar */}
      <div className="hidden sm:block fixed top-6 left-1/2 z-50 -translate-x-1/2">
        <div
          className={`flex items-center gap-6 rounded-full px-8 py-3 shadow-lg transition-all duration-300 ${
            hasScrolled
              ? "border border-white/5 bg-zinc-900/90 backdrop-blur-2xl"
              : "border border-zinc-800 bg-zinc-900/70 backdrop-blur-xl"
          }`}
        >
          {navItems.map((item) => (
            <a
              key={item.link}
              href={item.link}
              className={`text-sm font-medium transition-colors duration-200 ${
                active === item.link
                  ? "text-white"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Navigation - Hamburger Button */}
      <div className="sm:hidden fixed top-6 right-6 z-50">
        <motion.button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className="p-2 rounded-lg border border-zinc-700 bg-zinc-900/50 hover:bg-zinc-800 transition"
          aria-label="Toggle navigation menu"
          whileTap={{ scale: 0.95 }}
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isDrawerOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </motion.button>
      </div>

      {/* Mobile Drawer - Bottom Sheet */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDrawerOpen(false)}
              className="sm:hidden fixed inset-0 z-40 bg-black/50"
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDrag={(_, info) => {
                setDragOffset(info.offset.y);
              }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 80) {
                  setIsDrawerOpen(false);
                }
                setDragOffset(0);
              }}
              className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-900 rounded-t-3xl border-t border-zinc-800 max-h-[80vh] overflow-y-auto"
              style={{
                y: dragOffset,
              }}
            >
              {/* Drag Handle */}
              <div className="flex justify-center pt-4 pb-2">
                <div className="w-12 h-1 bg-zinc-700 rounded-full" />
              </div>

              {/* Navigation Items */}
              <nav className="flex flex-col divide-y divide-zinc-800">
                {navItems.map((item) => (
                  <a
                    key={item.link}
                    href={item.link}
                    onClick={() => setIsDrawerOpen(false)}
                    className={`px-6 py-4 text-center font-medium transition-colors min-h-[48px] flex items-center justify-center ${
                      active === item.link
                        ? "text-white bg-zinc-800/50"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-800/30"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
