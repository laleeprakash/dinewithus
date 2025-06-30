-- AlterTable
ALTER TABLE "restaurant" ADD COLUMN     "ownerId" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "restaurant_owner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "restaurant_owner_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "restaurant_owner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
