"use client";

import React from "react";
import { Card, Badge } from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import type { PortfolioConfig } from "@/types";

interface AboutProps {
  config: PortfolioConfig;
}

function StatsSection() {
  const { ref, className } = useScrollReveal({
    threshold: 0.3,
    delay: 50,
  });

  const yearsCount = useCountUp(2, 1000);
  const projectsCount = useCountUp(3, 1000);
  const accuracyCount = useCountUp(95, 1000);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-600 ${className}`}
    >
      <div className="grid grid-cols-3 gap-4">
        {/* Experience Stat */}
        <Card className="flex flex-col items-center justify-center p-6">
          <div className="text-3xl font-bold text-purple-400 mb-2">
            {yearsCount}
            <span className="text-2xl">+</span>
          </div>
          <p className="text-xs text-zinc-400 text-center">
            Years Experience
          </p>
        </Card>

        {/* Projects Stat */}
        <Card className="flex flex-col items-center justify-center p-6">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {projectsCount}
          </div>
          <p className="text-xs text-zinc-400 text-center">
            Projects Shipped
          </p>
        </Card>

        {/* Accuracy Stat */}
        <Card className="flex flex-col items-center justify-center p-6">
          <div className="text-3xl font-bold text-cyan-400 mb-2">
            {accuracyCount}
            <span className="text-2xl">%</span>
          </div>
          <p className="text-xs text-zinc-400 text-center">
            Model Accuracy
          </p>
        </Card>
      </div>
    </div>
  );
}

export default function About({ config }: AboutProps) {
  const { ref: textRef, className: textClassName } = useScrollReveal({
    threshold: 0.3,
  });
  const { ref: skillsRef, className: skillsClassName } = useScrollReveal({
    threshold: 0.3,
    delay: 100,
  });

  // Group skills by category
  const skillsByCategory = config.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof config.skills>
  );

  return (
    <div className="w-full flex flex-col gap-8">
      {/* Stats Row */}
      <StatsSection />

      <div className="flex flex-col md:flex-row gap-8">
        {/* Text Section */}
        <div className="flex-1">
          <div
            ref={textRef as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-600 ${textClassName}`}
          >
            <Card>
              <div className="flex flex-col gap-4">
                <p className="text-zinc-300 text-lg leading-relaxed">
                  {config.description}
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  I currently work as a Working Student IT in Robotics R&D at
                  Swisslog, where I contribute to innovative automation projects
                  and collaborate with talented engineers on real-world challenges.
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  For my Bachelor thesis, I integrated YOLO-based object detection
                  into the SweetPicker robotic system, enabling real-time vision
                  and smarter automation for industrial robotics. Passionate about
                  leveraging AI to solve complex problems.
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Skills Section */}
        <div className="flex-1">
          <div
            ref={skillsRef as React.RefObject<HTMLDivElement>}
            className={`transition-all duration-600 ${skillsClassName}`}
          >
            <Card>
              <h3 className="text-zinc-200 text-base font-semibold mb-4 tracking-wide uppercase">
                Key Skills
              </h3>
              <div className="space-y-4">
                {Object.entries(skillsByCategory)
                  .sort()
                  .map(([category, skills]) => (
                    <div key={category}>
                      <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
                        {category}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <Badge
                            key={skill.name}
                            variant={
                              skill.proficiency === "expert"
                                ? "primary"
                                : skill.proficiency === "advanced"
                                  ? "secondary"
                                  : "default"
                            }
                          >
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
