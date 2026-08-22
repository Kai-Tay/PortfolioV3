import questLogo from "../assets/quest-logo.svg";
import synapxeLogo from "../assets/synapxe-logo.png";
// import osirisLogo from '../assets/osiris-logo.svg'

export const WORK_EXPERIENCE = [
  {
    id: 1,
    role: "Cloud Engineer Intern",
    company: "Synapxe",
    logo: synapxeLogo,
    duration: "June 2026 - Present",
    description:
      "At Synapxe, I build secure, clinically focused enhancements for the HealthierSG Patient Care System, spanning Angular and Java Spring Boot development, clinical decision support, and responsible AI tooling for general practitioners.",
    highlights: [
      "Translated HealthierSG business and functional requirements into Angular frontend and Java Spring Boot backend enhancements.",
      "Enhanced the Chart.js Graph UI with comparator values to improve the clarity of clinical data visualisations.",
      "Building a read-only LangGraph chatbot with approved-source tools and neutral, cited responses for general practitioners.",
      "Developing Presidio and NLI-based guardrails to detect PII and prohibited clinical decision-making requests before patient context reaches the LLM.",
    ],
    tags: [
      "Angular",
      "Java",
      "Spring Boot",
      "Chart.js",
      "LangGraph",
      "Presidio",
      "NLI",
    ],
  },
  {
    id: 2,
    role: "Machine Learning Intern",
    company: "Quest Hyphen",
    logo: questLogo,
    duration: "Mar 2025 - Aug 2025",
    description:
      "At Quest Hyphen, I developed machine learning and generative AI solutions that enhanced platform intelligence, safety, and operational efficiency. My work ranged from NLP-powered classification systems to deploying internal AI tools used across the company.",
    highlights: [
      "Built AI-powered task classification and moderation systems.",
      "Developed a RAG-based pricing intelligence engine.",
      "Deployed an internal GPT assistant on Google Cloud.",
    ],
    tags: [
      "Python",
      "LangChain",
      "Vertex AI",
      "BERT",
      "React",
      "Flask",
      "Firebase",
    ],
  },
  {
    id: 3,
    role: "Full-Stack Developer Intern",
    company: "Osiris",
    // logo: osirisLogo,
    duration: "Dec 2024 - Feb 2025",
    description:
      "At Osiris, I helped modernize enterprise web applications by migrating legacy systems and building new features with a modern TypeScript-based stack. I worked closely with engineers and stakeholders to deliver scalable client-facing solutions.",
    highlights: [
      "Migrated a legacy PHP platform to Next.js and TypeScript.",
      "Built full-stack features with React, Prisma, and PostgreSQL.",
      "Delivered features in an Agile development environment.",
    ],
    tags: ["Next.js", "React", "TypeScript", "Prisma", "PostgreSQL", "tRPC"],
  },
];
