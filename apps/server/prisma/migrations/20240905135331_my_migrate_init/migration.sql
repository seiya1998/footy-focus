-- CreateTable
CREATE TABLE `r_user` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `gender` ENUM('MELE', 'FEMALE', 'OTHER') NOT NULL,
    `age` INTEGER NOT NULL,

    UNIQUE INDEX `r_user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_country` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `japanese_name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `flag_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_city` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `japanese_name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_venue` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_id` INTEGER NOT NULL,
    `city_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `japanese_name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `image_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_competition` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_id` INTEGER NOT NULL,
    `competition_id` INTEGER NOT NULL,
    `association` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `japanese_name` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `logo_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_team` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_id` INTEGER NOT NULL,
    `venue_id` INTEGER NOT NULL,
    `team_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `japanese_name` VARCHAR(191) NOT NULL,
    `code` VARCHAR(191) NOT NULL,
    `founded` INTEGER NOT NULL,
    `nationality` BOOLEAN NOT NULL,
    `logo_url` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `r_team_venue_id_key`(`venue_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_player` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `country_id` INTEGER NOT NULL,
    `player_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `japanese_first_name` VARCHAR(191) NOT NULL,
    `japanese_last_name` VARCHAR(191) NOT NULL,
    `age` INTEGER NOT NULL,
    `birth_date` DATETIME(3) NOT NULL,
    `height` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `photo_url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_season` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_team_competition_season` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `team_id` INTEGER NOT NULL,
    `competition_id` INTEGER NOT NULL,
    `season_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `r_team_player_season` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `season_id` INTEGER NOT NULL,
    `player_id` INTEGER NOT NULL,
    `team_competition_season_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `e_user_create` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `e_user_create_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `e_user_update` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `gender` ENUM('MELE', 'FEMALE', 'OTHER') NOT NULL,
    `age` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `e_user_update_user_id_key`(`user_id`),
    UNIQUE INDEX `e_user_update_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `e_user_delete` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `e_user_delete_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `e_competition_follow` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `competition_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `e_competition_unfollow` (
    `id` VARCHAR(191) NOT NULL,
    `competition_follow_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `e_competition_unfollow_competition_follow_id_key`(`competition_follow_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `e_team_follow` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `team_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `e_team_unfollow` (
    `id` VARCHAR(191) NOT NULL,
    `team_follow_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `e_team_unfollow_team_follow_id_key`(`team_follow_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `e_player_follow` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `player_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `e_player_unfollow` (
    `id` VARCHAR(191) NOT NULL,
    `player_follow_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `e_player_unfollow_player_follow_id_key`(`player_follow_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
ALTER TABLE `e_user_create` ADD CONSTRAINT `e_user_create_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `r_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_user_update` ADD CONSTRAINT `e_user_update_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `r_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_user_delete` ADD CONSTRAINT `e_user_delete_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `r_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_competition_follow` ADD CONSTRAINT `e_competition_follow_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `r_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_competition_follow` ADD CONSTRAINT `e_competition_follow_competition_id_fkey` FOREIGN KEY (`competition_id`) REFERENCES `r_competition`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_competition_unfollow` ADD CONSTRAINT `e_competition_unfollow_competition_follow_id_fkey` FOREIGN KEY (`competition_follow_id`) REFERENCES `e_competition_follow`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_team_follow` ADD CONSTRAINT `e_team_follow_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `r_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_team_follow` ADD CONSTRAINT `e_team_follow_team_id_fkey` FOREIGN KEY (`team_id`) REFERENCES `r_team`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_team_unfollow` ADD CONSTRAINT `e_team_unfollow_team_follow_id_fkey` FOREIGN KEY (`team_follow_id`) REFERENCES `e_team_follow`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_player_follow` ADD CONSTRAINT `e_player_follow_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `r_user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_player_follow` ADD CONSTRAINT `e_player_follow_player_id_fkey` FOREIGN KEY (`player_id`) REFERENCES `r_player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `e_player_unfollow` ADD CONSTRAINT `e_player_unfollow_player_follow_id_fkey` FOREIGN KEY (`player_follow_id`) REFERENCES `e_player_follow`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
