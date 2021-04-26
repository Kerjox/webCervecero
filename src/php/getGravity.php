<?php
require ('conexion.php');

session_start();
$id_Receta = $_SESSION['id_Receta'];
if ($id_Receta != 0) {

    $gravedad_Inicial;
    $gravedad_Final;
    
    $sql = "SELECT r.gravedad_Inicial, r.gravedad_Final FROM recetas AS r WHERE r.ID = $id_Receta";
    $result = $mysqli->query($sql);
    if ($result->num_rows > 0) {

        while($row = $result->fetch_assoc()) {
            
            $gravedad_Inicial = $row['gravedad_Inicial'];
            $gravedad_Final = $row['gravedad_Final'];
        }
    
        $arr = array("gravedad_Inicial" => $gravedad_Inicial, "gravedad_Final" => $gravedad_Final);
        echo json_encode($arr);
    }
}

mysqli_close($mysqli);
?>