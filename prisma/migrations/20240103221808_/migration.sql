/*
  Warnings:

  - You are about to drop the column `userId` on the `Vacancies` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Vacancies` DROP FOREIGN KEY `Vacancies_userId_fkey`;

-- AlterTable
ALTER TABLE `Vacancies` DROP COLUMN `userId`;

-- AddForeignKey
ALTER TABLE `Vacancies` ADD CONSTRAINT `Vacancies_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
