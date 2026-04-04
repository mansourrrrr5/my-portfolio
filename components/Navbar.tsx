"use client";

import { useEffect, useState } from "react";

const navItems = [
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Experience", link: "#experience" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("#about");
  const [hasScrolled, setHasScrolled] = useState(false);

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

    // Handle scroll for blur intensification
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setHasScrolled(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial scroll position

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
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
  );
}
