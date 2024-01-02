-- AlterTable
ALTER TABLE `Applies` ADD COLUMN `status` ENUM('Waiting', 'Approved', 'Rejected') NOT NULL DEFAULT 'Waiting';
