/**
 * Registers the `fancysquares/slide` block in the editor.
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import edit from './edit';
import metadata from './block.json';

// It's dynamic. No separate "save" function.
registerBlockType( metadata.name, {
	...metadata,
	edit,
	save: () => <InnerBlocks.Content />,
} );
