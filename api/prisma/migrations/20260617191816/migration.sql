/*
  Warnings:

  - You are about to drop the column `descricao` on the `aula` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `aula` DROP COLUMN `descricao`,
    ADD COLUMN `conteudo` VARCHAR(191) NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE `Professor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_ProfessorToTurma` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ProfessorToTurma_AB_unique`(`A`, `B`),
    INDEX `_ProfessorToTurma_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ProfessorToTurma` ADD CONSTRAINT `_ProfessorToTurma_A_fkey` FOREIGN KEY (`A`) REFERENCES `Professor`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ProfessorToTurma` ADD CONSTRAINT `_ProfessorToTurma_B_fkey` FOREIGN KEY (`B`) REFERENCES `Turma`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
