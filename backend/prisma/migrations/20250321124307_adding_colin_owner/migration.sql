/*
  Warnings:

  - Added the required column `password` to the `restaurant_owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "restaurant_owner" ADD COLUMN     "password" TEXT NOT NULL;
