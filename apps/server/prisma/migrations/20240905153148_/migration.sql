/*
  Warnings:

  - The values [MELE] on the enum `e_user_update_gender` will be removed. If these variants are still used in the database, this will fail.
  - The values [MELE] on the enum `e_user_update_gender` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `e_user_update` MODIFY `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL;

-- AlterTable
ALTER TABLE `r_user` MODIFY `gender` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL;
