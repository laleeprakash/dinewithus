/*
  Warnings:

  - You are about to drop the column `status` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;
