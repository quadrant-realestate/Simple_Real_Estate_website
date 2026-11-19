"use client";
import { useMemo, useState } from "react";
import { site, waLink, safetyChecks, quiz, type QuizOption } from "@/lib/site";

const fmt = (n: number) => "AED " + Math.round(n).toLocaleString("en-US");
const commas = (n: number) => Number(n).toLocaleString("en-US");
const toNum = (s: string) => Number(String(s).replace(/[^0-9.]/g, "")) || 0;

/* ===== Safety checklist with a live 0–10 score ===== */
export function SafetyChecklist() {
  const [done, setDone] = useState<boolean[]>(() =>
    safetyChecks.map(() => false)
  );
  const score = done.filter(Boolean).length;
  const pct = (score / safetyChecks.length) * 100;
  const safe = score === safetyChecks.length;

  const toggle = (i: number) =>
    setDone((d) => d.map((v, j) => (j === i ? !v : v)));

  return (
    <div className="safety">
      <div className="safety-list">
        {safetyChecks.map((c, i) => (
          <button
            type="button"
            key={i}
            className={`safety-item${done[i] ? " on" : ""}`}
            aria-pressed={done[i]}
            onClick={() => toggle(i)}
          >
            <span className="safety-box" aria-hidden="true">
              {done[i] ? "✓" : ""}
            </span>
            <span className="safety-text">
              <strong>{c.label}</strong>
              <em>{c.hint}</em>
            </span>
          </button>
        ))}
      </div>

      <aside className="safety-score">
        <div className={`score-ring${safe ? " safe" : ""}`}>
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle className="ring-bg" cx="60" cy="60" r="52" />
            <circle
              className="ring-fg"
              cx="60"
              cy="60"
              r="52"
              style={{
                strokeDasharray: 2 * Math.PI * 52,
                strokeDashoffset: 2 * Math.PI * 52 * (1 - pct / 100),
              }}
            />
          </svg>
          <div className="score-num">
            <strong>{score}</strong>
            <span>/ {safetyChecks.length}</span>
          </div>
        </div>
        <p className="score-note">
          {safe
            ? "All ten checks done. This is what a safe-to-pay project looks like."
            : "Tick what you've verified. Don't transfer anything until this hits 10."}
        </p>
        <a
          href={waLink(
            "Hi Simple Real Estate! Can you run the off-plan safety check with me on a project I'm looking at?"
          )}
          target="_blank"
          rel="noopener"
          className="btn btn-dark full"
        >
          {safe ? "Great — now verify it with us →" : "Send us the project to check →"}
        </a>
      </aside>
    </div>
  );
}

/* ===== Golden Visa progress meter ===== */
export function VisaMeter() {
  const [value, setValue] = useState(1600000);
  const target = 2000000;
  const pct = Math.min(100, (value / target) * 100);
  const qualifies = value >= target;
  const toGo = Math.max(0, target - value);

  return (
    <div className="visa-meter">
      <label className="field">
        <span>Your property value</span>
        <div className="input-money">
          <em>AED</em>
          <input
            type="text"
            inputMode="numeric"
            value={commas(value)}
            onChange={(e) => setValue(toNum(e.target.value))}
          />
        </div>
        <input
          type="range"
          min={500000}
          max={4000000}
          step={50000}
          value={Math.min(Math.max(value, 500000), 4000000)}
          onChange={(e) => setValue(Number(e.target.value))}
        />
      </label>

      <div className="meter-track">
        <div className="meter-fill" style={{ width: `${pct}%` }} />
        <span className="meter-flag" style={{ left: "100%" }}>
          AED 2M
        </span>
      </div>

      <div className={`meter-status${qualifies ? " ok" : ""}`}>
        {qualifies ? (
          <>
            <strong>You could qualify for the 10-year Golden Visa.</strong>
            <span>
              Final eligibility is confirmed by the Land Department and GDRFA.
            </span>
          </>
        ) : (
          <>
            <strong>{fmt(toGo)} to go</strong>
            <span>to reach the AED 2M Golden Visa threshold.</span>
          </>
        )}
      </div>
    </div>
  );
}

/* ===== Investor match quiz ===== */
const PROFILES: Record<
  string,
  { title: string; blurb: string }
> = {
  income: {
    title: "The Yield Hunter",
    blurb:
      "You want rent hitting your account every month. We'll point you at buildings with strong net yields, sensible service charges and real tenant demand — not just a big gross number on a listing.",
  },
  growth: {
    title: "The Early Mover",
    blurb:
      "You're buying early to sell or hold for capital growth. We'll focus on off-plan launches from proven developers in areas with a real supply-and-demand story — and honest handover timelines.",
  },
  visa: {
    title: "The Resident Investor",
    blurb:
      "You want property that also earns you 10 years of residency. We'll filter for AED 2M+ homes that qualify for the Golden Visa and walk you through the paperwork with you.",
  },
  home: {
    title: "The Future Homeowner",
    blurb:
      "You want a home now that becomes an investment later. We'll balance lifestyle and liveability with resale and rental potential, so the place you love also makes sense on paper.",
  },
};

export function InvestorQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const finished = step >= quiz.length;

  const profile = useMemo(() => {
    const goal = answers[0];
    return PROFILES[goal] || PROFILES.growth;
  }, [answers]);

  const pick = (opt: QuizOption) => {
    setAnswers((a) => {
      const next = [...a];
      next[step] = opt.key;
      return next;
    });
    setStep((s) => s + 1);
  };

  const restart = () => {
    setStep(0);
    setAnswers([]);
  };

  if (finished) {
    const budget = answers[1];
    const when = answers[2];
    return (
      <div className="quiz-result">
        <div className="quiz-badge">YOUR PROFILE</div>
        <h3>{profile.title}</h3>
        <p>{profile.blurb}</p>
        <a
          href={waLink(
            `Hi Simple Real Estate! I did the investor quiz and I'm "${profile.title}". Budget: ${budget}, timeline: ${when}. Can you send me projects that fit?`
          )}
          target="_blank"
          rel="noopener"
          className="btn btn-yellow"
        >
          Get projects for my profile →
        </a>
        <button type="button" className="quiz-restart" onClick={restart}>
          ↺ Start over
        </button>
      </div>
    );
  }

  const q = quiz[step];
  return (
    <div className="quiz">
      <div className="quiz-top">
        <span>
          Question {step + 1} / {quiz.length}
        </span>
        <div className="quiz-bar">
          <div
            className="quiz-bar-fill"
            style={{ width: `${(step / quiz.length) * 100}%` }}
          />
        </div>
      </div>
      <h3 className="quiz-q">{q.q}</h3>
      <div className="quiz-options">
        {q.options.map((o) => (
          <button
            type="button"
            key={o.key}
            className="quiz-option"
            onClick={() => pick(o)}
          >
            <span className="quiz-icon">{o.icon}</span>
            <span className="quiz-label">{o.label}</span>
            <span className="quiz-sub">{o.sub}</span>
          </button>
        ))}
      </div>
      {step > 0 && (
        <button
          type="button"
          className="quiz-restart"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
        >
          ← Back
        </button>
      )}
    </div>
  );
}

/* ===== Upgraded lead form (budget + timeline) ===== */
export function LeadFormPro() {
  const [note, setNote] = useState("No spam. No pressure. Just the math.");
  const [ok, setOk] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name") || "there").trim();
    const phone = String(f.get("phone") || "").trim();
    const project = String(f.get("project") || "").trim();
    const budget = String(f.get("budget") || "").trim();
    const when = String(f.get("when") || "").trim();

    const details = [
      project && `Project/link: ${project}`,
      budget && `Budget: ${budget}`,
      when && `Timeline: ${when}`,
    ]
      .filter(Boolean)
      .join(" · ");

    const text = `Hi ${site.name}! I'm ${name}. ${
      details ? details + ". " : ""
    }My number: ${phone}`;

    setSending(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          message: details,
          source: "project_check",
        }),
      });
    } catch {
      /* WhatsApp hand-off below is the backup */
    }
    setSending(false);

    setNote(
      `Thanks ${name}! We've got your details — opening WhatsApp so we can send the breakdown.`
    );
    setOk(true);
    window.open(waLink(text), "_blank");
    form.reset();
  }

  return (
    <form className="cta-form" onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          Your name
          <input type="text" name="name" required placeholder="e.g. Ahmed" />
        </label>
        <label>
          Phone / WhatsApp
          <input
            type="tel"
            name="phone"
            required
            placeholder="+971 50 000 0000"
          />
        </label>
      </div>
      <label>
        Project name or listing link
        <input
          type="text"
          name="project"
          placeholder="e.g. Creek Bay, or paste a link"
        />
      </label>
      <div className="form-row">
        <label>
          Budget
          <select name="budget" defaultValue="">
            <option value="" disabled>
              Choose…
            </option>
            <option>Under AED 1M</option>
            <option>AED 1M – 2M</option>
            <option>AED 2M – 5M</option>
            <option>AED 5M+</option>
          </select>
        </label>
        <label>
          When
          <select name="when" defaultValue="">
            <option value="" disabled>
              Choose…
            </option>
            <option>Next 3 months</option>
            <option>3 – 6 months</option>
            <option>6 – 12 months</option>
            <option>Just researching</option>
          </select>
        </label>
      </div>
      <button type="submit" className="btn btn-yellow full" disabled={sending}>
        {sending ? "Sending…" : "Get my free breakdown →"}
      </button>
      <p className={`form-note${ok ? " ok" : ""}`}>{note}</p>
    </form>
  );
}
