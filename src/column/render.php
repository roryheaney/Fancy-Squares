<?php
/**
 * Render template for the column block.
 *
 * Variables available in this scope:
 *   $attributes
 *   $content
 */

// Retrieve the merged array of classes
$additional_classes = isset( $attributes['additionalClasses'] ) && is_array( $attributes['additionalClasses'] )
	? $attributes['additionalClasses']
	: [];

// Base class for your column block
$base_class = 'wp-block-fancysquares-column-block col';

// Sanitize each additional class
$sanitized = array_map( 'sanitize_html_class', $additional_classes );

// Combine into a single space-separated string
$classes = trim( $base_class . ' ' . implode( ' ', $sanitized ) );
?>
<div class="<?php echo esc_attr( $classes ); ?>">
	<?php echo $content; ?>
</div>
