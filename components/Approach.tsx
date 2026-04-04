"use client";

import { Card, SectionGrid } from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function ApproachCard(
  phase: { step: string; title: string; description: string; icon: string },
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
    >
      <Card>
        <div className="flex items-start gap-4">
          <div className="text-3xl">{phase.icon}</div>
          <div className="flex-1">
            <div className="text-xs text-zinc-500 mb-1">Step {phase.step}</div>
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
      icon: "📋",
    },
    {
      step: "02",
      title: "Development & Integration",
      description:
        "Building reliable, maintainable, and production-ready solutions.",
      icon: "⚙️",
    },
    {
      step: "03",
      title: "Optimization & Deployment",
      description:
        "Performance tuning, testing, and delivering robust deployments.",
      icon: "🚀",
    },
  ];

  return (
    <SectionGrid cols={3}>
      {phases.map((phase, index) => ApproachCard(phase, index))}
    </SectionGrid>
  );
}
