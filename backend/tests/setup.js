import { beforeEach, afterAll } from 'vitest';
import { prisma } from '../prismaClient.js';

// if (process.env.ALLOW_DB_WIPE !== 'true') {
//     throw new Error('Refusing to wipe: ALLOW_DB_WIPE is not set');
// }

beforeEach(async () => { // Before each test! not just before each test file!
  // Delete all data from db
  await prisma.$executeRawUnsafe(`
    TRUNCATE TABLE "Bill", "Expense", "ExpenseReport", "ExpenseCategory",
                   "Apartment", "Building", "User"
    RESTART IDENTITY CASCADE
  `);
});

afterAll(async () => {
  await prisma.$disconnect();
});