import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';

// Import styles
import './editor.scss'; // Editor-only styles
import './style.scss'; // Front-end styles

// Import the edit function
import Edit from './edit';

registerBlockType( metadata.name, {
	edit: Edit,
	// Dynamic block => server render is used. The “save” just stores inner blocks.
	save: () => <InnerBlocks.Content />,
} );
