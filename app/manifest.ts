import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name: "JO Enterprises Printing & Design", short_name: "JO Enterprises", start_url: "/", display: "standalone", background_color: "#ffffff", theme_color: "#111111", icons: [{ src: "/images/Logo.webp", sizes: "512x512", type: "image/webp" }] };
}
