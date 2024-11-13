/*
  Warnings:

  - The values [PLAYA_RESORT] on the enum `Establishment_type` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `typeUserId` on the `user` table. All the data in the column will be lost.
  - You are about to alter the column `birthday` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `DateTime(3)`.
  - You are about to drop the `typeuser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Travel` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `establishment` DROP FOREIGN KEY `Establishment_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `establishment` DROP FOREIGN KEY `Establishment_promotionId_fkey`;

-- DropForeignKey
ALTER TABLE `itineraryhasestablishment` DROP FOREIGN KEY `ItineraryHasEstablishment_establishmentId_fkey`;

-- DropForeignKey
ALTER TABLE `itineraryhasestablishment` DROP FOREIGN KEY `ItineraryHasEstablishment_itineraryId_fkey`;

-- DropForeignKey
ALTER TABLE `itineraryhasroute` DROP FOREIGN KEY `ItineraryHasRoute_itineraryId_fkey`;

-- DropForeignKey
ALTER TABLE `itineraryhasroute` DROP FOREIGN KEY `ItineraryHasRoute_routeId_fkey`;

-- DropForeignKey
ALTER TABLE `pointofinterest` DROP FOREIGN KEY `pointOfInterest_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_travelId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_typeUserId_fkey`;

-- DropForeignKey
ALTER TABLE `userhasroute` DROP FOREIGN KEY `UserHasRoute_routeId_fkey`;

-- AlterTable
ALTER TABLE `establishment` MODIFY `eventId` INTEGER NULL,
    MODIFY `promotionId` INTEGER NULL,
    MODIFY `type` ENUM('RESTAURANTE', 'HOTEL', 'SPA', 'CENTRO_COMERCIAL', 'MUSEO', 'BAR_CLUB', 'GALERIA_ARTE', 'CINE', 'PARQUE_TEMATICO', 'RESORT') NOT NULL;

-- AlterTable
ALTER TABLE `itineraryhasestablishment` MODIFY `itineraryId` INTEGER NULL,
    MODIFY `establishmentId` INTEGER NULL;

-- AlterTable
ALTER TABLE `itineraryhasroute` MODIFY `routeId` INTEGER NULL,
    MODIFY `itineraryId` INTEGER NULL;

-- AlterTable
ALTER TABLE `pointofinterest` MODIFY `eventId` INTEGER NULL;

-- AlterTable
ALTER TABLE `travel` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `typeUserId`,
    ADD COLUMN `type` ENUM('COMMON', 'ADMIN') NOT NULL DEFAULT 'COMMON',
    MODIFY `birthday` DATETIME(3) NOT NULL,
    MODIFY `travelId` INTEGER NULL;

-- AlterTable
ALTER TABLE `userhasroute` MODIFY `routeId` INTEGER NULL;

-- DropTable
DROP TABLE `typeuser`;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_travelId_fkey` FOREIGN KEY (`travelId`) REFERENCES `Travel`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pointOfInterest` ADD CONSTRAINT `pointOfInterest_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Establishment` ADD CONSTRAINT `Establishment_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Establishment` ADD CONSTRAINT `Establishment_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHasRoute` ADD CONSTRAINT `UserHasRoute_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItineraryHasRoute` ADD CONSTRAINT `ItineraryHasRoute_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItineraryHasRoute` ADD CONSTRAINT `ItineraryHasRoute_itineraryId_fkey` FOREIGN KEY (`itineraryId`) REFERENCES `Itinerary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItineraryHasEstablishment` ADD CONSTRAINT `ItineraryHasEstablishment_itineraryId_fkey` FOREIGN KEY (`itineraryId`) REFERENCES `Itinerary`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItineraryHasEstablishment` ADD CONSTRAINT `ItineraryHasEstablishment_establishmentId_fkey` FOREIGN KEY (`establishmentId`) REFERENCES `Establishment`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
