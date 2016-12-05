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

$sql = "SELECT id FROM `User` WHERE username=\"$username\"";

$stmt = $conn->query($sql);
$recipientId = $stmt->fetchAll(PDO::FETCH_ASSOC)[0]["id"];

$sql = "SELECT * FROM Message WHERE recipient_ids=\"$recipientId\"";

$stmt = $conn->query($sql);
$results = $stmt->fetchAll(PDO::FETCH_ASSOC);

for($i=0; $i<sizeof($results); $i++){
	$result = $results[$i];
	$id = $result["user_id"];
	
	$sql = "SELECT username FROM `User` WHERE id=\"$id\"";

	$stmt = $conn->query($sql);
	$username = $stmt->fetchAll(PDO::FETCH_ASSOC)[0]["username"];
	
	$result["sender"] = $username;
	$results[$i] = $result;
	
}

$jsonstring = json_encode($results);
echo $jsonstring;