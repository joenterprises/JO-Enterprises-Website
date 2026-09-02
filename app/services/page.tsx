import Link from "next/link";

const categories = [
  { title: "Invitation", sub: "Cards", href: "/print-products?category=Invitation%20Cards" },
  { title: "Thamboola", sub: "Bags", href: "/print-products?category=Thamboola%20Bags" },
  { title: "Business", sub: "Essentials", href: "/print-products?category=Business%20Essentials" },
  { title: "Event/Function", sub: "Essentials", href: "/print-products?category=Event%2FFunction%20Essentials" },
  { title: "Digital", sub: "Promo", href: "/print-products?category=Digital%20Promo" },
  { title: "Custom Printing", sub: "Solutions", href: "/print-products?category=Custom%20Printing%20Solutions" },
];

const workflow = [
  ["Enquiry", "Tell us your requirement."],
  ["Quote", "Receive a competitive quotation."],
  ["Input Collection", "Share content, logos, photos and specifications."],
  ["Design", "Our creative team prepares artwork."],
  ["Approval", "Review and approve the proof."],
  ["Prepress", "Artwork verification and production setup."],
  ["Printing", "High-quality digital or offset printing."],
  ["Finishing", "Lamination, cutting, binding, foiling, embossing and packing."],
  ["Quality Check", "Every product is inspected."],
  ["Ready for Dispatch", "Packed and prepared for shipment."],
  ["Delivery", "Delivered safely and on time."],
  ["Repeat Order", "Quick reordering with saved artwork and specifications."],
];

export default function ServicesPage() {
  return (
    <main>
      <section className="section servicesIntro">
        <div className="container">
          <div className="sectionHead">
            <span className="eyebrow">Our Services</span>
            <h1>Print solutions built around your brand.</h1>
            <p>From invitations and business essentials to event printing, digital promotion and custom print solutions, we turn your ideas into professional, memorable brand experiences.</p>
          </div>
        </div>
      </section>

      <section className="categorySection" aria-label="Our printing solutions">
        <div className="container">
          <div className="categoryGrid">
            {categories.map((category) => (
              <Link className="categoryItem" href={category.href} key={category.title}>
                <span>{category.title}</span>
                <strong>{category.sub}</strong>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="brandStatement">
        <div className="container">
          <div className="brandStatementTag">
            <span className="sparkle sparkleOne">✦</span>
            <span className="sparkle sparkleTwo">✧</span>
            <p>
              <span>நாங்க வெறும் பிரிண்டிங் மட்டும் செய்யல..</span>
              <span>உங்க ஐடியாவை அடுத்த லெவலுக்குக் கொண்டு போகும்</span>
              <span className="goldText">பிராண்ட் அடையாளத்தை உருவாக்குகிறோம்!</span>
              <em>🤝 Beyond Printing, Building Brands.</em>
            </p>
            <span className="sparkle sparkleThree">✦</span>
          </div>
        </div>
      </section>

      <section className="section servicesWorkflow">
        <div className="container">
          <div className="sectionHead">
            <span className="eyebrow">How it works</span>
            <h2>From idea to delivery</h2>
            <p>A clear, professional process from your first enquiry through production, quality checking and delivery.</p>
          </div>
          <div className="workflow">
            {workflow.map(([title, description], i) => (
              <div className="step" key={title}>
                <b>{i + 1}. {title}</b>
                <span>{description}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
