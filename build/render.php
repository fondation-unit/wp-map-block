<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */


$data_to_pass = array(
	'dataUrl' => plugin_dir_url(__FILE__) . '../data.php',
	'iconUrl' => plugin_dir_url(__FILE__) . '../src/images/map/marker.png',
);

// Output the data directly into the view.js file
echo "<script>window.mapViewData = " . json_encode($data_to_pass) . ";</script>";
?>

<div id="map-div" class="create-block-map"></div>
