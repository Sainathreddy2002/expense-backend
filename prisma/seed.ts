import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const defaultCategories = [{ name: 'Freelance/Contract Work' }];

  for (const category of defaultCategories) {
    await prisma.categories.create({
      data: {
        name: category.name,
        isDefault: true,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
