<?php
// Ensure blockIndex is set and is a number
$blockIndex = isset($attributes['blockIndex']) ? (int)$attributes['blockIndex'] : -1;

// Output your custom markup
?>
<div class="wp-block-fs-blocks-index-block custom-index-block">
	<span class="index-number"><?php echo esc_html($blockIndex); ?></span>
	<!-- Add any additional markup or logic here -->
</div>