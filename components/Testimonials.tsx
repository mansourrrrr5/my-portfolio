"use client";

import type { PortfolioConfig, Testimonial } from "@/types";
import type { TranslationDict } from "@/messages/en";
import { Card, SectionGrid } from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface TestimonialsProps {
  config: PortfolioConfig;
  dict: TranslationDict;
}

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

  /* Carousel dot indicators */
  .carousel-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: rgba(161, 161, 170, 0.5);
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .carousel-dot.active {
    background-color: #a855f7;
    width: 24px;
    border-radius: 4px;
  }
`;

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
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

function CarouselTestimonial({
  testimonial,
  isActive,
}: {
  testimonial: Testimonial;
  isActive: boolean;
}) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={testimonial.id}
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Card className="testimonial-card relative overflow-hidden will-change-transform h-full">
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Testimonials({ config, dict }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    if (isHovering) return; // Pause on hover

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % config.testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovering]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      <style>{testimonialStyles}</style>
      {/* Mobile Carousel (under md: 768px) */}
      <div className="md:hidden w-full">
        <div
          className="relative w-full h-[280px] md:h-auto"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Carousel container */}
          <div className="relative h-full">
            {config.testimonials.map((testimonial, index) => (
              <CarouselTestimonial
                key={testimonial.id}
                testimonial={testimonial}
                isActive={index === currentIndex}
              />
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-6">
          {config.testimonials.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Desktop Grid (md and above) */}
      <div className="hidden md:block">
        <SectionGrid cols={2}>
          {config.testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
              index={index}
            />
          ))}
        </SectionGrid>
      </div>
    </>
  );
}
