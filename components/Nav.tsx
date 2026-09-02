import Link from "next/link";

export default function Nav() {
  return (
    <nav className="nav">
      <div className="container navin">

        <Link href="/" className="brand" aria-label="JO Enterprises - Print Solutions">
          <img
            src="/images/Logo.png"
            alt="JO Enterprises logo"
            className="logo"
          />
          <span className="brandText">
            <span className="brandTitle">JO Enterprises</span>
            <span className="brandSubtitle">Print Solutions</span>
          </span>
        </Link>

        <div className="links">
          <Link href="/">Home</Link>
          <Link href="/services">Our Services</Link>
          <Link href="/print-products">Print Products</Link>
          <Link href="/jo-traders">JO Traders</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
          <Link
            className="whatsappLink"
            href="https://wa.me/919445573457"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message JO Enterprises on WhatsApp"
            title="Message us on WhatsApp"
          >
            <svg
              className="whatsappIcon"
              viewBox="0 0 24 24"
              aria-hidden="true"
              focusable="false"
            >
              <path
                fill="currentColor"
                d="M12 2.1a9.9 9.9 0 0 0-8.55 14.9L2 21.9l5.05-1.32A9.9 9.9 0 1 0 12 2.1Zm0 18a8.08 8.08 0 0 1-4.12-1.13l-.3-.18-3 .78.8-2.92-.2-.31A8.08 8.08 0 1 1 12 20.1Zm4.42-6.05c-.24-.12-1.4-.69-1.62-.77-.22-.08-.38-.12-.54.12-.16.24-.62.77-.76.93-.14.16-.28.18-.52.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.18-1.39-1.32-1.63-.14-.24-.01-.37.1-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.41-.54-.42h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.69 2.58 4.1 3.62.57.25 1.02.4 1.37.51.58.18 1.1.15 1.51.09.46-.07 1.4-.57 1.6-1.12.2-.55.2-1.02.14-1.12-.06-.1-.22-.16-.46-.28Z"
              />
            </svg>
          </Link>

          <Link className="cta" href="/contact">
            Get a Quote
          </Link>
        </div>

      </div>
    </nav>
  );
}