<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT COUNT(*) AS total_registros FROM equipos";
    $result = $conn->query($sql);

    if ($result) {
        $row = $result->fetch_assoc();
        $total_registros = $row['total_registros'];

        if ($total_registros == 0) {
            echo json_encode(['next_id' => 1]);
        } else {
            echo json_encode(['next_id' => $total_registros + 1]);
        }
    } else {
        echo json_encode(['error' => 'Error al ejecutar la consulta']);
    }
} else {
    echo json_encode(['message' => 'Método no permitido']);
}

$conn->close();
?>
