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
      box-shadow: 0 0 0 rgba(59, 130, 246, 0.2);
    }
    50% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
    }
  }

  @keyframes gradient-fade {
    0% {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(34, 197, 94, 0.02) 100%);
    }
    50% {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.1) 30%, rgba(34, 197, 94, 0.08) 60%, rgba(251, 146, 60, 0.12) 100%);
    }
    100% {
      background: linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(34, 197, 94, 0.02) 100%);
    }
  }

  .approach-card {
    animation: approach-entry 0.6s ease-out;
    position: relative;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
  }

  .approach-card:hover {
    transform: translateY(-6px);
    animation: gradient-fade 3s ease-in-out infinite;
  }

  /* Card 1 - Blue */
  .approach-card-1 { background: linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(96, 165, 250, 0.02) 100%); }
  .approach-card-1:hover { border-left-color: #3b82f6; box-shadow: 0 12px 30px rgba(59, 130, 246, 0.15); }
  .approach-card-1 .step-circle { background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(96, 165, 250, 0.1) 100%); border: 2px solid rgba(59, 130, 246, 0.6); color: #93c5fd; }
  .approach-card-1:hover .step-circle { background: linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(96, 165, 250, 0.3) 100%); border-color: #3b82f6; box-shadow: 0 0 20px rgba(59, 130, 246, 0.4); transform: scale(1.1); }
  .approach-card-1 .approach-subtitle { color: #93c5fd; }
  .approach-card-1 .focus-tag { background: rgba(59, 130, 246, 0.1); border-color: rgba(59, 130, 246, 0.3); color: #93c5fd; }
  .approach-card-1:hover .focus-tag { background: rgba(59, 130, 246, 0.2); border-color: rgba(59, 130, 246, 0.6); }

  /* Card 2 - Cyan */
  .approach-card-2 { background: linear-gradient(135deg, rgba(6, 182, 212, 0.03) 0%, rgba(34, 211, 238, 0.02) 100%); }
  .approach-card-2:hover { border-left-color: #06b6d4; box-shadow: 0 12px 30px rgba(6, 182, 212, 0.15); }
  .approach-card-2 .step-circle { background: linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(34, 211, 238, 0.1) 100%); border: 2px solid rgba(6, 182, 212, 0.6); color: #67e8f9; }
  .approach-card-2:hover .step-circle { background: linear-gradient(135deg, rgba(6, 182, 212, 0.4) 0%, rgba(34, 211, 238, 0.3) 100%); border-color: #06b6d4; box-shadow: 0 0 20px rgba(6, 182, 212, 0.4); transform: scale(1.1); }
  .approach-card-2 .approach-subtitle { color: #67e8f9; }
  .approach-card-2 .focus-tag { background: rgba(6, 182, 212, 0.1); border-color: rgba(6, 182, 212, 0.3); color: #67e8f9; }
  .approach-card-2:hover .focus-tag { background: rgba(6, 182, 212, 0.2); border-color: rgba(6, 182, 212, 0.6); }

  /* Card 3 - Emerald */
  .approach-card-3 { background: linear-gradient(135deg, rgba(34, 197, 94, 0.03) 0%, rgba(16, 185, 129, 0.02) 100%); }
  .approach-card-3:hover { border-left-color: #10b981; box-shadow: 0 12px 30px rgba(34, 197, 94, 0.15); }
  .approach-card-3 .step-circle { background: linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%); border: 2px solid rgba(34, 197, 94, 0.6); color: #6ee7b7; }
  .approach-card-3:hover .step-circle { background: linear-gradient(135deg, rgba(34, 197, 94, 0.4) 0%, rgba(16, 185, 129, 0.3) 100%); border-color: #10b981; box-shadow: 0 0 20px rgba(34, 197, 94, 0.4); transform: scale(1.1); }
  .approach-card-3 .approach-subtitle { color: #6ee7b7; }
  .approach-card-3 .focus-tag { background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.3); color: #6ee7b7; }
  .approach-card-3:hover .focus-tag { background: rgba(34, 197, 94, 0.2); border-color: rgba(34, 197, 94, 0.6); }

  /* Card 4 - Amber */
  .approach-card-4 { background: linear-gradient(135deg, rgba(251, 146, 60, 0.03) 0%, rgba(245, 158, 11, 0.02) 100%); }
  .approach-card-4:hover { border-left-color: #f59e0b; box-shadow: 0 12px 30px rgba(251, 146, 60, 0.15); }
  .approach-card-4 .step-circle { background: linear-gradient(135deg, rgba(251, 146, 60, 0.2) 0%, rgba(245, 158, 11, 0.1) 100%); border: 2px solid rgba(251, 146, 60, 0.6); color: #fde047; }
  .approach-card-4:hover .step-circle { background: linear-gradient(135deg, rgba(251, 146, 60, 0.4) 0%, rgba(245, 158, 11, 0.3) 100%); border-color: #f59e0b; box-shadow: 0 0 20px rgba(251, 146, 60, 0.4); transform: scale(1.1); }
  .approach-card-4 .approach-subtitle { color: #fde047; }
  .approach-card-4 .focus-tag { background: rgba(251, 146, 60, 0.1); border-color: rgba(251, 146, 60, 0.3); color: #fde047; }
  .approach-card-4:hover .focus-tag { background: rgba(251, 146, 60, 0.2); border-color: rgba(251, 146, 60, 0.6); }

  .step-circle {
    width: 56px;
    height: 56px;
    min-width: 56px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 700;
    flex-shrink: 0;
    transition: all 0.3s ease;
  }

  .approach-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: #f5f5f4;
    margin-bottom: 0.5rem;
  }

  .approach-subtitle {
    font-size: 0.8rem;
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
    border-radius: 0.375rem;
    font-weight: 500;
    transition: all 0.2s ease;
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

  const cardColorClasses = [
    "approach-card-1", // Blue
    "approach-card-2", // Cyan
    "approach-card-3", // Emerald
    "approach-card-4", // Amber
  ];

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
      <Card className={`approach-card ${cardColorClasses[index]} relative h-full`}>
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

