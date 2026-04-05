"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { portfolioConfig } from "@/data/content";
import { Card } from "@/components/ui/Card";

// CSS animations for skill enhancements
const skillStyles = `
  @keyframes shimmer-sweep {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  .progress-shimmer::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    height: 100%;
    width: 40%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: shimmer-sweep 2s ease-in-out 1;
  }

  .skill-card-glow {
    transition: box-shadow 0.3s ease;
  }

  .skill-card-glow.glow-purple {
    box-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
  }

  .skill-card-glow.glow-blue {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
  }

  .skill-card-wrapper {
    position: relative;
  }

  .skill-tooltip-container {
    position: relative;
    height: 100%;
  }

  .skill-tooltip {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.95);
    color: white;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    z-index: 20;
    border: 1px solid rgba(168, 85, 247, 0.3);
  }

  .skill-tooltip-percentage {
    font-weight: 700;
    color: #a855f7;
  }

  .skill-tooltip-description {
    display: block;
    font-size: 11px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 2px;
  }

  .skill-card-wrapper:hover .skill-tooltip {
    opacity: 1;
  }
`;

interface SkillBarProps {
  skill: (typeof portfolioConfig.skills)[0];
  index: number;
}

function SkillBar({ skill, index }: SkillBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef(null);
  const isInView = useInView(itemRef, { once: true, margin: "-80px" });

  // Determine proficiency percentage
  const proficiencyMap: Record<string, number> = {
    expert: 100,
    advanced: 80,
    intermediate: 60,
    familiar: 40,
  };

  const proficiencyDescriptions: Record<string, string> = {
    expert: "Used daily in production",
    advanced: "Built real projects with this",
    intermediate: "Comfortable with core concepts",
    familiar: "Learning actively",
  };

  const width = proficiencyMap[skill.proficiency || "familiar"] || 40;
  const description = proficiencyDescriptions[skill.proficiency || "familiar"] || "Learning actively";

  // Determine color and glow color based on proficiency
  const colorMap: Record<
    string,
    { bg: string; glow: string; shadow: string; neon: string }
  > = {
    expert: {
      bg: "bg-purple-500",
      glow: "from-purple-500 to-purple-600",
      shadow: "0 0 12px rgba(168, 85, 247, 0.6)",
      neon: "glow-purple",
    },
    advanced: {
      bg: "bg-blue-500",
      glow: "from-blue-500 to-blue-600",
      shadow: "0 0 12px rgba(59, 130, 246, 0.6)",
      neon: "glow-blue",
    },
    intermediate: {
      bg: "bg-blue-400",
      glow: "from-blue-400 to-blue-500",
      shadow: "0 0 12px rgba(96, 165, 250, 0.5)",
      neon: "glow-blue",
    },
    familiar: {
      bg: "bg-zinc-600",
      glow: "from-zinc-600 to-zinc-700",
      shadow: "0 0 12px rgba(82, 82, 91, 0.4)",
      neon: "",
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

  useEffect(() => {
    if (isVisible && progressRef.current) {
      const timer = setTimeout(() => {
        if (progressRef.current) {
          progressRef.current.classList.add("progress-shimmer");
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.div
      ref={itemRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={itemVariants}
    >
      <div
        className={`skill-card-wrapper relative ${isHovering ? colors.neon : ""} skill-card-glow`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Card className="p-4 h-full flex flex-col justify-between">
          <div>
            <p className="font-medium text-white text-sm">{skill.name}</p>
          </div>
          <div className="mt-2 space-y-2 relative">
            {/* Tooltip */}
            <div className="skill-tooltip">
              <span className="skill-tooltip-percentage">{width}%</span>
              <span className="skill-tooltip-description">{description}</span>
            </div>

            {/* Progress bar */}
            <div
              ref={barRef}
              className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden relative"
            >
              <div
                ref={progressRef}
                className={`h-2 rounded-full ${colors.bg} transition-all duration-1000 ease-out relative`}
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
    </motion.div>
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

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.04 } },
  };

  let skillIndex = 0;

  return (
    <>
      <style>{skillStyles}</style>
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

                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-3"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-80px" }}
                  variants={containerVariants}
                >
                  {skills.map((skill) => {
                    const currentIndex = skillIndex;
                    skillIndex++;
                    return (
                      <SkillBar key={skill.name} skill={skill} index={currentIndex} />
                    );
                  })}
                </motion.div>
              </div>
            );
          })}
      </div>

      {/* Skill Matcher Section */}
      <SkillMatcher />
    </>
  );
}

function SkillMatcher() {
  const [roleDescription, setRoleDescription] = useState("");
  const [matchResults, setMatchResults] = useState<{
    matched: string[];
    gaps: string[];
    fitScore: number;
    summary: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleMatchSkills = async () => {
    if (!roleDescription.trim()) return;

    setLoading(true);
    setMatchResults(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY;
      if (!apiKey) throw new Error("API key not configured");

      const skillsJson = JSON.stringify(portfolioConfig.skills);
      const systemPrompt = `You are analyzing job requirements against a developer's skills. Given a role description and a list of skills, return JSON with:
{
  "matched": ["skill1", "skill2"],
  "gaps": ["skill1", "skill2"],
  "fitScore": 85,
  "summary": "Brief 1-2 sentence summary of how well this person fits the role"
}
Respond ONLY with valid JSON. No markdown, no explanation.`;

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: 400,
          system: systemPrompt,
          messages: [
            {
              role: "user",
              content: `Skills available: ${skillsJson}\n\nRole: ${roleDescription}`,
            },
          ],
        }),
      });

      if (!response.ok) throw new Error("API error");

      let fullResponse = "";
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            try {
              const json = JSON.parse(line.slice(6));
              if (json.type === "content_block_delta" && json.delta?.text) {
                fullResponse += json.delta.text;
              }
            } catch {
              // Skip non-JSON lines
            }
          }
        }
      }

      const results = JSON.parse(fullResponse);
      setMatchResults(results);
    } catch (error) {
      console.error("Skill matching error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-zinc-800 to-zinc-900 p-6">
      <h3 className="text-xl font-semibold text-white mb-4">
        Match My Skills to a Role
      </h3>

      <div className="space-y-4">
        <textarea
          value={roleDescription}
          onChange={(e) => setRoleDescription(e.target.value)}
          placeholder="Paste a job description or role title here..."
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
        />

        <button
          onClick={handleMatchSkills}
          disabled={loading || !roleDescription.trim()}
          className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-zinc-700 disabled:to-zinc-700 text-white font-medium transition"
        >
          {loading ? "Analyzing..." : "Analyze Fit"}
        </button>

        {matchResults && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 mt-6"
          >
            {/* Fit Score */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20">
                <svg
                  className="w-full h-full transform -rotate-90"
                  viewBox="0 0 100 100"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(113, 113, 122, 0.3)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    initial={{ strokeDashoffset: `${2 * Math.PI * 45}` }}
                    animate={{
                      strokeDashoffset: `${
                        2 * Math.PI * 45 * (1 - matchResults.fitScore / 100)
                      }`,
                    }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-purple-400">
                    {matchResults.fitScore}%
                  </span>
                </div>
              </div>
              <div>
                <p className="text-sm text-zinc-300 font-medium mb-2">Fit Score</p>
                <p className="text-xs text-zinc-400">{matchResults.summary}</p>
              </div>
            </div>

            {/* Matched Skills */}
            {matchResults.matched.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-green-400 mb-2 font-medium">
                  ✓ Matched Skills
                </p>
                <div className="flex flex-wrap gap-2">
                  {matchResults.matched.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-green-500/20 text-green-300 text-xs border border-green-500/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Skill Gaps */}
            {matchResults.gaps.length > 0 && (
              <div>
                <p className="text-xs uppercase tracking-wider text-amber-400 mb-2 font-medium">
                  ⚠ Growth Opportunities
                </p>
                <div className="flex flex-wrap gap-2">
                  {matchResults.gaps.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs border border-amber-500/50"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </Card>
  );
}
