"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* useLayoutEffect runs before paint (so we measure correct widths), but it warns
   during SSR — fall back to useEffect on the server. */
const useIsoLayoutEffect = typeof document !== "undefined" ? useLayoutEffect : useEffect;

type Panel = {
  budget: string;
  tag: string;
  title: string;
  body: string;
  stat: string;
};

/* "What your budget actually buys in Dubai" — concrete, and NOT a repeat of the
   Cost / Escrow / Yield / Visa sections below. */
const PANELS: Panel[] = [
  {
    budget: "AED 650K",
    tag: "READY NOW",
    title: "A studio in JVC or Arjan.",
    body: "Handed over and tenant-ready — one of Dubai's highest-yield entry points for a first investment.",
    stat: "≈ 8% gross yield",
  },
  {
    budget: "AED 1.2M",
    tag: "OFF-PLAN",
    title: "A 1-bed in Business Bay.",
    body: "Central and walkable with steady tenant demand, on a payment plan that runs to handover.",
    stat: "≈ 7% gross yield",
  },
  {
    budget: "AED 2M",
    tag: "GOLDEN VISA",
    title: "A 2-bed in Dubai Marina.",
    body: "The threshold that unlocks the 10-year Golden Visa — for you, your spouse, children and parents.",
    stat: "10-year residency",
  },
  {
    budget: "AED 3.5M",
    tag: "FAMILY",
    title: "A 3-bed in Dubai Hills.",
    body: "Villa communities with schools and parks — built for families who come to stay, not to flip.",
    stat: "≈ 6% gross yield",
  },
  {
    budget: "AED 6M+",
    tag: "WATERFRONT",
    title: "A villa on the Palm or Creek.",
    body: "Branded, waterfront homes where long-term capital growth does most of the work.",
    stat: "Prime capital growth",
  },
];

export default function HorizontalGallery() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    const trackEl = track.current;
    if (!el || !trackEl) return;

    /* Build the pin + horizontal scrub immediately. We only pin on wide screens
       that don't ask for reduced motion; narrow screens fall back to a normal
       swipeable row (handled in CSS). gsap.matchMedia auto-cleans on revert. */
    const mm = gsap.matchMedia();
    mm.add(
      "(min-width: 820px) and (prefers-reduced-motion: no-preference)",
      () => {
        // Distance the track must travel = how much wider it is than the viewport.
        // Kept as a function so invalidateOnRefresh re-measures after resize.
        const distance = () => Math.max(0, trackEl.scrollWidth - el.clientWidth);

        const tween = gsap.to(trackEl, {
          x: () => -distance(),
          ease: "none",
        });

        const st = ScrollTrigger.create({
          trigger: el,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true, // re-run distance() on every refresh
          animation: tween,
          onUpdate: (self) => {
            if (bar.current) gsap.set(bar.current, { scaleX: self.progress });
          },
        });

        return () => {
          st.kill();
          tween.kill();
          gsap.set(trackEl, { clearProps: "transform" });
        };
      }
    );

    /* SAFETY / DELAY: the ScrollTrigger above already exists, but on first mount
       card widths and web fonts may not be final, so the pin distance could be
       measured from a half-rendered track. Re-measure once a frame + short delay
       later (invalidateOnRefresh re-runs distance()), and again on window load. */
    let timeoutId: number | undefined;
    const rafId = requestAnimationFrame(() => {
      timeoutId = window.setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    return () => {
      cancelAnimationFrame(rafId);
      if (timeoutId) window.clearTimeout(timeoutId);
      window.removeEventListener("load", onLoad);
      mm.revert();
    };
  }, []);

  /* Drag-to-scroll for the non-pinned (narrow-screen) swipe row — works for
     mouse, pen AND touch (incl. DevTools device mode). CSS sets touch-action:
     pan-y on the track, so the browser keeps vertical page scrolling while we
     drive the horizontal scroll ourselves (no double-scroll conflict). */
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const narrow = window.matchMedia("(max-width: 819px)");
    let active = false;
    let startX = 0;
    let startLeft = 0;

    const onDown = (e: PointerEvent) => {
      if (!narrow.matches) return;
      active = true;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      el.classList.add("hgal-grabbing");
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* older browsers — ignore */
      }
    };
    const onMove = (e: PointerEvent) => {
      if (!active) return;
      e.preventDefault(); // stop text selection / native fighting the drag
      el.scrollLeft = startLeft - (e.clientX - startX);
    };
    const onUp = () => {
      active = false;
      el.classList.remove("hgal-grabbing");
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove, { passive: false });
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <section className="hgal" ref={root} aria-label="What we answer">
      {/* persistent label top-left of the pinned viewport */}
      <div className="hgal-top">
        <span className="hgal-eyebrow">Dubai, by budget</span>
        <h2>
          What your money <span className="italic-mark">actually</span> buys.
        </h2>
        <span className="hgal-swipe" aria-hidden="true">
          Swipe <span className="hgal-swipe-arrow">→</span>
        </span>
      </div>

      <div className="hgal-track" ref={track}>
        {PANELS.map((p) => (
          <article className="hgal-card" key={p.budget}>
            <span className="hgal-budget">{p.budget}</span>
            <span className="hgal-tag">{p.tag}</span>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
            <span className="hgal-stat">{p.stat}</span>
          </article>
        ))}

        <article className="hgal-card hgal-cta">
          <span className="hgal-budget light">Your budget?</span>
          <h3 className="light">Tell us the number. We&apos;ll match it.</h3>
          <p>Real options for your exact budget — plain words, no pressure.</p>
          <a href="#contact" className="btn btn-yellow">Get matched →</a>
        </article>
      </div>

      {/* scroll-progress bar across the bottom of the pinned viewport */}
      <div className="hgal-progress" aria-hidden="true">
        <span className="hgal-progress-fill" ref={bar} />
      </div>
    </section>
  );
}
