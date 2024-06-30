<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include 'conexion.php';

$sql = "SELECT id, marca, modelo, tipo_mantenimiento, ram, procesador, almacenamiento, tipo 
        FROM equipos
        WHERE tipo_mantenimiento = 1";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $equipos = array();
    while ($row = $result->fetch_assoc()) {
        $equipos[] = $row;
    }
    echo json_encode($equipos);
} else {
    echo json_encode(["message" => "No se encontraron equipos con tipo_mantenimiento = 1"]);
}

$conn->close();
?>
