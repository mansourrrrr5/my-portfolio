"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import type { PortfolioConfig } from "@/types";

interface ExperienceProps {
  config: PortfolioConfig;
}

const pulseStyles = `
  @keyframes timeline-pulse {
    0% {
      transform: scale(1);
      opacity: 1;
      box-shadow: 0 0 0 0 rgba(168, 85, 247, 0.7);
    }
    50% {
      transform: scale(1.2);
      opacity: 0.7;
    }
    100% {
      transform: scale(1);
      opacity: 1;
      box-shadow: 0 0 0 0 rgba(168, 85, 247, 0);
    }
  }
  
  .timeline-pulse {
    animation: timeline-pulse 2s infinite;
  }

  @keyframes timeline-entry-appear {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .timeline-entry-animate {
    animation: timeline-entry-appear 0.6s ease-out forwards;
  }

  .experience-card-hover {
    transition: all 0.3s ease;
  }

  .experience-card-hover:hover {
    border-left: 4px solid #a855f7;
    transform: translateX(4px);
  }
`;

export default function Experience({ config }: ExperienceProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Check if experience is current (has "Present" in period)
  const isCurrentExperience = (period: string) => {
    return period.toLowerCase().includes("present");
  };

  return (
    <>
      <style>{pulseStyles}</style>
      <div className="relative space-y-8 md:space-y-12" ref={sectionRef}>
        {/* Animated vertical timeline line */}
        <motion.div
          className="absolute left-4 md:left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-blue-500 to-zinc-600"
          style={{ scaleY, transformOrigin: "top" }}
        />

        {/* Experience entries */}
        {config.experiences.map((exp, index) => {
          const isCurrent = isCurrentExperience(exp.period);

          return (
            <div
              key={exp.id}
              className="relative pl-16 md:pl-20 transition-all duration-600"
            >
              {/* Timeline dot/connector */}
              <motion.div
                className="absolute -left-6 md:-left-8 top-0 w-7 h-7 md:w-8 md:h-8"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                viewport={{ once: true }}
              >
                <div
                  className={`w-full h-full rounded-full border-4 border-zinc-900 bg-purple-500 flex items-center justify-center ${
                    isCurrent ? "timeline-pulse" : ""
                  }`}
                >
                  {isCurrent && (
                    <div className="w-2 h-2 bg-white rounded-full" />
                  )}
                </div>
              </motion.div>

              {/* Content card with hover effect */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 hover:border-zinc-700 transition-colors experience-card-hover">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                  <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                  <span
                    className={`text-sm whitespace-nowrap ${
                      isCurrent ? "text-purple-400 font-medium" : "text-zinc-400"
                    }`}
                  >
                    {exp.period}
                  </span>
                </div>

                <p className="text-sm text-zinc-300 mb-1 font-medium">
                  {exp.company}
                </p>

                {exp.location && (
                  <p className="text-xs text-zinc-500 mb-3">{exp.location}</p>
                )}

                <p className="text-zinc-300 mb-4">{exp.description}</p>

                {exp.highlights && exp.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {exp.highlights.map((highlight, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-zinc-400 flex gap-2"
                      >
                        <span className="text-purple-400 flex-shrink-0">→</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
