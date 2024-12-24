-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "note" TEXT,
    "userId" TEXT NOT NULL,
    "waitFor" INTEGER NOT NULL DEFAULT 1000,
    "toastEvery" INTEGER NOT NULL DEFAULT 1500,
    "toastDuration" INTEGER NOT NULL DEFAULT 8000,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Website_domain_key" ON "Website"("domain");

-- AddForeignKey
ALTER TABLE "Website" ADD CONSTRAINT "Website_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
