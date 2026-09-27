import { cookies } from "next/headers";
import { createHash } from "crypto";

const COOKIE = "jo_admin";
const password = () => process.env.ADMIN_PASSWORD || "";

export function adminToken() {
  const value = password();
  return value ? createHash("sha256").update(value).digest("hex") : "";
}

export function isAdminAuthenticated() {
  const token = cookies().get(COOKIE)?.value;
  return Boolean(token && adminToken() && token === adminToken());
}

export function adminCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  };
}

export const ADMIN_COOKIE = COOKIE;
