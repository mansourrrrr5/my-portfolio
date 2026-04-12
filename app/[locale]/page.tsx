"use client";

import { Suspense, lazy, useEffect, useState, useRef } from "react";
import { getPortfolioConfig } from "@/data/getPortfolioConfig";
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
import { motion } from "framer-motion";
import { getDictionary } from "@/lib/i18n";
import type { TranslationDict } from "@/messages/en";
import type { PortfolioConfig } from "@/types";

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

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default function Page({ params }: PageProps) {
  const [contentOpacity, setContentOpacity] = useState(0);
  const [dict, setDict] = useState<TranslationDict | null>(null);
  const [portfolioConfig, setPortfolioConfig] = useState<PortfolioConfig | null>(null);
  const heroRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const [maskWipeProgress, setMaskWipeProgress] = useState<any>("100%");
  const [isClient, setIsClient] = useState(false);

  // Load dictionary and portfolio config based on locale
  useEffect(() => {
    params.then(async (resolvedParams) => {
      const [loadedDict, loadedConfig] = await Promise.all([
        getDictionary(resolvedParams.locale),
        getPortfolioConfig(resolvedParams.locale),
      ]);
      setDict(loadedDict);
      setPortfolioConfig(loadedConfig);
    });
  }, [params]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Manual scroll listener for mask wipe effect
  useEffect(() => {
    if (!isClient || !heroRef.current) return;

    const handleScroll = () => {
      if (!heroRef.current) return;
      
      const heroElement = heroRef.current as HTMLElement;
      const scrollY = window.scrollY;
      const heroBottom = heroElement.offsetHeight;
      
      // Calculate progress from 0 to 1
      const progress = Math.min(Math.max((scrollY - heroBottom * 0.7) / (heroBottom * 0.3), 0), 1);
      
      // Convert to percentage string for clipPath
      const clipPathValue = `${(1 - progress) * 100}%`;
      setMaskWipeProgress(clipPathValue);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

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

  if (!dict || !portfolioConfig) {
    return null;
  }

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

        {/* Hero Section */}
        <div ref={heroRef} className="relative" style={{ height: "auto" }}>
          <Hero config={portfolioConfig} dict={dict} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          <Navbar dict={dict} />
          <Container>

            {isClient ? (
              <motion.div
                ref={aboutSectionRef}
                style={{
                  clipPath: maskWipeProgress,
                }}
              >
                <Section id="about" title={dict.about.title}>
                  <About config={portfolioConfig} dict={dict} />
                </Section>
              </motion.div>
            ) : (
              <Section id="about" title={dict.about.title}>
                <About config={portfolioConfig} dict={dict} />
              </Section>
            )}

            <Section id="skills" title={dict.skills.title}>
              <Skills config={portfolioConfig} dict={dict} />
            </Section>

            <Section id="experience" title={dict.experience.title}>
              <Experience config={portfolioConfig} />
            </Section>

            <Section id="projects" title={dict.projects.title}>
              <Projects config={portfolioConfig} />
            </Section>

            <Section id="testimonials" title={dict.testimonials.title}>
              <Suspense fallback={<SectionSkeleton />}>
                <Testimonials config={portfolioConfig} />
              </Suspense>
            </Section>

            <Section id="approach" title={dict.approach.title}>
              <Suspense fallback={<SectionSkeleton />}>
                <Approach dict={dict} />
              </Suspense>
            </Section>

            <Section id="contact" title={dict.contact.title}>
              <Contact config={portfolioConfig} dict={dict} />
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
