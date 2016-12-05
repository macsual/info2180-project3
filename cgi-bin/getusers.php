<?php

$dbhost = getenv('IP');
$dbusername = getenv('C9_USER');
$dbpassword = '';
$dbname = 'cheapo';

session_start();
    
$dbhost = getenv('IP');
$dbusername = getenv('C9_USER');
$dbpassword = '';
$dbname = 'cheapo';

$conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);

$username = $_SESSION["username"];


$sql = "SELECT username FROM User";

$stmt = $conn->query($sql);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);


$jsonstring = json_encode($results);
echo $jsonstring;

?>
