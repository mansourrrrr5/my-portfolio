import type { TranslationDict } from "./en";

export const fr: TranslationDict = {
  locale: "fr",
  direction: "ltr",
  metadata: {
    title: "Aziz - Ingénieur Logiciel & Spécialiste IA",
    description:
      "Développeur passionné construisant des solutions numériques percutantes à l'intersection de l'ingénierie logicielle et de l'IA. Expertise en Python, apprentissage automatique, vision par ordinateur et développement full-stack.",
  },
  navbar: {
    about: "À propos",
    skills: "Compétences",
    experience: "Expérience",
    projects: "Projets",
    testimonials: "Témoignages",
    contact: "Contact",
  },
  hero: {
    greeting: "Bonjour, je suis",
    name: "Aziz",
    titles: ["Ingénieur Logiciel", "Spécialiste IA", "Ingénieur IT"],
    specialty: ["Vision par Ordinateur", "Systèmes IA", "Développement Full-Stack"],
    headline: "Créer des Solutions Intelligentes",
    subheadline:
      "Passionné par la combinaison de l'ingénierie logicielle et de l'IA pour résoudre des problèmes complexes. Expertise en vision par ordinateur, apprentissage automatique et développement full-stack.",
    ctaScroll: "Faites défiler pour explorer",
    ctaConnect: "Connectons-nous",
  },
  about: {
    title: "À propos",
    description:
      "Je suis ingénieur logiciel passionné par la création de solutions intelligentes. Mon parcours a commencé par la curiosité sur la façon dont les machines apprennent, ce qui m'a amené à me spécialiser en apprentissage automatique et vision par ordinateur. Aujourd'hui, je fais le lien entre l'IA de pointe et l'ingénierie logicielle pratique.",
    highlights: [
      "Expertise en Python, C/C++ et développement web full-stack",
      "Spécialisé dans les systèmes d'apprentissage automatique et vision par ordinateur",
      "Expérience dans le déploiement de modèles IA en environnements de production",
      "Solide expérience en conception de systèmes et automatisation",
    ],
  },
  skills: {
    title: "Compétences & Technologies",
    categories: {
      backend: "Backend",
      frontend: "Frontend",
      ml: "Apprentissage Automatique",
      devops: "DevOps & Infrastructure",
      tools: "Outils & Contrôle de version",
    },
  },
  experience: {
    title: "Expérience",
    viewMore: "Voir plus",
  },
  projects: {
    title: "Projets",
    featured: "Travaux en vedette",
    technologies: "Technologies",
  },
  testimonials: {
    title: "Ce que les gens disent",
    from: "de",
  },
  approach: {
    title: "Mon processus",
    subtitle: "Comment j'aborde le développement logiciel",
  },
  contact: {
    title: "Créons quelque chose d'extraordinaire",
    subtitle: "Restons en contact",
    description:
      "Vous avez un projet en tête ? Collaborons et créons quelque chose d'extraordinaire ensemble.",
    email: "E-mail",
    message: "Message",
    yourEmail: "Votre e-mail",
    sendButton: "Envoyer le message",
    sending: "Envoi en cours...",
    sentMessage: "Message envoyé !",
    successText: "Merci pour votre message ! Je vous recontacterai bientôt.",
    copied: "✓ Copié !",
    copy: "Copier",
    askAI: "Interroger l'IA sur Aziz",
    askAISubtitle: "Cliquez sur un sujet pour interroger l'assistant IA instantanément",
    suggestedReplies: "Réponses suggérées :",
    clickToCopy: "Cliquez sur une réponse pour la copier dans le presse-papiers",
    minChars: (n: number) => `Le message doit contenir au moins ${n} caractères`,
    maxChars: "Le message ne peut pas dépasser 500 caractères",
    invalidEmail: "Veuillez entrer une adresse e-mail valide",
    minLengthHint: (n: number) => `min ${n} caractères`,
    quickQuestions: {
      projects: "Projets",
      projectsQuestion:
        "Parlez-moi des principaux projets d'Aziz et de ce qui les rend techniquement impressionnants.",
      experience: "Expérience",
      experienceQuestion:
        "Quelle est l'expérience professionnelle d'Aziz et qu'a-t-il construit chez Swisslog ?",
      techStack: "Stack Technique",
      techStackQuestion:
        "Dans quelles technologies Aziz est-il spécialisé et dans lesquelles est-il le plus fort ?",
      hire: "Travailler avec Aziz",
      hireQuestion:
        "Pourquoi devrais-je embaucher Aziz et quels rôles lui conviendraient le mieux ?",
    },
  },
  followLinks: {
    title: "Suivre",
    email: "E-mail",
    getInTouch: "Me contacter",
  },
};
