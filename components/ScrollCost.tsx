"use client";
import { useEffect, useRef, useState } from "react";

/* Scroll-scrubbed "real price" reveal. As the viewer scrolls through a tall
   section, a sticky price tag stays in view: its fees light up one by one and
   the real-price total counts up, tied to scroll position (scrubs both ways).
   Falls back to the fully-revealed state on small screens / reduced motion. */

const LISTING = 2000000;
const FEES = [
  { label: "Dubai Land Department · 4%", value: 80000 },
  { label: "Agency · 2% + VAT", value: 42000 },
  { label: "Trustee & title deed", value: 4780 },
  { label: "Bank: registration, valuation, arrangement", value: 23290 },
];
const FEE_TOTAL = FEES.reduce((s, f) => s + f.value, 0); // 150,070
const REAL = LISTING + FEE_TOTAL; // 2,150,070
const CASH = 400000 + FEE_TOTAL; // 20% down + fees = 550,070
const money = (n: number) => "AED " + Math.round(n).toLocaleString("en-US");

export default function ScrollCost() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || window.innerWidth < 900) {
      setP(1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = wrap.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const scrolled = Math.min(Math.max(-r.top, 0), Math.max(total, 1));
        setP(total > 0 ? scrolled / total : 1);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // feeProgress scrubs 0→1 over the middle of the scroll; before it, nothing
  const feeProgress = Math.min(Math.max((p - 0.1) / 0.72, 0), 1);
  const displayed = LISTING + FEE_TOTAL * feeProgress;
  const struck = p > 0.08;
  const cashOn = p > 0.9;

  return (
    <div className="scrub" ref={wrapRef}>
      <div className="scrub-sticky">
        <div className="container scrub-grid">
          <div className="scrub-copy">
            <div className="sign"><span className="sign-num">01</span>The sticker price is a lie</div>
            <h2>The price is where your <span className="italic-mark">budget starts.</span></h2>
            <p className="section-lead">
              A AED 2M home bought with a mortgage costs roughly <strong>7–8% more</strong>{" "}
              in fees — and your mortgage won&apos;t cover any of it. Keep scrolling
              and watch the real number add up.
            </p>
            <div className="scrub-progress" aria-hidden="true">
              <div className="scrub-progress-fill" style={{ width: `${feeProgress * 100}%` }} />
            </div>
          </div>

          <div className="scrub-card" aria-hidden="true">
            <div className="scrub-tag">
              <span className="scrub-tag-k">// listing price</span>
              <span className={`scrub-listing${struck ? " struck" : ""}`}>{money(LISTING)}</span>
              <span className="scrub-hole" />
            </div>

            <ul className="scrub-fees">
              {FEES.map((f, i) => {
                const on = feeProgress > (i + 0.35) / FEES.length;
                return (
                  <li className={`scrub-fee${on ? " on" : ""}`} key={f.label}>
                    <span>{f.label}</span>
                    <b>+ {f.value.toLocaleString("en-US")}</b>
                  </li>
                );
              })}
            </ul>

            <div className="scrub-total">
              <span>Real price</span>
              <strong>{money(displayed)}</strong>
            </div>

            <div className={`scrub-cash${cashOn ? " on" : ""}`}>
              <span>Cash needed with 20% down</span>
              <b>{money(CASH)}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
