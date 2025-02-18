import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import './editor.scss';

export default function Edit() {
	const blockProps = useBlockProps( {
		className: 'accordion',
		// Add a custom data attribute that bootstrap’s JS might rely on:
		'data-bs-accordion': true,
	} );

	// Start with one accordion item.
	// The child block can also have a “templateLock:false” or “template:[]”
	// if you want the user to freely add items.
	const TEMPLATE = [
		[
			'fs-blocks/accordion-item',
			// Child block’s initial attributes:
			{
				title: __( 'Accordion Item Title', 'fs-blocks' ),
			},
			// Child block’s inner block template:
			[ [ 'core/paragraph', { placeholder: 'Accordion content...' } ] ],
		],
	];

	return (
		<div { ...blockProps }>
			<InnerBlocks
				allowedBlocks={ [ 'fs-blocks/accordion-item' ] }
				template={ TEMPLATE }
				templateLock={ false }
				renderAppender={ InnerBlocks.ButtonBlockAppender }
			/>
		</div>
	);
}
