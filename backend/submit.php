<?php
// Permitir CORS en todas las solicitudes
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Si la solicitud es OPTIONS, no continuar con el resto del código
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit;  // Salir para responder solo con las cabeceras CORS
}

// Limpiar cualquier salida previa en el buffer
ob_clean();
flush();

// Incluir el archivo de conexión
include 'conexion.php';

// Verificar si la conexión a la base de datos fue exitosa
if ($mysqli->connect_error) {
    echo json_encode(['success' => false, 'message' => 'Conexión fallida: ' . $mysqli->connect_error]);
    exit;
}

// Obtener los datos enviados desde React
$datos = json_decode(file_get_contents('php://input'), true);

// Validar los datos
if (
    isset($datos['ticket']) && isset($datos['nombre']) &&
    isset($datos['calificacion']) && isset($datos['comentario'])
) {
    $ticket = $mysqli->real_escape_string($datos['ticket']);
    $nombre = $mysqli->real_escape_string($datos['nombre']);
    $calificacion = (int)$datos['calificacion'];
    $comentario = $mysqli->real_escape_string($datos['comentario']);

    // Insertar los datos en la base de datos
    $query = "INSERT INTO tu_tabla (ticket, nombre, calificacion, comentario)
              VALUES ('$ticket', '$nombre', $calificacion, '$comentario')";

    if ($mysqli->query($query)) {
        echo json_encode(['success' => true, 'message' => 'Formulario enviado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al insertar datos: ' . $mysqli->error]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Datos incompletos']);
}

// Cerrar la conexión
$mysqli->close();
?>

