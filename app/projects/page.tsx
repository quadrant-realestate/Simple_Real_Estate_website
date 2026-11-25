import type { Metadata } from "next";
import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectCard from "@/components/ProjectCard";
import { site, waLink, projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "All Projects — Simple Real Estate",
  description:
    "Every Dubai off-plan project on our shortlist — real developers, honest starting prices and handover dates. No hype, just the numbers.",
};

const toNum = (s: string) => Number(s.replace(/[^0-9]/g, "")) || 0;

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const get = (k: string) => (Array.isArray(sp[k]) ? sp[k]?.[0] : sp[k]) || "";
  const q = get("q").toLowerCase().trim();
  const area = get("area");
  const beds = get("beds");
  const max = toNum(get("max"));

  const filtered = projects.filter((p) => {
    if (q && !`${p.name} ${p.developer} ${p.area}`.toLowerCase().includes(q)) return false;
    if (area && p.area !== area) return false;
    if (beds && !p.beds.toLowerCase().includes(beds.toLowerCase())) return false;
    if (max && toNum(p.priceFrom) > max) return false;
    return true;
  });

  const hasQuery = Boolean(q || area || beds || max);

  return (
    <>
      <Nav />
      <ScrollReveal />

      {/* HEADER */}
      <section className="section tint projects-page-head">
        <div className="container">
          <a href="/" className="back-link">← Back home</a>
          <div className="sign">OFF-PLAN, HONESTLY PRICED</div>
          <h2>All projects <span className="italic-mark">we actually like.</span></h2>
          <p className="section-lead">
            Our full shortlist of Dubai off-plan launches — real developers, real
            starting prices, real handover dates. Tap any one and we&apos;ll send
            you the full numbers and payment plan.
          </p>
          {hasQuery && (
            <p className="projects-result">
              <strong>{filtered.length}</strong> of {projects.length} projects match
              {q && <> “{q}”</>}
              {area && <> · {area}</>}
              {beds && <> · {beds} bed</>}
              {max > 0 && <> · under AED {max.toLocaleString("en-US")}</>}
              <a href="/projects" className="projects-clear">clear ✕</a>
            </p>
          )}
        </div>
      </section>

      {/* ALL PROJECTS */}
      <section className="section" id="projects">
        <div className="container">
          {filtered.length > 0 ? (
            <div className="projects-grid">
              {filtered.map((p) => (
                <ProjectCard p={p} key={p.name} />
              ))}
            </div>
          ) : (
            <div className="projects-empty">
              <h4>No projects match that search.</h4>
              <p>Try a different area or budget — or ask us and we&apos;ll hand-pick a shortlist for you.</p>
              <a href="/projects" className="btn btn-ghost">Show all projects</a>
            </div>
          )}
          <p className="projects-note">
            Prices and handover dates are indicative and set by the developer.
            We confirm the current figures with you before anything is signed.
          </p>
          <div className="projects-cta">
            <a
              href={waLink(
                "Hi Simple Real Estate! Can you send me your full list of off-plan projects with prices and payment plans?"
              )}
              target="_blank"
              rel="noopener"
              className="btn btn-yellow"
            >
              Ask us for the full list →
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <div className="logo logo-footer">
                <span className="logo-mark">S</span>
                <span className="logo-text">
                  Simple<span className="logo-sub">real estate</span>
                </span>
              </div>
              <p>{site.tagline}</p>
              <p>{site.office}</p>
            </div>
            <nav className="footer-links">
              <a href="/projects">Projects</a>
              <a href="/#cost">Cost calculator</a>
              <a href="/#yield">Yield calculator</a>
              <a href="/#mortgage">Mortgage</a>
              <a href="/#faq">FAQ</a>
            </nav>
            <nav className="footer-links">
              <a href={waLink()} target="_blank" rel="noopener">WhatsApp {site.phone}</a>
              <a href={`mailto:${site.email}`}>{site.email}</a>
              <a href={site.instagram} target="_blank" rel="noopener">Instagram</a>
              <a href={site.linkedin} target="_blank" rel="noopener">LinkedIn</a>
              <a href={site.facebook} target="_blank" rel="noopener">Facebook</a>
            </nav>
          </div>
          <div className="footer-wordmark">SIMPLE&nbsp;REAL&nbsp;ESTATE</div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Simple Real Estate. UAE.</span>
            <span>Numbers are estimates for guidance, not financial advice.</span>
          </div>
        </div>
      </footer>
    </>
  );
}
