import {
  ArrowUpRight,
  Briefcase,
  Camera,
  GitBranch,
  Mail,
  Music2,
  UsersRound,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Reveal } from "@/components/ui/Reveal";
import { ResumeLink } from "@/components/ui/ResumeLink";
import { profile } from "@/data/profile";

const additionalSocials: Array<{
  label: string;
  href: string;
  icon: LucideIcon;
}> = [
  { label: "Facebook", href: profile.facebook, icon: UsersRound },
  { label: "Instagram", href: profile.instagram, icon: Camera },
  { label: "TikTok", href: profile.tiktok, icon: Music2 },
];

export function Contact() {
  return (
    <section id="contact" className="contact section-shell" aria-labelledby="contact-title">
      <div className="contact__orb" aria-hidden="true" />
      <Reveal>
        <p className="eyebrow"><span>Contact</span><span className="eyebrow__line" /></p>
        <h2 id="contact-title">
          LET&apos;S BUILD SOMETHING
          <span>INTELLIGENT.</span>
        </h2>
        <p className="contact__availability">{profile.availability}</p>
      </Reveal>

      <Reveal className="contact__links" delay={0.12}>
        <a href={`mailto:${profile.email}`}>
          <Mail size={19} aria-hidden="true" /> Email <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a href={profile.github} target="_blank" rel="noreferrer">
          <GitBranch size={19} aria-hidden="true" /> GitHub <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          <Briefcase size={19} aria-hidden="true" /> LinkedIn <ArrowUpRight size={16} aria-hidden="true" />
        </a>
        {additionalSocials.map(({ label, href, icon: Icon }) =>
          href ? (
            <a key={label} href={href} target="_blank" rel="noreferrer">
              <Icon size={19} aria-hidden="true" /> {label} <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ) : (
            <span
              key={label}
              className="contact__pending"
              aria-disabled="true"
              title={`Add the ${label} URL in data/profile.ts`}
            >
              <Icon size={19} aria-hidden="true" /> {label} <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          ),
        )}
        <ResumeLink className="contact__resume" />
      </Reveal>

      <div className="contact__meta" aria-hidden="true">
        <span>CORE STATUS / READY</span>
        <span>VIETNAM / GMT+7</span>
      </div>
    </section>
  );
}
