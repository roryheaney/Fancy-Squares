<?php

/**
 * Plugin Name:       Fancy Squares - Blocks
 * Description:       A collection of custom blocks
 * Version:           1.0.0-rc.1
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Rory Heaney
 * Author URI:        https://fancysquares.blog/
 * License:           GPL-2.0-or-later
 * Text Domain:       fs-blocks
 *
 * @package Fancysquares
 */

if (! defined('ABSPATH')) {
	exit;
}

// 1) Include your render callback definitions
require_once plugin_dir_path(__FILE__) . 'lib/render-callbacks.php';

// 2) Include admin settings
require_once plugin_dir_path(__FILE__) . 'lib/admin-settings.php';

/**
 * Registers all blocks on init.
 */
function fancysquares_fs_blocks_block_init()
{
	// content-wrapper block
	register_block_type(
		__DIR__ . '/build/content-wrapper',
		array(
			'render_callback' => 'fsblocks_render_content_wrapper_block',
		)
	);

	// accordion (parent) block
	register_block_type(
		__DIR__ . '/build/accordion',
		array(
			'render_callback' => 'fsblocks_render_accordion_block', // function in render-callbacks.php
		)
	);

	// accordion item (child) block
	register_block_type(
		__DIR__ . '/build/accordion-item',
		array(
			'render_callback' => 'fsblocks_render_accordion_item_block',
		)
	);

	// modal
	register_block_type(
		__DIR__ . '/build/modal',
		array(
			'render_callback' => 'fsblocks_render_modal_block',
		)
	);

	// alert block
	register_block_type(
		__DIR__ . '/build/alert',
		array(
			'render_callback' => 'fsblocks_render_alert_block',
		)
	);

	// Tabbed Panel (parent) block registration.
	register_block_type(
		__DIR__ . '/build/tabs',
		array(
			'render_callback' => 'fsblocks_render_tabs_block',
		)
	);

	// Tab Item (child) block registration.
	register_block_type(
		__DIR__ . '/build/tab-item',
		array(
			'render_callback' => 'fsblocks_render_tab_item_block',
		)
	);

	// Register the Carousel block from metadata, override render_callback
	register_block_type_from_metadata(
		__DIR__ . '/build/carousel',
		[
			'render_callback' => 'fsblocks_render_carousel_block', // from render-callback.php
		]
	);

	// Register the Slide block from metadata, override render_callback
	register_block_type_from_metadata(
		__DIR__ . '/build/carousel-slide',
		[
			'render_callback' => 'fsblocks_render_slide_block',
		]
	);

	// Register the picture block from metadata, override render_callback
	register_block_type_from_metadata(
		__DIR__ . '/build/picture-block',
		[
			'render_callback' => 'fs_dynamic_picture_block_render_callback',
		]
	);

	// Register the Index Block from metadata, override render_callback
	register_block_type_from_metadata(
		__DIR__ . '/build/index-block',
		[
			'render_callback' => 'fsblocks_render_index_block',
		]
	);
}
add_action('init', 'fancysquares_fs_blocks_block_init');
