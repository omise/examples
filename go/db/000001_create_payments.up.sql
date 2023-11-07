CREATE TABLE IF NOT EXISTS `payments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `charge_id` VARCHAR(50) NULL,
  `payment_id` VARCHAR(10) NULL,
  `payment_type` VARCHAR(10) NULL,
  `created_at` DATETIME NULL,
  `updated_at` DATETIME NULL,
  PRIMARY KEY (`id`));