/*
  Warnings:

  - You are about to drop the column `stastus` on the `event` table. All the data in the column will be lost.
  - Added the required column `status` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` DROP COLUMN `stastus`,
    ADD COLUMN `status` ENUM('ACTIVO', 'INACTIVO') NOT NULL;
