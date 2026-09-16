import { makeRouteHandler } from "@keystatic/next/route-handler";
import { revalidatePath } from "next/cache";
import config from "../../../../keystatic.config";

const handler = makeRouteHandler({ config });

export const GET = handler.GET;

// Every save goes through POST. Dropping the cache afterwards makes the edit
// visible on the next request instead of at the 60 s revalidation.
export async function POST(request, context) {
  const response = await handler.POST(request, context);
  revalidatePath("/", "layout");
  return response;
}
