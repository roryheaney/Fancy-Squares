import { createElement } from '@wordpress/element';
import {
	useBlockProps,
	InnerBlocks,
	BlockControls,
	BlockVerticalAlignmentToolbar,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import classnames from 'classnames';

export default function Edit( { attributes, setAttributes, clientId } ) {
	const { verticalAlign } = attributes;

	const { hasChildBlocks, parentAttributes } = useSelect(
		( select ) => {
			const {
				getBlockCount,
				getBlockParentsByBlockName,
				getBlockAttributes,
			} = select( 'core/block-editor' );

			const count = getBlockCount( clientId ) > 0;

			// Find parent "fancysquares/carousel"
			const parents = getBlockParentsByBlockName(
				clientId,
				'fancysquares/carousel'
			);
			const parentAttrs = parents.length
				? getBlockAttributes( parents[ 0 ] )
				: {};

			return {
				hasChildBlocks: count,
				parentAttributes: parentAttrs,
			};
		},
		[ clientId ]
	);

	const className = classnames( {
		[ `are-vertically-aligned-${ verticalAlign }` ]: verticalAlign,
	} );

	// Approximate front-end width for preview
	let style = {};
	if ( parentAttributes.slidesToShow ) {
		const fraction = ( 100 / parentAttributes.slidesToShow ).toFixed( 2 );
		const gap = parentAttributes.columnGap || 0;
		style = {
			flexBasis: `calc(${ fraction }% - ${ gap }px)`,
			maxWidth: `calc(${ fraction }% - ${ gap }px)`,
			marginLeft: `${ gap }px`,
			minWidth: `calc(${ fraction }% - ${ gap }px)`,
		};
	}

	const blockProps = useBlockProps( { className, style } );

	return (
		<div { ...blockProps }>
			<BlockControls>
				<BlockVerticalAlignmentToolbar
					value={ verticalAlign }
					onChange={ ( newAlign ) =>
						setAttributes( { verticalAlign: newAlign } )
					}
				/>
			</BlockControls>

			{ /* Allow core/cover plus a few other standard blocks */ }
			<InnerBlocks
				orientation="vertical"
				allowedBlocks={ [
					'core/cover',
					'core/paragraph',
					'core/heading',
					'core/image',
					'core/group',
				] }
				templateLock={ false }
				renderAppender={
					! hasChildBlocks && InnerBlocks.ButtonBlockAppender
				}
			/>
		</div>
	);
}
