import type { PortfolioConfig } from "@/types";

export const portfolioConfig: PortfolioConfig = {
  name: "Aziz",
  title: "Software Engineer & AI Specialist",
  description:
    "Passionate developer focused on building impactful digital solutions at the intersection of software engineering and intelligent automation.",
  email: "aziz.mansour.tn@gmail.com",
  
  socials: [
    {
      platform: "github",
      url: "https://github.com/mansourrrrr5",
      label: "GitHub",
    },
    {
      platform: "linkedin",
      url: "https://www.linkedin.com/in/mohamed-aziz-mansour-5a39b2278/",
      label: "LinkedIn",
    },
    {
      platform: "twitter",
      url: "https://twitter.com",
      label: "Twitter",
    },
    {
      platform: "resume",
      url: "/resume.pdf",
      label: "Resume",
    },
  ],

  skills: [
    { name: "Python", category: "backend", proficiency: "expert" },
    { name: "C/C++", category: "backend", proficiency: "expert" },
    { name: "Machine Learning", category: "ml", proficiency: "advanced" },
    { name: "Computer Vision", category: "ml", proficiency: "advanced" },
    { name: "Next.js", category: "frontend", proficiency: "advanced" },
    { name: "React", category: "frontend", proficiency: "advanced" },
    { name: "TypeScript", category: "frontend", proficiency: "advanced" },
    { name: "FastAPI", category: "backend", proficiency: "advanced" },
    { name: "Elasticsearch", category: "backend", proficiency: "intermediate" },
    { name: "Docker", category: "devops", proficiency: "advanced" },
    { name: "Linux", category: "devops", proficiency: "advanced" },
    { name: "SQL", category: "backend", proficiency: "intermediate" },
    { name: "PHP", category: "backend", proficiency: "intermediate" },
    { name: "WebSockets", category: "backend", proficiency: "intermediate" },
    { name: "TailwindCSS", category: "frontend", proficiency: "advanced" },
    { name: "CSS", category: "frontend", proficiency: "advanced" },
    { name: "HTML", category: "frontend", proficiency: "advanced" },
    { name: "Git", category: "tools", proficiency: "expert" },
  ],

  experiences: [
    {
      id: "swisslog",
      role: "Working Student IT – Robotics R&D",
      company: "Swisslog",
      period: "2024 – Present",
      startDate: new Date("2024-01-01"),
      description:
        "Contributing to innovative automation projects by building computer vision pipelines and AI integration for robotic systems. Collaborating with talented engineers to solve complex technical challenges.",
      highlights: [
        "Developed real-time computer vision pipelines for robotic systems",
        "Integrated machine learning models into production environments",
        "Collaborated on automation optimization and system design",
      ],
      location: "Germany",
      type: "work",
    },
    {
      id: "thesis",
      role: "Bachelor Thesis – YOLO Object Detection for Robotics",
      company: "THGA (Technische Hochschule Geislingen)",
      period: "2025",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2025-03-01"),
      description:
        "Integrated a lightweight YOLO-based object detection model into the SweetPicker robotic system, enabling real-time vision capabilities and smarter automation for industrial robotics.",
      highlights: [
        "Implemented efficient YOLO inference pipeline",
        "Integrated CV with robotic control systems",
        "Achieved 95%+ detection accuracy with <50ms latency",
      ],
      type: "thesis",
    },
  ],

  projects: [
    {
      id: "sweetpicker",
      title: "SweetPicker Object Detection",
      description:
        "Real-time object detection integrated into robotic picking pipeline using YOLO.",
      longDescription:
        "Developed and integrated a YOLO-based object detection system into the SweetPicker robotic automation platform. Optimized inference for real-time performance with <50ms latency, achieving 95%+ accuracy in production environments.",
      technologies: ["Python", "YOLO", "OpenCV", "Docker"],
      featured: true,
    },
    {
      id: "kpi-dashboard",
      title: "KPI Dashboard",
      description:
        "Operational dashboard with Elasticsearch and advanced log analytics.",
      longDescription:
        "Built a real-time operational dashboard for monitoring KPIs and system health using Elasticsearch for data aggregation and FastAPI for the backend API.",
      technologies: ["React", "Elasticsearch", "FastAPI", "TailwindCSS"],
      featured: true,
    },
    {
      id: "itempiQ",
      title: "ItemPiQ Support Agent",
      description:
        "AI-powered assistant with WebSocket streaming and role-based access control.",
      longDescription:
        "Engineered an intelligent support agent system with real-time streaming capabilities, role-based access control, and multi-tenant support. Implemented WebSocket-based communication for real-time interactions.",
      technologies: ["Python", "FastAPI", "WebSockets", "React", "Next.js"],
      featured: true,
    },
  ],

  testimonials: [
    {
      id: "testimonial1",
      quote:
        "Aziz delivers high-quality work and approaches problems with strong analytical thinking. A reliable and technically strong team member.",
      name: "Project Supervisor",
      role: "Robotics Lab",
      company: "THGA",
    },
    {
      id: "testimonial2",
      quote:
        "Proactive, detail-oriented, and technically proficient. Aziz consistently contributes valuable insights and takes ownership of challenging problems.",
      name: "Line Manager",
      role: "Senior Engineer",
      company: "Swisslog",
    },
  ],
};

// Legacy exports for backward compatibility
export const techStack = portfolioConfig.skills.map((s) => s.name);
export const projects = portfolioConfig.projects;
export const testimonials = portfolioConfig.testimonials;
