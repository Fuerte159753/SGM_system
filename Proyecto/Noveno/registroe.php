<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include 'conexion.php';

$idequipo = isset($_POST['idequipo']) ? $_POST['idequipo'] : null;
$marca = isset($_POST['marca']) ? $_POST['marca'] : null;
$modelo = isset($_POST['modelo']) ? $_POST['modelo'] : null;
$tipomantenimiento = isset($_POST['tipomantenimiento']) ? $_POST['tipomantenimiento'] : null;
$ram = isset($_POST['ram']) ? $_POST['ram'] : null;
$procesador = isset($_POST['procesador']) ? $_POST['procesador'] : null;
$almacenamiento = isset($_POST['almacenamiento']) ? $_POST['almacenamiento'] : null;
$tipo = isset($_POST['tipo']) ? $_POST['tipo'] : null;

if ($idequipo && $marca && $modelo && $tipomantenimiento && $ram && $procesador && $almacenamiento && $tipo) {
    $query = "INSERT INTO equipos (id, marca, modelo, tipo_mantenimiento, ram, procesador, almacenamiento, tipo) 
                VALUES ('$idequipo','$marca','$modelo','$tipomantenimiento','$ram','$procesador','$almacenamiento','$tipo')";
              
    if (mysqli_query($conn, $query)) {
        $response = array(
            'status' => 'success',
        );
        echo json_encode($response);
    } else {
        $response = array(
            'status' => 'error',
        );
        echo json_encode($response);
    }
} else {
    $response = array(
        'status' => 'error',
    );
    echo json_encode($response);
}
mysqli_close($conn);
?>
