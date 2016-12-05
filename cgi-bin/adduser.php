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

$first_name = $_POST['firstname'];
$last_name = $_POST['lastname'];
$username = $_POST['username'];
$password = $_POST['password'];

$hash = password_hash($password, PASSWORD_DEFAULT);

$conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);

$sql = "INSERT INTO `User`(`id`, `firstname`, `lastname`, `username`, `password`) VALUES (0, \"$first_name\", \"$last_name\", \"$username\", \"$hash\")";

$result = $conn->exec($sql);

if($result){
    echo "true";
} else {
    echo "false";
}



?>