<?php
/**
 * Modal Button block server render.
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The inner block markup (unused here).
 */

$button_text = isset( $attributes['buttonText'] ) ? $attributes['buttonText'] : 'Open Modal';
$modal_id    = isset( $attributes['modalId'] ) ? $attributes['modalId'] : '';

$button_class = 'btn btn-primary';

// If user provided a modal ID, we build the data attributes
$data_toggle = $modal_id ? 'modal' : '';
$data_target = $modal_id ? "#{$modal_id}" : '';

?>
<button
	type="button"
	class="<?php echo esc_attr( $button_class ); ?>"
	<?php if ( $data_toggle ) : ?>
		data-bs-toggle="<?php echo esc_attr( $data_toggle ); ?>"
		data-bs-target="<?php echo esc_attr( $data_target ); ?>"
	<?php endif; ?>
>
	<?php echo esc_html( $button_text ); ?>
</button>
