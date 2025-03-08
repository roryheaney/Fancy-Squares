<?php

/**
 * fs-dynamic-picture-block-render.php
 *
 * This file is included by fs-dynamic-picture-block.php in the render_callback.
 * - If $defaultUrl is empty, uses a 1×1 filler image
 * - If $defaultId = 0, we let the user’s fillerAlt override the alt text
 * - Otherwise, alt text & caption are from the Media Library
 */

// Access $attributes
$defaultId   = ! empty($attributes['defaultImageId']) ? (int) $attributes['defaultImageId'] : 0;
$defaultUrl  = ! empty($attributes['defaultImageUrl']) ? $attributes['defaultImageUrl'] : '';

$smallUrl    = ! empty($attributes['smallImageUrl'])   ? $attributes['smallImageUrl']   : '';
$mediumUrl   = ! empty($attributes['mediumImageUrl'])  ? $attributes['mediumImageUrl']  : '';
$largeUrl    = ! empty($attributes['largeImageUrl'])   ? $attributes['largeImageUrl']   : '';

$aspect      = ! empty($attributes['aspectRatio'])     ? $attributes['aspectRatio']     : 'none';
$fillerAlt   = ! empty($attributes['fillerAlt'])       ? $attributes['fillerAlt']       : '';

// NEW border classes
$borderClass = ! empty($attributes['borderClass'])      ? $attributes['borderClass']      : '';
$radiusClass = ! empty($attributes['borderRadiusClass']) ? $attributes['borderRadiusClass'] : '';

// If the default URL is empty, we use a 1×1 pixel transparent GIF
if (! $defaultUrl) {
	$defaultUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAP///////yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
} else {
	$defaultUrl = esc_url($defaultUrl);
}

$smallUrl  = esc_url($smallUrl);
$mediumUrl = esc_url($mediumUrl);
$largeUrl  = esc_url($largeUrl);

$hasSmall  = ! empty($smallUrl);
$hasMedium = ! empty($mediumUrl);
$hasLarge  = ! empty($largeUrl);

// If there's a real default image, fetch alt/caption from the Media Library
$altText = '';
$caption = '';

if ($defaultId) {
	$altText  = get_post_meta($defaultId, '_wp_attachment_image_alt', true) ?: '';
	$caption  = wp_get_attachment_caption($defaultId) ?: '';
} else {
	// No default image => use the user-provided fillerAlt
	$altText = $fillerAlt;
}

// Build figure classes
$figureClasses = ['wp-block-image', 'fs-block-image'];

if ($aspect && 'none' !== $aspect) {
	// e.g. aspect="16-9" => "is-aspect-ratio-16-9 fs-block-image--has-aspect-ratio"
	$figureClasses[] = 'is-aspect-ratio-' . $aspect;
	$figureClasses[] = 'fs-block-image--has-aspect-ratio';
} else {
	$figureClasses[] = 'fs-block-image--no-aspect-ratio';
}

// If user selected border classes, append them
if ($borderClass) {
	$figureClasses[] = $borderClass;
}
if ($radiusClass) {
	$figureClasses[] = $radiusClass;
}

// Join them into a single string
$figure_class = implode(' ', array_map('esc_attr', $figureClasses));

// If only default is set, simpler <figure>:
if (! $hasSmall && ! $hasMedium && ! $hasLarge) : ?>
	<figure class="<?php echo $figure_class; ?>">
		<img
			src="<?php echo $defaultUrl; ?>"
			alt="<?php echo esc_attr($altText); ?>" />
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

		<!-- Fallback <img> -->
		<img
			src="<?php echo $defaultUrl; ?>"
			alt="<?php echo esc_attr($altText); ?>" />
	</picture>

	<?php if (! empty($caption)) : ?>
		<figcaption><?php echo wp_kses_post($caption); ?></figcaption>
	<?php endif; ?>
</figure>