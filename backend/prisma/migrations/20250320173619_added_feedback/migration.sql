/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `feedback` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "feedback" ALTER COLUMN "full_Name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "feedback_email_key" ON "feedback"("email");
