<?php

/**
 * Server render for slide block
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The inner blocks content.
 */

// Sanitize vertical alignment
$vertical_align = isset($attributes['verticalAlign']) ?
	sanitize_html_class($attributes['verticalAlign']) :
	'';

// Build class list
$classes = array('swiper-slide');
if (!empty($vertical_align)) {
	$classes[] = 'are-vertically-aligned-' . $vertical_align;
}
?>

<div class="wp-block-fancysquares-slide <?php echo esc_attr(implode(' ', $classes)); ?>" aria-roledescription="slide">
	<?php echo $content; // Inner blocks content
	?>
</div>