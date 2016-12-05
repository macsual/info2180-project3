<?php

if ($_SERVER["REQUEST_METHOD"] != POST) {
    header("Content-Type: text/plain");
    header("Status: 501 Not Implemented");

    echo "Unsupported HTTP method.";

    exit;
}

session_start();

$dbhost = getenv('IP');
$dbusername = getenv('C9_USER');
$dbpassword = '';
$dbname = 'cheapo';

$conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);

$id = $_POST['id'];

$sql = "UPDATE Message SET `read`=1 WHERE id=$id";

$stmt = $conn->prepare($sql);
$stmt->execute();

echo $stmt->rowCount();
// echo $id;

?>
