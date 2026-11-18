"use client";
import { useEffect } from "react";

/* Elements that fade/slide in as they enter the viewport.
   `dir` sets the travel direction via a CSS class. */
const REVEAL: [string, string][] = [
  [".section .sign", "up"],
  [".section h2", "up"],
  [".section-lead", "up"],
  [".calc-card", "scale"],
  [".project-card", "up"],
  [".story-card", "up"],
  [".step", "up"],
  [".safe-check", "right"],
  [".visa-card", "scale"],
  [".visa-grid > div:first-child", "left"],
  [".faq-list details", "up"],
  [".cta-card", "scale"],
];

export default function ScrollReveal() {
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const cleanups: (() => void)[] = [];

    /* --- Sticky nav shadow + hero parallax on scroll --- */
    const nav = document.querySelector(".nav");
    const glow = document.querySelector<HTMLElement>(".hero");
    const onScroll = () => {
      const y = window.scrollY;
      if (nav) nav.classList.toggle("scrolled", y > 10);
      if (!reduce && y < 900) {
        if (glow) glow.style.setProperty("--p", `${y * 0.12}px`);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    /* --- Tag every element we want to reveal --- */
    const all: HTMLElement[] = [];
    REVEAL.forEach(([sel, dir]) => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (el.hasAttribute("data-reveal")) return;
        el.setAttribute("data-reveal", "");
        el.setAttribute("data-dir", dir);
        all.push(el);
      });
    });

    /* --- Count-up for the hero stat numbers --- */
    const runCounter = (el: HTMLElement) => {
      const raw = el.dataset.countupText || el.textContent || "";
      el.dataset.countupText = raw;
      const m = raw.match(/^(\D*)([\d.,]+)(.*)$/s);
      if (!m) return;
      const [, pre, numStr, suf] = m;
      const decimals = (numStr.split(".")[1] || "").length;
      const hasComma = numStr.includes(",");
      const target = parseFloat(numStr.replace(/,/g, ""));
      if (!isFinite(target)) return;
      const fmt = (n: number) => {
        const s = n.toFixed(decimals);
        return hasComma
          ? Number(s).toLocaleString("en-US", {
              minimumFractionDigits: decimals,
              maximumFractionDigits: decimals,
            })
          : s;
      };
      const dur = 1100;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / dur);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = pre + fmt(target * eased) + suf;
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = raw;
      };
      requestAnimationFrame(tick);
    };

    /* Hero stats sit above the fold — count them up shortly after load,
       after the hero entrance animation has settled. */
    const heroNums = Array.from(
      document.querySelectorAll<HTMLElement>(".hero-stats strong")
    );
    if (!reduce) {
      const t = window.setTimeout(
        () => heroNums.forEach(runCounter),
        650
      );
      cleanups.push(() => window.clearTimeout(t));
    }

    if (reduce || !("IntersectionObserver" in window)) {
      all.forEach((el) => el.classList.add("in"));
      return () => cleanups.forEach((fn) => fn());
    }

    /* --- Stagger siblings for a cascading reveal --- */
    all.forEach((el) => {
      el.classList.add("reveal-init");
      const sibs = el.parentElement
        ? Array.from(el.parentElement.children).filter((c) =>
            c.hasAttribute("data-reveal")
          )
        : [];
      const i = sibs.indexOf(el);
      if (i > 0) el.style.transitionDelay = `${Math.min(i, 6) * 90}ms`;
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = en.target as HTMLElement;
          el.classList.add("in");
          io.unobserve(el);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    all.forEach((el) => io.observe(el));
    cleanups.push(() => io.disconnect());

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
