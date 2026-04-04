"use client";

import { portfolioConfig } from "@/data/content";
import { Card, SectionGrid } from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function TestimonialCard(
  testimonial: (typeof portfolioConfig.testimonials)[0],
  index: number
) {
  const { ref, className } = useScrollReveal({
    threshold: 0.2,
    delay: index * 80,
  });

  return (
    <div
      key={testimonial.id}
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-600 ${className}`}
    >
      <Card>
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400">
              ★
            </span>
          ))}
        </div>
        <p className="text-zinc-300 text-sm italic mb-4">
          &quot;{testimonial.quote}&quot;
        </p>
        <div>
          <p className="font-semibold text-white text-sm">
            {testimonial.name}
          </p>
          <p className="text-xs text-zinc-400">
            {testimonial.role}
            {testimonial.company && ` at ${testimonial.company}`}
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function Testimonials() {
  return (
    <SectionGrid cols={2}>
      {portfolioConfig.testimonials.map((testimonial, index) =>
        TestimonialCard(testimonial, index)
      )}
    </SectionGrid>
  );
}
