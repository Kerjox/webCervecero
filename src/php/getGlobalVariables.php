<?php
session_start();
error_reporting(E_ERROR | E_PARSE);
require ('conexion.php');

$id_User = $_SESSION['id_User'];

$sql = "SELECT p.id_Placa, s.id_Sonda FROM placas as p, sondas as s WHERE p.id_User = '$id_User' AND s.id_User = '$id_User'";
$result = $mysqli->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        
        $_SESSION['id_Placa'] = $row['id_Placa'];
        $_SESSION['id_Sonda'] = $row['id_Sonda'];
    }

    $arr = array("id_User" => $_SESSION['id_User'], "id_Placa" => $_SESSION['id_Placa'], "id_Sonda" => $_SESSION['id_Sonda'], "id_Receta" => $_SESSION['id_Receta'], "paso_Actual" => $_SESSION['paso_Actual'], "id_Paso_Receta_Actual" => $_SESSION['id_Paso_Receta_Actual']);
    echo json_encode($arr);
}

mysqli_close($mysqli);
?>