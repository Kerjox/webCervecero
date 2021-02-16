<?php
require ('conexion.php');

$id_Receta = $_GET['id_Receta'];
$id_Paso_Receta = $_GET['id_Paso_Receta'];
$info;

$sql = "SELECT pr.instrucciones
FROM pasos_Recetas AS pr
WHERE pr.id_Paso_Receta = $id_Paso_Receta AND pr.id_Receta = $id_Receta";
$result = $mysqli->query($sql);
if ($result->num_rows > 0) {

    while($row = $result->fetch_assoc()) {
        
       $info = $row['instrucciones'];
    }

    $arr = array("info" => $info);
    echo json_encode($arr);
}

?>