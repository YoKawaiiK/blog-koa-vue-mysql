-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_koa_learn
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `message` varchar(1000) DEFAULT NULL,
  `color` int DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (115,62,'1',NULL,'2020-09-16 13:02:13'),(116,62,'1',NULL,'2020-09-16 14:49:13'),(117,62,'2ggggggggggggggggggggg',NULL,'2020-09-16 14:49:13'),(118,62,'3',NULL,'2020-09-16 14:49:13'),(119,62,'4',NULL,'2020-09-16 14:49:13'),(120,62,'5',NULL,'2020-09-16 14:49:13'),(121,62,'6',NULL,'2020-09-16 14:49:13'),(122,62,'7',NULL,'2020-09-16 14:49:13'),(123,62,'8',NULL,'2020-09-16 14:49:13'),(124,62,'9',NULL,'2020-09-16 14:49:13'),(125,62,'10',NULL,'2020-09-16 14:49:13'),(126,62,'11',NULL,'2020-09-16 14:49:13'),(127,62,'12',NULL,'2020-09-16 14:49:13'),(128,62,'13',NULL,'2020-09-16 14:49:13'),(129,62,'14',NULL,'2020-09-16 14:49:13'),(130,62,'15',NULL,'2020-09-16 14:49:13'),(131,62,'16',NULL,'2020-09-16 14:49:13'),(132,62,'17',NULL,'2020-09-16 14:49:13'),(133,62,'18',NULL,'2020-09-16 14:49:13'),(134,62,'19',NULL,'2020-09-16 14:49:13'),(136,62,'2222222222222222222222',NULL,'2020-09-16 16:38:21'),(137,62,'33333333333333333333333333333333333',NULL,'2020-09-16 16:38:35'),(138,62,'10000000000000000000000',NULL,'2020-09-16 16:58:37'),(139,62,'state.totalPosts',NULL,'2020-09-16 17:00:19'),(140,62,'state.totalPostsstate.totalPosts',NULL,'2020-09-16 17:01:59'),(142,62,'koklolokoko',NULL,'2020-09-16 17:03:30'),(149,62,'ыврыврвоваоваоаво',NULL,'2020-09-16 17:09:48'),(150,62,'ыврыврвоваоваоаво',NULL,'2020-09-16 17:09:56');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL,
  `confirm` tinyint DEFAULT '0',
  `signin_data` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,NULL,'11111111','1',0,'2020-09-12 16:08:13'),(62,'root','root','$2b$10$CSPXCkHVFovBeYl2Ghdo/uajQ3MUAn177eHLwtF0goCj6JYmLtGrK',1,'2020-09-13 05:33:41');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-18 17:41:37
