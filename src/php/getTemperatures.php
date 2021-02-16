<?php
require ('conexion.php');

session_start();

//$limit = $_GET['limit'];
$id_Placa = $_SESSION['id_Placa'];
$temps = array();
$dateTimes = array();

$sql = "SELECT * FROM (
    SELECT temp, time FROM placas_data WHERE id_Placa = '$id_Placa' ORDER BY TIME DESC) AS t 
    ORDER BY t.time ASC";
$result = $mysqli->query($sql);
if ($result->num_rows > 0) {
    $index = 0;
    while($row = $result->fetch_assoc()) {
        
        $temps[$index] = $row['temp'];
        $dateTimes[$index] = $row['time'];
        $index++;
    }

    $arr = array('nodata'=> 0, 'temps' => $temps, 'dateTimes' => $dateTimes);
    echo json_encode($arr);
} else {

    $arr = array('nodata' => 1);
    echo json_encode($arr);
}

?>