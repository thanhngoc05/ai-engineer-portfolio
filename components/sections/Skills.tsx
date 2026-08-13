import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section id="skills" className="content-section skills section-shell" aria-labelledby="skills-title">
      <SectionHeading
        eyebrow="02 / Capabilities"
        title="Skills that connect the system."
        description="A practical toolkit spanning machine learning, production software, and interactive interfaces."
      />
      <div id="skills-title" className="sr-only">Technical skills</div>

      <div className="skills__grid">
        {skillCategories.map((category, index) => (
          <Reveal key={category.title} delay={index * 0.04} className="skill-card">
            <div className="skill-card__header">
              <span>{category.code}</span>
              <h3>{category.title}</h3>
            </div>
            <div className="skill-card__tags">
              {category.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

