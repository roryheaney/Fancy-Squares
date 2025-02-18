<?php
/**
 * Container block server render.
 *
 * @param array  $attributes The block's attributes.
 * @param string $content    The block's inner HTML from <InnerBlocks.Content />.
 */

$classes_array = ( isset($attributes['additionalClasses']) && is_array($attributes['additionalClasses']) )
	? $attributes['additionalClasses']
	: [];

$sanitized = array_map( 'sanitize_html_class', $classes_array );
$final_class = implode( ' ', $sanitized );
?>
<div class="<?php echo esc_attr( $final_class ); ?>">
	<?php echo $content; ?>
</div>
