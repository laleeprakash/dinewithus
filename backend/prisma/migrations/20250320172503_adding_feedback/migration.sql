-- CreateTable
CREATE TABLE "feedback" (
    "id" SERIAL NOT NULL,
    "full_Name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "feedback_pkey" PRIMARY KEY ("id")
);
