"use client";
import { useEffect, useRef, useState } from "react";

/* Hero "decode the price" card. A luggage-tag price label (listing price) sits
   over a halftone dot field with a magnifying glass — then the real cost is
   revealed below: the sticker price plus the fees the brochure hides. The
   reveal counts up and quietly loops. Honors prefers-reduced-motion. */

const LISTING = 2000000;
const FEES = 131000; // DLD 80,000 + agency 42,000 + registration 9,000
const REAL = LISTING + FEES; // 2,131,000
const money = (n: number) => "AED " + Math.round(n).toLocaleString("en-US");

export default function HeroCostCard() {
  const [shown, setShown] = useState(REAL);
  const [revealed, setRevealed] = useState(true);
  const raf = useRef(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(REAL);
      setRevealed(true);
      return;
    }
    const start = performance.now();
    const CYCLE = 6400;
    const loop = (now: number) => {
      const t = (now - start) % CYCLE;
      if (t < 1500) {
        setRevealed(false);
        setShown(LISTING);
      } else {
        setRevealed(true);
        const p = Math.min((t - 1500) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setShown(LISTING + FEES * eased);
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div className="hero-art">
      <span className="tag-field" aria-hidden="true" />

      <div
        className="price-tag"
        role="img"
        aria-label="A Dubai apartment listed at AED 2,000,000 actually costs about AED 2,131,000 once fees are added"
      >
        <span className="tag-string" aria-hidden="true" />
        <span className="tag-notch" aria-hidden="true" />
        <span className="tag-k">// listing price</span>
        <span className="tag-price">{money(LISTING)}</span>
        <span className="tag-meta">apartment · dubai · off-plan</span>
        <span className="tag-scan" aria-hidden="true" />
        <div className="tag-lens" aria-hidden="true">
          <span className="lens-ring">
            <span className="lens-wedge" />
            <span className="lens-glint" />
          </span>
          <span className="lens-stick" />
        </div>
      </div>

      <div className={`tag-reveal${revealed ? " on" : ""}`}>
        <span className="tag-reveal-k">// what you actually pay</span>
        <strong>{money(shown)}</strong>
        <span className="tag-reveal-chip">+ {money(FEES)} the brochure hides</span>
      </div>
    </div>
  );
}
