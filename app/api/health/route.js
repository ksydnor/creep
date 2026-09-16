import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

// Liveness only. The site deliberately falls back to data/*.js when the database
// is unreachable, so a database problem must NOT fail the container health check
// and restart-loop a site that is still serving pages. Database state is reported
// in the body for monitoring to act on instead.
export async function GET() {
  let database = "ok";

  try {
    const payload = await getPayload({ config });
    await payload.count({ collection: "projects" });
  } catch {
    database = "unavailable";
  }

  return Response.json({ status: "ok", database }, { status: 200 });
}
