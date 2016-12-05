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
    
    $username = $_SESSION['username'];
    
    $stmt = $conn->query("SELECT id FROM `User` WHERE username=\"$username\"");
    $senderId = $stmt->fetchAll(PDO::FETCH_ASSOC)[0]["id"];
    $recipient = $_POST['recipient'];
    $stmt = $conn->query("SELECT id FROM `User` WHERE username=\"$recipient\"");
    $recipientId = $stmt->fetchAll(PDO::FETCH_ASSOC)[0]["id"];
    
    if ($recipientId == 0) {
        return "false";
    }
    
    $subject = $_POST['subject'];
    $body = $_POST['body'];
    $conversation = 1;
    while (true) {
        $sql = $conn->query("SELECT * FROM Message WHERE conversation=".intval($conversation));
        $result = $sql->fetchAll(PDO::FETCH_ASSOC);
        if (sizeof($result) == 0) {
            break;
        }
        $conversation++;
    }
    
    $sql = "INSERT INTO Message(id, recipient_ids, user_id, subject, body, conversation) values(0, ".intval($recipientId).", ".intval($senderId).", \"$subject\", \"$body\",".intval($conversation).")";
    
    $result = $conn->exec($sql);
    
    if ($result) {
        echo "true";
    } else {
        echo "false";
    }

?>
