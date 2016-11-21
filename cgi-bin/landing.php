<?php

session_start();

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {
    echo file_get_contents("../html/home.html");
} else {
    echo file_get_contents("../html/login.html");
}

?>