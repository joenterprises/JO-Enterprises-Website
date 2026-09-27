"use client";

import { useState } from "react";

const WHATSAPP_NUMBER = "919445573457";
const MAX_IMAGE_SIZE = 3 * 1024 * 1024;

type SubmitState = "idle" | "loading" | "done" | "error";

function buildWhatsAppUrl(
  data: Record<string, FormDataEntryValue>,
  reference?: string
) {
  const lines = [
    "Hello JO Enterprises, I would like to request a quotation.",
    reference ? `Reference: ${reference}` : "",
    `Name: ${data.name || "-"}`,
    `Phone / WhatsApp: ${data.phone || "-"}`,
    `Email: ${data.email || "-"}`,
    `Product / service: ${data.product || "-"}`,
    `Quantity / size: ${data.quantity || "-"}`,
    `Category: ${data.category || "-"}`,
    `Requirements: ${data.message || "-"}`,
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function InquiryForm({ product = "" }: { product?: string }) {
  const [state, setState] = useState<SubmitState>("idle");
  const [reference, setReference] = useState("");
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const attachment = formData.get("attachment");

    if (attachment instanceof File && attachment.size > MAX_IMAGE_SIZE) {
      setErrorMessage("Please attach an image smaller than 3 MB.");
      setState("error");
      return;
    }

    const data = Object.fromEntries(formData.entries());
    const blankWindow = window.open("", "_blank");

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        body: formData,
      });

      const result = await response.json().catch(() => ({}));
      const ref = result.reference || "";
      const url = buildWhatsAppUrl(data, ref);

      setReference(ref);
      setWhatsappUrl(url);

      // The new tab is opened synchronously from the button click, so
      // browsers are much less likely to block it as a popup.
      if (blankWindow && !blankWindow.closed) {
        blankWindow.location.href = url;
      } else {
        window.location.href = url;
      }

      if (!response.ok) {
        throw new Error(result.error || "The enquiry could not be saved.");
      }

      form.reset();
      setState("done");
    } catch (error) {
      console.error(error);
      if (blankWindow && !blankWindow.closed) blankWindow.close();
      setErrorMessage(
        error instanceof Error
          ? `${error.message} Your WhatsApp message is ready below.`
          : "We could not save the enquiry. Your WhatsApp message is ready below."
      );
      setState("error");
    }
  }

  return (
    <form className="form quoteForm" onSubmit={submit}>
      {state === "done" && (
        <div className="notice success" role="status">
          <strong>Your enquiry has been received.</strong>
          <br />
          {reference && <>Reference: {reference}. </>}
          WhatsApp should now be open with your quotation message. Please tap
          <strong> Send</strong> in WhatsApp.
          {whatsappUrl && (
            <>
              <br />
              <a
                className="btn primary"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", marginTop: "12px" }}
              >
                Continue on WhatsApp
              </a>
            </>
          )}
        </div>
      )}

      {state === "error" && (
        <div className="notice fallback" role="alert">
          <strong>{errorMessage}</strong>
          {whatsappUrl && (
            <>
              <br />
              <a
                className="btn primary"
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-block", marginTop: "12px" }}
              >
                Open WhatsApp
              </a>
            </>
          )}
        </div>
      )}

      <div className="formGrid">
        <label>
          <span>Name</span>
          <input name="name" placeholder="Your name" required />
        </label>
        <label>
          <span>Phone / WhatsApp</span>
          <input
            name="phone"
            placeholder="Your number"
            inputMode="tel"
            required
          />
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
          <span>Category</span>
          <select name="category" defaultValue="" required>
            <option value="" disabled>Choose the option</option>
            <option>Basic (Cost Effective)</option>
            <option>Premium (Quality Matters)</option>
            <option>Elite (Luxourious)</option>
          </select>
        </label>
      </div>

      <label>
        <span>Attach reference image <em>(optional, max 3 MB)</em></span>
        <input name="attachment" type="file" accept="image/*" />
      </label>

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
        {state === "loading" ? "Sending…" : "Send Enquiry & Open WhatsApp"}
      </button>

      <p className="formHint">
        Your enquiry is saved to our CRM and a WhatsApp message is prepared for
        you to send to JO Enterprises.
      </p>
    </form>
  );
}
