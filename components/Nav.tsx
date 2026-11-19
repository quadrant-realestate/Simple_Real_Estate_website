"use client";
import { useEffect, useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // lock page scroll while the full-screen menu is open; close on Esc
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  return (
    <header className="nav" id="top">
      <div className="nav-inner">
        <a href="/" className="logo" onClick={close}>
          <span className="logo-mark">S</span>
          <span className="logo-text">
            Simple<span className="logo-sub">real estate</span>
          </span>
        </a>
        <nav className={`nav-links${open ? " open" : ""}`}>
          <a href="/projects" onClick={close}>Projects</a>
          <a href="/#cost" onClick={close}>Costs</a>
          <a href="/#escrow" onClick={close}>Off-plan</a>
          <a href="/#safety" onClick={close}>Safety</a>
          <a href="/#visa" onClick={close}>Golden Visa</a>
          <a href="/#reels" onClick={close}>Reels</a>
          <a href="/#faq" onClick={close}>FAQ</a>
        </nav>
        <a href="/#contact" className="btn btn-dark nav-cta">Ask us anything</a>
        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
    </header>
  );
}
