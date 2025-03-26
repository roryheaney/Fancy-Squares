<?php

/**
 * Server render for fs-accordion-item block
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The child blocks (the paragraph, headings, etc. inside).
 */
$client_id          = isset($attributes['clientId']) ? sanitize_title($attributes['clientId']) : '';
$title             = isset($attributes['title']) ? $attributes['title'] : '';
$parent_accordion  = isset($attributes['parentAccordionId']) ? sanitize_title($attributes['parentAccordionId']) : '';
// print_r($attributes);
?>
<div class="fs-accordion-item">
	<h2 class="fs-accordion-header">
		<button
			class="fs-accordion-button collapsed"
			type="button"
			data-fs-toggle="collapse"
			data-fs-target="#fs-accordion-collapse-<?php echo esc_attr($client_id); ?>"
			aria-expanded="false"
			aria-controls="fs-accordion-collapse-<?php echo esc_attr($client_id); ?>">
			<span><?php echo wp_kses_post($title); ?></span>
		</button>
	</h2>
	<div
		id="fs-accordion-collapse-<?php echo esc_attr($client_id); ?>"
		class="fs-accordion-collapse collapse"
		data-fs-parent="#fs-accordion-<?php echo esc_attr($parent_accordion); ?>">
		<div class="fs-accordion-body">
			<?php echo $content; // The inner blocks content
			?>
		</div>
	</div>
</div>