/*
  Warnings:

  - You are about to drop the column `japanese_first_name` on the `r_player` table. All the data in the column will be lost.
  - You are about to drop the column `japanese_last_name` on the `r_player` table. All the data in the column will be lost.
  - You are about to drop the column `nationality` on the `r_team` table. All the data in the column will be lost.
  - Added the required column `national` to the `r_team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `r_competition` MODIFY `logo_url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `r_player` DROP COLUMN `japanese_first_name`,
    DROP COLUMN `japanese_last_name`,
    MODIFY `first_name` VARCHAR(191) NULL,
    MODIFY `last_name` VARCHAR(191) NULL,
    MODIFY `age` INTEGER NULL,
    MODIFY `birth_date` DATETIME(3) NULL,
    MODIFY `height` INTEGER NULL,
    MODIFY `weight` INTEGER NULL;

-- AlterTable
ALTER TABLE `r_team` DROP COLUMN `nationality`,
    ADD COLUMN `national` BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE `r_venue` MODIFY `address` VARCHAR(191) NULL;
