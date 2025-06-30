/*
  Warnings:

  - Made the column `full_Name` on table `feedback` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "feedback" ALTER COLUMN "full_Name" SET NOT NULL;

-- AlterTable
ALTER TABLE "restaurant" ADD COLUMN     "approval" INTEGER NOT NULL DEFAULT -1;
