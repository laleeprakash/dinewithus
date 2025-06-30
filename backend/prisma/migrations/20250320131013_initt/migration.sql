-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" BYTEA NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Table" (
    "id" SERIAL NOT NULL,
    "tableNumber" INTEGER NOT NULL,
    "capacity" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,

    CONSTRAINT "Table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "customerName" TEXT NOT NULL,
    "bookingDate" TIMESTAMP(3) NOT NULL,
    "numberOfGuests" INTEGER NOT NULL,
    "tableId" INTEGER NOT NULL,
    "restaurantId" INTEGER NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_location_key" ON "Restaurant"("location");

-- CreateIndex
CREATE UNIQUE INDEX "Table_tableNumber_key" ON "Table"("tableNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- AddForeignKey
ALTER TABLE "Table" ADD CONSTRAINT "Table_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_tableId_fkey" FOREIGN KEY ("tableId") REFERENCES "Table"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_restaurantId_fkey" FOREIGN KEY ("restaurantId") REFERENCES "Restaurant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
