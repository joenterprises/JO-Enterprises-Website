export const SITE_URL = "https://www.joenterprises-printshop.co.in";
export const BUSINESS_NAME = "JO Enterprises";
export const PHONE = "+919791830472";
export const WHATSAPP = "+919445573457";

export const defaultKeywords = [
  "printing services Sivakasi",
  "printing shop Sivakasi",
  "digital printing Sivakasi",
  "custom printing Sivakasi",
  "invitation printing Sivakasi",
  "thamboola bags Sivakasi",
  "business card printing Sivakasi",
  "brochure printing Sivakasi",
  "sticker printing Sivakasi",
  "branding and printing Tamil Nadu",
];

export function absoluteUrl(path = "") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
