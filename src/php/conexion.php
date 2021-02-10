<?php
$host = "mariadb";
$dbusername = "root";
$dbpassword = "IVSZ2e12";
$dbname = "cervecero";
$port = "3306";
// Create connection
$mysqli = new mysqli($host, $dbusername, $dbpassword, $dbname, $port);
$mysqli->set_charset("utf8");
if ($mysqli->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
//echo $conn->host_info . "\n";
   
?>