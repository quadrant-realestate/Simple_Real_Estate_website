"use client";

import { useEffect, useRef } from "react";

export default function HeroKey() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<SVGGElement>(null);
  const glowRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const keyEl = keyRef.current;
    const glowEl = glowRef.current;
    if (!wrap || !keyEl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    // target (where the mouse points) and current (eased) positions, -1..1
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let raf = 0;
    let lastMove = 0; // when the pointer last moved

    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      lastMove = performance.now();
    };
    const onLeave = () => { lastMove = 0; };

    const tick = (now: number) => {
      // when the pointer is idle, the key keeps a slow, living sway (reel feel)
      if (now - lastMove > 1200) {
        const t = now / 1000;
        tx = Math.sin(t * 0.55) * 0.5;
        ty = Math.sin(t * 0.8) * 0.4;
      }
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      // gentle vertical float layered on top of the pointer/idle motion
      const floatY = Math.sin(now / 1500) * 5;
      // key moves with the pointer, tilts slightly
      keyEl.setAttribute(
        "transform",
        `rotate(-20 180 180) translate(${cx * 14} ${cy * 14 + floatY}) rotate(${cx * 4})`
      );
      // glow drifts the opposite way for depth
      if (glowEl) {
        glowEl.setAttribute("cx", String(180 - cx * 10));
        glowEl.setAttribute("cy", String(168 - cy * 10));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    wrap.addEventListener("pointermove", onMove);
    wrap.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener("pointermove", onMove);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="hero-art" ref={wrapRef}>
      <svg
        viewBox="0 0 360 340"
        className="hero-figure"
        role="img"
        aria-label="A gold key with a house in its head"
      >
        <defs>
          <radialGradient id="keyHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C6A75A" stopOpacity="0.20" />
            <stop offset="55%" stopColor="#C6A75A" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#C6A75A" stopOpacity="0" />
          </radialGradient>
          <filter id="keyLift" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="10" stdDeviation="12" floodColor="#A98B41" floodOpacity="0.28" />
          </filter>
        </defs>

        {/* soft gold halo instead of the navy card */}
        <circle ref={glowRef} cx="180" cy="168" r="132" fill="url(#keyHalo)" />

        <g ref={keyRef} transform="rotate(-20 180 180)" style={{ willChange: "transform" }} filter="url(#keyLift)">
          {/* bow with house */}
          <circle cx="180" cy="116" r="44" fill="none" stroke="#C6A75A" strokeWidth="8" />
          <circle cx="180" cy="116" r="44" fill="none" stroke="#A98B41" strokeWidth="1" opacity="0.4" />
          <path d="M162 118 L180 98 L198 118 Z" fill="#C6A75A" />
          <rect x="167" y="118" width="26" height="24" fill="#C6A75A" />
          <rect x="176" y="126" width="8" height="11" fill="#FBF8F2" />
          {/* shaft */}
          <rect x="174" y="158" width="12" height="108" rx="3" fill="#C6A75A" />
          {/* teeth */}
          <rect x="186" y="232" width="16" height="11" rx="2" fill="#C6A75A" />
          <rect x="186" y="250" width="26" height="11" rx="2" fill="#C6A75A" />
          {/* travelling specular shine on the key head */}
          <circle className="key-shine" cx="168" cy="104" r="7" fill="#FFF7E4" opacity="0" />
        </g>

        {/* asymmetric 2-corner brackets (top-left + bottom-right) */}
        <g fill="none" stroke="#C6A75A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55">
          <path d="M30 70 L30 42 Q30 40 32 40 L60 40" />
          <path d="M330 270 L330 298 Q330 300 328 300 L300 300" />
        </g>
        {/* tiny diamond accents on the two active corners */}
        <g fill="#C6A75A" opacity="0.6">
          <rect x="38" y="48" width="4" height="4" transform="rotate(45 40 50)" />
          <rect x="318" y="288" width="4" height="4" transform="rotate(45 320 290)" />
        </g>

        {/* label */}
        <text x="180" y="293" textAnchor="middle" fontFamily="Archivo, sans-serif" fontSize="11" letterSpacing="4" fontWeight="700" fill="#A98B41" opacity="0.9">YOUR&#160;KEY&#160;TO&#160;DUBAI</text>
      </svg>
    </div>
  );
}
