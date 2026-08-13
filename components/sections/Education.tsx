import { GraduationCap } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";

export function Education() {
  const { education } = profile;

  return (
    <section id="education" className="content-section education section-shell" aria-labelledby="education-title">
      <SectionHeading eyebrow="Education" title="Learning, then applying." />
      <div id="education-title" className="sr-only">Education</div>

      <Reveal className="education__card">
        <div className="education__icon">
          <GraduationCap size={28} strokeWidth={1.4} aria-hidden="true" />
        </div>

        <div className="education__content">
          <p className="education__label">Education</p>

          <div className="education__institution">
            <h3>{education.university}</h3>
            <p>{education.location}</p>
          </div>

          <div className="education__degree">
            <strong>{education.degree}</strong>
            <span>{education.startYear} &mdash; {education.endYear}</span>
          </div>

          <div className="education__focus">
            <span>Focus</span>
            <ul aria-label="Education focus areas">
              {education.focus.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="education__portrait">
          <Image
            src={education.portrait.src}
            alt={education.portrait.alt}
            fill
            sizes="(max-width: 767px) 96px, 145px"
            quality={90}
          />
        </div>
      </Reveal>
    </section>
  );
}
