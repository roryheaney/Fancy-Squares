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
	</select>
	<p class="description">
		<?php esc_html_e('Choose whether to load Bootstrap 5 CSS/JS in the block editor.', 'fs-blocks'); ?>
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
 * Conditionally enqueue Bootstrap in the block editor when the user chooses "Bootstrap 5".
 *
 * @param string $hook The current admin page.
 */
function fancysquares_fs_blocks_enqueue_editor_assets($hook)
{
	// Only load on post edit screens
	if ('post.php' !== $hook && 'post-new.php' !== $hook) {
		return;
	}

	$bootstrap_setting = get_option('fancysquares_fs_blocks_bootstrap', '');
	if ('bootstrap5' === $bootstrap_setting) {
		// Enqueue Bootstrap CSS
		wp_enqueue_style(
			'fancysquares-bootstrap5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
			array(),
			'5.3.3'
		);

		// Enqueue Bootstrap JS Bundle
		wp_enqueue_script(
			'fancysquares-bootstrap5',
			'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
			array(),
			'5.3.3',
			true
		);
	}
}
add_action('admin_enqueue_scripts', 'fancysquares_fs_blocks_enqueue_editor_assets');
/**
 * Enqueue Bootstrap on the front end of the site.
 */
function fancysquares_fs_blocks_enqueue_frontend()
{
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
