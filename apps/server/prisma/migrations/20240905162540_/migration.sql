/*
  Warnings:

  - The primary key for the `r_city` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `r_competition` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `r_country` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `r_player` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `r_season` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `r_team` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `r_team_competition_season` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `r_team_player_season` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `r_venue` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `e_competition_follow` DROP FOREIGN KEY `e_competition_follow_competition_id_fkey`;

-- DropForeignKey
ALTER TABLE `e_player_follow` DROP FOREIGN KEY `e_player_follow_player_id_fkey`;

-- DropForeignKey
ALTER TABLE `e_team_follow` DROP FOREIGN KEY `e_team_follow_team_id_fkey`;

-- DropForeignKey
ALTER TABLE `r_city` DROP FOREIGN KEY `r_city_country_id_fkey`;

-- DropForeignKey
ALTER TABLE `r_competition` DROP FOREIGN KEY `r_competition_country_id_fkey`;

-- DropForeignKey
ALTER TABLE `r_player` DROP FOREIGN KEY `r_player_country_id_fkey`;

-- DropForeignKey
ALTER TABLE `r_team` DROP FOREIGN KEY `r_team_country_id_fkey`;

-- DropForeignKey
ALTER TABLE `r_team` DROP FOREIGN KEY `r_team_venue_id_fkey`;

-- DropForeignKey
ALTER TABLE `r_team_competition_season` DROP FOREIGN KEY `r_team_competition_season_competition_id_fkey`;

-- DropForeignKey
ALTER TABLE `r_team_competition_season` DROP FOREIGN KEY `r_team_competition_season_season_id_fkey`;

-- DropForeignKey
ALTER TABLE `r_team_competition_season` DROP FOREIGN KEY `r_team_competition_season_team_id_fkey`;

-- DropForeignKey
ALTER TABLE `r_team_player_season` DROP FOREIGN KEY `r_team_player_season_player_id_fkey`;

-- DropForeignKey
ALTER TABLE `r_team_player_season` DROP FOREIGN KEY `r_team_player_season_season_id_fkey`;

-- DropForeignKey
ALTER TABLE `r_team_player_season` DROP FOREIGN KEY `r_team_player_season_team_competition_season_id_fkey`;

-- DropForeignKey
ALTER TABLE `r_venue` DROP FOREIGN KEY `r_venue_city_id_fkey`;

-- DropForeignKey
ALTER TABLE `r_venue` DROP FOREIGN KEY `r_venue_country_id_fkey`;

-- AlterTable
ALTER TABLE `e_competition_follow` MODIFY `competition_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `e_player_follow` MODIFY `player_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `e_team_follow` MODIFY `team_id` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `r_city` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `country_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `r_competition` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `country_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `r_country` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `r_player` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `country_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `r_season` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `r_team` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `country_id` VARCHAR(191) NOT NULL,
    MODIFY `venue_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `r_team_competition_season` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `team_id` VARCHAR(191) NOT NULL,
    MODIFY `competition_id` VARCHAR(191) NOT NULL,
    MODIFY `season_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `r_team_player_season` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `season_id` VARCHAR(191) NOT NULL,
    MODIFY `player_id` VARCHAR(191) NOT NULL,
    MODIFY `team_competition_season_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `r_venue` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `country_id` VARCHAR(191) NOT NULL,
    MODIFY `city_id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `r_city` ADD CONSTRAINT `r_city_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `r_country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_venue` ADD CONSTRAINT `r_venue_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `r_country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_venue` ADD CONSTRAINT `r_venue_city_id_fkey` FOREIGN KEY (`city_id`) REFERENCES `r_city`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_competition` ADD CONSTRAINT `r_competition_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `r_country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_team` ADD CONSTRAINT `r_team_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `r_country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_team` ADD CONSTRAINT `r_team_venue_id_fkey` FOREIGN KEY (`venue_id`) REFERENCES `r_venue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_player` ADD CONSTRAINT `r_player_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `r_country`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_team_competition_season` ADD CONSTRAINT `r_team_competition_season_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `r_team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_team_competition_season` ADD CONSTRAINT `r_team_competition_season_competition_id_fkey` FOREIGN KEY (`competition_id`) REFERENCES `r_competition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_team_competition_season` ADD CONSTRAINT `r_team_competition_season_season_id_fkey` FOREIGN KEY (`season_id`) REFERENCES `r_season`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_team_player_season` ADD CONSTRAINT `r_team_player_season_team_competition_season_id_fkey` FOREIGN KEY (`team_competition_season_id`) REFERENCES `r_team_competition_season`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_team_player_season` ADD CONSTRAINT `r_team_player_season_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `r_player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `r_team_player_season` ADD CONSTRAINT `r_team_player_season_season_id_fkey` FOREIGN KEY (`season_id`) REFERENCES `r_season`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_competition_follow` ADD CONSTRAINT `e_competition_follow_competition_id_fkey` FOREIGN KEY (`competition_id`) REFERENCES `r_competition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_team_follow` ADD CONSTRAINT `e_team_follow_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `r_team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_player_follow` ADD CONSTRAINT `e_player_follow_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `r_player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
