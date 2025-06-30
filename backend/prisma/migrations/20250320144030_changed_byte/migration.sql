/*
  Warnings:

  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_restaurantId_fkey";

-- DropForeignKey
ALTER TABLE "Table" DROP CONSTRAINT "Table_restaurantId_fkey";

-- DropTable
DROP TABLE "Restaurant";

-- CreateTable
CREATE TABLE "restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageurl" TEXT NOT NULL,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_location_key" ON "restaurant"("location");

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
