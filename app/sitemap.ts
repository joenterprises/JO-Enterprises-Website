import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/services", "/print-products", "/gallery", "/e-cards", "/contact", "/jo-traders"];
  return pages.map((path, index) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: index === 0 ? 1 : path === "/contact" || path === "/print-products" ? 0.9 : 0.7,
  }));
}
