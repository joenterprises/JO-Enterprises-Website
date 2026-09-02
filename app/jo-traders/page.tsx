import Link from "next/link";

const whatsappHref = "https://wa.me/917904243134?text=Hello%20JO%20Traders%2C%20I%20would%20like%20to%20place%20an%20order.";

const oils = [
  { name: "Sesame Oil", sizes: ["1L — Rs. 479", "500ml — Rs. 249"] },
  { name: "Groundnut Oil", sizes: ["1L — Rs. 379", "500ml — Rs. 199"] },
  { name: "Coconut Oil", sizes: ["500ml — Rs. 359"] },
];

export default function JOTraders() {
  return (
    <div className="tradersPage">
      <section className="tradersHero">
        <div className="container">
          <span className="tradersEyebrow">JO Traders</span>
          <h1>Pure choices. Honest prices.</h1>
          <p>Quality cooking oils and crackers, brought to you with dependable service.</p>
          <Link className="tradersOrderBtn" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            Order Now on WhatsApp
          </Link>
        </div>
      </section>

      <section className="tradersSection">
        <div className="container">
          <div className="tradersSectionHead">
            <span className="tradersEyebrow">Cooking Oils</span>
            <h2>Everyday oils, carefully selected</h2>
            <p>100ml, 200ml, 5L can and 15L tin available.</p>
          </div>

          <div className="tradersProductGrid">
            {oils.map((oil) => (
              <article className="tradersProductCard" key={oil.name}>
                <div className="tradersImagePlaceholder">
                  <span>Product Image</span>
                  <small>Image can be updated later</small>
                </div>
                <div className="tradersProductBody">
                  <h3>{oil.name}</h3>
                  {oil.sizes.map((size) => <p key={size}>{size}</p>)}
                  <Link className="tradersSmallOrder" href={whatsappHref} target="_blank" rel="noopener noreferrer">
                    Order on WhatsApp
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="tradersCrackers">
        <div className="container tradersCrackersInner">
          <div>
            <span className="tradersEyebrow">Crackers</span>
            <h2>50% Discount</h2>
            <p>Crackers — discount 50%, available throughout the year.</p>
          </div>
          <div className="tradersCrackerImage">
            <span>Product Image</span>
            <small>Image can be updated later</small>
          </div>
          <Link className="tradersOrderBtn tradersOrderBtnDark" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            Order Now on WhatsApp
          </Link>
        </div>
      </section>
    </div>
  );
}
