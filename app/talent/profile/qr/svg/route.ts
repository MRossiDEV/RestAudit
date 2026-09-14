import { NextResponse } from "next/server";
import QRCode from "qrcode";
import { requireUser } from "@/lib/auth";
import { getTalentProfileByUserId } from "@/db/queries/talent";
import { publicProfileUrl } from "@/lib/url";

export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const user = await requireUser();
  const profile = getTalentProfileByUserId(user.id);
  if (!profile?.slug) {
    return new NextResponse("Profile not ready", { status: 404 });
  }

  const url = publicProfileUrl(profile.slug);
  const svg = await QRCode.toString(url, {
    type: "svg",
    margin: 2,
    errorCorrectionLevel: "M",
    color: { dark: "#0b1020", light: "#ffffff" },
  });

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Content-Disposition": `inline; filename="${profile.slug}-qr.svg"`,
    },
  });
}