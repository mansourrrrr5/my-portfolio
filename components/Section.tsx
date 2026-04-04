"use client";

import { ReactNode } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

  return (
    <section id={id} className="scroll-mt-24 py-10">
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
