-- AddForeignKey
ALTER TABLE `Applies` ADD CONSTRAINT `Applies_vacancyId_fkey` FOREIGN KEY (`vacancyId`) REFERENCES `Vacancies`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
