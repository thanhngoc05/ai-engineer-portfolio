export const EASE = [0.16, 1, 0.3, 1] as const;

export const sceneChapters = {
  hero: [0, 0.15],
  about: [0.15, 0.3],
  skills: [0.3, 0.45],
  projects: [0.45, 0.65],
  journey: [0.65, 0.8],
  ai: [0.8, 0.9],
  contact: [0.9, 1],
} as const;

export const revealTransition = {
  duration: 0.8,
  ease: EASE,
};

