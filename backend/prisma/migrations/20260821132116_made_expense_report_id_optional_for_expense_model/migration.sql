-- DropForeignKey
ALTER TABLE "Expense" DROP CONSTRAINT "Expense_expenseReportId_fkey";

-- AlterTable
ALTER TABLE "Expense" ALTER COLUMN "expenseReportId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_expenseReportId_fkey" FOREIGN KEY ("expenseReportId") REFERENCES "ExpenseReport"("id") ON DELETE SET NULL ON UPDATE CASCADE;
