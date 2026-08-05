/*
  Warnings:

  - The primary key for the `Bill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Bill` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `buildingId` to the `Bill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_aptId_fkey";

-- AlterTable
ALTER TABLE "Bill" DROP CONSTRAINT "Bill_pkey",
ADD COLUMN     "buildingId" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Bill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "issuedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "Bill" ADD CONSTRAINT "Bill_aptId_buildingId_fkey" FOREIGN KEY ("aptId", "buildingId") REFERENCES "Apartment"("id", "buildingId") ON DELETE RESTRICT ON UPDATE CASCADE;
