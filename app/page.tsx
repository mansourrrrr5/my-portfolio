import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import Approach from "@/components/Approach";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-50">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6">
        <Hero />

        <Section id="about" title="About Me">
          <About />
        </Section>

        <Section id="experience" title="My Work Experience">
          <Experience />
        </Section>

        <Section id="projects" title="A small selection of recent projects">
          <Projects />
        </Section>

        <Section id="testimonials" title="Kind words from kind people">
          <Testimonials />
        </Section>

        <Section id="approach" title="My approach">
          <Approach />
        </Section>

        <Section id="contact" title="Ready to take your digital presence to the next level?">
          <Contact />
        </Section>

        <footer className="py-10 text-sm text-zinc-500">
          Copyright © {new Date().getFullYear()} Aziz
        </footer>
      </div>
    </main>
  );
}
