<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

require_once dirname(__DIR__) . '/vendor/autoload.php';

$centresEtab = new WP_Query([
	'post_type' => 'centre-formation',
	'posts_per_page' => -1,
	'meta_query' => [
		'relation' => 'AND',
		[
			'key' => 'type_de_centre',
			'value' => 'Etablissement scolaire partenaire',
			'compare' => '=',
		],
		[
			'key' => 'latitude',
			'value' => '',
			'compare' => '!='
		]
	]
]);
$centresPros = new WP_Query([
	'post_type' => 'centre-formation',
	'posts_per_page' => -1,
	'meta_query' => [
		'relation' => 'AND',
		[
			'key' => 'type_de_centre',
			'value' => 'Centre de formation constructeurs',
			'compare' => '=',
		],
		[
			'key' => 'latitude',
			'value' => '',
			'compare' => '!='
		]
	]
]);

$centres = [...$centresEtab->posts, ...$centresPros->posts];
if (count($centres) > 0) :
	// Configure the Google Client.
	$i = 1;
	foreach ($centres as $centre):
		$latitude = get_field('latitude', $centre->ID);
		$longitude = get_field('longitude', $centre->ID);
		$adresse = get_field('adresse', $centre->ID);
		$photo = get_field('photo', $centre->ID);
		$typeCentre = get_field('type_de_centre', $centre->ID);
		$name = $centre->post_title;

		$image = $photo ? $photo['sizes']['thumbnail'] : '';

		$desc = $image . '<b>' . $name . '</b><br>' . $typeCentre . '<br><br>' . $adresse;
		if(!empty($latitude) || !empty($longitude)) {
			$coords_array[] = [
				"name" => $name,
				"adresse" => nl2br($adresse),
				"latitude" => $latitude,
				"longitude" => $longitude,
				"marker" => $typeCentre === 'Centre de formation constructeurs' ? 1 : 2,
				"description" => $desc,
				"typeCentre" => $typeCentre,
				"centreFormation" => $centre->ID,
				"image" => $image,
				"id" => $i,
				"catalog" => get_permalink(CATALOG_PAGE),
			];
			$i++;
		}
	endforeach;

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
			<h3 class="mb-4">Nos centres de formation</h3>
			<div class="d-flex flex-md-row flex-column">
				<div class="col-md-6 pe-md-3">
					<a href="<?php echo get_permalink(CATALOG_PAGE); ?>?type_de_formation=base" class="btn btn-base">
						Formations des établissements
					</a>
					<h4>Établissements scolaires partenaires</h4>
					<ul>
						<?php
							$j=1;
						foreach ($centresEtab->posts as $etab) :
							echo '<li class="entry-name"><a class="map-link" href="#" data-id="' . $j . '">'
								. $etab->post_title . '</a></li>';
						$j++;
						endforeach;
						?>
					</ul>
				</div>
				<div class="col-md-6 ps-md-3">
					<a href="<?php echo get_permalink(CATALOG_PAGE); ?>?type_de_formation=avance" class="btn btn-avance">
						Formations constructeurs
					</a>
					<h4>Centres de formations constructeurs</h4>
					<ul>
						<?php
						foreach ($centresPros->posts as $val) :
							echo '<li class="entry-name"><a class="map-link" href="#" data-id="' . $j . '">'
								. $val->post_title . '</a></li>';
						$j++;
						endforeach;
						?>
					</ul>
				</div>
			</div>

		</div>
	</div>
<?php
endif;
