"use client";

import { ReactNode, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useInView } from "framer-motion";

export default function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  const { ref, className } = useScrollReveal({ threshold: 0.5 });
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, {
    margin: "-20% 0px -20% 0px",
    once: false,
  });

  return (
    <section 
      id={id} 
      ref={sectionRef}
      className="scroll-mt-24 py-10"
      style={{
        opacity: isInView ? 1 : 0.3,
        filter: isInView ? "blur(0px) scale(1)" : "blur(2px) scale(0.98)",
        transition: "opacity 0.5s ease-out, filter 0.5s ease-out",
        willChange: "opacity, transform",
      }}
    >
      <h2
        ref={ref as React.RefObject<HTMLHeadingElement>}
        className={`text-xl font-semibold mb-2 transition-all duration-600 ${className}`}
      >
        {title}
      </h2>
      <div className="mb-8">{children}</div>
    </section>
  );
}
