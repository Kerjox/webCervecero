<?php
require '../conexion.php';
$mac = $_POST['mac'];
$sql = $mysqli->query("SELECT id_Placa FROM placas WHERE mac='$mac'");
if (mysqli_num_rows($sql) != 0) {
    $valores = mysqli_fetch_array($sql);
    echo "$valores[id_Placa]";
} else {
    echo "fallo";
}
?>