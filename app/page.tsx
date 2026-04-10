"use client";

import { Suspense, lazy, useEffect, useState, useRef } from "react";
import { portfolioConfig } from "@/data/content";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import LoadingScreen from "@/components/LoadingScreen";
import { Container } from "@/components/ui/Card";
import { motion, useScroll, useTransform } from "framer-motion";

// Lazy load non-critical sections
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Approach = lazy(() => import("@/components/Approach"));

// Color map for mesh transitions per section
const sectionColorMap: Record<string, { primary: string; secondary: string }> = {
  hero: { primary: "rgb(168, 85, 247)", secondary: "rgb(139, 92, 246)" }, // purple
  about: { primary: "rgb(59, 130, 246)", secondary: "rgb(96, 165, 250)" }, // blue
  skills: { primary: "rgb(20, 184, 166)", secondary: "rgb(45, 212, 191)" }, // teal
  experience: { primary: "rgb(168, 85, 247)", secondary: "rgb(139, 92, 246)" }, // purple
  projects: { primary: "rgb(59, 130, 246)", secondary: "rgb(96, 165, 250)" }, // blue
  contact: { primary: "rgb(168, 85, 247)", secondary: "rgb(139, 92, 246)" }, // purple
};

// Skeleton loader component
function SectionSkeleton() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-zinc-800 rounded-lg w-1/3 animate-pulse" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 bg-zinc-800 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

// Animated mesh component that delays animations until Hero mounts
function AnimatedMesh() {
  const [isAnimating, setIsAnimating] = useState(false);
  const [meshColor1, setMeshColor1] = useState("rgb(168, 85, 247)");
  const [meshColor2, setMeshColor2] = useState("rgb(139, 92, 246)");

  useEffect(() => {
    // Delay animation start to avoid blocking Hero render
    const timer = requestAnimationFrame(() => {
      setIsAnimating(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  // Listen for active section changes
  useEffect(() => {
    const handleSectionChange = (event: CustomEvent) => {
      const sectionId = event.detail;
      const colors = sectionColorMap[sectionId] || sectionColorMap.hero;
      setMeshColor1(colors.primary);
      setMeshColor2(colors.secondary);
    };

    window.addEventListener("sectionchange", handleSectionChange as EventListener);
    return () => window.removeEventListener("sectionchange", handleSectionChange as EventListener);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div
        className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] opacity-10 md:opacity-5 transition-all ${
          isAnimating ? "mesh-1" : ""
        }`}
        style={{
          backgroundColor: meshColor1,
          transitionProperty: "background-color",
          transitionDuration: "1.5s",
          transitionTimingFunction: "ease",
        }}
      />
      <div
        className={`absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-[120px] opacity-10 md:opacity-5 transition-all ${
          isAnimating ? "mesh-2" : ""
        }`}
        style={{
          backgroundColor: meshColor2,
          transitionProperty: "background-color",
          transitionDuration: "1.5s",
          transitionTimingFunction: "ease",
        }}
      />
      <div
        className={`absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full blur-[120px] opacity-10 md:opacity-5 transition-all ${
          isAnimating ? "mesh-3" : ""
        }`}
        style={{
          backgroundColor: meshColor1,
          transitionProperty: "background-color",
          transitionDuration: "1.5s",
          transitionTimingFunction: "ease",
        }}
      />
      <div
        className={`absolute bottom-1/3 right-1/3 w-80 h-80 rounded-full blur-[120px] opacity-10 md:opacity-5 transition-all ${
          isAnimating ? "mesh-4" : ""
        }`}
        style={{
          backgroundColor: meshColor2,
          transitionProperty: "background-color",
          transitionDuration: "1.5s",
          transitionTimingFunction: "ease",
        }}
      />
    </div>
  );
}

export default function Page() {
  const [contentOpacity, setContentOpacity] = useState(0);
  const heroRef = useRef(null);
  const aboutSectionRef = useRef(null);

  // Mask wipe effect from hero to about
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const maskWipeProgress = useTransform(scrollYProgress, [0.7, 1], ["100%", "0%"]);

  useEffect(() => {
    // Check if loading screen was shown
    const hasVisited = sessionStorage.getItem("visited");
    if (hasVisited) {
      // If already visited, show content immediately
      setContentOpacity(1);
    } else {
      // Otherwise fade in after loading screen completes (1.2s + 0.6s = 1.8s)
      const timer = setTimeout(() => setContentOpacity(1), 1800);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 relative overflow-hidden">
      <LoadingScreen />
      
      <div style={{ opacity: contentOpacity, transition: "opacity 0.5s ease-out" }}>
        <style>{`
          @keyframes mesh-drift-1 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(30px, 15px); }
          }
          @keyframes mesh-drift-2 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-25px, 20px); }
          }
          @keyframes mesh-drift-3 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(20px, -30px); }
          }
          @keyframes mesh-drift-4 {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(-15px, -25px); }
          }
          
          .mesh-1 { animation: mesh-drift-1 12s ease-in-out infinite; }
          .mesh-2 { animation: mesh-drift-2 10s ease-in-out infinite; }
          .mesh-3 { animation: mesh-drift-3 11s ease-in-out infinite; }
          .mesh-4 { animation: mesh-drift-4 9s ease-in-out infinite; }
        `}</style>
        
        {/* Animated Background Mesh */}
        <AnimatedMesh />

        {/* Content */}
        <div className="relative z-10">
          <Navbar />
          <Container>
            <div ref={heroRef} className="sticky top-0 z-20 bg-zinc-950" style={{ height: "auto" }}>
              <Hero />
            </div>

            <motion.div
              ref={aboutSectionRef}
              style={{
                clipPath: maskWipeProgress,
              }}
            >
              <Section id="about" title="About Me">
                <About />
              </Section>
            </motion.div>

          <Section id="skills" title="Skills & Expertise">
            <Skills />
          </Section>

          <Section id="experience" title="My Work Experience">
            <Experience />
          </Section>

          <Section id="projects" title="Featured Projects">
            <Projects />
          </Section>

          <Section id="testimonials" title="What Others Say">
            <Suspense fallback={<SectionSkeleton />}>
              <Testimonials />
            </Suspense>
          </Section>

          <Section id="approach" title="My Approach">
            <Suspense fallback={<SectionSkeleton />}>
              <Approach />
            </Suspense>
          </Section>

          <Section id="contact" title="Let's Connect">
            <Contact />
          </Section>
        </Container>
      </div>

      {/* Footer */}
      <footer className="flex items-center justify-center py-8 text-sm text-zinc-500 border-t border-zinc-800 bg-zinc-950">
        Copyright © 2026 Mohamed Aziz Mansour
      </footer>
      </div>
    </main>
  );
}
