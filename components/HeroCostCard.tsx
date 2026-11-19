"use client";
import { useEffect, useRef, useState } from "react";

/* Hero "decode the price" card. A listing-price tag sits over a halftone dot
   field. A magnifying glass searches across it, and inside its dark glass the
   REAL price is revealed — the fees the brochure hides. Below, the true total
   counts up. The lens auto-sweeps and follows the mouse on desktop; on touch /
   reduced-motion it rests over the reveal. */

const LISTING = 2000000;
const FEES = 131000; // DLD 80,000 + agency 42,000 + registration 9,000
const REAL = LISTING + FEES; // 2,131,000
const money = (n: number) => "AED " + Math.round(n).toLocaleString("en-US");

export default function HeroCostCard() {
  const [shown, setShown] = useState(REAL);
  const [revealed, setRevealed] = useState(true);
  const raf = useRef(0);
  const tagRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);

  // reveal card below: count the true total up, then loop
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
        setShown(LISTING + FEES * (1 - Math.pow(1 - p, 3)));
      }
      raf.current = requestAnimationFrame(loop);
    };
    raf.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  // the magnifier search: sweeps across the tag, follows the mouse on desktop
  useEffect(() => {
    const tag = tagRef.current;
    const lens = lensRef.current;
    if (!tag || !lens) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const hero = tag.closest<HTMLElement>(".hero") || document.body;

    let mx: number | null = null;
    let my: number | null = null;
    const onMove = (e: MouseEvent) => {
      const b = tag.getBoundingClientRect();
      mx = e.clientX - b.left;
      my = e.clientY - b.top;
    };
    const onLeave = () => {
      mx = null;
      my = null;
    };
    if (!coarse && !reduce) {
      hero.addEventListener("mousemove", onMove);
      hero.addEventListener("mouseleave", onLeave);
    }

    let lx = 0;
    let ly = 0;
    let started = false;
    const t0 = performance.now();
    let r = 0;
    const place = () => {
      tag.style.setProperty("--lx", lx + "px");
      tag.style.setProperty("--ly", ly + "px");
      lens.style.transform = `translate(${lx}px, ${ly}px)`;
    };
    const loop = (now: number) => {
      const b = tag.getBoundingClientRect();
      const W = b.width;
      const H = b.height;
      if (!started) {
        lx = W * 0.56;
        ly = H * 0.5;
        started = true;
      }
      let tx: number;
      let ty: number;
      if (mx != null && my != null) {
        tx = Math.max(W * 0.22, Math.min(W * 0.78, mx));
        ty = Math.max(H * 0.36, Math.min(H * 0.64, my));
      } else {
        const t = (now - t0) / 1000;
        tx = W * 0.5 + Math.sin(t * 0.8) * W * 0.24;
        ty = H * 0.5 + Math.sin(t * 1.5) * H * 0.12;
      }
      lx += (tx - lx) * 0.1;
      ly += (ty - ly) * 0.1;
      place();
      r = requestAnimationFrame(loop);
    };

    if (reduce) {
      const b = tag.getBoundingClientRect();
      lx = b.width * 0.56;
      ly = b.height * 0.5;
      place();
    } else {
      r = requestAnimationFrame(loop);
    }
    return () => {
      cancelAnimationFrame(r);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="hero-art">
      <span className="tag-field" aria-hidden="true" />

      <div
        className="price-tag"
        ref={tagRef}
        role="img"
        aria-label="A Dubai apartment listed at AED 2,000,000 actually costs about AED 2,131,000 once fees are added"
      >
        <span className="tag-string" aria-hidden="true" />
        <span className="tag-notch" aria-hidden="true" />
        <span className="tag-k">// listing price</span>
        <span className="tag-price">{money(LISTING)}</span>
        <span className="tag-meta">apartment · dubai · off-plan</span>

        {/* the real price, revealed only under the magnifier */}
        <div className="tag-truth" aria-hidden="true">
          <span className="tt-k">// real price</span>
          <span className="tt-row">DLD fee · 4%</span>
          <span className="tt-row">agency · 2% + VAT</span>
          <span className="tt-row">trustee &amp; bank</span>
          <span className="tt-total">≈ {money(REAL)}</span>
        </div>

        <div className="tag-lens" ref={lensRef} aria-hidden="true">
          <span className="lens-ring">
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
