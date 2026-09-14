import "server-only";
import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import QRCode from "qrcode";
import { getTalentProfile } from "@/db/queries/talent";
import { publicProfileUrl } from "@/lib/url";
import type { TalentProfile } from "@/types/domain";

const ACCENT = rgb(0.545, 0.361, 0.965); // VORA violet #8b5cf6
const DARK = rgb(0.012, 0.043, 0.071); // #030712
const MUTED = rgb(0.353, 0.427, 0.51); // slate

const PROFILE_LABEL: Record<string, string> = {
  native: "Nativo",
  professional: "Profesional",
  intermediate: "Intermedio",
  basic: "Básico",
};

const AVAILABILITY_LABEL: Record<string, string> = {
  immediate: "Disponible de inmediato",
  "15_days": "Disponible en 15 días",
  "30_days": "Disponible en 30 días",
  employed: "Actualmente empleado",
  open: "Abierto a oportunidades",
};

function fmtDate(d: string | null): string {
  if (!d) return "Actualidad";
  const [y, m] = d.split("-");
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];
  if (!y) return d;
  const mm = m ? months[Number(m) - 1] : "";
  return mm ? `${mm} ${y}` : y;
}

/** Build a single-page professional CV PDF from a profile. */
export async function buildCvPdf(profile: TalentProfile): Promise<Uint8Array> {
  const full = getTalentProfile(profile.id);
  const slug = profile.slug ?? "";
  const name = `${profile.first_name} ${profile.last_name}`.trim();

  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]); // A4 portrait
  const { width, height } = page.getSize();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const margin = 48;
  let y = height - margin;

  const drawText = (
    text: string,
    size: number,
    opts: { color?: ReturnType<typeof rgb>; bold?: boolean; x?: number } = {},
  ) => {
    const f = opts.bold ? fontBold : font;
    page.drawText(text, {
      x: opts.x ?? margin,
      y,
      size,
      font: f,
      color: opts.color ?? DARK,
    });
    y -= size + 4;
  };

  // Header
  drawText(name, 24, { bold: true });
  if (profile.professional_title) drawText(profile.professional_title, 13, { color: ACCENT, bold: true });
  const contact = [
    profile.location && profile.country ? `${profile.location}, ${profile.country}` : profile.location || profile.country,
    profile.contact_email,
    profile.show_phone_publicly ? profile.contact_phone : "",
  ].filter(Boolean);
  if (contact.length) drawText(contact.join("  ·  "), 10, { color: MUTED });

  y -= 10;

  const section = (title: string) => {
    y -= 8;
    page.drawText(title.toUpperCase(), { x: margin, y, size: 11, font: fontBold, color: ACCENT });
    page.drawLine({ start: { x: margin, y: y - 3 }, end: { x: width - margin, y: y - 3 }, thickness: 0.6, color: rgb(0.9, 0.9, 0.95) });
    y -= 14;
  };

  // About
  if (profile.bio) {
    section("Perfil");
    drawWrapped(profile.bio, 11, { color: DARK });
  }

  // Experience
  if (full?.experience.length) {
    section("Experiencia");
    for (const e of full.experience) {
      drawText(e.position, 12, { bold: true });
      drawText(e.company, 11, { color: MUTED });
      drawText(`${fmtDate(e.start_date)} — ${fmtDate(e.end_date)}`, 9, { color: MUTED });
      if (e.achievements) drawWrapped(e.achievements, 10, { color: DARK });
      y -= 6;
    }
  }

  // Skills
  if (full?.skills.length) {
    section("Habilidades");
    drawText(full.skills.map((s) => s.name).join("  ·  "), 10, { color: DARK });
  }

  // Education
  if (full?.education.length) {
    section("Educación");
    for (const e of full.education) {
      const line = [e.qualification, e.field].filter(Boolean).join(" — ");
      drawText(e.institution, 12, { bold: true });
      if (line) drawText(line, 10, { color: MUTED });
      if (e.start_date) drawText(`${fmtDate(e.start_date)} — ${fmtDate(e.end_date)}`, 9, { color: MUTED });
      y -= 4;
    }
  }

  // Languages
  if (full?.languages.length) {
    section("Idiomas");
    drawText(
      full.languages.map((l) => `${l.language} — ${PROFILE_LABEL[l.proficiency] ?? l.proficiency}`).join("   "),
      10,
      { color: DARK },
    );
  }

  // Availability
  section("Disponibilidad");
  drawText(AVAILABILITY_LABEL[profile.availability_status] ?? profile.availability_status, 11, { color: DARK });

  // Footer: QR + URL
  const qrBytes = await QRCode.toBuffer(publicProfileUrl(slug), {
    type: "png",
    width: 300,
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#030712", light: "#ffffff" },
  });
  const qr = await pdf.embedPng(qrBytes);
  const qrSize = 64;
  page.drawImage(qr, { x: margin, y: 34, width: qrSize, height: qrSize });
  page.drawText("Ver mi perfil profesional", { x: margin + qrSize + 12, y: 64, size: 10, font: fontBold, color: DARK });
  page.drawText(`vora.com/talent/${slug}`, { x: margin + qrSize + 12, y: 48, size: 10, font, color: ACCENT });

  function drawWrapped(text: string, size: number, opts: { color?: ReturnType<typeof rgb> } = {}) {
    const f = font;
    const maxWidth = width - margin * 2;
    const words = text.split(" ");
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (f.widthOfTextAtSize(test, size) > maxWidth) {
        page.drawText(line, { x: margin, y, size, font: f, color: opts.color ?? DARK });
        y -= size + 4;
        line = word;
      } else {
        line = test;
      }
    }
    if (line) {
      page.drawText(line, { x: margin, y, size, font: f, color: opts.color ?? DARK });
      y -= size + 4;
    }
  }

  return pdf.save();
}