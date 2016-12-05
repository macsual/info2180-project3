<?php

$dbhost = getenv('IP');
$dbusername = getenv('C9_USER');
$dbpassword = '';
$dbname = 'cheapo';

$conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbusername, $dbpassword);

$subject = "Subject";
$body = "Script message";
$conversation = 1;

while(true){
    $sql = $conn->query("SELECT * FROM Message WHERE conversation=".intval($conversation));
    $result = $sql->fetchAll(PDO::FETCH_ASSOC);
    if(sizeof($result) == 0){
        echo "New conversation $conversation will be started \n";
        break;
    }
    $conversation++;
}

// $sql = "INSERT INTO Message(id, recipient_ids, user_id, subject, body, conversation) values(0, ".intval(1).", ".intval(0).", \"$subject\", \"$body\"".$conversation.")";
    
// $result = $conn->exec($sql);