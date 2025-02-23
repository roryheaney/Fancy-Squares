import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';

export default function save( { attributes } ) {
	const { verticalAlign } = attributes;

	const classes = classnames( 'swiper-slide', {
		[ `are-vertically-aligned-${ verticalAlign }` ]: verticalAlign,
	} );

	const blockProps = useBlockProps.save( {
		className: classes,
	} );

	return (
		<div { ...blockProps }>
			<InnerBlocks.Content />
		</div>
	);
}
