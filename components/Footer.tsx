import { Facebook, Instagram, Youtube, Phone, MapPin } from "lucide-react";

const socialLinks = [
  { label: "WhatsApp", href: "https://wa.me/919445573457", icon: <span className="footerWhatsApp" aria-hidden="true">⌕</span> },
  { label: "Facebook", href: "https://www.facebook.com/JOE14621", icon: <Facebook className="footerIcon" /> },
  { label: "Instagram", href: "https://www.instagram.com/joenterprises.am/?hl=en", icon: <Instagram className="footerIcon" /> },
  { label: "Google", href: "https://share.google/gQ7tw6Y193nRxJXTP", icon: <span className="footerGoogle" aria-hidden="true">G</span> },
  { label: "YouTube", href: "https://www.youtube.com/@joenterprises_am", icon: <Youtube className="footerIcon" /> },
  { label: "Call 9791830472", href: "tel:+919791830472", icon: <Phone className="footerIcon" /> },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footerRow">
        <a href="/" className="footerBrand" aria-label="JO Enterprises home">
          <img src="/images/logo.png" alt="JO Enterprises" className="footerLogo" />
        </a>

        <div className="footerLocation">
          <span className="footerLocationIcon" aria-label="Locations" title="Locations"><MapPin /></span>
          <span>Printing Hub: Sivakasi</span>
          <span>Design Desk: Muhavoor</span>
        </div>

        <div className="footerSocials" aria-label="JO Enterprises social and contact links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={link.label}
              title={link.label}
              className="footerSocialLink"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
