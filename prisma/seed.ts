import { PrismaClient } from "@prisma/client";
import { printProducts } from "../lib/products";

const prisma = new PrismaClient();

async function main() {
  for (const product of printProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {
        name: product.name,
        description: product.description,
        image: product.image,
        category: product.category,
      },
      create: {
        slug: product.slug,
        name: product.name,
        description: product.description,
        image: product.image,
        category: product.category,
      },
    });
  }
  console.log(`Seeded ${printProducts.length} print products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
