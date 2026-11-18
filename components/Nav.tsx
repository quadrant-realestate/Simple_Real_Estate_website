"use client";
import { useState } from "react";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="nav" id="top">
      <div className="nav-inner">
        <a href="#top" className="logo" onClick={close}>
          <span className="logo-mark">S</span>
          <span className="logo-text">
            Simple<span className="logo-sub">real estate</span>
          </span>
        </a>
        <nav className={`nav-links${open ? " open" : ""}`}>
          <a href="#projects" onClick={close}>Projects</a>
          <a href="#cost" onClick={close}>Costs</a>
          <a href="#escrow" onClick={close}>Off-plan</a>
          <a href="#yield" onClick={close}>Yields</a>
          <a href="#mortgage" onClick={close}>Mortgage</a>
          <a href="#stories" onClick={close}>Stories</a>
          <a href="#faq" onClick={close}>FAQ</a>
        </nav>
        <a href="#contact" className="btn btn-dark nav-cta">Ask us anything</a>
        <button
          className="nav-toggle"
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>
    </header>
  );
}
