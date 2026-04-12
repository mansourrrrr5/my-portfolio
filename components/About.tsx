"use client";

import React from "react";
import { Card, Badge } from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useCountUp } from "@/hooks/useCountUp";
import type { PortfolioConfig } from "@/types";
import type { TranslationDict } from "@/messages/en";

interface AboutProps {
  config: PortfolioConfig;
  dict: TranslationDict;
}

function StatsSection({ dict }: { dict: TranslationDict }) {
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
            {dict.skills.stats.yearsLabel}
          </p>
        </Card>

        {/* Projects Stat */}
        <Card className="flex flex-col items-center justify-center p-6">
          <div className="text-3xl font-bold text-blue-400 mb-2">
            {projectsCount}
          </div>
          <p className="text-xs text-zinc-400 text-center">
            {dict.skills.stats.projectsLabel}
          </p>
        </Card>

        {/* Accuracy Stat */}
        <Card className="flex flex-col items-center justify-center p-6">
          <div className="text-3xl font-bold text-cyan-400 mb-2">
            {accuracyCount}
            <span className="text-2xl">%</span>
          </div>
          <p className="text-xs text-zinc-400 text-center">
            {dict.skills.stats.accuracyLabel}
          </p>
        </Card>
      </div>
    </div>
  );
}

export default function About({ config, dict }: AboutProps) {
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
      <StatsSection dict={dict} />

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
                  {dict.about.description}
                </p>
                {dict.about.story.map((paragraph, index) => (
                  <p key={index} className="text-zinc-400 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
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
                {dict.skills.keySkills}
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
