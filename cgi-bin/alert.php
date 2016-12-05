<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

echo "data:true\n\n";
flush();

echo "retry:100\n\n";
flush();
?>