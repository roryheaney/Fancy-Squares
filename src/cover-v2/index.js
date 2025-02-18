import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import Edit from './edit';

import './editor.scss';
import './style.scss';

registerBlockType( metadata.name, {
	edit: Edit,
	// dynamic block => server render, but we store child blocks in post content
	save: () => <InnerBlocks.Content />,
} );
