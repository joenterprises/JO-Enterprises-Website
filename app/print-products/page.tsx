import {prisma} from "@/lib/prisma";
import Link from "next/link";

const productImages: Record<string, string> = {
  "business-cards": "/images/Business Cards.webp",
  "letterheads": "/images/Letter Heads.webp",
  "bill-books": "/images/Bill Books.webp",
  "envelopes": "/images/Envelopes.webp",
  "vouchers-receipts": "/images/Voucher_Receipt.webp",
  files: "/images/Files.webp",
  "wall-posters": "/images/Wall Posters.webp",
  "flyers-brochures": "/images/Flyers_Brochures.webp",
  stickers: "/images/Stickers.webp",
  "box-paper-bags": "/images/Box_Paper Bags.webp",
  calendars: "/images/Calendars.webp",
  "non-woven-bags": "/images/Non Woven Bags.webp",
  "woven-labels": "/images/Woven Labels.webp",
  novelties: "/images/Novelties.webp",
  "graphic-design": "/images/Graphic Design.webp",
  invitations: "/images/Invitations.webp",
};

export default async function PrintProducts() {
  const products = await prisma.product.findMany({orderBy: {name: "asc"}});

  return <section className="section"><div className="container"><div className="sectionHead"><span className="eyebrow">Print Products</span><h1>Everything you can print with JO Enterprises</h1><p>Choose a product to start an enquiry. Pricing is quotation-based so specifications and finishing can be tailored to your requirement.</p></div><div className="products">{products.map(p => {
    const image = productImages[p.slug] || p.image || "/images/placeholder.svg";
    return <article className="card product" key={p.id}><img src={image} alt={p.name}/><div className="productBody"><span className="pill">{p.category}</span><h3>{p.name}</h3><p>{p.description}</p><Link className="btn primary" href={"/contact?product="+encodeURIComponent(p.name)}>Get a Quote</Link></div></article>;
  })}</div></div></section>;
}
