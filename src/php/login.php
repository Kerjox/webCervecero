<?php
    session_start();
    $pass = $_POST['password'];
    $_SESSION['user'] = $pass;
    echo $pass;
?>
<?php
try{

$email = htmlentities(addslashes($_POST["user"]));

$password = htmlentities(addslashes($_POST["password"]));

$base = new PDO("mysql:host=mariadb; dbname=cervecero" , "root", "IVSZ2e12");

$base->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$sql = "SELECT * FROM users WHERE email= :email";

$resultado = $base->prepare($sql);	
    
$resultado->execute(array(":email" => $email));
    
    while($registro = $resultado->fetch(PDO::FETCH_ASSOC)){			
        
        if (password_verify($password, $registro['pass'])) {
            
            session_start();
            $_SESSION['id_User'] = $registro['id_User'];
            $_SESSION['user_Name'] = $registro['user_Name'];
            
        }
        
    }

$resultado->closeCursor();

} catch(Exception $e) {

    die("Error: " . $e->getMessage());
}

?>