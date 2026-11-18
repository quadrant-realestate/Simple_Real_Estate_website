import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LeadPayload = {
  name?: string;
  phone?: string;
  message?: string;
  source?: string;
};

function clean(v: unknown, max = 500): string {
  return String(v ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .trim()
    .slice(0, max);
}

export async function POST(req: NextRequest) {
  let body: LeadPayload = {};
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const name = clean(body.name, 120);
  const phone = clean(body.phone, 40);
  const message = clean(body.message, 1000);
  const source = clean(body.source, 60) || "website";

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "missing_fields" },
      { status: 422 }
    );
  }

  const lead = {
    name,
    phone,
    message,
    source,
    receivedAt: new Date().toISOString(),
    ip:
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("x-real-ip") ||
      null,
    userAgent: req.headers.get("user-agent") || null,
  };

  // Reliable server-side record (searchable in the platform logs).
  console.log("[LEAD]", JSON.stringify(lead));

  // Optional: forward to a webhook (Slack, Zapier, a CRM intake, ...) if configured.
  // Set LEAD_WEBHOOK_URL in the environment to turn this on — no code change needed.
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
    } catch (err) {
      // Never fail the user's submission because a downstream webhook is down.
      console.error("[LEAD] webhook forward failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
