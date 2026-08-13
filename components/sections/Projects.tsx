import { ArrowUpRight, GitBranch } from "lucide-react";

import { ProjectVisual } from "@/components/sections/ProjectVisual";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="content-section projects section-shell" aria-labelledby="projects-title">
      <SectionHeading
        eyebrow="03 / Selected Work"
        title="Systems designed to think."
        description="Project placeholders are structured as real case studies, ready for your code, results, and live demos."
      />
      <div id="projects-title" className="sr-only">Selected projects</div>

      <div className="projects__list">
        {projects.map((project) => (
          <article key={project.number} className={`project project--${project.accent}`}>
            <Reveal className="project__visual-wrap" y={32}>
              <ProjectVisual project={project} />
            </Reveal>

            <Reveal className="project__content" delay={0.08}>
              <div className="project__number">PROJECT / {project.number}</div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="project__tags" aria-label="Technologies">
                {project.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
              <div className="project__actions">
                <a href={project.githubUrl} target="_blank" rel="noreferrer">
                  <GitBranch size={16} aria-hidden="true" /> GitHub
                </a>
                {project.demoUrl === "#" ? (
                  <span aria-disabled="true" title="Add a live demo URL in data/projects.ts">
                    Live Demo <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                ) : (
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">
                    Live Demo <ArrowUpRight size={15} aria-hidden="true" />
                  </a>
                )}
                {project.caseStudyUrl === "#" ? (
                  <span aria-disabled="true" title="Add a case study URL in data/projects.ts">
                    View Case Study <ArrowUpRight size={15} aria-hidden="true" />
                  </span>
                ) : (
                  <a href={project.caseStudyUrl}>View Case Study <ArrowUpRight size={15} aria-hidden="true" /></a>
                )}
              </div>
            </Reveal>
          </article>
        ))}
      </div>
    </section>
  );
}
