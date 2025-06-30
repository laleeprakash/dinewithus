-- AlterTable
ALTER TABLE "Table" ADD COLUMN     "userId" INTEGER;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
