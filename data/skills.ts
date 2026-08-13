export type SkillCategory = {
  title: string;
  code: string;
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming",
    code: "01",
    skills: ["Python", "TypeScript", "JavaScript", "SQL"],
  },
  {
    title: "AI / Machine Learning",
    code: "02",
    skills: [
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "PyTorch",
      "Machine Learning",
      "Deep Learning",
    ],
  },
  {
    title: "Generative AI",
    code: "03",
    skills: ["LLM", "RAG", "Embeddings", "Vector Search", "AI Agents"],
  },
  {
    title: "Backend",
    code: "04",
    skills: ["FastAPI", "REST API", "PostgreSQL"],
  },
  {
    title: "Tools",
    code: "05",
    skills: ["Git", "GitHub", "Docker", "Linux"],
  },
  {
    title: "Frontend",
    code: "06",
    skills: ["React", "Next.js", "Three.js"],
  },
];

