<?php

include ('conexion.php');

if(!isset($_POST['email']) || !isset($_POST['password'])) {
    header("Location: /index.php");
}
$email = htmlentities(addslashes($_POST['email']));

$pass = htmlentities(addslashes($_POST['password']));

$fine = false;

$sql = "SELECT * FROM users WHERE email = '$email' LIMIT 1";
$result = mysqli_query($mysqli, $sql);

if ($result->num_rows == 0) {
    header("Location: login.php");
}

$valores = mysqli_fetch_array($result, MYSQLI_ASSOC);
    
    if (password_verify($pass, $valores['pass'])) {
        
        $fine = true;
    }
    if ($fine) {
        
        session_start();
        $_SESSION['id_User'] = $valores['id_User'];
        $_SESSION['user_Name'] = $valores['user_Name'];
        header("Location: /index.php");
    } else {
        
        header("Location: login.php");
    }

mysqli_close($mysqli);

/* try{

$base = new PDO("mysql:host=mariadb; dbname=cervecero" , "root", "IVSZ2e12");

$base->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "SELECT * FROM users WHERE email= :email LIMIT 1";

$resultado = $base->prepare($sql);
    
$resultado->execute(array(":email" => $email));
    
    while($registro = $resultado->fetch(PDO::FETCH_ASSOC)){

        if (password_verify($pass, $registro['pass'])) {
            
            $fine = true;
        }

        if ($fine) {
            
            session_start();
            $_SESSION['id_User'] = $registro['id_User'];
            $_SESSION['user_Name'] = $registro['user_Name'];
            //echo "Okay";
        } else {
            
            //echo "Fail";
        }

    }
    
    $resultado->closeCursor();

} catch(Exception $e) {

    die("Error: " . $e->getMessage()); 
}  */
?>