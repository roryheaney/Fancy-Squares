import { useEffect } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	BlockControls,
} from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes, clientId } ) {
	// If there's no stored clientId, set it.
	useEffect( () => {
		if ( ! attributes.clientId ) {
			setAttributes( { clientId } );
		}
	}, [ clientId, attributes.clientId, setAttributes ] );

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'accordion-body' },
		{
			// Optional: restrict child blocks
			allowedBlocks: [ 'core/paragraph', 'core/heading', 'core/image' ],
		}
	);

	return (
		<div { ...blockProps }>
			<div className="accordion-item">
				<h2 className="accordion-header">
					<button
						className="accordion-button collapsed"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target={ `#accordion-collapse-${ clientId }` }
						aria-expanded="false"
						aria-controls={ `accordion-collapse-${ clientId }` }
					>
						<RichText
							tagName="span"
							value={ attributes.title }
							onChange={ ( newVal ) =>
								setAttributes( { title: newVal } )
							}
							placeholder="Accordion Title"
						/>
					</button>
				</h2>
				<div
					id={ `accordion-collapse-${ clientId }` }
					className="accordion-collapse collapse"
					data-bs-parent="[data-bs-accordion]"
				>
					{ /* The child content: using InnerBlocks */ }
					<div { ...innerBlocksProps } />
				</div>
			</div>

			{ /* A small toolbar to remove the entire block */ }
			<BlockControls>
				<ToolbarButton
					icon="trash"
					label={ __( 'Remove Accordion Item', 'fs-blocks' ) }
					onClick={ () =>
						dispatch( 'core/block-editor' ).removeBlock( clientId )
					}
				/>
			</BlockControls>
		</div>
	);
}
