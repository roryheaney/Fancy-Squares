<?php

/**
 * fs-dynamic-picture-block-render.php
 *
 * This file is included by fs-dynamic-picture-block.php in the render_callback.
 * - If $defaultUrl is empty, uses a 1×1 filler image
 * - If $defaultId = 0, we let the user’s fillerAlt override the alt text
 * - Otherwise, alt text & caption are from the Media Library
 *
 * Border & rounded classes (and border-style) are applied on the <img> element.
 */

// Gather attributes
$defaultId   = ! empty($attributes['defaultImageId']) ? (int) $attributes['defaultImageId'] : 0;
$defaultUrl  = ! empty($attributes['defaultImageUrl']) ? $attributes['defaultImageUrl'] : '';

$smallUrl    = ! empty($attributes['smallImageUrl'])   ? $attributes['smallImageUrl']   : '';
$mediumUrl   = ! empty($attributes['mediumImageUrl'])  ? $attributes['mediumImageUrl']  : '';
$largeUrl    = ! empty($attributes['largeImageUrl'])   ? $attributes['largeImageUrl']   : '';

$aspect      = ! empty($attributes['aspectRatio'])     ? $attributes['aspectRatio']     : 'none';
$fillerAlt   = ! empty($attributes['fillerAlt'])       ? $attributes['fillerAlt']       : '';

// Border & radius classes for the <img>
$borderClass = ! empty($attributes['borderClass'])       ? $attributes['borderClass']       : '';
$radiusClass = ! empty($attributes['borderRadiusClass']) ? $attributes['borderRadiusClass'] : '';

// If the default URL is empty, use a 1×1 transparent GIF
if (! $defaultUrl) {
	$defaultUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
} else {
	$defaultUrl = esc_url($defaultUrl);
}


$borderClass = ! empty($attributes['borderClass']) && is_array($attributes['borderClass'])
	? $attributes['borderClass']
	: [];
$radiusClass = ! empty($attributes['borderRadiusClass']) && is_array($attributes['borderRadiusClass'])
	? $attributes['borderRadiusClass']
	: [];

$smallUrl  = esc_url($smallUrl);
$mediumUrl = esc_url($mediumUrl);
$largeUrl  = esc_url($largeUrl);

// Do we have smaller breakpoints set?
$hasSmall  = ! empty($smallUrl);
$hasMedium = ! empty($mediumUrl);
$hasLarge  = ! empty($largeUrl);

// Alt text & caption
$altText = '';
$caption = '';

if ($defaultId) {
	// Real default image => fetch alt/caption from Media Library
	$altText  = get_post_meta($defaultId, '_wp_attachment_image_alt', true) ?: '';
	$caption  = wp_get_attachment_caption($defaultId) ?: '';
} else {
	// No default => use the user-provided fillerAlt
	$altText = $fillerAlt;
}

/**
 * Build <figure> classes for aspect ratio or default
 * (We no longer add border classes here, as user wants them on the <img>)
 */
$figureClasses = ['wp-block-image', 'fs-block-image'];
if ($aspect && 'none' !== $aspect) {
	$figureClasses[] = 'is-aspect-ratio-' . $aspect;
	$figureClasses[] = 'fs-block-image--has-aspect-ratio';
} else {
	$figureClasses[] = 'fs-block-image--no-aspect-ratio';
}
$figure_class = implode(' ', array_map('esc_attr', $figureClasses));

/**
 * Build <img> classes & inline style if we have a border class
 */
$imgClasses = [];
$imgStyle   = '';

if (count($borderClass)) {
	$imgClasses = array_merge($imgClasses, $borderClass);
	$imgStyle   = 'border-style: solid;';
}
if (count($radiusClass)) {
	$imgClasses = array_merge($imgClasses, $radiusClass);
}

// Convert to final string
$img_class_str = '';
if (! empty($imgClasses)) {
	$img_class_str = ' class="' . esc_attr(implode(' ', $imgClasses)) . '"';
}

// Build inline style attribute if needed
$img_style_str = '';
if ($imgStyle) {
	$img_style_str = ' style="' . esc_attr($imgStyle) . '"';
}

/**
 * Single <img> case: no small/medium/large images
 */
if (! $hasSmall && ! $hasMedium && ! $hasLarge) : ?>
	<figure class="<?php echo $figure_class; ?>">
		<img
			decoding="async"
			loading="lazy"
			src="<?php echo $defaultUrl; ?>"
			alt="<?php echo esc_attr($altText); ?>" <?php echo $img_class_str . $img_style_str; ?> />
		<?php if (! empty($caption)) : ?>
			<figcaption><?php echo wp_kses_post($caption); ?></figcaption>
		<?php endif; ?>
	</figure>
<?php
	return;
endif;
?>

<figure class="<?php echo $figure_class; ?>">
	<picture>
		<?php // Up to 600px
		if ($hasSmall) : ?>
			<source
				media="(max-width: 600px)"
				srcset="<?php echo $smallUrl; ?>" />
		<?php elseif ($hasMedium) : ?>
			<source
				media="(max-width: 600px)"
				srcset="<?php echo $mediumUrl; ?>" />
		<?php endif; ?>

		<?php // 601px–1023px
		if ($hasMedium && $hasSmall) : ?>
			<source
				media="(min-width: 601px) and (max-width: 1023px)"
				srcset="<?php echo $mediumUrl; ?>" />
		<?php elseif ($hasMedium && ! $hasSmall) : ?>
			<source
				media="(max-width: 1023px)"
				srcset="<?php echo $mediumUrl; ?>" />
		<?php endif; ?>

		<?php // >= 1024px
		if ($hasLarge) : ?>
			<source
				media="(min-width: 1024px)"
				srcset="<?php echo $largeUrl; ?>" />
		<?php elseif ($hasMedium) : ?>
			<source
				media="(min-width: 1024px)"
				srcset="<?php echo $mediumUrl; ?>" />
		<?php endif; ?>

		<!-- Fallback <img> with classes & inline style if there's a border class -->
		<img
			decoding="async"
			loading="lazy"
			src="<?php echo $defaultUrl; ?>"
			alt="<?php echo esc_attr($altText); ?>" <?php echo $img_class_str . $img_style_str; ?> />
	</picture>

	<?php if (! empty($caption)) : ?>
		<figcaption><?php echo wp_kses_post($caption); ?></figcaption>
	<?php endif; ?>
</figure>