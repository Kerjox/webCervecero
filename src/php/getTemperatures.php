<?php
require ('conexion.php');

session_start();

$device = $_GET['device'];
$id_Placa = $_SESSION['id_Placa'];
$id_Sonda = $_SESSION['id_Sonda'];
$temps = array();
$dateTimes = array();

if ($device == 0) {

    $sql = "SELECT * FROM (
        SELECT temp, time FROM placas_data WHERE id_Placa = '$id_Placa' ORDER BY TIME DESC) AS t 
        ORDER BY t.time ASC";
}else {
    
    $sql = "SELECT * FROM (
        SELECT temp, time FROM sondas_data WHERE id_Sonda = '$id_Sonda' ORDER BY TIME DESC) AS t 
        ORDER BY t.time ASC";
}

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