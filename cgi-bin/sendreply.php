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
    
    $subject = $_POST['subject'];
    $body = $_POST['body'];
    $conversation = $_POST['conversation'];
    $senderId = $_POST['sender'];
    $recipientId = $_POST['recipient'];
    
    $sql = "INSERT INTO Message(id, recipient_ids, user_id, subject, body, conversation) values(0, ".intval($recipientId).", ".intval($senderId).", \"$subject\", \"$body\",".intval($conversation).")";
    
    $result = $conn->exec($sql);
    
    if($result){
        echo "true";
    }
    else{
        echo "false";
    }


