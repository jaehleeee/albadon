DROP SCHEMA IF EXISTS albadon;
CREATE SCHEMA albadon;
USE albadon ;

DROP TABLE IF EXISTS BOSS;
CREATE TABLE BOSS (
  boss_id bigint(20) NOT NULL AUTO_INCREMENT,
  boss_name varchar(45) DEFAULT NULL,
  boss_phone_number varchar(45) DEFAULT NULL,
  boss_sex varchar(45) DEFAULT NULL,
  boss_birthday datetime DEFAULT NULL,
  created_datetime datetime DEFAULT CURRENT_TIMESTAMP,
  updated_datetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (boss_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO BOSS VALUES (1,'백종원','010-1234-5678','male','1991-05-31 00:00:00','2021-06-20 15:49:14','2021-06-20 15:49:14');

DROP TABLE IF EXISTS CONTRACT;
CREATE TABLE CONTRACT (
  contract_id bigint(20) NOT NULL AUTO_INCREMENT,
  store_id bigint(20) DEFAULT NULL,
  employee_id bigint(20) DEFAULT NULL,
  wage int(11) DEFAULT NULL,
  night_wage int(11) DEFAULT NULL,
  holiday_wage int(11) DEFAULT NULL,
  start_date datetime DEFAULT NULL,
  end_date datetime DEFAULT NULL,
  created_datetime datetime DEFAULT CURRENT_TIMESTAMP,
  updated_datetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (contract_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES CONTRACT WRITE;
INSERT INTO CONTRACT VALUES (1,1,4,10000,29000,30000,'2021-01-01 00:00:00',NULL,'2021-06-20 15:49:32','2021-06-20 15:49:32'),(2,2,4,10000,NULL,NULL,'2021-01-01 00:00:00',NULL,'2021-06-20 15:49:32','2021-06-20 15:49:32'),(3,1,1,9000,NULL,NULL,'2021-01-01 00:00:00',NULL,'2021-06-20 15:49:32','2021-06-20 15:49:32'),(4,1,2,9000,NULL,NULL,'2021-01-01 00:00:00',NULL,'2021-06-20 15:49:32','2021-06-20 15:49:32'),(5,1,5,9000,NULL,NULL,'2021-01-01 00:00:00',NULL,'2021-06-20 15:49:32','2021-06-20 15:49:32'),(6,2,3,9000,NULL,NULL,'2021-01-01 00:00:00',NULL,'2021-06-20 15:49:32','2021-06-20 15:49:32'),(7,2,6,9000,NULL,NULL,'2021-01-01 00:00:00',NULL,'2021-06-20 15:49:32','2021-06-20 15:49:32');
UNLOCK TABLES;

DROP TABLE IF EXISTS CONTRACT_DETAIL;
CREATE TABLE CONTRACT_DETAIL (
  contract_detail_id bigint(20) NOT NULL AUTO_INCREMENT,
  contract_id bigint(20) DEFAULT NULL,
  weekday int DEFAULT NULL,
  start_time time DEFAULT NULL,
  end_time time DEFAULT NULL,
  created_datetime datetime DEFAULT CURRENT_TIMESTAMP,
  updated_datetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (contract_detail_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS EMPLOYEE;
CREATE TABLE EMPLOYEE (
  employee_id bigint(20) NOT NULL AUTO_INCREMENT,
  employee_name varchar(45) DEFAULT NULL,
  role varchar(45) DEFAULT NULL,
  employee_phone_number varchar(45) DEFAULT NULL,
  employee_sex varchar(45) DEFAULT NULL,
  employee_birthday datetime DEFAULT NULL,
  created_datetime datetime DEFAULT CURRENT_TIMESTAMP,
  updated_datetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (employee_id)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;


LOCK TABLES EMPLOYEE WRITE;
INSERT INTO EMPLOYEE VALUES (1,'박민준','employee','010-1234-1234','male','1990-01-01 00:00:00','2021-06-20 15:49:25','2021-06-20 15:49:25'),(2,'김현우','employee','010-1234-1234','male','1991-01-01 00:00:00','2021-06-20 15:49:25','2021-06-20 15:49:25'),(3,'신지훈','employee','010-1234-1234','male','1992-01-01 00:00:00','2021-06-20 15:49:25','2021-06-20 15:49:25'),(4,'김지현','manager','010-1234-1234','male','1993-01-01 00:00:00','2021-06-20 15:49:25','2021-06-20 15:49:25'),(5,'김지현','employee','010-1234-1234','female','1994-01-01 00:00:00','2021-06-20 15:49:25','2021-06-20 15:49:25'),(6,'박수연','employee','010-1234-1234','female','1995-01-01 00:00:00','2021-06-20 15:49:25','2021-06-20 15:49:25');
UNLOCK TABLES;


DROP TABLE IF EXISTS SALARY;
CREATE TABLE SALARY (
  salary_id bigint(20) NOT NULL AUTO_INCREMENT,
  type varchar(45) DEFAULT NULL,
  store_id bigint(20) DEFAULT NULL,
  employee_id bigint(20) DEFAULT NULL,
  paid_date datetime DEFAULT NULL,
  paid_salary int(11) DEFAULT NULL,
  start_date datetime DEFAULT NULL,
  end_date datetime DEFAULT NULL,
  created_datetime datetime DEFAULT CURRENT_TIMESTAMP,
  updated_datetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (salary_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS STORE;
CREATE TABLE STORE (
  store_id bigint(20) NOT NULL AUTO_INCREMENT,
  store_name varchar(45) DEFAULT NULL,
  store_address varchar(250) DEFAULT NULL,
  store_phone_number varchar(45) DEFAULT NULL,
  boss_id bigint(20) DEFAULT NULL,
  created_datetime datetime DEFAULT CURRENT_TIMESTAMP,
  updated_datetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (store_id)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;


LOCK TABLES STORE WRITE;
INSERT INTO STORE VALUES (1,'빽다방','서울 강남구 강남대로118길 11','02-515-3199',1,'2021-06-20 15:49:17','2021-06-20 15:49:17'),(2,'한신포차','서울 강남구 강남대로118길 11','02-515-3199',1,'2021-06-20 15:49:17','2021-06-20 15:49:17');
UNLOCK TABLES;


DROP TABLE IF EXISTS WORK;
CREATE TABLE WORK (
  work_id bigint(20) NOT NULL AUTO_INCREMENT,
  store_id bigint(20) DEFAULT NULL,
  employee_id bigint(20) DEFAULT NULL,
  weekday int DEFAULT NULL,
  start_datetime varchar(45) DEFAULT NULL,
  end_datetime varchar(45) DEFAULT NULL,
  created_datetime datetime DEFAULT CURRENT_TIMESTAMP,
  updated_datetime datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (work_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

insert into contract_detail
(contract_id, weekday, start_time, end_time)
values
(3, 1, '09:00:00', '18:00:00'),
(3, 2, '09:00:00', '18:00:00'),
(3, 3, '09:00:00', '18:00:00'),
(3, 4, '09:00:00', '18:00:00'),
(3, 5, '09:00:00', '18:00:00'),
(1, 1, '16:00:00', '23:00:00'),
(1, 2, '17:00:00', '23:59:59'),
(1, 3, '18:00:00', '22:00:00'),
(2, 4, '09:00:00', '18:00:00'),
(2, 5, '09:00:00', '18:00:00'),
(4, 1, '09:00:00', '18:00:00'),
(4, 2, '09:00:00', '18:00:00'),
(4, 3, '09:00:00', '18:00:00'),
(4, 4, '09:00:00', '18:00:00'),
(4, 5, '09:00:00', '18:00:00'),
(5, 1, '09:00:00', '18:00:00'),
(5, 2, '09:00:00', '18:00:00'),
(5, 3, '09:00:00', '18:00:00'),
(6, 4, '09:00:00', '18:00:00'),
(6, 5, '09:00:00', '18:00:00'),
(7, 1, '09:00:00', '18:00:00'),
(7, 2, '09:00:00', '18:00:00'),
(7, 3, '09:00:00', '18:00:00'),
(7, 4, '09:00:00', '18:00:00'),
(7, 5, '09:00:00', '18:00:00');


insert into work
(store_id, employee_id, weekday, start_datetime, end_datetime)
values
(1, 4, 2, '2021-06-01 17:00:00', '2021-06-01 23:59:59'),
(1, 4, 2, '2021-06-02 17:00:00', '2021-06-02 23:59:59'),
(1, 4, 2, '2021-06-07 17:00:00', '2021-06-07 23:59:59'),
(1, 4, 2, '2021-06-08 17:00:00', '2021-06-08 23:59:59'),
(1, 4, 2, '2021-06-09 17:00:00', '2021-06-09 23:59:59'),
(1, 4, 2, '2021-06-14 17:00:00', '2021-06-14 23:59:59'),
(1, 4, 2, '2021-06-15 17:00:00', '2021-06-15 23:59:59'),
(1, 4, 2, '2021-06-16 17:00:00', '2021-06-16 23:59:59'),
(1, 4, 2, '2021-06-21 17:00:00', '2021-06-21 23:59:59'),
(1, 4, 2, '2021-06-22 17:00:00', '2021-06-22 23:59:59'),
(1, 4, 2, '2021-06-23 17:00:00', '2021-06-23 23:59:59'),
(1, 4, 2, '2021-06-28 17:00:00', '2021-06-28 23:59:59'),
(1, 4, 2, '2021-06-29 17:00:00', '2021-06-29 23:59:59'),
(1, 4, 2, '2021-06-30 17:00:00', '2021-06-30 23:59:59')
;