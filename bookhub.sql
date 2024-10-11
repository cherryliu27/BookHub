-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 11, 2024 at 08:18 PM
-- Server version: 5.7.39
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bookhub`
--

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `entry_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `genre` varchar(50) DEFAULT NULL,
  `publication_date` date DEFAULT NULL,
  `isbn` varchar(13) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`entry_id`, `title`, `author`, `genre`, `publication_date`, `isbn`) VALUES
(1, 'To Kill a Mockingbird', 'Harper Lee', 'Fiction', '1960-07-11', '9780061120084'),
(2, 'The Catcher in the Rye', 'J.D. Salinger', 'Fiction', '1951-07-16', '9780316769488'),
(3, 'The Great Gatsby', 'F. Scott Fitzgerald', 'Tragedy', '1925-04-10', '9780743273565'),
(4, 'Moby Dick', 'Herman Melville', 'Adventure', '1851-10-18', '9781503280786'),
(5, 'Pride and Prejudice', 'Jane Austen', 'Romance', '1813-01-28', '9781503290563'),
(6, 'The Hobbit', 'J.R.R. Tolkien', 'Fantasy', '1937-09-21', '9780547928227'),
(7, 'The Book Thief', 'Markus Zusak', 'Historical Fiction', '2005-03-01', '9780375842207'),
(8, 'A Tale of Two Cities', 'Charles Dickens', 'Historical Fiction', '1859-04-30', '9781505286131');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`entry_id`),
  ADD UNIQUE KEY `isbn` (`isbn`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `entry_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
