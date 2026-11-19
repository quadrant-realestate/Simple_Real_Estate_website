import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import HeroDots from "@/components/HeroDots";
import HeroKey from "@/components/HeroKey";
import ProjectCard from "@/components/ProjectCard";
import {
  CostCalculator,
  PaymentPlan,
  YieldCalculator,
  MortgageCalculator,
  LeadForm,
} from "@/components/Calculators";
import { site, waLink, projects } from "@/lib/site";

const stories: [string, string, string][] = [
  ["s1", "RENTING FOR 10 YEARS?", "What a decade of rent could have bought you instead."],
  ["s2", "THEY BOUGHT FROM THE SOFA", "How off-plan buying from your phone actually works — and stays safe."],
  ["s3", "NOBODY WANTED THIS ISLAND", "The land everyone ignored, and what it's worth today."],
  ["s4", "THE 2019 RULE NOBODY NOTICED", "A small law change that quietly reshaped the market."],
  ["s5", "SAME CRASH, WHO LOST?", "Who actually got hurt in the dip — and who didn't."],
  ["s6", "PERMISSION SLIP: FREEHOLD 2002", "The year foreigners were first allowed to own. Why it mattered."],
];

const faqs: [string, React.ReactNode][] = [
  ["Can a foreigner buy property in the UAE?", <>Yes. In designated <strong>freehold areas</strong> (most of new Dubai and parts of Abu Dhabi) anyone of any nationality can fully own property. No residency or local partner is required to buy.</>],
  ["How much cash do I need on top of the price?", <>Roughly <strong>6–8% extra</strong> for a cash purchase (4% DLD fee, ~2% agency, plus registration). With a mortgage, budget a bit more for bank and valuation fees. Use the cost calculator above for your exact number.</>],
  ["Is off-plan safe, or will I lose my money?", <>Your payments go into a government-controlled <strong>escrow account</strong>, released to the developer only as they build. We always verify the developer, escrow and RERA status before you pay anything.</>],
  ["What is a good rental yield in Dubai?", <><strong>Gross</strong> yields of 6–9% are common. But <strong>net</strong> (after service charges and empty periods) is usually 5–7%. The yield calculator above shows the honest figure.</>],
  ["Will buying get me a visa?", <>Property of <strong>AED 750k+</strong> can qualify for a 2-year investor visa, and <strong>AED 2M+</strong> for the 10-year Golden Visa, subject to conditions.</>],
  ["Do you charge me a fee?", <>For most new/off-plan projects the developer pays the commission, so our help costs you nothing. We&apos;ll always tell you upfront if anything applies.</>],
];

export default function Home() {
  return (
    <>
      <Nav />
      <ScrollReveal />

      {/* HERO */}
      <section className="hero">
        <HeroDots />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="tag">🇦🇪 UAE real estate, explained in numbers</div>
            <h1>
              UAE real estate,
              <br />
              <span className="mark-word">simplified.</span>
            </h1>
            <p className="lead">
              Most people buy property on feelings and fancy brochures. We show
              you the <strong>real numbers</strong> — in simple words — before
              you spend a single dirham.
            </p>
            <div className="hero-actions">
              <a href="#cost" className="btn btn-yellow">
                See what it really costs →
              </a>
              <a href="#contact" className="btn btn-ghost">
                Talk to a human
              </a>
            </div>
            <div className="hero-stats">
              <div><strong>4%</strong><span>DLD transfer fee</span></div>
              <div><strong>5–8%</strong><span>typical net yield</span></div>
              <div><strong>AED 2M</strong><span>Golden Visa door</span></div>
            </div>
          </div>
          <HeroKey />
        </div>
      </section>

      {/* MARQUEE */}
      <div className="marquee">
        <div className="marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              NO HYPE&nbsp;&nbsp;•&nbsp;&nbsp;JUST THE MATH&nbsp;&nbsp;•&nbsp;&nbsp;REAL
              NUMBERS&nbsp;&nbsp;•&nbsp;&nbsp;SIMPLE WORDS&nbsp;&nbsp;•&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* COST */}
      <section className="section" id="cost">
        <div className="container">
          <div className="sign">THE STICKER PRICE IS A LIE</div>
          <h2>What will it <span className="italic-mark">really</span> cost you?</h2>
          <p className="section-lead">
            The price on the brochure is not what you pay. In the UAE there are
            fees on top — government, agency, registration. Move the slider and
            see your <strong>true cash needed</strong> on day one.
          </p>
          <CostCalculator />
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section tint" id="projects">
        <div className="container">
          <div className="sign">OFF-PLAN, HONESTLY PRICED</div>
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

      {/* ESCROW */}
      <section className="section dark" id="escrow">
        <div className="container">
          <div className="sign sign-light">THEY BOUGHT FROM THE SOFA</div>
          <h2 className="light">
            In the UAE, your off-plan money is
            <br />
            <span className="italic-mark yellow">locked by law.</span>
          </h2>
          <p className="section-lead light">
            People get scared of buying a home that isn&apos;t built yet. Fair. So
            here is the simple truth: your money does <strong>not</strong> go to
            the developer&apos;s pocket. It goes into a government-watched{" "}
            <strong>escrow account</strong>, and the developer only gets it as
            they actually build.
          </p>
          <div className="steps">
            <div className="step"><span className="num">1</span><h4>You pay into escrow</h4><p>A bank account controlled by RERA — not the developer.</p></div>
            <div className="step"><span className="num">2</span><h4>They build</h4><p>Money is released in stages, only against real construction progress.</p></div>
            <div className="step"><span className="num">3</span><h4>You get the keys</h4><p>Final payment and title transfer happen at handover.</p></div>
          </div>
          <div className="safe-check">
            <h3>Is your project safe to pay?</h3>
            <p>Before you sign, we check these for you:</p>
            <ul className="check-list">
              <li>Developer is registered with DLD</li>
              <li>Project has a valid escrow account number</li>
              <li>Construction is on the official RERA progress tracker</li>
              <li>Payment plan matches the registered contract (Oqood)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* PLAN */}
      <section className="section" id="plan">
        <div className="container">
          <div className="sign">SEE EVERY PAYMENT FIRST</div>
          <h2>Payment plans, <span className="italic-mark">in plain English.</span></h2>
          <p className="section-lead">
            &quot;60/40&quot;, &quot;post-handover&quot;, &quot;1% monthly&quot; —
            developers love confusing names. Pick a plan and a price, and
            we&apos;ll show you exactly what you pay and when.
          </p>
          <PaymentPlan />
        </div>
      </section>

      {/* YIELD */}
      <section className="section tint" id="yield">
        <div className="container">
          <div className="sign">RENTING FOR 10 YEARS?</div>
          <h2>Gross yield <span className="italic-mark">sells.</span> Net yield <span className="italic-mark">pays.</span></h2>
          <p className="section-lead">
            Agents quote the big &quot;gross yield&quot; number. But after service
            charges and empty months, your <strong>real</strong> return is lower.
            Here&apos;s the honest math.
          </p>
          <YieldCalculator />
        </div>
      </section>

      {/* MORTGAGE */}
      <section className="section" id="mortgage">
        <div className="container">
          <div className="sign">THE BANK&apos;S REAL COST</div>
          <h2>Your monthly payment, <span className="italic-mark">before you fall in love.</span></h2>
          <p className="section-lead">
            Work out what the bank will ask for every month — and how much you
            need as a down payment.
          </p>
          <MortgageCalculator />
        </div>
      </section>

      {/* VISA */}
      <section className="section dark visa" id="visa">
        <div className="container visa-grid">
          <div>
            <div className="sign sign-light">THEY CAME TO RACE. THEY STAYED.</div>
            <h2 className="light">Invest. Get a <span className="italic-mark yellow">10-year visa.</span></h2>
            <p className="section-lead light">
              Buy property worth <strong>AED 2 million</strong> or more and you
              can apply for the UAE Golden Visa — 10 years of residency for you
              and your family. No local sponsor needed.
            </p>
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
      </section>

      {/* STORIES */}
      <section className="section tint" id="stories">
        <div className="container">
          <div className="sign">THE STUFF NOBODY TELLS YOU</div>
          <h2>UAE property, <span className="italic-mark">one true story at a time.</span></h2>
          <p className="section-lead">
            The short lessons from our page — the history, the mistakes, and the
            numbers behind how Dubai and Abu Dhabi got here.
          </p>
          <div className="story-grid">
            {stories.map(([cls, tag, text]) => (
              <article className={`story-card ${cls}`} key={cls}>
                <span className="story-tag">{tag}</span>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <a href={site.instagram} target="_blank" rel="noopener" className="btn btn-dark follow-btn">
            Follow {site.instagramHandle} →
          </a>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <div className="sign">QUESTIONS BUYERS ACTUALLY ASK</div>
          <h2>Straight answers, <span className="italic-mark">no sales talk.</span></h2>
          <div className="faq-list">
            {faqs.map(([q, a], i) => (
              <details key={i}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section cta-section" id="contact">
        <div className="container">
          <div className="cta-card">
            <div className="cta-copy">
              <h2 className="light">
                Send us the project.
                <br />
                <span className="italic-mark yellow">We&apos;ll simplify it.</span>
              </h2>
              <p className="light">
                Found a property and not sure if the numbers make sense? Send it
                over. We&apos;ll break down the real cost, the yield, and whether
                it&apos;s actually a good deal — in plain words, with no pressure.
              </p>
              <div className="contact-direct">
                <a href={waLink()} target="_blank" rel="noopener">💬 WhatsApp {site.phone}</a>
                <a href={`tel:${site.phoneTel}`}>📞 Call {site.phone}</a>
                <a href={`mailto:${site.email}`}>✉️ {site.email}</a>
                <a href={site.mapUrl} target="_blank" rel="noopener">📍 {site.office}</a>
                <a href={site.instagram} target="_blank" rel="noopener">📷 {site.instagramHandle}</a>
              </div>
            </div>
            <LeadForm />
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
              <a href="#yield">Yield calculator</a>
              <a href="#mortgage">Mortgage</a>
              <a href="#faq">FAQ</a>
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
