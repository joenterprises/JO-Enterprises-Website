import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const WHATSAPP_TO = "919445573457";

type InquiryBody = {
  name?: string;
  phone?: string;
  email?: string;
  product?: string;
  quantity?: string;
  budget?: string;
  message?: string;
};

function clean(value: unknown) {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  return text || null;
}

function buildMessage(b: InquiryBody, id: number) {
  return [
    "🔔 New quotation enquiry — JO Enterprises",
    `Reference: JO-${id}`,
    `Name: ${clean(b.name) || "-"}`,
    `Phone / WhatsApp: ${clean(b.phone) || "-"}`,
    `Email: ${clean(b.email) || "-"}`,
    `Product / service: ${clean(b.product) || "-"}`,
    `Quantity / size: ${clean(b.quantity) || "-"}`,
    `Budget: ${clean(b.budget) || "-"}`,
    `Requirements: ${clean(b.message) || "-"}`,
  ].join("\n");
}

async function sendWhatsAppTemplate(body: InquiryBody, id: number) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const templateName = process.env.WHATSAPP_TEMPLATE_NAME;
  const languageCode = process.env.WHATSAPP_TEMPLATE_LANGUAGE || "en_US";
  const graphVersion = process.env.WHATSAPP_GRAPH_VERSION || "v23.0";

  // WhatsApp Cloud API is optional. If credentials/template are not configured,
  // the client will offer a safe pre-filled WhatsApp fallback.
  if (!token || !phoneNumberId || !templateName) {
    return { sent: false, reason: "not_configured" as const };
  }

  const url = `https://graph.facebook.com/${graphVersion}/${phoneNumberId}/messages`;

  // Create an approved WhatsApp template named in WHATSAPP_TEMPLATE_NAME.
  // The template should have 8 body variables in this order:
  // name, phone, email, product, quantity, budget, requirements, reference.
  const parameters = [
    clean(body.name) || "-",
    clean(body.phone) || "-",
    clean(body.email) || "-",
    clean(body.product) || "-",
    clean(body.quantity) || "-",
    clean(body.budget) || "-",
    clean(body.message) || "-",
    `JO-${id}`,
  ];

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to: WHATSAPP_TO,
      type: "template",
      template: {
        name: templateName,
        language: { code: languageCode },
        components: [
          {
            type: "body",
            parameters: parameters.map((text) => ({
              type: "text",
              text,
            })),
          },
        ],
      },
    }),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    console.error("WhatsApp Cloud API error:", detail);
    return { sent: false, reason: "api_error" as const };
  }

  return { sent: true as const };
}

export async function POST(req: Request) {
  try {
    const b = (await req.json()) as InquiryBody;

    if (!clean(b.name) || !clean(b.phone)) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const item = await prisma.inquiry.create({
      data: {
        name: String(b.name).trim(),
        phone: String(b.phone).trim(),
        email: clean(b.email),
        product: clean(b.product),
        quantity: clean(b.quantity),
        budget: clean(b.budget),
        message: clean(b.message),
      },
    });

    const whatsapp = await sendWhatsAppTemplate(b, item.id);

    return NextResponse.json({
      ok: true,
      id: item.id,
      reference: `JO-${item.id}`,
      whatsappSent: whatsapp.sent,
      // Never expose API credentials. This only tells the UI whether automatic
      // WhatsApp delivery was configured and accepted.
      whatsappFallback: !whatsapp.sent,
    });
  } catch (error) {
    console.error("Unable to save enquiry:", error);
    return NextResponse.json(
      { error: "Unable to save enquiry" },
      { status: 500 }
    );
  }
}
