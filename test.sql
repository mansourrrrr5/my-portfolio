-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Erstellungszeit: 28. Jul 2023 um 09:58
-- Server-Version: 10.3.31-MariaDB-0ubuntu0.20.04.1
-- PHP-Version: 8.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `ProduktivDB`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `rechte` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `auth_code` varchar(255) DEFAULT NULL,
  `last_login` varchar(255) DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `analyse` (
  `analyseId` int(11) NOT NULL,
  `istWerteAU` longtext DEFAULT '0',
  `istWerteAG` longtext DEFAULT '0',
  `istWertePT` longtext NOT NULL DEFAULT '0',
  `istWertePD` longtext NOT NULL DEFAULT '0',
  `gesamtMengeAU` varchar(255) DEFAULT '0',
  `differenzGoldmenge` varchar(255) DEFAULT NULL,
  `gesamtMengeAG` varchar(255) DEFAULT '0',
  `gesamtMengePT` varchar(255) NOT NULL DEFAULT '0',
  `gesamtMengePD` varchar(255) NOT NULL DEFAULT '0',
  `analyseWirdVon` longtext DEFAULT NULL,
  `DifferenzWirdAn` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE `authentications` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `auth_code` int(11) DEFAULT NULL,
  `isVerified` tinyint(4) DEFAULT NULL,
  `verified_at` datetime DEFAULT NULL,
  `type` enum('shop','anlag','spark') DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE `bank_information` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `order_id` int(11) DEFAULT NULL,
  `bank_title` varchar(255) DEFAULT NULL,
  `account_numb` varchar(255) DEFAULT NULL,
  `iban` varchar(255) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `bestellungpg` (
  `id` int(11) NOT NULL,
  `idpg` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `g_summe` varchar(255) NOT NULL,
  `Stueckelung` varchar(255) NOT NULL,
  `Versandadresse` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `blogs` (
  `blog_id` int(11) NOT NULL,
  `blog_uid` varchar(255) DEFAULT NULL,
  `blog_title` varchar(255) DEFAULT NULL,
  `blog_writer` varchar(255) DEFAULT NULL,
  `blog_date` varchar(255) DEFAULT NULL,
  `blog_seo_text` text DEFAULT NULL,
  `blog_content` text DEFAULT NULL,
  `image_1` varchar(255) DEFAULT NULL,
  `image_2` varchar(255) DEFAULT NULL,
  `image_3` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `contacts` (
  `contact_id` int(11) NOT NULL,
  `vorname` varchar(255) DEFAULT NULL,
  `nachname` varchar(255) DEFAULT NULL,
  `firmaName` varchar(255) DEFAULT NULL,
  `telefonnummer` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE `dhl_api` (
  `id` int(11) NOT NULL,
  `trackingNumber` varchar(255) DEFAULT NULL,
  `json_data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`json_data`)),
  `created_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `dockumente`
--

CREATE TABLE `dockumente` (
  `id` int(11) NOT NULL,
  `datum` varchar(255) DEFAULT NULL,
  `id_client` varchar(255) DEFAULT NULL,
  `dok_art` varchar(255) DEFAULT NULL,
  `info_file` text DEFAULT NULL,
  `file_pdf` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
CREATE TABLE `drehungen` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `infos` longtext DEFAULT NULL,
  `analyse_status` varchar(255) DEFAULT NULL,
  `analyseId` varchar(255) DEFAULT NULL,
  `istGuthaben` varchar(255) DEFAULT NULL,
  `clientID` varchar(255) DEFAULT NULL,
  `guthabenInfos` longtext DEFAULT NULL,
  `files` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb
CREATE TABLE `goldlieferung` (
  `id` int(11) NOT NULL,
  `kundenId` varchar(255) NOT NULL,
  `lieferscheinNr` varchar(255) NOT NULL,
  `kundeName` varchar(255) NOT NULL,
  `kundeNummer` varchar(255) NOT NULL,
  `lieferscheinDatum` varchar(255) NOT NULL,
  `lieferscheinDatei` varchar(255) NOT NULL,
  `lieferungPlan` varchar(255) NOT NULL,
  `gesamtGewicht` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `gold_api_reponses` (
  `id` int(11) NOT NULL,
  `timestamp` timestamp NULL DEFAULT NULL,
  `metal` varchar(255) DEFAULT NULL,
  `currency` varchar(255) DEFAULT NULL,
  `exchange` varchar(255) DEFAULT NULL,
  `symbol` varchar(255) DEFAULT NULL,
  `prev_close_price` float DEFAULT NULL,
  `open_price` float DEFAULT NULL,
  `low_price` float DEFAULT NULL,
  `high_price` float DEFAULT NULL,
  `open_time` varchar(255) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `ch` float DEFAULT NULL,
  `chp` float DEFAULT NULL,
  `ask` float DEFAULT NULL,
  `bid` float DEFAULT NULL,
  `price_gram_24k` double DEFAULT NULL,
  `price_gram_22k` double DEFAULT NULL,
  `price_gram_21k` double DEFAULT NULL,
  `price_gram_20k` double DEFAULT NULL,
  `price_gram_18k` double DEFAULT NULL,
  `createt_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
CREATE TABLE `guthaben` (
  `id` int(11) NOT NULL,
  `date` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `clientId` longtext DEFAULT NULL,
  `mengeInGramm` varchar(255) DEFAULT NULL,
  `mengeInGrammAg` varchar(255) DEFAULT '0',
  `mengeInGrammPt` varchar(255) DEFAULT NULL,
  `mengeInGrammPd` varchar(255) DEFAULT NULL,
  `kurs` varchar(255) DEFAULT NULL,
  `gesamtBetrag` varchar(255) DEFAULT NULL,
  `gesamtMengeAU` varchar(255) DEFAULT NULL,
  `gesamtMengeAG` varchar(255) DEFAULT NULL,
  `gesamtMengePT` varchar(255) DEFAULT NULL,
  `gesamtMengePD` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- -----------------------------------------

CREATE TABLE `kassenbuch` (
  `EintragID` int(11) NOT NULL,
  `Datum` varchar(255) DEFAULT NULL,
  `Transaktionstyp` varchar(255) DEFAULT NULL,
  `kassebestand` varchar(255) DEFAULT NULL,
  `Rechnungsbetrag` varchar(255) DEFAULT NULL,
  `Rechnungsaussteller` varchar(255) DEFAULT NULL,
  `Verwendungszweck` varchar(255) DEFAULT NULL,
  `details` varchar(255) DEFAULT NULL,
  `Mitarbeiter` varchar(255) DEFAULT NULL,
  `Rechnungsdatei` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE `kunden` (
  `kundenId` int(11) NOT NULL,
  `username` varchar(50) DEFAULT NULL,
  `vorname` varchar(50) DEFAULT NULL,
  `nachname` varchar(50) DEFAULT NULL,
  `geburtsdatum` date DEFAULT current_timestamp(),
  `adresse` varchar(50) DEFAULT NULL,
  `plz` varchar(50) DEFAULT NULL,
  `stadt` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `telefonnummer` varchar(50) DEFAULT NULL,
  `passwort` longtext DEFAULT NULL,
  `bank` varchar(255) DEFAULT NULL,
  `iban` varchar(100) DEFAULT NULL,
  `bic` varchar(100) DEFAULT NULL,
  `firmenname` varchar(100) DEFAULT NULL,
  `rechtsform` varchar(100) DEFAULT NULL,
  `handelsregister` varchar(100) DEFAULT NULL,
  `steuernummer` varchar(100) DEFAULT NULL,
  `ausweisDok` varchar(255) DEFAULT NULL,
  `handelsregisterFoto` varchar(255) DEFAULT NULL,
  `ausweisNr` varchar(255) DEFAULT NULL,
  `marge` varchar(255) DEFAULT NULL,
  `kStatus` varchar(100) DEFAULT NULL,
  `role` varchar(100) DEFAULT NULL,
  `email_hash` varchar(255) DEFAULT NULL,
  `vermittler_pin` varchar(255) DEFAULT NULL,
  `istUnterVermittlerPin` varchar(255) DEFAULT NULL,
  `unter_vermittler_id` varchar(255) DEFAULT NULL,
  `anmeldDatum` date DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



CREATE TABLE `lieferscheine` (
  `id` int(11) NOT NULL,
  `lieferscheinNr` varchar(255) DEFAULT NULL,
  `kurier` varchar(255) DEFAULT NULL,
  `kurierDatei` varchar(255) DEFAULT NULL,
  `kundenId` varchar(255) DEFAULT NULL,
  `datum` varchar(255) DEFAULT NULL,
  `lieferscheinInfos` varchar(255) DEFAULT NULL,
  `gesamtGewicht` varchar(255) DEFAULT NULL,
  `lieferscheinDatei` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `offers` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `metalName` varchar(255) DEFAULT NULL,
  `metalPrice` varchar(255) DEFAULT NULL,
  `metalQuantity` varchar(255) DEFAULT NULL,
  `metalTotalPrice` varchar(255) DEFAULT NULL,
  `offer_amount` varchar(255) DEFAULT NULL,
  `status` enum('pending','accepted','rejected') DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `txn_id` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `total_amount` float DEFAULT NULL,
  `rabatte` varchar(255) DEFAULT '0',
  `billing_id` int(11) DEFAULT NULL,
  `shipping_id` int(11) DEFAULT NULL,
  `is_guest` tinyint(4) DEFAULT NULL,
  `isRequest` tinyint(4) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `type` enum('shop','anlag','spark','ziel_spark','sell_gold','depot','report','gold_gold','gold_geld','gold_gold_geld','uberweisung') DEFAULT NULL,
  `plan_info` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`plan_info`)),
  `ankauf_infos` longtext NOT NULL DEFAULT '{"ankaufGold":"0","verarbeitungspreis":"0","nkurs":"0","vkurs":"0","ankaufSummeEur":"0","zahlungStatus":"","hersteller":""}',
  `gold_gold` longtext DEFAULT NULL,
  `gold_geld` longtext DEFAULT NULL,
  `gold_gold_geld` longtext DEFAULT NULL,
  `payments` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
  `uberweisung` longtext DEFAULT NULL,
  `isOffered` tinyint(4) DEFAULT 0,
  `offered_at` datetime DEFAULT NULL,
  `responded_at` datetime DEFAULT NULL,
  `offer_status` enum('pending','accepted','rejected') DEFAULT 'accepted',
  `status` enum('pending','accepted','rejected','completed') DEFAULT 'pending',
  `tracking_code` varchar(255) DEFAULT NULL,
  `analyse_status` varchar(255) DEFAULT NULL,
  `analyseId` varchar(255) DEFAULT NULL,
  `guthaben` longtext DEFAULT NULL,
  `rechnung` longtext DEFAULT NULL,
  `aufloesung` longtext DEFAULT NULL,
  `aufloesungFiles` longtext DEFAULT NULL,
  `orderFile` varchar(255) DEFAULT NULL,
  `orderFiles` longtext DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `produktName` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `amount` float DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `created_at` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `paypal_subscriptions` (
  `id` int(11) NOT NULL,
  `subs_id` varchar(255) DEFAULT NULL,
  `amount` int(11) DEFAULT NULL,
  `status` tinyint(4) DEFAULT 1,
  `create_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
CREATE TABLE `produkt` (
  `produktId` int(11) NOT NULL,
  `produktUid` varchar(255) DEFAULT NULL,
  `produktName` varchar(255) DEFAULT NULL,
  `beschreibung` text DEFAULT NULL,
  `referenz` varchar(255) DEFAULT NULL,
  `inventor` varchar(255) DEFAULT NULL,
  `hersteller` varchar(255) NOT NULL,
  `gewicht` varchar(255) DEFAULT NULL,
  `kategorie` varchar(255) DEFAULT NULL,
  `versandkosten` varchar(255) DEFAULT NULL,
  `handleraufschlag` varchar(255) DEFAULT NULL,
  `zusatzInfos` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `image_2` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `produkt_geber` (
  `produktGeberId` int(11) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `kundenArt` varchar(255) DEFAULT NULL,
  `ID_inv24` varchar(255) DEFAULT NULL,
  `firmaname` varchar(255) DEFAULT NULL,
  `ansprechpatner` varchar(255) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `website_url` varchar(255) DEFAULT NULL,
  `vertragDatei` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `promo_codes` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `value` varchar(255) NOT NULL,
  `expiration_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--CREATE TABLE `promo_usage` (
  `id` int(11) NOT NULL,
  `user_id` varchar(255) NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `promo_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `pwdreset`
--

CREATE TABLE `pwdreset` (
  `pwdResetId` int(11) NOT NULL,
  `pwdResetEmail` text NOT NULL,
  `pwdResetSelector` text NOT NULL,
  `pwdResetToken` longtext NOT NULL,
  `pwdResetExpires` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `pwdreset`
CREATE TABLE `rechner` (
  `id` int(11) NOT NULL,
  `kursMarge` text DEFAULT NULL,
  `margeAnkaufPrivat` text DEFAULT NULL,
  `margeAnkaufGeschaft` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `seo` (
  `seo_id` int(11) NOT NULL,
  `seo_title` varchar(255) NOT NULL,
  `seo_writer` varchar(255) NOT NULL,
  `seo_link` varchar(255) NOT NULL,
  `seo_date` varchar(255) NOT NULL,
  `seo_text` text NOT NULL,
  `seo_image` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `stellen_angebote`
--

CREATE TABLE `stellen_angebote` (
  `stelle_id` int(11) NOT NULL,
  `stelle_name` varchar(100) DEFAULT NULL,
  `stelle_ort` varchar(50) DEFAULT NULL,
  `stelle_art` text DEFAULT NULL,
  `stelle_startDatum` varchar(50) DEFAULT NULL,
  `stelle_desc` text DEFAULT NULL,
  `stelle_brut_lohn` varchar(50) DEFAULT NULL,
  `stelle_profil` text DEFAULT NULL,
  `stelle_bieten` text DEFAULT NULL,
  `stelle_ap` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `verarbeitungsrechnungen` (
  `id` int(11) NOT NULL,
  `kundeNummer` varchar(255) DEFAULT NULL,
  `kundenAdresse` varchar(255) DEFAULT NULL,
  `investalAdresse` varchar(255) DEFAULT NULL,
  `datum` varchar(255) DEFAULT NULL,
  `rechnungInfos` longtext DEFAULT NULL,
  `gesamtbetrag` varchar(255) DEFAULT NULL,
  `rechnungDatei` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `waren` (
  `Produkt_ID` int(11) NOT NULL,
  `Produktname` varchar(50) NOT NULL,
  `Kategorie` varchar(50) NOT NULL,
  `Hersteller` varchar(50) NOT NULL,
  `Beschreibung` varchar(50) NOT NULL,
  `gekauftepreis` varchar(50) NOT NULL,
  `Lagerbestand` varchar(255) NOT NULL,
  `BareCodeNr` varchar(255) NOT NULL,
  `Rechnung` varchar(255) NOT NULL,
  `Mitarbeiter` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


CREATE TABLE `waren_details` (
  `warenDetailsId` int(11) NOT NULL,
  `warenProduktId` varchar(50) NOT NULL,
  `warenReferenz` varchar(50) NOT NULL,
  `warenStatus` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `analyse`
--
ALTER TABLE `analyse`
  ADD PRIMARY KEY (`analyseId`);

--
-- Indizes für die Tabelle `authentications`
--
ALTER TABLE `authentications`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `bank_information`
--
ALTER TABLE `bank_information`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `bestellungpg`
--
ALTER TABLE `bestellungpg`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`blog_id`);

--
-- Indizes für die Tabelle `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`contact_id`);

--
-- Indizes für die Tabelle `dhl_api`
--
ALTER TABLE `dhl_api`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `dockumente`
--
ALTER TABLE `dockumente`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `drehungen`
--
ALTER TABLE `drehungen`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `goldlieferung`
--
ALTER TABLE `goldlieferung`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `gold_api_reponses`
--
ALTER TABLE `gold_api_reponses`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `guthaben`
--
ALTER TABLE `guthaben`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `kassenbuch`
--
ALTER TABLE `kassenbuch`
  ADD PRIMARY KEY (`EintragID`);

--
-- Indizes für die Tabelle `kunden`
--
ALTER TABLE `kunden`
  ADD PRIMARY KEY (`kundenId`);

--
-- Indizes für die Tabelle `lieferscheine`
--
ALTER TABLE `lieferscheine`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `offers`
--
ALTER TABLE `offers`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `paypal_subscriptions`
--
ALTER TABLE `paypal_subscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `produkt`
--
ALTER TABLE `produkt`
  ADD PRIMARY KEY (`produktId`);

--
-- Indizes für die Tabelle `produkt_geber`
--
ALTER TABLE `produkt_geber`
  ADD PRIMARY KEY (`produktGeberId`);

--
-- Indizes für die Tabelle `promo_codes`
--
ALTER TABLE `promo_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `promo_usage`
--
ALTER TABLE `promo_usage`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `user_id` (`user_id`,`promo_id`),
  ADD KEY `promo_id` (`promo_id`);

--
-- Indizes für die Tabelle `pwdreset`
--
ALTER TABLE `pwdreset`
  ADD PRIMARY KEY (`pwdResetId`);

--
-- Indizes für die Tabelle `rechner`
--
ALTER TABLE `rechner`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `seo`
--
ALTER TABLE `seo`
  ADD PRIMARY KEY (`seo_id`);

--
-- Indizes für die Tabelle `stellen_angebote`
--
ALTER TABLE `stellen_angebote`
  ADD PRIMARY KEY (`stelle_id`);

--
-- Indizes für die Tabelle `verarbeitungsrechnungen`
--
ALTER TABLE `verarbeitungsrechnungen`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `waren`
--
ALTER TABLE `waren`
  ADD PRIMARY KEY (`Produkt_ID`);

--
-- Indizes für die Tabelle `waren_details`
--
ALTER TABLE `waren_details`
  ADD PRIMARY KEY (`warenDetailsId`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT für Tabelle `analyse`
--
ALTER TABLE `analyse`
  MODIFY `analyseId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT für Tabelle `authentications`
--
ALTER TABLE `authentications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `bank_information`
--
ALTER TABLE `bank_information`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `bestellungpg`
--
ALTER TABLE `bestellungpg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `blogs`
--
ALTER TABLE `blogs`
  MODIFY `blog_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT für Tabelle `contacts`
--
ALTER TABLE `contacts`
  MODIFY `contact_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `dhl_api`
--
ALTER TABLE `dhl_api`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `dockumente`
--
ALTER TABLE `dockumente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT für Tabelle `drehungen`
--
ALTER TABLE `drehungen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=73;

--
-- AUTO_INCREMENT für Tabelle `goldlieferung`
--
ALTER TABLE `goldlieferung`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `gold_api_reponses`
--
ALTER TABLE `gold_api_reponses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2765;

--
-- AUTO_INCREMENT für Tabelle `guthaben`
--
ALTER TABLE `guthaben`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `kassenbuch`
--
ALTER TABLE `kassenbuch`
  MODIFY `EintragID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT für Tabelle `kunden`
--
ALTER TABLE `kunden`
  MODIFY `kundenId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT für Tabelle `lieferscheine`
--
ALTER TABLE `lieferscheine`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT für Tabelle `offers`
--
ALTER TABLE `offers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=145;

--
-- AUTO_INCREMENT für Tabelle `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT für Tabelle `paypal_subscriptions`
--
ALTER TABLE `paypal_subscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT für Tabelle `produkt`
--
ALTER TABLE `produkt`
  MODIFY `produktId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT für Tabelle `produkt_geber`
--
ALTER TABLE `produkt_geber`
  MODIFY `produktGeberId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT für Tabelle `promo_codes`
--
ALTER TABLE `promo_codes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `promo_usage`
--
ALTER TABLE `promo_usage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT für Tabelle `pwdreset`
--
ALTER TABLE `pwdreset`
  MODIFY `pwdResetId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT für Tabelle `rechner`
--
ALTER TABLE `rechner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT für Tabelle `seo`
--
ALTER TABLE `seo`
  MODIFY `seo_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT für Tabelle `stellen_angebote`
--
ALTER TABLE `stellen_angebote`
  MODIFY `stelle_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT für Tabelle `verarbeitungsrechnungen`
--
ALTER TABLE `verarbeitungsrechnungen`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT für Tabelle `waren`
--
ALTER TABLE `waren`
  MODIFY `Produkt_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT für Tabelle `waren_details`
--
ALTER TABLE `waren_details`
  MODIFY `warenDetailsId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `promo_usage`
--
ALTER TABLE `promo_usage`
  ADD CONSTRAINT `promo_usage_ibfk_1` FOREIGN KEY (`promo_id`) REFERENCES `promo_codes` (`id`);
COMMIT;