<?php

/**
 * Actual HTML logic for the FancySquares Slide block.
 */

// 1. Parse attributes
$vertical_align = $attributes['verticalAlign'] ?? '';
$classes = 'swiper-slide';
if ($vertical_align) {
	$classes .= ' are-vertically-aligned-' . $vertical_align;
}

// 2. If the slide has nested blocks (e.g. images, cover), parse them:
$inner_html = do_blocks($content);
?>
<div class="<?php echo esc_attr($classes); ?>" role="group">
	<?php echo $inner_html; ?>
</div>