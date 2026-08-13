import { ArrowDown, ArrowUpRight, Briefcase, GitBranch, Mail } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { ResumeLink } from "@/components/ui/ResumeLink";
import { profile } from "@/data/profile";

import { HeroSectionNav } from "./HeroSectionNav";

export function Hero() {
  return (
    <section id="home" className="hero section-shell" aria-labelledby="hero-title">
      <div className="hero__grid" aria-hidden="true" />
      <div className="hero__content">
        <Reveal>
          <p className="hero__status">
            <span aria-hidden="true" /> Available for internships · 2026
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="hero__kicker">NGUYEN NGOC THANH</p>
        </Reveal>

        <Reveal delay={0.14}>
          <h1 id="hero-title">
            Aspiring
            <span>AI Engineer</span>
          </h1>
        </Reveal>

        <Reveal delay={0.22}>
          <p className="hero__headline">{profile.headline}</p>
        </Reveal>

        <Reveal className="hero__actions" delay={0.3}>
          <a className="button button--primary" href="#ai-interface">
            Ask My AI
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <ResumeLink />
        </Reveal>

        <Reveal className="hero__socials" delay={0.38}>
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitBranch size={18} aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Briefcase size={18} aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email">
            <Mail size={18} aria-hidden="true" />
            <span>Email</span>
          </a>
        </Reveal>
      </div>

      <div className="hero__right-interface">
        <div className="hero__object-label" aria-hidden="true">
          <span>AI CORE / NNT—01</span>
          <span>NEURAL PROCESSOR</span>
        </div>
        <HeroSectionNav />
      </div>

      <a className="scroll-indicator" href="#education">
        <span>Scroll to explore</span>
        <ArrowDown size={16} aria-hidden="true" />
      </a>
    </section>
  );
}
