"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { projects, waLink } from "@/lib/site";

/* prop971-style tabbed search, rebuilt in the Simple sticker brand.
   Categories are copied; styling and behaviour are ours. The project tabs
   run a real query against our shortlist (/projects?q=&area=&beds=&max=);
   the others jump to the matching section or to WhatsApp. */

type Tab = {
  key: string;
  label: string;
  placeholder: string;
  kind: "projects" | "anchor" | "wa";
  target?: string; // anchor href or nothing
};

const TABS: Tab[] = [
  { key: "projects", label: "Projects", placeholder: "Search project, developer or area…", kind: "projects" },
  { key: "new", label: "New Projects", placeholder: "Search the latest off-plan launches…", kind: "projects" },
  { key: "properties", label: "Properties", placeholder: "Search by area or bedrooms…", kind: "projects" },
  { key: "compare", label: "Comparison", placeholder: "Compare payment plans & costs…", kind: "anchor", target: "/#plan" },
  { key: "analytics", label: "Analytics", placeholder: "Dubai prices, yields & trends…", kind: "anchor", target: "/#market" },
  { key: "ai", label: "AI Consultant", placeholder: "Ask us anything about buying in the UAE…", kind: "wa" },
];

export default function HeroSearch() {
  const router = useRouter();
  const [active, setActive] = useState(0);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [area, setArea] = useState("");
  const [beds, setBeds] = useState("");
  const [max, setMax] = useState("");

  const tab = TABS[active];

  const areas = useMemo(
    () => Array.from(new Set(projects.map((p) => p.area))).sort(),
    []
  );

  const go = () => {
    if (tab.kind === "wa") {
      window.open(
        waLink(q ? `Hi Simple Real Estate! ${q}` : "Hi Simple Real Estate! I'd like help finding the right UAE off-plan property."),
        "_blank"
      );
      return;
    }
    if (tab.kind === "anchor" && tab.target) {
      router.push(tab.target);
      return;
    }
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (area) params.set("area", area);
    if (beds) params.set("beds", beds);
    if (max) params.set("max", max);
    if (tab.key === "new") params.set("sort", "new");
    const qs = params.toString();
    router.push(`/projects${qs ? "?" + qs : ""}`);
  };

  return (
    <div className="hsearch">
      {/* category tabs — copied from prop971, styled as our stickers */}
      <div className="hsearch-tabs" role="tablist" aria-label="What are you looking for">
          {TABS.map((t, i) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={i === active}
              className={`hsearch-tab${i === active ? " on" : ""}${t.key === "new" ? " hot" : ""}`}
              onClick={() => setActive(i)}
              type="button"
            >
              {t.label}
            </button>
          ))}
        </div>

      <div className="hsearch-panel">
        {/* search row */}
        <div className="hsearch-row">
          <div className="hsearch-field">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="hsearch-ic">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.2-3.2" />
            </svg>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && go()}
              placeholder={tab.placeholder}
              aria-label={tab.placeholder}
            />
          </div>

          {tab.kind === "projects" && (
            <button
              type="button"
              className={`hsearch-adv${open ? " on" : ""}`}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 6h16M7 12h10M10 18h4" />
              </svg>
              Advanced
              <span className="caret" aria-hidden="true" />
            </button>
          )}

          <button type="button" className="hsearch-go" onClick={go}>
            {tab.kind === "wa" ? "Ask" : "Search"}
          </button>
        </div>

        {/* advanced filters */}
        {tab.kind === "projects" && open && (
          <div className="hsearch-adv-panel">
            <label>
              <span>Area</span>
              <select value={area} onChange={(e) => setArea(e.target.value)}>
                <option value="">Any area</option>
                {areas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Bedrooms</span>
              <select value={beds} onChange={(e) => setBeds(e.target.value)}>
                <option value="">Any</option>
                <option value="studio">Studio</option>
                <option value="1">1 bed</option>
                <option value="2">2 bed</option>
                <option value="3">3+ bed</option>
              </select>
            </label>
            <label>
              <span>Max budget</span>
              <select value={max} onChange={(e) => setMax(e.target.value)}>
                <option value="">No max</option>
                <option value="1000000">AED 1M</option>
                <option value="2000000">AED 2M</option>
                <option value="3000000">AED 3M</option>
                <option value="5000000">AED 5M</option>
              </select>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
