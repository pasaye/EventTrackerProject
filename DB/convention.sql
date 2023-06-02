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
-- Table `convention`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `convention` ;

CREATE TABLE IF NOT EXISTS `convention` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(400) NOT NULL,
  `description` TEXT NOT NULL,
  `date` DATE NULL,
  `time` TIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


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

SET SQL_MODE = '';
DROP USER IF EXISTS fanboy@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'fanboy'@'localhost' IDENTIFIED BY '1234';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'fanboy'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `convention`
-- -----------------------------------------------------
START TRANSACTION;
USE `conventiondb`;
INSERT INTO `convention` (`id`, `name`, `description`, `date`, `time`) VALUES (1, 'San Diego Comic-con', 'nerd heave', NULL, NULL);

COMMIT;

