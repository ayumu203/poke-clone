/*
  Warnings:

  - Added the required column `ailment_chance` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Move" ADD COLUMN     "ailment_chance" INTEGER NOT NULL;
