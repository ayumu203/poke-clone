/*
  Warnings:

  - Added the required column `back_image` to the `pokemon` table without a default value. This is not possible if the table is not empty.
  - Added the required column `front_image` to the `pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemon" ADD COLUMN     "back_image" TEXT NOT NULL,
ADD COLUMN     "front_image" TEXT NOT NULL;
