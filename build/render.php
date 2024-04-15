<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */


require_once dirname(__DIR__) . '/vendor/autoload.php';

$spreadsheetId = $attributes['spreadsheetId'];
$sheetName = $attributes['sheetName'];

if ( !empty($spreadsheetId) && !empty($sheetName) ) :

	// Configure the Google Client
	$client = new \Google_Client();
	$client->setApplicationName('Google Sheets API');
	$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
	$client->setAccessType('offline');
	$path = dirname(__DIR__) . '/credentials.json'; // Downloaded from Google Sheets API
	$client->setAuthConfig($path);

	// Configure the Sheets Service
	$service = new \Google_Service_Sheets($client);
	$spreadsheet = $service->spreadsheets->get($spreadsheetId);

	// Get column
	$range = $sheetName.'!A2:C100';
	$response = $service->spreadsheets_values->get($spreadsheetId, $range);
	$values = $response->getValues();

	$coords_array = [];
	foreach($values as $row) {
		$coords = trim($row[2]);
		if ($coords) {
			array_push($coords_array, array(
				"name" => $row[0],
				"type" => $row[1],
				"coords" => array_reverse(explode(",", $coords)),
			));
		}
	}

	$data_to_pass = array(
		'iconUrl' => plugin_dir_url(__FILE__) . '../src/images/map/marker.png',
		'geojsonData' => $coords_array,
	);

	// Output the data into the view.js file
	echo "<script>window.mapViewData = " . json_encode($data_to_pass) . ";</script>";
endif; ?>

<div class="create-block-map-wrapper">
	<div id="map-div" class="create-block-map"></div>

	<div class="create-block-map-entries">
		<?php
		// Output the text data
		$type = null;

		foreach($coords_array as $entry) :
			if ($entry['type'] != $type) {
				$type = $entry['type'];
				echo '<h4 class="entry-title">' . $type . '</h4>';
			}
			echo '<li class="entry-name">' . $entry['name'] . '</li>';
		endforeach; ?>
	</div>
</div>
