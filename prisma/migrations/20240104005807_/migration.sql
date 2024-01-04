/*
  Warnings:

  - You are about to drop the `Appllication` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Appllication` DROP FOREIGN KEY `Appllication_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Appllication` DROP FOREIGN KEY `Appllication_vacancyId_fkey`;

-- DropTable
DROP TABLE `Appllication`;

-- CreateTable
CREATE TABLE `Application` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vacancyId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `status` ENUM('Waiting', 'Approved', 'Rejected') NOT NULL DEFAULT 'Waiting',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Application` ADD CONSTRAINT `Application_vacancyId_fkey` FOREIGN KEY (`vacancyId`) REFERENCES `Vacancy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
