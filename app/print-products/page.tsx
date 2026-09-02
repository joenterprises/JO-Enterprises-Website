import {prisma} from "@/lib/prisma";
import Link from "next/link";

const productImages: Record<string, string> = {
  "business-cards": "/images/Business Cards.png",
  "letterheads": "/images/Letter Heads.png",
  "bill-books": "/images/Bill Books.png",
  "envelopes": "/images/Envelopes.png",
  "vouchers-receipts": "/images/Voucher_Receipt.png",
  files: "/images/Files.png",
  "wall-posters": "/images/Wall Posters.png",
  "flyers-brochures": "/images/Flyers_Brochures.png",
  stickers: "/images/Stickers.png",
  "box-paper-bags": "/images/Box_Paper Bags.png",
  calendars: "/images/Calendars.png",
  "non-woven-bags": "/images/Non Woven Bags.png",
  "woven-labels": "/images/Woven Labels.png",
  novelties: "/images/Novelties.png",
  "graphic-design": "/images/Graphic Design.png",
  invitations: "/images/Invitations.png",
};

export default async function PrintProducts() {
  const products = await prisma.product.findMany({orderBy: {name: "asc"}});

  return <section className="section"><div className="container"><div className="sectionHead"><span className="eyebrow">Print Products</span><h1>Everything you can print with JO Enterprises</h1><p>Choose a product to start an enquiry. Pricing is quotation-based so specifications and finishing can be tailored to your requirement.</p></div><div className="products">{products.map(p => {
    const image = productImages[p.slug] || p.image || "/images/placeholder.svg";
    return <article className="card product" key={p.id}><img src={image} alt={p.name}/><div className="productBody"><span className="pill">{p.category}</span><h3>{p.name}</h3><p>{p.description}</p><Link className="btn primary" href={"/contact?product="+encodeURIComponent(p.name)}>Get a Quote</Link></div></article>;
  })}</div></div></section>;
}
