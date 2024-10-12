-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "transactionID" TEXT NOT NULL,
    "walletAddress" TEXT NOT NULL,
    "betColor" TEXT NOT NULL,
    "outcomeColor" TEXT NOT NULL,
    "won" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "walletAddress" TEXT NOT NULL,
    "amount" INTEGER NOT NULL DEFAULT 0,
    "points" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("walletAddress")
);

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_transactionID_key" ON "Transaction"("transactionID");
