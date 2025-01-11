/*
  Warnings:

  - You are about to drop the column `title` on the `Toast` table. All the data in the column will be lost.
  - Added the required column `text` to the `Toast` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Toast" DROP COLUMN "title",
ADD COLUMN     "src" TEXT NOT NULL DEFAULT '/toust-icon.png',
ADD COLUMN     "text" TEXT NOT NULL;
