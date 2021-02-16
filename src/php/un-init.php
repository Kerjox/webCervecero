<?php
include "./conexion.php";

session_start();

if (!isset($_SESSION['id_User'])) {
    
    echo "login";
} else {

    $id_User = $_SESSION['id_User'];
    $id_Placa = $_SESSION['id_Placa'];
    $id_Sonda = $_SESISON['id_Sonda'];
    $arr = array('id_User' => $id_User, 'id_Placa' => $id_Placa, 'id_Sonda' => $id_Sonda);

    echo json_encode($arr);
}
?>

