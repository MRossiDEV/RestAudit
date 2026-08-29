import { NextResponse } from "next/server";
import { LeadCaptureSchema } from "@/lib/schemas/lead";
import { createLead } from "@/db/queries/leads";
import { calculateHealthCheck } from "@/engines/health-check";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = LeadCaptureSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please provide complete contact details." },
      { status: 400 },
    );
  }

  const { intent, name, email, phone, restaurantName, checkInput } = parsed.data;
  const checkResult = calculateHealthCheck(checkInput);

  const lead = createLead({
    intent,
    name,
    email,
    phone: phone || undefined,
    restaurantName,
    checkInput,
    checkResult,
  });

  return NextResponse.json(
    { ok: true, intent, leadId: lead.id },
    { status: 201 },
  );
}