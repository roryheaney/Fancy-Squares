import { registerBlockType } from '@wordpress/blocks';
import metadata from './block.json';

import './editor.scss';
import './style.scss';

import Edit from './edit';

// Register the block with dynamic rendering
registerBlockType( metadata.name, {
	edit: Edit,
	// No save() needed, because "render" is set in block.json => dynamic
	save: () => null,
} );
