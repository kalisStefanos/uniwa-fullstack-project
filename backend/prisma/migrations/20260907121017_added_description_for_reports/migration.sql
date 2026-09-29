/*
  Warnings:

  - Added the required column `description` to the `ExpenseReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ExpenseReport" ADD COLUMN     "description" TEXT NOT NULL;
