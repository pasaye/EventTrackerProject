-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema conventiondb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `conventiondb` ;

-- -----------------------------------------------------
-- Schema conventiondb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `conventiondb` DEFAULT CHARACTER SET utf8 ;
USE `conventiondb` ;

-- -----------------------------------------------------
-- Table `category`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `category` ;

CREATE TABLE IF NOT EXISTS `category` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `location` ;

CREATE TABLE IF NOT EXISTS `location` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `state` VARCHAR(100) NOT NULL,
  `city` VARCHAR(200) NOT NULL,
  `address` TEXT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `image`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `image` ;

CREATE TABLE IF NOT EXISTS `image` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NULL,
  `image_url` VARCHAR(2000) NULL,
  `picture` BIGINT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `convention`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `convention` ;

CREATE TABLE IF NOT EXISTS `convention` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(400) NOT NULL,
  `description` TEXT NOT NULL,
  `date` DATE NULL,
  `time` TIME NULL,
  `category_id` INT NOT NULL,
  `location_id` INT NOT NULL,
  `image_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_convention_category1_idx` (`category_id` ASC),
  INDEX `fk_convention_location1_idx` (`location_id` ASC),
  INDEX `fk_convention_image1_idx` (`image_id` ASC),
  CONSTRAINT `fk_convention_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_convention_location1`
    FOREIGN KEY (`location_id`)
    REFERENCES `location` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_convention_image1`
    FOREIGN KEY (`image_id`)
    REFERENCES `image` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS fanboy@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'fanboy'@'localhost' IDENTIFIED BY '1234';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'fanboy'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `category`
-- -----------------------------------------------------
START TRANSACTION;
USE `conventiondb`;
INSERT INTO `category` (`id`, `name`) VALUES (1, 'Comic Con');
INSERT INTO `category` (`id`, `name`) VALUES (2, 'Anime Con');
INSERT INTO `category` (`id`, `name`) VALUES (3, 'Gaming Con');

COMMIT;


-- -----------------------------------------------------
-- Data for table `location`
-- -----------------------------------------------------
START TRANSACTION;
USE `conventiondb`;
INSERT INTO `location` (`id`, `state`, `city`, `address`) VALUES (1, 'California', 'San Diego', '111 Harbor Dr, San Diego, CA 92101');

COMMIT;


-- -----------------------------------------------------
-- Data for table `image`
-- -----------------------------------------------------
START TRANSACTION;
USE `conventiondb`;
INSERT INTO `image` (`id`, `name`, `image_url`, `picture`) VALUES (1, 'My First Comic con', 'https://www.gaytravel4u.com/wp-content/uploads/2021/03/Comic-Con-San-Diego-3.jpg', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `convention`
-- -----------------------------------------------------
START TRANSACTION;
USE `conventiondb`;
INSERT INTO `convention` (`id`, `name`, `description`, `date`, `time`, `category_id`, `location_id`, `image_id`) VALUES (1, 'San Diego Comic-con', 'nerd heave', '2023-07-19', '08:00:00', 1, 1, 1);

COMMIT;

