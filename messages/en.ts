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
    subtitle: "Welcome to my portfolio",
    headline: "Building Intelligent Solutions",
    description: "building intelligent and scalable applications that push the boundaries of what's possible.",
    subheadline:
      "Passionate about combining software engineering with AI to solve complex problems. Expertise in computer vision, machine learning, and full-stack development.",
    ctaViewWork: "View my work",
    ctaConnect: "Let's connect",
  },
  about: {
    title: "About Me",
    description:
      "I'm a software engineer with a passion for building intelligent solutions. My journey began with curiosity about how machines learn, which led me to specialize in machine learning and computer vision. Today, I bridge the gap between cutting-edge AI and practical software engineering.",
    story: [
      "I currently work as a Working Student IT in Robotics R&D at Swisslog, where I contribute to innovative automation projects and collaborate with talented engineers on real-world challenges.",
      "For my Bachelor thesis, I integrated YOLO-based object detection into the SweetPicker robotic system, enabling real-time vision and smarter automation for industrial robotics. Passionate about leveraging AI to solve complex problems.",
    ],
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
    focusAreas: [
      {
        title: "AI & Computer Vision",
        proof: "Built real-time object detection pipelines for industrial robotics at Swisslog",
      },
      {
        title: "Backend Engineering",
        proof: "Designed real-time AI backend services and data pipelines for production systems",
      },
      {
        title: "Frontend Development",
        proof: "Built this portfolio and interactive dashboards with modern React patterns",
      },
      {
        title: "DevOps & Infrastructure",
        proof: "Containerized AI inference pipelines and managed Linux-based deployment environments",
      },
    ],
    keySkills: "Key Skills",
    fullStack: "Full Stack",
    skillMatcher: {
      title: "Skills Match Analyzer",
      description: "Paste a job description to see how my skills align with the role",
      placeholder: "Paste a job description here...",
      analyzeButton: "Analyze Match",
      analyzing: "Analyzing...",
      fitScore: "Fit Score",
      matchedSkills: "✓ Matched Skills",
      growthOpportunities: "⚠ Growth Opportunities",
    },
    stats: {
      yearsLabel: "Years Experience",
      projectsLabel: "Projects Shipped",
      accuracyLabel: "Model Accuracy",
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
    phases: [
      {
        step: "01",
        subtitle: "Foundation",
        title: "Understand the Problem",
        description:
          "Every project starts with clarity. Before writing code, I focus on understanding the real problem, the goals of the system, and the constraints involved. A clear understanding early on helps avoid unnecessary complexity and leads to better technical decisions later.",
        focus: ["Requirements Analysis", "System Constraints", "Edge Cases"],
      },
      {
        step: "02",
        subtitle: "Design Thoughtful Solutions",
        title: "Design with Scalability",
        description:
          "Once the problem is clear, I think about the structure of the solution. This includes choosing appropriate technologies, designing a maintainable architecture, and considering scalability from the beginning.",
        focus: ["Scalable Architecture", "Performance First", "Maintainability"],
      },
      {
        step: "03",
        subtitle: "Implementation",
        title: "Build & Integrate Carefully",
        description:
          "During development, I focus on writing clean, readable, and reliable code. Good implementation is not only about making something work, but also ensuring it can be understood, extended, and maintained over time.",
        focus: ["Production Code", "Clean Integration", "Reliability"],
      },
      {
        step: "04",
        subtitle: "Refinement",
        title: "Optimize, Test & Deploy",
        description:
          "Once built, continuous refinement is essential. I test thoroughly, benchmark performance, optimize bottlenecks, and ensure the solution is robust and ready for production. This iterative approach catches issues early and delivers solutions that actually work at scale.",
        focus: ["Performance Tuning", "Comprehensive Testing", "Deployment Ready"],
      },
    ],
  },
  contact: {
    title: "Get In Touch",
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
