"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PortfolioConfig, Project } from "@/types";
import { Card, Badge, SectionGrid } from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface ProjectsProps {
  config: PortfolioConfig;
}

const projectStyles = `
  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes rotate-border {
    0% { --angle: 0deg; }
    100% { --angle: 360deg; }
  }

  .project-card-hover-border::before {
    content: '';
    position: absolute;
    inset: -2px;
    border-radius: inherit;
    background: conic-gradient(from var(--angle), transparent 0deg, #a855f7 60deg, transparent 120deg);
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
    animation: rotate-border 2s linear infinite;
  }

  .project-card-hover-border:hover::before {
    opacity: 1;
  }
`;

interface TiltState {
  rotateX: number;
  rotateY: number;
  gradientX: number;
  gradientY: number;
}

interface ProjectCardProps {
  project: Project;
  variant?: "featured" | "default";
  index: number;
}

function ProjectCard({ project, variant = "default", index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    gradientX: 50,
    gradientY: 50,
  });
  const [isHovering, setIsHovering] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const [aiExplanation, setAiExplanation] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [followUpLoading, setFollowUpLoading] = useState(false);

  const { ref, className } = useScrollReveal({
    threshold: 0.2,
    delay: index * 100,
  });

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    setIsTouchDevice(isTouch);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isTouchDevice) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const distanceX = (x - centerX) / centerX;
    const distanceY = (y - centerY) / centerY;
    const maxRotate = 8;
    const rotateY = distanceX * maxRotate;
    const rotateX = -distanceY * maxRotate;
    const gradientX = (x / rect.width) * 100;
    const gradientY = (y / rect.height) * 100;

    setTilt({ rotateX, rotateY, gradientX, gradientY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ rotateX: 0, rotateY: 0, gradientX: 50, gradientY: 50 });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleTap = () => {
    if (isTouchDevice) setIsFlipped(!isFlipped);
  };

 const handleAskAi = async () => {
  setShowAiPanel(true);
  if (aiExplanation) return;

  setAiLoading(true);
  setAiExplanation("");

  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("API key not configured");

    const systemPrompt =
      "You are explaining one of Aziz's projects to a potential employer. Be technical, concise, and clear.";

    const userPrompt = `Explain the ${project.title} project. Details: ${
      project.longDescription || project.description
    }. Technologies: ${project.technologies.join(
      ", "
    )}. What problems did it solve and what was technically impressive?`;

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-OpenRouter-Title": "Aziz Portfolio Projects AI",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          max_tokens: 400,
          temperature: 0.5,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("AI error:", response.status, errText);
      throw new Error(`API error: ${response.status} ${errText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    setAiExplanation(content || "No explanation available.");
  } catch (error) {
    console.error("AI error:", error);
    setAiExplanation("Error loading explanation. Please try again.");
  } finally {
    setAiLoading(false);
  }
};

const handleFollowUpQuestion = async () => {
  if (!followUpQuestion.trim()) return;

  setFollowUpLoading(true);

  try {
    const apiKey = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY;
    if (!apiKey) throw new Error("API key not configured");

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-OpenRouter-Title": "Aziz Portfolio Projects AI",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
          max_tokens: 400,
          temperature: 0.5,
          messages: [
            {
              role: "system",
              content:
                "You are answering a question about one of Aziz's projects. Be concise, technical, and clear.",
            },
            {
              role: "user",
              content: `About the ${project.title} project (${project.technologies.join(
                ", "
              )}): ${followUpQuestion}`,
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error("Follow-up error:", response.status, errText);
      throw new Error(`API error: ${response.status} ${errText}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content?.trim();

    if (content) {
      setAiExplanation((prev) => `${prev}\n\n${content}`);
    }

    setFollowUpQuestion("");
  } catch (error) {
    console.error("Follow-up error:", error);
  } finally {
    setFollowUpLoading(false);
  }
};

  const transformStyle: React.CSSProperties = isTouchDevice
    ? { perspective: "1000px", transformStyle: "preserve-3d" }
    : {
        perspective: "1000px",
        transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
        transition: !isHovering ? "transform 0.4s cubic-bezier(0.23, 1, 0.320, 1)" : "none",
        transformStyle: "preserve-3d",
      };

  const gradientStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `radial-gradient(circle at ${tilt.gradientX}% ${tilt.gradientY}%, rgba(168, 85, 247, 0.15) 0%, rgba(168, 85, 247, 0) 50%)`,
    opacity: isHovering ? 1 : 0,
    transition: isHovering ? "none" : "opacity 0.4s ease-out",
    pointerEvents: "none",
    borderRadius: "inherit",
  };

  return (
    <>
      {isTouchDevice ? (
        <motion.div
          ref={cardRef}
          onClick={handleTap}
          style={transformStyle}
          className="relative cursor-pointer"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 300, damping: 30 }}
        >
          <motion.div
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.5 }}
            style={{ backfaceVisibility: "hidden" }}
            className="w-full"
          >
            <Card className="relative overflow-hidden h-full project-card-hover-border rounded-2xl">
              <div style={gradientStyle} />
              {variant === "featured" ? (
                <>
                  <h4 className="text-lg font-semibold text-white mb-2 relative z-10">
                    {project.title}
                  </h4>
                  <p className="text-zinc-300 mb-4 relative z-10">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-xs text-zinc-400 relative z-10">Tap to flip →</p>
                </>
              ) : (
                <>
                  <h4 className="text-base font-semibold text-white mb-2 relative z-10">
                    {project.title}
                  </h4>
                  <p className="text-sm text-zinc-300 mb-3 relative z-10">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3 relative z-10">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="text-xs text-zinc-500">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 relative z-10">Tap to flip →</p>
                </>
              )}
            </Card>
          </motion.div>

          <motion.div
            animate={{ rotateY: isFlipped ? 0 : 180 }}
            transition={{ duration: 0.5 }}
            style={{
              backfaceVisibility: "hidden",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
            className="w-full"
          >
            <Card className="relative overflow-hidden h-full flex flex-col justify-between project-card-hover-border rounded-2xl">
              <div>
                <p className="text-sm text-zinc-300 mb-4 relative z-10">
                  {project.longDescription || project.description}
                </p>
              </div>
              <div className="flex gap-2 relative z-10 flex-wrap">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-purple-400 hover:text-purple-300 transition"
                  >
                    Code →
                  </a>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 transition"
                  >
                    Demo →
                  </a>
                )}
                <button
                  type="button"
                  onClick={handleAskAi}
                  className="text-sm text-cyan-400 hover:text-cyan-300 transition"
                >
                  Ask AI →
                </button>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      ) : (
        <div
          ref={cardRef}
          style={transformStyle}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseEnter={handleMouseEnter}
          className="relative"
        >
          <Card className="relative overflow-hidden project-card-hover-border rounded-2xl">
            <div style={gradientStyle} />
            {variant === "featured" ? (
              <>
                <h4 className="text-lg font-semibold text-white mb-2 relative z-10">
                  {project.title}
                </h4>
                <p className="text-zinc-300 mb-4 relative z-10">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4 relative z-10">
                  {project.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2 relative z-10">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-purple-400 hover:text-purple-300 transition"
                    >
                      Code →
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-400 hover:text-blue-300 transition"
                    >
                      Demo →
                    </a>
                  )}
                  <button
                    type="button"
                    onClick={handleAskAi}
                    className="text-sm text-cyan-400 hover:text-cyan-300 transition"
                  >
                    Ask AI →
                  </button>
                </div>
              </>
            ) : (
              <>
                <h4 className="text-base font-semibold text-white mb-2 relative z-10">
                  {project.title}
                </h4>
                <p className="text-sm text-zinc-300 mb-3 relative z-10">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1 relative z-10">
                  {project.technologies.slice(0, 3).map((tech) => (
                    <Badge key={tech} className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className="text-xs text-zinc-500">
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {/* AI Explanation Panel */}
      <AnimatePresence>
        {showAiPanel && (
          <motion.div
            key="ai-panel"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 h-[50vh] bg-zinc-900 border-t border-zinc-800 shadow-2xl flex flex-col z-50"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-4 flex justify-between items-center">
            <h3 className="text-white font-semibold">Project Details: {project.title}</h3>
            <button
              onClick={() => setShowAiPanel(false)}
              className="text-white hover:text-gray-200 text-xl"
              aria-label="Close panel"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {aiLoading ? (
              <div className="flex items-center gap-2 text-zinc-400">
                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-zinc-500 rounded-full animate-bounce delay-200" />
              </div>
            ) : (
              <p className="text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap">
                {aiExplanation}
              </p>
            )}
          </div>

          {/* Follow-up Input */}
          <div className="border-t border-zinc-800 p-4 flex gap-2">
            <input
              type="text"
              value={followUpQuestion}
              onChange={(e) => setFollowUpQuestion(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleFollowUpQuestion();
                }
              }}
              placeholder="Ask a follow-up question..."
              className="flex-1 bg-zinc-800 text-white placeholder-zinc-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              disabled={followUpLoading}
            />
            <button
              onClick={handleFollowUpQuestion}
              disabled={followUpLoading || !followUpQuestion.trim()}
              className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-zinc-700 text-white rounded-lg px-4 py-2 text-sm font-medium transition"
              aria-label="Ask follow-up question"
            >
              Ask
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}

export default function Projects({ config }: ProjectsProps) {
  const featuredProjects = config.projects.filter((p) => p.featured);

  return (
    <div className="space-y-8">
      <style>{projectStyles}</style>
      {featuredProjects.length > 0 && (
        <div>
          <h3 className="text-sm uppercase tracking-wider text-zinc-400 mb-4">
            Featured
          </h3>
          <SectionGrid cols={2}>
            {featuredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant="featured"
                index={index}
              />
            ))}
          </SectionGrid>
        </div>
      )}

      <SectionGrid>
        {config.projects
          .filter((p) => !p.featured)
          .map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              variant="default"
              index={index}
            />
          ))}
      </SectionGrid>
    </div>
  );
}
