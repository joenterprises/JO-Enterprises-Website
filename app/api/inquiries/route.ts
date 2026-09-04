import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const WHATSAPP_TO = "919445573457";
const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

function clean(value: unknown) {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  return text || null;
}

function buildMessage(b: Record<string, unknown>, id: number) {
  return [
    "🔔 New quotation enquiry — JO Enterprises",
    `Reference: JO-${id}`,
    `Name: ${clean(b.name) || "-"}`,
    `Phone / WhatsApp: ${clean(b.phone) || "-"}`,
    `Email: ${clean(b.email) || "-"}`,
    `Product / service: ${clean(b.product) || "-"}`,
    `Quantity / size: ${clean(b.quantity) || "-"}`,
    `Category: ${clean(b.category) || "-"}`,
    `Requirements: ${clean(b.message) || "-"}`,
  ].join("\n");
}

async function sendWhatsApp(body: Record<string, unknown>, id: number, attachment?: File) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneNumberId) return { sent: false };

  const graphVersion = process.env.WHATSAPP_GRAPH_VERSION || "v23.0";
  const url = `https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`;
  const send = (payload: unknown) => fetch(url, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify(payload) });

  const textResponse = await send({ messaging_product: "whatsapp", to: WHATSAPP_TO, type: "text", text: { body: buildMessage(body, id) } });
  if (!textResponse.ok) return { sent: false };

  if (attachment && attachment.size > 0) {
    const mediaForm = new FormData();
    mediaForm.append("messaging_product", "whatsapp");
    mediaForm.append("file", attachment, attachment.name);
    const mediaResponse = await fetch(`https://graph.facebook.com/${graphVersion}/${phoneNumberId}/media`, { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: mediaForm });
    const media = await mediaResponse.json().catch(() => ({}));
    if (mediaResponse.ok && media.id) {
      await send({ messaging_product: "whatsapp", to: WHATSAPP_TO, type: "image", image: { id: media.id, caption: `Reference image — JO-${id}` } });
    }
  }
  return { sent: true };
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const b = Object.fromEntries(formData.entries());
    const attachmentValue = formData.get("attachment");
    const attachment = attachmentValue instanceof File && attachmentValue.size > 0 ? attachmentValue : undefined;

    if (!clean(b.name) || !clean(b.phone)) return NextResponse.json({ error: "Name and phone are required" }, { status: 400 });
    if (attachment && attachment.size > MAX_IMAGE_SIZE) return NextResponse.json({ error: "Image must be smaller than 3 MB" }, { status: 400 });
    if (attachment && !attachment.type.startsWith("image/")) return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });

    const item = await prisma.inquiry.create({
      data: {
        name: String(b.name).trim(), phone: String(b.phone).trim(), email: clean(b.email),
        product: clean(b.product), quantity: clean(b.quantity), category: clean(b.category), message: clean(b.message),
      },
    });
    const whatsapp = await sendWhatsApp(b, item.id, attachment);
    return NextResponse.json({ ok: true, id: item.id, reference: `JO-${item.id}`, whatsappSent: whatsapp.sent, whatsappFallback: !whatsapp.sent });
  } catch (error) {
    console.error("Unable to save enquiry:", error);
    return NextResponse.json({ error: "Unable to save enquiry" }, { status: 500 });
  }
}
