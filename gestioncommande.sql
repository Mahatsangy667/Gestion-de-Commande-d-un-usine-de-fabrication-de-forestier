-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : jeu. 09 nov. 2023 à 06:59
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestioncommande`
--

-- --------------------------------------------------------

--
-- Structure de la table `article`
--

DROP TABLE IF EXISTS `article`;
CREATE TABLE IF NOT EXISTS `article` (
  `codeArticle` varchar(10) NOT NULL,
  `design` varchar(50) NOT NULL,
  `dimension` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT '-',
  `unite` varchar(10) NOT NULL,
  `depot` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`codeArticle`),
  KEY `depot` (`depot`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `article`
--

INSERT INTO `article` (`codeArticle`, `design`, `dimension`, `unite`, `depot`) VALUES
('Ar1p', 'ARMOIRE 1porte', '1950*500*450', 'Nombre', 'Menuiserie'),
('Ar2p', 'ARMOIRE 2portes', '1950*1000*450', 'Nombre', 'Menuiserie'),
('Ar2p bur', 'ARMOIRE de bureau', '1900*850*450', 'Nombre', 'Menuiserie'),
('Ar2p chamb', 'ARMOIRE de chambre', '1900*800*450', 'Nombre', 'Menuiserie'),
('Ar2p glc r', 'ARMOIRE glace avec Rayonnage', '1950*1300*451', 'Nombre', 'Menuiserie'),
('Ar2prayon', 'ARMOIRE 2P avec Rayonnage', '1950*1300*450', 'Nombre', 'Menuiserie'),
('Ar3p', 'ARMOIRE 3portes', '1950*1500*450', 'Nombre', 'Menuiserie'),
('Ar4p', 'ARMOIRE 4portes', '1950*2000*450', 'Nombre', 'Menuiserie'),
('B2M', 'BANC en  2M', '2000*350*450', 'Nombre', 'Menuiserie'),
('B2M30', 'BANC en 2M30', '2300*350*450', 'Nombre', 'Menuiserie'),
('B3M', 'BANC en 3 M', '3000*350*450*700', 'Nombre', 'Menuiserie'),
('B4M', 'BANC en 4M', '4000*350*450*700', 'Nombre', 'Menuiserie'),
('BCAP', 'BANC Capitonnée', '2300*350*450*750', 'Nombre', 'Menuiserie'),
('Berc', 'BERCEAU Simple', '1200*700*801', 'Nombre', 'Menuiserie'),
('Bercbascul', 'BERCEAU Basculante', '1200*700*800', 'Nombre', 'Menuiserie'),
('BUFCUIS', 'BUFFET de cuisine', '1050*1040*480', 'Nombre', 'Menuiserie'),
('BUFPTOUR', 'BUFFET a porte tournant', '1000*600*450', 'Nombre', 'Menuiserie'),
('CANAL', 'CANAPE Lit simple', '1900*600/1400*331', 'Nombre', 'Menuiserie'),
('CANAL+TIR', 'CANAPE Lit avec tiroirs', '1900*600/1400*330', 'Nombre', 'Menuiserie'),
('CANANGL', 'CANAPE D\'ANGLE', '3080*760*1950', 'Nombre', 'Menuiserie'),
('CBAUM', 'CHAISE Bauman', '900*450*450', 'Nombre', 'Menuiserie'),
('CBUR', 'CHAISE de bureau', '850*450*450', 'Nombre', 'Menuiserie'),
('CDH½LR', 'CHAISE DH ½LR', '1000*420*450', 'Nombre', 'Menuiserie'),
('CDHLR', 'CHAISE LR', '1000*420*450', 'Nombre', 'Menuiserie'),
('CDHLX', 'CHAISE DHLX', '1000*420*450', 'Nombre', 'Menuiserie'),
('CDSD', 'CHAISE DSD', '870*420*450', 'Nombre', 'Menuiserie'),
('CECOL', 'CHAISE d\'ecolier', '510*280*250', 'Nombre', 'Menuiserie'),
('Chaise', 'CHAISE LR', '1000*420*450', 'Nombre', 'Menuiserie'),
('COM3TIR', 'COMMODE 3tiroirs', '750*700*450', 'Nombre', 'Menuiserie'),
('COM4TIR', 'COMMODE 4tiroirs', '1200*1000*450', 'Nombre', 'Menuiserie'),
('COM5TIR', 'COMMODE 5tiroirs', '1300*1200*450', 'Nombre', 'Menuiserie'),
('COMCOIF', 'COMMODE Coiffeuse', '1300*1200*500', 'Nombre', 'Menuiserie'),
('CPL', 'CHAISE pliante', '930*330*330', 'Nombre', 'Menuiserie'),
('ET2TIR', 'ETAGERE avec 2 tiroirs', '1500*1200*450', 'Nombre', 'Menuiserie'),
('ETGM', 'ETAGERE de dossier GM', '2000*2000*450', 'Nombre', 'Menuiserie'),
('ETPM', 'ETAGERE de dossier PM', '1800*1200*450', 'Nombre', 'Menuiserie'),
('ETSCADGM', 'ETAGERE Scandinave GM', '2000*1800*450', 'Nombre', 'Menuiserie'),
('FAUT', 'FAUTEILLE', '800*450*320', 'Nombre', 'Menuiserie'),
('L2PLC', 'LIT 2place simple', '1900*1400*800*330', 'Nombre', 'Menuiserie'),
('L2PLC+TIR', 'LIT 2place avec tiroires', '1900*1400*800*330', 'Nombre', 'Menuiserie'),
('LBAT', 'LIT bateau 2places', '1900*1400*400*300', 'Nombre', 'Menuiserie'),
('LL2PLC+MOU', 'LIT 2place avec moustiquaire', '1900*1400*800*33', 'Nombre', 'Menuiserie'),
('LSUP1PLC', 'LIT Superposé 1place', '1900*900', 'Nombre', 'Menuiserie'),
('LSUP3PL+ES', 'LIT Superposé 3places+Escalier', '1900*1400/Esc*1500*5', 'Nombre', 'Menuiserie'),
('LSUP3PLRAY', 'Lit superposé 3places+rayonnage', '1900*1400*1850*900', 'Nombre', 'Menuiserie'),
('LSUP4PL+ES', 'LIT Superposé 4places+Escalier', '1900*1400/Echel1200*', 'Nombre', 'Menuiserie'),
('LSUPCROI', 'LIT Superposé Croisée', '2000*1900*900', 'Nombre', 'Menuiserie'),
('PERG', 'PERGOLLA', '2900*2900*2100', 'Nombre', 'Menuiserie'),
('PRV', 'Paravent', '1900*600*600*600', 'Nombre', 'Menuiserie'),
('PTHER', 'Porte vetements 8 broches', '1500*200*200', 'Nombre', 'Menuiserie'),
('PUP', 'Pupitre', '1200*500*450', 'Nombre', 'Menuiserie'),
('PV', 'Porte vetements ', '1600*250*250', 'Nombre', 'Menuiserie'),
('RCH', 'Range chaussure', '1200*900*450', 'Nombre', 'Menuiserie'),
('SAL', 'Salon  1_2_3', '850*450/900/1500', 'Nombre', 'Menuiserie'),
('TAB', 'Tabouret', '450*300*350', 'Nombre', 'Menuiserie'),
('TABBAR', 'Tabouret bar', '750*300*350', 'Nombre', 'Menuiserie'),
('TABPL', 'Tabouret pliante', '450*330*330', 'Nombre', 'Menuiserie'),
('TB', 'GUERIDON', '1200*400*450', 'Nombre', 'Menuiserie'),
('TBGM', 'Table banc GM', '1200*350*750', 'Nombre', 'Menuiserie'),
('TBPM', 'Table banc PM', '1100*320*650', 'Nombre', 'Menuiserie'),
('TBUR1', 'Table de bureau T1', '1800*900*750', 'Nombre', 'Menuiserie'),
('TBUR2', 'Table de bureau T2', '1600*800*750', 'Nombre', 'Menuiserie'),
('TBUR3', 'Table de bureau T3', '1400*750*750', 'Nombre', 'Menuiserie'),
('TBUR4', 'Table de bureau T4', '1200*650*750', 'Nombre', 'Menuiserie'),
('TCAR', 'Table Carré', '1000*1000*750', 'Nombre', 'Menuiserie'),
('TCHV', 'Table de chevet', '500*350*350', 'Nombre', 'Menuiserie'),
('TECOL', 'Table d\'ecolier', '1100*500*600', 'Nombre', 'Menuiserie'),
('THEX', 'Table Hexagone', '1200*1200*750', 'Nombre', 'Menuiserie'),
('THOC', 'Table Hoctogonale', '1200*1200*750', 'Nombre', 'Menuiserie'),
('TINDI', 'Table individuelle', '800*500*750', 'Nombre', 'Menuiserie'),
('TMASS', 'Table de massage', '2015*600*600', 'Nombre', 'Menuiserie'),
('TORD', 'Table Ordinateur', '1400*700*750', 'Nombre', 'Menuiserie'),
('TPL', 'Table Pliante', '1000*750*750', 'Nombre', 'Menuiserie'),
('TRE+RAL', 'Table rectangulaire avec ralonge', '1800/1300*800*750', 'Nombre', 'Menuiserie'),
('TRE10PERS', 'Table rectagulaire 10personnes', '2500*1000*750', 'Nombre', 'Menuiserie'),
('TRE6PERS', 'Table rectagulaire 6personnes', '1800*900*750', 'Nombre', 'Menuiserie'),
('TREC', 'Table rectangulaire ', '1200*700*750', 'Nombre', 'Menuiserie'),
('TRONCT', 'Table  Rond centrale tournante', '1500*750', 'Nombre', 'Menuiserie'),
('TTV', 'Table telé', '1000*500*450', 'Nombre', 'Menuiserie'),
('VESLL', 'Vaisselllier', '1900*940*500', 'Nombre', 'Menuiserie'),
('VNDOUB', 'Valet de nuit double', '1200*500*500', 'Nombre', 'Menuiserie'),
('VNSIMP', 'Valet de nuit simple', '1200*500', 'Nombre', 'Menuiserie');

-- --------------------------------------------------------

--
-- Structure de la table `articlecom`
--

DROP TABLE IF EXISTS `articlecom`;
CREATE TABLE IF NOT EXISTS `articlecom` (
  `numArtCom` int NOT NULL AUTO_INCREMENT,
  `quantite` int NOT NULL,
  `numCom` int NOT NULL,
  `codeArticle` varchar(10) NOT NULL,
  `quantiteALivre` int NOT NULL,
  PRIMARY KEY (`numArtCom`),
  KEY `numCom` (`numCom`,`codeArticle`),
  KEY `codeArticle` (`codeArticle`)
) ENGINE=InnoDB AUTO_INCREMENT=111 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `bonsortie`
--

DROP TABLE IF EXISTS `bonsortie`;
CREATE TABLE IF NOT EXISTS `bonsortie` (
  `numBS` int NOT NULL AUTO_INCREMENT,
  `quantiteLiv` int NOT NULL,
  `dateLiv` date NOT NULL,
  `numArtCom` int NOT NULL,
  PRIMARY KEY (`numBS`),
  KEY `numArtCom` (`numArtCom`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `codeClient` varchar(10) NOT NULL,
  `nomClient` varchar(50) NOT NULL,
  `prenomClient` varchar(50) NOT NULL,
  PRIMARY KEY (`codeClient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`codeClient`, `nomClient`, `prenomClient`) VALUES
('C0150', 'ANDRIANAIVO', ' Manjato Oel'),
('C0174', 'R WOOD', 'TRADING'),
('C0191', 'ANDRIANAMPIARIVELO', 'Nirina Nadia'),
('C0545', 'BRUNO', 'Alain Bisson'),
('C1566', 'ANDRIAKOTO', 'Norolala Jenny'),
('C1830', 'FANALAMANGA', 'ST RAVALINIAINA FERDINAND'),
('C2153', 'HARIFERA', 'Lisy'),
('C2207', 'HERIMAMPIONONA', 'Lantoniaina'),
('C2208', 'IARIZAVA', 'Oelinirina Sylviane'),
('C3121', 'MALALANANTENAINA', 'Mamisoa Adine'),
('C3141', 'MANAN\'IALA', 'Andriatsimanadidy Saona'),
('C3210', 'MAHERISOA', 'Victor'),
('C4370', 'RABESOELINA', 'Nabota Daniel'),
('C4458', 'RABEMANANJARA', 'Soalahasa'),
('C4480', 'RALAIHERY', 'Jean Baptiste'),
('C4501', 'RAFALIMALALA', 'Odile'),
('C4508', 'RAFIDIARINOSY', 'Sophie'),
('C4509', 'RAFIDISAONA', 'Andonilaina Nicolas'),
('C4525', 'RAFARAMIHANTA', 'Vololoniaina');

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

DROP TABLE IF EXISTS `commande`;
CREATE TABLE IF NOT EXISTS `commande` (
  `numCom` int NOT NULL AUTO_INCREMENT,
  `numRef` varchar(25) NOT NULL,
  `typeRef` varchar(20) NOT NULL,
  `dateCom` date NOT NULL,
  `statut` varchar(20) NOT NULL,
  `nombreArticle` int NOT NULL,
  `codeClient` varchar(10) NOT NULL,
  PRIMARY KEY (`numCom`),
  KEY `codeClient` (`codeClient`),
  KEY `typeRef` (`typeRef`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `depot`
--

DROP TABLE IF EXISTS `depot`;
CREATE TABLE IF NOT EXISTS `depot` (
  `depot` varchar(10) NOT NULL,
  PRIMARY KEY (`depot`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `depot`
--

INSERT INTO `depot` (`depot`) VALUES
('Menuiserie'),
('Scierie');

-- --------------------------------------------------------

--
-- Structure de la table `loginadmin`
--

DROP TABLE IF EXISTS `loginadmin`;
CREATE TABLE IF NOT EXISTS `loginadmin` (
  `Matricule` varchar(15) NOT NULL,
  `Anarana_feno` varchar(150) NOT NULL,
  `cin` varchar(12) NOT NULL,
  `password` varchar(15) NOT NULL,
  PRIMARY KEY (`Matricule`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `loginadmin`
--

INSERT INTO `loginadmin` (`Matricule`, `Anarana_feno`, `cin`, `password`) VALUES
('1234', 'RAJOELISON Mahatsanginohary', '314011047934', '1234');

-- --------------------------------------------------------

--
-- Structure de la table `ordrefab`
--

DROP TABLE IF EXISTS `ordrefab`;
CREATE TABLE IF NOT EXISTS `ordrefab` (
  `numOrdFab` int NOT NULL AUTO_INCREMENT,
  `numArtCom` int NOT NULL,
  `numDevis` varchar(50) NOT NULL,
  `delaiFab` int NOT NULL,
  PRIMARY KEY (`numOrdFab`),
  KEY `numArtCom` (`numArtCom`),
  KEY `numArtCom_2` (`numArtCom`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personnel`
--

DROP TABLE IF EXISTS `personnel`;
CREATE TABLE IF NOT EXISTS `personnel` (
  `numMatricule` varchar(10) NOT NULL,
  `nomEmp` varchar(50) NOT NULL,
  `prenomEmp` varchar(50) NOT NULL,
  `nomPoste` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`numMatricule`),
  KEY `poste` (`nomPoste`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `personnelassigne`
--

DROP TABLE IF EXISTS `personnelassigne`;
CREATE TABLE IF NOT EXISTS `personnelassigne` (
  `numPersAssigne` int NOT NULL AUTO_INCREMENT,
  `numOrdFab` int NOT NULL,
  `numMatricule` varchar(10) NOT NULL,
  PRIMARY KEY (`numPersAssigne`),
  KEY `numOrdFab` (`numOrdFab`,`numMatricule`),
  KEY `numMatricule` (`numMatricule`)
) ENGINE=InnoDB AUTO_INCREMENT=227 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `poste`
--

DROP TABLE IF EXISTS `poste`;
CREATE TABLE IF NOT EXISTS `poste` (
  `nomPoste` varchar(10) NOT NULL,
  PRIMARY KEY (`nomPoste`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `poste`
--

INSERT INTO `poste` (`nomPoste`) VALUES
('Finisseur'),
('Machiniste'),
('Menuisier'),
('Ponceur'),
('Vernisseur');

-- --------------------------------------------------------

--
-- Structure de la table `reference`
--

DROP TABLE IF EXISTS `reference`;
CREATE TABLE IF NOT EXISTS `reference` (
  `typeRef` varchar(10) NOT NULL,
  PRIMARY KEY (`typeRef`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `reference`
--

INSERT INTO `reference` (`typeRef`) VALUES
('BC'),
('DP');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `article`
--
ALTER TABLE `article`
  ADD CONSTRAINT `article_ibfk_1` FOREIGN KEY (`depot`) REFERENCES `depot` (`depot`);

--
-- Contraintes pour la table `articlecom`
--
ALTER TABLE `articlecom`
  ADD CONSTRAINT `articlecom_ibfk_1` FOREIGN KEY (`codeArticle`) REFERENCES `article` (`codeArticle`),
  ADD CONSTRAINT `articlecom_ibfk_2` FOREIGN KEY (`numCom`) REFERENCES `commande` (`numCom`);

--
-- Contraintes pour la table `bonsortie`
--
ALTER TABLE `bonsortie`
  ADD CONSTRAINT `bonsortie_ibfk_1` FOREIGN KEY (`numArtCom`) REFERENCES `articlecom` (`numArtCom`);

--
-- Contraintes pour la table `commande`
--
ALTER TABLE `commande`
  ADD CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`codeClient`) REFERENCES `client` (`codeClient`),
  ADD CONSTRAINT `commande_ibfk_2` FOREIGN KEY (`typeRef`) REFERENCES `reference` (`typeRef`);

--
-- Contraintes pour la table `ordrefab`
--
ALTER TABLE `ordrefab`
  ADD CONSTRAINT `ordrefab_ibfk_1` FOREIGN KEY (`numArtCom`) REFERENCES `articlecom` (`numArtCom`);

--
-- Contraintes pour la table `personnel`
--
ALTER TABLE `personnel`
  ADD CONSTRAINT `personnel_ibfk_1` FOREIGN KEY (`nomPoste`) REFERENCES `poste` (`nomPoste`);

--
-- Contraintes pour la table `personnelassigne`
--
ALTER TABLE `personnelassigne`
  ADD CONSTRAINT `personnelassigne_ibfk_1` FOREIGN KEY (`numMatricule`) REFERENCES `personnel` (`numMatricule`),
  ADD CONSTRAINT `personnelassigne_ibfk_2` FOREIGN KEY (`numOrdFab`) REFERENCES `ordrefab` (`numOrdFab`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
