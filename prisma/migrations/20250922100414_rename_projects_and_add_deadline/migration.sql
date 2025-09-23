/*
  Warnings:

  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `project` DROP FOREIGN KEY `project_created_by_fkey`;

-- DropForeignKey
ALTER TABLE `tasks` DROP FOREIGN KEY `tasks_project_id_fkey`;

-- DropIndex
DROP INDEX `tasks_project_id_fkey` ON `tasks`;

-- AlterTable
ALTER TABLE `tasks` ADD COLUMN `deadline_at` DATETIME(3) NULL;

-- DropTable
DROP TABLE `project`;

-- CreateTable
CREATE TABLE `projects` (
    `project_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by` INTEGER NOT NULL,

    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `projects` ADD CONSTRAINT `projects_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `users`(`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_project_id_fkey` FOREIGN KEY (`project_id`) REFERENCES `projects`(`project_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
