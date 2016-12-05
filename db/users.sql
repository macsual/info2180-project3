
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;


CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `password` varchar(60) NOT NULL,
  `username` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  `type` varchar(30) NOT NULL DEFAULT 'Regular',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=14 ;

--
-- Dumping data for table `users`
--

-- INSERT INTO `users` (`first_name`, `last_name`, `password`, `username`, `created_at`, `updated_at`, `type`) VALUES
-- ('Donald', 'Robertson', 'wry85', 'drobertson9', '2015-02-16 07:26:48', '2015-07-25 03:15:11', 'Regular'),
-- ('Craig', 'Kelly', 'act48', 'ckelly0', '2014-12-27 23:33:44', '2015-07-30 10:30:36', 'Regular'),
-- ('Cynthia', 'Ramos', 'new11', 'cramos1', '2015-01-30 07:53:31', '2015-08-03 11:59:45', 'Regular'),
-- ('Karen', 'Hayes', 'mop57', 'khayes2', '2015-01-02 14:30:10', '2015-10-16 18:07:20', 'Admin');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;