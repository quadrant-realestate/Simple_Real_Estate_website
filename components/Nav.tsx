"use client";
import { useEffect, useRef, useState } from "react";

type DropItem = { label: string; href: string };
type NavItem = { label: string; href: string; items?: DropItem[]; badge?: string };

const NAV: NavItem[] = [
  {
    label: "Properties",
    href: "/projects",
    items: [
      { label: "Browse properties", href: "/projects" },
      { label: "Off-plan explained", href: "/#escrow" },
      { label: "Payment plans", href: "/#plan" },
      { label: "Safety check", href: "/#safety" },
    ],
  },
  {
    label: "Projects",
    href: "/projects",
    items: [
      { label: "All projects", href: "/projects" },
      { label: "Our shortlist", href: "/#projects" },
      { label: "Golden Visa", href: "/#visa" },
    ],
  },
  {
    label: "Compare",
    href: "/#cost",
    items: [
      { label: "Buying costs", href: "/#cost" },
      { label: "Rental yield", href: "/#yield" },
      { label: "Mortgage", href: "/#mortgage" },
    ],
  },
  { label: "Analytics", href: "/#market" },
  { label: "Offers & Discounts", href: "/projects", badge: "NEW" },
  { label: "AI Consultant", href: "/#match" },
  { label: "Blog", href: "/#guides" },
  { label: "Contact", href: "/#contact" },
];

const CURRENCIES = ["AED", "USD", "EUR", "GBP"];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [openDrop, setOpenDrop] = useState<string | null>(null);
  const [curOpen, setCurOpen] = useState(false);
  const [currency, setCurrency] = useState("AED");
  const close = () => {
    setOpen(false);
    setOpenDrop(null);
    setCurOpen(false);
  };
  const rootRef = useRef<HTMLElement>(null);

  // lock page scroll while the full-screen menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // close dropdowns on outside click; close everything on Esc
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpenDrop(null);
        setCurOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <header className="nav" id="top" ref={rootRef}>
      <div className="nav-inner">
        <a href="/" className="logo" onClick={close}>
          <span className="logo-mark">S</span>
          <span className="logo-text">
            Simple<span className="logo-sub">real estate</span>
          </span>
        </a>

        <nav className={`nav-links${open ? " open" : ""}`}>
          {NAV.map((item) =>
            item.items ? (
              <div
                key={item.label}
                className={`nav-drop${openDrop === item.label ? " open" : ""}`}
              >
                <button
                  type="button"
                  className="nav-drop-btn"
                  aria-expanded={openDrop === item.label}
                  onClick={() =>
                    setOpenDrop((v) => (v === item.label ? null : item.label))
                  }
                >
                  {item.label}
                  <span className="caret" aria-hidden="true" />
                </button>
                <div className="nav-menu">
                  {item.items.map((sub) => (
                    <a key={sub.label} href={sub.href} onClick={close}>
                      {sub.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : (
              <a key={item.label} href={item.href} onClick={close}>
                {item.label}
                {item.badge && <span className="nav-badge">{item.badge}</span>}
              </a>
            )
          )}

          <div className="nav-right">
            <a href="/#contact" className="nav-login" onClick={close}>
              Login
            </a>
            <a href="/#contact" className="btn btn-dark nav-cta" onClick={close}>
              Sign Up
            </a>

            <div className={`nav-cur${curOpen ? " open" : ""}`}>
              <button
                type="button"
                className="nav-cur-btn"
                aria-expanded={curOpen}
                onClick={() => setCurOpen((v) => !v)}
              >
                {currency}
                <span className="caret" aria-hidden="true" />
              </button>
              <div className="nav-menu nav-menu--cur">
                {CURRENCIES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setCurrency(c);
                      setCurOpen(false);
                    }}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </nav>

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
