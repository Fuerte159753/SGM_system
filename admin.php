<?php
// Datos de conexión a la base de datos
$servername = "127.0.0.1";
$username = "root";
$password = "";
$dbname = "";

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Valores para el nuevo registro
$nombre = "administrador";
$apellidos = "admin";
$telefono = "7721455522";
$domicilio = "Este es el administrador principal";
$correo = "Adminprincipal@gmail.com";
$passwordEncriptado = password_hash("SGMsystem", PASSWORD_DEFAULT); // Encriptar la contraseña
$foto = 0;
$token = bin2hex(random_bytes(10)); // Generar un token aleatorio de 20 caracteres
$fechaActual = date("Y-m-d H:i:s"); // Fecha y hora actual

// Consulta SQL para insertar el registro
$sql = "INSERT INTO administrador (nombre, apellidos, telefono, domicilio, correo, password, foto, token, created_at, updated_at)
        VALUES ('$nombre', '$apellidos', '$telefono', '$domicilio', '$correo', '$passwordEncriptado', $foto, '$token', '$fechaActual', '$fechaActual')";

if ($conn->query($sql) === TRUE) {
    echo "Nuevo registro creado exitosamente";
} else {
    echo "Error al insertar el registro: " . $conn->error;
}

// Cerrar la conexión
$conn->close();
?>
