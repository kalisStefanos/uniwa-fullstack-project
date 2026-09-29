/*
  Warnings:

  - A unique constraint covering the columns `[inviteCode]` on the table `Apartment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Apartment" ADD COLUMN     "inviteCode" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Apartment_inviteCode_key" ON "Apartment"("inviteCode");
