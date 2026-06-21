import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// WordPress sends a POST to this route after publishing content.
// Configure the webhook in WordPress with a secret token in the Authorization header.
export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret");
  if (secret !== process.env.NEXT_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as { path?: string };

  if (body.path) {
    revalidatePath(body.path);
    return NextResponse.json({ revalidated: body.path });
  }

  // If no specific path, revalidate all content pages.
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: "all" });
}
