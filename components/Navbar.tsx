"use client";

import { useEffect, useState } from "react";

const navItems = [
  { name: "About", link: "#about" },
  { name: "Experience", link: "#experience" },
  { name: "Projects", link: "#projects" },
  { name: "Testimonials", link: "#testimonials" },
  { name: "Contact", link: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) =>
        document.querySelector(item.link)
      );

      sections.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActive(navItems[index].link);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2">
      <div className="flex items-center gap-6 rounded-full border border-zinc-800 bg-zinc-900/70 px-8 py-3 backdrop-blur-xl shadow-lg">
        {navItems.map((item) => (
          <a
            key={item.link}
            href={item.link}
            className={`text-sm font-medium transition ${
              active === item.link
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            {item.name}
          </a>
        ))}
      </div>
    </div>
  );
}
