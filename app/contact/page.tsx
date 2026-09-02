"use client";

import InquiryForm from "@/components/InquiryForm";

export default function ContactPage() {
  return (
    <section className="contactPage section">
      <div className="container contactShell">
        <div className="contactIntro">
          <span className="eyebrow">Get a quote</span>
          <h1>Let&apos;s make something worth printing.</h1>
          <p>
            Tell us what you need and we&apos;ll help with the right paper, size,
            finishing and quantity. For the fastest response, WhatsApp is also
            available below.
          </p>
          <div className="contactQuick">
            <a href="https://wa.me/919445573457" target="_blank" rel="noreferrer" className="quickLink">
              <span className="quickIcon">⌕</span>
              <span><b>WhatsApp</b><small>Fastest response</small></span>
            </a>
            <a href="tel:+919791830472" className="quickLink">
              <span className="quickIcon">☎</span>
              <span><b>+91 97918 30472</b><small>Call us directly</small></span>
            </a>
          </div>
        </div>

        <div className="contactCard">
          <div className="contactCardHead">
            <span className="cardEyebrow">Your requirements</span>
            <h2>Request a quotation</h2>
            <p>Only the essentials. We&apos;ll take it from there.</p>
          </div>
          <InquiryForm />
        </div>
      </div>
    </section>
  );
}
