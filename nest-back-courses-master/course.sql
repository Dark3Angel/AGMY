-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Июн 15 2024 г., 15:31
-- Версия сервера: 10.7.5-MariaDB
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `users`
--

-- --------------------------------------------------------

--
-- Структура таблицы `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `image_path` varchar(255) DEFAULT '/default/course-default.png',
  `translit` varchar(255) NOT NULL,
  `primarytagid` int(11) DEFAULT NULL,
  `secondarytagid` int(11) DEFAULT NULL,
  `published` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Дамп данных таблицы `course`
--

INSERT INTO `course` (`id`, `name`, `price`, `userid`, `createdAt`, `updatedAt`, `image_path`, `translit`, `primarytagid`, `secondarytagid`, `published`) VALUES
(37, ' Angular. Основы', NULL, 7, '2023-09-22 10:39:01.859929', '2024-05-27 23:24:43.108081', '/course_37/Angular.png', '_angular__osnovy', 5, 1, 1),
(38, ' Angular. Продвинутый уровень', NULL, 7, '2023-09-22 10:39:09.614272', '2024-05-27 23:24:39.535701', '/default/course-default.png', '_angular__prodvinutyi_uroven ', 5, 1, 0),
(39, 'NestJS. Продвинутый уровень', NULL, 7, '2023-09-22 10:39:16.178533', '2024-05-27 23:24:35.199509', '/default/course-default.png', 'nestjs__prodvinutyi_uroven ', 5, NULL, 0),
(56, 'NestJS. Основы', NULL, 7, '2023-11-17 11:05:16.171769', '2023-11-17 11:28:45.000000', '/course_56/nestjs_logo_icon_169927.png', 'nestjs__osnovy', NULL, NULL, 1),
(57, 'Высшая математика', NULL, 4, '2023-11-17 11:34:38.047250', '2024-05-27 23:22:39.000000', '/course_57/55,604 Math Banner Images, Stock Photos & Vectors _ Shutterstock.jpeg', 'vysshaya_matematika', NULL, NULL, 1),
(58, 'Основы PHP', NULL, 4, '2023-11-17 11:42:50.537492', '2023-11-17 11:51:17.000000', '/course_58/pngwing.com.png', 'osnovy_php', NULL, NULL, 1),
(59, 'PRO Go. Основы программирования', NULL, 4, '2023-11-17 11:56:38.284913', '2023-12-10 18:39:47.000000', '/course_59/golang.sh-600x600.png', 'pro_go__osnovy_programmirovaniya', NULL, NULL, 1);

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_599209cbbb8dac3325804fe2fe1` (`userid`),
  ADD KEY `FK_8335b3a87a0dda758cdeed9c3fb` (`primarytagid`),
  ADD KEY `FK_f6e6f720703835733e5e8bdce01` (`secondarytagid`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `FK_599209cbbb8dac3325804fe2fe1` FOREIGN KEY (`userid`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_8335b3a87a0dda758cdeed9c3fb` FOREIGN KEY (`primarytagid`) REFERENCES `primarytag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_f6e6f720703835733e5e8bdce01` FOREIGN KEY (`secondarytagid`) REFERENCES `secondarytag` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
