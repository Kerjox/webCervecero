<?php
$host = "mariadb";
$dbusername = "root";
$dbpassword = "IVSZ2e12";
$dbname = "cervecero";
$port = "3306";
// Create connection
$conn = new mysqli($host, $dbusername, $dbpassword, $dbname, $port);
$conn->set_charset("utf8");
if ($conn->connect_errno) {
    echo "Fallo al conectar a MySQL: (" . $mysqli->connect_errno . ") " . $mysqli->connect_error;
}
//echo $conn->host_info . "\n";
   
?>