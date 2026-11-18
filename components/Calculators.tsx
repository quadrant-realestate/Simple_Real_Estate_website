"use client";
import { useMemo, useState } from "react";
import { site, waLink } from "@/lib/site";

/* ---------- helpers ---------- */
const fmt = (n: number) => "AED " + Math.round(n).toLocaleString("en-US");
const commas = (n: number) => Number(n).toLocaleString("en-US");
const toNum = (s: string) => Number(String(s).replace(/[^0-9.]/g, "")) || 0;

/* ---------- 1. COST CALCULATOR ---------- */
export function CostCalculator() {
  const [price, setPrice] = useState(1500000);
  const [mortgage, setMortgage] = useState(true);
  const [agent, setAgent] = useState(true);

  const { rows, total } = useMemo(() => {
    const r: [string, number][] = [];
    r.push(["DLD transfer fee (4%)", price * 0.04]);
    r.push(["DLD admin fee", 580]);
    if (agent) r.push(["Agency fee (2% + 5% VAT)", price * 0.02 * 1.05]);
    r.push(["Title deed / registration", price > 500000 ? 4200 : 2100]);
    r.push(["Trustee office fee", 4200]);
    if (mortgage) {
      r.push(["Mortgage registration (0.25%)", price * 0.0025 + 290]);
      r.push(["Bank arrangement fee (~1%)", price * 0.75 * 0.01]);
      r.push(["Property valuation", 3150]);
      r.push(["Down payment (25%)", price * 0.25]);
    } else {
      r.unshift(["Property price", price]);
    }
    return { rows: r, total: r.reduce((s, x) => s + x[1], 0) };
  }, [price, mortgage, agent]);

  return (
    <div className="calc-card">
      <div className="calc-controls">
        <label className="field">
          <span>Property price</span>
          <div className="input-money">
            <em>AED</em>
            <input
              type="text"
              inputMode="numeric"
              value={commas(price)}
              onChange={(e) => setPrice(toNum(e.target.value))}
            />
          </div>
          <input
            type="range"
            min={500000}
            max={10000000}
            step={50000}
            value={Math.min(Math.max(price, 500000), 10000000)}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </label>
        <label className="field inline">
          <span>Paying by mortgage?</span>
          <input
            type="checkbox"
            checked={mortgage}
            onChange={(e) => setMortgage(e.target.checked)}
          />
        </label>
        <label className="field inline">
          <span>Using an agent?</span>
          <input
            type="checkbox"
            checked={agent}
            onChange={(e) => setAgent(e.target.checked)}
          />
        </label>
      </div>
      <div className="calc-output">
        <ul className="breakdown">
          {rows.map((r, i) => (
            <li key={i}>
              <span>{r[0]}</span>
              <b>{fmt(r[1])}</b>
            </li>
          ))}
        </ul>
        <div className="total-row">
          <span>Cash you actually need upfront</span>
          <strong>{fmt(total)}</strong>
        </div>
        <p className="fineprint">
          Estimates based on standard Dubai Land Department rates. Your developer
          or bank may vary — we always confirm the exact figure with you before
          anything is signed.
        </p>
      </div>
    </div>
  );
}

/* ---------- 2. PAYMENT PLAN ---------- */
const PLANS: Record<string, { label: string; rows: [string, number][] }> = {
  "2080": {
    label: "20 / 80 — pay 20% now, 80% at handover",
    rows: [["Down payment (today)", 0.2], ["On handover", 0.8]],
  },
  "4060": {
    label: "40 / 60 — balanced during construction",
    rows: [
      ["Down payment (today)", 0.1],
      ["During construction (6 steps)", 0.3],
      ["On handover", 0.6],
    ],
  },
  "6040": {
    label: "60 / 40 — pay more now, less later",
    rows: [
      ["Down payment (today)", 0.2],
      ["During construction", 0.4],
      ["On handover", 0.4],
    ],
  },
  ph: {
    label: "50 / 50 post-handover — pay after keys",
    rows: [
      ["Down payment (today)", 0.2],
      ["During construction", 0.3],
      ["After handover (2–3 yrs)", 0.5],
    ],
  },
};

export function PaymentPlan() {
  const [price, setPrice] = useState(2000000);
  const [type, setType] = useState("4060");
  const plan = PLANS[type];

  return (
    <div className="calc-card">
      <div className="calc-controls">
        <label className="field">
          <span>Property price</span>
          <div className="input-money">
            <em>AED</em>
            <input
              type="text"
              inputMode="numeric"
              value={commas(price)}
              onChange={(e) => setPrice(toNum(e.target.value))}
            />
          </div>
        </label>
        <label className="field">
          <span>Plan type</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            {Object.entries(PLANS).map(([k, v]) => (
              <option key={k} value={k}>
                {v.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="calc-output">
        <div className="timeline">
          {plan.rows.map((r, i) => {
            const pct = Math.round(r[1] * 100);
            return (
              <div className="ms" key={i}>
                <div className="ms-label">{r[0]}</div>
                <div className="ms-dot" />
                <div className="ms-bar">
                  <div
                    className="ms-fill"
                    style={{ width: `${Math.max(pct, 14)}%` }}
                  >
                    {pct}%
                  </div>
                </div>
                <div className="ms-amt">{fmt(price * r[1])}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- 3. YIELD ---------- */
export function YieldCalculator() {
  const [price, setPrice] = useState(1500000);
  const [rent, setRent] = useState(110000);
  const [service, setService] = useState(18000);
  const [weeks, setWeeks] = useState(3);

  const gross = price ? (rent / price) * 100 : 0;
  const vacancyLoss = rent * (weeks / 52);
  const net = price ? ((rent - service - vacancyLoss) / price) * 100 : 0;
  const gap = (gross - net).toFixed(1);

  return (
    <div className="calc-card">
      <div className="calc-controls">
        {[
          ["Property price", price, setPrice] as const,
          ["Expected yearly rent", rent, setRent] as const,
          ["Service charge (per year)", service, setService] as const,
        ].map(([label, val, set]) => (
          <label className="field" key={label}>
            <span>{label}</span>
            <div className="input-money">
              <em>AED</em>
              <input
                type="text"
                inputMode="numeric"
                value={commas(val)}
                onChange={(e) => set(toNum(e.target.value))}
              />
            </div>
          </label>
        ))}
        <label className="field">
          <span>Empty weeks per year</span>
          <input
            type="range"
            min={0}
            max={12}
            step={1}
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
          />
          <small>
            {weeks} {weeks === 1 ? "week" : "weeks"}
          </small>
        </label>
      </div>
      <div className="calc-output yield-out">
        <div className="yield-box gross">
          <span>
            Gross yield
            <br />
            <em>(what agents say)</em>
          </span>
          <strong>{gross.toFixed(1)}%</strong>
        </div>
        <div className="yield-box net">
          <span>
            Net yield
            <br />
            <em>(what you keep)</em>
          </span>
          <strong>{net.toFixed(1)}%</strong>
        </div>
        <div className="yield-note">
          The agent quotes {gross.toFixed(1)}%. After AED{" "}
          {Math.round(service).toLocaleString()} service charge and {weeks} empty
          week{weeks === 1 ? "" : "s"}, you really keep {net.toFixed(1)}% — a{" "}
          {gap} point difference.
        </div>
      </div>
    </div>
  );
}

/* ---------- 4. MORTGAGE ---------- */
export function MortgageCalculator() {
  const [price, setPrice] = useState(1500000);
  const [down, setDown] = useState(25);
  const [rate, setRate] = useState(4.25);
  const [years, setYears] = useState(25);

  const downAmt = price * (down / 100);
  const loan = price - downAmt;
  const mRate = rate / 100 / 12;
  const n = years * 12;
  const monthly =
    mRate === 0
      ? loan / n
      : (loan * mRate * Math.pow(1 + mRate, n)) / (Math.pow(1 + mRate, n) - 1);
  const interest = monthly * n - loan;

  return (
    <div className="calc-card">
      <div className="calc-controls">
        <label className="field">
          <span>Property price</span>
          <div className="input-money">
            <em>AED</em>
            <input
              type="text"
              inputMode="numeric"
              value={commas(price)}
              onChange={(e) => setPrice(toNum(e.target.value))}
            />
          </div>
        </label>
        <label className="field">
          <span>Down payment</span>
          <input
            type="range"
            min={20}
            max={60}
            step={5}
            value={down}
            onChange={(e) => setDown(Number(e.target.value))}
          />
          <small>{down}%</small>
        </label>
        <label className="field">
          <span>Interest rate (per year)</span>
          <input
            type="range"
            min={2}
            max={8}
            step={0.25}
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
          <small>{rate.toFixed(2)}%</small>
        </label>
        <label className="field">
          <span>Loan length</span>
          <input
            type="range"
            min={5}
            max={25}
            step={1}
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
          />
          <small>{years} years</small>
        </label>
      </div>
      <div className="calc-output mortgage-out">
        <div className="big-number">
          <span>Monthly payment</span>
          <strong>{fmt(monthly)}</strong>
        </div>
        <ul className="breakdown">
          <li>
            <span>Down payment needed</span>
            <b>{fmt(downAmt)}</b>
          </li>
          <li>
            <span>Loan amount</span>
            <b>{fmt(loan)}</b>
          </li>
          <li>
            <span>Total interest over the years</span>
            <b>{fmt(interest)}</b>
          </li>
        </ul>
      </div>
    </div>
  );
}

/* ---------- 5. LEAD FORM ---------- */
export function LeadForm() {
  const [note, setNote] = useState("No spam. No pressure. Just the math.");
  const [ok, setOk] = useState(false);

  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name") || "there").trim();
    const phone = String(f.get("phone") || "").trim();
    const msg = String(f.get("message") || "").trim();
    const text = `Hi ${site.name}! I'm ${name}. ${
      msg ? "I'm looking at: " + msg + ". " : ""
    }My number: ${phone}`;

    setSending(true);
    // Capture the lead server-side first, so it is never lost even if the
    // visitor doesn't complete the WhatsApp hand-off.
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, message: msg, source: "lead_form" }),
      });
    } catch {
      // Ignore network errors — the WhatsApp hand-off below is the backup.
    }
    setSending(false);

    setNote(`Thanks ${name}! We've got your details — opening WhatsApp so you can chat with us too.`);
    setOk(true);
    window.open(waLink(text), "_blank");
    form.reset();
  }

  return (
    <form className="cta-form" onSubmit={onSubmit}>
      <label>
        Your name
        <input type="text" name="name" required placeholder="e.g. Ahmed" />
      </label>
      <label>
        Phone / WhatsApp
        <input type="tel" name="phone" required placeholder="+971 50 000 0000" />
      </label>
      <label>
        What are you looking at?
        <textarea
          name="message"
          rows={3}
          placeholder="A project name, a link, or your budget and goal"
        />
      </label>
      <button type="submit" className="btn btn-yellow full" disabled={sending}>
        {sending ? "Sending…" : "Get my free breakdown →"}
      </button>
      <p className={`form-note${ok ? " ok" : ""}`}>{note}</p>
    </form>
  );
}
