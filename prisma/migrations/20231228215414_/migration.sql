/*
  Warnings:

  - You are about to drop the column `education` on the `Vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `experience` on the `Vacancies` table. All the data in the column will be lost.
  - You are about to drop the column `jobLevel` on the `Vacancies` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Vacancies` DROP COLUMN `education`,
    DROP COLUMN `experience`,
    DROP COLUMN `jobLevel`;
