import { makeRouteHandler } from "@keystatic/next/route-handler";
import { revalidatePath } from "next/cache";
import config from "../../../../keystatic.config";
import { clientIp, editorUser, log } from "../../../../lib/log";

const handler = makeRouteHandler({ config });

export const GET = handler.GET;

// Every save goes through POST /api/keystatic/update with the files it adds
// and deletes. Dropping the cache afterwards makes the edit visible on the
// next request instead of at the 60 s revalidation.
export async function POST(request, context) {
  const { params } = await context.params;
  const changes = params?.[0] === "update" ? await request.clone().json().catch(() => null) : null;
  const response = await handler.POST(request, context);
  if (changes) {
    log(response.ok ? "info" : "warn", "editor.save", {
      user: editorUser(request),
      ip: clientIp(request),
      status: response.status,
      added: changes.additions?.map((a) => a.path) ?? [],
      deleted: changes.deletions?.map((d) => d.path) ?? []
    });
  }
  revalidatePath("/", "layout");
  return response;
}
