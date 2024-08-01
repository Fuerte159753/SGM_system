/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE IF NOT EXISTS `administrador` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` int NOT NULL,
  `domicilio` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `administrador_correo_unique` (`correo`),
  UNIQUE KEY `administrador_token_unique` (`token`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `administrador` (`id`, `nombre`, `apellidos`, `telefono`, `domicilio`, `correo`, `password`, `foto`, `token`, `created_at`, `updated_at`) VALUES
	(1, 'administrador', 'Martinez', 2147483647, 'Este es el administrador principal', 'Adminprincipal@gmail.com', '$2y$10$GhCNTzPMEK4Negqr5IfL4ObPv774DWpwFp/vja60pMEkEZFmyedYe', '/storage/fotos_administradores/admin_1.jpg', '7470563d3f68612c3c3f', '2024-07-24 12:10:53', '2024-07-30 01:09:39');

CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS `equipos` (
  `id` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `marca` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `modelo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_mantenimiento` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ram` varchar(7) COLLATE utf8mb4_unicode_ci NOT NULL,
  `procesador` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `almacenamiento` varchar(8) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo` varchar(1) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `equipos` (`id`, `marca`, `modelo`, `tipo_mantenimiento`, `ram`, `procesador`, `almacenamiento`, `tipo`, `estado`, `foto`, `created_at`, `updated_at`) VALUES
	('ER0001', 'hp', 'negro', '1', '8gb', 'intel core i5', '1tb', '1', '0', '0', '2024-07-06 01:45:06', '2024-07-06 01:45:06'),
	('ER0002', 'DELL', 'OPTIPLEX 3050', '1', '16', 'intel core i3 8100', '500GB', '1', '0', '0', '2024-07-07 07:50:14', '2024-07-07 07:50:14'),
	('ER0003', 'LENOVO', 'THINKCENTRE', '2', '8gb', 'INTEL CORE I5 4150', '500GB', '1', '0', '0', '2024-07-07 07:52:11', '2024-07-07 07:52:11'),
	('ER0004', 'LENOVO', 'OPTIPLEX 3050', '1', '8gb', 'intel core i3 8100', '500GB', '2', '0', '0', '2024-07-26 00:47:59', '2024-07-26 00:47:59'),
	('ER0005', 'HUAWEY', 'DESKTOP', '2', '8gb', 'intel core i3 8100', '500GB', '1', '0', '0', '2024-07-26 03:46:12', '2024-07-26 03:46:12');

CREATE TABLE IF NOT EXISTS `tecnicos` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nombre` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `apellidos` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telefono` varchar(10) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `domicilio` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `correo` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` varchar(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `foto` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tecnicos_correo_unique` (`correo`),
  UNIQUE KEY `tecnicos_token_unique` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tecnicos` (`id`, `nombre`, `apellidos`, `telefono`, `domicilio`, `correo`, `password`, `estado`, `foto`, `token`, `created_at`, `updated_at`) VALUES
	('RT0001', 'Jose Angel', 'montiel', '1234567890', 'centro de ixmiquilpan hidalgo', 'pepe@gmail.com', '$2y$12$9LtnZdKunUHr7.AK95ufR.rx58U/bMe2nkVlCqxd6649DHRzGdSqe', '1', '0', '0', '2024-07-05 23:33:17', '2024-07-29 01:50:45'),
	('RT0002', 'Master', 'Chief', '1234567890', 'centro de ixmiquilpan hidalgo', 'halo@gmail.com', '$2y$12$cElTTNZrsj85R9IFbatCAe9M8yv25fBYqZbO0/GJ3/yojTdSFIgzC', '1', '/storage/fotos_tecnicos/foto_John_master chief.jpg', 'Xv4QY0mNdJX8nLvp7LdA', '2024-07-07 01:08:03', '2024-07-26 03:48:00'),
	('RT0003', 'Javier Alejandro', 'Mayor Martinez', '7721754552', 'Zozea alfajayucan hidalgo', 'alejavi568@gmail.com', '$2y$12$b3JuuuuD6F1nZnj6eOXYC.g/l0liG07XNDl4iUqFcz8zHa3vto9D2', '1', '/storage/fotos_tecnicos/foto_Alejandro Javier_Mayor Martinez.jpg', 'HwATwRUZWJAuZruV2d6x', '2024-07-07 01:54:03', '2024-07-24 03:18:07'),
	('RT0004', 'Juan', 'Ezpino Gonzales', '5534930467', 'mexico city', 'juan@gmail.com', '$2y$12$.KyR07PxO.hNb1ABSIJsq.OI3gLkVhmBMwzi4XxZ2BBKJfe2yHKN6', '1', '0', 'nBVsyGtpoNT82S1R1MwU', '2024-07-07 05:05:32', '2024-07-21 07:17:02');

CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS `equipos_asignados` (
  `id` char(6) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ID del equipo asignado en formato MA0000',
  `id_equipo` char(6) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ID del equipo (llave foránea)',
  `id_tecnico` char(6) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'ID del técnico (llave foránea)',
  `estatus` tinyint NOT NULL COMMENT 'Estatus del equipo asignado (0, 1, 2, 3)',
  `comentarios_Tecnico` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Comentarios adicionales del tecnico',
  `comentarios_Admin` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Comentarios adicionales del administrador',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `estatus_updated_at` timestamp NULL DEFAULT NULL COMMENT 'Fecha de la última modificación del estatus',
  `estatus_anterior` tinyint DEFAULT NULL COMMENT 'Estatus anterior del equipo',
  PRIMARY KEY (`id`),
  KEY `equipos_asignados_id_equipo_foreign` (`id_equipo`),
  KEY `equipos_asignados_id_tecnico_foreign` (`id_tecnico`),
  CONSTRAINT `equipos_asignados_id_equipo_foreign` FOREIGN KEY (`id_equipo`) REFERENCES `equipos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `equipos_asignados_id_tecnico_foreign` FOREIGN KEY (`id_tecnico`) REFERENCES `tecnicos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `equipos_asignados` (`id`, `id_equipo`, `id_tecnico`, `estatus`, `comentarios_Tecnico`, `comentarios_Admin`, `created_at`, `updated_at`, `estatus_updated_at`, `estatus_anterior`) VALUES
	('MA0001', 'ER0003', 'RT0003', 0, '0', '0', '2024-07-08 04:31:42', '2024-07-08 04:31:42', '2024-07-08 04:31:42', 0),
	('MA0002', 'ER0001', 'RT0001', 0, '0', 'este es un equippo que estaba en el laboratio 2', '2024-07-18 01:24:26', '2024-07-18 01:24:26', '2024-07-18 01:24:26', 0);

CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(3, '2024_06_28_180111_create_personal_access_tokens_table', 1),
	(4, '2024_07_02_062005_create_administrador_table', 1),
	(5, '2024_07_02_062204_create_tecnicos_table', 1),
	(6, '2024_07_02_070645_create_equipos_table', 1),
	(20, '0001_01_01_000000_create_users_table', 2),
	(21, '0001_01_01_000001_create_cache_table', 2),
	(22, '0001_01_01_000002_create_jobs_table', 2),
	(23, '2024_07_07_023006_create_equipos_asignados_table', 3);

CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('63hU8eXmd7DZEsfDBnoMAYEsKRgDK40VBbacYOrt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMGVkUlp3dXhWSGc4ellra0ZoUXVGY0VMZjgxWDRPWkM0RlRXR0liVSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721412075),
	('a5ugbTCnNqQtiZd6axeG5uufgRebpQbHBEIfeqbF', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidjdidXhTOU5nd2ZzUTlBUTR3N1A3a0JSSHpqUnk2bjZGWjBreENLaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721769271),
	('aq21BcawuRHWxgq3Z0hRyIRYks6HybVdJqsFVESI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSmd2RXVOd0Fhd2s5QXB6cEJsUVZRVnlFRHZ1NHcwQWFUM0hXREdNUSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721336639),
	('bMEaPxsjhHnndRu0Hd5Slq4DUH5YZeGtcnKjQNfX', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV0I2RU5ZVEh2clhKU09yQWxTR2pYeGtMaElqeU44UHJqdDNiaTRjVyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1720294202),
	('GKBNTM53rKaY5uiBwupQsCHoXOWr67rpRvYy1CXJ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiakx3Y2dOb3pKNGJDYVJ0akVRckZkRWdjVmF4UUxTaWZFb21FZmRNciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1722007844),
	('KOa2lrR2OEJIbWsciEhYfMLw4bnNQVfbO6tskApt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQU9ueW5qQVFaSHJ0TTlpQWR0S1ExQkg2RVpSSklxdDZoamdQZ2JPQiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1720729887),
	('pSn4dwIBD87hKgpAw4eYL9ecdKryL1cBfnjHuYGg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiNGpIaW9OSUtpWFdnaG03NEJ1UHVRYllGdkV5a3Roc3NQV0I4SzE5UyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721395271),
	('QulG3kRFLtSgL3dPP9RdE2zb9Q49VL1ACljwhpJT', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMW9YSDlSRmtFUWt2ck9NaTZlU1hsbEVZS3hadFlvVjI2OUdEZmlmcCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721853701),
	('RFM1nZR3Z82dD0emIb5qkR0uK8PLzXZDSr8onc41', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZGJvS1VnTVJHUHBJVEZhTndxR1RMSDlJWXdRQmNOWFhMVFdiQ0VqciI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721796651),
	('SQfMf3erYvAZqhq3ryrNL859zLWF0sQzafbStoj4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM1R5SVpVNU9yMEhOeEhyZFlRak5lNWRUamJveDdEdHpZYnpLblNYTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721884222),
	('UNm8fAz98APxVHfIf329IWaWIGLMZzZV6r8poKRP', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36 Edg/127.0.0.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiU2Y0UVRjMkx3U2hiYzI1YnhnMjVqelBOcDlUeU5QUVpLT3lraXRvWSI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1722281373),
	('uxMp8m9CJ7snnpCY2KXpPj4wcVyrlHaSjcgjPYVT', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiMzRsTW5LVUhUeDMxM2pxUTd3NEtBRTVMVFYzUmRPUUExM2N3bXY1WCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1721395602);
/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
