"use client";

import { Card, SectionGrid } from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { motion } from "framer-motion";

const approachStyles = `
  @keyframes approach-entry {
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes glow-pulse {
    0%, 100% {
      box-shadow: 0 0 0 rgba(168, 85, 247, 0.2);
    }
    50% {
      box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
    }
  }

  .approach-card {
    animation: approach-entry 0.6s ease-out;
    position: relative;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.03) 0%, rgba(96, 165, 250, 0.02) 100%);
  }

  .approach-card:hover {
    transform: translateY(-6px);
    border-left-color: #a855f7;
    box-shadow: 0 12px 30px rgba(168, 85, 247, 0.15);
  }

  .step-circle {
    width: 56px;
    height: 56px;
    min-width: 56px;
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.2) 0%, rgba(96, 165, 250, 0.1) 100%);
    border: 2px solid rgba(168, 85, 247, 0.6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    color: #d8b4fe;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  .approach-card:hover .step-circle {
    background: linear-gradient(135deg, rgba(168, 85, 247, 0.4) 0%, rgba(96, 165, 250, 0.3) 100%);
    border-color: #a855f7;
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.4);
    transform: scale(1.1);
  }

  .approach-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #f5f5f4;
    margin-bottom: 0.5rem;
  }

  .approach-subtitle {
    font-size: 0.8rem;
    color: #a1a1a0;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.75rem;
    font-weight: 500;
  }

  .approach-description {
    font-size: 0.95rem;
    color: #d4d4d8;
    line-height: 1.6;
    margin-bottom: 0.75rem;
  }

  .approach-focus {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 1rem;
  }

  .focus-tag {
    font-size: 0.75rem;
    padding: 0.35rem 0.75rem;
    background: rgba(168, 85, 247, 0.1);
    border: 1px solid rgba(168, 85, 247, 0.3);
    border-radius: 0.375rem;
    color: #d8b4fe;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .approach-card:hover .focus-tag {
    background: rgba(168, 85, 247, 0.2);
    border-color: rgba(168, 85, 247, 0.6);
  }
`;

interface ApproachPhase {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  focus: string[];
}

function ApproachCard(phase: ApproachPhase, index: number) {
  const { ref, className } = useScrollReveal({
    threshold: 0.2,
    delay: index * 100,
  });

  return (
    <motion.div
      key={phase.step}
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-600 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <Card className="approach-card relative h-full">
        <div className="flex gap-4">
          {/* Step circle */}
          <div className="step-circle">{phase.step}</div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="approach-subtitle">{phase.subtitle}</div>
            <h3 className="approach-title">{phase.title}</h3>
            <p className="approach-description">{phase.description}</p>

            {/* Focus tags */}
            {phase.focus.length > 0 && (
              <div className="approach-focus">
                {phase.focus.map((tag) => (
                  <span key={tag} className="focus-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function Approach() {
  const phases: ApproachPhase[] = [
    {
      step: "01",
      subtitle: "Foundation",
      title: "Understand the Problem",
      description:
        "Every project starts with clarity. Before writing code, I focus on understanding the real problem, the goals of the system, and the constraints involved. A clear understanding early on helps avoid unnecessary complexity and leads to better technical decisions later.",
      focus: ["Requirements Analysis", "System Constraints", "Edge Cases"],
    },
    {
      step: "02",
      subtitle: "Design Thoughtful Solutions",
      title: "Design with Scalability",
      description:
        "Once the problem is clear, I think about the structure of the solution. This includes choosing appropriate technologies, designing a maintainable architecture, and considering scalability from the beginning.",
      focus: ["Scalable Architecture", "Performance First", "Maintainability"],
    },
    {
      step: "03",
      subtitle: "Implementation",
      title: "Build & Integrate Carefully",
      description:
        "During development, I focus on writing clean, readable, and reliable code. Good implementation is not only about making something work, but also ensuring it can be understood, extended, and maintained over time.",
      focus: ["Production Code", "Clean Integration", "Reliability"],
    },
    {
      step: "04",
      subtitle: "Refinement",
      title: "Optimize, Test & Deploy",
      description:
        "Once built, continuous refinement is essential. I test thoroughly, benchmark performance, optimize bottlenecks, and ensure the solution is robust and ready for production. This iterative approach catches issues early and delivers solutions that actually work at scale.",
      focus: ["Performance Tuning", "Comprehensive Testing", "Deployment Ready"],
    },
  ];

  return (
    <>
      <style>{approachStyles}</style>
      <SectionGrid cols={2}>
        {phases.map((phase, index) => ApproachCard(phase, index))}
      </SectionGrid>
    </>
  );
}

