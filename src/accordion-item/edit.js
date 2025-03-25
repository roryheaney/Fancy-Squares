import { useEffect } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
	BlockControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { ToolbarButton } from '@wordpress/components';
import { dispatch, useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { title, parentAccordionId } = attributes;

	// A) If no stored clientId, set it for this block
	useEffect( () => {
		if ( ! attributes.clientId ) {
			setAttributes( { clientId } );
		}
	}, [ clientId, attributes.clientId, setAttributes ] );

	// B) Use the block editor store to find the parent block's attributes
	const { discoveredParentId } = useSelect(
		( select ) => {
			const { getBlockRootClientId, getBlockAttributes } =
				select( blockEditorStore );
			const rootId = getBlockRootClientId( clientId );

			// If no parent block found
			if ( ! rootId ) {
				return { discoveredParentId: null };
			}

			// Read the parent block’s attributes; look for blockId
			const parentAttrs = getBlockAttributes( rootId );
			if ( parentAttrs && parentAttrs.blockId ) {
				return { discoveredParentId: parentAttrs.blockId };
			}
			return { discoveredParentId: null };
		},
		[ clientId ]
	);

	// C) If we found a parentAccordionId from the store, store it in the child's attributes
	useEffect( () => {
		if ( discoveredParentId && discoveredParentId !== parentAccordionId ) {
			setAttributes( { parentAccordionId: discoveredParentId } );
		}
	}, [ discoveredParentId, parentAccordionId, setAttributes ] );

	// D) Normal block props and inner blocks
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{ className: 'fs-accordion-body' },
		{
			allowedBlocks: [ 'core/paragraph', 'core/heading', 'core/image' ],
		}
	);

	return (
		<div { ...blockProps }>
			<div className="fs-accordion-item">
				<h2 className="fs-accordion-header">
					<button
						className="fs-accordion-button collapsed"
						type="button"
						data-fs-toggle="collapse"
						data-fs-target={ `#fs-accordion-collapse-${ clientId }` }
						aria-expanded="false"
						aria-controls={ `fs-accordion-collapse-${ clientId }` }
					>
						<RichText
							tagName="span"
							value={ title }
							onChange={ ( newVal ) =>
								setAttributes( { title: newVal } )
							}
							placeholder={ __( 'Accordion Title', 'fs-blocks' ) }
						/>
					</button>
				</h2>
				<div
					id={ `fs-accordion-collapse-${ clientId }` }
					className="fs-accordion-collapse collapse"
					/* We'll set data-fs-parent in the server render based on parentAccordionId */
				>
					<div { ...innerBlocksProps } />
				</div>
			</div>

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
