"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setLoading(true); setError("");
    const response = await fetch("/api/admin/login", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ password }) });
    if (!response.ok) { setError("Invalid password."); setLoading(false); return; }
    router.push("/admin"); router.refresh();
  }
  return <form className="form" onSubmit={submit} style={{marginTop:20}}>
    <label><span>Admin password</span><input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required /></label>
    {error && <div className="notice fallback" role="alert">{error}</div>}
    <button className="btn primary" disabled={loading}>{loading ? "Signing in…" : "Sign in"}</button>
  </form>;
}
