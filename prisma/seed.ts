import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const products = [
  ["business-cards","Business Cards","Regular and premium business cards with gloss/matt lamination, synthetic stocks, foils, texture, Spot UV and specialty boards.","/images/Business Cards.png","Business Printing",true],
  ["letterheads","Letter Heads","A4 and Letter size letterheads in one-colour, two-colour or multicolour printing on your desired paper.","/images/Letter Heads.png","Business Printing",true],
  ["bill-books","Bill Books","Custom duplicate/triplicate bill books and business stationery prepared to your required format.","/images/Bill Books.png","Business Printing",false],
  ["envelopes","Envelopes","Branded envelopes in standard and custom formats for professional correspondence.","/images/Envelopes.png","Business Printing",false],
  ["vouchers-receipts","Voucher / Receipt","Custom vouchers, receipts and accounting stationery for businesses.","/images/Voucher_Receipt.png","Business Printing",false],
  ["files","Files","Printed office files and presentation folders for organised business documentation.","/images/Files.png","Business Printing",false],
  ["wall-posters","Wall Posters","Large-format posters for branding, announcements, campaigns and promotions.","/images/Wall Posters.png","Promotional",true],
  ["flyers-brochures","Flyers / Brochures","Promotional flyers and brochures designed for clear, vibrant communication.","/images/Flyers_Brochures.png","Promotional",true],
  ["stickers","Stickers","Custom stickers and labels in a variety of shapes, finishes and sizes.","/images/Stickers.png","Labels & Packaging",false],
  ["box-paper-bags","Box / Paper Bags","Custom printed boxes and paper bags for product presentation and retail branding.","/images/Box_Paper Bags.png","Labels & Packaging",true],
  ["calendars","Calendars","Branded calendars for promotional distribution and corporate gifting.","/images/Calendars.png","Promotional",false],
  ["non-woven-bags","Non Woven Bags","Reusable non-woven carry bags with custom branding.","/images/Non Woven Bags.png","Promotional",false],
  ["woven-labels","Woven Labels","Custom woven labels for apparel and textile branding.","/images/Woven Labels.png","Labels & Packaging",false],
  ["novelties","Novelties","Custom promotional novelties and branded merchandise.","/images/Novelties.png","Promotional",false],
  ["graphic-design","Graphic Design","Creative artwork, layouts and production-ready design support.","/images/Graphic Design.png","Design",true],
  ["invitations","Invitations","Basic and premium invitations with single cards, pouches, Spot UV, 3D lamination, gold foil, die cuts and paper/board sets.","/images/Invitations.png","Invitations",true]
];

async function main() {
  for (const p of products) {
    await prisma.product.upsert({
      where: { slug: p[0] as string },
      update: { name:p[1] as string, description:p[2] as string, image:p[3] as string, category:p[4] as string, featured:p[5] as boolean },
      create: { slug:p[0] as string, name:p[1] as string, description:p[2] as string, image:p[3] as string, category:p[4] as string, featured:p[5] as boolean }
    });
  }
}
main().finally(() => prisma.$disconnect());
