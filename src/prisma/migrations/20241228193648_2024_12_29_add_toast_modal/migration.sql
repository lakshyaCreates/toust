-- CreateTable
CREATE TABLE "Toast" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "timeAgo" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "websiteId" TEXT NOT NULL,

    CONSTRAINT "Toast_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Toast" ADD CONSTRAINT "Toast_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE CASCADE ON UPDATE CASCADE;
