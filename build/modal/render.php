<?php
/**
 * Modal block server render.
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The modal's inner content.
 */

$modal_id = ! empty( $attributes['modalId'] ) ? sanitize_title( $attributes['modalId'] ) : 'myModal';
$modal_title = ! empty( $attributes['modalTitle'] ) ? $attributes['modalTitle'] : '';

?>
<div style="max-width: 100%" class="modal fade w-100" id="<?php echo esc_attr( $modal_id ); ?>" tabindex="-1" aria-hidden="true">
	<div class="modal-dialog">
		<div class="modal-content">
			<?php if ( $modal_title ) : ?>
				<div class="modal-header">
					<h5 class="modal-title"><?php echo esc_html( $modal_title ); ?></h5>
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
			<?php endif; ?>

			<div class="modal-body">
				<?php echo $content; // InnerBlocks content ?>
			</div>

			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
					<?php esc_html_e( 'Close', 'fs-blocks' ); ?>
				</button>
			</div>
		</div>
	</div>
</div>
