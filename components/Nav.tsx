"use client";

import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <nav className="nav">
      <div className="container navin">
        <Link href="/" className="brand" aria-label="JO Enterprises - Print Solutions" onClick={close}>
          <img src="/images/Logo.webp" alt="JO Enterprises logo" className="logo" />
          <span className="brandText"><span className="brandTitle">JO Enterprises</span><span className="brandSubtitle">Print Solutions</span></span>
        </Link>
        <button className="menuToggle" type="button" aria-label="Toggle navigation menu" aria-expanded={open} onClick={() => setOpen(!open)}>
          <span></span><span></span><span></span>
        </button>
        <div className={`links ${open ? "open" : ""}`}>
          <Link href="/" onClick={close}>Home</Link>
          <Link href="/services" onClick={close}>Our Services</Link>
          <Link href="/print-products" onClick={close}>Print Products</Link>
          <Link href="/jo-traders" onClick={close}>JO Traders</Link>
          <Link href="/gallery" onClick={close}>Gallery</Link>
          <Link href="/contact" onClick={close}>Contact</Link>
          <Link className="whatsappLink" href="https://wa.me/919445573457" target="_blank" rel="noopener noreferrer" aria-label="Message JO Enterprises on WhatsApp" onClick={close}><FaWhatsapp className="whatsappIcon" /></Link>
          <Link className="cta" href="/contact" onClick={close}>Get a Quote</Link>
        </div>
      </div>
    </nav>
  );
}
