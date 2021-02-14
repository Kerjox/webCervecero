<?php
require '../conexion.php';

$id_Placa = $_POST['id_Placa'];
$version = $_POST['currentVersion'];

if (isset($version)) {
    $sql = "SELECT firmware FROM placas WHERE id_Placa = '$id_Placa'";
    $result = $mysqli->query($sql);
    if ($result->num_rows > 0) {
        while ($valores = $result->fetch_assoc()) {
            if ($version != $valores['firmware']) {
                $sql = $mysqli->query("UPDATE placas SET firmware='$version' WHERE id_Placa='$id_Placa'");
            }
        }
    }
    
    $sql = "SELECT version FROM placas_firmwares ORDER BY fechaSalida DESC LIMIT 1";
    $result = $mysqli->query($sql);
    if ($result->num_rows > 0) {
        while ($valores = $result->fetch_assoc()) {
            if ($version == $valores['version']) {
                $json = array("updateAvailable" => "0", "updateNow" => "0");
                //echo "0:0";
                //echo "El fimware está actualizado";
            }else{
                $sql = "SELECT updateNextBoot FROM placas WHERE id_Placa='$id_Placa'";
                $result = $mysqli->query($sql);
                if ($result->num_rows > 0) {
                    while($valores = $result->fetch_assoc()){
                        if ($valores['updateNextBoot'] == 1) {
                            $json = array("updateAvailable" => "1", "updateNow" => "1");
                            //echo "1:1";
                            //echo "Va a actualizar";
                        }else {
                            $json = array("updateAvailable" => "1", "updateNow" => "0");
                            //echo "1:0";
                            //echo "Actualización disponible";
                        }
                    }
                }

                
                
                //echo "Actualizacion disponible: Current version-$version ___ New version-$valores[version]";
            }

            echo json_encode($json);
        }
    }
}
?>