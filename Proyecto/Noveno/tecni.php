<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include 'conexion.php';

$sql = "SELECT id, nombre, apellido, telefono, domicilio, correo, password FROM usuarios";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $tecnicos = array();
    while ($row = $result->fetch_assoc()) {
        $tecnicos[] = $row;
    }
    echo json_encode($tecnicos);
} else {
    echo json_encode(["message" => "No se encontraron técnicos"]);
}
$conn->close();
?>
