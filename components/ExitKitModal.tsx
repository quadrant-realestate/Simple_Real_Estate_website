"use client";
import { useEffect, useRef, useState } from "react";
import { site, waLink } from "@/lib/site";

/* Auto "free kit" lead capture. It opens on its own once per visit — when the
   reader scrolls into the lower part of the page (the last sections) or moves
   to leave the tab (exit intent). Dismissed or submitted, it stays closed for
   the session. Esc, the X, or a click on the backdrop all close it. */

const SEEN_KEY = "sre-kit-seen";

export default function ExitKitModal() {
  const [open, setOpen] = useState(false);
  const [ok, setOk] = useState(false);
  const [sending, setSending] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // --- arm the auto-open triggers ---
  useEffect(() => {
    let armed = true;
    try {
      if (sessionStorage.getItem(SEEN_KEY)) armed = false;
    } catch {
      /* private mode — still allow one open */
    }
    if (!armed) return;

    const fire = () => {
      if (!armed) return;
      armed = false;
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
      setOpen(true);
      cleanup();
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max > 0.45) fire();
    };
    const onExit = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };
    // don't pop in the first few seconds
    const t = window.setTimeout(() => {
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("mouseout", onExit);
      onScroll(); // in case the reader is already scrolled down
    }, 2000);
    // fallback: on mobile there's no mouse (no exit-intent) and the reader
    // may not scroll far — open anyway after a while so it always shows
    const t2 = window.setTimeout(fire, 15000);

    function cleanup() {
      window.clearTimeout(t);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseout", onExit);
    }
    return cleanup;
  }, []);

  // --- lock scroll + Esc + focus while open ---
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    const name = String(f.get("name") || "there").trim();
    const phone = String(f.get("phone") || "").trim();
    const email = String(f.get("email") || "").trim();
    const budget = String(f.get("budget") || "").trim();
    const interest = String(f.get("interest") || "").trim();

    const details = [
      interest && `Interested in: ${interest}`,
      budget && `Budget: ${budget}`,
      email && `Email: ${email}`,
    ]
      .filter(Boolean)
      .join(" · ");

    const text = `Hi ${site.name}! I'm ${name} — please send the free investor kit. ${
      details ? details + ". " : ""
    }My number: ${phone}`;

    setSending(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message: details, source: "free_kit_popup" }),
      });
    } catch {
      /* WhatsApp hand-off below is the backup */
    }
    setSending(false);
    setOk(true);
    window.open(waLink(text), "_blank");
  }

  if (!open) return null;

  return (
    <div
      className="kit-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) setOpen(false);
      }}
    >
      <div className="kit-modal" role="dialog" aria-modal="true" aria-label="Free investor kit">
        <button
          ref={closeRef}
          className="kit-close"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          ✕
        </button>

        {ok ? (
          <div className="kit-done">
            <span className="kit-done-mark" aria-hidden="true">✓</span>
            <h3>You&apos;re in.</h3>
            <p>
              We&apos;ve got your details and opened WhatsApp so we can send the kit
              and your free project check. Didn&apos;t open?{" "}
              <a href={waLink()} target="_blank" rel="noopener">Tap here</a>.
            </p>
            <button className="btn btn-primary" onClick={() => setOpen(false)}>
              Keep browsing
            </button>
          </div>
        ) : (
          <>
            <span className="kit-k">// free investor kit</span>
            <h3 className="kit-title">
              Before you go: take the <span className="italic-mark">free</span> kit.
            </h3>

            <div className="kit-head">
              <span className="kit-cards" aria-hidden="true">
                <span className="kit-card kit-card-a">
                  <b>// buyer&apos;s guide</b>
                  <em>The real cost of buying in Dubai</em>
                  <i>COSTS</i>
                </span>
                <span className="kit-card kit-card-b">
                  <b>// investor&apos;s guide</b>
                  <em>Is your off-plan money safe?</em>
                  <i>SAFE</i>
                </span>
              </span>
              <ul className="kit-points">
                <li>Every fee, with a worksheet</li>
                <li>10 off-plan safety checks</li>
                <li>Free project check from us</li>
              </ul>
            </div>

            <form className="kit-form" onSubmit={onSubmit}>
              <div className="kit-row">
                <label>
                  your name *
                  <input type="text" name="name" required placeholder="e.g. Ahmed" />
                </label>
                <label>
                  whatsapp number *
                  <input type="tel" name="phone" required placeholder="+971 50 000 0000" />
                </label>
              </div>
              <label>
                email (optional)
                <input type="email" name="email" placeholder="you@email.com" />
              </label>
              <div className="kit-row">
                <label>
                  budget *
                  <select name="budget" defaultValue="" required>
                    <option value="" disabled>choose…</option>
                    <option>Under AED 1M</option>
                    <option>AED 1–2M</option>
                    <option>AED 2–4M</option>
                    <option>AED 4M+</option>
                  </select>
                </label>
                <label>
                  interested in
                  <select name="interest" defaultValue="Off-plan">
                    <option>Off-plan</option>
                    <option>Ready to move in</option>
                    <option>Golden Visa</option>
                    <option>Not sure yet</option>
                  </select>
                </label>
              </div>
              <label className="kit-consent">
                <input type="checkbox" name="consent" required />
                <span>
                  I agree to be contacted on WhatsApp or email about Dubai property.
                  No spam.
                </span>
              </label>
              <button type="submit" className="kit-submit" disabled={sending}>
                {sending ? "Sending…" : "Send me the kit →"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
