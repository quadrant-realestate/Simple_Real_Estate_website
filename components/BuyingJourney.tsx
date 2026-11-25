"use client";

/* A pinned "buying journey" section: scrolling drives one progress value, and
   the clock (months), % paid, AED paid, status and the lit rows are ALL
   interpolated from the SAME two series (MONTHS + PAID), so they can never
   disagree. One rAF-throttled scroll handler, CSS-sticky pin. */
import { useEffect, useRef } from "react";

const MONTHS = [0, 1, 8, 20, 24]; // months elapsed at each stage
const PAID = [5, 24, 55, 85, 100]; // cumulative % of price paid at each stage
const PRICE = 1_800_000; // sample AED off-plan unit

const ROWS = [
  { t: "Month 00", label: "Reserved", note: "5% booking deposit" },
  { t: "Month 01", label: "SPA signed", note: "4% DLD fee · Oqood registered" },
  { t: "Month 08", label: "On plan", note: "construction installments" },
  { t: "Month 20", label: "Pre-handover", note: "final payment due" },
  { t: "Month 24", label: "Handover", note: "keys · title deed" },
];

function lerp(arr: number[], p: number) {
  const f = p * (arr.length - 1);
  const i = Math.min(arr.length - 2, Math.floor(f));
  return arr[i] + (arr[i + 1] - arr[i]) * (f - i);
}

export default function BuyingJourney() {
  const root = useRef<HTMLElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const moRef = useRef<HTMLSpanElement>(null);
  const aedRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const meterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rows = rowsRef.current ? Array.from(rowsRef.current.children) : [];
    const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
    let lastLit = -1;

    const render = (p: number) => {
      const mo = lerp(MONTHS, p);
      const paid = lerp(PAID, p);
      if (pctRef.current) pctRef.current.textContent = Math.round(paid) + "%";
      if (moRef.current) moRef.current.textContent = Math.round(mo) + " mo elapsed";
      if (aedRef.current)
        aedRef.current.textContent =
          "AED " + ((PRICE * paid) / 100 / 1e6).toFixed(2) + "M of 1.80M";
      if (meterRef.current) meterRef.current.style.transform = "scaleX(" + p.toFixed(4) + ")";
      const lit = p <= 0 ? 0 : Math.min(4, Math.floor(p * 5));
      if (lit !== lastLit) {
        rows.forEach((r, i) => (r as HTMLElement).classList.toggle("lit", i <= lit));
        if (statusRef.current) statusRef.current.textContent = ROWS[lit].label;
        lastLit = lit;
      }
    };

    if (reduce) {
      render(1); // freeze at the final, complete state
      return;
    }

    let ticking = false;
    const progress = () => {
      const r = el.getBoundingClientRect();
      const span = r.height - window.innerHeight;
      if (span <= 0) return r.top <= 0 ? 1 : 0;
      return clamp(-r.top / span, 0, 1);
    };
    const update = () => {
      ticking = false;
      render(progress());
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="journey" ref={root} aria-label="The off-plan buying journey">
      <div className="journey-sticky">
        <div className="container journey-grid">
          <div className="journey-left">
            <span className="journey-eyebrow">The whole journey</span>
            <h2>
              From reserved to <span className="mark-word">keys</span> — every step, every cost.
            </h2>
            <div className="journey-rows" ref={rowsRef}>
              {ROWS.map((r) => (
                <div className="jrow" key={r.t}>
                  <span className="jrow-t">{r.t}</span>
                  <span className="jrow-lab">{r.label}</span>
                  <span className="jrow-note">{r.note}</span>
                </div>
              ))}
            </div>
          </div>

          <aside className="journey-panel">
            <div className="jp-top">
              <span>Sample · AED 1.8M unit</span>
              <span className="jp-status" ref={statusRef}>Reserved</span>
            </div>
            <div className="jp-mid">
              <span className="jp-label">Paid to date</span>
              <span className="jp-pct" ref={pctRef}>5%</span>
            </div>
            <div className="jp-foot">
              <span ref={moRef}>0 mo elapsed</span>
              <span ref={aedRef}>AED 0.09M of 1.80M</span>
            </div>
            <span className="jp-meter"><span className="jp-meter-fill" ref={meterRef} /></span>
          </aside>
        </div>
      </div>
    </section>
  );
}
