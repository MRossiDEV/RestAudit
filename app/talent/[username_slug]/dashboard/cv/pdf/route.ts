import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { getTalentProfileByUserId } from "@/db/queries/talent";
import { buildCvPdf } from "@/lib/cv";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username_slug: string }> },
): Promise<Response> {
  const { username_slug } = await params;
  const user = await requireUser();
  const profile = getTalentProfileByUserId(user.id);
  if (!profile || profile.slug !== username_slug) {
    return new NextResponse("Profile not ready", { status: 404 });
  }

  const bytes = await buildCvPdf(profile);
  const slug = profile.slug ?? "profile";
  return new NextResponse(new Uint8Array(bytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${slug}-cv.pdf"`,
    },
  });
}
