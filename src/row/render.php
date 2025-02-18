<?php
/**
 * Render template for the row block.
 *
 * Variables passed in:
 *  - $attributes
 *  - $content
 */

$base_class = 'wp-block-fancysquares-row-block row';

$additional_classes = is_array( $attributes['additionalClasses'] ) 
    ? $attributes['additionalClasses'] 
    : [];

$sanitized = array_map( 'sanitize_html_class', $additional_classes );
$classes   = trim( $base_class . ' ' . implode( ' ', $sanitized ) );
?>
<div class="<?php echo esc_attr( $classes ); ?>">
    <?php echo $content; ?>
</div>
