<?php
$block_id         = $attributes['blockId'] ?? '';
$responsive_tabs  = $attributes['responsiveTabs'] ?? false;
$wrapper_attributes = get_block_wrapper_attributes();
?>
<div <?php echo $wrapper_attributes; ?> data-bs-id="<?php echo esc_attr($block_id); ?>">
	<?php if ($responsive_tabs) : ?>
		<div class="container responsive-tabs">
			<ul class="nav nav-tabs" role="tablist">
				<?php foreach ($tabs as $index => $tab) :
					$is_active = (0 === $index);
				?>
					<li class="nav-item">
						<button id="tab-<?php echo esc_attr($tab['id']); ?>"
							type="button"
							data-bs-toggle="tab"
							data-bs-target="#pane-<?php echo esc_attr($tab['id']); ?>"
							class="nav-link <?php echo $is_active ? 'active' : ''; ?>"
							role="tab"
							aria-controls="pane-<?php echo esc_attr($tab['id']); ?>"
							aria-selected="<?php echo $is_active ? 'true' : 'false'; ?>">
							<?php echo esc_html($tab['title']); ?>
						</button>
					</li>
				<?php endforeach; ?>
			</ul>

			<div id="content" class="tab-content" role="tablist">
				<?php foreach ($tabs as $index => $tab) :
					$is_active = (0 === $index);
				?>
					<div id="pane-<?php echo esc_attr($tab['id']); ?>"
						class="card tab-pane fade <?php echo $is_active ? 'show active' : ''; ?>"
						role="tabpanel"
						aria-labelledby="tab-<?php echo esc_attr($tab['id']); ?>">
						<div class="card-header" role="tab" id="heading-<?php echo esc_attr($tab['id']); ?>">
							<button type="button"
								data-bs-toggle="collapse"
								data-bs-target="#collapse-<?php echo esc_attr($tab['id']); ?>"
								aria-expanded="<?php echo $is_active ? 'true' : 'false'; ?>"
								aria-controls="collapse-<?php echo esc_attr($tab['id']); ?>">
								<?php echo esc_html($tab['title']); ?>
							</button>
						</div>
						<div id="collapse-<?php echo esc_attr($tab['id']); ?>"
							class="collapse <?php echo $is_active ? 'show' : ''; ?>"
							data-bs-parent="#content"
							role="tabpanel"
							aria-labelledby="heading-<?php echo esc_attr($tab['id']); ?>">
							<div class="card-body">
								<?php echo $tab['content']; ?>
							</div>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	<?php else : ?>
		<ul class="nav nav-tabs" role="tablist">
			<?php foreach ($tabs as $index => $tab) :
				$is_active = (0 === $index);
			?>
				<li class="nav-item" role="presentation">
					<button class="nav-link <?php echo $is_active ? 'active' : ''; ?>"
						id="tab-<?php echo esc_attr($tab['id']); ?>"
						data-bs-toggle="tab"
						data-bs-target="#content-<?php echo esc_attr($tab['id']); ?>"
						type="button"
						role="tab"
						aria-controls="content-<?php echo esc_attr($tab['id']); ?>"
						aria-selected="<?php echo $is_active ? 'true' : 'false'; ?>">
						<?php echo esc_html($tab['title']); ?>
					</button>
				</li>
			<?php endforeach; ?>
		</ul>

		<div class="tab-content">
			<?php foreach ($tabs as $index => $tab) :
				$is_active = (0 === $index);
			?>
				<div class="tab-pane fade <?php echo $is_active ? 'show active' : ''; ?>"
					id="content-<?php echo esc_attr($tab['id']); ?>"
					role="tabpanel"
					aria-labelledby="tab-<?php echo esc_attr($tab['id']); ?>">
					<?php echo $tab['content']; ?>
				</div>
			<?php endforeach; ?>
		</div>
	<?php endif; ?>
</div>