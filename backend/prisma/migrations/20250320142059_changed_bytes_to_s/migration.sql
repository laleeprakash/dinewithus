/*
  Warnings:

  - You are about to drop the column `image` on the `Restaurant` table. All the data in the column will be lost.
  - Added the required column `imageurl` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" DROP COLUMN "image",
ADD COLUMN     "imageurl" TEXT NOT NULL;
