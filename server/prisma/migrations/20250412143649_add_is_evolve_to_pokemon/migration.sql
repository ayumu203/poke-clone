/*
  Warnings:

  - Added the required column `is_evolve` to the `pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pokemon" ADD COLUMN     "is_evolve" INTEGER NOT NULL;
