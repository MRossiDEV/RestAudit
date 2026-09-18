import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { requireUser } from "@/lib/auth";
import { getTalentProfileByUserId } from "@/db/queries/talent";
import { publicProfileUrl } from "@/lib/url";

export const dynamic = "force-dynamic";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ username_slug: string }> },
): Promise<Response> {
  const { username_slug } = await params;
  const user = await requireUser();
  const profile = getTalentProfileByUserId(user.id);
  if (!profile?.slug || profile.slug !== username_slug) {
    return new NextResponse("Profile not ready", { status: 404 });
  }

  const url = publicProfileUrl(profile.slug);
  const png = await QRCode.toBuffer(url, {
    type: "png",
    width: 512,
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#0b1020", light: "#ffffff" },
  });

  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": `inline; filename="${profile.slug}-qr.png"`,
    },
  });
}