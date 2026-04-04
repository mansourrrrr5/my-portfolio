"use client";

import { Suspense, lazy } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { Container } from "@/components/ui/Card";

// Lazy load non-critical sections
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Approach = lazy(() => import("@/components/Approach"));

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

const meshStyles = `
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
`;

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50 relative overflow-hidden">
      <style>{meshStyles}</style>
      
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="mesh-1 absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px] opacity-10 md:opacity-5" />
        <div className="mesh-2 absolute top-1/3 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-[120px] opacity-10 md:opacity-5" />
        <div className="mesh-3 absolute bottom-1/4 left-1/3 w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-10 md:opacity-5" />
        <div className="mesh-4 absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-600 rounded-full blur-[120px] opacity-10 md:opacity-5" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <Container>
          <Hero />

          <Section id="about" title="About Me">
            <About />
          </Section>

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

          <footer className="py-10 text-sm text-zinc-500 text-center border-t border-zinc-800 mt-20">
            <p>
              © {new Date().getFullYear()} Aziz. Built with Next.js, React & TailwindCSS.
            </p>
          </footer>
        </Container>
      </div>
    </main>
  );
}
