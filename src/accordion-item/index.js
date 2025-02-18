import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';

import './editor.scss';
import './style.scss';

import Edit from './edit';

registerBlockType( metadata.name, {
	edit: Edit,
	// dynamic block => we rely on render.php for front-end.
	save: () => <InnerBlocks.Content />,
} );
