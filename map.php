<?php

/**
 * Plugin Name:       Map
 * Description:       Leaflet GeoJSON map based on data from a Google spreadsheet.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Fondation UNIT
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       map
 *
 * @package CreateBlock
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_map_block_init() {
	register_block_type(__DIR__ . '/build');

	// Enqueue Leaflet styles for proper display.
	wp_enqueue_style('create-block-map-leaflet', plugins_url('src/css/leaflet.css', __FILE__));
}
add_action('init', 'create_block_map_block_init');
