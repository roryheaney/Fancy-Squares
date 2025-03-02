<?php

/**
 * Content Wrapper block server render.
 *
 * @param array  $attributes The block's attributes.
 * @param string $content    The block's inner HTML from <InnerBlocks.Content />.
 */

$element_tag = isset($attributes['elementTag']) ? $attributes['elementTag'] : 'div';

// Sanitize the element tag to either 'div' or 'section'
if ($element_tag !== 'section') {
	$element_tag = 'div';
}

// Additional classes from user
$classes_array = (isset($attributes['additionalClasses']) && is_array($attributes['additionalClasses']))
	? $attributes['additionalClasses']
	: [];

$sanitized = array_map('sanitize_html_class', $classes_array);
$final_class = implode(' ', $sanitized);

// Merge your extra classes with the wrapper attributes
$wrapper_attributes = get_block_wrapper_attributes(array(
	'class' => $final_class,
));
?>
<<?php echo esc_attr($element_tag); ?> <?php echo $wrapper_attributes; ?>>
	<?php echo $content; ?>
</<?php echo esc_attr($element_tag); ?>>