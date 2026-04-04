"use client";

import { Card, SectionGrid } from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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

  .approach-card {
    animation: approach-entry 0.6s ease-out;
    position: relative;
    transition: all 0.3s ease;
  }

  .approach-card:hover {
    transform: translateY(-4px);
    border-l-4 border-purple-500;
  }

  .step-circle {
    width: 48px;
    height: 48px;
    border: 2px solid #a855f7;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 700;
    color: #a855f7;
    flex-shrink: 0;
    background: rgba(168, 85, 247, 0.05);
    transition: all 0.3s ease;
  }

  .approach-card:hover .step-circle {
    background: rgba(168, 85, 247, 0.1);
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.3);
  }

  .approach-connector {
    position: absolute;
    top: 50%;
    left: -1.5rem;
    width: 1.5rem;
    height: 2px;
    border-top: 2px dashed rgba(168, 85, 247, 0.3);
  }

  .approach-card:first-child .approach-connector {
    display: none;
  }
`;

function ApproachCard(
  phase: { step: string; title: string; description: string },
  index: number
) {
  const { ref, className } = useScrollReveal({
    threshold: 0.2,
    delay: index * 100,
  });

  return (
    <div
      key={phase.step}
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-600 ${className}`}
      style={{
        animation: `approach-entry 0.6s ease-out ${index * 100}ms backwards`,
      }}
    >
      <Card className="approach-card relative">
        <div className="approach-connector" />
        <div className="flex items-start gap-4">
          {/* Step circle instead of emoji */}
          <div className="step-circle">{phase.step}</div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">
              {phase.title}
            </h3>
            <p className="text-sm text-zinc-300">{phase.description}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default function Approach() {
  const phases = [
    {
      step: "01",
      title: "Planning & Research",
      description:
        "Understanding requirements and designing scalable system architecture.",
    },
    {
      step: "02",
      title: "Development & Integration",
      description:
        "Building reliable, maintainable, and production-ready solutions.",
    },
    {
      step: "03",
      title: "Optimization & Deployment",
      description:
        "Performance tuning, testing, and delivering robust deployments.",
    },
  ];

  return (
    <>
      <style>{approachStyles}</style>
      <SectionGrid cols={3}>
        {phases.map((phase, index) => ApproachCard(phase, index))}
      </SectionGrid>
    </>
  );
}
