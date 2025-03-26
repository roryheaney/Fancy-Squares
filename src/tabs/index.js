import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';
import Edit from './edit';
import metadata from './block.json';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

registerBlockType( metadata.name, {
	edit: Edit,
	// eslint-disable-next-line no-unused-vars
	save: ( { attributes } ) => (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	),
} );
