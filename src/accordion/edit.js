import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';

import './editor.scss';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { blockId } = attributes;

	// 1) On mount, if no blockId is set, store the parent's clientId into blockId
	useEffect( () => {
		if ( ! blockId ) {
			setAttributes( { blockId: clientId } );
		}
	}, [ blockId, clientId, setAttributes ] );

	// 2) Provide the usual blockProps
	const blockProps = useBlockProps( {
		className: 'fs-accordion',
		'data-fs-accordion': true,
	} );

	// 3) A default template with one child accordion-item
	const TEMPLATE = [
		[
			'fs-blocks/accordion-item',
			// Child block’s initial attributes
			{ title: __( 'Accordion Item Title', 'fs-blocks' ) },
			// Inner blocks for that child
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
