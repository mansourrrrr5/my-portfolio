"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { PortfolioConfig } from "@/types";

interface SkillsProps {
  config: PortfolioConfig;
}

const focusAreas = [
  {
    title: "AI & Computer Vision",
    icon: "",
    color: "purple" as const,
    tags: ["Python", "YOLO", "OpenCV", "Machine Learning", "Computer Vision"],
    proof: "Built real-time object detection pipelines for industrial robotics at Swisslog",
  },
  {
    title: "Backend Engineering",
    icon: "",
    color: "blue" as const,
    tags: ["FastAPI", "WebSockets", "Elasticsearch", "SQL", "REST APIs"],
    proof: "Designed real-time AI backend services and data pipelines for production systems",
  },
  {
    title: "Frontend Development",
    icon: "",
    color: "cyan" as const,
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS"],
    proof: "Built this portfolio and interactive dashboards with modern React patterns",
  },
  {
    title: "DevOps & Infrastructure",
    icon: "",
    color: "emerald" as const,
    tags: ["Docker", "Linux", "Git", "CI/CD"],
    proof: "Containerized AI inference pipelines and managed Linux-based deployment environments",
  },
];

const colorMap: Record<"purple" | "blue" | "cyan" | "emerald", { border: string; shadow: string }> = {
  purple: {
    border: "hover:border-purple-500/50",
    shadow: "hover:shadow-purple-500/10",
  },
  blue: {
    border: "hover:border-blue-500/50",
    shadow: "hover:shadow-blue-500/10",
  },
  cyan: {
    border: "hover:border-cyan-500/50",
    shadow: "hover:shadow-cyan-500/10",
  },
  emerald: {
    border: "hover:border-emerald-500/50",
    shadow: "hover:shadow-emerald-500/10",
  },
};

interface FocusCardProps {
  title: string;
  icon: string;
  color: "purple" | "blue" | "cyan" | "emerald";
  tags: string[];
  proof: string;
}

function FocusCard({ title, icon, color, tags, proof }: FocusCardProps) {
  const colorClasses = colorMap[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "-60px" }}
      className={`group rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition-all duration-300 hover:bg-zinc-900/70 hover:shadow-lg ${colorClasses.border} ${colorClasses.shadow}`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-base font-semibold text-white">{title}</h3>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2.5 py-1 rounded-lg text-xs font-medium bg-zinc-800/80 border border-zinc-700 text-zinc-300 group-hover:border-zinc-600 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Proof line */}
      <p className="text-xs text-zinc-500 leading-relaxed border-t border-zinc-800 pt-3 mt-2 italic">
        {proof}
      </p>
    </motion.div>
  );
}

function SkillMatcher({ config }: { config: PortfolioConfig }) {
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
      const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
      if (!apiKey) throw new Error("API key not configured");

      const skillsJson = JSON.stringify(config.skills);

      const systemPrompt = `You are analyzing job requirements against a developer's skills.

Given a role description and a list of skills, return JSON with this exact structure:
{
  "matched": ["skill1", "skill2"],
  "gaps": ["skill1", "skill2"],
  "fitScore": 85,
  "summary": "Brief 1-2 sentence summary of how well this person fits the role"
}

Rules:
- Respond ONLY with valid JSON
- No markdown
- No explanation
- fitScore must be a number from 0 to 100`;

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-OpenRouter-Title": "Aziz Portfolio Skill Matcher",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          max_tokens: 400,
          temperature: 0.3,
          messages: [
            {
              role: "system",
              content: systemPrompt,
            },
            {
              role: "user",
              content: `Skills available: ${skillsJson}\n\nRole: ${roleDescription}`,
            },
          ],
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error("Skill matcher API error:", response.status, errText);
        throw new Error(`API error: ${response.status} ${errText}`);
      }

      const data = await response.json();
      const rawContent = data.choices?.[0]?.message?.content ?? "{}";

      let results;

      try {
        results = JSON.parse(rawContent);
      } catch {
        const cleaned = rawContent
          .replace(/^```json\s*/i, "")
          .replace(/^```\s*/i, "")
          .replace(/\s*```$/i, "")
          .trim();

        results = JSON.parse(cleaned);
      }

      setMatchResults({
        matched: Array.isArray(results.matched) ? results.matched : [],
        gaps: Array.isArray(results.gaps) ? results.gaps : [],
        fitScore:
          typeof results.fitScore === "number"
            ? Math.max(0, Math.min(100, results.fitScore))
            : 0,
        summary:
          typeof results.summary === "string"
            ? results.summary
            : "No summary available.",
      });
    } catch (error) {
      console.error("Skill matching error:", error);
      setMatchResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-20 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold text-white mb-2">
          Skills Match Analyzer
        </h2>
        <p className="text-sm text-zinc-400">
          Paste a job description to see how my skills align with the role
        </p>
      </div>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-8">
        <div className="space-y-4">
          <textarea
            value={roleDescription}
            onChange={(e) => setRoleDescription(e.target.value)}
            placeholder="Paste a job description here..."
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-zinc-700 text-white placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />

          <button
            onClick={handleMatchSkills}
            disabled={loading || !roleDescription.trim()}
            className="w-full px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:from-zinc-700 disabled:to-zinc-700 text-white font-medium transition"
          >
            {loading ? "Analyzing..." : "Analyze Match"}
          </button>

          {matchResults && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 mt-6"
            >
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
                  <p className="text-sm text-zinc-300 font-medium mb-2">
                    Fit Score
                  </p>
                  <p className="text-xs text-zinc-400">
                    {matchResults.summary}
                  </p>
                </div>
              </div>

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
      </div>
    </div>
  );
}
export default function Skills({ config }: SkillsProps) {
  // Extract all unique tags from focusAreas
  const allTags = Array.from(new Set(focusAreas.flatMap((area) => area.tags))).sort();

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  return (
    <div className="space-y-16">
      {/* Section 1 - Focus Area Cards 2x2 grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
      >
        {focusAreas.map((area) => (
          <FocusCard key={area.title} {...area} />
        ))}
      </motion.div>

      {/* Section 2 - Full tech stack strip */}
      <div>
        <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">
          Full Stack
        </p>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs text-zinc-400 border border-zinc-800 bg-transparent hover:border-zinc-600 hover:text-zinc-200 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Section 3 - AI Skill Analyzer */}
      <SkillMatcher config={config} />
    </div>
  );
}
