/*
  Warnings:

  - You are about to alter the column `areaWeight` on the `ExpenseCategory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(8,3)`.
  - You are about to alter the column `floorWeight` on the `ExpenseCategory` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(8,3)`.
  - A unique constraint covering the columns `[floor,doorNum,buildingId]` on the table `Apartment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[strAddress,strNum]` on the table `Building` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ExpenseCategory" ALTER COLUMN "areaWeight" SET DATA TYPE DECIMAL(8,3),
ALTER COLUMN "floorWeight" SET DATA TYPE DECIMAL(8,3);

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_floor_doorNum_buildingId_key" ON "Apartment"("floor", "doorNum", "buildingId");

-- CreateIndex
CREATE UNIQUE INDEX "Building_strAddress_strNum_key" ON "Building"("strAddress", "strNum");
