/*
  Warnings:

  - Added the required column `application` to the `User` table without page default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `Role` ENUM('Admin', 'Employee', 'Employer') NOT NULL DEFAULT 'Employee',
    ADD COLUMN `applies` VARCHAR(191) NOT NULL;
