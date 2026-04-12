"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
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
  const router = useRouter();
  const pathname = usePathname();
  const [active, setActive] = useState("#about");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  // Extract current locale from pathname
  const currentLocale = pathname.startsWith("/de")
    ? "de"
    : pathname.startsWith("/fr")
    ? "fr"
    : "en";

  const languages = [
    { code: "en", label: "English", flag: "🇺🇸" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
  ];

  const switchLanguage = (locale: string) => {
    let newPath = pathname;
    
    // Remove current locale prefix
    if (pathname.startsWith("/de/") || pathname.startsWith("/de")) {
      newPath = pathname.replace(/^\/de/, "") || "/";
    } else if (pathname.startsWith("/fr/") || pathname.startsWith("/fr")) {
      newPath = pathname.replace(/^\/fr/, "") || "/";
    } else if (pathname.startsWith("/en/") || pathname.startsWith("/en")) {
      newPath = pathname.replace(/^\/en/, "") || "/";
    }

    // Add new locale prefix (except for English at root)
    if (locale === "en") {
      router.push(newPath || "/");
    } else {
      router.push(`/${locale}${newPath}`);
    }

    setIsLangMenuOpen(false);
  };

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
          const sectionId = entry.target.id;
          setActive(`#${sectionId}`);
          
          // Emit section change event for mesh color updates
          const event = new CustomEvent("sectionchange", { detail: sectionId });
          window.dispatchEvent(event);
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

          {/* Language Separator */}
          <div className="w-px h-5 bg-zinc-700" />

          {/* Language Switcher */}
          <div className="relative">
            <motion.button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors px-2 py-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-lg">
                {languages.find((l) => l.code === currentLocale)?.flag}
              </span>
              <span className="hidden md:inline">
                {languages.find((l) => l.code === currentLocale)?.label}
              </span>
              <svg
                className={`w-4 h-4 transition-transform ${
                  isLangMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </motion.button>

            {/* Language Dropdown Menu */}
            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl overflow-hidden z-50"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`w-full px-4 py-2 text-sm font-medium text-left transition-colors flex items-center gap-2 whitespace-nowrap ${
                        currentLocale === lang.code
                          ? "bg-purple-900/50 text-white"
                          : "text-zinc-300 hover:bg-zinc-700 hover:text-white"
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      {lang.label}
                      {currentLocale === lang.code && (
                        <svg
                          className="w-4 h-4 ml-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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

                {/* Language Separator */}
                <div className="h-px bg-zinc-800" />

                {/* Mobile Language Switcher */}
                <div className="px-6 py-4">
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3">
                    Language
                  </p>
                  <div className="flex gap-2">
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code)}
                        className={`flex-1 px-3 py-2 rounded-lg font-medium text-sm transition-all ${
                          currentLocale === lang.code
                            ? "bg-purple-600 text-white"
                            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                        }`}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-base block mb-1">{lang.flag}</span>
                        {lang.label}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
