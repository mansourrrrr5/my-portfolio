"use client";

import { portfolioConfig } from "@/data/content";
import { Card, SectionGrid } from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonialStyles = `
  @keyframes star-pop {
    0% { transform: scale(0); opacity: 0; }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); opacity: 1; }
  }

  .star-animated {
    display: inline-block;
    animation: star-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  .testimonial-card {
    position: relative;
    transition: all 0.3s ease;
    transform-style: preserve-3d;
  }

  .testimonial-card:hover {
    transform: rotateX(5deg) rotateY(-5deg) translateZ(10px);
  }

  .quote-mark {
    position: absolute;
    top: -20px;
    left: 0;
    font-size: 8rem;
    font-weight: 900;
    opacity: 0.08;
    color: #a855f7;
    line-height: 1;
    pointer-events: none;
  }
`;

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
      <Card className="testimonial-card relative overflow-hidden will-change-transform">
        {/* Decorative quote mark */}
        <div className="quote-mark">"</div>

        {/* Stars with staggered animation */}
        <div className="flex gap-1 mb-3 relative z-10">
          {[...Array(5)].map((_, i) => (
            <span
              key={i}
              className="text-yellow-400 star-animated"
              style={{
                animation: `star-pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.1}s both`,
              }}
            >
              ★
            </span>
          ))}
        </div>
        <p className="text-zinc-300 text-sm italic mb-4 relative z-10">
          &quot;{testimonial.quote}&quot;
        </p>
        <div className="relative z-10">
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
    <>
      <style>{testimonialStyles}</style>
      <SectionGrid cols={2}>
        {portfolioConfig.testimonials.map((testimonial, index) =>
          TestimonialCard(testimonial, index)
        )}
      </SectionGrid>
    </>
  );
}
