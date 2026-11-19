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

export default function ProjectsPage() {
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
        </div>
      </section>

      {/* ALL PROJECTS */}
      <section className="section" id="projects">
        <div className="container">
          <div className="projects-grid">
            {projects.map((p) => (
              <ProjectCard p={p} key={p.name} />
            ))}
          </div>
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
