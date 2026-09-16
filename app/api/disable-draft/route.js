import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

// Turns draft preview back off; visit /api/disable-draft to return to the live view.
export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
