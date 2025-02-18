/*
  Warnings:

  - You are about to drop the column `Schedule` on the `establishment` table. All the data in the column will be lost.
  - Added the required column `image` to the `Establishment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schedule` to the `Establishment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stastus` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `startDate` on the `event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `endDate` on the `event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `birthday` on the `user` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE `establishment` DROP FOREIGN KEY `Establishment_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `establishment` DROP FOREIGN KEY `Establishment_locationId_fkey`;

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
ALTER TABLE `pointofinterest` DROP FOREIGN KEY `pointOfInterest_locationId_fkey`;

-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_travelId_fkey`;

-- DropForeignKey
ALTER TABLE `userhasitinerary` DROP FOREIGN KEY `UserHasItinerary_itineraryId_fkey`;

-- DropForeignKey
ALTER TABLE `userhasitinerary` DROP FOREIGN KEY `UserHasItinerary_userId_fkey`;

-- DropForeignKey
ALTER TABLE `userhasroute` DROP FOREIGN KEY `UserHasRoute_itineraryId_fkey`;

-- DropForeignKey
ALTER TABLE `userhasroute` DROP FOREIGN KEY `UserHasRoute_routeId_fkey`;

-- DropForeignKey
ALTER TABLE `userhasroute` DROP FOREIGN KEY `UserHasRoute_userId_fkey`;

-- AlterTable
ALTER TABLE `establishment` DROP COLUMN `Schedule`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `schedule` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `event` ADD COLUMN `stastus` ENUM('ACTIVO', 'INACTIVO') NOT NULL,
    DROP COLUMN `startDate`,
    ADD COLUMN `startDate` INTEGER NOT NULL,
    DROP COLUMN `endDate`,
    ADD COLUMN `endDate` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `birthday`,
    ADD COLUMN `birthday` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_travelId_fkey` FOREIGN KEY (`travelId`) REFERENCES `Travel`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pointOfInterest` ADD CONSTRAINT `pointOfInterest_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pointOfInterest` ADD CONSTRAINT `pointOfInterest_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Establishment` ADD CONSTRAINT `Establishment_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Establishment` ADD CONSTRAINT `Establishment_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Establishment` ADD CONSTRAINT `Establishment_promotionId_fkey` FOREIGN KEY (`promotionId`) REFERENCES `Promotion`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHasItinerary` ADD CONSTRAINT `UserHasItinerary_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHasItinerary` ADD CONSTRAINT `UserHasItinerary_itineraryId_fkey` FOREIGN KEY (`itineraryId`) REFERENCES `Itinerary`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHasRoute` ADD CONSTRAINT `UserHasRoute_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHasRoute` ADD CONSTRAINT `UserHasRoute_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserHasRoute` ADD CONSTRAINT `UserHasRoute_itineraryId_fkey` FOREIGN KEY (`itineraryId`) REFERENCES `Itinerary`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItineraryHasRoute` ADD CONSTRAINT `ItineraryHasRoute_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Route`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItineraryHasRoute` ADD CONSTRAINT `ItineraryHasRoute_itineraryId_fkey` FOREIGN KEY (`itineraryId`) REFERENCES `Itinerary`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItineraryHasEstablishment` ADD CONSTRAINT `ItineraryHasEstablishment_itineraryId_fkey` FOREIGN KEY (`itineraryId`) REFERENCES `Itinerary`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ItineraryHasEstablishment` ADD CONSTRAINT `ItineraryHasEstablishment_establishmentId_fkey` FOREIGN KEY (`establishmentId`) REFERENCES `Establishment`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
