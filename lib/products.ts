export type PrintProduct = {
  slug: string;
  name: string;
  description: string;
  category: string;
  image?: string;
};

export const printProductGroups = [
  {
    title: "BUSINESS PRINTING",
    items: [
      ["business-cards", "Business Cards"],
      ["letterheads", "Letterheads"],
      ["bill-books", "Bill Books"],
      ["envelopes", "Envelopes"],
      ["vouchers-receipts", "Vouchers, Etc"],
    ],
  },
  {
    title: "PERSONAL & EVENTS",
    items: [
      ["invitation-cards", "Invitation Cards"],
      ["wedding-cards", "Wedding Cards"],
      ["function-invitations", "Function Invitations"],
      ["thank-you-cards", "Thank You Cards"],
      ["thamboola-bags", "Thamboola Bags"],
    ],
  },
  {
    title: "PROMOTIONAL",
    items: [
      ["flyers", "Flyers"],
      ["brochures", "Brochures"],
      ["wall-posters", "Wall Posters"],
      ["stickers-labels", "Stickers & Labels"],
      ["banners", "Banners"],
    ],
  },
  {
    title: "PACKAGING & BAGS",
    items: [
      ["paper-bags", "Paper Bags"],
      ["big-shopper-bags", "Big Shopper Bags"],
      ["product-covers", "Product Covers"],
      ["packaging-boxes", "Packaging Boxes"],
      ["pouches", "Pouches"],
    ],
  },
  {
    title: "SPECIAL / SEASONAL",
    items: [
      ["calendars", "Calendars"],
      ["certificates", "Certificates"],
      ["entry-tickets", "Entry Tickets"],
      ["books-booklets", "Books/Booklets"],
      ["custom-printing", "Custom Printing"],
    ],
  },
  {
    title: "DIGITAL / SOCIAL MEDIA",
    items: [
      ["social-media-profile", "Social Media Profile"],
      ["social-media-posters", "Social Media Posters"],
      ["webpage-themes", "Webpage Themes & Templates"],
      ["illustrations", "Illustrations & Others"],
      ["ui-kits", "UI Icons, Kits & Templates"],
    ],
  },
] as const;

const imageMap: Record<string, string> = {
  "business-cards": "/images/Business_Cards.webp",
  letterheads: "/images/Letter_Heads.webp",
  "bill-books": "/images/Bill_Books.webp",
  envelopes: "/images/Envelopes.webp",
  "vouchers-receipts": "/images/Voucher_Receipt.webp",
  "invitation-cards": "/images/Invitations.webp",
  "wedding-cards": "/images/Invitations.webp",
  "function-invitations": "/images/Invitations.webp",
  "thank-you-cards": "/images/Invitations.webp",
  "thamboola-bags": "/images/Non_Woven_Bags.webp",
  flyers: "/images/Flyers_Brochures.webp",
  brochures: "/images/Flyers_Brochures.webp",
  "wall-posters": "/images/Wall_Posters.webp",
  "stickers-labels": "/images/Stickers.webp",
  banners: "/images/Wall_Posters.webp",
  "paper-bags": "/images/Box_Paper_Bags.webp",
  "big-shopper-bags": "/images/Box_Paper_Bags.webp",
  "product-covers": "/images/Box_Paper_Bags.webp",
  "packaging-boxes": "/images/Box_Paper_Bags.webp",
  pouches: "/images/Box_Paper_Bags.webp",
  calendars: "/images/Calendars.webp",
  certificates: "/images/Calendars.webp",
  "entry-tickets": "/images/Voucher_Receipt.webp",
  "books-booklets": "/images/Files.webp",
  "custom-printing": "/images/Graphic_Design.webp",
  "social-media-profile": "/images/Graphic_Design.webp",
  "social-media-posters": "/images/Graphic_Design.webp",
  "webpage-themes": "/images/Graphic_Design.webp",
  illustrations: "/images/Graphic_Design.webp",
  "ui-kits": "/images/Graphic_Design.webp",
};

const descriptions: Record<string, string> = {
  "business-cards": "Professional business cards in standard and premium finishes.",
  letterheads: "Branded letterheads for professional business correspondence.",
  "bill-books": "Custom duplicate and triplicate bill books for everyday business use.",
  envelopes: "Branded envelopes in standard and custom sizes.",
  "vouchers-receipts": "Custom vouchers, receipts and accounting stationery.",
  "invitation-cards": "Invitation cards for personal celebrations and special occasions.",
  "wedding-cards": "Elegant wedding stationery with custom paper and finishing options.",
  "function-invitations": "Invitations for functions, ceremonies and family events.",
  "thank-you-cards": "Custom thank-you cards for personal and business occasions.",
  "thamboola-bags": "Printed and customised thamboola bags for functions and celebrations.",
  flyers: "High-impact flyers for local and promotional campaigns.",
  brochures: "Informative brochures for products, services and businesses.",
  "wall-posters": "Large-format posters for branding, announcements and promotions.",
  "stickers-labels": "Custom stickers and labels in a variety of shapes and finishes.",
  banners: "Indoor and outdoor banners for events, stores and promotions.",
  "paper-bags": "Custom paper bags for retail, events and brand presentation.",
  "big-shopper-bags": "Large shopper bags with customised branding.",
  "product-covers": "Printed product covers for presentation and packaging.",
  "packaging-boxes": "Custom printed boxes for product presentation and gifting.",
  pouches: "Custom pouches and flexible packaging options.",
  calendars: "Branded calendars for promotional distribution and gifting.",
  certificates: "Printed certificates for schools, businesses and events.",
  "entry-tickets": "Custom printed entry tickets with numbering and event details.",
  "books-booklets": "Books, manuals and booklets in custom sizes and bindings.",
  "custom-printing": "Made-to-order print solutions for special requirements.",
  "social-media-profile": "Profile and cover graphics for social media branding.",
  "social-media-posters": "Promotional social posts designed for digital campaigns.",
  "webpage-themes": "Visual themes and templates for websites and landing pages.",
  illustrations: "Illustrations and supporting artwork for print and digital use.",
  "ui-kits": "UI icons, kits and templates for consistent digital branding.",
};

export const printProducts: PrintProduct[] = printProductGroups.flatMap((group) =>
  group.items.map(([slug, name]) => ({
    slug,
    name,
    description: descriptions[slug] ?? "Custom print and design solutions from JO Enterprises.",
    category: group.title,
    image: imageMap[slug],
  }))
);
