-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-01-2021 a las 18:09:21
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilahresto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalleordenes`
--

CREATE TABLE `detalleordenes` (
  `id_orden` int(10) UNSIGNED NOT NULL,
  `id_producto` int(10) NOT NULL,
  `cantidad` int(10) NOT NULL,
  `precio` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estadoordenes`
--

CREATE TABLE `estadoordenes` (
  `id_estado` int(10) NOT NULL,
  `nombre` varchar(90) COLLATE utf8_unicode_520_ci NOT NULL,
  `color` varchar(25) COLLATE utf8_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Volcado de datos para la tabla `estadoordenes`
--

INSERT INTO `estadoordenes` (`id_estado`, `nombre`, `color`) VALUES
(1, 'Nuevo', '#ef4a5a'),
(2, 'Confirmado', '#ff7342'),
(3, 'Preparando', '#ffd470'),
(4, 'Enviado', '#30d694'),
(5, 'Cancelado', '#a9b9f7'),
(6, 'Entregado', '#7d94a3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ordenes`
--

CREATE TABLE `ordenes` (
  `id_orden` int(10) UNSIGNED NOT NULL,
  `fecha` datetime NOT NULL,
  `cliente` int(10) UNSIGNED NOT NULL,
  `valor_total` double NOT NULL,
  `metodo_de_pago` enum('efectivo','debito','credito') COLLATE utf8_unicode_520_ci NOT NULL,
  `estado` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(10) NOT NULL,
  `nombre` varchar(90) COLLATE utf8_unicode_520_ci NOT NULL,
  `foto` varchar(250) COLLATE utf8_unicode_520_ci NOT NULL,
  `precio` int(10) NOT NULL,
  `favorito` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;


--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(10) UNSIGNED NOT NULL,
  `nombre_usuario` varchar(90) COLLATE utf8_unicode_520_ci NOT NULL,
  `nombre_completo` varchar(90) COLLATE utf8_unicode_520_ci NOT NULL,
  `correo_electronico` varchar(150) COLLATE utf8_unicode_520_ci NOT NULL,
  `telefono` varchar(18) COLLATE utf8_unicode_520_ci NOT NULL,
  `password` varchar(30) COLLATE utf8_unicode_520_ci NOT NULL,
  `direccion` varchar(180) COLLATE utf8_unicode_520_ci NOT NULL,
  `rol` enum('administrador','basico') COLLATE utf8_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `detalleordenes`
--
ALTER TABLE `detalleordenes`
  ADD KEY `Productos_DetalleOrdenes_fk` (`id_producto`),
  ADD KEY `Ordenes_DetalleOrdenes_fk` (`id_orden`);

--
-- Indices de la tabla `estadoordenes`
--
ALTER TABLE `estadoordenes`
  ADD PRIMARY KEY (`id_estado`);

--
-- Indices de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD PRIMARY KEY (`id_orden`),
  ADD KEY `ordenes_usuarios_fk` (`cliente`),
  ADD KEY `Ordenes_EstadoOrdenes_fk` (`estado`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`),
  ADD UNIQUE KEY `nombre` (`nombre`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `ordenes`
--
ALTER TABLE `ordenes`
  MODIFY `id_orden` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalleordenes`
--
ALTER TABLE `detalleordenes`
  ADD CONSTRAINT `Ordenes_DetalleOrdenes_fk` FOREIGN KEY (`id_orden`) REFERENCES `ordenes` (`id_orden`),
  ADD CONSTRAINT `Productos_DetalleOrdenes_fk` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`);

--
-- Filtros para la tabla `ordenes`
--
ALTER TABLE `ordenes`
  ADD CONSTRAINT `Ordenes_EstadoOrdenes_fk` FOREIGN KEY (`estado`) REFERENCES `estadoordenes` (`id_estado`),
  ADD CONSTRAINT `ordenes_usuarios_fk` FOREIGN KEY (`cliente`) REFERENCES `usuarios` (`id_usuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
