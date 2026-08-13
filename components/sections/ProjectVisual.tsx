import type { Project } from "@/data/projects";

export function ProjectVisual({ project }: { project: Project }) {
  return (
    <div className={`project-visual project-visual--${project.visual}`} aria-hidden="true">
      <div className="project-visual__chrome">
        <span />
        <span />
        <span />
        <small>CORE_LAB / {project.number}</small>
      </div>

      {project.visual === "document" ? (
        <div className="document-ui">
          <div className="document-ui__rail">
            <span className="active" />
            <span />
            <span />
          </div>
          <div className="document-ui__page">
            <span className="document-ui__line line-long" />
            <span className="document-ui__line" />
            <span className="document-ui__line line-short" />
            <div className="document-ui__answer">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="document-ui__query">Ask your documents_</div>
        </div>
      ) : null}

      {project.visual === "prediction" ? (
        <div className="prediction-ui">
          <div className="prediction-ui__score">
            <span>CHURN RISK</span>
            <strong>0.82</strong>
            <small>HIGH CONFIDENCE</small>
          </div>
          <div className="prediction-ui__chart">
            {[28, 44, 38, 66, 58, 78, 88].map((height, index) => (
              <span key={index} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="prediction-ui__labels">
            <span>PREPROCESS</span>
            <span>MODEL</span>
            <span>EVALUATE</span>
          </div>
        </div>
      ) : null}

      {project.visual === "core" ? (
        <div className="core-ui">
          <div className="core-ui__ring ring-one" />
          <div className="core-ui__ring ring-two" />
          <div className="core-ui__processor">
            <span />
          </div>
          <div className="core-ui__readout">SCENE / ACTIVE</div>
        </div>
      ) : null}
    </div>
  );
}

