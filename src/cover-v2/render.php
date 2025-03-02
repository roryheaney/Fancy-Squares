<?php

/**
 * Render callback for the Cover block v2.
 *
 * @param array  $attributes
 * @param string $content    The inner blocks
 */

$classes_array = (! empty($attributes['additionalClasses']) && is_array($attributes['additionalClasses']))
	? $attributes['additionalClasses']
	: [];

// 1) If there's an 'align' property, add alignwide or alignfull.
if (! empty($attributes['align'])) {
	$classes_array[] = 'align' . $attributes['align'];
}

// 2) Add is-position-xxx and has-custom-content-position if set.
if (! empty($attributes['contentPosition'])) {
	$pos_slug = sanitize_title($attributes['contentPosition']);
	if ($attributes['contentPosition'] !== 'center center') {
		$classes_array[] = 'has-custom-content-position';
	}
	$classes_array[] = 'is-position-' . $pos_slug;
}

// Merge and sanitize.
$classes_array = array_unique($classes_array);
$sanitized     = array_map('sanitize_html_class', $classes_array);
$final_class   = implode(' ', $sanitized);

$url      = isset($attributes['url']) ? $attributes['url'] : '';
$is_video = ! empty($attributes['isVideo']);
$lazy     = ! empty($attributes['lazyLoadVideo']);
$dim      = isset($attributes['dimRatio']) ? (int)$attributes['dimRatio'] : 40;

$containerStyles = '';

if (! empty($attributes['fullHeight'])) {
	$containerStyles .= 'height: 100vh; aspect-ratio:unset;';
}

// Build background element styles.
$bg_styles = '';
if (isset($attributes['style']) && isset($attributes['style']['color']) && isset($attributes['style']['color']['gradient'])) {
	$bg_styles .= 'background-image: ' . $attributes['style']['color']['gradient'] . ';';
}
if (! empty($attributes['background'])) {
	$bg_styles .= 'background: ' . $attributes['background'] . ';';
}
if (isset($attributes['style']) && isset($attributes['style']['color'])) {
	$bg_styles .= 'background-color: ' . $attributes['style']['color']['background'] . ';';
}


// Build background element classes.
$bg_classes = 'wp-block-cover__background';
if ($dim !== 0) {
	$bg_classes .= ' has-background-dim';
	// Append opacity into the background styles.
	$bg_styles .= 'opacity: ' . ($dim / 100) . ';';
}
if (isset($attributes['gradient'])) {
	$gradient = $attributes['gradient'];
	$bg_classes .= ' has-' . $gradient . '-gradient-background';
}
if (!empty($attributes['backgroundColor'])) {
	$bg_classes .= ' has-' . $attributes['backgroundColor'] . '-background-color';
}
?>
<div class="<?php echo esc_attr($final_class); ?>" style="<?php echo esc_attr($containerStyles); ?>">
	<div class="<?php echo esc_attr($bg_classes); ?>"
		aria-hidden="true"
		style="<?php echo esc_attr($bg_styles); ?>"></div>

	<div class="wp-block-cover__img-video-wrapper">
		<?php
		if ($url) {
			if ($is_video) {
				if ($lazy) {
					// Lazy load video.
		?>
					<video
						class="wp-block-cover__video-background wp-block-cover__video-background--lazy"
						data-src="<?php echo esc_url($url); ?>"
						autoplay
						loop
						muted
						playsinline
						aria-hidden="true"></video>
				<?php
				} else {
				?>
					<video
						class="wp-block-cover__video-background"
						src="<?php echo esc_url($url); ?>"
						autoplay
						loop
						muted
						playsinline
						aria-hidden="true"></video>
				<?php
				}
			} else {
				?>
				<img
					class="wp-block-cover__image-background"
					src="<?php echo esc_url($url); ?>"
					alt=""
					loading="lazy"
					aria-hidden="true" />
		<?php
			}
		}
		?>
	</div>

	<div class="wp-block-cover__inner-container">
		<?php echo $content; ?>
	</div>
</div>