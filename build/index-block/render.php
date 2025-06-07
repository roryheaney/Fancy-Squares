<?php
// Ensure blockIndex is set and is a number
$blockIndex = isset($attributes['blockIndex']) ? (int)$attributes['blockIndex'] : -1;

/* ──────────────────────────────
*  Classes coming from editor
* ────────────────────────────── */
$classes = array('wp-block-fs-blocks-index-block', 'custom-index-block');

if (! empty($attributes['additionalClasses']) && is_array($attributes['additionalClasses'])) {
	$classes = array_merge($classes, $attributes['additionalClasses']);
}

/* Gutenberg adds colour information to attributes.style / attributes.textColor / attributes.backgroundColor.
	* Core helper ↓ converts those into classes + inline style automatically. */
$wrapper_attrs = get_block_wrapper_attributes(
	array(
		'class' => implode(' ', $classes),
	),
	$attributes
);
/* get_block_wrapper_attributes():
		– adds `has‑foo‑color`, `has‑bar‑background‑color`, gradient classes, etc.
		– adds inline style for custom colours / gradients.
	*/
?>
<div <?php echo $wrapper_attrs; ?> data-block-index="<?php echo esc_attr($blockIndex); ?>">
	<span class="index-number"><?php echo esc_html($blockIndex); ?></span>
</div>
