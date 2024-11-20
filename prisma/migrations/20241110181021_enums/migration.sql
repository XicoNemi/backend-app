/*
  Warnings:

  - Added the required column `type` to the `Establishment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Itinerary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `establishment` ADD COLUMN `type` ENUM('RESTAURANTE', 'HOTEL', 'SPA', 'CENTRO_COMERCIAL', 'MUSEO', 'BAR_CLUB', 'GALERIA_ARTE', 'CINE', 'PARQUE_TEMATICO', 'PLAYA_RESORT') NOT NULL;

-- AlterTable
ALTER TABLE `itinerary` ADD COLUMN `type` ENUM('CULTURAL', 'GASTRONOMICO', 'ADVENTURA', 'RELAX', 'FAMILIAR') NOT NULL;
