<?php

/**
 * Render callbacks for FancySquare Blocks.
 *
 * All these functions just return rendered HTML for each block type.
 * We assume the partial (render.php) in each build folder does the final output.
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

/**
 * Render callback for the container block.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Inner block markup.
 * @return string            HTML markup.
 */
// function fsblocks_render_container_block($attributes, $content)
// {
// 	$additional_class = isset($attributes['additionalClass'])
// 		? sanitize_html_class($attributes['additionalClass'])
// 		: '';

// 	$classes = 'container';
// 	if (! empty($additional_class)) {
// 		$classes .= ' ' . $additional_class;
// 	}

// 	ob_start();
// 	include plugin_dir_path(__FILE__) . '../build/container/render.php';
// 	return ob_get_clean();
// }

/**
 * Render callback for the content-wrapper block.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Inner block markup.
 * @return string            HTML markup.
 */
function fsblocks_render_content_wrapper_block($attributes, $content)
{
	$additional_class = isset($attributes['additionalClass'])
		? sanitize_html_class($attributes['additionalClass'])
		: '';

	// $classes = 'content-wrapper';
	// if (! empty($additional_class)) {
	// 	$classes .= ' ' . $additional_class;
	// }

	ob_start();
	include plugin_dir_path(__FILE__) . '../build/content-wrapper/render.php';
	return ob_get_clean();
}

/**
 * Render callback for the Accordion block.
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The inner block markup (Accordion Item blocks).
 * @return string            The rendered HTML.
 */
function fsblocks_render_accordion_block($attributes, $content)
{
	// If you have any specific attributes for the accordion parent, handle them here.
	// For now, we'll just pass everything to "render.php".
	ob_start();
	include plugin_dir_path(__FILE__) . '../build/accordion/render.php';
	return ob_get_clean();
}

/**
 * Render callback for the Accordion Item block.
 *
 * @param array  $attributes The block attributes (title, clientId, etc.).
 * @param string $content    The inner block markup (paragraphs, etc.).
 * @return string            The rendered HTML.
 */
function fsblocks_render_accordion_item_block($attributes, $content)
{
	ob_start();
	include plugin_dir_path(__FILE__) . '../build/accordion-item/render.php';
	return ob_get_clean();
}

/**
 * Render callback for the Modal Button block.
 */
function fsblocks_render_modal_button_block($attributes, $content)
{
	ob_start();
	include plugin_dir_path(__FILE__) . '../build/modal-button/render.php';
	return ob_get_clean();
}

/**
 * Render callback for the Modal block.
 */
function fsblocks_render_modal_block($attributes, $content)
{
	ob_start();
	include plugin_dir_path(__FILE__) . '../build/modal/render.php';
	return ob_get_clean();
}

/**
 * Render callback for the Alert block.
 *
 * @param array  $attributes
 * @param string $content
 * @return string
 */
function fsblocks_render_alert_block($attributes, $content)
{
	ob_start();
	include plugin_dir_path(__FILE__) . '../build/alert/render.php';
	return ob_get_clean();
}

/**
 * Render callback for the updated Cover Block (v2).
 *
 * @param array  $attributes
 * @param string $content
 * @return string
 */
function fsblocks_render_cover_v2_block($attributes, $content)
{
	ob_start();
	include plugin_dir_path(__FILE__) . '../build/cover-v2/render.php';
	return ob_get_clean();
}

/**
 * Render callback for the tabbed panels block.
 *
 * @param array  $attributes
 * @param string $content
 * @return string
 */
function fsblocks_render_tabs_block($attributes, $content, $block)
{
	$tabs = [];

	foreach ($block->inner_blocks as $inner_block) {
		if ('fs-blocks/tab-item' === $inner_block->name) {
			$tab_id = $inner_block->attributes['tabId'] ?? '';
			$tabs[] = [
				'id' => $tab_id,
				'title' => $inner_block->attributes['title'] ?? 'New Tab',
				'content' => $inner_block->render()
			];
		}
	}

	// Set first tab as active if none specified
	if (empty($attributes['activeTab']) && !empty($tabs)) {
		$attributes['activeTab'] = $tabs[0]['id'];
	}

	ob_start();
	include plugin_dir_path(__FILE__) . '../build/tabs/render.php';
	return ob_get_clean();
}

/**
 * Render callback for the tab item block.
 *
 * @param array  $attributes
 * @param string $content
 * @return string
 */
function fsblocks_render_tab_item_block($attributes, $content)
{
	ob_start();
	include plugin_dir_path(__FILE__) . '../build/tab-item/render.php';
	return ob_get_clean();
}



/**
 * Render callback for the FancySquares Carousel block.
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The raw block content (containing child blocks).
 * @return string            The final HTML.
 */
function fsblocks_render_carousel_block($attributes, $content)
{
	ob_start();
	// We assume that `render-callbacks.php` is in the same folder as your plugin file,
	// so adjust path as needed:
	include plugin_dir_path(__FILE__) . '../build/carousel/render.php';
	return ob_get_clean();
}

/**
 * Render callback for the FancySquares Slide block.
 *
 * @param array  $attributes
 * @param string $content
 * @return string
 */
function fsblocks_render_slide_block($attributes, $content)
{
	ob_start();
	include plugin_dir_path(__FILE__) . '../build/carousel-slide/render.php';
	return ob_get_clean();
}


/**
 * Callback that includes the raw markup from fs-dynamic-picture-block-render.php.
 */
function fs_dynamic_picture_block_render_callback($attributes)
{
	ob_start();
	include plugin_dir_path(__FILE__) . '../build/picture-block/render.php';
	return ob_get_clean();
}


/**
 * Render callback for the Index Block.
 *
 * @param array  $attributes Block attributes.
 * @param string $content    Inner block markup (unused).
 * @return string            Rendered output.
 */
function fsblocks_render_index_block($attributes, $content)
{
	// Start output buffering
	ob_start();

	// Make $attributes available in render.php
	include plugin_dir_path(__FILE__) . '../build/index-block/render.php';

	// Return the buffered output
	return ob_get_clean();
}
