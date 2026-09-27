import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

function clean(value: unknown) {
  if (value === undefined || value === null) return null;
  const text = String(value).trim();
  return text || null;
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const b = Object.fromEntries(formData.entries());
    const attachmentValue = formData.get("attachment");
    const attachment =
      attachmentValue instanceof File && attachmentValue.size > 0
        ? attachmentValue
        : undefined;

    if (!clean(b.name) || !clean(b.phone)) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    if (attachment && attachment.size > MAX_IMAGE_SIZE) {
      return NextResponse.json(
        { error: "Image must be smaller than 3 MB" },
        { status: 400 }
      );
    }

    if (attachment && !attachment.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
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
        category: clean(b.category),
        message: clean(b.message),
      },
    });

    return NextResponse.json({
      ok: true,
      id: item.id,
      reference: `JO-${item.id}`,
    });
  } catch (error) {
    console.error("Unable to save enquiry:", error);
    return NextResponse.json(
      { error: "Unable to save enquiry. Please use WhatsApp below." },
      { status: 500 }
    );
  }
}
