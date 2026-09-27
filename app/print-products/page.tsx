import Link from "next/link";
import { printProducts } from "@/lib/products";

export default function PrintProductsPage() {
  return (
    <main>
      <section className="section printProductsPage">
        <div className="container">
          <div className="sectionHead">
            <span className="eyebrow">Print Products</span>
            <h1>Everything you can print with JO Enterprises</h1>
            <p>
              From business stationery and event invitations to packaging,
              promotional printing and digital artwork — choose what you need
              and request a quotation.
            </p>
          </div>

          <div className="products">
            {printProducts.map((product) => (
              <article id={product.slug} className="card product" key={product.slug}>
                <div className="productImage">
                  {product.image ? (
                    <img src={product.image} alt={product.name} loading="lazy" />
                  ) : (
                    <span>JO Enterprises</span>
                  )}
                </div>
                <div className="productBody">
                  <span className="pill">{product.category}</span>
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <Link
                    className="btn primary"
                    href={`/contact?product=${encodeURIComponent(product.name)}`}
                  >
                    Get a Quote
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
