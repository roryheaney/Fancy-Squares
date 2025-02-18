<?php
$block_id = $attributes['blockId'] ?? '';
$active_tab = $attributes['activeTab'] ?? '';
$wrapper_attributes = get_block_wrapper_attributes();
?>
<div <?php echo $wrapper_attributes; ?> data-bs-id="<?php echo esc_attr($block_id); ?>">
	<ul class="nav nav-tabs" role="tablist">
		<?php foreach ($tabs as $index => $tab) :
			$is_active = ($active_tab === $tab['id']) || ($index === 0 && !$active_tab);
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
			$is_active = ($active_tab === $tab['id']) || ($index === 0 && !$active_tab);
		?>
			<div class="tab-pane fade <?php echo $is_active ? 'show active' : ''; ?>"
				id="content-<?php echo esc_attr($tab['id']); ?>"
				role="tabpanel"
				aria-labelledby="tab-<?php echo esc_attr($tab['id']); ?>">
				<?php echo $tab['content']; ?>
			</div>
		<?php endforeach; ?>
	</div>
</div>