export type Project = {
  number: string;
  name: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  demoUrl: string;
  caseStudyUrl: string;
  visual: "document" | "prediction" | "core";
  accent: string;
};

export const projects: Project[] = [
  {
    number: "01",
    name: "AI Document Assistant",
    description:
      "A RAG-based document assistant that allows users to upload documents and ask questions grounded in their content.",
    technologies: [
      "Python",
      "FastAPI",
      "LLM",
      "RAG",
      "Vector Database",
      "PostgreSQL",
      "Docker",
    ],
    githubUrl: "https://github.com/USERNAME/ai-document-assistant",
    demoUrl: "#",
    caseStudyUrl: "#",
    visual: "document",
    accent: "cyan",
  },
  {
    number: "02",
    name: "Customer Churn Prediction",
    description:
      "An end-to-end machine learning system for predicting customer churn using data preprocessing, feature engineering and model evaluation.",
    technologies: ["Python", "Pandas", "Scikit-learn", "XGBoost", "FastAPI"],
    githubUrl: "https://github.com/USERNAME/customer-churn-prediction",
    demoUrl: "#",
    caseStudyUrl: "#",
    visual: "prediction",
    accent: "violet",
  },
  {
    number: "03",
    name: "Interactive 3D AI Portfolio",
    description:
      "A cinematic interactive portfolio built with modern web technologies and WebGL.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "GSAP",
    ],
    githubUrl: "https://github.com/USERNAME/ai-core-portfolio",
    demoUrl: "#",
    caseStudyUrl: "#",
    visual: "core",
    accent: "blue",
  },
];

