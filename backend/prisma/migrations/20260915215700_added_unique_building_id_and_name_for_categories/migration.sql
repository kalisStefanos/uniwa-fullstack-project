/*
  Warnings:

  - A unique constraint covering the columns `[buildingId,name]` on the table `ExpenseCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ExpenseCategory_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseCategory_buildingId_name_key" ON "ExpenseCategory"("buildingId", "name");
