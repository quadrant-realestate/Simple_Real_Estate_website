"use client";

/* Instagram-reel style: cartoon towers that GROW UP on scroll, under a bouncy
   yellow sticker stat. Heights come from the real areaPrices data; the sticker
   headline is a genuine figure derived from it (top area vs Dubai median).
   First frame is complete (towers full height); JS "arms" them to 0 then grows
   them in view, so no-JS and reduced-motion both render correctly. */
import { useEffect, useRef } from "react";
import { areaPrices } from "@/lib/site";

export default function ReelTowers() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    el.classList.add("reel-armed"); // collapse towers, ready to grow
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add("in");
            io.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const max = Math.max(...areaPrices.map((a) => a.sqft));
  const top = areaPrices[0];
  const median = areaPrices[areaPrices.length - 1];
  const pct = Math.round((top.sqft / median.sqft - 1) * 100);

  return (
    <div className="reel" ref={ref} aria-label="Price per sq ft by area">
      <span className="reel-sticker">
        {top.area} costs <strong>{pct}% more</strong> than the Dubai median
      </span>
      <div className="reel-chart">
        {areaPrices.map((a, i) => {
          const isMed = a.area.includes("median");
          return (
            <div className="reel-col" key={a.area}>
              <span className="reel-cap">{a.sqft.toLocaleString()}</span>
              <div className="reel-tower">
                <div
                  className={`reel-fill${isMed ? " med" : ""}`}
                  style={{
                    ["--h" as string]: `${(a.sqft / max) * 100}%`,
                    transitionDelay: `${i * 110}ms`,
                  }}
                />
              </div>
              <span className="reel-area">{a.area.replace(" — median", " med.")}</span>
            </div>
          );
        })}
      </div>
      <div className="reel-ground" aria-hidden="true" />
    </div>
  );
}
