<?php

/**
 * Server render for carousel block
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The inner blocks (slide items).
 */

// Default attributes
$defaults = array(
	'slidesToShow'             => 1,
	'columnGap'               => 0,
	'pagination'              => false,
	'navigation'              => false,
	'autoplay'                => false,
	'delay'                   => 3000,
	'loop'                    => false,
	'speed'                   => 500,
	'enableFade'              => false,
	'fractionalSlidesEnabled' => false,
	'fractionalSlidesValue'   => 0.25,
	'showPlayPauseButton'     => false,
	'breakpoints'             => array(),
	'autoHeight'              => false,
);

// Merge with defaults
$attributes = wp_parse_args($attributes, $defaults);

// Build Swiper configuration
$swiper_data = array(
	'slidesPerView' => $attributes['slidesToShow'],
	'spaceBetween'  => $attributes['columnGap'],
	'loop'          => $attributes['loop'],
	'speed'         => $attributes['speed'],
);

// Handle fractional slides
if ($attributes['slidesToShow'] === 1 && $attributes['fractionalSlidesEnabled']) {
	$swiper_data['slidesPerView'] = 1 + $attributes['fractionalSlidesValue'];
}

// Handle fade effect
if ($attributes['enableFade'] && $attributes['slidesToShow'] === 1) {
	$swiper_data['effect'] = 'fade';
	$swiper_data['fadeEffect'] = array('crossFade' => true);
}

// Handle breakpoints
if (!empty($attributes['breakpoints'])) {
	$swiper_data['breakpoints'] = array();
	foreach ($attributes['breakpoints'] as $bp) {
		$swiper_data['breakpoints'][$bp['breakpoint']] = array(
			'slidesPerView' => $bp['slidesToShow']
		);
	}
}

// Handle autoplay
if ($attributes['autoplay']) {
	$swiper_data['autoplay'] = array(
		'delay' => $attributes['delay'],
		'pauseOnMouseEnter' => true,
		'disableOnInteraction' => false
	);
}

// Handle pagination
if ($attributes['pagination']) {
	$swiper_data['pagination'] = array(
		'el' => '.swiper-pagination',
		'clickable' => true,
		'bulletElement' => 'button'
	);
}

// Handle navigation
if ($attributes['navigation']) {
	$swiper_data['navigation'] = array(
		'nextEl' => '.swiper-button-next',
		'prevEl' => '.swiper-button-prev'
	);
}

// Handle autoHeight
if ($attributes['autoHeight']) {
	print_r($attributes['autoHeight']);
	$swiper_data['autoHeight'] = true;
}

// Classes for pause/pagination container
$pause_pagination_classes = array('swiper-pause-pagination');
if (!$attributes['showPlayPauseButton'] && !$attributes['pagination']) {
        $pause_pagination_classes[] = 'd-none';
}

$wrapper_attributes = get_block_wrapper_attributes(
        array(
                'class' => 'swiper',
                'data-swiper' => wp_json_encode($swiper_data),
                'aria-roledescription' => 'carousel',
                'aria-label' => 'Highlighted content',
        )
);
?>

<div <?php echo $wrapper_attributes; ?>>
	<div class="swiper-wrapper">
		<?php echo $content; // Slide items
		?>
	</div>

	<div class="<?php echo esc_attr(implode(' ', $pause_pagination_classes)); ?>">
		<div class="swiper-pause-pagination__inner-container">
			<?php if ($attributes['navigation']) : ?>
				<button class="swiper-button-prev"></button>
			<?php endif; ?>
			<?php if ($attributes['navigation']) : ?>
				<button class="swiper-button-next"></button>
			<?php endif; ?>
			<div className="swiper-pause-pagination__inner-container">
				<?php if ($attributes['showPlayPauseButton']) : ?>
					<button class="swiper__button-control" aria-label="<?php esc_attr_e('Carousel is playing, click to pause', 'fancysquares'); ?>">
						<span aria-hidden="true"><?php esc_html_e('Pause', 'fancysquares'); ?></span>
						<span aria-hidden="true" class="d-none"><?php esc_html_e('Play', 'fancysquares'); ?></span>
					</button>
				<?php endif; ?>
				<?php if ($attributes['pagination']) : ?>
					<div class="swiper-pagination"></div>
				<?php endif; ?>
			</div>
		</div>
	</div>

</div>