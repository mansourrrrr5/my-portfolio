import type { PortfolioConfig } from "@/types";

export const portfolioConfig: PortfolioConfig = {
  name: "Aziz",
  title: "Ingénieur Logiciel & Spécialiste IA",
  description:
    "Développeur passionné axé sur la création de solutions numériques impactantes à l'intersection de l'ingénierie logicielle et de l'automatisation intelligente.",
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
      platform: "X",
      url: "https://x.com/mansour_tn5",
      label: "X",
    },
    {
      platform: "resume",
      url: "/Lebenslauf_.pdf",
      label: "Curriculum Vitae",
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
      role: "Apprenti Ingénieur IT – R&D Robotique",
      company: "Swisslog",
      period: "2024 – Présent",
      startDate: new Date("2024-01-01"),
      description:
        "Contribution à des projets d'automatisation innovants par le développement de pipelines de vision par ordinateur et l'intégration de l'IA pour les systèmes robotiques. Collaboration avec des ingénieurs talentueux pour résoudre des défis techniques complexes.",
      highlights: [
        "Développement de pipelines de vision par ordinateur en temps réel pour systèmes robotiques",
        "Intégration de modèles d'apprentissage automatique dans les environnements de production",
        "Collaboration sur l'optimisation de l'automatisation et la conception de systèmes",
      ],
      location: "Allemagne",
      type: "work",
    },
    {
      id: "thesis",
      role: "Mémoire de Licence – Détection d'objets YOLO pour Robotique",
      company: "Technische Hochschule Georg Agricola (THGA)",
      period: "2025",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2025-03-01"),
      description:
        "Intégration d'un modèle de détection d'objets léger basé sur YOLO dans le système robotique SweetPicker, permettant les capacités de vision en temps réel et l'automatisation plus intelligente pour la robotique industrielle.",
      highlights: [
        "Implémentation d'un pipeline d'inférence YOLO efficace",
        "Intégration de la vision par ordinateur avec les systèmes de contrôle robotique",
        "Réalisation d'une précision de détection >95% avec une latence <50ms",
      ],
      type: "thesis",
      location: "Allemagne",
    },
    {
      id: "thga-tutor",
      role: "Tuteur Étudiant – Informatique & Technologie Numérique",
      company: "Technische Hochschule Georg Agricola (THGA)",
      period: "Sep 2024 – Feb 2025",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2025-02-01"),
      description:
        "Soutien aux étudiants de premier cycle en Informatique et Technologie Numérique par l'explication des concepts fondamentaux de programmation et des systèmes numériques, l'assistance aux exercices et le renforcement des fondations techniques.",
      highlights: [
        "Tutorat pour étudiants en cours d'Informatique et Technologie Numérique",
        "Explication des concepts de programmation, d'algorithmes et de systèmes numériques",
        "Assistance aux étudiants pour les devoirs et la résolution de problèmes",
      ],
      type: "teaching",
      location: "Allemagne",
    },
  ],

  projects: [
    {
      id: "sweetpicker",
      title: "Détection d'Objets SweetPicker",
      description:
        "Détection d'objets en temps réel intégrée dans le pipeline de picking robotique avec YOLO.",
      longDescription:
        "Développement et intégration d'un système de détection d'objets basé sur YOLO dans la plateforme d'automatisation robotique SweetPicker. Optimisation de l'inférence pour les performances en temps réel avec une latence <50ms, réalisant une précision >95% dans les environnements de production.",
      technologies: ["Python", "YOLO", "OpenCV", "Docker"],
      featured: true,
    },
    {
      id: "kpi-dashboard",
      title: "Tableau de Bord KPI",
      description:
        "Tableau de bord opérationnel avec Elasticsearch et analyse avancée des journaux.",
      longDescription:
        "Création d'un tableau de bord en temps réel pour surveiller les KPIs et l'état du système en utilisant Elasticsearch pour l'agrégation des données et FastAPI pour l'API backend.",
      technologies: ["React", "Elasticsearch", "FastAPI", "TailwindCSS"],
      featured: true,
    },
    {
      id: "itempiQ",
      title: "Agent d'Assistance Autonome Alimenté par l'IA",
      description:
        "Assistant alimenté par l'IA avec streaming WebSocket et contrôle d'accès basé sur les rôles.",
      longDescription:
        "Ingénierie d'un système d'agent d'assistance intelligent avec capacités de streaming en temps réel, contrôle d'accès basé sur les rôles et support multi-locataires. Implémentation de la communication basée sur WebSocket pour les interactions en temps réel.",
      technologies: ["Python", "FastAPI", "WebSockets", "React", "Next.js"],
      featured: true,
    },
    {
      id: "itempiq-remediation",
      title: "Système Autonome de Correction & Alertes Teams",
      description:
        "Système de surveillance et de correction alimenté par l'IA pour la robotique industrielle avec intégration des alertes Microsoft Teams.",
      longDescription:
        "Conception et implémentation d'un système de correction autonome pour la plateforme de picking robotique ItemPiQ. Le système surveille continuellement l'état du système, l'état des conteneurs et les journaux opérationnels, diagnostique automatiquement les problèmes à l'aide d'un agent d'IA et déclenche des actions de correction. Intégration des alertes Microsoft Teams avec des rapports d'incident structurés et des diagnostics exploitables, permettant une réaction plus rapide et une fiabilité opérationnelle améliorée dans les environnements de production.",
      technologies: [
        "Python",
        "FastAPI",
        "Docker",
        "LLM Agents",
        "Microsoft Teams Webhooks",
        "MQTT",
        "Elasticsearch",
      ],
      featured: true,
    },
  ],

  testimonials: [
    {
      id: "testimonial1",
      quote:
        "Aziz fournit un travail de haute qualité et aborde les problèmes avec une pensée analytique forte. Un collègue d'équipe fiable et techniquement solide.",
      name: "Superviseur de Projet",
      role: "Laboratoire de Robotique",
      company: "THGA",
    },
    {
      id: "testimonial2",
      quote:
        "Proactif, axé sur les détails et techniquement compétent. Aziz contribue continuellement des perspectives précieuses et prend en charge des problèmes difficiles.",
      name: "Responsable Hiérarchique",
      role: "Ingénieur Principal",
      company: "Swisslog",
    },
  ],
};
