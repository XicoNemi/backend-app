/*
  Warnings:

  - You are about to drop the column `Status` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `Status`,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false;
