/*
  Warnings:

  - You are about to drop the `Applies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Vacancies` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Applies` DROP FOREIGN KEY `Applies_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Applies` DROP FOREIGN KEY `Applies_vacancyId_fkey`;

-- DropForeignKey
ALTER TABLE `Vacancies` DROP FOREIGN KEY `Vacancies_authorId_fkey`;

-- DropTable
DROP TABLE `Applies`;

-- DropTable
DROP TABLE `Vacancies`;

-- CreateTable
CREATE TABLE `Vacancy` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NOT NULL,
    `companyLogo` VARCHAR(191) NULL,
    `workSchedule` ENUM('FULLTIME', 'PARTTIME', 'INTERNSHIP') NOT NULL,
    `minSalary` INTEGER NOT NULL,
    `maxSalary` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `description` VARCHAR(10000) NOT NULL,
    `authorId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Appllication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vacancyId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,
    `status` ENUM('Waiting', 'Approved', 'Rejected') NOT NULL DEFAULT 'Waiting',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vacancy` ADD CONSTRAINT `Vacancy_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appllication` ADD CONSTRAINT `Appllication_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Appllication` ADD CONSTRAINT `Appllication_vacancyId_fkey` FOREIGN KEY (`vacancyId`) REFERENCES `Vacancy`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
