/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `restaurant_owner` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "restaurant_owner_email_key" ON "restaurant_owner"("email");
