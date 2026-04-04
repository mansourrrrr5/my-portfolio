"use client";

import { useEffect, useRef, useState } from "react";
import { portfolioConfig } from "@/data/content";
import { Card } from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SkillBarProps {
  skill: (typeof portfolioConfig.skills)[0];
  index: number;
}

function SkillBar({ skill, index }: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Determine proficiency percentage
  const proficiencyMap: Record<string, number> = {
    expert: 100,
    advanced: 80,
    intermediate: 60,
    familiar: 40,
  };

  const width = proficiencyMap[skill.proficiency || "familiar"] || 40;

  // Determine color and glow color based on proficiency
  const colorMap: Record<
    string,
    { bg: string; glow: string; shadow: string }
  > = {
    expert: {
      bg: "bg-purple-500",
      glow: "from-purple-500 to-purple-600",
      shadow: "0 0 12px rgba(168, 85, 247, 0.6)",
    },
    advanced: {
      bg: "bg-blue-500",
      glow: "from-blue-500 to-blue-600",
      shadow: "0 0 12px rgba(59, 130, 246, 0.6)",
    },
    intermediate: {
      bg: "bg-blue-400",
      glow: "from-blue-400 to-blue-500",
      shadow: "0 0 12px rgba(96, 165, 250, 0.5)",
    },
    familiar: {
      bg: "bg-zinc-600",
      glow: "from-zinc-600 to-zinc-700",
      shadow: "0 0 12px rgba(82, 82, 91, 0.4)",
    },
  };

  const colors =
    colorMap[skill.proficiency || "familiar"] ||
    colorMap["familiar"];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, []);

  // Staggered scroll reveal
  const { ref, className } = useScrollReveal({
    threshold: 0.3,
    delay: index * 50, // 50ms stagger per index
  });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-600 ${className}`}
    >
      <Card className="p-4 h-full flex flex-col justify-between">
        <p className="font-medium text-white text-sm">{skill.name}</p>
        <div className="mt-2 space-y-2">
          <div
            ref={barRef}
            className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden"
          >
            <div
              className={`h-2 rounded-full ${colors.bg} transition-all duration-1000 ease-out`}
              style={{
                width: isVisible ? `${width}%` : "0%",
                boxShadow: isVisible ? colors.shadow : "none",
              }}
            />
          </div>
          <p className="text-xs text-zinc-500 capitalize">
            {skill.proficiency || "familiar"}
          </p>
        </div>
      </Card>
    </div>
  );
}

export default function Skills() {
  // Group skills by category with proficiency
  const skillsByCategory = portfolioConfig.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof portfolioConfig.skills>
  );

  const categoryLabels: Record<string, { label: string; icon: string }> = {
    frontend: { label: "Frontend", icon: "🎨" },
    backend: { label: "Backend", icon: "⚙️" },
    ml: { label: "ML & AI", icon: "🤖" },
    devops: { label: "DevOps", icon: "🚀" },
    tools: { label: "Tools", icon: "🔧" },
  };

  let skillIndex = 0;

  return (
    <div className="space-y-8">
      {Object.entries(skillsByCategory)
        .sort()
        .map(([category, skills]) => {
          const { label, icon } = categoryLabels[category] || {
            label: category,
            icon: "💡",
          };

          return (
            <div key={category}>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <span>{icon}</span>
                {label}
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {skills.map((skill) => {
                  const currentIndex = skillIndex;
                  skillIndex++;
                  return (
                    <SkillBar key={skill.name} skill={skill} index={currentIndex} />
                  );
                })}
              </div>
            </div>
          );
        })}
    </div>
  );
}
