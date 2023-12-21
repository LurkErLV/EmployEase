-- DropForeignKey
ALTER TABLE `Vacancies` DROP FOREIGN KEY `Vacancies_authorId_fkey`;

-- AlterTable
ALTER TABLE `Vacancies` MODIFY `companyLogo` VARCHAR(191) NULL;
