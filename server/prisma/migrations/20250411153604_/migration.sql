/*
  Warnings:

  - Added the required column `status_target` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `is_evolve` on the `pokemon` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Move" ADD COLUMN     "status_target" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "pokemon" DROP COLUMN "is_evolve",
ADD COLUMN     "is_evolve" INTEGER NOT NULL;
