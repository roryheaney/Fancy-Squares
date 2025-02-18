<?php
/**
 * Server render for accordion-item block
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The child blocks (the paragraph, headings, etc. inside).
 */
$client_id = isset( $attributes['clientId'] ) ? sanitize_title( $attributes['clientId'] ) : '';
$title     = isset( $attributes['title'] ) ? $attributes['title'] : '';

// Build the final HTML.
// If you want to further sanitize the title, you could sanitize_text_field or wp_kses_post it.
?>
<div class="accordion-item">
	<h2 class="accordion-header">
		<button
			class="accordion-button collapsed"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#accordion-collapse-<?php echo esc_attr( $client_id ); ?>"
			aria-expanded="false"
			aria-controls="accordion-collapse-<?php echo esc_attr( $client_id ); ?>"
		>
			<span><?php echo wp_kses_post( $title ); ?></span>
		</button>
	</h2>
	<div
		id="accordion-collapse-<?php echo esc_attr( $client_id ); ?>"
		class="accordion-collapse collapse"
		data-bs-parent="[data-bs-accordion]"
	>
		<div class="accordion-body">
			<?php echo $content; // The inner blocks content ?>
		</div>
	</div>
</div>
