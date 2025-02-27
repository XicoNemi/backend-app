/*
  Warnings:

  - You are about to alter the column `lat` on the `location` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(65,30)`.
  - You are about to alter the column `lng` on the `location` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(65,30)`.
  - You are about to drop the column `itineraryId` on the `userhasroute` table. All the data in the column will be lost.
  - You are about to drop the `business` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `content` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `establishment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itinerary` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itineraryhasestablishment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itineraryhasroute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pointofinterest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `promotion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `route` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `travel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userhasitinerary` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `routeId` on table `userhasroute` required. This step will fail if there are existing NULL values in that column.

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
ALTER TABLE `location` MODIFY `lat` DECIMAL(65, 30) NOT NULL,
    MODIFY `lng` DECIMAL(65, 30) NOT NULL;

-- AlterTable
ALTER TABLE `userhasroute` DROP COLUMN `itineraryId`,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `routeId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `business`;

-- DropTable
DROP TABLE `content`;

-- DropTable
DROP TABLE `establishment`;

-- DropTable
DROP TABLE `event`;

-- DropTable
DROP TABLE `itinerary`;

-- DropTable
DROP TABLE `itineraryhasestablishment`;

-- DropTable
DROP TABLE `itineraryhasroute`;

-- DropTable
DROP TABLE `pointofinterest`;

-- DropTable
DROP TABLE `promotion`;

-- DropTable
DROP TABLE `route`;

-- DropTable
DROP TABLE `travel`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `userhasitinerary`;

-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subscriptionId` INTEGER NULL,
    `facebookId` VARCHAR(191) NULL,
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `birthday` INTEGER NOT NULL,
    `gender` ENUM('Masculino', 'Femenino', 'Otro') NULL,
    `url_image` VARCHAR(191) NULL,
    `type` ENUM('Common', 'BusinessOwner', 'SuperAdmin') NOT NULL DEFAULT 'Common',
    `Status` BOOLEAN NOT NULL DEFAULT false,
    `token` VARCHAR(191) NULL,

    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `startDate` INTEGER NOT NULL,
    `endDate` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,
    `type` ENUM('General', 'Cultural', 'Gastronomico', 'Aventura', 'Relax', 'Familiar', 'Otro') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pointsOfInterest` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `url_image` VARCHAR(191) NOT NULL,
    `locationId` INTEGER NOT NULL,
    `eventId` INTEGER NULL,
    `businessId` INTEGER NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Promotions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `businessId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Itineraries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `startDate` INTEGER NOT NULL,
    `endDate` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Routes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ownerId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `stravaData` JSON NULL,
    `distance` DOUBLE NULL,
    `time` INTEGER NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Businesses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ownerId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `url_image` VARCHAR(191) NULL,
    `category` ENUM('Hospedaje', 'Gastronomia', 'Eventos', 'Turismo', 'Itinerarios', 'Cine', 'Otro') NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `tel` VARCHAR(191) NOT NULL,
    `web_site` VARCHAR(191) NULL,
    `social_networks` JSON NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `features` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscriptions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `planId` INTEGER NOT NULL,
    `startDate` INTEGER NOT NULL,
    `endDate` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reviews` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `businessId` INTEGER NULL,
    `eventId` INTEGER NULL,
    `rating` DECIMAL(2, 1) NOT NULL,
    `comment` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itineraryHasEvent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `itineraryId` INTEGER NOT NULL,
    `eventId` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `routeHasPoint` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `routeId` INTEGER NOT NULL,
    `pointId` INTEGER NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `pointsOfInterest` ADD CONSTRAINT `pointsOfInterest_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pointsOfInterest` ADD CONSTRAINT `pointsOfInterest_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pointsOfInterest` ADD CONSTRAINT `pointsOfInterest_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Businesses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Promotions` ADD CONSTRAINT `Promotions_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Businesses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Itineraries` ADD CONSTRAINT `Itineraries_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Routes` ADD CONSTRAINT `Routes_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Businesses` ADD CONSTRAINT `Businesses_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `subscriptions` ADD CONSTRAINT `subscriptions_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `plans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_businessId_fkey` FOREIGN KEY (`businessId`) REFERENCES `Businesses`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reviews` ADD CONSTRAINT `reviews_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itineraryHasEvent` ADD CONSTRAINT `itineraryHasEvent_itineraryId_fkey` FOREIGN KEY (`itineraryId`) REFERENCES `Itineraries`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itineraryHasEvent` ADD CONSTRAINT `itineraryHasEvent_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Events`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userHasRoute` ADD CONSTRAINT `userHasRoute_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userHasRoute` ADD CONSTRAINT `userHasRoute_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Routes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `routeHasPoint` ADD CONSTRAINT `routeHasPoint_routeId_fkey` FOREIGN KEY (`routeId`) REFERENCES `Routes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `routeHasPoint` ADD CONSTRAINT `routeHasPoint_pointId_fkey` FOREIGN KEY (`pointId`) REFERENCES `pointsOfInterest`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
