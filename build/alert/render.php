<?php
/**
 * Alert block server render.
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The block’s content (unused here unless you had InnerBlocks).
 */

// Because we store text in the attribute "alertContent," we’ll retrieve it:
$alert_content = isset( $attributes['alertContent'] ) ? $attributes['alertContent'] : '';

// The user-chosen classes:
$additional_classes = ( isset( $attributes['additionalClasses'] ) && is_array( $attributes['additionalClasses'] ) )
	? $attributes['additionalClasses']
	: [];

// Always include "alert"
$base_class = 'alert';

// Combine them
$sanitized = array_map( 'sanitize_html_class', $additional_classes );
$final_class = trim( $base_class . ' ' . implode( ' ', $sanitized ) );
?>
<div class="<?php echo esc_attr( $final_class ); ?>">
	<?php
	// If you want to allow some HTML in alertContent:
	echo wp_kses_post( $alert_content );
	?>
</div>
