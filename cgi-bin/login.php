<?php

$dbhost = getenv('IP');
$dbusername = getenv('C9_USER');
$dbpassword = '';
$dbname = 'cheapo';

if ($_SERVER["REQUEST_METHOD"] != POST) {
    header("Content-Type: text/plain");
    header("Status: 501 Not Implemented");

    echo "Unsupported HTTP method.";

    exit;
}

session_start();

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
    exit;
}

if (isset($_POST["username"]) && !empty($_POST["username"])
        && isset($_POST["password"]) && !empty($_POST["password"])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    
    $conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);
    
    $stmt = $conn->query("SELECT password FROM User where username='$username'");
    
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    $hash = $results[0]['password'];
    
    if (password_verify($password, $hash)) {
        $_SESSION['loggedin'] = true;
        $_SESSION['username'] = $username;

        echo "true";
    } else {
        echo "false";
    }
}

?>
