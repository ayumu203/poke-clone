/*
  Warnings:

  - The primary key for the `Move` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `model_id` on the `Move` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[move_id]` on the table `Move` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `move_id` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Move_model_id_key";

-- AlterTable
ALTER TABLE "Move" DROP CONSTRAINT "Move_pkey",
DROP COLUMN "model_id",
ADD COLUMN     "move_id" INTEGER NOT NULL,
ADD CONSTRAINT "Move_pkey" PRIMARY KEY ("move_id");

-- CreateIndex
CREATE UNIQUE INDEX "Move_move_id_key" ON "Move"("move_id");
