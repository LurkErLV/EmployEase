/*
  Warnings:

  - Added the required column `company` to the `Vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyLogo` to the `Vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `education` to the `Vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `experience` to the `Vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jobLevel` to the `Vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `maxSalary` to the `Vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `minSalary` to the `Vacancies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workSchedule` to the `Vacancies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Vacancies` ADD COLUMN `company` VARCHAR(191) NOT NULL,
    ADD COLUMN `companyLogo` VARCHAR(191) NOT NULL,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `education` VARCHAR(191) NOT NULL,
    ADD COLUMN `experience` VARCHAR(191) NOT NULL,
    ADD COLUMN `jobLevel` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `maxSalary` INTEGER NOT NULL,
    ADD COLUMN `minSalary` INTEGER NOT NULL,
    ADD COLUMN `workSchedule` ENUM('FULLTIME', 'PARTTIME', 'INTERNSHIP') NOT NULL;
