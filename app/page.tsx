import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import HeroSearch from "@/components/HeroSearch";
import HeroGuy from "@/components/HeroGuy";
import HeroScene from "@/components/HeroScene";
import HorizontalGallery from "@/components/HorizontalGallery";
import BuyingJourney from "@/components/BuyingJourney";
import ReelTowers from "@/components/ReelTowers";
import { ManPhone, ManCheer, ManCoins, ManWave } from "@/components/Characters";
import ExitKitModal from "@/components/ExitKitModal";
import ProjectCard from "@/components/ProjectCard";
import { CostCalculator, YieldCalculator } from "@/components/Calculators";
import { SafetyChecklist, VisaMeter, LeadFormPro } from "@/components/Interactive";
import {
  site,
  waLink,
  projects,
  escrowSteps,
  trustStats,
  marketHeadline,
  areaPrices,
} from "@/lib/site";

const maxSqft = Math.max(...areaPrices.map((a) => a.sqft));

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollReveal />

      {/* HERO — prop971-style dark hero: centered headline over a skyline + tabbed search */}
      <section className="hero hero-center">
        <span className="hero-halftone" aria-hidden="true" />
        {/* reel-style flat scene: grass, trees, towers */}
        <span className="hero-scene" aria-hidden="true"><HeroScene /></span>
        {/* blocky cartoon characters, Instagram-reel style */}
        <span className="hero-char hero-char-l" aria-hidden="true"><HeroGuy /></span>
        <span className="hero-char hero-char-r" aria-hidden="true"><ManCheer /></span>
        {/* floating yellow word-stickers, Instagram-reel style */}
        <span className="hero-sticker hs1" aria-hidden="true">REAL NUMBERS</span>
        <span className="hero-sticker hs2" aria-hidden="true">NO SIGN-UP</span>
        <span className="hero-sticker hs3" aria-hidden="true">DLD DATA</span>
        {/* birds drifting across the sky — ambient life up top */}
        <span className="hero-bird hb1" aria-hidden="true">
          <svg viewBox="0 0 26 12"><path d="M2 9 Q6.5 2 11 9 Q15.5 2 20 9" fill="none" stroke="#2A3B55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <span className="hero-bird hb2" aria-hidden="true">
          <svg viewBox="0 0 26 12"><path d="M2 9 Q6.5 2 11 9 Q15.5 2 20 9" fill="none" stroke="#2A3B55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
        <div className="container">
          <div className="hero-stack">
            <span className="tag">What it really costs</span>
            <h1 className="light">
              See the <span className="mark-word">real cost</span> of any Dubai off-plan home.
            </h1>
            <p className="hero-sub">
              The asking price is never the price. We add every hidden fee from real
              Dubai Land Department data — <strong>free, no sign-up</strong>.
            </p>

            <HeroSearch />

            <a href="/projects?sort=new" className="hero-banner">
              <span className="hero-banner-badge">NEW</span>
              <span className="hero-banner-txt">
                <strong>New launches open now</strong>
                First-day pricing and the longest payment plans, before public release.
              </span>
              <span className="hero-banner-go">See new projects →</span>
            </a>

            <div className="hsearch-pills">
              <span className="hsearch-pill"><strong>0%</strong> property tax</span>
              <span className="hsearch-pill"><strong>Golden Visa</strong> from AED 2M</span>
              <span className="hsearch-pill"><strong>100%</strong> freehold</span>
            </div>

            <a href="#market" className="hero-data-link">Open free market data →</a>
          </div>
        </div>
      </section>

      {/* MARQUEE — real facts */}
      <div className="marquee">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              OFF-PLAN MONEY IS LOCKED IN ESCROW BY LAW&nbsp;&nbsp;•&nbsp;&nbsp;DLD
              TRANSFER FEE: 4%&nbsp;&nbsp;•&nbsp;&nbsp;AED 2M+ → 10-YEAR GOLDEN
              VISA&nbsp;&nbsp;•&nbsp;&nbsp;5% HELD BACK FOR A
              YEAR&nbsp;&nbsp;•&nbsp;&nbsp;CHECK ANY PROJECT ON DUBAI
              REST&nbsp;&nbsp;•&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* TRUST BAND */}
      <section className="trust">
        <div className="container trust-grid">
          {trustStats.map((s) => (
            <div className="trust-item" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* MARKET DATA — real Dubai figures */}
      <section className="section market" id="market">
        <div className="container has-char">
          <div className="sec-char" aria-hidden="true"><ManPhone /></div>
          <div className="sign"><span className="pulse-dot" aria-hidden="true" />Live Dubai market data</div>
          <h2>Dubai, <span className="italic-mark">by the numbers.</span></h2>
          <p className="section-lead">
            Real figures from Dubai Land Department transactions over the last
            12 months — not a brochure.
          </p>

          <div className="market-stats">
            {marketHeadline.map((m) => (
              <div className="market-stat" key={m.label}>
                <strong>{m.value}</strong>
                <span className="market-stat-label">{m.label}</span>
                <span className="market-stat-sub">{m.sub}</span>
              </div>
            ))}
          </div>

          <ReelTowers />

          <div className="market-chart-wrap">
            <div className="market-chart-head">
              <span>Median price per sq ft, by area</span>
              <span>AED · gross yield</span>
            </div>
            <div className="market-chart">
              {areaPrices.map((a, i) => (
                <div className="mkt-row" key={a.area}>
                  <span className="mkt-area">{a.area}</span>
                  <div className="mkt-bar">
                    <div
                      className={`mkt-bar-fill${a.area.includes("median") ? " base" : ""}`}
                      style={{
                        ["--w" as string]: `${(a.sqft / maxSqft) * 100}%`,
                        transitionDelay: `${i * 90}ms`,
                      }}
                    >
                      <span className="mkt-val">
                        {a.sqft.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <span className="mkt-yield">{a.yield}</span>
                </div>
              ))}
            </div>
            <p className="projects-note">
              Source: Dubai Land Department sale transactions, trailing 12
              months. Figures are medians and move with the market — we confirm
              the current numbers for your exact unit before you buy.
            </p>
          </div>
        </div>
      </section>

      {/* HORIZONTAL PINNED GALLERY — scroll locks, cards slide sideways */}
      <HorizontalGallery />

      {/* 01 — COST CALCULATOR */}
      <section className="section" id="cost">
        <div className="container has-char">
          <div className="sec-char" aria-hidden="true"><ManCoins /></div>
          <div className="sign"><span className="sign-num">01</span>Your true cash on day one</div>
          <h2>What you&apos;ll <span className="italic-mark">really</span> pay up front.</h2>
          <p className="section-lead">
            Move the slider and see your <strong>true cash needed</strong> on day
            one — for a cash purchase or with a mortgage. No surprises at the
            counter.
          </p>
          <CostCalculator />
        </div>
      </section>

      {/* 02 — PROJECTS */}
      <section className="section tint" id="projects">
        <div className="container">
          <div className="sign"><span className="sign-num">02</span>Off-plan, honestly priced</div>
          <h2>Projects we <span className="italic-mark">actually like.</span></h2>
          <p className="section-lead">
            A short, honest shortlist of Dubai off-plan launches — real
            developers, real starting prices, real handover dates. Tap any one
            and we&apos;ll send you the full numbers.
          </p>
          <div className="projects-grid">
            {projects.slice(0, 3).map((p) => (
              <ProjectCard p={p} key={p.name} />
            ))}
          </div>
          <div className="projects-cta">
            <a href="/projects" className="btn btn-dark">
              See all {projects.length} projects →
            </a>
          </div>
          <p className="projects-note">
            Prices and handover dates are indicative and set by the developer.
            We confirm the current figures with you before anything is signed.
          </p>
        </div>
      </section>

      <BuyingJourney />

      {/* 03 — OFF-PLAN SAFETY: escrow explained + interactive checklist (merged) */}
      <section className="section dark" id="safety">
        <div className="container has-char">
          <div className="sec-char" aria-hidden="true"><ManWave /></div>
          <div className="sign sign-light"><span className="sign-num">03</span>Before you transfer a dirham</div>
          <h2 className="light">
            In the UAE, your off-plan money is
            <br />
            <span className="italic-mark yellow">locked by law.</span>
          </h2>
          <p className="section-lead light">
            Since 2007, every off-plan project must keep buyers&apos; money in its
            own government-watched <strong>escrow account</strong>. Here is
            exactly what happens to every dirham you pay — and the law behind it.
          </p>

          <div className="escrow-grid">
            {escrowSteps.map((s) => (
              <article className="escrow-card" key={s.n}>
                <span className="escrow-n">{s.n}</span>
                <h4>{s.title}</h4>
                <p>{s.body}</p>
                <span className="escrow-cite">{s.cite}</span>
              </article>
            ))}
          </div>

          <div className="verify-trio">
            <div className="verify">
              <span className="verify-k">Before they can sell</span>
              <p>A developer must be licensed, hand the land&apos;s title deed to open the escrow account, and get written approval before advertising off-plan units.</p>
            </div>
            <div className="verify">
              <span className="verify-k">Your job</span>
              <p>Pay only into the registered escrow account. Escrow only protects money that actually goes into it — never pay cash or a personal account.</p>
            </div>
            <div className="verify">
              <span className="verify-k">5-minute check</span>
              <p>Look the project up on <strong>Dubai REST</strong>, the Land Department&apos;s official app — it shows the developer, progress and escrow details.</p>
            </div>
          </div>

          <div className="escrow-safety">
            <h3 className="light">Now run the check on your own project.</h3>
            <p className="section-lead light">
              Tick what you&apos;ve already verified. Most of it takes five minutes in
              the Dubai REST app. Don&apos;t send money until the score hits ten.
            </p>
            <SafetyChecklist />
          </div>
        </div>
      </section>

      {/* 04 — YIELD */}
      <section className="section" id="yield">
        <div className="container has-char">
          <div className="sec-char" aria-hidden="true"><ManCheer /></div>
          <div className="sign"><span className="sign-num">04</span>Gross sells, net pays</div>
          <h2>Gross yield <span className="italic-mark">sells.</span> Net yield <span className="italic-mark">pays.</span></h2>
          <p className="section-lead">
            Agents quote the big &quot;gross yield&quot; number. But after service
            charges and empty months, your <strong>real</strong> return is lower.
            Here&apos;s the honest math.
          </p>
          <YieldCalculator />
        </div>
      </section>

      {/* 05 — VISA */}
      <section className="section dark visa" id="visa">
        <div className="container">
          <div className="sign sign-light"><span className="sign-num">05</span>They came to race. They stayed.</div>
          <div className="visa-grid">
            <div>
              <h2 className="light">Invest. Get a <span className="italic-mark yellow">10-year visa.</span></h2>
              <p className="section-lead light">
                Buy property worth <strong>AED 2 million</strong> or more and you
                can apply for the UAE Golden Visa — 10 years of residency for you
                and your family. Mortgaged and off-plan homes can count, with
                conditions. Drag the slider to see where you stand.
              </p>
              <VisaMeter />
              <ul className="check-list light-check">
                <li>10-year renewable residency</li>
                <li>Sponsor spouse, children &amp; parents</li>
                <li>Works for ready and off-plan (with conditions)</li>
                <li>No need to live here full-time</li>
              </ul>
            </div>
            <div className="visa-card">
              <div className="visa-card-top">
                <span>UNITED ARAB EMIRATES</span>
                <span className="visa-chip">GOLDEN</span>
              </div>
              <div className="visa-card-mid">10-YEAR RESIDENCE</div>
              <div className="visa-card-bottom">
                <span>FROM</span>
                <strong>AED 2,000,000</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 06 — CONTACT */}
      <section className="section cta-section" id="contact">
        <div className="container">
          <div className="cta-card">
            <div className="cta-copy">
              <div className="sign sign-light"><span className="sign-num">06</span>Free project check</div>
              <h2 className="light">
                Send us the project.
                <br />
                <span className="italic-mark yellow">We&apos;ll simplify it.</span>
              </h2>
              <p className="light">
                Found a property and not sure the numbers make sense? Send it
                over. We&apos;ll break down the real cost, the escrow and developer
                checks, the net yield, and whether it fits your goal — in plain
                words, with no pressure.
              </p>
              <ul className="cta-points">
                <li>True cost and cash needed on day one</li>
                <li>Escrow, developer &amp; broker checks</li>
                <li>Net yield with the building&apos;s real service charge</li>
                <li>A shortlist that fits your goal</li>
              </ul>
              <div className="contact-direct">
                <a href={waLink()} target="_blank" rel="noopener">
                  <svg className="contact-ic" viewBox="0 0 28 28" aria-hidden="true">
                    <rect x="1.3" y="1.3" width="25.4" height="25.4" rx="7" fill="#F7C21C" stroke="#14110A" strokeWidth="2.3" />
                    <path d="M14 6.4a7 7 0 0 0-6 10.7L6.7 21.2l4.2-1.1A7 7 0 1 0 14 6.4Z" fill="#fff" stroke="#14110A" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M11.7 10.9c-.3 0-.6.3-.5.6.3 2.1 1.9 3.7 4 4 .3 0 .6-.2.6-.5v-.9c0-.2-.1-.4-.3-.4l-1.1-.2c-.2 0-.4 0-.5.2l-.4.4a4.4 4.4 0 0 1-1.6-1.6l.4-.4c.1-.1.2-.3.1-.5l-.2-1.1c0-.2-.2-.3-.4-.3h-.1Z" fill="#14110A" />
                  </svg>
                  WhatsApp {site.phone}
                </a>
                <a href={`tel:${site.phoneTel}`}>
                  <svg className="contact-ic" viewBox="0 0 28 28" aria-hidden="true">
                    <rect x="1.3" y="1.3" width="25.4" height="25.4" rx="7" fill="#F7C21C" stroke="#14110A" strokeWidth="2.3" />
                    <path d="M9.6 8.2c-1 0-1.9.8-1.8 1.9C8.3 16 12 19.7 17.9 20.2c1.1.1 1.9-.8 1.9-1.8v-1.9c0-.5-.4-.9-.9-1l-2.7-.6c-.5-.1-.9 0-1.2.4l-.8 1a9.8 9.8 0 0 1-3.8-3.8l1-.8c.4-.3.5-.8.4-1.2l-.6-2.7c-.1-.5-.5-.9-1-.9H9.6Z" fill="#14110A" />
                  </svg>
                  Call {site.phone}
                </a>
                <a href={`mailto:${site.email}`}>
                  <svg className="contact-ic" viewBox="0 0 28 28" aria-hidden="true">
                    <rect x="1.3" y="1.3" width="25.4" height="25.4" rx="7" fill="#F7C21C" stroke="#14110A" strokeWidth="2.3" />
                    <rect x="6.5" y="9" width="15" height="11" rx="2.5" fill="#fff" stroke="#14110A" strokeWidth="2" />
                    <path d="M7.5 10.6 14 15l6.5-4.4" fill="none" stroke="#14110A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {site.email}
                </a>
                <a href={site.mapUrl} target="_blank" rel="noopener">
                  <svg className="contact-ic" viewBox="0 0 28 28" aria-hidden="true">
                    <rect x="1.3" y="1.3" width="25.4" height="25.4" rx="7" fill="#F7C21C" stroke="#14110A" strokeWidth="2.3" />
                    <path d="M14 6.4c-3.3 0-6 2.6-6 5.9 0 4.2 6 9.3 6 9.3s6-5.1 6-9.3c0-3.3-2.7-5.9-6-5.9Z" fill="#E8553A" stroke="#14110A" strokeWidth="2" strokeLinejoin="round" />
                    <circle cx="14" cy="12.3" r="2.3" fill="#fff" stroke="#14110A" strokeWidth="1.6" />
                  </svg>
                  {site.office}
                </a>
                <a href={site.instagram} target="_blank" rel="noopener">
                  <svg className="contact-ic" viewBox="0 0 28 28" aria-hidden="true">
                    <rect x="1.3" y="1.3" width="25.4" height="25.4" rx="7" fill="#F7C21C" stroke="#14110A" strokeWidth="2.3" />
                    <rect x="7" y="7" width="14" height="14" rx="4.5" fill="#fff" stroke="#14110A" strokeWidth="2" />
                    <circle cx="14" cy="14" r="3.4" fill="none" stroke="#14110A" strokeWidth="2" />
                    <circle cx="18.2" cy="9.8" r="1.2" fill="#14110A" />
                  </svg>
                  {site.instagramHandle}
                </a>
              </div>
            </div>
            <LeadFormPro />
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
              <a href="#cost">Cost calculator</a>
              <a href="#safety">Safety check</a>
              <a href="#yield">Yield calculator</a>
              <a href="#visa">Golden Visa</a>
              <a href="#contact">Contact</a>
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

      <ExitKitModal />
    </>
  );
}
