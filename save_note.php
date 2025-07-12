<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['note'])) {
    $note = trim($_POST['note']);
    $date = date('Y-m-d H:i:s');
    $entry = "[$date] $note" . PHP_EOL;

    file_put_contents('lovenotes.txt', $entry, FILE_APPEND | LOCK_EX);
    echo "Note saved.";
} else {
    echo "No note received.";
}
?>
