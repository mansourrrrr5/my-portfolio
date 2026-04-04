"use client";

import { useRef, useState } from "react";
import { portfolioConfig } from "@/data/content";
import { Card, Badge, SectionGrid } from "@/components/ui/Card";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface TiltState {
  rotateX: number;
  rotateY: number;
  gradientX: number;
  gradientY: number;
}

interface ProjectCardProps {
  project: (typeof portfolioConfig.projects)[0];
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
  const { ref, className } = useScrollReveal({
    threshold: 0.2,
    delay: index * 100, // 100ms stagger per card
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate center position
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate distance from center (-1 to 1)
    const distanceX = (x - centerX) / centerX;
    const distanceY = (y - centerY) / centerY;

    // Calculate rotation (max 8 degrees)
    const maxRotate = 8;
    const rotateY = distanceX * maxRotate; // Rotate around Y axis based on horizontal movement
    const rotateX = -distanceY * maxRotate; // Rotate around X axis based on vertical movement

    // Calculate gradient position (0-100%)
    const gradientX = (x / rect.width) * 100;
    const gradientY = (y / rect.height) * 100;

    setTilt({
      rotateX,
      rotateY,
      gradientX,
      gradientY,
    });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({
      rotateX: 0,
      rotateY: 0,
      gradientX: 50,
      gradientY: 50,
    });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const transformStyle: React.CSSProperties = {
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
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-600 ${className}`}
    >
      <div
        ref={cardRef}
        style={transformStyle}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        className="relative"
      >
        <Card className={variant === "featured" ? "relative overflow-hidden" : "relative overflow-hidden"}>
          <div style={gradientStyle} />

          {variant === "featured" ? (
            <>
              <h4 className="text-lg font-semibold text-white mb-2 relative z-10">
                {project.title}
              </h4>
              <p className="text-zinc-300 mb-4 relative z-10">{project.description}</p>
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
    </div>
  );
}

export default function Projects() {
  const featuredProjects = portfolioConfig.projects.filter((p) => p.featured);
  const otherProjects = portfolioConfig.projects.filter((p) => !p.featured);

  return (
    <div className="space-y-8">
      {/* Featured Projects */}
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

      {/* All Projects */}
      <SectionGrid>
        {portfolioConfig.projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} variant="default" index={index} />
        ))}
      </SectionGrid>
    </div>
  );
}
