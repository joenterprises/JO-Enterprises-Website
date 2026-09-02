import Link from "next/link";
import PromoCarousel from "@/components/PromoCarousel";

const categories = [
  { title: "Invitation", sub: "Cards", href: "/print-products?category=Invitation%20Cards" },
  { title: "Thamboola", sub: "Bags", href: "/print-products?category=Thamboola%20Bags" },
  { title: "Business", sub: "Essentials", href: "/print-products?category=Business%20Essentials" },
  { title: "Event/Function", sub: "Essentials", href: "/print-products?category=Event%2FFunction%20Essentials" },
  { title: "Digital", sub: "Promo", href: "/print-products?category=Digital%20Promo" },
  { title: "Custom Printing", sub: "Solutions", href: "/print-products?category=Custom%20Printing%20Solutions" },
];

const reasons = [
  {
    title: "QUALITY FIRST",
    text: "Premium-quality printing with sharp detail and professional finishing.",
  },
  {
    title: "ONE-STOP SOLUTION",
    text: "From creative design to printing and finishing, everything is handled seamlessly.",
  },
  {
    title: "BUILT FOR YOUR BRAND",
    text: "Business cards, invitations, brochures, packaging and promotional prints tailored to your brand.",
  },
  {
    title: "ANY SIZE. ANY QUANTITY.",
    text: "Whether you need a small urgent order or a large production run, we scale with you.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container heroGrid">
          <div className="heroCopy">
            <div>
              <div className="tagline">
                <span className="taglineMain">Creative Prints</span>
                <span className="taglineDivider">|</span>
                <span className="taglineSub">Brand Promotion Experts</span>
              </div>
              <h1>Ideas into <span>stunning print.</span></h1>
              <p>
                JO Enterprises is your complete printing partner for high-quality custom
                printing, branding, invitations, stationery and promotional materials.
              </p>
              <div className="buttons">
                <Link className="btn primary" href="/contact">Request a Quote</Link>
                <a className="btn secondary" href="https://wa.me/919445573457">WhatsApp Us</a>
              </div>
            </div>
          </div>
          <div className="heroMedia"><PromoCarousel /></div>
        </div>
      </section>

      <section className="section whySection">
        <div className="container">
          <div className="whyHeader">
            <span className="eyebrow">WHY CHOOSE JO ENTERPRISES?</span>
            <h2>Printing that puts your brand first.</h2>
          </div>

          <div className="whyGrid">
            {reasons.map((reason, index) => (
              <article className="whyCard" key={reason.title}>
                <span className="whyNumber">0{index + 1}</span>
                <h3>{reason.title}</h3>
                <p>{reason.text}</p>
              </article>
            ))}
          </div>

          <div className="trustCaption">Trusted Printing &amp; Branding Partner</div>
        </div>
      </section>

      <section className="reviewsSection" aria-label="Customer reviews">
        <div className="container">
          <div className="reviewsHeader">
            <div>
              <span className="eyebrow">Real Reviews From Our Customers</span>
              <h2>What our customers say</h2>
              <p>Genuine Google reviews from customers who chose JO Enterprises.</p>
            </div>
            <a className="googleReviewBtn" href="https://www.google.com/search?q=joenterprise+google+review" target="_blank" rel="noreferrer">
              <span className="googleG">G</span> View all Google reviews ↗
            </a>
          </div>

          <div className="reviewCards">
            <article className="reviewCard reviewSnapCard">
              <div className="reviewCardBadge">★ REAL GOOGLE REVIEW</div>
              <div className="reviewSnapFrame">
                <img src="/images/google-review-1.png" alt="Google review from sasipriya kamban with photos of JO Enterprises Thamboola bags" />
              </div>
              <a href="https://www.google.com/search?q=joenterprise+google+review" target="_blank" rel="noreferrer" className="reviewLink">View on Google ↗</a>
            </article>

            <article className="reviewCard reviewSnapCard">
              <div className="reviewCardBadge">★ REAL GOOGLE REVIEW</div>
              <div className="reviewSnapFrame">
                <img src="/images/google-review-2.png" alt="Google review from Muniswaran petchimuthu for JO Enterprises" />
              </div>
              <a href="https://www.google.com/search?q=joenterprise+google+review" target="_blank" rel="noreferrer" className="reviewLink">View on Google ↗</a>
            </article>

            <article className="reviewCard reviewSnapCard">
              <div className="reviewCardBadge">★ REAL GOOGLE REVIEW</div>
              <div className="reviewSnapFrame">
                <img src="/images/google-review-3.png" alt="Google review from Senthil Kumar praising JO Enterprises printing design and quality" />
              </div>
              <a href="https://www.google.com/search?q=joenterprise+google+review" target="_blank" rel="noreferrer" className="reviewLink">View on Google ↗</a>
            </article>
          </div>
        </div>
      </section>

      <section className="statsSection" aria-label="JO Enterprises achievements">
        <div className="container">
          <div className="statsHeader">
            <span className="eyebrow">Our Numbers</span>
            <h2 className="trustResultsTitle">Trusted by customers. Proven by results.</h2>
          </div>
          <div className="statsGrid">
            <div className="statCard">
              <span className="statIcon" aria-hidden="true">♡</span>
              <strong>359+</strong>
              <span className="statLabel">Happy Customers and counting</span>
            </div>
            <div className="statCard">
              <span className="statIcon" aria-hidden="true">✦</span>
              <strong>1,260+</strong>
              <span className="statLabel">Concept to Print Success Stories</span>
            </div>
            <div className="statCard">
              <span className="statIcon" aria-hidden="true">♜</span>
              <strong>5+</strong>
              <span className="statLabel">Years of Excellence</span>
            </div>
            <div className="statCard ratingCard">
              <span className="statIcon" aria-hidden="true">★</span>
              <strong>4.9/5</strong>
              <span className="statLabel">Google Rating</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
