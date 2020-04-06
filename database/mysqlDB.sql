-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema atiadmin_game_space
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema atiadmin_game_space
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `atiadmin_game_space` DEFAULT CHARACTER SET utf8 ;
USE `atiadmin_game_space` ;

-- -----------------------------------------------------
-- Table `atiadmin_game_space`.`Users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `atiadmin_game_space`.`Users` ;

CREATE TABLE IF NOT EXISTS `atiadmin_game_space`.`Users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `id_mongo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_mongo_UNIQUE` (`id_mongo` ))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `atiadmin_game_space`.`Orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `atiadmin_game_space`.`Orders` ;

CREATE TABLE IF NOT EXISTS `atiadmin_game_space`.`Orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `total` DOUBLE NULL,
  `Users_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Orders_Users1_idx` (`Users_id` ),
  CONSTRAINT `fk_Orders_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `atiadmin_game_space`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `atiadmin_game_space`.`Games`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `atiadmin_game_space`.`Games` ;

CREATE TABLE IF NOT EXISTS `atiadmin_game_space`.`Games` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `id_mongo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_mongo_UNIQUE` (`id_mongo` ))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `atiadmin_game_space`.`Orders_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `atiadmin_game_space`.`Orders_details` ;

CREATE TABLE IF NOT EXISTS `atiadmin_game_space`.`Orders_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Orders_id` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `quantity` INT NOT NULL,
  `Games_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Orders_details_Orders1_idx` (`Orders_id` ),
  INDEX `fk_Orders_details_Games1_idx` (`Games_id` ),
  CONSTRAINT `fk_Orders_details_Orders1`
    FOREIGN KEY (`Orders_id`)
    REFERENCES `atiadmin_game_space`.`Orders` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Orders_details_Games1`
    FOREIGN KEY (`Games_id`)
    REFERENCES `atiadmin_game_space`.`Games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `atiadmin_game_space`.`Carts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `atiadmin_game_space`.`Carts` ;

CREATE TABLE IF NOT EXISTS `atiadmin_game_space`.`Carts` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `Users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Users_id`),
  INDEX `fk_Carts_Users1_idx` (`Users_id` ),
  CONSTRAINT `fk_Carts_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `atiadmin_game_space`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `atiadmin_game_space`.`Carts_details`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `atiadmin_game_space`.`Carts_details` ;

CREATE TABLE IF NOT EXISTS `atiadmin_game_space`.`Carts_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `Carts_id` INT NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `Games_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Carts_details_Carts_idx` (`Carts_id` ),
  INDEX `fk_Carts_details_Games1_idx` (`Games_id` ),
  CONSTRAINT `fk_Carts_details_Carts`
    FOREIGN KEY (`Carts_id`)
    REFERENCES `atiadmin_game_space`.`Carts` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Carts_details_Games1`
    FOREIGN KEY (`Games_id`)
    REFERENCES `atiadmin_game_space`.`Games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `atiadmin_game_space`.`Reviews`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `atiadmin_game_space`.`Reviews` ;

CREATE TABLE IF NOT EXISTS `atiadmin_game_space`.`Reviews` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `rank` INT NOT NULL,
  `coment` VARCHAR(45) NULL,
  `Users_id` INT NOT NULL,
  `Games_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Reviews_Users1_idx` (`Users_id` ),
  INDEX `fk_Reviews_Games1_idx` (`Games_id` ),
  CONSTRAINT `fk_Reviews_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `atiadmin_game_space`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Reviews_Games1`
    FOREIGN KEY (`Games_id`)
    REFERENCES `atiadmin_game_space`.`Games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `atiadmin_game_space`.`Homepage_images`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `atiadmin_game_space`.`Homepage_images` ;

CREATE TABLE IF NOT EXISTS `atiadmin_game_space`.`Homepage_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `image` VARCHAR(45) NULL,
  `text` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `atiadmin_game_space`.`Wishlists`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `atiadmin_game_space`.`Wishlists` ;

CREATE TABLE IF NOT EXISTS `atiadmin_game_space`.`Wishlists` (
  `id` INT NOT NULL,
  `wishlistscol` VARCHAR(45) NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  `Games_id` INT NOT NULL,
  `Users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `Users_id`),
  INDEX `fk_Wishlists_Games1_idx` (`Games_id` ),
  INDEX `fk_Wishlists_Users1_idx` (`Users_id` ),
  CONSTRAINT `fk_Wishlists_Games1`
    FOREIGN KEY (`Games_id`)
    REFERENCES `atiadmin_game_space`.`Games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Wishlists_Users1`
    FOREIGN KEY (`Users_id`)
    REFERENCES `atiadmin_game_space`.`Users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
