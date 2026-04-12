import type { PortfolioConfig } from "@/types";

export const portfolioConfig: PortfolioConfig = {
  name: "Aziz",
  title: "Softwareingenieur & KI-Spezialist",
  description:
    "Leidenschaftlicher Entwickler, der sich auf die Erstellung impactvoller Digitallösungen an der Schnittstelle von Softwaretechnik und intelligenter Automatisierung konzentriert.",
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
      label: "Lebenslauf",
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
      role: "Tutor Informatik – Robotik F&E",
      company: "Swisslog",
      period: "2024 – Heute",
      startDate: new Date("2024-01-01"),
      description:
        "Mitwirkung an innovativen Automatisierungsprojekten durch Entwicklung von Computer-Vision-Pipelines und KI-Integration für Robotersysteme. Zusammenarbeit mit talentierten Ingenieuren zur Lösung komplexer technischer Herausforderungen.",
      highlights: [
        "Entwicklung von Echtzeit-Computer-Vision-Pipelines für Robotersysteme",
        "Integration von Machine-Learning-Modellen in Produktionsumgebungen",
        "Zusammenarbeit bei Automatisierungsoptimierung und Systemdesign",
      ],
      location: "Deutschland",
      type: "work",
      image: "/swisslog.jpg",
    },
    {
      id: "thesis",
      role: "Bachelorarbeit – YOLO-Objekterkennung für Robotik",
      company: "Technische Hochschule Georg Agricola (THGA)",
      period: "2025",
      startDate: new Date("2024-06-01"),
      endDate: new Date("2025-03-01"),
      description:
        "Integration eines leichtgewichtigen YOLO-basierten Objekterkennungsmodells in das SweetPicker-Robotersystem, das Echtzeit-Vision-Fähigkeiten und intelligere Automatisierung für industrielle Robotik ermöglicht.",
      highlights: [
        "Implementierung einer effizienten YOLO-Inferenz-Pipeline",
        "Integration von Computer Vision mit Robotersteuerungssystemen",
        "Erreichung von 95%+ Erkennungsgenauigkeit mit <50ms Latenz",
      ],
      type: "thesis",
      location: "Deutschland",
      image: "/bachelor.jpeg",
    },
    {
      id: "thga-tutor",
      role: "Studentischer Tutor – Informatik & Digitaltechnik",
      company: "Technische Hochschule Georg Agricola (THGA)",
      period: "Sep 2024 – Feb 2025",
      startDate: new Date("2024-09-01"),
      endDate: new Date("2025-02-01"),
      description:
        "Unterstützung von Studierenden in Informatik- und Digitaltechnik-Kursen durch Erklärung grundlegender Programmier- und Digital-Konzepte, Unterstützung bei Übungsaufgaben und Stärkung ihrer technischen Grundlagen.",
      highlights: [
        "Tutorium für Studierende in Informatik und Digitaltechnik-Kursen",
        "Vermittlung von Programmierungs-, Algorithmen- und Digitalsystem-Konzepten",
        "Unterstützung der Studierenden bei Aufgaben und Problemlösung",
      ],
      type: "teaching",
      location: "Deutschland",
      image: "/thga.jpg",
    },
  ],

  projects: [
    {
      id: "sweetpicker",
      title: "SweetPicker Objekterkennung",
      description:
        "Echtzeit-Objekterkennung integriert in Roboter-Picking-Pipeline mit YOLO.",
      longDescription:
        "Entwicklung und Integration eines YOLO-basierten Objekterkennungssystems in die SweetPicker-Roboter-Automatisierungsplattform. Optimierung der Inferenz für Echtzeit-Leistung mit <50ms Latenz und 95%+ Genauigkeit in Produktionsumgebungen.",
      technologies: ["Python", "YOLO", "OpenCV", "Docker"],
      featured: true,
    },
    {
      id: "kpi-dashboard",
      title: "KPI-Dashboard",
      description:
        "Operatives Dashboard mit Elasticsearch und fortgeschrittener Log-Analyse.",
      longDescription:
        "Entwicklung eines Echtzeit-Dashboards zur Überwachung von KPIs und Systemgesundheit unter Verwendung von Elasticsearch für Datenaggregation und FastAPI für das Backend-API.",
      technologies: ["React", "Elasticsearch", "FastAPI", "TailwindCSS"],
      featured: true,
    },
    {
      id: "itempiQ",
      title: "KI-gestützter autonomer Support-Agent",
      description:
        "KI-gestützter Assistent mit WebSocket-Streaming und rollenbasierter Zugriffskontrolle.",
      longDescription:
        "Entwicklung eines intelligenten Support-Agent-Systems mit Echtzeit-Streaming-Fähigkeiten, rollenbasierter Zugriffskontrolle und Multi-Tenant-Unterstützung. Implementierung von WebSocket-basierter Kommunikation für Echtzeit-Interaktionen.",
      technologies: ["Python", "FastAPI", "WebSockets", "React", "Next.js"],
      featured: true,
    },
    {
      id: "itempiq-remediation",
      title: "Autonome Remediation & Teams-Alert-System",
      description:
        "KI-gestütztes Überwachungs- und Remediation-System für industrielle Robotik mit Microsoft Teams Alert-Integration.",
      longDescription:
        "Gestaltung und Implementierung eines autonomen Remediation-Systems für die ItemPiQ Roboter-Picking-Plattform. Das System überwacht kontinuierlich die Systemgesundheit, Containerstatus und Betriebsprotokolle, diagnostiziert Probleme automatisch mit einem KI-Agent und löst Remediation-Maßnahmen aus. Integration von Microsoft Teams-Benachrichtigungen mit strukturierten Incident Reports und umsetzbaren Diagnosen, um schnellere Reaktion und verbesserte Betriebszuverlässigkeit in Produktionsumgebungen zu ermöglichen.",
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
        "Aziz liefert hochwertige Arbeit ab und geht Probleme mit starkem analytischen Denken an. Ein zuverlässiger und technisch versierter Teamkollege.",
      name: "Projektbetreuer",
      role: "Robotik-Labor",
      company: "THGA",
    },
    {
      id: "testimonial2",
      quote:
        "Proaktiv, detailorientiert und technisch versiert. Aziz leistet kontinuierlich wertvollen Beitrag und übernimmt Verantwortung für anspruchsvolle Probleme.",
      name: "Linienvorgesetzter",
      role: "Senior Engineer",
      company: "Swisslog",
    },
  ],
};
