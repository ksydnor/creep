import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { audit, clientIp } from "../../../lib/log";

// Each submission becomes one JSON file that the Keystatic "Messages"
// collection lists. The folder is never committed because the repo is public.
const dir = path.join(process.cwd(), "content", "messages");
const limits = { name: 200, email: 200, message: 4000 };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ponytail: in-memory per-IP throttle, resets on restart; move to Caddy rate_limit if abuse shows up.
const lastSeen = new Map();
const minIntervalMs = 30_000;

// Relative Location: behind the reverse proxy request.url is the internal host.
function redirect(query) {
  return new Response(null, { status: 303, headers: { location: `/contact?${query}` } });
}

export async function POST(request) {
  const form = await request.formData();
  const fields = Object.fromEntries(Object.keys(limits).map((key) => [key, String(form.get(key) ?? "").trim()]));
  const ip = clientIp(request);
  const now = Date.now();

  // Honeypot filled or throttled: pretend it worked so bots learn nothing.
  if (form.get("website")) {
    audit("contact.dropped", { ip, reason: "honeypot" });
    return redirect("sent=1");
  }
  if (now - (lastSeen.get(ip) ?? 0) < minIntervalMs) {
    audit("contact.dropped", { ip, reason: "throttled" });
    return redirect("sent=1");
  }

  const valid =
    Object.entries(limits).every(([key, max]) => fields[key].length > 0 && fields[key].length <= max) && emailPattern.test(fields.email);
  if (!valid) {
    audit("contact.rejected", { ip, reason: "invalid" });
    return redirect("error=1");
  }

  lastSeen.set(ip, now);
  const stamp = new Date(now).toISOString();
  const id = `${stamp.slice(0, 19).replace(/[:T]/g, "-")}-${Math.random().toString(36).slice(2, 6)}`;
  await mkdir(dir, { recursive: true });
  await writeFile(
    path.join(dir, `${id}.json`),
    JSON.stringify({ receivedAt: stamp.slice(0, 16).replace("T", " ") + " UTC", ...fields, handled: false }, null, 2)
  );
  audit("contact.received", { ip, id });
  return redirect("sent=1");
}
