/*
  Warnings:

  - You are about to drop the `Contact` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[imageurl]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bloodtype` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dob` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageurl` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userid_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bloodtype" TEXT NOT NULL,
ADD COLUMN     "contacts" TEXT[],
ADD COLUMN     "dob" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "emails" TEXT[],
ADD COLUMN     "height" INTEGER NOT NULL,
ADD COLUMN     "imageurl" TEXT NOT NULL,
ADD COLUMN     "medicalhistory" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "weight" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Contact";

-- CreateIndex
CREATE UNIQUE INDEX "User_imageurl_key" ON "User"("imageurl");
