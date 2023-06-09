-- Adminer 4.8.1 MySQL 8.0.31 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP DATABASE IF EXISTS `capstone_nodejs`;
CREATE DATABASE `capstone_nodejs` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `capstone_nodejs`;

DROP TABLE IF EXISTS `banner`;
CREATE TABLE `banner` (
  `ma_banner` int NOT NULL AUTO_INCREMENT,
  `ma_phim` int NOT NULL,
  `hinh_anh` varchar(255) NOT NULL,
  PRIMARY KEY (`ma_banner`),
  KEY `ma_phim` (`ma_phim`,`hinh_anh`),
  CONSTRAINT `banner_ibfk_1` FOREIGN KEY (`ma_phim`, `hinh_anh`) REFERENCES `phim` (`ma_phim`, `hinh_anh`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `banner` (`ma_banner`, `ma_phim`, `hinh_anh`) VALUES
(3,	52,	'1680229954708_cum_rap.jpg'),
(5,	54,	'1680235038873_Capture.PNG'),
(6,	55,	'1680235052292_Capture.PNG'),
(7,	56,	'1680235224402_cum_rap.jpg'),
(8,	57,	'1680235225274_cum_rap.jpg'),
(9,	58,	'1680235225912_cum_rap.jpg'),
(10,	59,	'1680235226406_cum_rap.jpg'),
(11,	60,	'1680235226863_cum_rap.jpg'),
(12,	61,	'1680235227306_cum_rap.jpg'),
(13,	62,	'1680235227709_cum_rap.jpg'),
(14,	63,	'1680235228140_cum_rap.jpg'),
(15,	64,	'1680235228599_cum_rap.jpg'),
(16,	65,	'1680235229551_cum_rap.jpg');

DROP TABLE IF EXISTS `cum_rap`;
CREATE TABLE `cum_rap` (
  `ma_cum_rap` int NOT NULL AUTO_INCREMENT,
  `ten_cum_rap` varchar(255) NOT NULL,
  `dia_chi` varchar(255) NOT NULL,
  `ma_he_thong_rap` int NOT NULL,
  PRIMARY KEY (`ma_cum_rap`),
  KEY `ma_he_thong_rap` (`ma_he_thong_rap`),
  CONSTRAINT `cum_rap_ibfk_1` FOREIGN KEY (`ma_he_thong_rap`) REFERENCES `he_thong_rap` (`ma_he_thong_rap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `cum_rap` (`ma_cum_rap`, `ten_cum_rap`, `dia_chi`, `ma_he_thong_rap`) VALUES
(11,	'Cụm rạp Biên Hòa',	'Biên Hòa',	15),
(13,	'Cụm rạp Biên Hòa',	'Biên Hòa',	15);

DROP TABLE IF EXISTS `dat_ve`;
CREATE TABLE `dat_ve` (
  `ma_dat_ve` int NOT NULL AUTO_INCREMENT,
  `tai_khoan` int NOT NULL,
  `ma_lich_chieu` int NOT NULL,
  `ma_ghe` int NOT NULL,
  PRIMARY KEY (`ma_dat_ve`),
  KEY `tai_khoan` (`tai_khoan`),
  KEY `ma_lich_chieu` (`ma_lich_chieu`),
  KEY `ma_ghe` (`ma_ghe`),
  CONSTRAINT `dat_ve_ibfk_1` FOREIGN KEY (`tai_khoan`) REFERENCES `nguoi_dung` (`tai_khoan`),
  CONSTRAINT `dat_ve_ibfk_2` FOREIGN KEY (`ma_lich_chieu`) REFERENCES `lich_chieu` (`ma_lich_chieu`),
  CONSTRAINT `dat_ve_ibfk_3` FOREIGN KEY (`ma_ghe`) REFERENCES `ghe` (`ma_ghe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `dat_ve` (`ma_dat_ve`, `tai_khoan`, `ma_lich_chieu`, `ma_ghe`) VALUES
(74,	38,	72,	25);

DROP TABLE IF EXISTS `ghe`;
CREATE TABLE `ghe` (
  `ma_ghe` int NOT NULL AUTO_INCREMENT,
  `ten_ghe` varchar(255) NOT NULL,
  `loai_ghe` varchar(255) NOT NULL DEFAULT 'Normal',
  `ma_rap` int NOT NULL,
  PRIMARY KEY (`ma_ghe`),
  KEY `ma_rap` (`ma_rap`),
  CONSTRAINT `ghe_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `rap_phim` (`ma_rap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `ghe` (`ma_ghe`, `ten_ghe`, `loai_ghe`, `ma_rap`) VALUES
(13,	'aac',	'Normal',	10),
(14,	'aabc',	'Normal',	10),
(15,	'aabc',	'Normal',	10),
(17,	'aabc',	'Normal',	11),
(18,	'aabcád',	'Normal',	11),
(19,	'aabcáddd',	'Normal',	11),
(25,	'1',	'Normal',	16),
(26,	'2',	'Normal',	16),
(27,	'3',	'Normal',	16),
(28,	'4',	'Normal',	16),
(29,	'4',	'Normal',	13),
(30,	'4',	'Normal',	13),
(31,	'4',	'Normal',	13),
(32,	'4',	'Normal',	13);

DROP TABLE IF EXISTS `he_thong_rap`;
CREATE TABLE `he_thong_rap` (
  `ma_he_thong_rap` int NOT NULL AUTO_INCREMENT,
  `ten_he_thong_rap` varchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  PRIMARY KEY (`ma_he_thong_rap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `he_thong_rap` (`ma_he_thong_rap`, `ten_he_thong_rap`, `logo`) VALUES
(15,	'Miền Nam',	'1680177854073_heThongRap.jpg'),
(23,	'Miền Nam',	'1680229975044_cum_rap.jpg');

DROP TABLE IF EXISTS `lich_chieu`;
CREATE TABLE `lich_chieu` (
  `ma_lich_chieu` int NOT NULL AUTO_INCREMENT,
  `ma_rap` int NOT NULL,
  `ma_phim` int NOT NULL,
  `ngay_gio_chieu` datetime NOT NULL,
  `gia_ve` int NOT NULL,
  PRIMARY KEY (`ma_lich_chieu`),
  KEY `ma_rap` (`ma_rap`),
  KEY `ma_phim` (`ma_phim`),
  CONSTRAINT `lich_chieu_ibfk_1` FOREIGN KEY (`ma_rap`) REFERENCES `rap_phim` (`ma_rap`),
  CONSTRAINT `lich_chieu_ibfk_2` FOREIGN KEY (`ma_phim`) REFERENCES `phim` (`ma_phim`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `lich_chieu` (`ma_lich_chieu`, `ma_rap`, `ma_phim`, `ngay_gio_chieu`, `gia_ve`) VALUES
(72,	16,	52,	'2023-03-15 16:00:00',	10000),
(73,	13,	52,	'2023-03-15 16:00:00',	10000);

DROP TABLE IF EXISTS `nguoi_dung`;
CREATE TABLE `nguoi_dung` (
  `tai_khoan` int NOT NULL AUTO_INCREMENT,
  `ho_ten` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `so_dt` varchar(10) NOT NULL,
  `mat_khau` varchar(60) NOT NULL,
  `loai_nguoi_dung` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`tai_khoan`),
  KEY `loai_nguoi_dung` (`loai_nguoi_dung`),
  CONSTRAINT `nguoi_dung_ibfk_1` FOREIGN KEY (`loai_nguoi_dung`) REFERENCES `permission` (`permission_value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `nguoi_dung` (`tai_khoan`, `ho_ten`, `email`, `so_dt`, `mat_khau`, `loai_nguoi_dung`) VALUES
(26,	'nguyenhauUpdate',	'hau19@gmail.com',	'0942219837',	'$2b$10$C5UUxxda3XiS3OD/R5.vfO0lvTQq.dX.xxON9caY.L2tCjZIrRRmi',	2),
(28,	'thinh',	'dothinh@gmail.com',	'0978481071',	'$2b$10$.8IU0v5SSi9dVv8l/9wnx.ysaS5ebfAYDM1dmDAdijO31/qmlgeaS',	4),
(29,	'thinh',	'dothinh123@gmail.com',	'0978481071',	'$2b$10$GTbFuMc6rZiADAAeYFVPEOTDAhV.o/JMSRgxDYzPCP71O9rgjc.yK',	1),
(31,	'thinh',	'dothinh12345@gmail.com',	'0978481071',	'$2b$10$4GgHcUN8FVRW44p5Nb6GBeknDMs/vGYX1f7SD1bIoX3P6uP2ZtIsy',	1),
(32,	'thinh',	'dothinh123421345@gmail.com',	'0978481071',	'$2b$10$i4p1/Rlp/uHKPiIMMSBO/e7BEsC2TvhCE8hqRUbMCXzNySZqL.XsG',	3),
(38,	'Thinh890',	'abc@gmail.com',	'0901234567',	'$2b$10$6XPfwsNkfz1xwB2bjqYM6eIYz.LxFikJCHHZy7JgJq7WFcDTzjh.W',	4),
(39,	'nguyenhau12345',	'abcd@gmail.com',	'0361313493',	'$2b$10$r9vAMBpN3kalMEGjrvHo4OGvwyw0MDoLFygnCECcC3YQCOILsqEq.',	4),
(41,	'admin',	'abcde@gmail.com',	'0978481071',	'$2a$10$MRayGo2nYwIMiolw.tN40Oq2OwFp8fmd47FapE2oBf2C7dvO9pinG',	1),
(43,	'admin',	'admin@admin.com',	'0908999999',	'$2a$10$k53nPt1Rg7Jcnm42r78U6edRxhoVz8GG2FET8KzrabZKD6/ZVYWS6',	4);

DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission` (
  `permission_value` int NOT NULL,
  `permission_name` varchar(255) NOT NULL,
  PRIMARY KEY (`permission_value`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `permission` (`permission_value`, `permission_name`) VALUES
(0,	'Banned'),
(1,	'Members'),
(2,	'Editors'),
(3,	'Moderators'),
(4,	'Administrators');

DROP TABLE IF EXISTS `phim`;
CREATE TABLE `phim` (
  `ma_phim` int NOT NULL AUTO_INCREMENT,
  `ten_phim` varchar(255) NOT NULL,
  `trailer` varchar(255) NOT NULL,
  `hinh_anh` varchar(255) NOT NULL,
  `mo_ta` varchar(255) NOT NULL,
  `ngay_khoi_chieu` date NOT NULL,
  `danh_gia` int NOT NULL,
  `hot` tinyint(1) NOT NULL DEFAULT '0',
  `dang_chieu` tinyint(1) NOT NULL,
  `sap_chieu` tinyint(1) NOT NULL,
  `tai_khoan` int NOT NULL,
  PRIMARY KEY (`ma_phim`,`hinh_anh`),
  UNIQUE KEY `ma_phim` (`ma_phim`),
  KEY `tai_khoan` (`tai_khoan`),
  CONSTRAINT `phim_ibfk_1` FOREIGN KEY (`tai_khoan`) REFERENCES `nguoi_dung` (`tai_khoan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `phim` (`ma_phim`, `ten_phim`, `trailer`, `hinh_anh`, `mo_ta`, `ngay_khoi_chieu`, `danh_gia`, `hot`, `dang_chieu`, `sap_chieu`, `tai_khoan`) VALUES
(52,	'Phim 3',	'trailer_test',	'1680229954708_cum_rap.jpg',	'Mô tả phim thứ 1',	'2023-03-21',	5,	1,	1,	0,	38),
(54,	'456',	'456',	'1680235038873_Capture.PNG',	'456',	'2023-03-01',	456,	0,	0,	0,	38),
(55,	'123',	'123',	'1680235052292_Capture.PNG',	'123',	'2023-03-01',	123,	0,	0,	0,	38),
(56,	'123',	'123',	'1680235224402_cum_rap.jpg',	'123',	'2023-03-01',	123,	0,	0,	0,	38),
(57,	'123',	'123',	'1680235225274_cum_rap.jpg',	'123',	'2023-03-01',	123,	0,	0,	0,	38),
(58,	'123',	'123',	'1680235225912_cum_rap.jpg',	'123',	'2023-03-01',	123,	0,	0,	0,	38),
(59,	'123',	'123',	'1680235226406_cum_rap.jpg',	'123',	'2023-03-01',	123,	0,	0,	0,	38),
(60,	'123',	'123',	'1680235226863_cum_rap.jpg',	'123',	'2023-03-01',	123,	0,	0,	0,	38),
(61,	'123',	'123',	'1680235227306_cum_rap.jpg',	'123',	'2023-03-01',	123,	0,	0,	0,	38),
(62,	'123',	'123',	'1680235227709_cum_rap.jpg',	'123',	'2023-03-01',	123,	0,	0,	0,	38),
(63,	'123',	'123',	'1680235228140_cum_rap.jpg',	'123',	'2023-03-01',	123,	0,	0,	0,	38),
(64,	'123',	'123',	'1680235228599_cum_rap.jpg',	'123',	'2023-03-01',	123,	0,	0,	0,	38),
(65,	'123',	'123',	'1680235229551_cum_rap.jpg',	'123',	'2023-03-01',	123,	0,	0,	0,	38);

DROP TABLE IF EXISTS `rap_phim`;
CREATE TABLE `rap_phim` (
  `ma_rap` int NOT NULL AUTO_INCREMENT,
  `ten_rap` varchar(255) NOT NULL,
  `ma_cum_rap` int NOT NULL,
  PRIMARY KEY (`ma_rap`),
  KEY `ma_cum_rap` (`ma_cum_rap`),
  CONSTRAINT `rap_phim_ibfk_1` FOREIGN KEY (`ma_cum_rap`) REFERENCES `cum_rap` (`ma_cum_rap`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `rap_phim` (`ma_rap`, `ten_rap`, `ma_cum_rap`) VALUES
(10,	'Rạp Tp. Biên Hòa',	11),
(11,	'Rạp Tp. Biên Hòa',	11),
(13,	'Rạp Tp. Biên Hòa',	11),
(16,	'Rạp Tp. Biên Hòa',	13);

-- 2023-04-03 13:23:21
