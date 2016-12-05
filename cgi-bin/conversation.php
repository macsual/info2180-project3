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
    
$dbhost = getenv('IP');
$dbusername = getenv('C9_USER');
$dbpassword = '';
$dbname = 'cheapo';

$conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);

$username = $_SESSION["username"];

$sql = "SELECT id FROM `User` WHERE username=\"$username\"";

$stmt = $conn->query($sql);
$userId = $stmt->fetchAll(PDO::FETCH_ASSOC)[0]["id"];

$conversation = $_POST['conversation'];

$sql = "SELECT * FROM Message WHERE conversation=\"$conversation\"";

$stmt = $conn->query($sql);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

for ($i = 0; $i<sizeof($results); $i++){
	$result = $results[$i];
	$id = $result["user_id"];
	$id1 = $result["recipient_ids"];
	
	$sql = "SELECT username FROM `User` WHERE id=\"$id\"";
	$stmt = $conn->query($sql);
	$username = $stmt->fetchAll(PDO::FETCH_ASSOC)[0]["username"];
	
	$result["sender"] = $username;
	
	$sql = "SELECT username FROM `User` WHERE id=\"$id1\"";
	$stmt = $conn->query($sql);
	$username = $stmt->fetchAll(PDO::FETCH_ASSOC)[0]["username"];
	
	$result["recipient"] = $username;
	
	$results[$i] = $result;
	
}

$jsonstring = json_encode($results);
echo $jsonstring;

?>
