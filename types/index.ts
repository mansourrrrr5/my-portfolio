/**
 * Comprehensive type definitions for portfolio data
 */

export interface Skill {
  name: string;
  category: "frontend" | "backend" | "ml" | "devops" | "tools";
  proficiency?: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  highlights?: string[];
  location?: string;
  type?: "work" | "thesis" | "education"| "teaching" | "other";
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image?: string;
  github?: string;
  demo?: string;
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company?: string;
  image?: string;
}

export interface SocialLink {
  platform: "github" | "linkedin" | "X" | "email" | "resume";
  url: string;
  label: string;
  icon?: string;
}

export interface PortfolioConfig {
  name: string;
  title: string;
  description: string;
  email: string;
  socials: SocialLink[];
  skills: Skill[];
  experiences: Experience[];
  projects: Project[];
  testimonials: Testimonial[];
}
