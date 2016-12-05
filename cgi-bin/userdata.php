<?php 
    
    session_start(); 
    
    $dbhost = getenv('IP');
    $dbusername = getenv('C9_USER');
    $dbpassword = '';
    $dbname = 'cheapo';
    
    $conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);
    
    $username = $_SESSION["username"];
    $unread = 0;
    
    $sql = "SELECT * FROM `User` WHERE username=\"$username\"";
    
    $stmt = $conn->query($sql);
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC)[0];
    $recipientId = $result["id"];
    $admin = $result["admin"];
    
    $sql = "SELECT * FROM Message WHERE recipient_ids=\"$recipientId\"";
    
    $stmt = $conn->query($sql);
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    for($i=0; $i<sizeof($results); $i++){
    	$result = $results[$i];
    	if($result['read'] == 0){
    	    $unread += 1;
    	}
    	
    }
    
    $xmldata = '<?xml version="1.0" encoding="UTF-8"?>
    <user>
        <username>'
        . $username .
        '</username>
        <unread>'
        . $unread .
        '</unread>
        <userid>'
        . $recipientId .
        '</userid>
        <admin>'
        . $admin .
        '</admin>
    </user>';
    
    $xmlOutput = new SimpleXMLElement($xmldata);
    echo $xmlOutput->asXML();
    
    
?>
