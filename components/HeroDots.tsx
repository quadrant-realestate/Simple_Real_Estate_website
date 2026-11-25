"use client";
import { useEffect, useRef } from "react";

/* Interactive dot grid for the hero: dots grow and brighten near the cursor,
   and a soft ring trails the pointer. Pure canvas, pointer-events off so it
   never blocks clicks. Honors prefers-reduced-motion (renders a static grid). */
export default function HeroDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ring = ringRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const host = canvas.parentElement as HTMLElement;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const GAP = 24; // spacing between dots
    const R = 1.5; // base radius
    const RMAX = 5.5; // radius at the cursor
    const REACH = 125; // influence radius
    const DOT = "255,255,255"; // white on the sky hero

    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let dots: { x: number; y: number }[] = [];
    const mouse = { x: -9999, y: -9999, on: false };
    let raf = 0;

    // hero graphic follows the cursor (eased)
    const figure = host.querySelector<HTMLElement>(".hero-figure");
    let fx = 0, fy = 0, fr = 0; // current
    let tfx = 0, tfy = 0, tfr = 0; // target

    const build = () => {
      const rect = host.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      dots = [];
      for (let y = GAP / 2; y < h; y += GAP)
        for (let x = GAP / 2; x < w; x += GAP) dots.push({ x, y });
    };

    const paintStatic = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        ctx.beginPath();
        ctx.arc(d.x, d.y, R, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DOT},0.45)`;
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        const dx = d.x - mouse.x;
        const dy = d.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        const t = mouse.on ? Math.max(0, 1 - dist / REACH) : 0;
        const e = t * t * (3 - 2 * t); // smoothstep
        const r = R + (RMAX - R) * e;
        const a = 0.45 + 0.5 * e;
        ctx.beginPath();
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${DOT},${a})`;
        ctx.fill();
      }
      // ease the hero graphic toward the cursor + scroll parallax
      if (figure) {
        fx += (tfx - fx) * 0.08;
        fy += (tfy - fy) * 0.08;
        fr += (tfr - fr) * 0.08;
        const sy = Math.min(window.scrollY, 900) * 0.05;
        figure.style.transform = `translate(${fx.toFixed(2)}px, ${(fy + sy).toFixed(2)}px) rotate(${fr.toFixed(2)}deg)`;
      }
      raf = requestAnimationFrame(draw);
    };

    build();

    if (reduce) {
      paintStatic();
      const onResize = () => {
        build();
        paintStatic();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    const onMove = (e: PointerEvent) => {
      const rect = host.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.on = true;
      // steer the hero graphic toward the cursor
      tfx = (mouse.x / w - 0.5) * 30;
      tfy = (mouse.y / h - 0.5) * 22;
      tfr = (mouse.x / w - 0.5) * 6;
      if (ring) {
        ring.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
        ring.style.opacity = "1";
      }
    };
    const onLeave = () => {
      mouse.on = false;
      mouse.x = -9999;
      mouse.y = -9999;
      tfx = 0;
      tfy = 0;
      tfr = 0;
      if (ring) ring.style.opacity = "0";
    };
    const onResize = () => build();

    host.addEventListener("pointermove", onMove);
    host.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="hero-dots" aria-hidden="true" />
      <div ref={ringRef} className="hero-ring" aria-hidden="true" />
    </>
  );
}
