/*
  Warnings:

  - You are about to drop the column `status` on the `order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `order` DROP COLUMN `status`,
    ADD COLUMN `paymentMethod` ENUM('CASH', 'QRIS') NOT NULL DEFAULT 'CASH',
    ADD COLUMN `paymentProof` VARCHAR(191) NULL,
    ADD COLUMN `paymentStatus` ENUM('PENDING', 'WAITING_CONFIRMATION', 'PAID', 'REJECTED') NOT NULL DEFAULT 'PENDING';
