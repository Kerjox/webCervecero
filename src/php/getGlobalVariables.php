<?php
session_start();
require ('conexion.php');

$id_User = $_SESSION['id_User'];
$id_Placa = null;
$id_Sonda = null;

$sql = "SELECT p.id_Placa, s.id_Sonda FROM placas as p, sondas as s WHERE p.id_User = '$id_User' AND s.id_User = '$id_User'";
$result = $mysqli->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        
        $id_Placa = $_SESSION['id_Placa'] = $row['id_Placa'];
        $id_Sonda = $_SESSION['id_Sonda'] = $row['id_Sonda'];
    }

    $arr = array("id_User" => $id_User, "id_Placa" => $id_Placa, "id_Sonda" => $id_Sonda, "id_Receta" => $_SESSION['id_Receta'], "paso_Actual" => $_SESSION['paso_Actual'], "id_Proceso_Actual" => $_SESSION['id_Proceso_Actual']);
    echo json_encode($arr);
}

?>