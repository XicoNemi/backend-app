/*
  Warnings:

  - You are about to alter the column `distance` on the `travel` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `time` on the `travel` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `establishment` ADD COLUMN `idFacebook` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `travel` MODIFY `distance` INTEGER NOT NULL,
    MODIFY `time` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `idFacebook` VARCHAR(191) NULL;
