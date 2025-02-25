/**
 * Registers the `fancysquares/carousel` block in the editor.
 */
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import edit from './edit';
import metadata from './block.json';
import './style.scss'; // Front-end styles

// Because it's dynamic, we don't provide "save" here, only an edit.
// The "render" is handled by block.json => "render": "file:./render.php"
registerBlockType( metadata.name, {
	...metadata,
	edit,
	save: () => <InnerBlocks.Content />
} );
