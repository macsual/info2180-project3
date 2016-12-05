DROP DATABASE IF EXISTS cheapo;
CREATE DATABASE cheapo;
USE cheapo;

CREATE TABLE IF NOT EXISTS `User` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `firstname`char(50),
    `lastname` char(50),
    `username` char(50) NOT NULL,
    `password` char(255) NOT NULL,
    `admin` int(1) NOT NULL default 0,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `Message` (
    `id` bigint(20) NOT NULL auto_increment,
    `recipient_ids` bigint(20) NOT NULL,
    `user_id` bigint(20) NOT NULL,
    `subject` varchar(50) NOT NULL,
    `body` varchar(255) NOT NULL,
    `read` int(1) NOT NULL default 0,
    `conversation` int(1) NOT NULL,
    `date_sent` timestamp NOT NULL default CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`)
);

INSERT INTO `User`(`id`, `firstname`, `lastname`, `username`, `password`, `admin`) VALUES (1, 'admin', 'admin', 'admin', '$2y$10$nJfEp2G3zKCbjWaySHwaF.DvA.Vfx3J6EsosdYmkjQaQVNCcZiZHm', 1);
