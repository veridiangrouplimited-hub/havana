import { NextResponse } from "next/server";

/**
 * Contact form endpoint.
 *
 * Validates server-side (never trust the client), rejects honeypot
 * submissions silently, and caps field lengths. In production, forward
 * the enquiry to the Mission's ticketing inbox via an email API
 * (e.g. SMTP relay or transactional email service) and add
 * rate limiting at the hosting/WAF layer.
 */
export async function POST(request: Request) {
  let data: Record<string, string>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot filled in → almost certainly a bot. Pretend success.
  if (data.website) {
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim().slice(0, 200);
  const email = (data.email ?? "").trim().slice(0, 200);
  const subject = (data.subject ?? "").trim().slice(0, 300);
  const category = (data.category ?? "").trim().slice(0, 100);
  const message = (data.message ?? "").trim().slice(0, 5000);
  const consent = data.consent === "yes";

  if (!name || !subject || !category || !consent || message.length < 20) {
    return NextResponse.json(
      { ok: false, error: "Missing or invalid fields." },
      { status: 422 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address." }, { status: 422 });
  }

  // TODO (production): deliver to the Mission's enquiry inbox.
  // await sendEnquiryEmail({ name, email, subject, category, message });

  return NextResponse.json({ ok: true });
}
