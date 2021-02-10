<?php
include "./conexion.php";

session_start();
$id_User = $_SESSION['id_User'];
$id_Placa = $_SESSION['id_Placa'];
$id_Sonda = $_SESISON['id_Sonda'];

if (!isset($id_User)) {
    
    echo "login";
} else {
    $arr = array('id_User' => $id_User, 'id_Placa' => $id_Placa, 'id_Sonda' => $id_Sonda);

    echo json_encode($arr);
}
?>

