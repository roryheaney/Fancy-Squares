<?php
/**
 * FancySquares Modal block server render.
 *
 * @param array  $attributes The block attributes.
 * @param string $content    The modal's inner content (from <InnerBlocks>).
 */

$modal_id       = ! empty( $attributes['modalId'] ) ? sanitize_title( $attributes['modalId'] ) : 'myModal';
$modal_title    = ! empty( $attributes['modalTitle'] ) ? $attributes['modalTitle'] : '';
$modal_placement = ! empty( $attributes['modalPlacement'] ) ? sanitize_title( $attributes['modalPlacement'] ) : 'center';

// Compose a class name that includes .fs-modal, .fade
// Also add data-fs-placement if you wish.
$modal_class = 'fs-modal fade';

?>
<div
  id="<?php echo esc_attr( $modal_id ); ?>"
  class="<?php echo esc_attr( $modal_class ); ?>"
  role="dialog"
  aria-modal="true"
  tabindex="-1"
  data-fs-modal="true"
  data-fs-placement="<?php echo esc_attr( $modal_placement ); ?>"
>
  <div class="fs-modal-dialog">
    <div class="fs-modal-content">
      <?php if ( $modal_title ) : ?>
        <div class="fs-modal-header">
          <h5 class="fs-modal-title">
            <?php echo esc_html( $modal_title ); ?>
          </h5>
        </div>
		<?php endif; ?>
		<button
		  type="button"
		  class="fs-modal-close"
		  data-fs-dismiss="modal"
		  aria-label="<?php esc_attr_e( 'Close', 'fs-blocks' ); ?>"
		>
		  x
		</button>

      <div class="fs-modal-body">
        <?php echo $content; // InnerBlocks content ?>
      </div>

      <div class="fs-modal-footer">
        <button
          type="button"
          class="fs-modal-close-btn"
          data-fs-dismiss="modal"
        >
          <?php esc_html_e( 'Close', 'fs-blocks' ); ?>
        </button>
      </div>
    </div>
  </div>
</div>
