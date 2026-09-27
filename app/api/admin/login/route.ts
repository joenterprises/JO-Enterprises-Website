import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { adminCookieOptions, ADMIN_COOKIE } from "@/lib/adminAuth";

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: "" }));
  const expected = process.env.ADMIN_PASSWORD || "";
  if (!expected || String(password) !== expected) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, createHash("sha256").update(expected).digest("hex"), adminCookieOptions());
  return response;
}
