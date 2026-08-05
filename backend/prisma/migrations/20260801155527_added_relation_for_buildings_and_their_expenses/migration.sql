/*
  Warnings:

  - Added the required column `buildingId` to the `Expense` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "buildingId" INTEGER NOT NULL;

-- DropEnum
DROP TYPE "Method";

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
