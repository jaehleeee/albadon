DROP SCHEMA IF EXISTS albadon;
CREATE SCHEMA albadon;
USE albadon ;

DROP TABLE IF EXISTS `work`;
CREATE TABLE `work` (
  `work_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `store_id` bigint(20) DEFAULT NULL,
  `employee_id` bigint(20) DEFAULT NULL,
  `week_number` int(11) DEFAULT NULL,
  `weekday` int(11) DEFAULT NULL,
  `work_date` date DEFAULT NULL,
  `start_time` varchar(45) DEFAULT NULL,
  `end_time` varchar(45) DEFAULT NULL,
  `pause_info` json DEFAULT NULL,
  `created_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_datetime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`work_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `work` WRITE;
INSERT INTO `work` VALUES (125,20,22,NULL,1,'2021-08-02','01:12:00','15:14:00','{\"duration\": \"00:20\"}','2021-08-20 00:44:49','2021-08-20 00:46:31'),(126,20,22,NULL,3,'2021-08-04','12:38:00','13:39:00','{\"duration\": \"00:00\"}','2021-08-20 00:44:49','2021-08-20 00:44:49'),(127,20,22,NULL,6,'2021-08-07','01:58:00','12:54:00','{\"duration\": \"00:00\"}','2021-08-20 00:44:49','2021-08-20 00:44:49'),(128,20,22,NULL,1,'2021-08-09','01:12:00','15:14:00','{\"duration\": \"00:00\"}','2021-08-20 00:44:49','2021-08-20 00:44:49'),(129,20,22,NULL,3,'2021-08-11','12:38:00','13:39:00','{\"duration\": \"00:00\"}','2021-08-20 00:44:49','2021-08-20 00:44:49'),(130,20,22,NULL,6,'2021-08-14','01:58:00','12:54:00','{\"duration\": \"00:00\"}','2021-08-20 00:44:49','2021-08-20 00:44:49'),(131,20,22,NULL,1,'2021-08-16','01:12:00','15:14:00','{\"duration\": \"00:00\"}','2021-08-20 00:44:49','2021-08-20 00:44:49'),(132,20,22,NULL,3,'2021-08-18','12:38:00','13:39:00','{\"duration\": \"00:00\"}','2021-08-20 00:44:49','2021-08-20 00:44:49'),(133,20,22,NULL,6,'2021-08-21','01:58:00','12:54:00','{\"duration\": \"00:00\"}','2021-08-20 00:44:49','2021-08-20 00:44:49'),(134,20,22,NULL,1,'2021-08-23','01:12:00','15:14:00','{\"duration\": \"00:00\"}','2021-08-20 00:44:49','2021-08-20 00:44:49'),(135,20,22,NULL,3,'2021-08-25','12:38:00','13:39:00','{\"duration\": \"00:00\"}','2021-08-20 00:44:49','2021-08-20 00:44:49'),(136,20,22,NULL,6,'2021-08-28','01:58:00','12:54:00','{\"duration\": \"00:00\"}','2021-08-20 00:44:49','2021-08-20 00:44:49'),(137,20,22,NULL,1,'2021-08-30','01:12:00','15:14:00','{\"duration\": \"00:00\"}','2021-08-20 00:44:49','2021-08-20 00:44:49'),(138,21,23,NULL,1,'2021-08-02','11:00:00','13:00:00','{\"duration\": \"01:00\"}','2021-08-20 07:57:53','2021-08-20 07:57:53'),(140,21,23,NULL,1,'2020-07-27','03:20:00','05:22:00','{\"duration\": \"00:00\"}','2021-08-22 01:18:45','2021-08-22 01:18:45'),(141,21,23,NULL,2,'2020-07-28','06:23:00','18:23:00','{\"duration\": \"00:00\"}','2021-08-22 01:18:45','2021-08-22 01:18:45'),(142,21,23,NULL,3,'2020-07-29','04:21:00','19:24:00','{\"duration\": \"00:20\"}','2021-08-22 01:18:45','2021-08-22 01:18:45'),(147,21,23,1,0,'2021-08-01','03:22:00','19:26:00','{\"duration\": \"00:00\"}','2021-08-22 02:21:20','2021-08-22 02:21:20'),(149,21,23,2,5,'2021-07-30','05:26:00','06:28:00','{\"duration\": \"00:00\"}','2021-08-22 02:24:54','2021-08-22 02:24:54'),(150,21,23,2,2,'2021-08-03','03:02:00','23:08:00','{\"duration\": \"00:00\"}','2021-08-22 03:02:12','2021-08-22 03:02:12'),(151,21,23,2,3,'2021-08-04','08:16:00','22:27:00','{\"duration\": \"00:00\"}','2021-08-22 03:02:12','2021-08-22 03:02:12'),(152,21,23,2,4,'2021-08-05','02:04:00','19:08:00','{\"duration\": \"00:00\"}','2021-08-22 03:02:12','2021-08-22 03:02:12');
UNLOCK TABLES;


DROP TABLE IF EXISTS `STORE`;
CREATE TABLE `STORE` (
  `store_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `store_name` varchar(45) DEFAULT NULL,
  `store_address` varchar(250) DEFAULT NULL,
  `store_phone_number` varchar(45) DEFAULT NULL,
  `boss_id` bigint(20) DEFAULT NULL,
  `created_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_datetime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`store_id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

LOCK TABLES `STORE` WRITE;
INSERT INTO `STORE` VALUES (21,'베러먼데이 팔용점','창원시 팔용동','010-1111-4567',1,'2021-08-20 07:55:47','2021-08-20 10:07:45');
UNLOCK TABLES;

DROP TABLE IF EXISTS `SALARY`;
CREATE TABLE `SALARY` (
  `salary_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` varchar(45) DEFAULT NULL,
  `store_id` bigint(20) DEFAULT NULL,
  `employee_id` bigint(20) DEFAULT NULL,
  `paid_date` datetime DEFAULT NULL,
  `paid_salary` int(11) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_datetime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`salary_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `EMPLOYEE`;
CREATE TABLE `EMPLOYEE` (
  `employee_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `employee_name` varchar(45) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  `employee_phone_number` varchar(45) DEFAULT NULL,
  `employee_sex` varchar(45) DEFAULT NULL,
  `employee_birthday` datetime DEFAULT NULL,
  `created_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_datetime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8;

LOCK TABLES `EMPLOYEE` WRITE;
INSERT INTO `EMPLOYEE` VALUES (23,'테스터','employee','010-1111-2222',NULL,NULL,'2021-08-20 07:56:38','2021-08-20 07:56:38');
UNLOCK TABLES;

DROP TABLE IF EXISTS `CONTRACT`;
CREATE TABLE `CONTRACT` (
  `contract_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `store_id` bigint(20) DEFAULT NULL,
  `employee_id` bigint(20) DEFAULT NULL,
  `wage` int(11) DEFAULT NULL,
  `night_wage` int(11) DEFAULT NULL,
  `holiday_wage` int(11) DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_datetime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contract_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

LOCK TABLES `CONTRACT` WRITE;
INSERT INTO `CONTRACT` VALUES (24,21,23,9000,NULL,NULL,'2021-08-20 00:00:00',NULL,'2021-08-20 07:56:38','2021-08-20 07:56:38');
UNLOCK TABLES;

DROP TABLE IF EXISTS `BOSS`;
CREATE TABLE `BOSS` (
  `boss_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `boss_name` varchar(45) DEFAULT NULL,
  `boss_phone_number` varchar(45) DEFAULT NULL,
  `boss_sex` varchar(45) DEFAULT NULL,
  `boss_birthday` datetime DEFAULT NULL,
  `created_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_datetime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`boss_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

LOCK TABLES `BOSS` WRITE;
INSERT INTO `BOSS` VALUES (1,'백종원','010-1234-5678','male','1991-05-31 00:00:00','2021-06-20 15:49:14','2021-06-20 15:49:14');
UNLOCK TABLES;

DROP TABLE IF EXISTS `CONTRACT_DETAIL`;
CREATE TABLE `CONTRACT_DETAIL` (
  `contract_detail_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `contract_id` bigint(20) DEFAULT NULL,
  `weekday` int(11) DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `created_datetime` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_datetime` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`contract_detail_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

LOCK TABLES `CONTRACT_DETAIL` WRITE;
INSERT INTO `CONTRACT_DETAIL` VALUES (45,24,1,'04:39:00','05:40:00','2021-08-22 03:38:43','2021-08-22 03:38:43');
UNLOCK TABLES;