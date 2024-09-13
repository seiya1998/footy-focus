/*
  Warnings:

  - Added the required column `is_major` to the `r_country` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `r_country` ADD COLUMN `is_major` BOOLEAN NOT NULL;
