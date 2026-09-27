import { absoluteUrl, BUSINESS_NAME, PHONE, SITE_URL } from "@/lib/seo";

export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#business`,
    name: BUSINESS_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/images/Logo.webp"),
    image: [absoluteUrl("/images/Logo.webp"), absoluteUrl("/images/Business_Cards.webp"), absoluteUrl("/images/Invitations.webp")],
    telephone: PHONE,
    priceRange: "₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sivakasi",
      addressRegion: "Tamil Nadu",
      addressCountry: "IN",
    },
    areaServed: ["Sivakasi", "Virudhunagar district", "Tamil Nadu"],
    sameAs: [
      "https://www.instagram.com/joenterprises.am/",
      "https://www.facebook.com/JOE14621",
      "https://www.youtube.com/@joenterprises_am",
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function WebsiteSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/print-products?search={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
