<?php
$block_id        = $attributes['blockId'] ?? '';
$responsive_tabs = $attributes['responsiveTabs'] ?? false;
$wrapper_attrs   = get_block_wrapper_attributes();

// Assume $tabs is an array of tab data: each has ['id', 'title', 'content']
?>
<div <?php echo $wrapper_attrs; ?> data-fs-id="<?php echo esc_attr($block_id); ?>">

	<?php if ($responsive_tabs) : ?>
		<!-- Responsive: We show tabs (horizontal) at larger screens,
		     and collapsible accordion at smaller screens. -->
		<div class="fs-accordion fs-tabs-accordion-responsive" id="tab-accordion-<?php echo esc_attr($block_id); ?>">

			<!-- The "tablist" for the horizontal tab portion -->
			<ul class="fs-tabs-nav d-none d-lg-flex" role="tablist" data-fs-orientation="horizontal">
				<?php foreach ($tabs as $index => $tab) :
					$is_active = (0 === $index);
				?>
					<li class="fs-tabs-nav-item">
						<button
							id="tab-<?php echo esc_attr($tab['id']); ?>"
							type="button"
							data-fs-toggle="tab"
							data-fs-target="#pane-<?php echo esc_attr($tab['id']); ?>"
							class="fs-tab <?php echo $is_active ? 'active' : ''; ?>"
							role="tab"
							aria-controls="pane-<?php echo esc_attr($tab['id']); ?>"
							aria-selected="<?php echo $is_active ? 'true' : 'false'; ?>">
							<?php echo esc_html($tab['title']); ?>
						</button>
					</li>
				<?php endforeach; ?>
			</ul>

			<!-- Panels that also double as accordion items on mobile -->
			<div class="fs-accordion-content fs-tab-content" id="content-<?php echo esc_attr($block_id); ?>">
				<?php foreach ($tabs as $index => $tab) :
					$is_active = (0 === $index);
				?>
					<div
						id="pane-<?php echo esc_attr($tab['id']); ?>"
						class="fs-tab-pane fade <?php echo $is_active ? 'show active' : ''; ?> fs-accordion-item"
						role="tabpanel"
						aria-labelledby="tab-<?php echo esc_attr($tab['id']); ?>">
						<!-- Accordion "header" -->
						<button
							type="button"
							data-fs-toggle="collapse"
							data-fs-target="#collapse-<?php echo esc_attr($tab['id']); ?>"
							aria-expanded="<?php echo $is_active ? 'true' : 'false'; ?>"
							aria-controls="collapse-<?php echo esc_attr($tab['id']); ?>"
							class="fs-accordion-button <?php echo $is_active ? '' : 'collapsed'; ?> d-block d-lg-none">
							<?php echo esc_html($tab['title']); ?>
						</button>

						<!-- The collapsible body -->
						<div
							id="collapse-<?php echo esc_attr($tab['id']); ?>"
							class="fs-accordion-collapse fs-accordion-collapse--tab-accordion collapse <?php echo $is_active ? 'show' : ''; ?>"
							data-fs-parent="#content-<?php echo esc_attr($block_id); ?>"
							role="region"
							aria-labelledby="heading-<?php echo esc_attr($tab['id']); ?>">
							<div class="fs-accordion-body">
								<?php echo $tab['content']; ?>
							</div>
						</div>
					</div>
				<?php endforeach; ?>
			</div> <!-- .fs-accordion-content / .fs-tab-content -->

		</div> <!-- .fs-accordion.fs-accordion-responsive -->


	<?php else : ?>
		<!-- Non-responsive (standard tabs only) -->
		<div class="fs-tabs" id="tabs-<?php echo esc_attr($block_id); ?>">
			<ul class="fs-tabs-nav" role="tablist" data-fs-orientation="horizontal">
				<?php foreach ($tabs as $index => $tab) :
					$is_active = (0 === $index);
				?>
					<li class="fs-tabs-nav-item">
						<button
							id="tab-<?php echo esc_attr($tab['id']); ?>"
							type="button"
							data-fs-toggle="tab"
							data-fs-target="#content-<?php echo esc_attr($tab['id']); ?>"
							class="fs-tab <?php echo $is_active ? 'active' : ''; ?>"
							role="tab"
							aria-controls="content-<?php echo esc_attr($tab['id']); ?>"
							aria-selected="<?php echo $is_active ? 'true' : 'false'; ?>">
							<?php echo esc_html($tab['title']); ?>
						</button>
					</li>
				<?php endforeach; ?>
			</ul>

			<div class="fs-tab-content">
				<?php foreach ($tabs as $index => $tab) :
					$is_active = (0 === $index);
				?>
					<div
						class="fs-tab-pane fade <?php echo $is_active ? 'show active' : ''; ?>"
						id="content-<?php echo esc_attr($tab['id']); ?>"
						role="tabpanel"
						aria-labelledby="tab-<?php echo esc_attr($tab['id']); ?>">
						<?php echo $tab['content']; ?>
					</div>
				<?php endforeach; ?>
			</div> <!-- .fs-tab-content -->
		</div> <!-- .fs-tabs -->
	<?php endif; ?>
</div>