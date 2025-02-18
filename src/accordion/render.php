<?php
/**
 * Accordion block server render
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The inner block markup (accordion items).
 */

$classes = 'accordion';
$attributes_sanitized = ''; // If you had attributes, sanitize them

// Output
?>
<div class="<?php echo esc_attr( $classes ); ?>" data-bs-accordion="true">
    <?php echo $content; ?>
</div>
