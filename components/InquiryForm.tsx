"use client";

import { useState } from "react";

const WHATSAPP = "919445573457";

type SubmitState = "idle" | "loading" | "done" | "fallback" | "error";

function buildWhatsAppMessage(
  data: Record<string, FormDataEntryValue>,
  reference?: string
) {
  const lines = [
    "Hello JO Enterprises, I have submitted a quotation enquiry.",
    reference ? `Reference: ${reference}` : "",
    `Name: ${data.name || "-"}`,
    `Phone: ${data.phone || "-"}`,
    `Email: ${data.email || "-"}`,
    `Product / service: ${data.product || "-"}`,
    `Quantity / size: ${data.quantity || "-"}`,
    `Budget: ${data.budget || "-"}`,
    `Requirements: ${data.message || "-"}`,
  ].filter(Boolean);

  return encodeURIComponent(lines.join("\n"));
}

export default function InquiryForm({ product = "" }: { product?: string }) {
  const [state, setState] = useState<SubmitState>("idle");
  const [reference, setReference] = useState("");
  const [fallbackUrl, setFallbackUrl] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");

    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json().catch(() => ({}));

      if (response.ok) {
        const ref = result.reference || "";
        setReference(ref);
        form.reset();

        // If WhatsApp Cloud API is configured, the server has already sent
        // the enquiry to 9445573457. Do not open another WhatsApp window.
        if (result.whatsappSent) {
          setState("done");
          return;
        }

        // Otherwise offer the user a pre-filled WhatsApp message.
        setFallbackUrl(
          `https://wa.me/${WHATSAPP}?text=${buildWhatsAppMessage(data, ref)}`
        );
        setState("fallback");
        return;
      }

      throw new Error(result.error || "Unable to save enquiry");
    } catch (error) {
      console.error(error);
      setState("error");
    }
  }

  return (
    <form className="form quoteForm" onSubmit={submit}>
      {state === "done" && (
        <div className="notice success" role="status">
          <strong>Thank you. Your enquiry has been received.</strong>
          <br />
          {reference && <>Reference: {reference}. </>}
          We&apos;ll contact you shortly.
        </div>
      )}

      {state === "fallback" && (
        <div className="notice fallback" role="status">
          <strong>Your enquiry has been received.</strong>
          <br />
          {reference && <>Reference: {reference}. </>}
          For the fastest response, please continue on WhatsApp and tap Send.
          <br />
          <a
            className="btn primary"
            href={fallbackUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", marginTop: "12px" }}
          >
            Continue on WhatsApp
          </a>
        </div>
      )}

      {state === "error" && (
        <div className="notice fallback" role="alert">
          We couldn&apos;t save the enquiry. Please try again or contact us
          directly on WhatsApp or phone.
        </div>
      )}

      <div className="formGrid">
        <label>
          <span>Name</span>
          <input name="name" placeholder="Your name" required />
        </label>
        <label>
          <span>Phone / WhatsApp</span>
          <input name="phone" placeholder="Your number" required />
        </label>
      </div>

      <div className="formGrid">
        <label>
          <span>Email <em>(optional)</em></span>
          <input name="email" type="email" placeholder="you@example.com" />
        </label>
        <label>
          <span>Product / service</span>
          <input
            name="product"
            defaultValue={product}
            placeholder="e.g. Business Cards"
          />
        </label>
      </div>

      <div className="formGrid">
        <label>
          <span>Quantity / size</span>
          <input name="quantity" placeholder="e.g. 500 copies" />
        </label>
        <label>
          <span>Budget <em>(optional)</em></span>
          <select name="budget" defaultValue="">
            <option value="">Choose a range</option>
            <option>Under ₹5,000</option>
            <option>₹5,000–₹15,000</option>
            <option>₹15,000–₹50,000</option>
            <option>₹50,000+</option>
          </select>
        </label>
      </div>

      <label>
        <span>What do you need?</span>
        <textarea
          name="message"
          placeholder="Size, paper, finishing, delivery date, references, or anything else that helps us quote accurately."
        />
      </label>

      <button
        className="btn primary quoteSubmit"
        type="submit"
        disabled={state === "loading"}
      >
        {state === "loading" ? "Sending…" : "Send Enquiry"}
      </button>

      <p className="formHint">
        Your details are used only to respond to this enquiry.
      </p>
    </form>
  );
}
