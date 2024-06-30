<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM usuarios WHERE correo = '$email'";
    $result = $conn->query($sql);

    $sql2 = "SELECT * FROM administrador WHERE correo = '$email'";
    $result2 = $conn->query($sql2);


    if ($result->num_rows > 0) {
        $usuario = $result->fetch_assoc();
        if ($password === $usuario['password']) {
            echo json_encode(['message' => 'Inicio de sesión exitoso', 'status' => 'success', 'user' => 2, 'id' => $usuario['id'], 'name' => $usuario['nombre']]);
        } else {
            echo json_encode(['message' => 'Verifica tus datos', 'status' => 'error']);
        }
    }elseif($result2->num_rows > 0){
        $admin = $result2->fetch_assoc();
        if ($password === $admin['password']){
            echo json_encode(['message' => 'Inicio de sesión exitoso', 'status' => 'success', 'user' => 1, 'id' => $admin['id'], 'name' => $admin['nombre']]);
        }else{
            echo json_encode(['message' => 'Verifica tus datos', 'status' => 'error']);
        }
    }else {
        echo json_encode(['message' => 'Usuario no encontrado', 'status' => 'error']);
    }
} else {
    echo json_encode(['message' => 'Método no permitido', 'status' => 'error']);
}
?>