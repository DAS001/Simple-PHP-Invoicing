<?php
// Set the path to the log file
$logFile = 'inv_error.log';

// Get the raw POST data
$errorDetails = file_get_contents('php://input');
$errorDetails = json_decode($errorDetails, true);

// Format the log entry
$logEntry = sprintf(
    "[%s] Status: %d, Message: %s, ResponseText: %s, ErrorThrown: %s\n",
    date('Y-m-d H:i:s'),
    $errorDetails['status'],
    $errorDetails['message'],
    $errorDetails['responseText'],
    $errorDetails['errorThrown']
);

// Write the log entry to the file
file_put_contents($logFile, $logEntry, FILE_APPEND);

// Send a response back
echo 'Error details logged';
?>