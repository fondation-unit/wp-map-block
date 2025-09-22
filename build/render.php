<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

require_once dirname(__DIR__) . '/vendor/autoload.php';

$centres = new WP_Query([
	'post_type' => 'centre-formation',
	'posts_per_page' => -1,
]);

if ($centres->have_posts()) :
	// Configure the Google Client.
	$i = 1;
	while ($centres->have_posts()):
		$centres->the_post();
		$latitude = get_field('latitude');
		$longitude = get_field('longitude');
		$adresse = get_field('adresse');
		$photo = get_field('photo');
		$typeCentre = get_field('type_de_centre');
		$name = get_the_title();
		$centreFormation = get_the_ID();
		$image = $photo ? $photo['sizes']['thumbnail'] : '';

		$desc = $image . '<b>' . $name . '</b><br>' . $typeCentre . '<br><br>' . $adresse;
		$coords_array[] = [
			"name" => $name,
			"adresse" => nl2br($adresse),
			"latitude" => $latitude,
			"longitude" => $longitude,
			"marker" => $typeCentre === 'Centre de formation constructeurs' ? 1 : 2,
			"description" => $desc,
			"typeCentre" => $typeCentre,
			"centreFormation" => $centreFormation,
			"image" => $image,
			"id" => $i,
			"catalog" => get_permalink(CATALOG_PAGE),
		];
		$i++;
	endwhile;

	$data_to_pass = [
		'iconUrl' => plugin_dir_url(__FILE__) . '../src/images/map/',
		'geojsonData' => $coords_array,
	];

	// Output the data into the view.js file.
	echo "<script>window.mapViewData = " . json_encode($data_to_pass) . ";</script>";
	?>

	<div class="create-block-map-wrapper">
		<div id="map-div" class="create-block-map"></div>

		<div class="create-block-map-entries">
			<h3>Nos centres de formation</h3>
			<ul>
				<?php
				foreach ($coords_array as $val) :
					echo '<li class="entry-name"><a class="map-link" href="#" data-id="' . $val['id'] . '">'
						. $val['name'] . '</a></li>';
				endforeach;
				?>
			</ul>
		</div>
	</div>
<?php
endif;
