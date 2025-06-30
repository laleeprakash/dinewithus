/*
  Warnings:

  - You are about to drop the column `customerName` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "customerName",
ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;
