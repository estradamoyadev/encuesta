-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS tu_base_de_datos;

-- Usar la base de datos recién creada
USE tu_base_de_datos;

-- Crear la tabla principal
CREATE TABLE IF NOT EXISTS tu_tabla (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ticket VARCHAR(50) NOT NULL,
    nombre VARCHAR(255) NOT NULL,
    calificacion TINYINT NOT NULL CHECK (calificacion BETWEEN 1 AND 10),
    comentario TEXT NOT NULL,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

