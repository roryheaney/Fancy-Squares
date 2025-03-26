<?php

/**
 * Accordion block server render
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The inner block markup (accordion items).
 */

$classes = 'fs-accordion';
$attributes_sanitized = ''; // If you had attributes, sanitize them
// Pull the blockId from attributes; default to empty
$block_id = ! empty( $attributes['blockId'] ) ? sanitize_title( $attributes['blockId'] ) : '';
// Output
?>
<div id="fs-accordion-<?php echo esc_attr($block_id); ?>" class="<?php echo esc_attr($classes); ?>" data-fs-accordion="true">
	<?php echo $content; ?>
</div>