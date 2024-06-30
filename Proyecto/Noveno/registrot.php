<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include 'conexion.php';

$numempleado = isset($_POST['numempleado']) ? $_POST['numempleado'] : null;
$nombre = isset($_POST['name']) ? $_POST['name'] : null;
$apellido = isset($_POST['apellido']) ? $_POST['apellido'] : null;
$email = isset($_POST['email']) ? $_POST['email'] : null;
$password = isset($_POST['password']) ? $_POST['password'] : null;
$telefono = isset($_POST['telefono']) ? $_POST['telefono'] : null;
$direccion = isset($_POST['direccion']) ? $_POST['direccion'] : null;

if ($numempleado && $nombre && $apellido && $email && $password && $telefono && $direccion) {
    $query = "INSERT INTO usuarios (id, nombre, apellido, telefono, domicilio, correo, password) 
              VALUES ('$numempleado', '$nombre', '$apellido', '$telefono', '$direccion', '$email', '$password')";

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
