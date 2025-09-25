/*
  Warnings:

  - You are about to drop the column `is_completed` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `difficulty` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tasks` DROP COLUMN `is_completed`,
    ADD COLUMN `difficulty` ENUM('LOW', 'MEDIUM', 'HIGH') NOT NULL,
    ADD COLUMN `status` ENUM('PENDING', 'ACTIVE', 'COMPLETED') NOT NULL DEFAULT 'PENDING';
