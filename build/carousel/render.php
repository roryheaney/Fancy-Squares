<?php

/**
 * Actual HTML logic for the FancySquares Carousel block.
 * The variables $attributes and $content are available from the including function.
 */

// 1. Parse attributes
$slides_to_show = $attributes['slides_to_show'] ?? 3;
$column_gap     = $attributes['column_gap']     ?? 30;
$pagination     = ! empty($attributes['pagination']);
$navigation     = ! empty($attributes['navigation']);
$autoplay       = ! empty($attributes['autoplay']);
$delay          = $attributes['delay']          ?? 2000;
$loop           = ! empty($attributes['loop']);
$breakpoints    = $attributes['breakpoints']    ?? [];
$speed          = $attributes['speed']          ?? 300;

// 2. Build the Swiper config
$swiper_data = [
	'slidesPerView' => (int) $slides_to_show,
	'speed'         => (int) $speed,
	'spaceBetween'  => (int) $column_gap,
	'breakpoints'   => [],
];
foreach ($breakpoints as $bp) {
	if (isset($bp['breakpoint'], $bp['slides_to_show'])) {
		$swiper_data['breakpoints'][(int) $bp['breakpoint']] = [
			'slidesPerView' => (int) $bp['slides_to_show'],
		];
	}
}
if ($autoplay) {
	$swiper_data['autoplay'] = ['delay' => (int) $delay];
	if ($loop) {
		$swiper_data['loop'] = true;
	}
}
if ($pagination) {
	$swiper_data['pagination'] = [
		'el'        => '.swiper-pagination',
		'clickable' => true,
	];
}
if ($navigation) {
	$swiper_data['navigation'] = [
		'nextEl' => '.swiper-button-next',
		'prevEl' => '.swiper-button-prev',
	];
}

$json_config = wp_json_encode($swiper_data);

// 3. Render child blocks
//   `$content` is raw block markup (comment-delimited).
//   We call `do_blocks($content)` so nested blocks get processed.
$inner_html = do_blocks($content);
?>
<div
	class="swiper"
	role="region"
	aria-roledescription="carousel"
	aria-label="FancySquares Carousel"
	data-swiper="<?php echo esc_attr($json_config); ?>">
	<div class="swiper-wrapper">
		<?php echo $inner_html; ?>
	</div>

	<?php if ($pagination) : ?>
		<div class="swiper-pagination" aria-hidden="true"></div>
	<?php endif; ?>

	<?php if ($navigation) : ?>
		<button class="swiper-button-next" aria-label="Next Slide"></button>
		<button class="swiper-button-prev" aria-label="Previous Slide"></button>
	<?php endif; ?>
</div>