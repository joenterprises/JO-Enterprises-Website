import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Admin() {
  const items = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const open = items.filter((x) => x.status === "NEW").length;
  const contacted = items.filter((x) => x.status !== "NEW").length;

  return (
    <section className="section">
      <div className="container">
        <div className="sectionHead">
          <span className="eyebrow">Lightweight CRM</span>
          <h1>Quotation Enquiries</h1>
          <p>
            Recent enquiries are stored here so you can follow up, contact
            customers and keep track of quotation requests.
          </p>
        </div>

        <div className="statsGrid" style={{ marginBottom: "28px" }}>
          <div className="statCard"><strong>{items.length}</strong><span className="statLabel">Recent enquiries</span></div>
          <div className="statCard"><strong>{open}</strong><span className="statLabel">New enquiries</span></div>
          <div className="statCard"><strong>{contacted}</strong><span className="statLabel">Followed-up enquiries</span></div>
          <div className="statCard"><strong>100</strong><span className="statLabel">Maximum shown</span></div>
        </div>

        <div className="card" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "900px" }}>
            <thead>
              <tr>
                <th align="left">Date</th>
                <th align="left">Customer</th>
                <th align="left">Phone</th>
                <th align="left">Product</th>
                <th align="left">Category</th>
                <th align="left">Quantity / size</th>
                <th align="left">Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((x) => (
                <tr key={x.id}>
                  <td>{x.createdAt.toLocaleString("en-IN")}</td>
                  <td>
                    <strong>{x.name}</strong>
                    {x.email && <div>{x.email}</div>}
                    {x.message && <small>{x.message}</small>}
                  </td>
                  <td>
                    <a href={`https://wa.me/91${x.phone.replace(/\D/g, "")}`} target="_blank" rel="noreferrer">
                      {x.phone}
                    </a>
                  </td>
                  <td>{x.product || "-"}</td>
                  <td>{x.category || "-"}</td>
                  <td>{x.quantity || "-"}</td>
                  <td><span className="pill">{x.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
