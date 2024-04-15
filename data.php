<?php

require 'vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Configure the Google Client
$client = new \Google_Client();
$client->setApplicationName('Google Sheets API');
$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
$client->setAccessType('offline');
$path = dirname(__FILE__) . '/credentials.json'; // Downloaded from Google Sheets API
$client->setAuthConfig($path);

// Configure the Sheets Service
$service = new \Google_Service_Sheets($client);
$spreadsheetId = $_POST['spreadsheetId'];
$spreadsheet = $service->spreadsheets->get($spreadsheetId);
define('SHEETNAME', $_POST['sheetName']);

// Get column
$range = SHEETNAME.'!A2:F100';
$response = $service->spreadsheets_values->get($spreadsheetId, $range);
$values = $response->getValues();

$coords_array = [];
foreach($values as $row) {
  $coords = trim($row[3]);
  if ($coords) {
    array_push($coords_array, array(
      "name" => $row[0],
      "city" => $row[1],
      "zip" => $row[2],
      "coords" => array_reverse(explode(",", $coords))
    ));
  }
}

echo json_encode($coords_array);
