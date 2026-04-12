export const en = {
  locale: "en",
  direction: "ltr",
  metadata: {
    title: "Aziz - Software Engineer & AI Specialist",
    description:
      "Passionate developer building impactful digital solutions at the intersection of software engineering and AI. Expertise in Python, Machine Learning, Computer Vision, and Full-Stack Development.",
  },
  navbar: {
    about: "About",
    skills: "Skills",
    experience: "Experience",
    projects: "Projects",
    testimonials: "Testimonials",
    contact: "Contact",
  },
  hero: {
    greeting: "Hello, I'm",
    name: "Aziz",
    titles: ["Software Engineer", "AI Specialist", "IT Engineer"],
    specialty: ["Computer Vision", "AI Systems", "Full-Stack Development"],
    headline: "Building Intelligent Solutions",
    subheadline:
      "Passionate about combining software engineering with AI to solve complex problems. Expertise in computer vision, machine learning, and full-stack development.",
    ctaScroll: "Scroll to explore",
    ctaConnect: "Let's connect",
  },
  about: {
    title: "About Me",
    description:
      "I'm a software engineer with a passion for building intelligent solutions. My journey began with curiosity about how machines learn, which led me to specialize in machine learning and computer vision. Today, I bridge the gap between cutting-edge AI and practical software engineering.",
    highlights: [
      "Expertise in Python, C/C++, and full-stack web development",
      "Specialized in machine learning and computer vision systems",
      "Experienced in deploying AI models to production environments",
      "Strong background in system design and automation",
    ],
  },
  skills: {
    title: "Skills & Technologies",
    categories: {
      backend: "Backend",
      frontend: "Frontend",
      ml: "Machine Learning",
      devops: "DevOps & Infrastructure",
      tools: "Tools & Version Control",
    },
  },
  experience: {
    title: "Experience",
    viewMore: "View more",
  },
  projects: {
    title: "Projects",
    featured: "Featured Work",
    technologies: "Technologies",
  },
  testimonials: {
    title: "What People Say",
    from: "from",
  },
  approach: {
    title: "My Process",
    subtitle: "How I approach software development",
  },
  contact: {
    title: "Let's build something amazing",
    subtitle: "Get in touch",
    description:
      "Have a project in mind? Let's collaborate and create something extraordinary together.",
    email: "Email",
    message: "Message",
    yourEmail: "Your Email",
    sendButton: "Send Message",
    sending: "Sending...",
    sentMessage: "Message Sent!",
    successText: "Thanks for your message! I'll get back to you soon.",
    copied: "✓ Copied!",
    copy: "Copy",
    askAI: "Ask AI about Aziz",
    askAISubtitle: "Click any topic to ask the AI assistant instantly",
    suggestedReplies: "Suggested replies:",
    clickToCopy: "Click any to copy to clipboard",
    minChars: (n: number) => `Message must be at least ${n} characters`,
    maxChars: "Message cannot exceed 500 characters",
    invalidEmail: "Please enter a valid email address",
    minLengthHint: (n: number) => `min ${n} chars`,
    quickQuestions: {
      projects: "Projects",
      projectsQuestion:
        "Tell me about Aziz's key projects and what makes them technically impressive.",
      experience: "Experience",
      experienceQuestion:
        "What is Aziz's professional experience and what has he built at Swisslog?",
      techStack: "Tech Stack",
      techStackQuestion:
        "What technologies does Aziz specialize in and what is he strongest at?",
      hire: "Work with Aziz",
      hireQuestion:
        "Why should I hire Aziz and what kind of roles suit him best?",
    },
  },
  followLinks: {
    title: "Follow",
    email: "Email",
    getInTouch: "Get in touch",
  },
};

export type TranslationDict = typeof en;
