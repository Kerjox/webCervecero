<?php
session_start();
echo $_SESSION['id_User'] ." ". 
$_SESSION['user_Name'] ." ". 
$_SESSION['id_Placa'] ." ".
$_SESSION['id_Sonda'];
?>