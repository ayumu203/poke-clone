/*
  Warnings:

  - You are about to drop the column `Exp` on the `team_pokemon` table. All the data in the column will be lost.
  - Added the required column `exp` to the `team_pokemon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "team_pokemon" DROP COLUMN "Exp",
ADD COLUMN     "exp" INTEGER NOT NULL;
