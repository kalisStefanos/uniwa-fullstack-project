/*
  Warnings:

  - You are about to drop the column `f1` on the `Apartment` table. All the data in the column will be lost.
  - The primary key for the `Bill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `buildingId` on the `Bill` table. All the data in the column will be lost.
  - The primary key for the `Building` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Expense` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isAdmin` on the `User` table. All the data in the column will be lost.
  - Added the required column `area` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `doorNum` to the `Apartment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expenseReportId` to the `Bill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expenseReportId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buildingId` to the `ExpenseCategory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Apartment" DROP CONSTRAINT "Apartment_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "Apartment" DROP CONSTRAINT "Apartment_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_aptId_buildingId_fkey";

-- DropForeignKey
ALTER TABLE "Building" DROP CONSTRAINT "Building_adminId_fkey";

-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_buildingId_fkey";

-- DropIndex
DROP INDEX "Apartment_buildingId_id_key";

-- AlterTable
ALTER TABLE "Apartment" DROP COLUMN "f1",
ADD COLUMN     "area" INTEGER NOT NULL,
ADD COLUMN     "doorNum" INTEGER NOT NULL,
ALTER COLUMN "ownerId" SET DATA TYPE TEXT,
ALTER COLUMN "buildingId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_pkey",
DROP COLUMN "buildingId",
ADD COLUMN     "expenseReportId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Bill_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Bill_id_seq";

-- AlterTable
ALTER TABLE "Building" DROP CONSTRAINT "Building_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "adminId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Building_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Building_id_seq";

-- AlterTable
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_pkey",
ADD COLUMN     "expenseReportId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "buildingId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Expense_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Expense_id_seq";

-- AlterTable
ALTER TABLE "ExpenseCategory" ADD COLUMN     "areaWeight" DECIMAL(65,30) NOT NULL DEFAULT 1.0,
ADD COLUMN     "buildingId" TEXT NOT NULL,
ADD COLUMN     "floorWeight" DECIMAL(65,30) NOT NULL DEFAULT 1.0;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "isAdmin",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateTable
CREATE TABLE "ExpenseReport" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ExpenseReport_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Building" ADD CONSTRAINT "Building_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Apartment" ADD CONSTRAINT "Apartment_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_aptId_fkey" FOREIGN KEY ("aptId") REFERENCES "Apartment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_expenseReportId_fkey" FOREIGN KEY ("expenseReportId") REFERENCES "ExpenseReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExpenseCategory" ADD CONSTRAINT "ExpenseCategory_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_buildingId_fkey" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_expenseReportId_fkey" FOREIGN KEY ("expenseReportId") REFERENCES "ExpenseReport"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
