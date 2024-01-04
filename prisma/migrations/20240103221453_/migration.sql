-- AlterTable
ALTER TABLE `Vacancies` ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Vacancies` ADD CONSTRAINT `Vacancies_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
