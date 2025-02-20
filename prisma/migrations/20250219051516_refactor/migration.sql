/*
  Warnings:

  - You are about to drop the column `idFacebook` on the `establishment` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `establishment` table. All the data in the column will be lost.
  - The values [RESTAURANTE,HOTEL,SPA,CENTRO_COMERCIAL,MUSEO,BAR_CLUB,GALERIA_ARTE,PARQUE_TEMATICO,RESORT] on the enum `Business_category` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `urlImage` to the `Establishment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `establishment` DROP COLUMN `idFacebook`,
    DROP COLUMN `image`,
    ADD COLUMN `urlImage` VARCHAR(191) NOT NULL,
    MODIFY `type` ENUM('HOSPEDAJE', 'GASTRONOMIA', 'EVENTOS', 'TURISMO', 'ITINERARIOS', 'CINE', 'OTRO') NOT NULL;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `genre` ENUM('MASCULINO', 'FEMENINO', 'NO_DEFINIDO') NULL,
    ADD COLUMN `image` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Content` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('TURISMO', 'EVENTOS', 'GASTRONOMIA', 'HOSPEDAJE') NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `url_logo` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Business` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `url_logo` VARCHAR(191) NULL,
    `category` ENUM('HOSPEDAJE', 'GASTRONOMIA', 'EVENTOS', 'TURISMO', 'ITINERARIOS', 'CINE', 'OTRO') NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `web_site` VARCHAR(191) NULL,
    `social_networks` JSON NULL,
    `outstanding` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
