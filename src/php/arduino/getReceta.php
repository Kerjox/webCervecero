<?php
require '../conexion.php';
$id_Receta = $_POST['IDreceta'];
$sql = $mysqli->query("SELECT * FROM recetas WHERE id='$id_Receta'");
while ($valores = mysqli_fetch_array($sql)) {
    $datos = array("nombre" => $valores['nombre'], "tempMacer" => $valores['tempMacer'], "tiempoMacer" => $valores['tiempoMacer'], "tempCoc" => $valores['tempCoc'], "tiempoCoc" => $valores['tiempoCoc'], "tempFermen" => $valores['tempFermen'], "tiempoFermen" => $valores['tiempoFermen']);
    echo json_encode($datos);
    //echo "nombre=$valores[nombre];tempMacer=$valores[tempMacer];tiempoMacer=$valores[tiempoMacer];tempCoc=$valores[tempCoc];tiempoCoc=$valores[tiempoCoc];tempFermen=$valores[tempFermen];tiempoFermen=$valores[tiempoFermen]";
}
?>