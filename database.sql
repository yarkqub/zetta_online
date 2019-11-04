/*
Navicat MySQL Data Transfer

Source Server         : HTML5
Source Server Version : 50505
Source Host           : localhost:3306
Source Database       : html5

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2019-11-05 00:02:02
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for furnis
-- ----------------------------
DROP TABLE IF EXISTS `furnis`;
CREATE TABLE `furnis` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT 0,
  `x` int(11) DEFAULT 0,
  `y` int(11) DEFAULT 0,
  `rstate` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of furnis
-- ----------------------------
INSERT INTO `furnis` VALUES ('1', '1', '1', '1', '9', '1', '0');
INSERT INTO `furnis` VALUES ('2', '1', '1', '0', '5', '1', '0');
INSERT INTO `furnis` VALUES ('3', '1', '1', '11', '13', '1', '0');
INSERT INTO `furnis` VALUES ('4', '1', '1', '11', '10', '1', '0');
INSERT INTO `furnis` VALUES ('5', '1', '1', '11', '14', '2', '0');
INSERT INTO `furnis` VALUES ('6', '1', '1', '2', '1', '9', '0');
INSERT INTO `furnis` VALUES ('7', '1', '1', '2', '1', '7', '0');
INSERT INTO `furnis` VALUES ('8', '1', '1', '2', '1', '8', '0');
INSERT INTO `furnis` VALUES ('9', '1', '1', '2', '1', '5', '0');
INSERT INTO `furnis` VALUES ('10', '1', '1', '2', '5', '6', '0');
INSERT INTO `furnis` VALUES ('11', '1', '1', '2', '1', '2', '0');
INSERT INTO `furnis` VALUES ('12', '1', '1', '11', '223', '2', '0');
INSERT INTO `furnis` VALUES ('13', '1', '1', '2', '7', '2', '0');
INSERT INTO `furnis` VALUES ('14', '1', '1', '2', '6', '4', '0');
INSERT INTO `furnis` VALUES ('15', '1', '1', '11', '6', '0', '0');
INSERT INTO `furnis` VALUES ('16', '1', '1', '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('17', '1', '1', '0', '0', '1', '0');
INSERT INTO `furnis` VALUES ('18', '2', '1', '0', '3', '7', '0');
INSERT INTO `furnis` VALUES ('19', '1', '1', '0', '0', '2', '0');
INSERT INTO `furnis` VALUES ('20', '1', '1', '0', '0', '9', '0');
INSERT INTO `furnis` VALUES ('21', '1', '1', '0', '0', '8', '0');
INSERT INTO `furnis` VALUES ('22', '6', '1', '9', '7', '1', '0');
INSERT INTO `furnis` VALUES ('23', '6', '1', '9', '7', '1', '0');
INSERT INTO `furnis` VALUES ('24', '6', '1', '9', '6', '1', '0');
INSERT INTO `furnis` VALUES ('25', '6', '1', '9', '2', '5', '0');
INSERT INTO `furnis` VALUES ('26', '1', '2', '0', '0', '3', '0');
INSERT INTO `furnis` VALUES ('27', '1', '2', '2', '4', '2', '0');
INSERT INTO `furnis` VALUES ('28', '1', '3', '2', '4', '9', '0');
INSERT INTO `furnis` VALUES ('29', '1', null, '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('30', '1', null, '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('31', '1', null, '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('32', '1', null, '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('33', '1', '2', '2', '8', '6', '0');
INSERT INTO `furnis` VALUES ('34', '1', '2', '2', '8', '7', '0');
INSERT INTO `furnis` VALUES ('35', '1', '2', '2', '6', '5', '0');
INSERT INTO `furnis` VALUES ('36', '1', '2', '2', '7', '6', '0');
INSERT INTO `furnis` VALUES ('37', '1', '2', '2', '0', '10', '0');
INSERT INTO `furnis` VALUES ('38', '1', '2', '0', '0', '4', '0');
INSERT INTO `furnis` VALUES ('39', '1', '2', '11', '14', '1', '0');
INSERT INTO `furnis` VALUES ('40', '1', '2', '11', '5', '0', '0');
INSERT INTO `furnis` VALUES ('41', '2', '2', '6', '10', '9', '0');
INSERT INTO `furnis` VALUES ('42', '1', '3', '0', '2', '1', '0');
INSERT INTO `furnis` VALUES ('43', '1', '3', '0', '0', '4', '0');
INSERT INTO `furnis` VALUES ('44', '4', '4', '10', '2', '5', '0');
INSERT INTO `furnis` VALUES ('45', '4', '4', '10', '1', '6', '0');
INSERT INTO `furnis` VALUES ('46', '1', '4', '1', '3', '4', '1');
INSERT INTO `furnis` VALUES ('47', '4', '1', '10', '3', '7', '0');
INSERT INTO `furnis` VALUES ('48', '2', '4', '0', '3', '8', '0');
INSERT INTO `furnis` VALUES ('49', '11', '2', '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('50', '12', '2', '14', '1', '0', '0');
INSERT INTO `furnis` VALUES ('51', '12', '2', '14', '9', '1', '0');
INSERT INTO `furnis` VALUES ('52', '12', '2', '14', '9', '0', '0');
INSERT INTO `furnis` VALUES ('53', '12', '2', '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('54', '12', '2', '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('55', '12', '2', '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('56', '12', '2', '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('57', '12', '2', '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('58', '12', '2', '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('59', '12', '2', '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('60', '12', '2', '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('61', '12', '2', '0', '0', '0', '0');
INSERT INTO `furnis` VALUES ('62', '1', '4', '2', '4', '7', '0');

-- ----------------------------
-- Table structure for items
-- ----------------------------
DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `state` enum('0','1','2') DEFAULT '0' COMMENT '0 = Not walkable, 1 = walkable, 2 = sit',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of items
-- ----------------------------
INSERT INTO `items` VALUES ('1', 'Ice Cube', 'first_item.png', '0');
INSERT INTO `items` VALUES ('2', 'Loading Box', 'loading_box.png', '0');
INSERT INTO `items` VALUES ('3', 'Red Tv', 'red_tv_1.png,red_tv_2.png', '0');
INSERT INTO `items` VALUES ('4', 'Blue Tv', 'blue_tv_1.png,blue_tv_2.png', '0');

-- ----------------------------
-- Table structure for rooms
-- ----------------------------
DROP TABLE IF EXISTS `rooms`;
CREATE TABLE `rooms` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `maps` text DEFAULT NULL,
  `door` varchar(255) DEFAULT '0,0',
  `public` enum('0','1') DEFAULT '0',
  `color` varchar(255) DEFAULT '#C8EFC9',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of rooms
-- ----------------------------
INSERT INTO `rooms` VALUES ('1', 'Welcome Lounge', '1', '0,1,1,1,1,1,1,1,1,1,1#0,1,1,1,1,1,1,1,1,1,1#0,1,1,1,1,1,1,1,1,1,1#0,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#0,1,1,1,1,1,1,1,1,1,1#0,1,1,1,1,1,1,1,1,1,1#0,1,1,1,1,1,1,1,1,1,1#0,1,1,1,1,1,1,1,1,1,1#0,1,1,1,1,1,1,1,1,1,1', '4,0', '1', '#C8EFC9');
INSERT INTO `rooms` VALUES ('2', 'Room 2', '1', '1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#', '10,0', '0', '#919148');
INSERT INTO `rooms` VALUES ('3', 'newrumz', '1', '1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#', '0,0', '0', '#ff8000');
INSERT INTO `rooms` VALUES ('4', 'forthnite', '1', '1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#', '0,0', '0', '#C8EFC9');
INSERT INTO `rooms` VALUES ('5', 'fifthnite', '1', '1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#', '0,0', '0', '#000080');
INSERT INTO `rooms` VALUES ('6', 'Yarkqub Room', '2', '1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#', '0,0', '0', '#C8EFC9');
INSERT INTO `rooms` VALUES ('7', 'Room Mate', '1', '1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1,1#', '10,0', '0', '#000000');
INSERT INTO `rooms` VALUES ('8', 'treebytree', '1', '1,1,1#1,1,1#1,1,1#', '2,1', '0', '#8a8a8a');
INSERT INTO `rooms` VALUES ('9', 'muchub', '6', '1,1,1,1,1,1,1#1,1,1,1,1,1,1#1,1,1,1,1,1,1#1,1,1,1,1,1,1#1,1,1,1,1,1,1#1,1,1,1,1,1,1#1,1,1,1,1,1,1#1,1,1,1,1,1,1#1,1,1,1,1,1,1#1,1,1,1,1,1,1#', '0,0', '0', '#C8EFC9');
INSERT INTO `rooms` VALUES ('10', 'ayam', '4', '1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#', '0,0', '0', '#000080');
INSERT INTO `rooms` VALUES ('11', 'long house', '1', '1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#1,1,1#', '0,0', '0', '#C8EFC9');
INSERT INTO `rooms` VALUES ('14', 'Guest Testing', '12', '1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#1,1,1,1,1,1,1,1,1,1#', '0,0', '0', '#C8EFC9');

-- ----------------------------
-- Table structure for shop_items
-- ----------------------------
DROP TABLE IF EXISTS `shop_items`;
CREATE TABLE `shop_items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fid` int(11) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,0) DEFAULT NULL,
  `pid` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of shop_items
-- ----------------------------
INSERT INTO `shop_items` VALUES ('1', '1', 'Ice Cube', '3', '1');
INSERT INTO `shop_items` VALUES ('2', '1', 'Expensive Ice', '5000', '1');
INSERT INTO `shop_items` VALUES ('3', '2', 'Loading Box', '5', '1');
INSERT INTO `shop_items` VALUES ('4', '3', 'Red Tv 1', '4', '1');
INSERT INTO `shop_items` VALUES ('5', '4', 'Blue Tv 2', '4', '1');

-- ----------------------------
-- Table structure for shop_pages
-- ----------------------------
DROP TABLE IF EXISTS `shop_pages`;
CREATE TABLE `shop_pages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `order` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of shop_pages
-- ----------------------------
INSERT INTO `shop_pages` VALUES ('1', 'General', '1');
INSERT INTO `shop_pages` VALUES ('2', 'Beta Item', '2');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `socket` varchar(255) DEFAULT NULL,
  `skin` varchar(255) DEFAULT 'spaghetti_atlas_01',
  `credits` decimal(10,0) unsigned NOT NULL DEFAULT 1000,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'Akob', '$2b$10$lHLpcR6Qddy5mChqM2HkbuZ9X78dnrHkb7EFbfRkJfIDkLEhgpNN6', 'myarkqub@gmail.com', null, 'unicorn_atlas_02', '849');
INSERT INTO `users` VALUES ('2', 'Yarkqub', '$2b$10$gWMyT7e6PA77vF5Znec6m.Xr5bo0iACxFCs10dmCotGQmgFMSj0Sa', 'akob@zetta-hotel.com', null, 'unicorn_atlas_04', '988');
INSERT INTO `users` VALUES ('3', 'Akob1', '$2b$10$RRdL1YOaBEoao/M3Qi0dsuXo2ZpBp8P8lweIwkCKisJ4ekzUg/RIm', 'akob1@zetta-hotel.com', null, 'spaghetti_atlas_01', '1000');
INSERT INTO `users` VALUES ('4', 'Wave', '$2b$10$UnhHKd6ZbrsnZD/WEjDAU.urjN2L840vqO4fliDCFnnHzzca/HsHi', 'tricksties99@gmail.com', null, 'spaghetti_atlas_01', '989');
INSERT INTO `users` VALUES ('5', 'abu', '$2b$10$sCFM..abytxq.CaygYsw5ePReTfvJZj9VaxHaPQt4n8jhlFinKqA2', 'adindaramlie123@gmail.com', null, 'spaghetti_atlas_01', '1000');
INSERT INTO `users` VALUES ('6', 'Musab', '$2b$10$Pr4mPUu/MdwDLyf27.vWGeYb6Y8ZanOoyhFQcISXoh9alfSdArHhC', 'musab@gmail.com', null, 'spaghetti_atlas_01', '988');
INSERT INTO `users` VALUES ('7', 'Lilith', '$2b$10$lWqoU9k5YvDUZCwC/7a9tOyBOH.IGgNWU.OY9MPySQMaXyDYX756u', 'Lilith3232@hotmail.com', null, 'spaghetti_atlas_01', '1000');
INSERT INTO `users` VALUES ('8', 'wahidah', '$2b$10$hAeYJR5ndq8/M8Q9smX3NeJtDebeyCsEZkaZ6GarTIxwJCplBFrwW', 'wahidah@zetta-hotel.com', null, 'spaghetti_atlas_01', '1000');
INSERT INTO `users` VALUES ('9', 'akob2', '$2b$10$q9umNd/t911Xy0bZ/WQxjePnywZTbuhbEsKUF5slj4P.tvYe1//AK', 'akob2@gundam.com', null, 'spaghetti_atlas_01', '1000');
INSERT INTO `users` VALUES ('10', 'akob3', '$2b$10$71GRZvoMIDY0cZTWq8byLuJNK3QZjnWPo2mphWwySp9r31wkq.HMK', 'akob3@zetta-hotel.com', null, 'spaghetti_atlas_01', '1000');
INSERT INTO `users` VALUES ('11', 'Neo', '$2b$10$dKgvmnkmYHY/xvtP1u8e3ePOH8d5xb1S5gjBYqLIfs8pBr2v8nnq6', 'ghostjex1432@gmail.com', null, 'unicorn_atlas_03', '995');
INSERT INTO `users` VALUES ('12', 'Fatkul', '$2b$10$QipOxxkrMXkOq5GhFcM6QOyQoA0Z2qCG5DEKKjuxIhLh8RZM93nAO', 'rlnxch@gmail.com', null, 'spaghetti_atlas_01', '940');
