<?php

/**
 * Admin settings and enqueuing for FancySquare Blocks
 *
 * @package FancySquare
 */

if (! defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

/**
 * Registers the plugin setting and its controls.
 */
function fancysquares_fs_blocks_register_settings()
{
	register_setting(
		'fancysquares_fs_blocks_settings',
		'fancysquares_fs_blocks_bootstrap',
		array(
			'type'              => 'string',
			'description'       => 'Which Bootstrap version to load in the editor.',
			'default'           => '',
			'sanitize_callback' => 'sanitize_text_field',
		)
	);

	add_settings_section(
		'fancysquares_fs_blocks_general_section',
		__('FancySquare Blocks Settings', 'fs-blocks'),
		'__return_null',
		'fancysquares_fs_blocks_settings'
	);

	add_settings_field(
		'fancysquares_fs_blocks_bootstrap_field',
		__('Load Bootstrap in Editor?', 'fs-blocks'),
		'fancysquares_fs_blocks_bootstrap_field_render',
		'fancysquares_fs_blocks_settings',
		'fancysquares_fs_blocks_general_section'
	);
}
add_action('admin_init', 'fancysquares_fs_blocks_register_settings');

/**
 * Renders the select field for the "Load Bootstrap in Editor?" setting.
 */
function fancysquares_fs_blocks_bootstrap_field_render()
{
	$value = get_option('fancysquares_fs_blocks_bootstrap', '');
?>
	<select name="fancysquares_fs_blocks_bootstrap" id="fancysquares_fs_blocks_bootstrap">
		<option value="" <?php selected($value, ''); ?>>
			<?php esc_html_e('None', 'fs-blocks'); ?>
		</option>
		<option value="bootstrap5" <?php selected($value, 'bootstrap5'); ?>>
			<?php esc_html_e('Bootstrap 5 (CDN)', 'fs-blocks'); ?>
		</option>
		<!-- Add the new "vanilla" option here -->
		<option value="vanilla" <?php selected($value, 'vanilla'); ?>>
			<?php esc_html_e('Vanilla (Sans Bootstrap)', 'fs-blocks'); ?>
		</option>
	</select>
	<p class="description">
		<?php esc_html_e('Choose whether to load Bootstrap 5 CSS/JS or a vanilla stylesheet in the block editor.', 'fs-blocks'); ?>
	</p>
<?php
}

/**
 * Adds a new settings page under "Settings" -> "FancySquare Blocks".
 */
function fancysquares_fs_blocks_add_settings_page()
{
	add_options_page(
		__('FancySquare Blocks', 'fs-blocks'),
		__('FancySquare Blocks', 'fs-blocks'),
		'manage_options',
		'fancysquares_fs_blocks_settings',
		'fancysquares_fs_blocks_settings_page_html'
	);
}
add_action('admin_menu', 'fancysquares_fs_blocks_add_settings_page');

/**
 * The settings page HTML output.
 */
function fancysquares_fs_blocks_settings_page_html()
{
	if (! current_user_can('manage_options')) {
		return;
	}
?>
	<div class="wrap">
		<h1><?php esc_html_e('FancySquare Blocks Settings', 'fs-blocks'); ?></h1>
		<form action="options.php" method="post">
			<?php
			settings_fields('fancysquares_fs_blocks_settings');
			do_settings_sections('fancysquares_fs_blocks_settings');
			submit_button();
			?>
		</form>
	</div>
<?php
}

/**
 * Enqueue Bootstrap (if enabled) in the block editor's iframe.
 */
function fancysquares_fs_blocks_enqueue_editor_iframe_assets()
{
	$bootstrap_setting = get_option('fancysquares_fs_blocks_bootstrap', '');

	if ('bootstrap5' === $bootstrap_setting) {
		wp_enqueue_style(
			'fancysquares-bootstrap5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
			array(),
			'5.3.3'
		);
		wp_enqueue_script(
			'fancysquares-bootstrap5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
			array(),
			'5.3.3',
			true
		);
	}
	// If "vanilla" is selected, enqueue the "sans-bootstrap.css" file instead
	elseif ('vanilla' === $bootstrap_setting) {
		$file_path = plugin_dir_path(__FILE__) . 'build/styles/sans-bootstrap.css';
		$file_url  = plugin_dir_url(__FILE__) . 'build/styles/sans-bootstrap.css';

		// Use filemtime() for versioning if file exists
		$version = file_exists($file_path) ? filemtime($file_path) : false;

		wp_enqueue_style(
			'fancysquares-vanilla',
			$file_url,
			array(),
			$version
		);
	}
}
add_action('enqueue_block_assets', 'fancysquares_fs_blocks_enqueue_editor_iframe_assets');

/**
 * Enqueue styles/scripts on the front end.
 */
function fancysquares_fs_blocks_enqueue_frontend()
{
	$bootstrap_setting = get_option('fancysquares_fs_blocks_bootstrap', '');

	// Load Bootstrap if the user chose "bootstrap5"
	if ('bootstrap5' === $bootstrap_setting) {
		wp_enqueue_style(
			'fancysquares-bootstrap5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
			array(),
			'5.3.3'
		);

		wp_enqueue_script(
			'fancysquares-bootstrap5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
			array(),
			'5.3.3',
			true
		);
	}
	// Otherwise, if the user wants "vanilla", load sans-bootstrap.css
	elseif ('vanilla' === $bootstrap_setting) {
		$file_path = plugin_dir_path(__FILE__) . 'build/styles/sans-bootstrap.css';
		$file_url  = plugin_dir_url(__FILE__) . 'build/styles/sans-bootstrap.css';

		// Use filemtime() for versioning if file exists
		$version = file_exists($file_path) ? filemtime($file_path) : false;

		wp_enqueue_style(
			'fancysquares-vanilla',
			$file_url,
			array(),
			// $version
		);
	}

	// Swiper scripts/styles (always loaded, or load conditionally as needed)
	wp_enqueue_style(
		'fancysquares-swiper',
		'//cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
		array(),
		'5.3.3'
	);
	wp_enqueue_script(
		'fancysquares-swiper',
		'//cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
		array(),
		'5.3.3',
		true
	);
}
add_action('wp_enqueue_scripts', 'fancysquares_fs_blocks_enqueue_frontend');
