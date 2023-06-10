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
  PRIMARY KEY (`id`),
  INDEX `fk_convention_category1_idx` (`category_id` ASC),
  CONSTRAINT `fk_convention_category1`
    FOREIGN KEY (`category_id`)
    REFERENCES `category` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  `convention_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_image_convention1_idx` (`convention_id` ASC),
  CONSTRAINT `fk_image_convention1`
    FOREIGN KEY (`convention_id`)
    REFERENCES `convention` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
-- Table `convention_has_location`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `convention_has_location` ;

CREATE TABLE IF NOT EXISTS `convention_has_location` (
  `convention_id` INT NOT NULL,
  `location_id` INT NOT NULL,
  PRIMARY KEY (`convention_id`, `location_id`),
  INDEX `fk_convention_has_location_location1_idx` (`location_id` ASC),
  INDEX `fk_convention_has_location_convention1_idx` (`convention_id` ASC),
  CONSTRAINT `fk_convention_has_location_convention1`
    FOREIGN KEY (`convention_id`)
    REFERENCES `convention` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_convention_has_location_location1`
    FOREIGN KEY (`location_id`)
    REFERENCES `location` (`id`)
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
-- Data for table `convention`
-- -----------------------------------------------------
START TRANSACTION;
USE `conventiondb`;
INSERT INTO `convention` (`id`, `name`, `description`, `date`, `time`, `category_id`) VALUES (1, 'San Diego Comic-con', 'Nerd heaven, The biggest Comic con event in the country', '2023-07-19', '08:00:00', 1);
INSERT INTO `convention` (`id`, `name`, `description`, `date`, `time`, `category_id`) VALUES (2, 'YumiCon', 'celebrate anime culture with your fellow anime community! You can expect to see SPECIAL GUESTS, vendors, artists, performances, panels, video game tournaments and so much more!', '2023-06-02', '09:30:00', 2);
INSERT INTO `convention` (`id`, `name`, `description`, `date`, `time`, `category_id`) VALUES (3, 'QuakeCon', 'The iconic fan gathering welcomes back its dedicated community with a reimagined and upgraded BYOC (Bring-Your-Own-Computer) LAN party for four days of round-the-clock gaming, a host of fun activities, and meetups for old and new friends. ', '2023-08-10', '08:00:00', 3);
INSERT INTO `convention` (`id`, `name`, `description`, `date`, `time`, `category_id`) VALUES (4, 'Kawacon', 'Kawacon is dedicated to bringing out the best of Otaku & Gaming culture in our great city of San Antonio by helping to support and grow our community.', '2023-02-25', '09:00:00', 2);
INSERT INTO `convention` (`id`, `name`, `description`, `date`, `time`, `category_id`) VALUES (5, 'Riverwalk Anime', 'The Riverwalk Anime festival is a chance for anime fans to meet and greet some of their favorite anime stars, such as Sarah Weidenheft, Ryan Colt Levy, and Reagan Murdock.', '2023-04-15', '09:10:00', 2);
INSERT INTO `convention` (`id`, `name`, `description`, `date`, `time`, `category_id`) VALUES (6, 'San Japan', 'San Japan is the Largest Anime & Gaming Convention in the South Texas Region.', '2023-09-01', '8:45:00', 2);

COMMIT;


-- -----------------------------------------------------
-- Data for table `image`
-- -----------------------------------------------------
START TRANSACTION;
USE `conventiondb`;
INSERT INTO `image` (`id`, `name`, `image_url`, `picture`, `convention_id`) VALUES (1, 'My First Comic con', 'https://www.gaytravel4u.com/wp-content/uploads/2021/03/Comic-Con-San-Diego-3.jpg', NULL, 1);
INSERT INTO `image` (`id`, `name`, `image_url`, `picture`, `convention_id`) VALUES (2, 'So many different anime', 'https://www.yumicon.com/uploads/b/0ecee6f3862b3dafa3c73de6c94bf8c86dba0d873b0273b7cfdeccdcb0025151/2022-01-26_14-26-06_1643228824.jpg?width=2400&optimize=medium', NULL, 2);
INSERT INTO `image` (`id`, `name`, `image_url`, `picture`, `convention_id`) VALUES (3, 'Awesome Pc gaming', 'https://www.nme.com/wp-content/uploads/2022/04/quakecon-bethesda@2000x1270.jpg', NULL, 3);
INSERT INTO `image` (`id`, `name`, `image_url`, `picture`, `convention_id`) VALUES (4, 'Some great One Piece cosplay', 'https://6amcity.brightspotcdn.com/dims4/default/e6b8965/2147483647/strip/true/crop/1080x608+0+101/resize/1000x563!/quality/90/?url=https%3A%2F%2Fk1-prod-sixam-city.s3.amazonaws.com%2Fbrightspot%2F38%2F5e%2F6b878d9f41aa911c27fd08f22417%2F321562981-539032514936848-8557295849734043227-n.jpg', NULL, 4);
INSERT INTO `image` (`id`, `name`, `image_url`, `picture`, `convention_id`) VALUES (5, 'Riverwalk anime was fun!!', 'https://s.hdnux.com/photos/75/33/47/16103925/6/rawImage.jpg', NULL, 5);
INSERT INTO `image` (`id`, `name`, `image_url`, `picture`, `convention_id`) VALUES (6, 'Totally worth the trip', 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/58133482-bbc4-4185-ade8-8ed5fc85e8d0/daac7wn-4d0f3bfe-8dcb-4370-89fa-c0f3b0737bd9.jpg/v1/fill/w_549,h_350,q_70,strp/kawacon_2016___resident_evil_group_by_valeriealtaira_daac7wn-350t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjUzIiwicGF0aCI6IlwvZlwvNTgxMzM0ODItYmJjNC00MTg1LWFkZTgtOGVkNWZjODVlOGQwXC9kYWFjN3duLTRkMGYzYmZlLThkY2ItNDM3MC04OWZhLWMwZjNiMDczN2JkOS5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.7poKa-tQv7WcB7Wc5dRsQrdy8nnmG18IqTcmY6k5n7Y', NULL, 6);
INSERT INTO `image` (`id`, `name`, `image_url`, `picture`, `convention_id`) VALUES (7, 'Love this convention', 'https://media-cldnry.s-nbcnews.com/image/upload/newscms/2018_29/2502696/180718-comic-con-san-diego-2017-ac-1048p.jpg', NULL, 1);
INSERT INTO `image` (`id`, `name`, `image_url`, `picture`, `convention_id`) VALUES (8, 'Great cosplay', 'https://fansided.com/wp-content/uploads/getty-images/2020/06/1163104409.jpeg', NULL, 1);

COMMIT;


-- -----------------------------------------------------
-- Data for table `location`
-- -----------------------------------------------------
START TRANSACTION;
USE `conventiondb`;
INSERT INTO `location` (`id`, `state`, `city`, `address`) VALUES (1, 'California', 'San Diego', '111 Harbor Dr, San Diego, CA 92101');
INSERT INTO `location` (`id`, `state`, `city`, `address`) VALUES (2, 'Texas', 'San Antonio', '618 Northwest Loop 410 Suite 207, San Antonio, TX 78216');
INSERT INTO `location` (`id`, `state`, `city`, `address`) VALUES (3, 'Texas', 'Dallas', '1501 Gaylord Trail, Grapevine, TX 76051');
INSERT INTO `location` (`id`, `state`, `city`, `address`) VALUES (4, 'Texas', 'San Antonio', '900 E Market St, San Antonio, TX 78205');

COMMIT;


-- -----------------------------------------------------
-- Data for table `convention_has_location`
-- -----------------------------------------------------
START TRANSACTION;
USE `conventiondb`;
INSERT INTO `convention_has_location` (`convention_id`, `location_id`) VALUES (1, 1);
INSERT INTO `convention_has_location` (`convention_id`, `location_id`) VALUES (2, 2);
INSERT INTO `convention_has_location` (`convention_id`, `location_id`) VALUES (3, 3);
INSERT INTO `convention_has_location` (`convention_id`, `location_id`) VALUES (4, 4);
INSERT INTO `convention_has_location` (`convention_id`, `location_id`) VALUES (5, 4);
INSERT INTO `convention_has_location` (`convention_id`, `location_id`) VALUES (6, 4);

COMMIT;

