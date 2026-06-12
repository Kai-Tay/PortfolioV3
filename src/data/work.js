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
      "At Synapxe, I am developing a Patient Care System for the Health SG Team to support national healthcare initiatives. My work focuses on building secure and scalable features to improve clinical workflows.",
    highlights: [],
    tags: [],
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
