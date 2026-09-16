import { stat } from "node:fs/promises";
import { createReadStream } from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";

// `next start` only serves public/ files that existed when it started, but the
// editor writes new images there at runtime. Files that exist at startup are
// still served by Next directly; this handles the rest.
const root = path.join(process.cwd(), "public", "assets");
const types = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", webp: "image/webp", avif: "image/avif", gif: "image/gif", pdf: "application/pdf" };

export async function GET(_request, { params }) {
  const { path: parts } = await params;
  const file = path.join(root, ...parts);
  const type = types[path.extname(file).slice(1).toLowerCase()];
  if (!file.startsWith(root + path.sep) || !type) return new Response("Not found", { status: 404 });
  try {
    const info = await stat(file);
    return new Response(Readable.toWeb(createReadStream(file)), {
      headers: { "content-type": type, "content-length": String(info.size), "cache-control": "public, max-age=3600" }
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
