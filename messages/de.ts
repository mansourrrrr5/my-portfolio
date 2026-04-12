import type { TranslationDict } from "./en";

export const de: TranslationDict = {
  locale: "de",
  direction: "ltr",
  metadata: {
    title: "Aziz - Softwareingenieur & KI-Spezialist",
    description:
      "Leidenschaftlicher Entwickler, der innovative digitale Lösungen an der Schnittstelle von Softwareentwicklung und KI schafft. Expertise in Python, maschinellem Lernen, Computer Vision und Full-Stack-Entwicklung.",
  },
  navbar: {
    about: "Über mich",
    skills: "Fähigkeiten",
    experience: "Erfahrung",
    projects: "Projekte",
    testimonials: "Bewertungen",
    contact: "Kontakt",
  },
  hero: {
    greeting: "Hallo, ich bin",
    name: "Aziz",
    titles: ["Softwareingenieur", "KI-Spezialist", "IT-Ingenieur"],
    specialty: ["Computervision", "KI-Systeme", "Full-Stack-Entwicklung"],
    headline: "Intelligente Lösungen aufbauen",
    subheadline:
      "Leidenschaftlich daran interessiert, Softwaretechnik mit KI zu kombinieren, um komplexe Probleme zu lösen. Expertise in Computervision, maschinellem Lernen und Full-Stack-Entwicklung.",
    ctaScroll: "Zum Erkunden scrollen",
    ctaConnect: "Lassen Sie uns verbinden",
  },
  about: {
    title: "Über mich",
    description:
      "Ich bin Softwareingenieur mit einer Leidenschaft für intelligente Lösungen. Meine Reise begann mit der Neugier, wie Maschinen lernen, was mich zur Spezialisierung auf maschinelles Lernen und Computer Vision führte. Heute verbinde ich bahnbrechende KI mit praktischer Softwareentwicklung.",
    highlights: [
      "Expertise in Python, C/C++ und Full-Stack-Webentwicklung",
      "Spezialisiert auf Systeme für maschinelles Lernen und Computer Vision",
      "Erfahrung in der Bereitstellung von KI-Modellen in Produktionsumgebungen",
      "Starker Hintergrund in Systemdesign und Automatisierung",
    ],
  },
  skills: {
    title: "Fähigkeiten & Technologien",
    categories: {
      backend: "Backend",
      frontend: "Frontend",
      ml: "Maschinelles Lernen",
      devops: "DevOps & Infrastruktur",
      tools: "Tools & Versionskontrolle",
    },
  },
  experience: {
    title: "Erfahrung",
    viewMore: "Mehr anzeigen",
  },
  projects: {
    title: "Projekte",
    featured: "Ausgewählte Arbeiten",
    technologies: "Technologien",
  },
  testimonials: {
    title: "Was andere sagen",
    from: "von",
  },
  approach: {
    title: "Mein Prozess",
    subtitle: "Wie ich Softwareentwicklung angehe",
  },
  contact: {
    title: "Lassen Sie uns etwas Großartiges schaffen",
    subtitle: "Treten Sie in Kontakt",
    description:
      "Haben Sie ein Projekt im Sinn? Lassen Sie uns zusammenarbeiten und etwas Außergewöhnliches schaffen.",
    email: "E-Mail",
    message: "Nachricht",
    yourEmail: "Ihre E-Mail",
    sendButton: "Nachricht senden",
    sending: "Wird gesendet...",
    sentMessage: "Nachricht gesendet!",
    successText: "Danke für deine Nachricht! Ich melde mich bald bei dir.",
    copied: "✓ Kopiert!",
    copy: "Kopieren",
    askAI: "Fragen Sie KI über Aziz",
    askAISubtitle: "Klicken Sie auf ein Thema, um den KI-Assistenten sofort zu befragen",
    suggestedReplies: "Vorgeschlagene Antworten:",
    clickToCopy: "Klicken Sie auf eine beliebige Antwort, um sie in die Zwischenablage zu kopieren",
    minChars: (n: number) => `Nachricht muss mindestens ${n} Zeichen lang sein`,
    maxChars: "Nachricht darf 500 Zeichen nicht überschreiten",
    invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
    minLengthHint: (n: number) => `min ${n} Zeichen`,
    quickQuestions: {
      projects: "Projekte",
      projectsQuestion:
        "Erzählen Sie mir von Aziz's wichtigsten Projekten und was sie technisch beeindruckend macht.",
      experience: "Erfahrung",
      experienceQuestion:
        "Was ist Aziz's berufliche Erfahrung und was hat er bei Swisslog gebaut?",
      techStack: "Tech-Stack",
      techStackQuestion:
        "In welchen Technologien ist Aziz spezialisiert und worin ist er am stärksten?",
      hire: "Mit Aziz arbeiten",
      hireQuestion:
        "Warum sollte ich Aziz einstellen und welche Rollen passen zu ihm?",
    },
  },
  followLinks: {
    title: "Folgen",
    email: "E-Mail",
    getInTouch: "Kontaktieren Sie mich",
  },
};
