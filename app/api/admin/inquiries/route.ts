import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/adminAuth";

const STATUSES = ["NEW", "CONTACTED", "QUOTED", "WON", "LOST"];

export async function PATCH(req: Request) {
  if (!isAdminAuthenticated()) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const id = Number(body.id);
  const status = String(body.status || "").toUpperCase();
  if (!Number.isInteger(id) || !STATUSES.includes(status)) return NextResponse.json({ error: "Invalid enquiry or status" }, { status: 400 });
  const item = await prisma.inquiry.update({ where: { id }, data: { status } });
  return NextResponse.json({ ok: true, item });
}
