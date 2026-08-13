import { Binary, Braces, Network } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

const focusAreas = [
  { icon: Binary, label: "Intelligent systems" },
  { icon: Network, label: "Applied AI" },
  { icon: Braces, label: "Software engineering" },
];

export function About() {
  return (
    <section id="about" className="content-section about section-shell" aria-labelledby="about-title">
      <div className="about__layout">
        <div className="about__spacer" aria-hidden="true" />
        <div className="about__content surface-panel">
          <SectionHeading eyebrow="01 / About" title="Rebuilding the foundation." />
          <div id="about-title" className="sr-only">About me</div>

          <Reveal className="about__copy" delay={0.1}>
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>

          <Reveal className="about__focus" delay={0.2}>
            {focusAreas.map(({ icon: Icon, label }) => (
              <div key={label}>
                <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
                <span>{label}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

