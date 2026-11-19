import Nav from "@/components/Nav";
import ScrollReveal from "@/components/ScrollReveal";
import HeroDots from "@/components/HeroDots";
import HeroCostCard from "@/components/HeroCostCard";
import ScrollCost from "@/components/ScrollCost";
import ProjectCard from "@/components/ProjectCard";
import {
  CostCalculator,
  PaymentPlan,
  YieldCalculator,
  MortgageCalculator,
} from "@/components/Calculators";
import {
  SafetyChecklist,
  VisaMeter,
  InvestorQuiz,
  LeadFormPro,
} from "@/components/Interactive";
import {
  site,
  waLink,
  projects,
  escrowSteps,
  reels,
  guides,
  glossary,
  trustStats,
  marketHeadline,
  areaPrices,
} from "@/lib/site";

const maxSqft = Math.max(...areaPrices.map((a) => a.sqft));

const faqs: [string, React.ReactNode][] = [
  ["Can a foreigner buy property in the UAE?", <>Yes. In designated <strong>freehold areas</strong> (most of new Dubai and parts of Abu Dhabi) anyone of any nationality can fully own property. No residency or local partner is required to buy.</>],
  ["How much cash do I need on top of the price?", <>Roughly <strong>6–8% extra</strong> for a cash purchase (4% DLD fee, ~2% agency, plus registration). With a mortgage, budget a bit more for bank and valuation fees. Use the cost calculator above for your exact number.</>],
  ["Is off-plan safe, or will I lose my money?", <>Your payments go into a government-controlled <strong>escrow account</strong>, released to the developer only as they build. We always verify the developer, escrow and RERA status before you pay anything.</>],
  ["What is a good rental yield in Dubai?", <><strong>Gross</strong> yields of 6–9% are common. But <strong>net</strong> (after service charges and empty periods) is usually 5–7%. The yield calculator above shows the honest figure.</>],
  ["Will buying get me a visa?", <>Property of <strong>AED 2M+</strong> can qualify for the 10-year Golden Visa, and <strong>AED 750k+</strong> for a 2-year investor visa, subject to conditions.</>],
  ["Can I get a mortgage as a non-resident?", <>Yes, many UAE banks lend to non-residents — usually up to <strong>50–60%</strong> of the price, at slightly higher rates. Residents can often borrow up to 80% on lower-priced homes.</>],
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
        <div className="hero-skyline" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="tag">🇦🇪 Dubai &amp; Abu Dhabi · real numbers, not brochures</div>
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
              <a href={waLink("Hi Simple Real Estate! I'd like to talk to a human about buying in the UAE.")} target="_blank" rel="noopener" className="btn btn-ghost">
                Talk to a human
              </a>
            </div>
            <ul className="hero-trust">
              <li><span className="hero-trust-dot" />Dubai Land Department data</li>
              <li><span className="hero-trust-dot" />RERA &amp; escrow checked</li>
              <li><span className="hero-trust-dot" />No fees to buyers</li>
            </ul>
            <div className="hero-stats">
              <div><strong>4%</strong><span>DLD transfer fee</span></div>
              <div><strong>5–8%</strong><span>typical net yield</span></div>
              <div><strong>AED 2M</strong><span>Golden Visa door</span></div>
            </div>
          </div>
          <HeroCostCard />
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
        <div className="container">
          <div className="sign"><span className="pulse-dot" aria-hidden="true" />Live Dubai market data</div>
          <h2>Dubai, <span className="italic-mark">by the numbers.</span></h2>
          <p className="section-lead">
            Not our opinion — the actual market. These are real figures from
            Dubai Land Department transactions over the last 12 months, so you
            start from the truth, not a brochure.
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

      {/* 01 — COST: scroll-scrubbed reveal, then the interactive calculator */}
      <section id="cost">
        <ScrollCost />
        <div className="section">
          <div className="container">
            <div className="sign"><span className="sign-num">01b</span>Now your turn</div>
            <h2>Try it with <span className="italic-mark">your</span> number.</h2>
            <p className="section-lead">
              Move the slider and see your <strong>true cash needed</strong> on day
              one — for a cash purchase or with a mortgage.
            </p>
            <CostCalculator />
          </div>
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

      {/* 03 — ESCROW / OFF-PLAN SIMPLIFIED */}
      <section className="section dark" id="escrow">
        <div className="container">
          <div className="sign sign-light"><span className="sign-num">03</span>Off-plan, simplified</div>
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
        </div>
      </section>

      {/* 04 — PAYMENT PLAN */}
      <section className="section" id="plan">
        <div className="container">
          <div className="sign"><span className="sign-num">04</span>See every payment first</div>
          <h2>Payment plans, <span className="italic-mark">in plain English.</span></h2>
          <p className="section-lead">
            &quot;60/40&quot;, &quot;post-handover&quot;, &quot;1% monthly&quot; —
            developers love confusing names. Pick a plan and a price, and
            we&apos;ll show you exactly what you pay and when.
          </p>
          <PaymentPlan />
        </div>
      </section>

      {/* 05 — SAFETY CHECK */}
      <section className="section tint" id="safety">
        <div className="container">
          <div className="sign"><span className="sign-num">05</span>Before you transfer a dirham</div>
          <h2>Is your project <span className="italic-mark">safe to pay?</span></h2>
          <p className="section-lead">
            Tick what you&apos;ve already verified. Most of it takes five minutes in
            the Dubai REST app. Don&apos;t send money until the score hits ten.
          </p>
          <SafetyChecklist />
        </div>
      </section>

      {/* 06 — YIELD */}
      <section className="section" id="yield">
        <div className="container">
          <div className="sign"><span className="sign-num">06</span>Gross sells, net pays</div>
          <h2>Gross yield <span className="italic-mark">sells.</span> Net yield <span className="italic-mark">pays.</span></h2>
          <p className="section-lead">
            Agents quote the big &quot;gross yield&quot; number. But after service
            charges and empty months, your <strong>real</strong> return is lower.
            Here&apos;s the honest math.
          </p>
          <YieldCalculator />
        </div>
      </section>

      {/* 07 — MORTGAGE */}
      <section className="section tint" id="mortgage">
        <div className="container">
          <div className="sign"><span className="sign-num">07</span>The bank&apos;s real cost</div>
          <h2>Your monthly payment, <span className="italic-mark">before you fall in love.</span></h2>
          <p className="section-lead">
            Work out what the bank will ask for every month — and how much you
            need as a down payment.
          </p>
          <MortgageCalculator />
        </div>
      </section>

      {/* 08 — VISA */}
      <section className="section dark visa" id="visa">
        <div className="container">
          <div className="sign sign-light"><span className="sign-num">08</span>They came to race. They stayed.</div>
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

      {/* 09 — INVESTOR MATCH */}
      <section className="section" id="match">
        <div className="container">
          <div className="sign"><span className="sign-num">09</span>60 seconds</div>
          <h2>What kind of Dubai <span className="italic-mark">investor are you?</span></h2>
          <p className="section-lead">
            Five quick questions. You get a plain-English profile — and the kind
            of projects worth looking at for it.
          </p>
          <div className="quiz-shell">
            <InvestorQuiz />
          </div>
        </div>
      </section>

      {/* 10 — REELS / INSTAGRAM */}
      <section className="section tint" id="reels">
        <div className="container">
          <div className="sign"><span className="sign-num">10</span>Explained in 50 seconds</div>
          <h2>Watch it, <span className="italic-mark">simplified.</span></h2>
          <p className="section-lead">
            Short, animated breakdowns from our page — the history, the mistakes,
            and the numbers behind how Dubai and Abu Dhabi got here. Comment the
            keyword on Instagram and the full guide lands in your DMs.
          </p>
          <div className="reels-grid">
            {reels.map((r) => (
              <a
                className="reel"
                href={r.href}
                target="_blank"
                rel="noopener"
                key={r.href}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="reel-cover" src={r.img} alt={r.title} loading="lazy" />
                <span className="reel-play" aria-hidden="true">▶</span>
                <span className="reel-foot">
                  <span className="reel-sub">{r.sub}</span>
                  <span className="reel-kw">comment “{r.keyword}” for the guide</span>
                </span>
              </a>
            ))}
          </div>
          <a href={`${site.instagram}/reels/`} target="_blank" rel="noopener" className="btn btn-dark follow-btn">
            Watch all reels on {site.instagramHandle} →
          </a>
        </div>
      </section>

      {/* 11 — FREE GUIDES */}
      <section className="section" id="guides">
        <div className="container">
          <div className="sign"><span className="sign-num">11</span>The investor kit, free</div>
          <h2>Everything you need, <span className="italic-mark">in writing.</span></h2>
          <p className="section-lead">
            The same guides people ask for in our comments — the real numbers,
            the checks, and worksheets for your own deal. No sign-up games.
          </p>
          <div className="guides-grid">
            {guides.map((g) => (
              <article className="guide-card" key={g.title}>
                <div className="guide-kicker">{g.kicker}</div>
                <h4>{g.title}</h4>
                <p>{g.desc}</p>
                <div className="guide-foot">
                  <span className="guide-pages">{g.pages}</span>
                  <a
                    href={waLink(
                      `Hi Simple Real Estate! Can you send me the free guide: "${g.title}"?`
                    )}
                    target="_blank"
                    rel="noopener"
                    className="guide-btn"
                  >
                    Get it free →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 12 — GLOSSARY */}
      <section className="section tint" id="glossary">
        <div className="container">
          <div className="sign"><span className="sign-num">12</span>Speak Dubai property</div>
          <h2>The jargon, <span className="italic-mark">in plain English.</span></h2>
          <p className="section-lead">
            Every term an agent will throw at you, in one line of plain English.
            Tap any card to read it.
          </p>
          <div className="glossary-grid">
            {glossary.map((t) => (
              <details className="gloss-card" key={t.term}>
                <summary>
                  <span className="gloss-term">{t.term}</span>
                  <span className="gloss-cat">{t.cat}</span>
                </summary>
                <p>{t.def}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 13 — FAQ */}
      <section className="section" id="faq">
        <div className="container">
          <div className="sign"><span className="sign-num">13</span>Questions buyers actually ask</div>
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

      {/* 14 — CONTACT */}
      <section className="section cta-section" id="contact">
        <div className="container">
          <div className="cta-card">
            <div className="cta-copy">
              <div className="sign sign-light"><span className="sign-num">14</span>Free project check</div>
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
                <a href={waLink()} target="_blank" rel="noopener">💬 WhatsApp {site.phone}</a>
                <a href={`tel:${site.phoneTel}`}>📞 Call {site.phone}</a>
                <a href={`mailto:${site.email}`}>✉️ {site.email}</a>
                <a href={site.mapUrl} target="_blank" rel="noopener">📍 {site.office}</a>
                <a href={site.instagram} target="_blank" rel="noopener">📷 {site.instagramHandle}</a>
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
              <a href="#glossary">Glossary</a>
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
