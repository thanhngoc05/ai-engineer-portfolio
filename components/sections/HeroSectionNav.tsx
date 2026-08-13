"use client";

import { useEffect, useState } from "react";

import { navItems } from "@/data/profile";

export function HeroSectionNav() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  useEffect(() => {
    const sections = navItems
      .map(({ href }) => document.getElementById(href.slice(1)))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleSection) {
          setActiveSection(visibleSection.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -62% 0px",
        threshold: [0, 0.15, 0.35],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="hero-section-nav" aria-label="Hero section navigation">
      {navItems.map((item, index) => {
        const sectionId = item.href.slice(1);
        const isActive = activeSection === sectionId;

        return (
          <a
            key={item.href}
            className={isActive ? "is-active" : undefined}
            href={item.href}
            aria-current={isActive ? "location" : undefined}
          >
            <span className="hero-section-nav__index" aria-hidden="true">
              0{index + 1}
            </span>
            <span className="hero-section-nav__line" aria-hidden="true" />
            <span>{item.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
