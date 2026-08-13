export type SocialLink = {
  label: "GitHub" | "LinkedIn" | "Email";
  href: string;
};

export const profile = {
  name: "Nguyen Ngoc Thanh",
  shortName: "Thanh",
  role: "Aspiring AI Engineer",
  headline:
    "Building intelligent systems at the intersection of AI and Software Engineering.",
  about: [
    "I'm a Computer Science student currently rebuilding my software engineering foundation and working toward becoming an AI Engineer.",
    "My focus is on Python, Machine Learning, Deep Learning, LLM applications, RAG systems and AI-powered software.",
  ],
  availability:
    "Open to AI Engineer / AI Software Engineer internship opportunities.",
  email: "thanh05ngoc05@gmail.com",
  github: "https://github.com/thanhngoc05",
  linkedin: "https://linkedin.com/in/USERNAME",
  // Add your real social profile URLs when they are ready.
  facebook:
    "https://www.facebook.com/nguyen.ngoc.thanh.783971/about/?fb_profile_edit_entry_point=%7B%22click_point%22%3A%22edit_profile_button%22%2C%22feature%22%3A%22profile_header%22%7D&id=100034886283118&sk=about",
  instagram: "https://www.instagram.com/ng.thank_91/",
  tiktok: "https://www.tiktok.com/@dreamerd._?lang=en",
  // Place the real PDF at public/resume/Nguyen-Ngoc-Thanh-CV.pdf.
  resumePath: "/resume/Nguyen-Ngoc-Thanh-CV.pdf",
  location: "Vietnam",
  education: {
    university: "Ho Chi Minh City University of Transport",
    location: "Ho Chi Minh City, Vietnam",
    degree: "Bachelor of Information Technology",
    startYear: 2023,
    endYear: 2027,
    portrait: {
      src: "/images/nguyen-ngoc-thanh-portrait.png",
      alt: "Portrait of Nguyen Ngoc Thanh",
    },
    focus: [
      "Artificial Intelligence",
      "Machine Learning",
      "Software Engineering",
    ],
  },
} as const;

export const socials: SocialLink[] = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
];

export const navItems = [
  { label: "Education", href: "#education" },
  { label: "AI Interface", href: "#ai-interface" },
  { label: "Contact", href: "#contact" },
] as const;

export const journey = [
  {
    number: "01",
    title: "Programming Foundation",
    items: ["Python", "OOP", "Data Structures", "Git", "SQL"],
  },
  {
    number: "02",
    title: "Machine Learning",
    items: ["Data Analysis", "Scikit-learn", "ML Fundamentals"],
  },
  {
    number: "03",
    title: "Deep Learning",
    items: ["PyTorch", "Neural Networks", "Transformers"],
  },
  {
    number: "04",
    title: "Applied AI",
    items: ["LLM", "RAG", "Vector Databases", "Agents"],
  },
  {
    number: "05",
    title: "AI Engineering",
    items: ["FastAPI", "Docker", "Cloud", "Production AI Systems"],
  },
] as const;
