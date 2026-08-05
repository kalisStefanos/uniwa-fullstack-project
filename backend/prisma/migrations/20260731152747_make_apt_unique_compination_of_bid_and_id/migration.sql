/*
  Warnings:

  - A unique constraint covering the columns `[buildingId,id]` on the table `Apartment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Apartment_buildingId_id_key" ON "Apartment"("buildingId", "id");
