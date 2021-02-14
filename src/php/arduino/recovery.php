<?php
require '../conexion.php';
$id_Placa = $_POST['IDplaca'];

//echo $date->;
$sql = "SELECT receta, time, proceso, pasoProceso, tiempoRestante, estado FROM placas_data WHERE id_Placa = '$id_Placa' ORDER BY TIME DESC LIMIT 1";
$result = $mysqli->query($sql);

if ($result->num_rows > 0) {
    while ($payload = $result->fetch_assoc()) {

    $json = array('receta' => $payload['receta'], 'tiempoRestante' => $payload['tiempoRestante'], 'proceso' => $payload['proceso'], 'pasoProceso' => $payload['pasoProceso'], 'estado' => $payload['estado']);
    echo json_encode($json);
     
    }
}


?>