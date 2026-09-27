"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Item = {
  id: number; name: string; phone: string; email: string | null; product: string | null;
  quantity: string | null; category: string | null; message: string | null; status: string; createdAt: string; source: string | null; landingPage: string | null;
};
const STATUSES = ["NEW", "CONTACTED", "QUOTED", "WON", "LOST"];

export default function AdminCRM({ items }: { items: Item[] }) {
  const [query, setQuery] = useState(""); const [status, setStatus] = useState("ALL"); const [saving, setSaving] = useState<number | null>(null); const router = useRouter();
  const filtered = useMemo(() => items.filter(x => {
    const haystack = [x.name,x.phone,x.email,x.product,x.category,x.message].filter(Boolean).join(" ").toLowerCase();
    return (!query || haystack.includes(query.toLowerCase())) && (status === "ALL" || x.status === status);
  }), [items, query, status]);

  async function updateStatus(id:number, nextStatus:string) {
    setSaving(id);
    await fetch("/api/admin/inquiries", {method:"PATCH", headers:{"Content-Type":"application/json"}, body:JSON.stringify({id,status:nextStatus})});
    setSaving(null); router.refresh();
  }
  async function logout() { await fetch("/api/admin/logout",{method:"POST"}); router.push("/admin/login"); router.refresh(); }

  return <div>
    <div style={{display:"flex",gap:10,flexWrap:"wrap",marginBottom:20}}>
      <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search name, phone, product…" style={{flex:"1 1 260px"}} />
      <select value={status} onChange={e=>setStatus(e.target.value)} style={{width:170}}><option value="ALL">All statuses</option>{STATUSES.map(s=><option key={s}>{s}</option>)}</select>
      <button className="btn secondary" onClick={logout}>Logout</button>
    </div>
    <div style={{overflowX:"auto"}}>
      <table style={{width:"100%",borderCollapse:"collapse",minWidth:920}}>
        <thead><tr>{["Reference / Date","Customer","Product","Requirement","Status","Action"].map(h=><th key={h} align="left" style={{padding:12,borderBottom:"1px solid #dcebed"}}>{h}</th>)}</tr></thead>
        <tbody>{filtered.map(x=><tr key={x.id}>
          <td style={{padding:12,verticalAlign:"top"}}><strong>JO-{x.id}</strong><br/><small>{new Date(x.createdAt).toLocaleString("en-IN")}</small></td>
          <td style={{padding:12,verticalAlign:"top"}}><strong>{x.name}</strong><br/>{x.phone}{x.email&&<><br/>{x.email}</>}</td>
          <td style={{padding:12,verticalAlign:"top"}}>{x.product||"-"}<br/><small>{x.quantity||""}</small></td>
          <td style={{padding:12,verticalAlign:"top"}}>{x.category||"-"}<br/><small>{x.message||"-"}</small><br/><small>Source: {x.source || "website"}</small></td>
          <td style={{padding:12,verticalAlign:"top"}}><select value={x.status} onChange={e=>updateStatus(x.id,e.target.value)} disabled={saving===x.id}>{STATUSES.map(s=><option key={s}>{s}</option>)}</select></td>
          <td style={{padding:12,verticalAlign:"top"}}><a className="btn secondary" href={`https://wa.me/91${x.phone.replace(/\D/g,"").replace(/^91/,"")}`} target="_blank" rel="noreferrer">WhatsApp</a></td>
        </tr>)}</tbody>
      </table>
      {!filtered.length&&<div className="notice" style={{marginTop:16}}>No enquiries match the current filter.</div>}
    </div>
  </div>;
}
