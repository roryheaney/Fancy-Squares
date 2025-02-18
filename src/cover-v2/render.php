<?php
/**
 * Render callback for the Cover block v2.
 *
 * @param array  $attributes
 * @param string $content    The inner blocks
 */

$classes_array = ( ! empty($attributes['additionalClasses']) && is_array($attributes['additionalClasses']) )
	? $attributes['additionalClasses']
	: [];

// 1) If there's an 'align' property, add alignwide or alignfull
if ( ! empty($attributes['align']) ) {
	$classes_array[] = 'align' . $attributes['align'];
}

// 2) Add is-position-xxx + has-custom-content-position if set
if ( ! empty($attributes['contentPosition']) ) {
	// sanitize_title => similar to WP approach
	$pos_slug = sanitize_title( $attributes['contentPosition'] );
	if ( $attributes['contentPosition'] !== 'center center' ) {
		$classes_array[] = 'has-custom-content-position';
	}
	$classes_array[] = 'is-position-' . $pos_slug;
}

// Merge/sanitize
$classes_array = array_unique( $classes_array );
$sanitized     = array_map( 'sanitize_html_class', $classes_array );
$final_class   = implode( ' ', $sanitized );

$url      = isset($attributes['url']) ? $attributes['url'] : '';
$is_video = ! empty($attributes['isVideo']);
$lazy     = ! empty($attributes['lazyLoadVideo']);
$dim      = isset($attributes['dimRatio']) ? (int)$attributes['dimRatio'] : 40;

$styles = '';

if ( ! empty($attributes['fullHeight']) ) {
	$styles .= 'height: 100vh; aspect-ratio:unset;';
}
if ( isset($attributes['style']) && isset($attributes['style']['color']) ) {
	$styles .= 'background-color: ' . $attributes['style']['color']['background'] . ';';
}

if ( isset($attributes['style']) && isset($attributes['style']['color']) && isset($attributes['style']['color']['gradient']) ) {
	$styles .= 'background-image: ' . $attributes['style']['color']['gradient'] . ';';
}

if (  isset($attributes['gradient']) ) {
	$gradient = $attributes['gradient'];
	$gradient_class = 'has-' . $gradient . '-gradient-background';
	$final_class .= ' ' . $gradient_class;
}

?>
<div class="<?php echo esc_attr( $final_class ); ?>" style="<?php echo esc_attr($styles); ?>">
	<span
		class="wp-block-cover__background has-background-dim"
		aria-hidden="true"
		style="opacity: <?php echo esc_attr($dim / 100); ?>;"
	></span>

	<?php
	if ( $url ) {
		if ( $is_video ) {
			if ( $lazy ) {
				// lazy load video
				?>
				<video
					class="wp-block-cover__video-background"
					data-src="<?php echo esc_url($url); ?>"
					autoplay
					loop
					muted
					playsinline
					aria-hidden="true"
				></video>
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
					aria-hidden="true"
				></video>
				<?php
			}
		} else {
			?>
			<img
				class="wp-block-cover__image-background"
				src="<?php echo esc_url($url); ?>"
				alt=""
				loading="lazy"
				aria-hidden="true"
			/>
			<?php
		}
	}
	?>

	<div class="wp-block-cover__inner-container">
		<?php echo $content; ?>
	</div>
</div>
