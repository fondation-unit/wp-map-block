<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */


require_once dirname(__DIR__) . '/vendor/autoload.php';


$spreadsheetId = $attributes['spreadsheetId'] ?? '';
$sheetName = $attributes['sheetName'] ?? '';

if (!empty($spreadsheetId) && !empty($sheetName)) :
	// Configure the Google Client.
	$client = new \Google_Client();
	$client->setApplicationName('Google Sheets API');
	$client->setScopes([\Google_Service_Sheets::SPREADSHEETS]);
	$client->setAccessType('offline');
	$path = dirname(__DIR__) . '/credentials.json'; // Downloaded from Google Sheets API.
	$client->setAuthConfig($path);

	// Configure the Sheets Service.
	$service = new \Google_Service_Sheets($client);
	$spreadsheet = $service->spreadsheets->get($spreadsheetId);

	// Get the column.
	$range = $sheetName . '!A2:H100';
	$response = $service->spreadsheets_values->get($spreadsheetId, $range);
	$values = $response->getValues();
	$coords_array = [];

	foreach ($values as $row) {
		$coords_array[] = [
			"name" => isset($row[0]) ? trim((string) $row[0]) : null,
			"type" => isset($row[1]) ? trim((string) $row[1]) : null,
			"latitude" => isset($row[2]) ? trim((string) $row[2]) : null,
			"longitude" => isset($row[3]) ? trim((string) $row[3]) : null,
			"website" => isset($row[4]) ? trim((string) $row[4]) : null,
			"color" => isset($row[5]) ? trim((string) $row[5]) : null,
			"marker" => isset($row[6]) ? trim((string) $row[6]) : null,
			"titleColor" => isset($row[7]) ? trim((string) $row[7]) : null,
		];
	}

	$data_to_pass = array(
		'iconUrl' => plugin_dir_url(__FILE__) . '../src/images/map/',
		'geojsonData' => $coords_array,
	);

	// Output the data into the view.js file.
	echo "<script>window.mapViewData = " . json_encode($data_to_pass) . ";</script>";
?>

	<div class="create-block-map-wrapper">
		<div id="map-div" class="create-block-map"></div>

		<div class="create-block-map-entries">
			<?php

			$groupedData = [];
			foreach ($coords_array as $item) {
				$type = $item["type"];
				// Check if the type key already exists in the grouped data array.
				if (!isset($groupedData[$type])) {
					// If not, initialize an empty array for that type.
					$groupedData[$type] = [];
				}

				$groupedData[$type][] = $item;
			}

			foreach ($groupedData as $key => $val) :
				if (isset($val[0]['titleColor'])) {
					echo '<h4 class="entry-title" style="background:' . sanitize_text_field($val[0]['color']) . ';color:' . sanitize_text_field($val[0]['titleColor']) . ';">' . $key . '</h4>';
				} else {
					echo '<h4 class="entry-title" style="background:' . sanitize_text_field($val[0]['color']) . ';">' . $key . '</h4>';
				}
				echo '<ul>';

				foreach ($val as $entry) {
					if (!empty($entry['website'])) {
						echo '<li class="entry-name"><a href="' . $entry['website'] . '" alt="Site ' . $entry['name'] . '" target="_blank">' . $entry['name'] . '</a></li>';
					} else {
						echo '<li class="entry-name">' . $entry['name'] . '</li>';
					}
				}

				echo '</ul>';
			endforeach; ?>
		</div>
	</div>

<?php endif;
