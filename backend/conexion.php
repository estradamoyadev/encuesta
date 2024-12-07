<?php
// Definir los parámetros de conexión
$host = 'localhost'; // Normalmente 'localhost' si estás usando Laragon
$usuario = 'root';    // Usuario predeterminado de MySQL en Laragon
$clave = '';          // Contraseña predeterminada de MySQL en Laragon (vacía)
$baseDeDatos = 'tu_base_de_datos'; // Reemplaza con el nombre de tu base de datos

// Crear la conexión a la base de datos
$mysqli = new mysqli($host, $usuario, $clave, $baseDeDatos);

// Verificar la conexión
if ($mysqli->connect_error) {
    die("Conexión fallida: " . $mysqli->connect_error);
} 
?>

