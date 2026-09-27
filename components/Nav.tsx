"use client";

import Link from "next/link";
import { useState } from "react";
import { FaChevronDown, FaWhatsapp } from "react-icons/fa";
import { printProductGroups } from "@/lib/products";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const close = () => {
    setOpen(false);
    setProductsOpen(false);
  };

  return (
    <nav className="nav">
      <div className="container navin">
        <Link href="/" className="brand" aria-label="JO Enterprises - Print Solutions" onClick={close}>
          <img src="/images/Logo.webp" alt="JO Enterprises logo" className="logo" />
          <span className="brandText">
            <span className="brandTitle">JO Enterprises</span>
            <span className="brandSubtitle">Print Solutions</span>
          </span>
        </Link>

        <button
          className="menuToggle"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>

        <div className={`links ${open ? "open" : ""}`}>
          <Link href="/" onClick={close}>Home</Link>
          <Link href="/services" onClick={close}>Our Services</Link>

          <div
            className={`navMega ${productsOpen ? "isOpen" : ""}`}
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <button
              type="button"
              className="navMegaTrigger"
              aria-expanded={productsOpen}
              onClick={() => setProductsOpen((value) => !value)}
            >
              Print Products <FaChevronDown aria-hidden="true" />
            </button>

            <div className="navMegaMenu">
              <div className="navMegaTitle">PRINT PRODUCTS</div>
              <div className="navMegaGrid">
                {printProductGroups.map((group) => (
                  <div className="navMegaColumn" key={group.title}>
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map(([slug, name]) => (
                        <li key={slug}>
                          <Link href={`/print-products#${slug}`} onClick={close}>
                            {name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <Link className="navMegaViewAll" href="/print-products" onClick={close}>
                View All Print Products <span>→</span>
              </Link>
            </div>
          </div>

          <Link href="/jo-traders" onClick={close}>JO Traders</Link>
          <Link href="/gallery" onClick={close}>Gallery</Link>
          <Link href="/contact" onClick={close}>Contact</Link>

          <Link
            className="whatsappLink"
            href="https://wa.me/919445573457"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message JO Enterprises on WhatsApp"
            onClick={close}
          >
            <FaWhatsapp className="whatsappIcon" />
          </Link>
          <Link className="cta" href="/contact" onClick={close}>Get a Quote</Link>
        </div>
      </div>
    </nav>
  );
}
