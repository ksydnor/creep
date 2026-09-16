import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Turns on draft preview so unpublished Payload changes are visible.
// The admin panel's Preview button links here automatically:
//   /api/draft?secret=<PREVIEW_SECRET>&path=/work/some-project
export async function GET(request) {
  const { searchParams } = new URL(request.url);

  if (!process.env.PREVIEW_SECRET || searchParams.get("secret") !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  (await draftMode()).enable();

  // Only same-site paths: "//host" and "/\\host" are treated as absolute URLs.
  const path = searchParams.get("path") || "/";
  redirect(/^\/(?![/\\])/.test(path) ? path : "/");
}
