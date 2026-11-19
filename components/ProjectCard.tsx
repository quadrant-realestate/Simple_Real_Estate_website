import { waLink, type Project } from "@/lib/site";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="project-card">
      {p.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="project-img"
          src={p.image}
          alt={`${p.name} by ${p.developer}`}
          loading="lazy"
        />
      ) : (
        <div className="project-noimg">{p.name}</div>
      )}
      <div className="project-body">
        <div className="project-head">
          <div>
            <div className="project-name">{p.name}</div>
            <div className="project-dev">
              by {p.developer} · {p.area}
            </div>
          </div>
          <span className="project-tag">{p.tag}</span>
        </div>
        <div className="project-meta">
          <div><span>Handover</span><b>{p.handover}</b></div>
          <div><span>Layouts</span><b>{p.beds}</b></div>
        </div>
        <div className="project-price">
          <small>Starting from</small>
          <strong>{p.priceFrom}</strong>
        </div>
        <a
          className="project-btn"
          href={waLink(
            `Hi Simple Real Estate! I'm interested in ${p.name} by ${p.developer}. Can you send the full details and payment plan?`
          )}
          target="_blank"
          rel="noopener"
        >
          Register interest →
        </a>
      </div>
    </article>
  );
}
