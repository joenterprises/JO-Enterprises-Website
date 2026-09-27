import type { Metadata } from "next";
export const metadata: Metadata = { title: "Admin Login", robots: { index: false, follow: false } };
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import AdminLoginForm from "@/components/AdminLoginForm";

export default function AdminLoginPage() {
  if (isAdminAuthenticated()) redirect("/admin");
  return (
    <section className="section"><div className="container" style={{ maxWidth: 520 }}>
      <div className="card"><span className="eyebrow">JO Enterprises CRM</span><h1>Admin Login</h1><p>Sign in to manage quotation enquiries.</p><AdminLoginForm /></div>
    </div></section>
  );
}
