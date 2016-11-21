CREATE TABLE IF NOT EXISTS `User` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `firstname`char(50) NOT NULL,
    `lastname` char(50) NOT NULL,
    `username` char(50) NOT NULL,
    `password` char(255) NOT NULL,
    PRIMARY KEY (`id`)
);

-- CREATE TABLE IF NOT EXISTS `Message` (
--     `id` bigint(20) NOT NULL auto_increment,
--     `recipient_ids` bigint(20) NOT NULL,
--     `user_id` bigint(20) NOT NULL,
--     `subject` varchar(50) NOT NULL,
--     `body` varchar(255) NOT NULL,
--     `date_sent` timestamp NOT NULL default CURRENT_TIMESTAMP,
--     PRIMARY KEY (`id`)
-- );

-- CREATE TABLE IF NOT EXISTS `Message_read` (
--     `id` bigint(20) NOT NULL auto_increment,
--     `message_id` bigint(20) NOT NULL,
--     `reader_id` bigint(20) NOT NULL,
--     `date` timestamp NOT NULL default CURRENT_TIMESTAMP,
--     PRIMARY KEY (`id`)
-- );
